import { DocumentData, SupportedLanguage, CitationReference } from '../types';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = 'openai/gpt-4o';

export interface AIResponse {
  answer: string;
  citations: CitationReference[];
  isGeneralLegalInfo: boolean;
  suggestedFollowUps: string[];
}

/** In-memory LRU-like response cache to optimize performance and eliminate redundant API calls */
const aiResponseCache = new Map<string, AIResponse>();
const MAX_CACHE_SIZE = 100;

export function getAICacheKey(question: string, docId: string, language: SupportedLanguage): string {
  return `${docId}::${language}::${question.trim().toLowerCase()}`;
}

export function clearAICache(): void {
  aiResponseCache.clear();
}

export function getAICacheSize(): number {
  return aiResponseCache.size;
}

export async function askDocumentAI(
  question: string,
  doc: DocumentData,
  language: SupportedLanguage = 'en'
): Promise<AIResponse> {
  const cacheKey = getAICacheKey(question, doc.id, language);
  if (aiResponseCache.has(cacheKey)) {
    return aiResponseCache.get(cacheKey)!;
  }

  const setCachedResponse = (res: AIResponse): AIResponse => {
    if (aiResponseCache.size >= MAX_CACHE_SIZE) {
      const firstKey = aiResponseCache.keys().next().value;
      if (firstKey) aiResponseCache.delete(firstKey);
    }
    aiResponseCache.set(cacheKey, res);
    return res;
  };

  if (!OPENROUTER_API_KEY) {
    return setCachedResponse(fallbackDocumentQA(question, doc, language));
  }

  const documentContext = doc.pages
    .map(p => `--- PAGE ${p.pageNumber} ---\n${p.text}`)
    .join('\n\n');

  const languagePrompt =
    language === 'hi'
      ? 'The user wishes to receive answers and explanations in Hindi (हिन्दी). Provide the explanation in Hindi while citing the English clause/page references.'
      : language === 'kn'
      ? 'The user wishes to receive answers and explanations in Kannada (ಕನ್ನಡ). Provide the explanation in Kannada while citing the English clause/page references.'
      : 'Provide the answer in clear, plain English.';

  const systemPrompt = `You are LegalLens AI, a professional legal information and document navigation assistant.
Your purpose is to help ordinary users understand legal documents and legal information in simple language.
You do not provide legal advice, do not act as a lawyer, and do not create an attorney-client relationship.

CRITICAL RULES:
1. Always provide legal information, not legal advice.
2. Ground your answers strictly in the uploaded document text provided below. Do not invent clauses, facts, laws, or dates.
3. Always cite the exact source location of any information you use (e.g. "Page 1, Clause 2" or "Page 2, Paragraph 5").
4. If the question cannot be answered from the uploaded document, you MUST say clearly:
   "I could not locate this information in the uploaded document."
   If the user asks a general legal question not tied to the document, provide general legal information, clearly separate it from document analysis, remind them this is general information, and recommend consulting a qualified legal professional.
5. Use simple, plain language. Avoid jargon unless you explain it.
6. Maintain a neutral, professional tone. DO NOT USE EMOJIS UNDER ANY CIRCUMSTANCES.
7. Never state that a clause is definitely legal or illegal. Instead, explain that it may be important or unclear, and recommend discussing with a qualified legal professional.
8. Always conclude document answers with this brief disclaimer:
   "This is general legal information, not legal advice. For advice about your specific situation, consult a qualified legal professional."
9. Language preference: ${languagePrompt}

DOCUMENT CONTENT:
Title: ${doc.fileName}
Type: ${doc.docType}
${documentContext}`;

  try {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://legallens.ai',
        'X-Title': 'LegalLens AI',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        temperature: 0.1,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ]
      })
    });

    if (!response.ok) {
      if (response.status === 402) {
        // If credit limit reached for gpt-4o, seamlessly retry with lightweight gpt-4o-mini
        console.warn('OpenRouter 402 on gpt-4o, retrying with openai/gpt-4o-mini...');
        const retryRes = await fetch(OPENROUTER_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://legallens.ai',
            'X-Title': 'LegalLens AI',
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            temperature: 0.1,
            max_tokens: 1200,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: question }
            ]
          })
        });

        if (retryRes.ok) {
          const retryData = await retryRes.json();
          const retryAnswer = retryData.choices?.[0]?.message?.content || '';
          if (retryAnswer) {
            const citations = extractCitationsFromText(retryAnswer, doc);
            return setCachedResponse({
              answer: retryAnswer,
              citations,
              isGeneralLegalInfo: retryAnswer.toLowerCase().includes('general legal information'),
              suggestedFollowUps: generateFollowUps(question, doc)
            });
          }
        }
      }

      const errText = await response.text();
      console.warn(`OpenRouter API returned HTTP ${response.status}: ${errText}. Activating intelligent local extraction engine.`);
      return setCachedResponse(fallbackDocumentQA(question, doc, language));
    }

    const data = await response.json();
    const rawAnswer = data.choices?.[0]?.message?.content || '';

    if (!rawAnswer) {
      return setCachedResponse(fallbackDocumentQA(question, doc, language));
    }

    // Extract citation references from the answer
    const citations = extractCitationsFromText(rawAnswer, doc);

    return setCachedResponse({
      answer: rawAnswer,
      citations,
      isGeneralLegalInfo: rawAnswer.toLowerCase().includes('general legal information') || rawAnswer.toLowerCase().includes('not tied to the uploaded document'),
      suggestedFollowUps: generateFollowUps(question, doc)
    });
  } catch (error) {
    console.warn('Network or API issue with OpenRouter, utilizing resilient local extractor:', error);
    return setCachedResponse(fallbackDocumentQA(question, doc, language));
  }
}

export function extractCitationsFromText(answer: string, doc: DocumentData): CitationReference[] {
  const citations: CitationReference[] = [];
  const pageRegex = /Page\s*(\d+)/gi;
  let match;
  while ((match = pageRegex.exec(answer)) !== null) {
    const pageNum = parseInt(match[1], 10);
    const matchingClause = doc.keyClauses.find(c => c.pageNumber === pageNum);
    citations.push({
      pageNumber: pageNum,
      clauseNumber: matchingClause ? matchingClause.clauseNumber : `Page ${pageNum}`,
      snippet: matchingClause ? matchingClause.title : `Refer to Page ${pageNum} of ${doc.fileName}`
    });
  }

  // Also check clause references
  doc.keyClauses.forEach(clause => {
    if (answer.toLowerCase().includes(clause.clauseNumber.toLowerCase()) && !citations.some(c => c.clauseNumber === clause.clauseNumber)) {
      citations.push({
        pageNumber: clause.pageNumber,
        clauseNumber: clause.clauseNumber,
        snippet: clause.title
      });
    }
  });

  return citations.slice(0, 4);
}

const STOP_WORDS = new Set([
  'this', 'that', 'with', 'from', 'have', 'does', 'what', 'when', 'where', 'which',
  'about', 'there', 'their', 'they', 'them', 'these', 'those', 'document', 'agreement',
  'contract', 'clause', 'page', 'under', 'into', 'been', 'were', 'will', 'would', 'could', 'should',
  'permit', 'allow', 'is', 'are', 'the', 'and'
]);

export function fallbackDocumentQA(question: string, doc: DocumentData, language: SupportedLanguage): AIResponse {
  const qLower = question.toLowerCase();

  // 1. Prioritize direct financial queries (amounts, deposits, rent, CTC)
  const matchedAmount = doc.amounts.find(a => 
    (qLower.includes('deposit') && a.label.toLowerCase().includes('deposit')) ||
    (qLower.includes('rent') && a.label.toLowerCase().includes('rent')) ||
    (qLower.includes('salary') && (a.label.toLowerCase().includes('salary') || a.label.toLowerCase().includes('ctc'))) ||
    (qLower.includes('ctc') && a.label.toLowerCase().includes('ctc')) ||
    (qLower.includes('maintenance') && a.label.toLowerCase().includes('maintenance')) ||
    (qLower.includes('cheque') && (a.label.toLowerCase().includes('cheque') || a.amount.includes('4,50,000')))
  );

  if (matchedAmount && (qLower.includes('how much') || qLower.includes('amount') || qLower.includes('what is the') || qLower.includes('cost'))) {
    const citations: CitationReference[] = [{ pageNumber: 1, clauseNumber: matchedAmount.clauseRef, snippet: matchedAmount.label }];
    let amtAnswer = '';
    if (language === 'hi') {
      amtAnswer = `दस्तावेज़ के ${matchedAmount.clauseRef} के अनुसार, निर्धारित ${matchedAmount.label} ${matchedAmount.amount} (${matchedAmount.condition || matchedAmount.recurrence || 'शर्तों के अनुसार'}) है।\n\nयह सामान्य कानूनी जानकारी है, कानूनी सलाह नहीं। अपनी विशिष्ट स्थिति के लिए योग्य कानूनी पेशेवर से परामर्श करें।`;
    } else if (language === 'kn') {
      amtAnswer = `ದಾಖಲೆಯ ${matchedAmount.clauseRef} ಪ್ರಕಾರ, ನಿಗದಿಪಡಿಸಿದ ${matchedAmount.label} ಮೊತ್ತ ${matchedAmount.amount} ಆಗಿದೆ.\n\nಇದು ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿಯಾಗಿದೆ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಾಗಿ ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.`;
    } else {
      amtAnswer = `According to ${matchedAmount.clauseRef} of the uploaded document, the specified ${matchedAmount.label} is ${matchedAmount.amount} (${matchedAmount.condition || matchedAmount.recurrence || 'as per agreement terms'}).\n\nThis is general legal information, not legal advice. For advice about your specific situation, consult a qualified legal professional.`;
    }
    return {
      answer: amtAnswer,
      citations,
      isGeneralLegalInfo: false,
      suggestedFollowUps: generateFollowUps(question, doc)
    };
  }

  // 2. Search doc clauses with weighted relevance scoring
  const words = qLower.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !STOP_WORDS.has(w));
  const scoredClauses = words.length === 0 ? [] : doc.keyClauses.map(clause => {
    let score = 0;
    const titleLower = clause.title.toLowerCase();
    const textLower = clause.originalText.toLowerCase();
    const plainLower = clause.plainExplanation.toLowerCase();

    words.forEach(w => {
      if (titleLower.includes(w)) score += 5;
      if (plainLower.includes(w)) score += 2;
      if (textLower.includes(w)) score += 1;
    });
    return { clause, score };
  }).filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scoredClauses.length > 0) {
    const topClause = scoredClauses[0].clause;
    const citations: CitationReference[] = [
      {
        pageNumber: topClause.pageNumber,
        clauseNumber: topClause.clauseNumber,
        snippet: topClause.title
      }
    ];

    let answerText = '';
    if (language === 'hi') {
      answerText = `दस्तावेज़ में उल्लिखित जानकारी के अनुसार (पृष्ठ ${topClause.pageNumber}, ${topClause.clauseNumber}):\n\n` +
        `मूल प्रावधान: "${topClause.title}"\n` +
        `सरल व्याख्या: ${topClause.plainExplanation}\n\n` +
        `यह आपके लिए क्यों महत्वपूर्ण है: ${topClause.whyItMatters}\n\n` +
        `विचारणीय सुझाव: ${topClause.actionToConsider}\n\n` +
        `यह सामान्य कानूनी जानकारी है, कानूनी सलाह नहीं। अपनी विशिष्ट स्थिति के लिए योग्य कानूनी पेशेवर से परामर्श करें।`;
    } else if (language === 'kn') {
      answerText = `ದಾಖಲೆಯ ಆಧಾರದ ಮೇಲೆ (ಪುಟ ${topClause.pageNumber}, ${topClause.clauseNumber}):\n\n` +
        `ಮೂಲ ನಿಯಮ: "${topClause.title}"\n` +
        `ಸರಳ ವಿವರಣೆ: ${topClause.plainExplanation}\n\n` +
        `ಇದು ನಿಮಗೆ ಏಕೆ ಮುಖ್ಯ: ${topClause.whyItMatters}\n\n` +
        `ಪರಿಗಣಿಸಬೇಕಾದ ಕ್ರಮ: ${topClause.actionToConsider}\n\n` +
        `ಇದು ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿಯಾಗಿದೆ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಾಗಿ ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.`;
    } else {
      answerText = `Based on the uploaded document (${topClause.clauseNumber}, Page ${topClause.pageNumber}):\n\n` +
        `Original Provision: "${topClause.title}"\n` +
        `Plain-Language Explanation: ${topClause.plainExplanation}\n\n` +
        `Why this matters: ${topClause.whyItMatters}\n\n` +
        `Action to consider: ${topClause.actionToConsider}\n\n` +
        `This is general legal information, not legal advice. For advice about your specific situation, consult a qualified legal professional.`;
    }

    return {
      answer: answerText,
      citations,
      isGeneralLegalInfo: false,
      suggestedFollowUps: generateFollowUps(question, doc)
    };
  }


  // Not found in document
  const notFoundMsg = language === 'hi'
    ? 'मुझे अपलोड किए गए दस्तावेज़ में यह जानकारी नहीं मिली।\n\nयह सामान्य कानूनी जानकारी है, कानूनी सलाह नहीं। अपनी विशिष्ट स्थिति के लिए योग्य कानूनी पेशेवर से परामर्श करें।'
    : language === 'kn'
    ? 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾದ ದಾಖಲೆಯಲ್ಲಿ ಈ ಮಾಹಿತಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.\n\nಇದು ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿಯಾಗಿದೆ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಾಗಿ ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.'
    : 'I could not locate this information in the uploaded document.\n\nIf you have questions about general legal principles or terms outside this agreement, I can provide general legal information, but for specific legal counseling, please consult a qualified legal professional.';

  return {
    answer: notFoundMsg,
    citations: [],
    isGeneralLegalInfo: false,
    suggestedFollowUps: [
      'What are the key deadlines in this document?',
      'Who are the parties mentioned in this contract?',
      'What are the termination provisions?'
    ]
  };
}

export function generateFollowUps(question: string, doc: DocumentData): string[] {
  if (doc.docType === 'rental_agreement') {
    return [
      'What is the notice period for vacating the flat?',
      'Under what conditions can the security deposit be deducted?',
      'What happens if I terminate before the 3-month lock-in period?',
      'How will disputes be resolved under this agreement?'
    ];
  } else if (doc.docType === 'employment_contract') {
    return [
      'Is the 90-day notice period mandatory or can it be bought out?',
      'What are the restrictions in the non-compete clause?',
      'What is my personal liability under the indemnity clause?',
      'Who owns intellectual property created during employment?'
    ];
  } else if (doc.docType === 'legal_notice') {
    return [
      'What is the exact 15-day deadline to respond to this notice?',
      'What criminal penalties are mentioned under Section 138 NI Act?',
      'What documents should I collect to defend against this notice?',
      'What questions should I ask my advocate?'
    ];
  }
  return [
    'What are the key obligations and deadlines?',
    'Are there any high-risk clauses in this document?',
    'What are the termination conditions?'
  ];
}
