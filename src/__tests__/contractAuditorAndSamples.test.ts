import { describe, it, expect } from 'vitest';
import {
  SAMPLE_RENTAL_AGREEMENT,
  SAMPLE_EMPLOYMENT_CONTRACT,
  SAMPLE_LEGAL_NOTICE
} from '../services/sampleDocuments';

describe('Contract Auditor & Sample Document Verification', () => {
  describe('Bengaluru Residential Lease Agreement', () => {
    it('contains all required rental clauses and metadata', () => {
      expect(SAMPLE_RENTAL_AGREEMENT.docType).toBe('rental_agreement');
      expect(SAMPLE_RENTAL_AGREEMENT.parties.length).toBe(2);
      expect(SAMPLE_RENTAL_AGREEMENT.keyClauses.length).toBeGreaterThanOrEqual(4);
    });

    it('identifies flagged high-impact clauses in rental agreements (lock-in forfeiture and painting deduction)', () => {
      const flagged = SAMPLE_RENTAL_AGREEMENT.keyClauses.filter(c => c.isFlagged);
      expect(flagged.length).toBeGreaterThanOrEqual(2);
      expect(flagged.some(c => c.title.toLowerCase().includes('lock-in'))).toBe(true);
      expect(flagged.some(c => c.title.toLowerCase().includes('deduction') || c.title.toLowerCase().includes('deposit') || c.title.toLowerCase().includes('painting'))).toBe(true);
    });

    it('contains valid financial amounts for rent and security deposit', () => {
      expect(SAMPLE_RENTAL_AGREEMENT.amounts.some(a => a.amount.includes('38,000'))).toBe(true);
      expect(SAMPLE_RENTAL_AGREEMENT.amounts.some(a => a.amount.includes('2,00,000'))).toBe(true);
    });
  });

  describe('Senior Architect Employment Contract', () => {
    it('contains critical employment restrictions and non-compete restraint', () => {
      expect(SAMPLE_EMPLOYMENT_CONTRACT.docType).toBe('employment_contract');
      const nonCompete = SAMPLE_EMPLOYMENT_CONTRACT.keyClauses.find(c => c.title.toLowerCase().includes('non-compete'));
      expect(nonCompete).toBeDefined();
      expect(nonCompete?.isFlagged).toBe(true);
      expect(nonCompete?.whyItMatters).toContain('Section 27');
    });

    it('flags personal indemnification clause with critical severity rating', () => {
      const indemnity = SAMPLE_EMPLOYMENT_CONTRACT.keyClauses.find(c => c.title.toLowerCase().includes('indemn'));
      expect(indemnity).toBeDefined();
      expect(indemnity?.isFlagged).toBe(true);
      expect(indemnity?.flagSeverity).toBe('critical');
      expect(indemnity?.actionToConsider).toContain('capping');
    });

    it('identifies 90-day notice period requirements', () => {
      const noticeClause = SAMPLE_EMPLOYMENT_CONTRACT.keyClauses.find(c => c.title.toLowerCase().includes('notice'));
      expect(noticeClause).toBeDefined();
      expect(noticeClause?.plainExplanation).toContain('90 days');
    });
  });

  describe('Section 138 Statutory Legal Notice', () => {
    it('identifies strict 15-day statutory response clock and Section 138 allegations', () => {
      expect(SAMPLE_LEGAL_NOTICE.docType).toBe('legal_notice');
      const statutoryClause = SAMPLE_LEGAL_NOTICE.keyClauses.find(c => c.title.includes('138') || c.clauseNumber.includes('138'));
      expect(statutoryClause).toBeDefined();
      expect(statutoryClause?.isFlagged).toBe(true);
      expect(statutoryClause?.whyItMatters).toContain('Section 138');
    });

    it('contains cheque bounce financial amount and date records', () => {
      const chequeAmt = SAMPLE_LEGAL_NOTICE.amounts.find(a => a.amount.includes('4,50,000'));
      expect(chequeAmt).toBeDefined();
      expect(SAMPLE_LEGAL_NOTICE.importantDates.length).toBeGreaterThanOrEqual(2);
    });

    it('strictly grounds all statements without speculative predictions', () => {
      SAMPLE_LEGAL_NOTICE.keyClauses.forEach(clause => {
        expect(clause.originalText.length).toBeGreaterThan(0);
        expect(clause.plainExplanation.length).toBeGreaterThan(0);
        expect(clause.whyItMatters.length).toBeGreaterThan(0);
        expect(clause.actionToConsider.length).toBeGreaterThan(0);
      });
    });
  });
});
