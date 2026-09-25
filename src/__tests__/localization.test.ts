import { describe, it, expect } from 'vitest';
import { TRANSLATIONS, getLocalizedClause } from '../services/localization';
import { SAMPLE_RENTAL_AGREEMENT } from '../services/sampleDocuments';
import { ClauseItem } from '../types';

describe('Localization & Trilingual Translation Service', () => {
  const languages = ['en', 'hi', 'kn'] as const;

  describe('Translation Dictionary Integrity', () => {
    it('supports English, Hindi, and Kannada dictionaries with proper naming', () => {
      languages.forEach(lang => {
        expect(TRANSLATIONS[lang]).toBeDefined();
        expect(TRANSLATIONS[lang].appName).toContain('LegalLens AI');
      });
    });

    it('ensures all top-level sections exist in all languages', () => {
      const topSections = [
        'header',
        'sidebar',
        'upload',
        'overview',
        'clauses',
        'risks',
        'obligations',
        'qa',
        'comparison',
        'legalNotice',
        'lawyerBrief',
        'privacy',
        'settings'
      ] as const;

      languages.forEach(lang => {
        const dict = TRANSLATIONS[lang];
        topSections.forEach(sec => {
          expect(dict[sec]).toBeDefined();
        });
      });
    });

    it('verifies complete key parity between English and Hindi', () => {
      const en = TRANSLATIONS.en;
      const hi = TRANSLATIONS.hi;

      function compareKeys(obj1: Record<string, unknown>, obj2: Record<string, unknown>, path = '') {
        for (const key of Object.keys(obj1)) {
          const currentPath = path ? `${path}.${key}` : key;
          expect(obj2).toHaveProperty(key);
          if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            compareKeys(obj1[key] as Record<string, unknown>, obj2[key] as Record<string, unknown>, currentPath);
          } else {
            expect(typeof obj2[key]).toBe('string');
            expect((obj2[key] as string).trim().length).toBeGreaterThan(0);
          }
        }
      }

      compareKeys(en as unknown as Record<string, unknown>, hi as unknown as Record<string, unknown>);
    });

    it('verifies complete key parity between English and Kannada', () => {
      const en = TRANSLATIONS.en;
      const kn = TRANSLATIONS.kn;

      function compareKeys(obj1: Record<string, unknown>, obj2: Record<string, unknown>, path = '') {
        for (const key of Object.keys(obj1)) {
          const currentPath = path ? `${path}.${key}` : key;
          expect(obj2).toHaveProperty(key);
          if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            compareKeys(obj1[key] as Record<string, unknown>, obj2[key] as Record<string, unknown>, currentPath);
          } else {
            expect(typeof obj2[key]).toBe('string');
            expect((obj2[key] as string).trim().length).toBeGreaterThan(0);
          }
        }
      }

      compareKeys(en as unknown as Record<string, unknown>, kn as unknown as Record<string, unknown>);
    });
  });

  describe('Clause Localization (getLocalizedClause)', () => {
    const rentClause1 = SAMPLE_RENTAL_AGREEMENT.keyClauses[0]; // c-1
    const rentLockInClause = SAMPLE_RENTAL_AGREEMENT.keyClauses[1]; // c-2

    it('returns English content directly when language is en', () => {
      const localized = getLocalizedClause(rentClause1, 'en');
      expect(localized.title).toBe(rentClause1.title);
      expect(localized.plainExplanation).toBe(rentClause1.plainExplanation);
      expect(localized.whyItMatters).toBe(rentClause1.whyItMatters);
    });

    it('returns authentic Hindi translation for known lease duration and lock-in clauses', () => {
      const localized1 = getLocalizedClause(rentClause1, 'hi');
      expect(localized1.title).toContain('अनुबंध की अवधि');
      expect(localized1.plainExplanation).toContain('महीनों');

      const localizedLockIn = getLocalizedClause(rentLockInClause, 'hi');
      expect(localizedLockIn.title).toContain('लॉक-इन अवधि');
      expect(localizedLockIn.plainExplanation).toContain('महीनों');
    });

    it('returns authentic Kannada translation for known lease duration and lock-in clauses', () => {
      const localized1 = getLocalizedClause(rentClause1, 'kn');
      expect(localized1.title).toContain('ಒಪ್ಪಂದದ ಅವಧಿ');
      expect(localized1.plainExplanation).toContain('ತಿಂಗಳು');

      const localizedLockIn = getLocalizedClause(rentLockInClause, 'kn');
      expect(localizedLockIn.title).toContain('ಲಾಕ್-ಇನ್ ಅವಧಿ');
      expect(localizedLockIn.plainExplanation).toContain('ತಿಂಗಳ');
    });

    it('gracefully falls back to English when no translation exists for a custom clause ID', () => {
      const customClause: ClauseItem = {
        id: 'c-custom-unknown-999',
        clauseNumber: 'Clause 99',
        title: 'Custom Indemnity Undertaking',
        originalText: 'Party A shall indemnify Party B.',
        plainExplanation: 'You must pay for any losses.',
        whyItMatters: 'High risk financial liability.',
        actionToConsider: 'Ask for liability cap.',
        category: 'Liability',
        pageNumber: 3
      };

      const hiFallback = getLocalizedClause(customClause, 'hi');
      expect(hiFallback.title).toBe(customClause.title);
      expect(hiFallback.plainExplanation).toBe(customClause.plainExplanation);

      const knFallback = getLocalizedClause(customClause, 'kn');
      expect(knFallback.title).toBe(customClause.title);
      expect(knFallback.plainExplanation).toBe(customClause.plainExplanation);
    });
  });
});
