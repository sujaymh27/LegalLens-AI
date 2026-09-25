import { describe, it, expect } from 'vitest';
import {
  detectDocumentType,
  partitionTextIntoPages,
  extractParties,
  extractFinancialAmounts,
  extractImportantDates,
  processUploadedFile
} from '../services/documentExtractor';

describe('Document Extractor & Parsing Service', () => {
  describe('Document Type Classification', () => {
    it('detects statutory legal notice correctly', () => {
      const text = 'LEGAL NOTICE UNDER SECTION 138 OF NEGOTIABLE INSTRUMENTS ACT. I hereby call upon you...';
      expect(detectDocumentType(text)).toBe('legal_notice');
    });

    it('detects residential rental agreement correctly', () => {
      const text = 'RESIDENTIAL LEASE AGREEMENT. THIS INDENTURE made between LESSOR and LESSEE for tenancy...';
      expect(detectDocumentType(text)).toBe('rental_agreement');
    });

    it('detects employment contract correctly', () => {
      const text = 'EMPLOYMENT CONTRACT. We are pleased to offer you the position. Cost to Company (CTC) Rs 24,00,000...';
      expect(detectDocumentType(text)).toBe('employment_contract');
    });

    it('detects non-disclosure agreements (NDA) correctly', () => {
      const text = 'MUTUAL NON-DISCLOSURE AGREEMENT. The Disclosing Party and Receiving Party agree...';
      expect(detectDocumentType(text)).toBe('nda');
    });

    it('detects insurance policy correctly', () => {
      const text = 'HEALTH INSURANCE POLICY SCHEDULE. Policyholder name, Sum Insured Rs 10,00,000, Premium due...';
      expect(detectDocumentType(text)).toBe('insurance_policy');
    });

    it('falls back to general contract type for unrecognized text', () => {
      const text = 'This is a simple collaboration memo between two freelance artists.';
      expect(detectDocumentType(text)).toBe('general');
    });
  });

  describe('Page Partitioning & Content Layout', () => {
    it('partitions text on explicit page delimiter markers', () => {
      const multiPage = '--- PAGE 1 ---\nFirst page terms.\n\n--- PAGE 2 ---\nSecond page terms.';
      const pages = partitionTextIntoPages(multiPage);
      expect(pages.length).toBe(2);
      expect(pages[0].pageNumber).toBe(1);
      expect(pages[0].text).toContain('First page');
      expect(pages[1].pageNumber).toBe(2);
      expect(pages[1].text).toContain('Second page');
    });

    it('creates at least one page for short text without delimiters', () => {
      const singlePage = 'Short agreement text.';
      const pages = partitionTextIntoPages(singlePage);
      expect(pages.length).toBe(1);
      expect(pages[0].pageNumber).toBe(1);
      expect(pages[0].text).toBe(singlePage);
    });
  });

  describe('Financial Amount Extraction', () => {
    it('extracts INR and Rupee amounts with symbol or prefix', () => {
      const text = 'Monthly rent of Rs. 38,000/- with security deposit of ₹ 2,00,000 (Rupees Two Lakhs).';
      const amounts = extractFinancialAmounts(text);
      expect(amounts.length).toBeGreaterThanOrEqual(1);
      expect(amounts.some(a => a.amount.includes('38,000') || a.amount.includes('2,00,000'))).toBe(true);
    });

    it('deduplicates identical amounts to avoid cluttered cards', () => {
      const text = 'Rs. 50,000 payable initially, and Rs. 50,000 refunded later.';
      const amounts = extractFinancialAmounts(text);
      const uniqueAmounts = new Set(amounts.map(a => a.amount));
      expect(amounts.length).toBe(uniqueAmounts.size);
    });
  });

  describe('Important Dates & Notice Windows', () => {
    it('extracts calendar dates in standard formats', () => {
      const text = 'Agreement executed on 1st November 2024 and expires on 30th September 2025.';
      const dates = extractImportantDates(text);
      expect(dates.length).toBeGreaterThanOrEqual(1);
      expect(dates.some(d => d.date.includes('November 2024'))).toBe(true);
    });

    it('extracts mandatory notice period deadlines', () => {
      const text = 'Either party may terminate by providing 30 days notice in writing.';
      const dates = extractImportantDates(text);
      expect(dates.some(d => d.label === 'Notice Period Deadline' && d.date.includes('30 days'))).toBe(true);
    });
  });

  describe('Party Identification', () => {
    it('extracts Lessor and Lessee in rental agreements', () => {
      const text = 'LESSOR: Rakesh Sharma, residing at Bengaluru.\nLESSEE: Priya Nair, residing at Koramangala.';
      const parties = extractParties(text, 'rental_agreement');
      expect(parties.length).toBe(2);
      expect(parties[0].role).toContain('Lessor');
      expect(parties[0].name).toContain('Rakesh Sharma');
      expect(parties[1].role).toContain('Lessee');
      expect(parties[1].name).toContain('Priya Nair');
    });

    it('extracts Advocate and recipient in legal notices', () => {
      const text = 'ADVOCATE: Rajesh Kumar, High Court of Karnataka.\nTO: Vikram Mehta, Managing Director.';
      const parties = extractParties(text, 'legal_notice');
      expect(parties.some(p => p.role.includes('Advocate'))).toBe(true);
      expect(parties.some(p => p.role.includes('Recipient'))).toBe(true);
    });
  });

  describe('File Validation & Upload Processing', () => {
    it('rejects empty 0-byte uploaded files', async () => {
      const emptyFile = new File([''], 'empty.pdf', { type: 'application/pdf' });
      await expect(processUploadedFile(emptyFile)).rejects.toThrow('uploaded file is empty');
    });

    it('rejects unsupported file formats like executable files', async () => {
      const badFile = new File(['binary payload'], 'malware.exe', { type: 'application/x-msdownload' });
      await expect(processUploadedFile(badFile)).rejects.toThrow('Unsupported file format');
    });

    it('successfully processes plain text legal documents (.txt)', async () => {
      const content = `RESIDENTIAL LEASE AGREEMENT
LESSOR: Arvind Swamy
LESSEE: Sunita Rao
The monthly rent is Rs. 25,000/- payable on the 5th of each month.
Security deposit of Rs. 1,00,000/- shall be refunded upon vacating.
Either party may terminate with 30 days notice.`;

      const txtFile = new File([content], 'lease_sample.txt', { type: 'text/plain' });
      const docData = await processUploadedFile(txtFile);

      expect(docData.fileName).toBe('lease_sample.txt');
      expect(docData.docType).toBe('rental_agreement');
      expect(docData.parties.length).toBeGreaterThanOrEqual(1);
      expect(docData.pageCount).toBe(1);
      expect(docData.keyClauses.length).toBeGreaterThan(0);
    });
  });
});
