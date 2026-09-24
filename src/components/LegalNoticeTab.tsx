import React, { useState } from 'react';
import { DocumentData, SupportedLanguage, LegalNoticeDetails } from '../types';
import { SAMPLE_LEGAL_NOTICE } from '../services/sampleDocuments';
import { TRANSLATIONS } from '../services/localization';

interface LegalNoticeTabProps {
  document: DocumentData;
  onLoadLegalNoticeSample: () => void;
  currentLanguage: SupportedLanguage;
}

export const LegalNoticeTab: React.FC<LegalNoticeTabProps> = ({
  document,
  onLoadLegalNoticeSample,
  currentLanguage
}) => {
  const isNotice = document.docType === 'legal_notice' && document.noticeDetails;
  const noticeData: LegalNoticeDetails = (isNotice ? document.noticeDetails : SAMPLE_LEGAL_NOTICE.noticeDetails)!;

  const [checklist, setChecklist] = useState(noticeData.preparationChecklist);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleDownloadNotice = () => {
    window.print();
  };

  return (
    <div className="tab-pane notice-screen">
      <div className="screen-header">
        <h2 className="screen-heading">{t.legalNotice.title}</h2>
        <p className="screen-subheading">
          {noticeData.allegationsSummary.slice(0, 100)}...
        </p>
      </div>

      {!isNotice && (
        <div className="upload-error-box" style={{ borderColor: '#000', color: '#000', marginBottom: '1.5rem', fontWeight: 'normal' }}>
          <strong>Sample Available:</strong> {t.legalNotice.sampleNoticeBanner}
          <div style={{ marginTop: '8px' }}>
            <button className="bw-btn bw-btn-secondary" onClick={onLoadLegalNoticeSample}>
              {t.legalNotice.loadSampleBtn}
            </button>
          </div>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <section className="bw-card">
        <h3 className="bw-card-title">{t.legalNotice.basicInfo}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          <p><strong>{t.legalNotice.sender} </strong>{noticeData.sender}</p>
          <p><strong>{t.legalNotice.recipient} </strong>{noticeData.recipient}</p>
          <p><strong>{t.legalNotice.date} </strong>{noticeData.noticeDate}</p>
          <p><strong>{t.legalNotice.medium} </strong>{noticeData.medium}</p>
        </div>
      </section>

      {/* Section 2: What Is Being Alleged or Requested */}
      <section className="bw-card">
        <h3 className="bw-card-title">{t.legalNotice.allegationsTitle}</h3>
        <p style={{ marginBottom: '8px' }}>{noticeData.allegationsSummary}</p>
        <ul className="bw-bullets">
          {noticeData.demandedActions.map((action, idx) => (
            <li key={idx}><strong>Demanded: </strong>{action}</li>
          ))}
        </ul>
      </section>

      {/* Section 3: Deadlines and Consequences */}
      <section className="bw-card">
        <h3 className="bw-card-title">{t.legalNotice.consequencesTitle}</h3>
        <p style={{ marginBottom: '8px' }}>
          <strong>Deadline to respond: </strong> 
          Within 15 days of receiving this notice (strict statutory clock under Section 138 Negotiable Instruments Act).
        </p>
        <strong style={{ display: 'block', marginTop: '6px' }}>Consequences mentioned if not resolved:</strong>
        <ul className="bw-bullets">
          {noticeData.statedConsequences.map((cons, idx) => (
            <li key={idx}>{cons}</li>
          ))}
        </ul>
      </section>

      {/* Section 4: Documents or Information Requested */}
      <section className="bw-card">
        <h3 className="bw-card-title">4. Documents or Information Requested</h3>
        <ul className="bw-bullets">
          {noticeData.requestedDocuments.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          ))}
        </ul>
      </section>

      {/* Section 5: Preparation Checklist */}
      <section className="bw-card">
        <h3 className="bw-card-title">{t.legalNotice.checklistTitle}</h3>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '8px' }}>
          Check off items as you gather them for your lawyer consultation:
        </p>
        <div>
          {checklist.map((item) => (
            <label key={item.id} className="checklist-bw-row">
              <input
                type="checkbox"
                className="checklist-checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.task} — <em>{item.importance}</em>
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Section 6: Questions for a Lawyer */}
      <section className="bw-card">
        <h3 className="bw-card-title">6. Questions for a Lawyer</h3>
        <ul className="bw-bullets">
          {noticeData.lawyerQuestions.map((q, idx) => (
            <li key={idx}><strong>{idx + 1}. </strong>{q}</li>
          ))}
        </ul>
      </section>

      {/* Bottom Button */}
      <div className="overview-bottom-actions no-print">
        <button className="bw-btn bw-btn-primary" onClick={handleDownloadNotice}>
          {t.legalNotice.downloadBtn}
        </button>
      </div>
    </div>
  );
};
