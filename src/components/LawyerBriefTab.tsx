import React from 'react';
import { DocumentData, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface LawyerBriefTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
}

export const LawyerBriefTab: React.FC<LawyerBriefTabProps> = ({
  document,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const flagged = document.keyClauses.filter(c => c.isFlagged);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="tab-pane lawyer-pack-screen">
      <div className="screen-header no-print">
        <h2 className="screen-heading">{t.lawyerBrief.title}</h2>
        <p className="screen-subheading">
          {t.lawyerBrief.subtitle}
        </p>
      </div>

      {/* Printable Sheet */}
      <div className="printable-pack-sheet">
        <h1 className="pack-header-title">
          {t.appName} — {t.lawyerBrief.title}
        </h1>

        <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', color: '#4b5563' }}>
          <span>Document: <strong>{document.fileName}</strong> | </span>
          <span>Date Generated: <strong>{new Date().toLocaleDateString()}</strong> | </span>
          <span>Status: <strong>{document.signatures.present ? t.lawyerBrief.statusExecuted : t.lawyerBrief.statusDraft}</strong></span>
        </div>

        {/* Section 1: Short Facts Summary */}
        <section>
          <h3 className="pack-section-heading">{t.lawyerBrief.factsSummary}</h3>
          <ul className="bw-bullets">
            <li>
              <strong>Document Classification:</strong> {document.docType.replace('_', ' ').toUpperCase()} consisting of {document.pageCount} page(s).
            </li>
            <li>
              <strong>Parties Involved:</strong> {document.parties.map(p => `${p.role}: ${p.name}`).join('; ')}.
            </li>
            <li>
              <strong>Primary Financial Consideration:</strong> {document.amounts[0] ? `${document.amounts[0].amount} (${document.amounts[0].label})` : 'Terms specified in agreement'}.
            </li>
            <li>
              <strong>Security Deposit / Liability:</strong> {document.amounts[1] ? `${document.amounts[1].amount} (${document.amounts[1].label})` : 'Subject to contract performance'}.
            </li>
            <li>
              <strong>Execution Record:</strong> {document.signatures.present ? 'Signatures recorded on file with witnesses' : 'No confirmed signatures recorded'}.
            </li>
          </ul>
        </section>

        {/* Section 2: Key Dates and Deadlines */}
        <section>
          <h3 className="pack-section-heading">{t.lawyerBrief.keyDatesTitle}</h3>
          <ul className="bw-bullets">
            {document.importantDates.map((d) => (
              <li key={d.id}>
                <strong>{d.label}:</strong> {d.date} — {d.context} ({d.clauseRef})
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Flagged Clauses and Concerns */}
        <section>
          <h3 className="pack-section-heading">{t.lawyerBrief.concernsTitle}</h3>
          {flagged.length === 0 ? (
            <p>No critical clauses flagged in preliminary automated review.</p>
          ) : (
            <ul className="bw-bullets">
              {flagged.map((c) => (
                <li key={c.id}>
                  <strong>{c.clauseNumber} ({c.title}, Page {c.pageNumber}): </strong>
                  <span>{c.flagReason || c.plainExplanation}</span>
                  <div style={{ marginTop: '2px', fontSize: '0.875rem', color: '#4b5563' }}>
                    <em>Client note: {c.actionToConsider}</em>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section 4: Documents and Information to Collect */}
        <section>
          <h3 className="pack-section-heading">4. Documents and Information to Collect</h3>
          <ul className="bw-bullets">
            <li>Complete signed copy or original physical version of this document including all schedules.</li>
            <li>Bank account statements or proof of payment for deposits, rent, fees, or salary.</li>
            <li>All relevant email threads, WhatsApp messages, or written communication.</li>
            <li>Courier receipts, postal envelopes with tracking labels, or delivery acknowledgement slips.</li>
            <li>Chronological personal notes documenting all milestone dates and conversations.</li>
          </ul>
        </section>

        {/* Section 5: Questions for Your Lawyer */}
        <section>
          <h3 className="pack-section-heading">{t.lawyerBrief.questionsTitle}</h3>
          <ul className="bw-bullets">
            {document.docType === 'rental_agreement' && (
              <>
                <li>Is the landlord's mandatory painting deduction legally enforceable without producing actual bill receipts?</li>
                <li>What legal remedies are available if the security deposit is wrongfully withheld at the end of the 11-month lease?</li>
                <li>How does the private arbitration clause impact my right to approach the Small Causes or Consumer Court?</li>
              </>
            )}
            {document.docType === 'employment_contract' && (
              <>
                <li>Under Section 27 of the Indian Contract Act, is the 12-month post-employment non-compete clause enforceable?</li>
                <li>Can the employer legally withhold my relieving letter if the 90-day notice period is contested or bought out?</li>
                <li>Can the broad personal indemnification clause be struck down or capped to willful misconduct?</li>
              </>
            )}
            {document.docType === 'legal_notice' && (
              <>
                <li>What is the strict statutory limitation period to issue a formal legal reply to this Section 138 notice?</li>
                <li>Does our dispute over component quality or invoices constitute a valid defense under Section 138 NI Act?</li>
                <li>Should we deposit the disputed principal into court or seek an immediate structured settlement?</li>
              </>
            )}
            {document.docType !== 'rental_agreement' && document.docType !== 'employment_contract' && document.docType !== 'legal_notice' && (
              <>
                <li>What are the unilateral liabilities or uncapped indemnity risks in this contract?</li>
                <li>Are there any ambiguous clauses that should be clarified before signing or terminating?</li>
                <li>Does the governing law and jurisdiction clause sufficiently protect our interests?</li>
              </>
            )}
          </ul>
        </section>

        <div style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid #000', fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
          {t.disclaimerBanner}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="overview-bottom-actions no-print">
        <button className="bw-btn bw-btn-primary" onClick={handleDownloadPDF}>
          {t.lawyerBrief.printBtn}
        </button>
        <button className="bw-btn bw-btn-secondary" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};
