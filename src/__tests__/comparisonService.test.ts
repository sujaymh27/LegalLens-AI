import { describe, it, expect } from 'vitest';
import { compareDocuments } from '../services/comparisonService';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT } from '../services/sampleDocuments';
import { DocumentData } from '../types';

describe('Document Comparison Service', () => {
  it('flags document type mismatch when comparing dissimilar legal agreements', () => {
    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT);
    expect(comparison.isTypeMismatch).toBe(true);
    expect(comparison.typeMismatchWarning).toBeDefined();
    expect(comparison.typeMismatchWarning).toContain('rental agreement');
  });

  it('aligns categories and calculates practical legal impact differences for identical documents', () => {
    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, SAMPLE_RENTAL_AGREEMENT);
    expect(comparison.categories.length).toBeGreaterThan(0);
    const identical = comparison.categories.every(c => c.status === 'identical');
    expect(identical).toBe(true);
    expect(comparison.isTypeMismatch).toBe(false);
  });

  it('detects clauses added in Document B that are absent in Document A', () => {
    const modifiedRental: DocumentData = {
      ...SAMPLE_RENTAL_AGREEMENT,
      id: 'doc-rental-v2',
      fileName: 'Rental_Agreement_v2.pdf',
      keyClauses: [
        ...SAMPLE_RENTAL_AGREEMENT.keyClauses,
        {
          id: 'c-rent-extra',
          clauseNumber: 'Clause 9',
          title: 'Pet Prohibition & Penalty',
          originalText: 'No pets of any kind shall be brought into the premises under penalty of Rs. 10,000.',
          plainExplanation: 'Strict no-pets rule with fines.',
          whyItMatters: 'Financial penalty for pet ownership.',
          actionToConsider: 'Confirm if pets are planned.',
          isFlagged: true,
          flagSeverity: 'medium',
          category: 'Pet Regulations',
          pageNumber: 2
        }
      ]
    };

    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, modifiedRental);
    const petCategory = comparison.categories.find(c => c.category === 'Pet Regulations');
    expect(petCategory).toBeDefined();
    expect(petCategory?.status).toBe('only_in_b');
    expect(petCategory?.practicalEffect).toContain('Document B');
  });

  it('detects clauses removed in Document B that existed in Document A', () => {
    const strippedRental: DocumentData = {
      ...SAMPLE_RENTAL_AGREEMENT,
      id: 'doc-rental-stripped',
      fileName: 'Rental_Agreement_Stripped.pdf',
      keyClauses: SAMPLE_RENTAL_AGREEMENT.keyClauses.filter(c => c.category !== 'Termination & Lock-in')
    };

    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, strippedRental);
    const lockInCategory = comparison.categories.find(c => c.category === 'Termination & Lock-in');
    expect(lockInCategory).toBeDefined();
    expect(lockInCategory?.status).toBe('only_in_a');
    expect(lockInCategory?.practicalEffect).toContain('missing from');
  });

  it('reports signature discrepancies between executed and draft agreements', () => {
    const draftAgreement: DocumentData = {
      ...SAMPLE_RENTAL_AGREEMENT,
      signatures: {
        present: false,
        partiesSigned: [],
        witnessPresent: false,
        witnessCount: 0,
        executionDate: undefined
      }
    };

    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, draftAgreement);
    expect(comparison.summaryInsights.some(s => s.toLowerCase().includes('executed') || s.toLowerCase().includes('signature'))).toBe(true);
  });
});

