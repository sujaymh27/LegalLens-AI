import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Eye, EyeOff, Trash2, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { DocumentData, SupportedLanguage, SensitiveDataItem } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface PrivacyTabProps {
  document: DocumentData;
  isMasked: boolean;
  onToggleMask: () => void;
  onResetSession: () => void;
  currentLanguage: SupportedLanguage;
}

export const PrivacyTab: React.FC<PrivacyTabProps> = ({
  document,
  isMasked,
  onToggleMask,
  onResetSession,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="tab-pane privacy-tab">
      <div className="tab-header-row">
        <div>
          <h2 className="tab-heading">{t.privacy.title}</h2>
          <p className="tab-subheading">{t.privacy.subtitle}</p>
        </div>
      </div>

      {/* Redaction Controls Card */}
      <div className="privacy-card highlight-card">
        <div className="privacy-card-left">
          <div className="shield-icon-circle">
            {isMasked ? <ShieldCheck size={28} className="shield-active" /> : <ShieldAlert size={28} className="shield-inactive" />}
          </div>
          <div>
            <h3 className="card-title">
              {isMasked ? 'Redaction & Privacy Masking: ACTIVE' : 'Redaction & Privacy Masking: INACTIVE'}
            </h3>
            <p className="card-desc">
              When active, sensitive identifiers (Aadhaar, PAN, Bank Accounts, Salaries) are replaced with secure placeholders across all plain-language explanations, citations, and AI reasoning prompts.
            </p>
          </div>
        </div>

        <button
          className={`mask-toggle-button ${isMasked ? 'btn-active' : 'btn-inactive'}`}
          onClick={onToggleMask}
        >
          {isMasked ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{isMasked ? 'Unmask Data (Display Originals)' : 'Activate Full Redaction'}</span>
        </button>
      </div>

      {/* Discovered Sensitive Identifiers Table */}
      <div className="sensitive-items-section">
        <h3 className="section-subheading">
          {t.privacy.sensitiveFound} ({document.sensitiveItems.length})
        </h3>

        {document.sensitiveItems.length === 0 ? (
          <div className="empty-sensitive-card">
            <CheckCircle2 size={32} className="check-icon" />
            <p>No high-risk personal identifiers (Aadhaar, PAN, Bank details) were found in this document.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="sensitive-table">
              <thead>
                <tr>
                  <th>Identifier Type</th>
                  <th>Classification</th>
                  <th>Current Display Value</th>
                  <th>Location in Document</th>
                  <th>Protection Level</th>
                </tr>
              </thead>
              <tbody>
                {document.sensitiveItems.map((item: SensitiveDataItem) => (
                  <tr key={item.id}>
                    <td>
                      <span className={`sens-type-pill ${item.type}`}>
                        {item.type.toUpperCase().replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <strong>{item.label}</strong>
                    </td>
                    <td>
                      <code className="sens-val-code">
                        {isMasked ? item.maskedValue : item.originalValue}
                      </code>
                    </td>
                    <td className="location-cell">{item.location}</td>
                    <td>
                      <span className={`prot-pill ${isMasked ? 'protected' : 'exposed'}`}>
                        {isMasked ? 'Redacted in Prompts' : 'Original Visible'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security Principles & Guarantees */}
      <div className="security-guarantees-grid">
        <div className="guarantee-box">
          <div className="g-icon"><Lock size={20} /></div>
          <h4>No Model Training</h4>
          <p>
            Your uploaded documents and queries are never stored or used to train public AI models. All analysis is ephemeral to this session.
          </p>
        </div>

        <div className="guarantee-box">
          <div className="g-icon"><Shield size={20} /></div>
          <h4>Client-Side Document Ingestion</h4>
          <p>
            PDF parsing, text extraction, and OCR run directly in your web browser. No document files are saved on external servers.
          </p>
        </div>

        <div className="guarantee-box">
          <div className="g-icon"><Trash2 size={20} /></div>
          <h4>Zero-Data-Retention Purge</h4>
          <p>
            You can permanently purge all document text, cached citations, and chat histories at any point using the Purge button below.
          </p>
        </div>
      </div>

      {/* Permanent Session Purge Section */}
      <div className="purge-section-card">
        <div className="purge-info">
          <AlertTriangle size={20} className="purge-warn-icon" />
          <div>
            <h4>Permanent Document Deletion & Reset</h4>
            <p>
              Instantly erase all loaded documents, extracted clauses, and conversation records from memory.
            </p>
          </div>
        </div>

        <button className="purge-action-btn" onClick={onResetSession}>
          <Trash2 size={16} />
          <span>{t.privacy.clearSession}</span>
        </button>
      </div>
    </div>
  );
};
