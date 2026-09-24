# LegalLens AI: Professional Legal Information & Document Navigation Assistant

> **Disclaimer:** LegalLens AI provides general legal information and document navigation assistance only. It is not a law firm, does not provide legal advice, and does not create an attorney-client relationship. All analysis is strictly grounded in the uploaded document text. For specific legal advice, users must consult a qualified legal professional.

---

## 1. Chosen Vertical: Legal-Tech & Document Intelligence

Legal documents—such as rental leases, employment agreements, vendor contracts, and statutory legal notices—are intentionally drafted in archaic, convoluted legalese. Ordinary citizens, tenants, employees, and small business owners routinely sign agreements without comprehending unilateral liabilities, hidden financial deductions, rigid lock-in periods, or statutory limitation clocks.

**LegalLens AI** solves this critical information asymmetry by transforming complex legal instruments into accessible, plain-language insights, complete with exact clause citations, dynamic deadline calculations, risk attention flags, document comparison diffs, and an exportable **Lawyer Consultation Preparation Pack**.

---

## 2. Approach and Architectural Logic

LegalLens AI is designed with an **API-first, privacy-centric architecture** adhering to the following core tenets:

1. **Information, Never Advice:** The assistant explains *what clauses mean* in plain language, highlights *why they matter*, and suggests *actions/questions to consider*, without ever declaring clauses definitively "illegal" or prescribing mandatory legal maneuvers.
2. **Strict Document Grounding & Exact Citations:** Every explanation, obligation, and Q&A answer is tied directly to physical coordinates in the document (e.g., `"Page 2, Clause 6"` or `"Page 1, Paragraph 4"`). When information cannot be found, the system explicitly states: *"I could not locate this information in the uploaded document."*
3. **Neutral, Professional Tone (Zero Emojis):** Maintains strict courtroom-grade professionalism.
4. **Client-Side Ingestion & Privacy Vault:** Ingests PDFs, Word DOCX files, and scanned photos directly in the browser via client-side parsers and Tesseract OCR. Built-in regex scanners detect Indian identifiers (**Aadhaar, PAN, Bank Accounts/IFSC, Salaries**) and offer an instant toggle to mask/redact sensitive data before AI reasoning prompts.
5. **Resilient AI Reasoning:** Integrates OpenRouter's `openai/gpt-4o` API with an intelligent local heuristic fallback engine, ensuring uninterrupted performance during network outages, CORS constraints, or API rate limits.
6. **Multilingual Inclusivity:** Full bidirectional UI and analysis support for **English**, **Hindi (हिन्दी)**, and **Kannada (ಕನ್ನಡ)**.

```
                             +-------------------------------+
                             |    Uploaded Legal Document    |
                             |    (PDF / DOCX / JPG / PNG)   |
                             +---------------+---------------+
                                             |
                                             v
                             +-------------------------------+
                             | Document Extractor & OCR      |
                             | (pdfjs-dist / mammoth / OCR)  |
                             +---------------+---------------+
                                             |
                   +-------------------------+-------------------------+
                   |                                                   |
                   v                                                   v
   +-------------------------------+                   +-------------------------------+
   | Privacy Scanner & Redactor    |                   | Document Structure Parser     |
   | (Aadhaar / PAN / Bank IFSC)   |                   | (Parties, Dates, Amounts,     |
   +---------------+---------------+                   | Key Clauses, Execution Sigs)  |
                   |                                   +---------------+---------------+
                   +-------------------------+-------------------------+
                                             |
                                             v
                      +---------------------------------------------+
                      |        LegalLens AI Navigation Engine       |
                      |                                             |
                      |  [1] Overview & Structural Extraction       |
                      |  [2] Plain-Language Clause Explanations     |
                      |  [3] Risk & Attention Severity Stratifier   |
                      |  [4] Dynamic Event Deadline Calculator      |
                      |  [5] Ask-Your-Document Q&A (OpenRouter API) |
                      |  [6] Semantic Document Comparison (Diff)    |
                      |  [7] Legal Notice Navigator & Checklist     |
                      |  [8] Printable Lawyer Preparation Brief     |
                      |  [9] Multilingual Localization (EN/HI/KN)   |
                      +---------------------------------------------+
```

---

## 3. Core Capabilities Walkthrough

### A. Document Upload & Content Extraction
- Ingests native digital PDFs, Microsoft Word (`.docx`), plain text, and scanned camera images (`.jpg`, `.png`).
- Built-in optical character recognition (OCR) with confidence scoring and low-quality warnings for blurry or skewed scans.
- Extracts and presents 4 core pillars:
  - **Identified Parties & Roles** (Lessor/Lessee, Employer/Employee, Complainant Advocate/Recipient).
  - **Key Dates & Timelines** (Commencement, Lock-in, Notice Windows, Expiration).
  - **Financial Amounts & Deposits** (Base rent, security deposits, CTC salary, penalty interest).
  - **Execution & Signatures** (Signatory status, attesting witnesses, notarization stamps).
- Pre-loaded with realistic sample contracts (Bangalore Residential Lease, Tech Employment Agreement, Section 138 NI Act Legal Notice).

### B. Plain-Language Clause Breakdown
For every contract clause:
- **Original Citation:** Page and clause reference.
- **Plain-Language Explanation:** What the clause states in non-technical terms.
- **Why It Matters To You:** The practical real-world impact.
- **Action / Question to Consider:** Suggested next steps or discussion points.
- **Original Legalese Viewer:** Expandable quote to cross-reference verbatim text.

### C. Risk & Attention Flags
Stratifies clauses by severity:
- **High Caution / Significant Impact:** 12-month post-employment non-compete covenants (Section 27 Contract Act analysis), unlimited personal indemnification, automatic one-month painting deductions.
- **Important Attention:** 90-day mandatory notice periods, unilateral employer buyout discretion, 3-month lock-in periods.
- **Standard Commercial Attention:** Exclusive court jurisdiction and private arbitration requirements.

### D. Obligations & Dynamic Deadline Tracker
- Tabulates who must do what, by when, and under what contractual conditions.
- **Interactive Event-Based Deadline Calculator:** For dynamic deadlines (e.g., *"15 days from notice receipt"* or *"60 days prior to lease vacating"*), users pick the triggering event date, and LegalLens AI calculates the exact target calendar date and days countdown transparently.

### E. Ask-Your-Document Q&A
- Strictly grounded question answering powered by OpenRouter `openai/gpt-4o`.
- Formats answers with clickable citations (`Page X, Clause Y`).
- Provides follow-up prompt suggestions tailored to the active contract type.
- Transparently distinguishes document-grounded facts from general legal information with disclaimer notices.

### F. Semantic Document Comparison
- Compares two agreements side-by-side (e.g., Old vs. New Rental Lease, or Draft vs. Signed version).
- Automatically aligns equivalent categories (Notice Period, Compensation, Restraint of Trade, Governing Law).
- Categorizes each pair as: *Verbatim Identical*, *Substantially Similar*, *Meaningful Difference in Impact*, or *Missing in Document A/B*.
- Flags mismatches if comparing disparate document types or unexecuted drafts.

### G. Legal Notice Navigator
Dedicated specialized workflow for demand letters and court notices:
- Details Sender Advocate, Recipient, Dispatch Mode (RPAD / Speed Post), and Notice Date.
- Breaks down statutory provisions (e.g., Section 138 NI Act, Section 420 IPC).
- Highlights demanded actions and stated consequences (civil suit, imprisonment up to 2 years, double fine).
- **Interactive Evidentiary Checklist:** Step-by-step preparation checklist (preserving postal envelopes, India Post delivery memos, WhatsApp exports, transaction timelines).
- Strategic questions to ask legal counsel.

### H. Lawyer Preparation Pack
- Formats a complete executive briefing document:
  1. Summary of Facts and Parties
  2. Chronological Timeline and Critical Deadlines
  3. Priority Points of Concern and Flagged Clauses
  4. Strategic Questions to Ask Your Lawyer
  5. Evidentiary Document Collection Checklist
- Clean print-to-PDF layout (`@media print` stylesheet) for clean, one-click PDF generation.

### I. Multilingual Support
- Seamless one-click switching between **English**, **Hindi (हिन्दी)**, and **Kannada (ಕನ್ನಡ)** across all tabs, cards, explanations, and calculator tools.
- Preserves original clause text in its source language while presenting translated explanations.

### J. Privacy & Security Vault
- Client-side regex scanner for **Aadhaar Numbers**, **PAN Cards**, **Bank Account Numbers**, **IFSC Routing Codes**, and **Salary figures**.
- One-click **"Activate Full Redaction"** toggle masks sensitive numbers with secure placeholders before displaying or sending prompts to AI.
- Zero data retention: One-click session purge permanently erases all ingested text from memory.

---

## 4. Technology Stack

- **Frontend Framework:** React 19 + TypeScript + Vite
- **Styling:** Custom CSS Design System with dark glassmorphism, legal slate/navy, and gold accents
- **Document Parsers:** `pdfjs-dist` (PDF text layer extraction), `mammoth` (DOCX extraction), `tesseract.js` (Optical Character Recognition)
- **Icons:** `lucide-react`
- **GenAI Integration:** OpenRouter API (`openai/gpt-4o`) with resilient local fallback engine
- **Testing:** `vitest`

---

## 5. Getting Started & Local Development

### Prerequisites
- Node.js (v18+ recommended, tested on v24)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/<YOUR_USERNAME>/LegalLens.git
cd LegalLens

# Install dependencies
npm install

# Run the local development server
npm run dev
```

The application will be live at `http://127.0.0.1:5173/`.

### Running Tests
To run the automated Vitest test suite:
```bash
npm test
```

### Production Build
To validate TypeScript types and generate the production bundle:
```bash
npm run build
```

---

## 6. Assumptions Made

1. **Document Types:** The current rule-based classifier recognizes Rental Agreements, Employment Contracts, Statutory Legal Notices (Section 138 NI Act), NDAs, Insurance Policies, Vendor Contracts, and Terms of Service.
2. **Indian Legal Context:** Pre-configured with prominent Indian statutory references (Section 27 Indian Contract Act 1872, Section 138 Negotiable Instruments Act 1881, Section 420 IPC, Karnataka Rent/Stamp regulations), while remaining adaptable to international contract structures.
3. **Client-Side Execution:** Document text parsing and OCR are designed to execute entirely client-side to maximize user privacy and prevent unauthorized third-party document caching.
4. **Resilient AI Pipeline:** If an API rate limit or network issue occurs when contacting OpenRouter, the application automatically engages a built-in semantic extractor so the user experience is never interrupted.

---

## 7. License & Compliance
This project is open-source under the MIT License.
Built strictly for educational and legal information navigation purposes.
