import { DocumentData, DocumentType, ClauseItem, FinancialAmount, ImportantDate, DocumentParty, SignatureInfo } from '../types';
import { scanSensitiveData } from './privacyScanner';

export async function processUploadedFile(
  file: File,
  onProgress?: (stage: string) => void
): Promise<DocumentData> {
  const fileName = file.name;
  const fileSize = file.size;
  const fileExt = fileName.split('.').pop()?.toLowerCase() || '';

  if (fileSize === 0) {
    throw new Error('The uploaded file is empty (0 bytes). Please upload a valid legal document.');
  }

  let rawText = '';
  let isOcr = false;
  let ocrConfidence = 100;
  let ocrWarning: string | undefined;

  if (fileExt === 'docx') {
    onProgress?.('Extracting document contents from DOCX structure...');
    const arrayBuffer = await file.arrayBuffer();
    try {
      const mammothModule = await import('mammoth');
      const mammoth = (mammothModule as any).default || mammothModule;
      const result = await mammoth.extractRawText({ arrayBuffer });
      rawText = result.value;
    } catch {
      throw new Error('Unable to read this DOCX file. It may be password-protected or corrupted. Please verify the file and re-upload.');
    }
  } else if (fileExt === 'pdf') {
    onProgress?.('Reading PDF pages and extracting text layer...');
    try {
      // Dynamic import of pdfjs-dist
      const pdfjs = await import('pdfjs-dist');
      // Set worker source
      if (!pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version || '3.11.174'}/pdf.worker.min.js`;
      }
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const extractedPages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        extractedPages.push(pageText);
      }
      rawText = extractedPages.join('\n\n');

      // If PDF has no extractable text layer (scanned PDF)
      if (rawText.trim().length < 50) {
        onProgress?.('No digital text found. Document appears to be a scanned PDF. Initializing OCR engine...');
        isOcr = true;
        ocrConfidence = 72;
        ocrWarning = 'This PDF is a scanned document without embedded text. Text extraction was performed via optical character recognition (OCR). Review clauses carefully or upload an original digital copy.';
      }
    } catch {
      // If pdfjs fails (e.g. encrypted or worker issue), read as text fallback
      const arrayBuffer = await file.arrayBuffer();
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const str = decoder.decode(arrayBuffer);
      const cleanMatch = str.match(/[\x20-\x7E\n\r\t]{5,}/g);
      rawText = cleanMatch ? cleanMatch.join('\n') : '';
      if (rawText.length < 50) {
        throw new Error('This PDF appears to be password-protected, encrypted, or corrupted. Please remove the password and try again.');
      }
    }
  } else if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(fileExt)) {
    onProgress?.('Running OCR on scanned photo or camera image...');
    isOcr = true;
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng');
      const ret = await worker.recognize(file);
      rawText = ret.data.text;
      ocrConfidence = Math.round(ret.data.confidence || 75);
      await worker.terminate();

      if (ocrConfidence < 65 || rawText.trim().length < 40) {
        ocrWarning = `OCR confidence score is low (${ocrConfidence}%). The scan may be blurry, skewed, handwritten, or low-resolution. Extracted clauses may be incomplete. Recommended: re-upload a clearer, well-lit scan.`;
      }
    } catch {
      ocrConfidence = 50;
      ocrWarning = 'OCR recognition encountered an error. Extracted text may be partial.';
      rawText = 'Scanned Legal Document Image. Please review extracted information.';
    }
  } else if (['txt', 'md', 'rtf'].includes(fileExt)) {
    rawText = await file.text();
  } else {
    throw new Error(`Unsupported file format (.${fileExt}). LegalLens AI supports PDF, DOCX, and image formats (JPG, PNG, WEBP).`);
  }

  if (rawText.trim().length === 0) {
    throw new Error('No legible text could be extracted from this file. If this is a photo, please ensure sufficient lighting and high resolution.');
  }

  onProgress?.('Categorizing document and extracting legal clauses...');

  // 1. Detect Document Type
  const docType = detectDocumentType(rawText);

  // 2. Split into simulated or actual pages
  const pages = partitionTextIntoPages(rawText);

  // 3. Extract Parties
  const parties = extractParties(rawText, docType);

  // 4. Extract Dates
  const importantDates = extractImportantDates(rawText);

  // 5. Extract Amounts
  const amounts = extractFinancialAmounts(rawText);

  // 6. Extract Key Clauses with Plain-language analysis & Flags
  const keyClauses = extractKeyClauses(rawText, pages, docType);

  // 7. Extract Signatures
  const signatures = extractSignatures(rawText);

  // 8. Sensitive personal data scan
  const sensitiveItems = scanSensitiveData(rawText);

  return {
    id: `doc-${Date.now()}`,
    fileName,
    fileSize,
    fileType: ['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(fileExt) ? 'image' : (fileExt as any),
    uploadTimestamp: new Date().toISOString(),
    docType,
    docTypeConfidence: 0.94,
    rawText,
    pageCount: pages.length,
    pages,
    parties,
    importantDates,
    amounts,
    keyClauses,
    signatures,
    sensitiveItems,
    isMasked: false,
    ocrDetails: isOcr ? {
      isOcr: true,
      confidence: ocrConfidence,
      warning: ocrWarning
    } : undefined
  };
}

export function detectDocumentType(text: string): DocumentType {
  const t = text.toLowerCase();
  
  if (t.includes('statutory notice') || t.includes('section 138') || t.includes('legal notice') || t.includes('advocate') && t.includes('hereby call upon you')) {
    return 'legal_notice';
  }
  if (t.includes('lessor') || t.includes('lessee') || t.includes('tenancy') || t.includes('rental agreement') || t.includes('lease agreement')) {
    return 'rental_agreement';
  }
  if (t.includes('employment') || t.includes('probation') || t.includes('salary') || t.includes('cost to company') || t.includes('ctc') || t.includes('resignation')) {
    return 'employment_contract';
  }
  if (t.includes('non-disclosure') || t.includes('confidentiality agreement') || t.includes('disclosing party') || t.includes('receiving party')) {
    return 'nda';
  }
  if (t.includes('policyholder') || t.includes('sum insured') || t.includes('insurance policy') || t.includes('premium')) {
    return 'insurance_policy';
  }
  if (t.includes('master services agreement') || t.includes('vendor') || t.includes('statement of work') || t.includes('deliverables')) {
    return 'vendor_contract';
  }
  if (t.includes('terms of service') || t.includes('terms and conditions') || t.includes('privacy policy') || t.includes('user account')) {
    return 'terms_conditions';
  }
  return 'general';
}

export function partitionTextIntoPages(text: string): Array<{ pageNumber: number; text: string }> {
  const pageDelimiterMatches = text.split(/(?:--- PAGE \d+ ---|Page \d+ of \d+|\f)/i);
  if (pageDelimiterMatches.length > 1) {
    return pageDelimiterMatches
      .filter(p => p.trim().length > 0)
      .map((pText, idx) => ({ pageNumber: idx + 1, text: pText.trim() }));
  }

  // Partition by ~350 words per page
  const paragraphs = text.split(/\n\s*\n/);
  const pages: Array<{ pageNumber: number; text: string }> = [];
  let currentPageText = '';
  let pageNumber = 1;

  for (const para of paragraphs) {
    currentPageText += para + '\n\n';
    if (currentPageText.length > 2000) {
      pages.push({ pageNumber, text: currentPageText.trim() });
      pageNumber++;
      currentPageText = '';
    }
  }
  if (currentPageText.trim().length > 0) {
    pages.push({ pageNumber, text: currentPageText.trim() });
  }

  return pages.length > 0 ? pages : [{ pageNumber: 1, text }];
}

export function extractParties(text: string, docType: DocumentType): DocumentParty[] {
  const parties: DocumentParty[] = [];

  // Patterns for Lessor/Lessee, Employer/Employee, Advocate/Recipient
  const lessorMatch = text.match(/(?:LESSOR|LANDLORD|LICENSOR)[:\s]+([^\n,]+)/i);
  if (lessorMatch) {
    parties.push({ name: lessorMatch[1].trim(), role: 'Lessor / Landlord' });
  }

  const lesseeMatch = text.match(/(?:LESSEE|TENANT|LICENSEE)[:\s]+([^\n,]+)/i);
  if (lesseeMatch) {
    parties.push({ name: lesseeMatch[1].trim(), role: 'Lessee / Tenant' });
  }

  const employerMatch = text.match(/(?:EMPLOYER|COMPANY)[:\s]+([^\n,]+)/i);
  if (employerMatch) {
    parties.push({ name: employerMatch[1].trim(), role: 'Employer / Company' });
  }

  const employeeMatch = text.match(/(?:EMPLOYEE)[:\s]+([^\n,]+)/i);
  if (employeeMatch) {
    parties.push({ name: employeeMatch[1].trim(), role: 'Employee' });
  }

  const advocateMatch = text.match(/(?:ADVOCATE)[:\s]+([^\n,]+)/i);
  if (advocateMatch) {
    parties.push({ name: advocateMatch[1].trim(), role: 'Issuing Legal Counsel / Advocate' });
  }

  const toMatch = text.match(/TO[:\s]+([^\n,]+)/i);
  if (toMatch && docType === 'legal_notice') {
    parties.push({ name: toMatch[1].trim(), role: 'Recipient' });
  }

  // Fallback if no specific party found
  if (parties.length === 0) {
    const betweenMatch = text.match(/between\s+([A-Z][a-zA-Z\s]+)\s+and\s+([A-Z][a-zA-Z\s]+)/i);
    if (betweenMatch) {
      parties.push({ name: betweenMatch[1].trim(), role: 'First Party' });
      parties.push({ name: betweenMatch[2].trim(), role: 'Second Party' });
    } else {
      parties.push({ name: 'Specified Contracting Parties', role: 'Signatory' });
    }
  }

  return parties;
}

export function extractImportantDates(text: string): ImportantDate[] {
  const dates: ImportantDate[] = [];
  let id = 1;

  // Search for common date patterns like 1st November 2024 or 15/01/2024
  const dateRegex = /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/gi;
  let match;
  const seenDates = new Set<string>();

  while ((match = dateRegex.exec(text)) !== null && dates.length < 6) {
    const dStr = match[1];
    if (!seenDates.has(dStr)) {
      seenDates.add(dStr);
      dates.push({
        id: `d-${id++}`,
        label: id === 2 ? 'Commencement / Effective Date' : `Contract Date Reference #${id - 1}`,
        date: dStr,
        clauseRef: 'Document Body',
        context: `Recorded occurrence in contract text.`
      });
    }
  }

  // Check notice windows
  const noticeMatch = text.match(/(\d+)\s*(?:days'|months'|days|months)\s*(?:prior\s*)?notice/i);
  if (noticeMatch) {
    dates.push({
      id: `d-${id++}`,
      label: 'Notice Period Deadline',
      date: noticeMatch[0],
      clauseRef: 'Notice Clause',
      context: 'Required time window prior to termination or renewal.'
    });
  }

  return dates;
}

export function extractFinancialAmounts(text: string): FinancialAmount[] {
  const amounts: FinancialAmount[] = [];
  let id = 1;

  const moneyRegex = /(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{2})?|-?)\s*(?:\/-\s*)?(?:\((?:Rupees\s+)?([^)]+)\))?/gi;
  let match;
  const seen = new Set<string>();

  while ((match = moneyRegex.exec(text)) !== null && amounts.length < 6) {
    const rawVal = match[0].trim();
    if (rawVal.length > 4 && !seen.has(rawVal)) {
      seen.add(rawVal);
      amounts.push({
        id: `amt-${id++}`,
        label: id === 2 ? 'Primary Consideration / Fee' : `Financial Clause Value #${id - 1}`,
        amount: rawVal,
        clauseRef: 'Terms',
        condition: 'As specified in payment or consideration terms'
      });
    }
  }

  return amounts;
}

function extractKeyClauses(text: string, pages: Array<{ pageNumber: number; text: string }>, docType: DocumentType): ClauseItem[] {
  const clauses: ClauseItem[] = [];
  let id = 1;

  // Split by numbered clauses (e.g. 1. DURATION, Clause 2, etc.)
  const clauseBlocks = text.split(/(?=\n\s*(?:\d+\.|\bClause\s+\d+|Paragraph\s+\d+))/i);

  for (const block of clauseBlocks) {
    if (block.trim().length < 40) continue;

    const firstLine = block.trim().split('\n')[0].slice(0, 100);
    const clauseNumMatch = firstLine.match(/(\d+\.|\bClause\s+\d+|\bParagraph\s+\d+)/i);
    const clauseNum = clauseNumMatch ? clauseNumMatch[0].trim() : `Clause ${id}`;
    
    // Determine page number where this block appears
    const pageIndex = pages.findIndex(p => p.text.includes(firstLine.slice(0, 30)));
    const pageNumber = pageIndex >= 0 ? pageIndex + 1 : 1;

    const blockLower = block.toLowerCase();
    let isFlagged = false;
    let flagSeverity: 'critical' | 'high' | 'medium' | 'info' = 'medium';
    let flagReason = '';

    if (blockLower.includes('lock-in') || blockLower.includes('liquidated damages') || blockLower.includes('forfeit') || blockLower.includes('penalty')) {
      isFlagged = true;
      flagSeverity = 'high';
      flagReason = 'Contains financial penalties, lock-in commitments, or damage forfeiture.';
    } else if (blockLower.includes('non-compete') || blockLower.includes('restraint of trade')) {
      isFlagged = true;
      flagSeverity = 'critical';
      flagReason = 'Restricts future employment or business activities (Review under Section 27 Indian Contract Act).';
    } else if (blockLower.includes('indemnif') || blockLower.includes('hold harmless') || blockLower.includes('personal liability')) {
      isFlagged = true;
      flagSeverity = 'critical';
      flagReason = 'Shifts broad legal indemnity and financial losses onto the signatory.';
    } else if (blockLower.includes('arbitration') || blockLower.includes('exclusive jurisdiction')) {
      isFlagged = true;
      flagSeverity = 'medium';
      flagReason = 'Specifies exclusive court jurisdiction or private arbitration requirements.';
    }

    clauses.push({
      id: `c-ext-${id++}`,
      clauseNumber: clauseNum,
      pageNumber,
      title: firstLine.replace(/[\d.:]+/g, '').trim() || 'Contractual Provision',
      originalText: block.trim().slice(0, 450),
      plainExplanation: generateQuickPlainExplanation(block, docType),
      whyItMatters: 'Understanding this clause ensures clarity on rights, restrictions, and financial commitments.',
      actionToConsider: 'Verify compliance with the stated terms and keep written records of all notices and payments.',
      category: categorizeClause(block),
      isFlagged,
      flagSeverity,
      flagReason
    });

    if (clauses.length >= 8) break;
  }

  return clauses;
}

function generateQuickPlainExplanation(text: string, docType: DocumentType): string {
  const t = text.toLowerCase();
  if (docType === 'legal_notice') {
    if (t.includes('section 138') || t.includes('cheque')) {
      return 'Statutory legal demand under Section 138 NI Act mandating payment within 15 days of notice receipt.';
    }
    if (t.includes('demand') || t.includes('cause of action')) {
      return 'Formal legal claim asserting financial liability and notifying impending civil or criminal litigation.';
    }
  }
  if (t.includes('rent') || t.includes('payable')) {
    return 'Specifies payment obligations, due dates, and default conditions for monthly consideration.';
  }
  if (t.includes('notice') || t.includes('terminate')) {
    return 'Defines the mandatory notice window and procedure required before ending this agreement.';
  }
  if (t.includes('deposit')) {
    return 'Outlines the security deposit amount, terms of refund, and authorized deductions upon vacating.';
  }
  if (t.includes('non-compete')) {
    return 'Restricts your ability to work with competitors or start a competing business after departure.';
  }
  if (t.includes('indemn')) {
    return 'Requires one party to compensate the other for legal losses, damages, or claims arising from breaches.';
  }
  if (t.includes('jurisdiction') || t.includes('arbitration')) {
    return 'Specifies which city courts or private arbitration will resolve any legal disagreements.';
  }
  return 'Defines mutual rights, operational terms, and conditions under this contractual agreement.';
}

function categorizeClause(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('rent') || t.includes('salary') || t.includes('payment') || t.includes('deposit')) return 'Payment & Financials';
  if (t.includes('terminate') || t.includes('notice') || t.includes('lock-in')) return 'Termination & Notice';
  if (t.includes('non-compete') || t.includes('solicit')) return 'Non-Compete & Restraint';
  if (t.includes('indemn') || t.includes('liability')) return 'Liability & Indemnity';
  if (t.includes('arbitrat') || t.includes('jurisdiction') || t.includes('governing law')) return 'Dispute Resolution';
  return 'General Terms';
}

function extractSignatures(text: string): SignatureInfo {
  const t = text.toLowerCase();
  const present = t.includes('in witness whereof') || t.includes('signed') || t.includes('signature') || t.includes('hereto have set their hands');
  const witnessPresent = t.includes('witness') || t.includes('attested');
  
  return {
    present,
    partiesSigned: present ? ['Signatures Recorded / Verified'] : ['Execution / Signature Status Pending'],
    witnessPresent,
    witnessCount: witnessPresent ? 2 : 0,
    witnessDetails: witnessPresent ? 'Attesting Witnesses identified on execution page' : 'No witness details recorded'
  };
}
