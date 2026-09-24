import React, { useState, useMemo } from 'react';
import { DocumentData, SupportedLanguage, ClauseItem } from '../types';
import { TRANSLATIONS, getLocalizedClause } from '../services/localization';

interface ClausesTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
  onAskQuestionAboutClause?: (clauseRef: string) => void;
}

export const ClausesTab: React.FC<ClausesTabProps> = ({
  document,
  currentLanguage,
  onAskQuestionAboutClause
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({});

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const filteredClauses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return document.keyClauses;
    return document.keyClauses.filter(clause => {
      const loc = getLocalizedClause(clause, currentLanguage);
      return (
        clause.clauseNumber.toLowerCase().includes(q) ||
        clause.title.toLowerCase().includes(q) ||
        loc.title.toLowerCase().includes(q) ||
        clause.plainExplanation.toLowerCase().includes(q) ||
        loc.plainExplanation.toLowerCase().includes(q) ||
        clause.originalText.toLowerCase().includes(q) ||
        clause.category.toLowerCase().includes(q)
      );
    });
  }, [document.keyClauses, searchQuery, currentLanguage]);

  const toggleClause = (id: string) => {
    setOpenClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tab-pane clauses-screen">
      <div className="screen-header">
        <h2 className="screen-heading">{t.clauses.title}</h2>
        <p className="screen-subheading">
          {t.clauses.subtitle}
        </p>
      </div>

      {/* Large Search Box */}
      <input
        type="text"
        className="clause-search-bar"
        placeholder={t.clauses.searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search clauses"
      />

      {/* OCR Quality Notice if applicable */}
      {document.ocrDetails?.isOcr && (
        <div className="upload-error-box" style={{ borderColor: '#000', color: '#000', marginBottom: '1.5rem', fontWeight: 'normal' }}>
          <strong>Note:</strong> {t.overview.ocrQualityNotice}
        </div>
      )}

      {/* List of Clause Categories / Items as Accordions */}
      <div className="clauses-accordion-list">
        {filteredClauses.length === 0 ? (
          <div className="bw-card">
            <p>{t.clauses.noMatch}</p>
          </div>
        ) : (
          filteredClauses.map((clause: ClauseItem) => {
            const isOpen = !!openClauses[clause.id];
            const locClause = getLocalizedClause(clause, currentLanguage);
            return (
              <div key={clause.id} className={`bw-accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="bw-accordion-header"
                  onClick={() => toggleClause(clause.id)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <strong>{clause.clauseNumber}:</strong> {locClause.title}
                  </span>
                  <span className="accordion-toggle-symbol" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="bw-accordion-body">
                    {/* Simple Explanation */}
                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.clauses.plainExplanation}:</span>
                      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                        {locClause.plainExplanation}
                      </p>
                    </div>

                    {/* Original Text Reference */}
                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.overview.originalRef}:</span>
                      <span className="clause-original-ref">{t.clauses.pageLabel} {clause.pageNumber}, {clause.clauseNumber}</span>
                    </div>

                    {/* Why This Matters */}
                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.clauses.whyItMatters}:</span>
                      <p>{locClause.whyItMatters}</p>
                    </div>

                    {/* Points to Consider */}
                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.clauses.actionToConsider}:</span>
                      <p>{locClause.actionToConsider}</p>
                    </div>

                    {/* Verbatim snippet */}
                    <div className="clause-field-block" style={{ marginTop: '0.75rem' }}>
                      <span className="clause-field-label">Original Clause Text:</span>
                      <blockquote style={{ background: '#f9fafb', borderLeft: '3px solid #000', padding: '8px 12px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        "{clause.originalText}"
                      </blockquote>
                    </div>

                    {/* Button: Ask a Question About This Clause */}
                    <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                      <button
                        className="bw-btn bw-btn-secondary"
                        style={{ minHeight: '40px', fontSize: '0.875rem' }}
                        onClick={() => onAskQuestionAboutClause && onAskQuestionAboutClause(`${clause.clauseNumber}: ${clause.title}`)}
                      >
                        {t.clauses.askAboutClause}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
