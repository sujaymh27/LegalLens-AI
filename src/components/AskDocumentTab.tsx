import React, { useState, useRef, useEffect } from 'react';
import { DocumentData, SupportedLanguage, ChatMessage } from '../types';
import { askDocumentAI } from '../services/aiService';
import { TRANSLATIONS } from '../services/localization';

interface AskDocumentTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
  initialQuestionPrompt?: string;
}

export const AskDocumentTab: React.FC<AskDocumentTabProps> = ({
  document,
  currentLanguage,
  initialQuestionPrompt
}) => {
  const [inputQuestion, setInputQuestion] = useState(initialQuestionPrompt || '');
  const [isLoading, setIsLoading] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `${t.qa.welcomeMsg} ("${document.fileName}").\n\n${t.header.noticeText}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          pageNumber: 1,
          clauseNumber: 'Preamble',
          snippet: document.fileName
        }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuestionPrompt) {
      setInputQuestion(
        currentLanguage === 'hi'
          ? `${initialQuestionPrompt} के बारे में बताएं`
          : currentLanguage === 'kn'
          ? `${initialQuestionPrompt} ಬಗ್ಗೆ ವಿವರಿಸಿ`
          : `Explain details regarding ${initialQuestionPrompt}`
      );
    }
  }, [initialQuestionPrompt, currentLanguage]);

  const starterChips = currentLanguage === 'hi'
    ? [
        'यदि मैं जल्दी छोड़ दूं तो क्या होगा?',
        'नोटिस अवधि कितनी है?',
        'सुरक्षा जमा राशि कितनी है?',
        'अनुबंध कब समाप्त होता है?'
      ]
    : currentLanguage === 'kn'
    ? [
        'ನಾನು ಮುಂಚಿತವಾಗಿ ಮನೆ ಬಿಟ್ಟರೆ ಏನಾಗುತ್ತದೆ?',
        'ನೋಟಿಸ್ ಅವಧಿ ಎಷ್ಟು?',
        'ಭದ್ರತಾ ಠೇವಣಿ ಎಷ್ಟು?',
        'ಒಪ್ಪಂದ ಯಾವಾಗ ಮುಕ್ತಾಯವಾಗುತ್ತದೆ?'
      ]
    : [
        'What happens if I leave early?',
        'What is the notice period?',
        'How much is the security deposit?',
        'When does the agreement end?'
      ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputQuestion.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await askDocumentAI(textToSend, document, currentLanguage);

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations,
        isGeneralLegalInfo: response.isGeneralLegalInfo
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: currentLanguage === 'hi'
          ? 'मुझे अपलोड किए गए दस्तावेज़ में यह जानकारी नहीं मिली।\n\nयह कानूनी जानकारी है, कानूनी सलाह नहीं।'
          : currentLanguage === 'kn'
          ? 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯಲ್ಲಿ ನನಗೆ ಈ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ.\n\nಇದು ಕಾನೂನು ಮಾಹಿತಿ ಮಾತ್ರ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.'
          : 'I could not locate this information in the uploaded document.\n\nThis is legal information, not legal advice.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="tab-pane qa-screen">
      <div className="screen-header">
        <h2 className="screen-heading">{t.qa.title}</h2>
        <p className="screen-subheading">
          {t.qa.subtitle}
        </p>
      </div>

      <div className="qa-single-column">
        {/* Clickable Starter Chips */}
        <div className="starter-chips-container">
          <span style={{ fontSize: '0.875rem', fontWeight: 600, alignSelf: 'center', marginRight: '6px' }}>
            {t.qa.suggestedTitle}:
          </span>
          {starterChips.map((chip, idx) => (
            <button
              key={idx}
              className="starter-chip-btn"
              onClick={() => handleSend(chip)}
              disabled={isLoading}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Thread Box */}
        <div className="chat-thread-box">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === 'user' ? 'user-msg' : 'system-msg'}`}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '6px' }}>
                {msg.sender === 'user' ? (currentLanguage === 'hi' ? 'आप' : currentLanguage === 'kn' ? 'ನೀವು' : 'You') : 'LegalLens AI'}
              </div>

              {msg.text.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ marginBottom: '8px' }}>
                  {paragraph}
                </p>
              ))}

              {/* Citations Footer */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="msg-citation-footer">
                  <span>{t.qa.citationsTitle}: </span>
                  {msg.citations.map((c, cIdx) => (
                    <span key={cIdx}>
                      {t.clauses.pageLabel} {c.pageNumber}, {c.clauseNumber}{cIdx < msg.citations!.length - 1 ? '; ' : ''}
                    </span>
                  ))}
                </div>
              )}

              {/* Small Legal Disclaimer */}
              {msg.sender === 'assistant' && (
                <div className="msg-disclaimer-note">
                  {t.header.noticeText}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble system-msg" style={{ fontStyle: 'italic' }}>
              {currentLanguage === 'hi'
                ? 'दस्तावेज़ से विश्लेषण और संदर्भ सत्यापित किए जा रहे हैं...'
                : currentLanguage === 'kn'
                ? 'ದಾಖಲೆಯಿಂದ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಲಾಗುತ್ತಿದೆ...'
                : 'Formulating response and verifying citations from document text...'}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="qa-input-row">
          <input
            type="text"
            className="qa-text-input"
            placeholder={t.qa.inputPlaceholder}
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="bw-btn bw-btn-primary"
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuestion.trim()}
          >
            {t.qa.sendBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
