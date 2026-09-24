import React, { useState } from 'react';
import { DocumentData, SupportedLanguage } from '../types';
import { compareDocuments } from '../services/comparisonService';
import { ALL_SAMPLE_DOCS } from '../services/sampleDocuments';
import { TRANSLATIONS } from '../services/localization';

interface ComparisonTabProps {
  currentDocument: DocumentData;
  availableDocuments: DocumentData[];
  currentLanguage: SupportedLanguage;
  onNavigateToLawyerPack?: () => void;
}

export const ComparisonTab: React.FC<ComparisonTabProps> = ({
  currentDocument,
  availableDocuments,
  currentLanguage,
  onNavigateToLawyerPack
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const combinedDocs = [...availableDocuments];
  ALL_SAMPLE_DOCS.forEach(s => {
    if (!combinedDocs.some(d => d.id === s.id)) {
      combinedDocs.push(s);
    }
  });

  const [docAId, setDocAId] = useState<string>(currentDocument.id);
  const [docBId, setDocBId] = useState<string>(() => {
    const other = combinedDocs.find(d => d.id !== currentDocument.id);
    return other ? other.id : currentDocument.id;
  });

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const docA = combinedDocs.find(d => d.id === docAId) || currentDocument;
  const docB = combinedDocs.find(d => d.id === docBId) || currentDocument;

  const comparison = compareDocuments(docA, docB);

  const toggleAccordion = (idx: number) => {
    setOpenAccordions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="tab-pane compare-screen">
      <div className="screen-header">
        <h2 className="screen-heading">{t.comparison.title}</h2>
        <p className="screen-subheading">
          {t.comparison.subtitle}
        </p>
      </div>

      {/* Selectors for Document A and Document B */}
      <div className="compare-selector-grid">
        <div className="selector-panel">
          <label htmlFor="select-doc-a">{t.comparison.selectDocA}</label>
          <select
            id="select-doc-a"
            className="bw-select"
            value={docAId}
            onChange={(e) => setDocAId(e.target.value)}
          >
            {combinedDocs.map(d => (
              <option key={d.id} value={d.id}>
                {d.fileName} ({d.docType.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>

        <div className="selector-panel">
          <label htmlFor="select-doc-b">{t.comparison.selectDocB}</label>
          <select
            id="select-doc-b"
            className="bw-select"
            value={docBId}
            onChange={(e) => setDocBId(e.target.value)}
          >
            {combinedDocs.map(d => (
              <option key={d.id} value={d.id}>
                {d.fileName} ({d.docType.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Header */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #000', paddingBottom: '6px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
          {docA.fileName} vs {docB.fileName}
        </h3>
      </div>

      {/* Type mismatch note if applicable */}
      {comparison.typeMismatchWarning && (
        <div className="upload-error-box" style={{ borderColor: '#000', color: '#000', fontWeight: 'normal', marginBottom: '1.5rem' }}>
          <strong>Note:</strong> {comparison.typeMismatchWarning}
        </div>
      )}

      {/* Section 1: Overview Table */}
      <section className="section-block">
        <h4 className="bw-card-title">{t.comparison.title}</h4>
        <div className="table-responsive-container">
          <table className="bw-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>{t.comparison.categoryCol}</th>
                <th style={{ width: '28%' }}>{docA.fileName}</th>
                <th style={{ width: '28%' }}>{docB.fileName}</th>
                <th style={{ width: '22%' }}>{t.comparison.differencesCol}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.categories.map((cat, idx) => {
                let diffLabel = currentLanguage === 'hi' ? 'समान' : currentLanguage === 'kn' ? 'ಒಂದೇ ತೆರನಾದ' : 'Identical';
                if (cat.status === 'different_impact') {
                  diffLabel = currentLanguage === 'hi' ? 'महत्वपूर्ण अंतर' : currentLanguage === 'kn' ? 'ಗಮನಾರ್ಹ ವ್ಯತ್ಯಾಸ' : 'Substantive Difference';
                }
                if (cat.status === 'only_in_a') {
                  diffLabel = currentLanguage === 'hi' ? 'केवल A में मौजूद' : currentLanguage === 'kn' ? 'A ನಲ್ಲಿ ಮಾತ್ರ ಇದೆ' : 'Present in A, missing in B';
                }
                if (cat.status === 'only_in_b') {
                  diffLabel = currentLanguage === 'hi' ? 'केवल B में मौजूद' : currentLanguage === 'kn' ? 'B ನಲ್ಲಿ ಮಾತ್ರ ಇದೆ' : 'Present in B, missing in A';
                }

                return (
                  <tr key={idx}>
                    <td><strong>{cat.category}</strong></td>
                    <td>{cat.clauseA ? `${cat.clauseA.ref}: ${cat.clauseA.plain.slice(0, 80)}...` : (currentLanguage === 'hi' ? 'उपलब्ध नहीं' : currentLanguage === 'kn' ? 'ಲಭ್ಯವಿಲ್ಲ' : 'Not present')}</td>
                    <td>{cat.clauseB ? `${cat.clauseB.ref}: ${cat.clauseB.plain.slice(0, 80)}...` : (currentLanguage === 'hi' ? 'उपलब्ध नहीं' : currentLanguage === 'kn' ? 'ಲಭ್ಯವಿಲ್ಲ' : 'Not present')}</td>
                    <td>
                      <strong style={{ color: cat.status === 'different_impact' ? '#991b1b' : '#000' }}>
                        {diffLabel}
                      </strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Clause-by-Clause Comparison (Accordions) */}
      <section className="section-block" style={{ marginTop: '2rem' }}>
        <h4 className="bw-card-title">{t.clauses.title}</h4>
        <div className="clauses-accordion-container">
          {comparison.categories.map((cat, idx) => {
            const isOpen = !!openAccordions[idx];
            return (
              <div key={idx} className={`bw-accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="bw-accordion-header"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <strong>{t.comparison.categoryCol}:</strong> {cat.category} ({cat.status.replace(/_/g, ' ')})
                  </span>
                  <span className="accordion-toggle-symbol">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="bw-accordion-body">
                    <div className="compare-cards-split" style={{ marginBottom: '1rem' }}>
                      <div style={{ border: '1px solid #e5e7eb', padding: '10px' }}>
                        <span style={{ fontWeight: 700, display: 'block', fontSize: '0.875rem' }}>{docA.fileName}:</span>
                        <p style={{ marginTop: '4px', fontSize: '0.9rem' }}>
                          {cat.clauseA ? `${cat.clauseA.ref} — ${cat.clauseA.plain}` : 'Clause absent from this document.'}
                        </p>
                      </div>

                      <div style={{ border: '1px solid #e5e7eb', padding: '10px' }}>
                        <span style={{ fontWeight: 700, display: 'block', fontSize: '0.875rem' }}>{docB.fileName}:</span>
                        <p style={{ marginTop: '4px', fontSize: '0.9rem' }}>
                          {cat.clauseB ? `${cat.clauseB.ref} — ${cat.clauseB.plain}` : 'Clause absent from this document.'}
                        </p>
                      </div>
                    </div>

                    <div style={{ background: '#f9fafb', borderLeft: '3px solid #000', padding: '10px 14px' }}>
                      <strong>{t.comparison.differencesCol}: </strong>
                      <span>{cat.practicalEffect}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="overview-bottom-actions no-print">
        <button className="bw-btn bw-btn-primary" onClick={handleDownloadReport}>
          {t.lawyerBrief.printBtn}
        </button>
        <button
          className="bw-btn bw-btn-secondary"
          onClick={() => onNavigateToLawyerPack && onNavigateToLawyerPack()}
        >
          {t.sidebar.lawyerPack}
        </button>
      </div>
    </div>
  );
};
