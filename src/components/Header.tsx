import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  hasDocument: boolean;
  docName?: string;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  hasDocument,
  docName,
  onOpenUpload
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <header className="top-bar">
      {/* Top Disclaimer Strip */}
      <div className="disclaimer-top-strip">
        <div className="disclaimer-strip-inner">
          <div>
            <span className="disclaimer-tag">{t.header.noticeTag}</span>
            <span style={{ marginLeft: '8px' }}>
              {t.header.noticeText}
            </span>
          </div>
          <span style={{ fontWeight: 600 }}>{t.header.groundedText}</span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="top-bar-main">
        {/* Left: Logo + Text */}
        <div className="top-bar-left">
          <a href="#" className="app-brand-link" onClick={(e) => { e.preventDefault(); onOpenUpload(); }}>
            <span className="app-brand-name">{t.appName}</span>
          </a>
        </div>

        {/* Center: Current Document Name (clickable to switch/open list) */}
        <div className="top-bar-center">
          {hasDocument && docName ? (
            <div
              className="active-document-indicator"
              onClick={onOpenUpload}
              title="Click to view or switch document"
              role="button"
              tabIndex={0}
            >
              <span className="doc-name-text">{docName}</span>
              <span style={{ fontSize: '0.75rem', textDecoration: 'underline', flexShrink: 0 }}>{t.header.switchDoc}</span>
            </div>
          ) : (
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{t.header.noDoc}</span>
          )}
        </div>

        {/* Right: Language Selector + Help Link */}
        <div className="top-bar-right">
          <div className="lang-selector-wrap">
            <select
              className="top-lang-select"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Interface Language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </div>

          <button className="top-help-link" onClick={() => setShowHelpModal(true)}>
            {t.header.help}
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="bw-modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="bw-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="bw-modal-header">
              <h3 className="modal-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                {t.header.helpTitle}
              </h3>
              <button
                className="bw-btn bw-btn-secondary"
                style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => setShowHelpModal(false)}
              >
                {t.upload.closeBtn}
              </button>
            </div>
            <div className="bw-modal-body">
              <div className="modal-body-text">
                <p>
                  <strong>{t.header.helpStep1}</strong>
                </p>
                <p>
                  <strong>{t.header.helpStep2}</strong>
                </p>
                <p>
                  <strong>{t.header.helpStep3}</strong>
                </p>
                <p>
                  <strong>{t.header.helpStep4}</strong>
                </p>
                <p>
                  <strong>{t.header.helpStep5}</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button className="bw-btn bw-btn-primary" onClick={() => setShowHelpModal(false)}>
                  {t.header.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
