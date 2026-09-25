# LegalLens AI: Professional Legal Information & Document Navigation Assistant

> **Disclaimer:** LegalLens AI provides general legal information and document navigation assistance only. It is not a law firm, does not provide legal advice, and does not create an attorney-client relationship. All analysis is strictly grounded in the uploaded document text. For specific legal advice, users must consult a qualified legal professional.

---

## 1. Challenge Prerequisites Checklist

| Prerequisite | Status | Details |
| :--- | :---: | :--- |
| **AI Platform Setup** | ✅ Completed | Fully downloaded, configured, and integrated with OpenRouter (`openai/gpt-4o`) and resilient local heuristic reasoning engine. |
| **Git Installed & Configured** | ✅ Completed | Git v2.40+ configured with clean commit history and automated CI/CD workflows. |
| **Active GitHub Account** | ✅ Completed | Maintained under active GitHub profile: [@sujaymh27](https://github.com/sujaymh27). |
| **Public Repository** | ✅ Completed | Hosted publicly at [https://github.com/sujaymh27/LegalLens-AI](https://github.com/sujaymh27/LegalLens-AI). |

---

## 2. Chosen Vertical: Legal-Tech & Document Intelligence

Legal documents—such as residential rental leases, tech employment agreements, commercial vendor contracts, and statutory legal notices—are intentionally drafted in archaic, convoluted legalese. Ordinary citizens, tenants, employees, and small business owners routinely sign agreements without comprehending unilateral liabilities, hidden financial deductions, rigid lock-in periods, or statutory limitation clocks.

**LegalLens AI** addresses this critical information asymmetry by transforming complex legal instruments into accessible, plain-language insights, complete with exact clause citations, dynamic deadline calculations, risk attention flags, document comparison diffs, and an exportable **Lawyer Consultation Preparation Pack**.

---

## 3. Persona & Logical Decision Making Based on User Context

LegalLens AI embodies the persona of a **Meticulous, Impartial Legal Document Navigator**. It adheres strictly to the following decision-making logic:

1. **Context-Aware Persona Adaptation:**
   - **Rental Agreements:** Prioritizes security deposit deduction rules, 3-month lock-in periods, notice periods, and maintenance responsibilities.
   - **Employment Contracts:** Focuses on post-employment non-compete validity under Section 27 of the Indian Contract Act 1872, IP ownership assignment, 90-day notice periods, and personal indemnity exposure.
   - **Statutory Legal Notices (e.g., Section 138 NI Act):** Immediately activates the specialized 15-day statutory response clock, highlights criminal penalties under the Negotiable Instruments Act, and generates an evidentiary defense checklist.
2. **Information, Never Advice:** Explains *what clauses mean* in simple words, explains *why they matter*, and suggests *actions/questions to consider*, without ever declaring clauses definitively "illegal" or prescribing mandatory legal maneuvers.
3. **Strict Document Grounding & Exact Citations:** Every explanation, obligation, and Q&A answer is tied directly to physical coordinates in the document (e.g., `"Page 2, Clause 6"` or `"Page 1, Paragraph 4"`). When information cannot be found, the system explicitly states:
   > *"I could not locate this information in the uploaded document."*
4. **Courtroom-Grade Professionalism (Zero Emojis):** Maintains strict neutral, objective language with clean typography and high-contrast styling.
5. **Multilingual Inclusivity:** Full bidirectional UI and analysis support for **English**, **Hindi (हिन्दी)**, and **Kannada (ಕನ್ನಡ)**.

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

## 4. Evaluation Focus Areas Breakdown

Our solution is engineered specifically to excel across all evaluation tiers:

### 🌟 High-Impact Focus Areas
- **Problem Statement Alignment:** Deeply rooted in the Legal-Tech vertical. Solves genuine consumer and SME legal literacy issues with contextual assistance, exact source citations, and clear refusal boundaries when queries exceed document scope.
- **Security & Privacy:** 
  - **Zero Server Retention:** Document parsing runs entirely client-side; raw document files never touch an intermediate storage server.
  - **Client-Side PII Redaction Vault:** Real-time regex detection and masking for Indian identifiers (**Aadhaar Numbers, PAN Cards, Bank Account Numbers, IFSC Codes, Salary figures**).
  - **Production Security Headers:** Configured with `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
  - **No Hardcoded Secrets:** Strict environment variable and user-supplied local storage credentials.
- **Testing (68 Automated Unit Tests):** 
  - Comprehensive Vitest suite running in **548ms** across 7 test files.
  - Covers AI citation extraction, cache mechanisms, offline heuristic fallback, multilingual rendering, PII regex scanning, document extraction, and contract auditing.

### ⚡ Medium-Impact Focus Areas
- **Efficiency & Resource Optimization:**
  - In-memory LRU response caching prevents duplicate AI queries.
  - Sub-millisecond rule-based heuristic extraction ensures zero-latency offline document understanding.
  - Synchronous component rendering ensures immediate DOM availability for screen readers, headless browsers, and test runners.
- **Code Quality & Maintainability:**
  - 100% strict TypeScript types with zero `any` castings in core business logic.
  - Passes `oxlint` with **0 errors and 0 warnings**.
  - Clean separation of concerns between extraction, privacy scanning, localization, and UI layers.

### 🎨 Low-Impact Focus Areas (Polish & Accessibility)
- **Accessibility (WCAG 2.1 AA Compliant):**
  - High-contrast black-and-white courtroom aesthetic with clear visual hierarchy.
  - Skip to main content link for keyboard navigation (`Tab` / `Shift+Tab`).
  - Escape key modal dismissals and proper ARIA landmarks (`role="main"`, `role="status"`, `aria-label`).
- **Exportable Lawyer Consultation Brief:**
  - `@media print` stylesheet formatted for clean, professional PDF exports.

---

## 5. Core Capabilities Walkthrough

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
- **Interactive Event-Based Deadline Calculator:** For dynamic deadlines (e.g., *"15 days from notice receipt"* or *"60 days prior to lease vacating"*), users pick the triggering event date, and LegalLens AI calculates the exact target calendar date and countdown transparently.

### E. Ask-Your-Document Q&A
- Strictly grounded question answering powered by OpenRouter `openai/gpt-4o`.
- Formats answers with clickable citations (`Page X, Clause Y`).
- Provides follow-up prompt suggestions tailored to the active contract type.
- Distinguishes document-grounded facts from general legal information with disclaimer notices.

### F. Semantic Document Comparison
- Compares two agreements side-by-side (e.g., Old vs. New Rental Lease, or Draft vs. Signed version).
- Automatically aligns equivalent categories (Notice Period, Compensation, Restraint of Trade, Governing Law).
- Categorizes each pair as: *Verbatim Identical*, *Substantially Similar*, *Meaningful Difference in Impact*, or *Missing in Document A/B*.

### G. Legal Notice Navigator
Dedicated specialized workflow for demand letters and court notices:
- Details Sender Advocate, Recipient, Dispatch Mode (RPAD / Speed Post), and Notice Date.
- Breaks down statutory provisions (e.g., Section 138 NI Act, Section 420 IPC).
- Highlights demanded actions and stated consequences (civil suit, imprisonment up to 2 years, double fine).
- **Interactive Evidentiary Checklist:** Step-by-step preparation checklist (preserving postal envelopes, India Post delivery memos, WhatsApp exports, transaction timelines).

### H. Lawyer Preparation Pack
- Formats a complete executive briefing document:
  1. Summary of Facts and Parties
  2. Chronological Timeline and Critical Deadlines
  3. Priority Points of Concern and Flagged Clauses
  4. Strategic Questions to Ask Your Lawyer
  5. Evidentiary Document Collection Checklist
- Clean print-to-PDF layout (`@media print` stylesheet) for clean, one-click PDF generation.

---

## 6. Technology Stack

- **Frontend Framework:** React 19 + TypeScript + Vite
- **Styling:** Custom Black-and-White Design System (WCAG AA compliant)
- **Document Parsers:** `pdfjs-dist` (PDF text layer extraction), `mammoth` (DOCX extraction), `tesseract.js` (Optical Character Recognition)
- **Icons:** `lucide-react`
- **GenAI Integration:** OpenRouter API (`openai/gpt-4o`) with resilient local fallback engine
- **Testing:** `vitest` (68 automated unit tests)
- **Linter:** `oxlint` (0 errors, 0 warnings)

---

## 7. Getting Started & Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/sujaymh27/LegalLens-AI.git
cd LegalLens-AI

# Install dependencies
npm install

# Run the local development server
npm run dev
```

The application will be live at `http://127.0.0.1:5173/`.

### Running Tests
To run the automated Vitest test suite (68 tests):
```bash
npm test
```

### Production Build & Linting
To validate TypeScript types and generate the production bundle:
```bash
npm run build
npx oxlint
```

---

## 8. License & Compliance
This project is open-source under the MIT License.
Built strictly for educational and legal information navigation purposes.
