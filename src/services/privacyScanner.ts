import { SensitiveDataItem } from '../types';

export function scanSensitiveData(text: string): SensitiveDataItem[] {
  const items: SensitiveDataItem[] = [];
  let idCounter = 1;

  // 1. Aadhaar Number (12 digits, often formatted as 1234 5678 9012 or 1234-5678-9012)
  const aadhaarRegex = /\b([2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4})\b/g;
  let match;
  while ((match = aadhaarRegex.exec(text)) !== null) {
    const raw = match[1];
    // check if it's not a generic timestamp or order number
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length === 12) {
      const masked = `${digitsOnly.slice(0, 4)} XXXX ${digitsOnly.slice(8)}`;
      items.push({
        id: `sens-${idCounter++}`,
        type: 'aadhaar',
        label: 'Aadhaar Identification Number',
        originalValue: raw,
        maskedValue: masked,
        location: `Text position ~${match.index}`
      });
    }
  }

  // 2. PAN Card Number (Permanent Account Number - 5 letters, 4 digits, 1 letter)
  const panRegex = /\b([A-Z]{5}[0-9]{4}[A-Z]{1})\b/g;
  while ((match = panRegex.exec(text)) !== null) {
    const raw = match[1];
    const masked = `${raw.slice(0, 2)}XXX${raw.slice(5, 7)}XX${raw.slice(-1)}`;
    items.push({
      id: `sens-${idCounter++}`,
      type: 'pan',
      label: 'PAN Card (Tax Identifier)',
      originalValue: raw,
      maskedValue: masked,
      location: `Text position ~${match.index}`
    });
  }

  // 3. Bank Account Numbers & IFSC
  const ifscRegex = /\b([A-Z]{4}0[A-Z0-9]{6})\b/gi;
  while ((match = ifscRegex.exec(text)) !== null) {
    const raw = match[1].toUpperCase();
    items.push({
      id: `sens-${idCounter++}`,
      type: 'bank_account',
      label: 'Bank IFSC Routing Code',
      originalValue: match[1],
      maskedValue: `${raw.slice(0, 4)}0XXXXXX`,
      location: `Text position ~${match.index}`
    });
  }

  const bankAccRegex = /(?:Account(?:\s*No[.:]?)?|A\/c(?:\s*No[.:]?)?|Acc(?:\s*No[.:]?)?)\s*[:#]?\s*(\d{9,18})/gi;
  while ((match = bankAccRegex.exec(text)) !== null) {
    const raw = match[1];
    const masked = `XXXXXXXX${raw.slice(-4)}`;
    items.push({
      id: `sens-${idCounter++}`,
      type: 'bank_account',
      label: 'Bank Account Number',
      originalValue: raw,
      maskedValue: masked,
      location: `Near "${match[0].slice(0, 20)}"`
    });
  }

  // 4. Phone Numbers (Indian format +91 or 10-digit mobile)
  const phoneRegex = /(?:\+91[\s-]?)?([6-9]\d{9})\b/g;
  while ((match = phoneRegex.exec(text)) !== null) {
    const raw = match[0];
    const digits = match[1];
    const masked = `+91 ${digits.slice(0, 2)}XXXXXX${digits.slice(-2)}`;
    // Avoid duplicate matching if it's already part of Aadhaar
    if (!items.some(i => i.originalValue.includes(raw))) {
      items.push({
        id: `sens-${idCounter++}`,
        type: 'phone',
        label: 'Direct Contact Number',
        originalValue: raw,
        maskedValue: masked,
        location: `Text position ~${match.index}`
      });
    }
  }

  // 5. Salary Details (Specific CTC / Compensation mentions)
  const salaryRegex = /(?:CTC|Salary|Annual Compensation|Base Pay|Gross Emoluments)\s*[:=]?\s*(?:INR|Rs\.?|₹)?\s*([\d,]+(?:\s*(?:LPA|per annum|per month|\/-\s*pm|\/-\s*pa))?)/gi;
  while ((match = salaryRegex.exec(text)) !== null) {
    const raw = match[0];
    const val = match[1];
    if (val && val.length > 3) {
      items.push({
        id: `sens-${idCounter++}`,
        type: 'salary',
        label: 'Confidential Compensation / Salary Figure',
        originalValue: raw,
        maskedValue: '[CONFIDENTIAL SALARY DATA REDACTED]',
        location: `Salary Clause`
      });
    }
  }

  // 6. Medical / Health records
  const medicalRegex = /\b(medical history|health diagnosis|disability record|psychiatric|hospitalization report|blood group [ABO+-]+)\b/gi;
  while ((match = medicalRegex.exec(text)) !== null) {
    items.push({
      id: `sens-${idCounter++}`,
      type: 'medical',
      label: 'Sensitive Health / Medical Reference',
      originalValue: match[0],
      maskedValue: '[PROTECTED HEALTH INFORMATION]',
      location: `Medical Reference`
    });
  }

  return items;
}

export function maskText(text: string, sensitiveItems: SensitiveDataItem[]): string {
  let masked = text;
  for (const item of sensitiveItems) {
    if (item.originalValue && item.maskedValue) {
      masked = masked.split(item.originalValue).join(item.maskedValue);
    }
  }
  return masked;
}
