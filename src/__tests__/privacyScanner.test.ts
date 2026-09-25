import { describe, it, expect } from 'vitest';
import { scanSensitiveData, maskText } from '../services/privacyScanner';

describe('Privacy Scanner & Redaction Service', () => {
  it('detects Indian Aadhaar numbers formatted with spaces or dashes', () => {
    const text = 'Party Aadhaar No: 4921 8832 9104 and secondary 9021-5543-1187.';
    const results = scanSensitiveData(text);
    const aadhaars = results.filter(r => r.type === 'aadhaar');
    expect(aadhaars.length).toBeGreaterThanOrEqual(1);
    expect(aadhaars[0].originalValue).toContain('4921 8832 9104');
    expect(aadhaars[0].maskedValue).toBe('4921 XXXX 9104');
  });

  it('detects Indian PAN tax identifiers', () => {
    const text = 'Lessor PAN is ABCPV1234F and Lessee PAN is BZTPS5678M.';
    const results = scanSensitiveData(text);
    const pans = results.filter(r => r.type === 'pan');
    expect(pans.length).toBe(2);
    expect(pans[0].maskedValue).toContain('ABXXX');
  });

  it('detects Bank IFSC codes and Account Numbers', () => {
    const text = 'Send rent to Account No: 023101509921, IFSC: HDFC0000128.';
    const results = scanSensitiveData(text);
    const bankItems = results.filter(r => r.type === 'bank_account');
    expect(bankItems.length).toBeGreaterThanOrEqual(2);
  });

  it('detects 10-digit Indian mobile and contact numbers', () => {
    const text = 'Call landlord at +91 9876543210 or alternate 8123456789.';
    const results = scanSensitiveData(text);
    const phones = results.filter(r => r.type === 'phone');
    expect(phones.length).toBeGreaterThanOrEqual(1);
    expect(phones[0].maskedValue).toContain('+91 ');
    expect(phones[0].maskedValue).toContain('XXXXXX');
  });

  it('flags confidential compensation and CTC salary figures', () => {
    const text = 'Annual CTC: Rs 24,00,000 LPA payable in monthly instalments.';
    const results = scanSensitiveData(text);
    const salaries = results.filter(r => r.type === 'salary');
    expect(salaries.length).toBeGreaterThanOrEqual(1);
    expect(salaries[0].maskedValue).toBe('[CONFIDENTIAL SALARY DATA REDACTED]');
  });

  it('flags sensitive medical conditions and health histories', () => {
    const text = 'Employee agrees to disclose any prior hospitalization report or psychiatric treatment.';
    const results = scanSensitiveData(text);
    const medicals = results.filter(r => r.type === 'medical');
    expect(medicals.length).toBeGreaterThanOrEqual(1);
  });

  it('correctly masks multiple sensitive items in compound text', () => {
    const text = 'Signatory PAN ABCPV1234F, Aadhaar 4921 8832 9104, phone 9876543210 signed at Bengaluru.';
    const items = scanSensitiveData(text);
    const masked = maskText(text, items);
    expect(masked).not.toContain('ABCPV1234F');
    expect(masked).not.toContain('4921 8832 9104');
    expect(masked).toContain('ABXXX');
    expect(masked).toContain('4921 XXXX 9104');
  });
});

