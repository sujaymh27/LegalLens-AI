import { ObligationItem, DocumentData } from '../types';

export function extractObligationsFromDocument(doc: DocumentData): ObligationItem[] {
  const obligations: ObligationItem[] = [];

  if (doc.docType === 'rental_agreement') {
    obligations.push(
      {
        id: 'ob-rent-1',
        party: 'Tenant (Lessee)',
        obligation: 'Pay monthly rent of Rs. 38,000/-',
        deadline: 'On or before 5th of every calendar month',
        clauseRef: 'Clause 2',
        isEventTriggered: false,
        status: 'pending'
      },
      {
        id: 'ob-rent-2',
        party: 'Tenant (Lessee)',
        obligation: 'Pay society maintenance charges of Rs. 4,500/- directly to RWA',
        deadline: 'Monthly as billed by RWA',
        clauseRef: 'Clause 2',
        isEventTriggered: false,
        status: 'pending'
      },
      {
        id: 'ob-rent-3',
        party: 'Both Parties (Lessor & Lessee)',
        obligation: 'Do not terminate agreement during initial lock-in period',
        deadline: 'Strictly 3 months from commencement (31 Jan 2025)',
        clauseRef: 'Clause 5',
        isEventTriggered: false,
        status: 'pending'
      },
      {
        id: 'ob-rent-4',
        party: 'Party initiating termination',
        obligation: 'Serve written termination notice or pay 2 months rent in lieu',
        deadline: '60 days (2 months) prior to intended move-out date',
        clauseRef: 'Clause 5',
        isEventTriggered: true,
        eventTrigger: 'Planned Move-Out Date',
        offsetDays: -60,
        status: 'pending'
      },
      {
        id: 'ob-rent-5',
        party: 'Landlord (Lessor)',
        obligation: 'Refund Rs. 2,00,000/- security deposit (less Rs. 38,000 painting deduction and damages)',
        deadline: 'At the time of vacating and handing over vacant possession',
        clauseRef: 'Clause 3 & 6',
        isEventTriggered: true,
        eventTrigger: 'Handover / Vacating Date',
        offsetDays: 0,
        status: 'pending'
      }
    );
  } else if (doc.docType === 'employment_contract') {
    obligations.push(
      {
        id: 'ob-emp-1',
        party: 'Employee',
        obligation: 'Complete mandatory 6-month probation period',
        deadline: '31 July 2024 (6 months from 1 Feb 2024)',
        clauseRef: 'Clause 1',
        isEventTriggered: false,
        status: 'pending'
      },
      {
        id: 'ob-emp-2',
        party: 'Employee',
        obligation: 'Serve mandatory 90 days notice period upon resignation',
        deadline: '90 calendar days following official written resignation submission',
        clauseRef: 'Clause 3',
        isEventTriggered: true,
        eventTrigger: 'Resignation Submission Date',
        offsetDays: 90,
        status: 'pending'
      },
      {
        id: 'ob-emp-3',
        party: 'Employee',
        obligation: 'Abstain from competitive employment across India',
        deadline: '12 months post cessation of employment',
        clauseRef: 'Clause 4',
        condition: 'Post-employment covenant (Note: evaluate under Sec 27 Contract Act)',
        isEventTriggered: true,
        eventTrigger: 'Last Working Day (LWD)',
        offsetDays: 365,
        status: 'pending'
      },
      {
        id: 'ob-emp-4',
        party: 'Employee',
        obligation: 'Non-solicitation of clients, staff, or partners',
        deadline: '24 months following separation',
        clauseRef: 'Clause 5',
        isEventTriggered: true,
        eventTrigger: 'Last Working Day (LWD)',
        offsetDays: 730,
        status: 'pending'
      }
    );
  } else if (doc.docType === 'legal_notice') {
    obligations.push(
      {
        id: 'ob-not-1',
        party: 'Recipient (Mr. Sandeep Hegde)',
        obligation: 'Pay demanded cheque amount of Rs. 4,50,000/- with 18% p.a. interest',
        deadline: 'Within 15 days from date of receipt of notice',
        clauseRef: 'Paragraph 5',
        condition: 'Failure allows complainant to file criminal case under Sec 138 NI Act',
        isEventTriggered: true,
        eventTrigger: 'Date Notice was Received / Delivered',
        offsetDays: 15,
        status: 'urgent'
      },
      {
        id: 'ob-not-2',
        party: 'Recipient (Mr. Sandeep Hegde)',
        obligation: 'Preserve all original communications, invoices, delivery challans, and statements',
        deadline: 'Immediate upon notice receipt',
        clauseRef: 'Paragraph 6',
        isEventTriggered: false,
        status: 'urgent'
      },
      {
        id: 'ob-not-3',
        party: 'Recipient Advocate',
        obligation: 'Issue formal legal reply notice through counsel',
        deadline: 'Recommended within 15 days of notice receipt',
        clauseRef: 'Defense Strategy',
        condition: 'Prior to expiration of the 15-day statutory window',
        isEventTriggered: true,
        eventTrigger: 'Date Notice was Received / Delivered',
        offsetDays: 14,
        status: 'urgent'
      }
    );
  } else {
    // General document extraction fallback
    obligations.push({
      id: 'ob-gen-1',
      party: 'First Party',
      obligation: 'Perform standard contractual obligations under agreement',
      deadline: 'As specified in individual clauses',
      clauseRef: 'General Terms',
      isEventTriggered: false,
      status: 'pending'
    });
  }

  return obligations;
}

export function computeEventDeadline(baseDateStr: string, offsetDays: number): { formattedDate: string; daysRemaining: number } | null {
  if (!baseDateStr) return null;
  const base = new Date(baseDateStr);
  if (isNaN(base.getTime())) return null;

  const target = new Date(base);
  target.setDate(target.getDate() + offsetDays);

  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return {
    formattedDate: target.toLocaleDateString('en-GB', options),
    daysRemaining: diffDays
  };
}
