import React, { useState } from 'react';
import { SupportedLanguage, DocumentData } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface SettingsTabProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  document: DocumentData | null;
  isMasked: boolean;
  onToggleMask: () => void;
  onResetSession: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentLanguage,
  onLanguageChange,
  document,
  isMasked,
  onToggleMask,
  onResetSession
}) => {
  const [allowTraining, setAllowTraining] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <div className="tab-pane settings-screen">
      <div className="screen-header">
        <h2 className="screen-heading">{t.settings.title}</h2>
        <p className="screen-subheading">
          {t.settings.subtitle}
        </p>
      </div>

      <div className="settings-sections">
        {/* Language Section */}
        <section className="settings-card">
          <h3 className="settings-card-title">{t.settings.languageTitle}</h3>
          <p className="settings-card-desc">
            {t.settings.languageDesc}
          </p>
          <div className="setting-control-row">
            <label htmlFor="language-select" className="setting-label">{t.settings.languageLabel}</label>
            <select
              id="language-select"
              className="bw-select"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            >
              <option value="en">English (English)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="settings-card">
          <h3 className="settings-card-title">{t.settings.privacyTitle}</h3>
          <div className="setting-toggle-row">
            <div className="toggle-info">
              <strong>{t.settings.optInTitle}</strong>
              <p className="toggle-subtext">
                {t.settings.optInDesc}
              </p>
            </div>
            <label className="switch-toggle" aria-label="Toggle document training opt-in">
              <input
                type="checkbox"
                checked={allowTraining}
                onChange={(e) => setAllowTraining(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="setting-toggle-row" style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #e5e7eb' }}>
            <div className="toggle-info">
              <strong>{t.settings.maskTitle}</strong>
              <p className="toggle-subtext">
                {t.settings.maskDesc}
              </p>
            </div>
            <button
              className={`bw-btn ${isMasked ? 'bw-btn-primary' : 'bw-btn-secondary'}`}
              onClick={onToggleMask}
            >
              {isMasked ? 'Redaction Active' : 'Activate Redaction'}
            </button>
          </div>

          {document && document.sensitiveItems.length > 0 && (
            <div className="sensitive-data-notice">
              <strong>Detected Personal Identifiers ({document.sensitiveItems.length}):</strong>
              <ul className="bw-bullets" style={{ marginTop: '0.5rem' }}>
                {document.sensitiveItems.map((item) => (
                  <li key={item.id}>
                    {item.label}: <code>{isMasked ? item.maskedValue : item.originalValue}</code> ({item.location})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Data & Deletion Section */}
        <section className="settings-card">
          <h3 className="settings-card-title">{t.settings.dangerTitle}</h3>
          <p className="settings-card-desc">
            {t.settings.dangerDesc}
          </p>
          <div style={{ marginTop: '1rem' }}>
            <button className="bw-btn bw-btn-secondary danger" onClick={onResetSession}>
              {t.settings.clearBtn}
            </button>
          </div>
        </section>

        {/* About & Legal Section */}
        <section className="settings-card">
          <h3 className="settings-card-title">About & Disclaimers</h3>
          <p className="settings-card-desc">
            {t.appName} — {t.appSubtitle}
          </p>
          <div className="about-links-row">
            <button className="text-link-btn" onClick={() => setShowDisclaimerModal(true)}>
              Full Legal Disclaimer
            </button>
            <span className="link-divider">|</span>
            <button className="text-link-btn" onClick={() => setShowPrivacyModal(true)}>
              Privacy Policy
            </button>
            <span className="link-divider">|</span>
            <a href="mailto:support@legallens.ai" className="text-link-btn">
              Contact Support
            </a>
          </div>
        </section>
      </div>

      {/* Legal Disclaimer Modal */}
      {showDisclaimerModal && (
        <div className="bw-modal-backdrop" onClick={() => setShowDisclaimerModal(false)}>
          <div className="bw-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="bw-modal-header">
              <h3 className="modal-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                {t.appName} Disclaimer
              </h3>
              <button
                className="bw-btn bw-btn-secondary"
                style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => setShowDisclaimerModal(false)}
              >
                {t.upload.closeBtn}
              </button>
            </div>
            <div className="bw-modal-body">
              <div className="modal-body-text">
                <p>
                  {t.disclaimerBanner}
                </p>
                <p>
                  AI-generated information may be incomplete or inaccurate. Never use this service as a substitute for qualified legal counsel. For advice about your specific legal rights, contracts, disputes, or liabilities, consult a licensed advocate or qualified legal professional.
                </p>
              </div>
              <div className="modal-footer">
                <button className="bw-btn bw-btn-primary" onClick={() => setShowDisclaimerModal(false)}>
                  {t.header.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="bw-modal-backdrop" onClick={() => setShowPrivacyModal(false)}>
          <div className="bw-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="bw-modal-header">
              <h3 className="modal-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                Privacy & Data Protection Policy
              </h3>
              <button
                className="bw-btn bw-btn-secondary"
                style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => setShowPrivacyModal(false)}
              >
                {t.upload.closeBtn}
              </button>
            </div>
            <div className="bw-modal-body">
              <div className="modal-body-text">
                <p>
                  <strong>1. Client-Side Document Processing:</strong> Text extraction, OCR, and parsing occur directly in your browser. Documents are not saved on external servers.
                </p>
                <p>
                  <strong>2. No AI Training:</strong> Your documents are never used to train public or proprietary AI models unless you explicitly opt in.
                </p>
                <p>
                  <strong>3. Permanent Deletion:</strong> Clicking "{t.settings.clearBtn}" purges all active session memory immediately.
                </p>
              </div>
              <div className="modal-footer">
                <button className="bw-btn bw-btn-primary" onClick={() => setShowPrivacyModal(false)}>
                  {t.header.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
