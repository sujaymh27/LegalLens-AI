import { describe, it, expect } from 'vitest';
import { extractObligationsFromDocument, computeEventDeadline } from '../services/obligationTracker';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT, SAMPLE_LEGAL_NOTICE } from '../services/sampleDocuments';
import { DocumentData } from '../types';

describe('Obligation & Deadline Tracker Service', () => {
  it('extracts structured obligations from rental agreements', () => {
    const obligations = extractObligationsFromDocument(SAMPLE_RENTAL_AGREEMENT);
    expect(obligations.length).toBeGreaterThanOrEqual(4);
    const rentPayment = obligations.find(o => o.obligation.includes('38,000'));
    expect(rentPayment).toBeDefined();
    expect(rentPayment?.party).toContain('Tenant');
  });

  it('extracts structured obligations from employment contracts', () => {
    const obligations = extractObligationsFromDocument(SAMPLE_EMPLOYMENT_CONTRACT);
    expect(obligations.length).toBeGreaterThanOrEqual(3);
    const noticeObligation = obligations.find(o => o.obligation.includes('90 days'));
    expect(noticeObligation).toBeDefined();
    const nonCompete = obligations.find(o => o.obligation.toLowerCase().includes('compet'));
    expect(nonCompete).toBeDefined();
  });

  it('identifies statutory urgency in Section 138 legal notices', () => {
    const obligations = extractObligationsFromDocument(SAMPLE_LEGAL_NOTICE);
    const statutoryNotice = obligations.find(o => o.isEventTriggered && o.offsetDays === 15);
    expect(statutoryNotice).toBeDefined();
    expect(statutoryNotice?.status).toBe('urgent');
  });

  it('accurately computes target deadline dates for positive event offsets', () => {
    const baseDate = '2024-08-14';
    const offset = 15; // 15 days statutory cure
    const result = computeEventDeadline(baseDate, offset);
    expect(result).not.toBeNull();
    expect(result?.formattedDate).toContain('2024');
    expect(typeof result?.daysRemaining).toBe('number');
  });

  it('accurately computes negative offset deadlines (e.g., notice 60 days before move-out)', () => {
    const moveOutDate = '2025-06-30';
    const offset = -60; // 60 days prior
    const result = computeEventDeadline(moveOutDate, offset);
    expect(result).not.toBeNull();
    expect(result?.formattedDate).toContain('2025');
  });

  it('returns null when computeEventDeadline is given an empty or invalid base date', () => {
    expect(computeEventDeadline('', 15)).toBeNull();
    expect(computeEventDeadline('invalid-date-string', 15)).toBeNull();
  });

  it('extracts fallback obligations from important dates for general contract types', () => {
    const genericDoc: DocumentData = {
      ...SAMPLE_RENTAL_AGREEMENT,
      id: 'doc-generic',
      docType: 'general'
    };

    const obligations = extractObligationsFromDocument(genericDoc);
    expect(obligations.length).toBeGreaterThanOrEqual(1);
    expect(obligations[0].obligation).toContain('contractual obligations');
  });
});
