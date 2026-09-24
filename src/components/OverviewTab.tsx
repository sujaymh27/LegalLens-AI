import React, { useState } from 'react';
import { DocumentData, SupportedLanguage, ClauseItem } from '../types';
import { extractObligationsFromDocument, computeEventDeadline } from '../services/obligationTracker';
import { TRANSLATIONS, getLocalizedClause } from '../services/localization';

interface OverviewTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
  onNavigateToTab: (tabId: string) => void;
  onToggleMask: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  document,
  currentLanguage,
  onNavigateToTab
}) => {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({});
  const [receiptDateInput, setReceiptDateInput] = useState<string>('2024-08-14');
  const [showDateInput, setShowDateInput] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const obligations = extractObligationsFromDocument(document);
  const eventObligation = obligations.find(o => o.isEventTriggered);
  const calculatedEventDeadline = eventObligation && eventObligation.offsetDays !== undefined
    ? computeEventDeadline(receiptDateInput, eventObligation.offsetDays)
    : null;

  const toggleClauseAccordion = (id: string) => {
    setOpenClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToClause = (clauseId: string) => {
    onNavigateToTab('clauses');
  };

  // Find key facts
  const landlordOrEmployer = document.parties.find(p => 
    p.role.toLowerCase().includes('lessor') || p.role.toLowerCase().includes('landlord') || p.role.toLowerCase().includes('employer') || p.role.toLowerCase().includes('client')
  );
  const tenantOrEmployee = document.parties.find(p => 
    p.role.toLowerCase().includes('lessee') || p.role.toLowerCase().includes('tenant') || p.role.toLowerCase().includes('employee') || p.role.toLowerCase().includes('recipient')
  );

  const startDate = document.importantDates.find(d => d.label.toLowerCase().includes('commencement') || d.label.toLowerCase().includes('start') || d.label.toLowerCase().includes('joining'));
  const endDate = document.importantDates.find(d => d.label.toLowerCase().includes('expiry') || d.label.toLowerCase().includes('end') || d.label.toLowerCase().includes('completion'));
  const noticeDeadline = document.importantDates.find(d => d.label.toLowerCase().includes('notice') || d.label.toLowerCase().includes('statutory'));

  const primaryAmount = document.amounts.find(a => a.label.toLowerCase().includes('rent') || a.label.toLowerCase().includes('salary') || a.label.toLowerCase().includes('cheque') || a.label.toLowerCase().includes('fee'));
  const depositAmount = document.amounts.find(a => a.label.toLowerCase().includes('deposit') || a.label.toLowerCase().includes('security'));
  const penaltyAmount = document.amounts.find(a => a.label.toLowerCase().includes('deduction') || a.label.toLowerCase().includes('liquidated') || a.label.toLowerCase().includes('penalty') || a.label.toLowerCase().includes('interest'));

  const flaggedClauses = document.keyClauses.filter(c => c.isFlagged);

  return (
    <div className="tab-pane overview-screen">
      {/* Screen Title */}
      <div className="screen-header">
        <h2 className="screen-heading">{document.fileName.replace(/_/g, ' ')}</h2>
        <p className="screen-subheading">
          {t.overview.docTypeDetected}: <strong>{document.docType.replace('_', ' ').toUpperCase()}</strong> ({document.pageCount} Pages)
        </p>
      </div>

      {/* OCR Quality Notice if applicable */}
      {document.ocrDetails?.isOcr && (
        <div className="upload-error-box" style={{ borderColor: '#000', color: '#000', marginBottom: '1.5rem' }}>
          <strong>{t.overview.ocrQualityNotice}</strong>
        </div>
      )}

      {/* Section 1: Key Facts (Card Style) */}
      <section className="section-block">
        <h3 className="bw-card-title" style={{ fontSize: '1.25rem' }}>{t.overview.keyFacts}</h3>
        <div className="facts-cards-row">
          {/* Parties */}
          <div className="fact-card">
            <h4 className="fact-card-title">{t.overview.partiesTitle}</h4>
            <div className="fact-item-line">
              <strong>{t.overview.firstParty}: </strong>
              {landlordOrEmployer ? landlordOrEmployer.name : (document.parties[0]?.name || <span className="value-not-found">{t.overview.notFound}</span>)}
            </div>
            <div className="fact-item-line">
              <strong>{t.overview.secondParty}: </strong>
              {tenantOrEmployee ? tenantOrEmployee.name : (document.parties[1]?.name || <span className="value-not-found">{t.overview.notFound}</span>)}
            </div>
          </div>

          {/* Important Dates */}
          <div className="fact-card">
            <h4 className="fact-card-title">{t.overview.datesTitle}</h4>
            <div className="fact-item-line">
              <strong>{t.overview.startDate}: </strong>
              {startDate ? startDate.date : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
            <div className="fact-item-line">
              <strong>{t.overview.endDate}: </strong>
              {endDate ? endDate.date : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
            <div className="fact-item-line">
              <strong>Notice: </strong>
              {noticeDeadline ? noticeDeadline.date : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
          </div>

          {/* Amounts */}
          <div className="fact-card">
            <h4 className="fact-card-title">{t.overview.financialTerms}</h4>
            <div className="fact-item-line">
              <strong>{t.overview.primaryAmount}: </strong>
              {primaryAmount ? `${primaryAmount.amount} (${primaryAmount.label})` : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
            <div className="fact-item-line">
              <strong>{t.overview.securityDeposit}: </strong>
              {depositAmount ? depositAmount.amount : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
            <div className="fact-item-line">
              <strong>{t.overview.penalties}: </strong>
              {penaltyAmount ? penaltyAmount.amount : <span className="value-not-found">{t.overview.notFound}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Important Clauses (Accordion / Toggle Style) */}
      <section className="section-block">
        <h3 className="bw-card-title" style={{ fontSize: '1.25rem' }}>{t.overview.importantClausesTitle}</h3>
        <div className="clauses-accordion-container">
          {document.keyClauses.map((clause: ClauseItem) => {
            const isOpen = !!openClauses[clause.id];
            const locClause = getLocalizedClause(clause, currentLanguage);
            return (
              <div key={clause.id} className={`bw-accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="bw-accordion-header"
                  onClick={() => toggleClauseAccordion(clause.id)}
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
                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.overview.originalRef}:</span>
                      <span className="clause-original-ref">Page {clause.pageNumber}, {clause.clauseNumber}</span>
                    </div>

                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.overview.simpleExplanation}:</span>
                      <p>{locClause.plainExplanation}</p>
                    </div>

                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.overview.whyItMatters}:</span>
                      <p>{locClause.whyItMatters}</p>
                    </div>

                    <div className="clause-field-block">
                      <span className="clause-field-label">{t.overview.pointsToConsider}:</span>
                      <p>{locClause.actionToConsider}</p>
                    </div>

                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                      <button
                        className="bw-btn bw-btn-secondary"
                        style={{ minHeight: '38px', fontSize: '0.875rem', padding: '6px 14px' }}
                        onClick={() => onNavigateToTab('qa')}
                      >
                        {t.overview.askAboutClause}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Risk and Attention Flags */}
      <section className="section-block">
        <h3 className="bw-card-title" style={{ fontSize: '1.25rem' }}>{t.risks.title}</h3>
        <div className="attention-items-list">
          {flaggedClauses.length === 0 ? (
            <p>No critical flags or one-sided liability clauses detected.</p>
          ) : (
            flaggedClauses.map((clause) => {
              const locClause = getLocalizedClause(clause, currentLanguage);
              return (
                <div key={clause.id} className="attention-bullet-item">
                  <div className="attention-bullet-text">
                    <strong>{clause.clauseNumber}: {locClause.title} — </strong>
                    <span>{clause.flagReason || locClause.plainExplanation}</span>
                  </div>
                  <button
                    className="view-clause-link"
                    onClick={() => scrollToClause(clause.id)}
                  >
                    View Clause
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Section 4: Obligations and Deadlines */}
      <section className="section-block">
        <h3 className="bw-card-title" style={{ fontSize: '1.25rem' }}>{t.overview.actionItemsTitle}</h3>
        <ul className="bw-bullets">
          {obligations.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <strong>{item.obligation}</strong> — 
              <span> Deadline: {item.deadline} ({item.clauseRef})</span>
            </li>
          ))}
        </ul>

        {/* Dynamic Deadline Box */}
        {eventObligation && (
          <div className="event-deadline-box">
            <strong>{t.overview.deadlineCalcTitle}:</strong>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '2px' }}>
              {eventObligation.obligation} (depends on event: "{eventObligation.eventTrigger}").
            </p>

            {!showDateInput ? (
              <button
                className="bw-btn bw-btn-secondary"
                style={{ minHeight: '38px', marginTop: '8px' }}
                onClick={() => setShowDateInput(true)}
              >
                Set Date of Receipt
              </button>
            ) : (
              <div style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>
                  {t.overview.triggerDateLabel}
                </label>
                <div className="event-date-input-group">
                  <input
                    type="date"
                    className="bw-input"
                    value={receiptDateInput}
                    onChange={(e) => setReceiptDateInput(e.target.value)}
                  />
                </div>
                {calculatedEventDeadline && (
                  <div className="calculated-deadline-badge">
                    {t.overview.targetDeadlineLabel} {calculatedEventDeadline.formattedDate} ({calculatedEventDeadline.daysRemaining} days remaining)
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Bottom Actions Row */}
      <div className="overview-bottom-actions">
        <button
          className="bw-btn bw-btn-primary"
          onClick={() => onNavigateToTab('qa')}
        >
          {t.sidebar.qa}
        </button>
        <button
          className="bw-btn bw-btn-secondary"
          onClick={() => onNavigateToTab('lawyerPack')}
        >
          {t.sidebar.lawyerPack}
        </button>
        <button
          className="bw-btn bw-btn-secondary"
          onClick={() => onNavigateToTab('clauses')}
        >
          {t.overview.viewAllClauses}
        </button>
      </div>
    </div>
  );
};
