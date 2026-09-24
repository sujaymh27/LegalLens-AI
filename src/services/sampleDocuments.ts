import { DocumentData } from '../types';
import { scanSensitiveData } from './privacyScanner';

export const SAMPLE_RENTAL_AGREEMENT: DocumentData = (() => {
  const rawText = `RESIDENTIAL LEASE AGREEMENT

This Rental Agreement is made and executed at Bengaluru, Karnataka on this 1st day of November 2024 by and between:

LESSOR / LANDLORD:
Mr. Rajesh Kumar Verma, aged about 52 years, residing at #142, 4th Cross, Indiranagar, Bengaluru - 560038 (hereinafter called the 'LESSOR', which expression shall mean and include his legal heirs, successors and assigns) of the ONE PART;
Aadhaar No: 4921 8832 9104, PAN: ABCPV1234F.

AND

LESSEE / TENANT:
Ms. Ananya Sharma, aged about 29 years, currently working at CloudTech India Pvt Ltd, Bengaluru (hereinafter called the 'LESSEE', which expression shall mean and include her successors and permitted assigns) of the OTHER PART;
Aadhaar No: 8291 4019 3320, PAN: BZTPS5678M.

WHEREAS the Lessor is the absolute owner of Flat No. 302, 3rd Floor, Palm Heights Apartments, 100 Feet Road, Koramangala, Bengaluru - 560034, consisting of 2 Bedrooms, Hall, Kitchen and dedicated car parking (hereinafter referred to as the 'Schedule Premises').

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. DURATION AND COMMENCEMENT:
The tenancy hereby created shall be for a period of 11 (eleven) months commencing from 1st November 2024 and valid up to 30th September 2025. This agreement may be renewed mutually on freshly agreed terms.

2. MONTHLY RENT AND MAINTENANCE:
The Lessee shall pay to the Lessor a monthly rent of Rs. 38,000/- (Rupees Thirty-Eight Thousand only) per month, payable in advance on or before the 5th day of every calendar month via bank transfer to Lessor's Account No: 023101509921, IFSC: HDFC0000128. In addition, the Lessee shall pay monthly apartment association maintenance charges of Rs. 4,500/- directly to the Resident Welfare Association.

3. INTEREST-FREE REFUNDABLE SECURITY DEPOSIT:
The Lessee has paid a sum of Rs. 2,00,000/- (Rupees Two Lakhs only) as interest-free refundable security deposit to the Lessor. The said deposit shall be refunded to the Lessee without any interest at the time of vacating and handing over vacant peaceful possession of the premises, subject to deductions for arrears of rent, utility dues, or damages if any.

4. ANNUAL ESCALATION:
In the event of renewal of this agreement after the initial 11 months, the monthly rent shall be escalated by 5% (five percent) over the last paid monthly rent.

5. LOCK-IN PERIOD AND TERMINATION:
Both parties agree to a strict initial lock-in period of 3 (three) months during which neither party can terminate this agreement. After expiry of the lock-in period, either party may terminate this agreement by giving 2 (two) months prior written notice, or payment of 2 months' rent in lieu thereof.

6. PAINTING AND RECONDITIONING CHARGES:
At the time of vacating the schedule premises, the Lessor shall deduct an amount equal to 1 (one) month's rent (Rs. 38,000/-) from the security deposit towards internal painting, cleaning, and sanitization charges, irrespective of the condition or period of occupancy.

7. PERMITTED USE AND RESTRICTIONS:
The premises shall be used exclusively for residential purposes by the Lessee and her immediate family. The Lessee shall not sub-let, assign, or part with possession of any portion of the premises to any third party. No commercial activities or hazardous materials are permitted.

8. REPAIRS AND MAINTENANCE:
Major structural repairs shall be borne by the Lessor. Minor day-to-day repairs such as replacement of bulbs, tap washers, minor plumbing, and electrical accessories costing under Rs. 1,000/- shall be attended to and borne by the Lessee.

9. GOVERNING LAW AND ARBITRATION:
This Agreement shall be governed by the laws of India. Any disputes arising out of or in connection with this agreement shall be settled through arbitration under the Arbitration and Conciliation Act, 1996 by a sole arbitrator appointed mutually by both parties. The seat and venue of arbitration shall be Bengaluru, Karnataka, and the Courts in Bengaluru shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties hereto have set their hands on the day, month, and year first above written.

LESSOR: Rajesh Kumar Verma (Signed)
LESSEE: Ananya Sharma (Signed)

WITNESS 1:
Praveen Nair, #45 Koramangala 4th Block, Bengaluru (Signed)

WITNESS 2:
Sunita Rao, #88 HSR Layout Sector 2, Bengaluru (Signed)`;

  const sensitive = scanSensitiveData(rawText);

  return {
    id: 'doc-sample-rental',
    fileName: 'Bengaluru_Residential_Rental_Agreement_2024.pdf',
    fileSize: 184520,
    fileType: 'pdf',
    uploadTimestamp: '2024-11-01T10:00:00Z',
    docType: 'rental_agreement',
    docTypeConfidence: 0.98,
    rawText,
    pageCount: 2,
    pages: [
      { pageNumber: 1, text: rawText.slice(0, rawText.indexOf('5. LOCK-IN PERIOD')) },
      { pageNumber: 2, text: rawText.slice(rawText.indexOf('5. LOCK-IN PERIOD')) }
    ],
    parties: [
      { name: 'Mr. Rajesh Kumar Verma', role: 'Lessor / Landlord', address: '#142, 4th Cross, Indiranagar, Bengaluru - 560038', idDetails: 'Aadhaar: 4921 8832 9104, PAN: ABCPV1234F' },
      { name: 'Ms. Ananya Sharma', role: 'Lessee / Tenant', address: 'CloudTech India Pvt Ltd, Bengaluru', idDetails: 'Aadhaar: 8291 4019 3320, PAN: BZTPS5678M' }
    ],
    importantDates: [
      { id: 'd-1', label: 'Agreement Execution Date', date: '01 Nov 2024', clauseRef: 'Preamble', context: 'Date on which the agreement was signed.' },
      { id: 'd-2', label: 'Tenancy Commencement Date', date: '01 Nov 2024', clauseRef: 'Clause 1', context: 'Official tenancy start date.' },
      { id: 'd-3', label: 'Tenancy Expiry Date', date: '30 Sep 2025', clauseRef: 'Clause 1', context: '11-month agreement conclusion date.' },
      { id: 'd-4', label: 'Monthly Rent Payment Due Date', date: '5th of every month', clauseRef: 'Clause 2', context: 'Rent payable in advance.' },
      { id: 'd-5', label: 'Lock-in Period Expiry', date: '31 Jan 2025', clauseRef: 'Clause 5', context: '3 months mandatory occupancy.' }
    ],
    amounts: [
      { id: 'a-1', label: 'Monthly Rent', amount: 'Rs. 38,000/-', recurrence: 'Per Month', clauseRef: 'Clause 2', condition: 'Payable by 5th of each month' },
      { id: 'a-2', label: 'Refundable Security Deposit', amount: 'Rs. 2,00,000/-', recurrence: 'One-time', clauseRef: 'Clause 3', condition: 'Interest-free, refundable upon vacant possession' },
      { id: 'a-3', label: 'Society Maintenance Charges', amount: 'Rs. 4,500/-', recurrence: 'Per Month', clauseRef: 'Clause 2', condition: 'Paid directly to RWA' },
      { id: 'a-4', label: 'Mandatory Painting Deduction', amount: 'Rs. 38,000/-', recurrence: 'Upon vacating', clauseRef: 'Clause 6', condition: 'Deducted from deposit regardless of condition' }
    ],
    keyClauses: [
      {
        id: 'c-1',
        clauseNumber: 'Clause 1',
        pageNumber: 1,
        title: 'Duration and Term',
        originalText: 'The tenancy hereby created shall be for a period of 11 (eleven) months commencing from 1st November 2024 and valid up to 30th September 2025.',
        plainExplanation: 'This rental contract is valid for 11 months, ending on September 30, 2025. It can be extended if both you and the landlord agree on new terms.',
        whyItMatters: 'In India, 11-month agreements are standard to avoid mandatory registration under the Registration Act. You need to initiate renewal discussions at least 60 days before September 2025.',
        actionToConsider: 'Set a calendar reminder for August 2025 to negotiate renewal or plan relocation.',
        category: 'Term & Duration',
        isFlagged: false
      },
      {
        id: 'c-2',
        clauseNumber: 'Clause 5',
        pageNumber: 2,
        title: 'Lock-in Period and Notice Window',
        originalText: 'Both parties agree to a strict initial lock-in period of 3 (three) months during which neither party can terminate this agreement. After expiry of the lock-in period, either party may terminate this agreement by giving 2 (two) months prior written notice, or payment of 2 months\' rent in lieu thereof.',
        plainExplanation: 'You cannot move out during the first 3 months (November 2024 through January 2025) without paying penalty. After that, you must give a written notice of 2 full months before vacating.',
        whyItMatters: 'If you vacate within the lock-in period or fail to give 2 months notice, the landlord can deduct 2 months rent (Rs 76,000) from your security deposit.',
        actionToConsider: 'Do not plan an early exit before January 31, 2025. Always deliver termination notice via written email and physical letter with proof of delivery.',
        category: 'Termination & Lock-in',
        isFlagged: true,
        flagSeverity: 'high',
        flagReason: 'Lock-in period with mandatory 2-month notice or rent in lieu forfeiture.'
      },
      {
        id: 'c-3',
        clauseNumber: 'Clause 6',
        pageNumber: 2,
        title: 'Mandatory Painting Deduction Clause',
        originalText: 'At the time of vacating the schedule premises, the Lessor shall deduct an amount equal to 1 (one) month\'s rent (Rs. 38,000/-) from the security deposit towards internal painting, cleaning, and sanitization charges, irrespective of the condition or period of occupancy.',
        plainExplanation: 'When you vacate, the landlord will automatically keep Rs 38,000 (one full month rent) for painting and cleaning, even if the walls are clean and undamaged.',
        whyItMatters: 'This is an automatic non-refundable deduction that substantially reduces your deposit return. In many landlord-tenant disputes, tenants challenge automatic deductions without actual bill receipts.',
        actionToConsider: 'Consider negotiating this clause before signing to cap painting costs at actual bills or pro-rata based on stay duration.',
        category: 'Deposit Deductions',
        isFlagged: true,
        flagSeverity: 'critical',
        flagReason: 'Automatic deduction of one full month rent (Rs 38,000) irrespective of actual condition.'
      },
      {
        id: 'c-4',
        clauseNumber: 'Clause 9',
        pageNumber: 2,
        title: 'Governing Law and Dispute Resolution',
        originalText: 'Any disputes arising out of or in connection with this agreement shall be settled through arbitration under the Arbitration and Conciliation Act, 1996 by a sole arbitrator appointed mutually by both parties. The seat and venue of arbitration shall be Bengaluru, Karnataka.',
        plainExplanation: 'If you have a major disagreement with the landlord that cannot be settled amicably, you must hire a private arbitrator in Bengaluru rather than going straight to standard small-claims civil court.',
        whyItMatters: 'Private arbitration can be expensive as parties often share the arbitrator fee. However, it resolves issues faster than traditional civil courts.',
        actionToConsider: 'Ensure both parties have an equal say in nominating the arbitrator if a dispute arises.',
        category: 'Dispute Resolution',
        isFlagged: true,
        flagSeverity: 'medium',
        flagReason: 'Private arbitration clause waiving regular civil court proceedings.'
      }
    ],
    signatures: {
      present: true,
      partiesSigned: ['Mr. Rajesh Kumar Verma (Lessor)', 'Ms. Ananya Sharma (Lessee)'],
      witnessPresent: true,
      witnessCount: 2,
      witnessDetails: 'Praveen Nair (Koramangala), Sunita Rao (HSR Layout)',
      executionDate: '01 Nov 2024',
      notarizedOrStamped: true
    },
    sensitiveItems: sensitive,
    isMasked: false
  };
})();

export const SAMPLE_EMPLOYMENT_CONTRACT: DocumentData = (() => {
  const rawText = `EMPLOYMENT AND CONFIDENTIALITY AGREEMENT

This Agreement is made on 15th January 2024 between:

EMPLOYER:
Apex Cloud Innovations Private Limited, a company incorporated under the Companies Act, 2013 having its registered office at EcoSpace Business Park, Bellandur, Bengaluru - 560103 (hereinafter referred to as the 'Company').

AND

EMPLOYEE:
Mr. Vikram Aditya, residing at #204, Green Glen Layout, Bellandur, Bengaluru - 560103 (hereinafter referred to as the 'Employee').
PAN: AHKPV9012K, Aadhaar: 9021 5543 1187, Mobile: +91 98450 12345.

1. POSITION AND PROBATION:
The Employee is appointed to the full-time role of Senior Cloud Solutions Architect. The Employee shall undergo an initial probationary period of 6 (six) months from the Date of Joining (1st February 2024).

2. REMUNERATION:
The Employee shall receive an annual Cost to Company (CTC) of Rs. 24,00,000/- (Rupees Twenty-Four Lakhs only), structured into base salary, HRA, and statutory allowances, payable on the last working day of each calendar month.

3. NOTICE PERIOD AND TERMINATION:
During probation, either party may terminate the employment with 30 days' written notice. Following confirmation of employment, the Employee must serve a mandatory Notice Period of 90 (ninety) calendar days. The Company reserves the right to reject any request for buyout of the notice period. In the event the Employee fails to serve the complete 90 days, the Employee shall be liable to forfeit and pay liquidated damages equal to 3 months' gross salary to the Company.

4. NON-COMPETE RESTRICTION:
For a period of 12 (twelve) months following the cessation of employment for any reason, the Employee shall not directly or indirectly accept employment with, consult for, or establish any business or enterprise that competes with the software products and services offered by the Company anywhere in the territory of the Republic of India.

5. NON-SOLICITATION OF CLIENTS AND STAFF:
For a period of 24 (twenty-four) months following separation, the Employee covenants not to solicit, entice away, or hire any employee, contractor, customer, or partner of the Company.

6. INTELLECTUAL PROPERTY ASSIGNMENT:
All inventions, source code, designs, algorithms, architectures, patents, and copyrightable works created by the Employee during the course of employment shall be the sole and exclusive property of the Company worldwide and in perpetuity.

7. INDEMNIFICATION AND PERSONAL LIABILITY:
The Employee agrees to defend, indemnify, and hold harmless the Company, its directors, and clients against any and all claims, financial losses, regulatory fines, or damages resulting from any breach of confidentiality, gross negligence, or error committed in performance of duties.

8. GOVERNING LAW AND JURISDICTION:
This Agreement shall be construed in accordance with the laws of India. The courts at Bengaluru shall have exclusive jurisdiction.

Signed by:
For Apex Cloud Innovations Pvt Ltd (Director)
Employee: Vikram Aditya`;

  const sensitive = scanSensitiveData(rawText);

  return {
    id: 'doc-sample-employment',
    fileName: 'ApexCloud_Senior_Architect_Employment_Contract.pdf',
    fileSize: 245100,
    fileType: 'pdf',
    uploadTimestamp: '2024-01-15T14:30:00Z',
    docType: 'employment_contract',
    docTypeConfidence: 0.99,
    rawText,
    pageCount: 3,
    pages: [
      { pageNumber: 1, text: rawText.slice(0, rawText.indexOf('3. NOTICE PERIOD')) },
      { pageNumber: 2, text: rawText.slice(rawText.indexOf('3. NOTICE PERIOD'), rawText.indexOf('7. INDEMNIFICATION')) },
      { pageNumber: 3, text: rawText.slice(rawText.indexOf('7. INDEMNIFICATION')) }
    ],
    parties: [
      { name: 'Apex Cloud Innovations Pvt Ltd', role: 'Employer / Company', address: 'EcoSpace Business Park, Bellandur, Bengaluru - 560103' },
      { name: 'Mr. Vikram Aditya', role: 'Employee / Senior Cloud Solutions Architect', address: '#204, Green Glen Layout, Bellandur, Bengaluru', idDetails: 'PAN: AHKPV9012K, Aadhaar: 9021 5543 1187' }
    ],
    importantDates: [
      { id: 'ed-1', label: 'Agreement Date', date: '15 Jan 2024', clauseRef: 'Preamble', context: 'Signing date' },
      { id: 'ed-2', label: 'Date of Joining', date: '01 Feb 2024', clauseRef: 'Clause 1', context: 'Official employment commencement' },
      { id: 'ed-3', label: 'Probation End Date', date: '31 Jul 2024', clauseRef: 'Clause 1', context: '6 months probation completion' }
    ],
    amounts: [
      { id: 'ea-1', label: 'Annual Cost to Company (CTC)', amount: 'Rs. 24,00,000/-', recurrence: 'Per Annum', clauseRef: 'Clause 2', condition: 'Structured salary and allowances' },
      { id: 'ea-2', label: 'Notice Shortfall Liquidated Damages', amount: '3 Months Gross Salary (~Rs. 6,00,000/-)', recurrence: 'Upon shortfall', clauseRef: 'Clause 3', condition: 'Forfeited if 90 days notice is not fully served' }
    ],
    keyClauses: [
      {
        id: 'ec-1',
        clauseNumber: 'Clause 3',
        pageNumber: 2,
        title: '90-Day Notice Period & Liquidated Damages',
        originalText: 'Following confirmation of employment, the Employee must serve a mandatory Notice Period of 90 (ninety) calendar days. The Company reserves the right to reject any request for buyout of the notice period. In the event the Employee fails to serve the complete 90 days, the Employee shall be liable to forfeit and pay liquidated damages equal to 3 months\' gross salary to the Company.',
        plainExplanation: 'You must provide 3 full months (90 days) of notice before leaving. The company can refuse to let you buy out the period with money, and if you leave early, they can demand 3 months salary from you.',
        whyItMatters: 'A 90-day notice period is unusually long in the tech industry and can hinder securing future job offers, as many employers prefer 30 to 60 days joining windows.',
        actionToConsider: 'Ask whether the notice period can be negotiated to 30 or 60 days, or request that mutual buyout rights be clarified in writing.',
        category: 'Notice Period & Exit',
        isFlagged: true,
        flagSeverity: 'high',
        flagReason: 'Rigid 90-day notice with unilateral employer buyout discretion and 3 months salary forfeiture.'
      },
      {
        id: 'ec-2',
        clauseNumber: 'Clause 4',
        pageNumber: 2,
        title: 'Post-Employment Non-Compete Restriction',
        originalText: 'For a period of 12 (twelve) months following the cessation of employment for any reason, the Employee shall not directly or indirectly accept employment with, consult for, or establish any business or enterprise that competes with the software products and services offered by the Company anywhere in the territory of the Republic of India.',
        plainExplanation: 'This clause attempts to stop you from working for any competitor anywhere in India for 1 year after leaving this job.',
        whyItMatters: 'In India, post-employment non-compete clauses are generally considered void under Section 27 of the Indian Contract Act, 1872 as agreements in restraint of trade, unless protected under specific exceptions (like sale of goodwill). However, companies still include them to discourage employees.',
        actionToConsider: 'Discuss this clause with a qualified legal professional to understand your practical rights under Indian labor law before signing.',
        category: 'Non-Compete & Restraint of Trade',
        isFlagged: true,
        flagSeverity: 'critical',
        flagReason: '12-month post-employment non-compete restriction across India.'
      },
      {
        id: 'ec-3',
        clauseNumber: 'Clause 7',
        pageNumber: 3,
        title: 'Broad Personal Indemnification Clause',
        originalText: 'The Employee agrees to defend, indemnify, and hold harmless the Company, its directors, and clients against any and all claims, financial losses, regulatory fines, or damages resulting from any breach of confidentiality, gross negligence, or error committed in performance of duties.',
        plainExplanation: 'This makes you personally responsible for paying any client losses or government fines caused by work errors or mistakes.',
        whyItMatters: 'Standard employment agreements usually limit employee liability or cover errors through corporate Errors & Omissions insurance, rather than shifting unlimited personal liability onto an individual employee.',
        actionToConsider: 'Request limiting indemnification strictly to willful misconduct, or capping liability to a maximum of 1 or 2 months salary.',
        category: 'Liability & Indemnity',
        isFlagged: true,
        flagSeverity: 'critical',
        flagReason: 'Broad personal liability and indemnity imposing direct financial risk on the employee.'
      }
    ],
    signatures: {
      present: true,
      partiesSigned: ['Apex Cloud Innovations Pvt Ltd (Director)', 'Mr. Vikram Aditya'],
      witnessPresent: false,
      witnessCount: 0,
      executionDate: '15 Jan 2024',
      notarizedOrStamped: false
    },
    sensitiveItems: sensitive,
    isMasked: false
  };
})();

export const SAMPLE_LEGAL_NOTICE: DocumentData = (() => {
  const rawText = `REGISTERED POST WITH ACKNOWLEDGEMENT DUE / SPEED POST / LEGAL NOTICE

OFFICE OF ADVOCATE K. S. NARASIMHA RAO
B.Sc., LL.B., Advocate, High Court of Karnataka
Chamber No. 12, Lawyers Chambers Complex, High Court Buildings, Bengaluru - 560001
Ph: 080-22864321, Email: rao.advocate.blr@legalnotice.in

Ref: KSN/LN/2024/491
Date: 14th August 2024

TO:
Mr. Sandeep S. Hegde
Proprietor, M/s Hegde Infotech Solutions
#56, 2nd Main, 7th Cross, Malleshwaram, Bengaluru - 560003

SUB: STATUTORY DEMAND NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881 READ WITH SECTION 420 OF THE INDIAN PENAL CODE, 1860

Under instructions from and on behalf of my client, M/s Apex Component Systems, represented by its Managing Partner Mr. Ramesh Bhat, having office at Peenya Industrial Area, Bengaluru - 560058 (hereinafter referred to as 'My Client'), I hereby issue to you the following Statutory Legal Notice:

1. My client states that your firm placed Purchase Order No. ACS/PO/992 dated 10th May 2024 for supply of industrial server components, and my client duly supplied the goods under Invoice No. INV-2024-884 dated 22nd May 2024 for an aggregate sum of Rs. 4,50,000/- (Rupees Four Lakhs Fifty Thousand only).

2. Towards discharge of your legally enforceable debt and liability for the said goods, you issued Cheque bearing No. 448201 dated 15th July 2024 for Rs. 4,50,000/- drawn on State Bank of India, Malleshwaram Branch, Bengaluru in favor of my client.

3. My client presented the said cheque for encashment through their banker, Canara Bank, Peenya Branch on 18th July 2024. However, the said cheque was returned dishonoured and unpaid with Bank Return Memo dated 20th July 2024 with the endorsement: "FUNDS INSUFFICIENT".

4. You have deliberately issued the cheque knowing well that you did not have sufficient balance in your bank account, thereby deceiving my client and committing an offence under Section 138 of the Negotiable Instruments Act, 1881 and Section 420 of the Indian Penal Code.

5. STATUTORY DEMAND:
I hereby call upon you by this statutory notice to pay to my client the said cheque amount of Rs. 4,50,000/- (Rupees Four Lakhs Fifty Thousand only) along with interest at 18% per annum within 15 (fifteen) days from the date of receipt of this notice, failing which my client shall be constrained to initiate criminal proceedings against you under Section 138 of the Negotiable Instruments Act in the competent Metropolitan Magistrate Court at Bengaluru, which entails punishment of imprisonment up to 2 (two) years or fine up to double the cheque amount (Rs. 9,00,000/-) or both, at your entire cost and peril.

6. PRESERVE AND PRODUCE:
You are also called upon to preserve and produce all original communications, invoices, delivery challans, and bank statements pertaining to the aforesaid transaction.

A copy of this notice is retained in my office for future legal reference.

Yours faithfully,
(K. S. Narasimha Rao)
Advocate for Complainant`;

  const sensitive = scanSensitiveData(rawText);

  return {
    id: 'doc-sample-legal-notice',
    fileName: 'Statutory_Legal_Notice_Section_138_NI_Act.pdf',
    fileSize: 132400,
    fileType: 'pdf',
    uploadTimestamp: '2024-08-14T11:15:00Z',
    docType: 'legal_notice',
    docTypeConfidence: 0.99,
    rawText,
    pageCount: 2,
    pages: [
      { pageNumber: 1, text: rawText.slice(0, rawText.indexOf('5. STATUTORY DEMAND:')) },
      { pageNumber: 2, text: rawText.slice(rawText.indexOf('5. STATUTORY DEMAND:')) }
    ],
    parties: [
      { name: 'K. S. Narasimha Rao (Advocate)', role: 'Complainant Advocate / Sender' },
      { name: 'M/s Apex Component Systems (Mr. Ramesh Bhat)', role: 'Complainant / Creditor', address: 'Peenya Industrial Area, Bengaluru' },
      { name: 'Mr. Sandeep S. Hegde (M/s Hegde Infotech Solutions)', role: 'Recipient / Accused Drawer', address: '#56, 2nd Main, Malleshwaram, Bengaluru' }
    ],
    importantDates: [
      { id: 'nd-1', label: 'Notice Issuance Date', date: '14 Aug 2024', clauseRef: 'Preamble', context: 'Date Advocate issued the notice' },
      { id: 'nd-2', label: 'Cheque Date', date: '15 Jul 2024', clauseRef: 'Paragraph 2', context: 'Date stated on dishonoured cheque' },
      { id: 'nd-3', label: 'Bank Return Memo Date', date: '20 Jul 2024', clauseRef: 'Paragraph 3', context: 'Bank intimation of insufficient funds' },
      { id: 'nd-4', label: 'Statutory Cure Window', date: '15 Days from Receipt', clauseRef: 'Paragraph 5', context: 'Time to pay before criminal prosecution can be filed', isAmbiguous: false }
    ],
    amounts: [
      { id: 'na-1', label: 'Dishonoured Cheque Amount', amount: 'Rs. 4,50,000/-', recurrence: 'Principal Debt', clauseRef: 'Paragraph 2', condition: 'Cheque No. 448201' },
      { id: 'na-2', label: 'Demanded Interest', amount: '18% per annum', recurrence: 'Interest', clauseRef: 'Paragraph 5', condition: 'From date of default' },
      { id: 'na-3', label: 'Potential Criminal Statutory Penalty', amount: 'Up to Rs. 9,00,000/- (Double cheque amount)', recurrence: 'Statutory Penalty', clauseRef: 'Paragraph 5', condition: 'Under Section 138 NI Act if convicted' }
    ],
    keyClauses: [
      {
        id: 'nc-1',
        clauseNumber: 'Paragraph 5',
        pageNumber: 2,
        title: 'Statutory 15-Day Payment Window',
        originalText: 'I hereby call upon you by this statutory notice to pay to my client the said cheque amount of Rs. 4,50,000/- (Rupees Four Lakhs Fifty Thousand only) along with interest at 18% per annum within 15 (fifteen) days from the date of receipt of this notice, failing which my client shall be constrained to initiate criminal proceedings against you under Section 138 of the Negotiable Instruments Act...',
        plainExplanation: 'Under Indian law, you have exactly 15 days from the day you actually receive this notice to pay the Rs 4,50,000. If payment is made within 15 days, no criminal complaint under Section 138 can be legally filed against you.',
        whyItMatters: 'The 15-day period is strict and calculated from the date of physical receipt. Once the 15 days expire, the sender has 30 days to file a criminal complaint before the court.',
        actionToConsider: 'Record the exact date and tracking number when this notice was delivered to your hands. Consult a criminal/commercial lawyer immediately.',
        category: 'Statutory Deadline',
        isFlagged: true,
        flagSeverity: 'critical',
        flagReason: 'Mandatory 15-day statutory window before criminal case under Section 138 NI Act is filed.'
      },
      {
        id: 'nc-2',
        clauseNumber: 'Paragraph 4',
        pageNumber: 1,
        title: 'Criminal Allegations (Section 138 NI Act & Section 420 IPC)',
        originalText: 'You have deliberately issued the cheque knowing well that you did not have sufficient balance in your bank account, thereby deceiving my client and committing an offence under Section 138 of the Negotiable Instruments Act, 1881 and Section 420 of the Indian Penal Code.',
        plainExplanation: 'The sender claims you deliberately wrote a bad cheque to cheat them, asserting both cheque bounce provisions and criminal cheating.',
        whyItMatters: 'Section 138 NI Act carries up to 2 years imprisonment or fine up to double the cheque amount. Section 420 IPC involves allegations of fraudulent inducement.',
        actionToConsider: 'Gather proof of goods delivery, any dispute over quality, email correspondence, or proof of partial payments already made.',
        category: 'Criminal Allegation',
        isFlagged: true,
        flagSeverity: 'high',
        flagReason: 'Criminal prosecution threat with potential jail time and criminal trial.'
      }
    ],
    signatures: {
      present: true,
      partiesSigned: ['K. S. Narasimha Rao (Advocate for Complainant)'],
      witnessPresent: false,
      witnessCount: 0,
      executionDate: '14 Aug 2024',
      notarizedOrStamped: false
    },
    sensitiveItems: sensitive,
    isMasked: false,
    noticeDetails: {
      sender: 'K. S. Narasimha Rao, Advocate for M/s Apex Component Systems',
      senderAdvocate: 'K. S. Narasimha Rao, High Court of Karnataka',
      recipient: 'Mr. Sandeep S. Hegde, M/s Hegde Infotech Solutions, Malleshwaram',
      noticeDate: '14 Aug 2024',
      medium: 'Registered Post with Acknowledgement Due (RPAD) / Speed Post',
      statutoryProvisions: ['Section 138 Negotiable Instruments Act, 1881', 'Section 420 Indian Penal Code, 1860'],
      allegationsSummary: 'Alleged dishonour of Cheque No. 448201 for Rs. 4,50,000/- with memo "Funds Insufficient", issued towards supply of industrial server components under Invoice INV-2024-884.',
      demandedActions: [
        'Pay Rs. 4,50,000/- principal debt within 15 days of notice receipt',
        'Pay 18% per annum interest on default amount',
        'Cease and desist from any further defaults'
      ],
      statedConsequences: [
        'Criminal complaint under Section 138 NI Act before Metropolitan Magistrate Court Bengaluru',
        'Punishment of imprisonment up to 2 years',
        'Fine up to twice the cheque amount (Rs. 9,00,000/-)',
        'Recovery of litigation expenses and legal costs'
      ],
      requestedDocuments: [
        'Purchase Order No. ACS/PO/992',
        'Invoice INV-2024-884 and Delivery Challans',
        'Bank statements showing balance on 15 July 2024',
        'Written email or WhatsApp exchange regarding component quality or payments'
      ],
      preparationChecklist: [
        { id: 'p-1', task: 'Keep the original postal envelope with postal stamp and barcode sticker', completed: false, importance: 'Crucial for proving exact date of service/receipt in court' },
        { id: 'p-2', task: 'Print out the India Post online tracking delivery confirmation', completed: false, importance: 'Establishes day 1 of the 15-day statutory clock' },
        { id: 'p-3', task: 'Collect original Purchase Order, Delivery Challans, and inspection notes', completed: false, importance: 'Shows whether the debt was disputed or fully enforceable' },
        { id: 'p-4', task: 'Export all WhatsApp/Email conversations with Mr. Ramesh Bhat', completed: false, importance: 'Helps demonstrate lack of fraudulent intent or mutual payment extension' },
        { id: 'p-5', task: 'Draft a chronological timeline of transactions and payments', completed: false, importance: 'Allows your advocate to prepare a formal reply notice within 15 days' }
      ],
      lawyerQuestions: [
        'What is our exact statutory deadline to send a formal legal reply to this notice?',
        'Does the condition of goods or any dispute on invoice amount constitute a valid defense under Section 138?',
        'Should we issue a formal reply notice denying criminal intent while proposing a structured settlement?',
        'What happens if we deposit the principal amount into court or directly to the complainant within 15 days?'
      ]
    }
  };
})();

export const ALL_SAMPLE_DOCS: DocumentData[] = [
  SAMPLE_RENTAL_AGREEMENT,
  SAMPLE_EMPLOYMENT_CONTRACT,
  SAMPLE_LEGAL_NOTICE
];
