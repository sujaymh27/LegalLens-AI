export type SupportedLanguage = 'en' | 'hi' | 'kn';

export type DocumentType = 
  | 'rental_agreement'
  | 'employment_contract'
  | 'insurance_policy'
  | 'legal_notice'
  | 'nda'
  | 'vendor_contract'
  | 'terms_conditions'
  | 'general';

export interface DocumentParty {
  name: string;
  role: string;
  address?: string;
  idDetails?: string;
}

export interface ImportantDate {
  id: string;
  label: string;
  date: string;
  clauseRef: string;
  context: string;
  isAmbiguous?: boolean;
}

export interface FinancialAmount {
  id: string;
  label: string;
  amount: string;
  clauseRef: string;
  recurrence?: string;
  condition?: string;
}

export interface ClauseItem {
  id: string;
  clauseNumber: string;
  pageNumber: number;
  title: string;
  originalText: string;
  plainExplanation: string;
  whyItMatters: string;
  actionToConsider: string;
  category: string;
  isFlagged?: boolean;
  flagSeverity?: 'critical' | 'high' | 'medium' | 'info';
  flagReason?: string;
}

export interface SignatureInfo {
  present: boolean;
  partiesSigned: string[];
  witnessPresent: boolean;
  witnessCount: number;
  witnessDetails?: string;
  executionDate?: string;
  notarizedOrStamped?: boolean;
}

export interface SensitiveDataItem {
  id: string;
  type: 'aadhaar' | 'pan' | 'bank_account' | 'salary' | 'medical' | 'phone';
  label: string;
  originalValue: string;
  maskedValue: string;
  location: string;
}

export interface ObligationItem {
  id: string;
  party: string;
  obligation: string;
  deadline: string;
  condition?: string;
  clauseRef: string;
  isEventTriggered: boolean;
  eventTrigger?: string;
  offsetDays?: number;
  baseEventDate?: string;
  calculatedDeadline?: string;
  status: 'pending' | 'urgent' | 'completed';
}

export interface LegalNoticeDetails {
  sender: string;
  senderAdvocate?: string;
  recipient: string;
  noticeDate: string;
  medium: string;
  statutoryProvisions: string[];
  allegationsSummary: string;
  demandedActions: string[];
  statedConsequences: string[];
  requestedDocuments: string[];
  preparationChecklist: Array<{
    id: string;
    task: string;
    completed: boolean;
    importance: string;
  }>;
  lawyerQuestions: string[];
}

export interface DocumentComparisonCategory {
  category: string;
  clauseA?: {
    ref: string;
    text: string;
    plain: string;
  };
  clauseB?: {
    ref: string;
    text: string;
    plain: string;
  };
  status: 'identical' | 'substantially_similar' | 'different_impact' | 'only_in_a' | 'only_in_b';
  practicalEffect: string;
}

export interface DocumentData {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: 'pdf' | 'docx' | 'image' | 'text';
  uploadTimestamp: string;
  docType: DocumentType;
  docTypeConfidence: number;
  rawText: string;
  pageCount: number;
  pages: Array<{ pageNumber: number; text: string }>;
  parties: DocumentParty[];
  importantDates: ImportantDate[];
  amounts: FinancialAmount[];
  keyClauses: ClauseItem[];
  signatures: SignatureInfo;
  sensitiveItems: SensitiveDataItem[];
  isMasked: boolean;
  ocrDetails?: {
    isOcr: boolean;
    confidence: number;
    warning?: string;
  };
  noticeDetails?: LegalNoticeDetails;
}

export interface CitationReference {
  pageNumber: number;
  clauseNumber: string;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  citations?: CitationReference[];
  isGeneralLegalInfo?: boolean;
  suggestedFollowUps?: string[];
}
