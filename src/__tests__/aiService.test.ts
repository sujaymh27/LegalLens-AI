import { describe, it, expect, beforeEach } from 'vitest';
import {
  askDocumentAI,
  extractCitationsFromText,
  fallbackDocumentQA,
  generateFollowUps,
  getAICacheKey,
  clearAICache,
  getAICacheSize
} from '../services/aiService';
import {
  SAMPLE_RENTAL_AGREEMENT,
  SAMPLE_EMPLOYMENT_CONTRACT,
  SAMPLE_LEGAL_NOTICE
} from '../services/sampleDocuments';

describe('AI Q&A & Resilient Legal Engine Service', () => {
  beforeEach(() => {
    clearAICache();
  });

  describe('Cache Mechanism & Performance Optimization', () => {
    it('generates consistent cache keys for case-insensitive and trimmed queries', () => {
      const key1 = getAICacheKey('What is the rent?', 'doc-123', 'en');
      const key2 = getAICacheKey('  what is the rent?  ', 'doc-123', 'en');
      expect(key1).toBe(key2);
      expect(key1).toContain('doc-123::en::what is the rent?');
    });

    it('caches responses in memory and avoids re-computation on identical queries', async () => {
      expect(getAICacheSize()).toBe(0);
      const res1 = await askDocumentAI('What is the security deposit?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(getAICacheSize()).toBe(1);

      const res2 = await askDocumentAI('What is the security deposit?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(getAICacheSize()).toBe(1);
      expect(res2).toEqual(res1);
    });

    it('clears cache when clearAICache is invoked', async () => {
      await askDocumentAI('What is the rent?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(getAICacheSize()).toBe(1);
      clearAICache();
      expect(getAICacheSize()).toBe(0);
    });
  });

  describe('Citation Reference Extraction', () => {
    it('extracts Page number references from text', () => {
      const answer = 'According to Page 1 of the contract, the rent is due on the 5th. Also see Page 2 for lock-in.';
      const citations = extractCitationsFromText(answer, SAMPLE_RENTAL_AGREEMENT);
      expect(citations.length).toBeGreaterThanOrEqual(1);
      expect(citations.some(c => c.pageNumber === 1)).toBe(true);
    });

    it('extracts Clause references matching document key clauses', () => {
      const answer = 'Under Clause 5, the tenant cannot sublet without prior written consent.';
      const citations = extractCitationsFromText(answer, SAMPLE_RENTAL_AGREEMENT);
      expect(citations.some(c => c.clauseNumber.includes('5'))).toBe(true);
    });

    it('caps returned citations at a maximum of 4 to prevent clutter', () => {
      const answer = 'Page 1, Page 2, Clause 1, Clause 2, Clause 3, Clause 4, Clause 5 all discuss obligations.';
      const citations = extractCitationsFromText(answer, SAMPLE_RENTAL_AGREEMENT);
      expect(citations.length).toBeLessThanOrEqual(4);
    });
  });

  describe('Fallback Document QA Engine (Offline / Resilient Mode)', () => {
    it('answers rental security deposit questions with citations', () => {
      const response = fallbackDocumentQA('How much is the security deposit?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(response.answer).toContain('2,00,000');
      expect(response.citations.length).toBeGreaterThan(0);
      expect(response.isGeneralLegalInfo).toBe(false);
    });

    it('answers notice period questions with clause and page numbers', () => {
      const response = fallbackDocumentQA('What is the notice period for vacating?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(response.answer.toLowerCase()).toContain('notice');
      expect(response.citations.length).toBeGreaterThan(0);
    });

    it('answers in Hindi when language is set to hi', () => {
      const response = fallbackDocumentQA('How much is the security deposit?', SAMPLE_RENTAL_AGREEMENT, 'hi');
      expect(response.answer).toContain('दस्तावेज़');
      expect(response.answer).toContain('कानूनी सलाह नहीं');
    });

    it('answers in Kannada when language is set to kn', () => {
      const response = fallbackDocumentQA('How much is the security deposit?', SAMPLE_RENTAL_AGREEMENT, 'kn');
      expect(response.answer).toContain('ದಾಖಲೆಯ');
      expect(response.answer).toContain('ಕಾನೂನು ಸಲಹೆಯಲ್ಲ');
    });

    it('returns standard "not found" response for queries absent from the document', () => {
      const response = fallbackDocumentQA('Does this document permit keeping exotic tigers as pets?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(response.answer).toContain('I could not locate this information in the uploaded document');
      expect(response.citations).toEqual([]);
    });

    it('always appends a strict legal advice disclaimer to prevent unauthorized practice of law', () => {
      const response = fallbackDocumentQA('What is the rent amount?', SAMPLE_RENTAL_AGREEMENT, 'en');
      expect(response.answer).toContain('This is general legal information, not legal advice');
    });
  });

  describe('Suggested Follow-Up Generation', () => {
    it('generates rental-specific follow-up questions for rental agreements', () => {
      const followUps = generateFollowUps('rent', SAMPLE_RENTAL_AGREEMENT);
      expect(followUps.length).toBeGreaterThanOrEqual(3);
      expect(followUps.some(q => q.toLowerCase().includes('deposit') || q.toLowerCase().includes('notice'))).toBe(true);
    });

    it('generates employment-specific follow-up questions for employment contracts', () => {
      const followUps = generateFollowUps('notice', SAMPLE_EMPLOYMENT_CONTRACT);
      expect(followUps.some(q => q.toLowerCase().includes('non-compete') || q.toLowerCase().includes('notice'))).toBe(true);
    });

    it('generates statutory legal notice questions for Section 138 notices', () => {
      const followUps = generateFollowUps('deadline', SAMPLE_LEGAL_NOTICE);
      expect(followUps.some(q => q.includes('15-day') || q.includes('Section 138'))).toBe(true);
    });
  });
});
