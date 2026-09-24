import { describe, it, expect } from 'vitest';
import { extractObligationsFromDocument, computeEventDeadline } from '../services/obligationTracker';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_LEGAL_NOTICE } from '../services/sampleDocuments';

describe('Obligation & Deadline Tracker Service', () => {
  it('extracts structured obligations from rental agreements', () => {
    const obligations = extractObligationsFromDocument(SAMPLE_RENTAL_AGREEMENT);
    expect(obligations.length).toBeGreaterThanOrEqual(4);
    const rentPayment = obligations.find(o => o.obligation.includes('38,000'));
    expect(rentPayment).toBeDefined();
    expect(rentPayment?.party).toContain('Tenant');
  });

  it('identifies statutory urgency in Section 138 legal notices', () => {
    const obligations = extractObligationsFromDocument(SAMPLE_LEGAL_NOTICE);
    const statutoryNotice = obligations.find(o => o.isEventTriggered && o.offsetDays === 15);
    expect(statutoryNotice).toBeDefined();
    expect(statutoryNotice?.status).toBe('urgent');
  });

  it('accurately computes target deadline dates for event offsets', () => {
    const baseDate = '2024-08-14';
    const offset = 15; // 15 days statutory cure
    const result = computeEventDeadline(baseDate, offset);
    expect(result).not.toBeNull();
    expect(result?.formattedDate).toContain('2024');
    expect(typeof result?.daysRemaining).toBe('number');
  });
});
