import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck, Scale, Info, ArrowRight } from 'lucide-react';
import { DocumentData, SupportedLanguage, ClauseItem } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface RiskFlagsTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
  onNavigateToTab: (tabId: string) => void;
}

export const RiskFlagsTab: React.FC<RiskFlagsTabProps> = ({
  document,
  currentLanguage,
  onNavigateToTab
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const flaggedClauses = document.keyClauses.filter(c => c.isFlagged);

  const criticalFlags = flaggedClauses.filter(c => c.flagSeverity === 'critical');
  const highFlags = flaggedClauses.filter(c => c.flagSeverity === 'high');
  const mediumFlags = flaggedClauses.filter(c => c.flagSeverity === 'medium' || !c.flagSeverity);

  return (
    <div className="tab-pane risk-flags-tab">
      <div className="tab-header-row">
        <div>
          <h2 className="tab-heading">{t.risks.title}</h2>
          <p className="tab-subheading">{t.risks.subtitle}</p>
        </div>
      </div>

      {/* Neutral Legal Information Advisory Banner */}
      <div className="risk-advisory-banner">
        <Scale size={20} className="scale-icon" />
        <div className="advisory-text">
          <strong>Important Guidance:</strong> {t.risks.attentionNotice}
        </div>
      </div>

      {/* Risk Metrics Overview Bar */}
      <div className="risk-metrics-row">
        <div className="metric-box critical">
          <div className="metric-num">{criticalFlags.length}</div>
          <div className="metric-label">{t.risks.severityCritical}</div>
        </div>
        <div className="metric-box high">
          <div className="metric-num">{highFlags.length}</div>
          <div className="metric-label">{t.risks.severityHigh}</div>
        </div>
        <div className="metric-box medium">
          <div className="metric-num">{mediumFlags.length}</div>
          <div className="metric-label">{t.risks.severityMedium}</div>
        </div>
      </div>

      {/* Flagged Clauses Sections */}
      <div className="flagged-clauses-container">
        {flaggedClauses.length === 0 ? (
          <div className="no-flags-card">
            <ShieldCheck size={40} className="check-icon" />
            <h3>No High-Risk Anomalies Detected</h3>
            <p>
              Standard commercial provisions were detected without immediate one-sided forfeiture clauses. However, we advise reviewing all clauses thoroughly.
            </p>
          </div>
        ) : (
          <>
            {criticalFlags.length > 0 && (
              <div className="severity-group">
                <div className="group-title critical">
                  <AlertOctagon size={18} />
                  <span>High Caution / Significant Practical Impact ({criticalFlags.length})</span>
                </div>
                <div className="cards-grid">
                  {criticalFlags.map(c => renderRiskCard(c, onNavigateToTab))}
                </div>
              </div>
            )}

            {highFlags.length > 0 && (
              <div className="severity-group">
                <div className="group-title high">
                  <AlertTriangle size={18} />
                  <span>Important Attention Required ({highFlags.length})</span>
                </div>
                <div className="cards-grid">
                  {highFlags.map(c => renderRiskCard(c, onNavigateToTab))}
                </div>
              </div>
            )}

            {mediumFlags.length > 0 && (
              <div className="severity-group">
                <div className="group-title medium">
                  <Info size={18} />
                  <span>Standard Commercial Attention ({mediumFlags.length})</span>
                </div>
                <div className="cards-grid">
                  {mediumFlags.map(c => renderRiskCard(c, onNavigateToTab))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Footer */}
      <div className="risk-footer-cta">
        <div className="cta-text">
          <h4>Want to prepare these flagged clauses for discussion with a lawyer?</h4>
          <p>Generate a structured Lawyer Preparation Pack with specific questions and facts summary.</p>
        </div>
        <button 
          className="cta-btn"
          onClick={() => onNavigateToTab('lawyerBrief')}
        >
          <span>Open Lawyer Preparation Pack</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

function renderRiskCard(clause: ClauseItem, onNavigateToTab: (tabId: string) => void) {
  return (
    <div key={clause.id} className={`risk-detail-card ${clause.flagSeverity || 'medium'}`}>
      <div className="card-top">
        <div className="clause-loc">
          <span className="badge-ref">{clause.clauseNumber}</span>
          <span className="badge-page">Page {clause.pageNumber}</span>
          <span className="badge-cat">{clause.category}</span>
        </div>
        <span className={`severity-tag ${clause.flagSeverity || 'medium'}`}>
          {(clause.flagSeverity || 'medium').toUpperCase()} ATTENTION
        </span>
      </div>

      <h4 className="risk-clause-title">{clause.title}</h4>

      {clause.flagReason && (
        <div className="flag-reason-box">
          <strong>Why this was flagged:</strong> {clause.flagReason}
        </div>
      )}

      <div className="plain-summary">
        <strong>What this clause means in plain terms:</strong> {clause.plainExplanation}
      </div>

      <div className="recommendation-callout">
        <strong>What you may want to consider:</strong> {clause.actionToConsider}
      </div>

      <div className="card-bottom">
        <button 
          className="discuss-lawyer-link"
          onClick={() => onNavigateToTab('lawyerBrief')}
        >
          Add to Lawyer Briefing Notes
        </button>
      </div>
    </div>
  );
}
