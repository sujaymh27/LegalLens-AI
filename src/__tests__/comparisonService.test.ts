import { describe, it, expect } from 'vitest';
import { compareDocuments } from '../services/comparisonService';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT } from '../services/sampleDocuments';

describe('Document Comparison Service', () => {
  it('flags document type mismatch when comparing dissimilar legal agreements', () => {
    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT);
    expect(comparison.isTypeMismatch).toBe(true);
    expect(comparison.typeMismatchWarning).toBeDefined();
    expect(comparison.typeMismatchWarning).toContain('rental agreement');
  });

  it('aligns categories and calculates practical legal impact differences', () => {
    const comparison = compareDocuments(SAMPLE_RENTAL_AGREEMENT, SAMPLE_RENTAL_AGREEMENT);
    expect(comparison.categories.length).toBeGreaterThan(0);
    const identical = comparison.categories.every(c => c.status === 'identical');
    expect(identical).toBe(true);
  });
});
