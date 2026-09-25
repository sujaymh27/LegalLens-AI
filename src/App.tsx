import React, { useState, useEffect } from 'react';
import { DocumentData, SupportedLanguage } from './types';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { ClausesTab } from './components/ClausesTab';
import { AskDocumentTab } from './components/AskDocumentTab';
import { ComparisonTab } from './components/ComparisonTab';
import { LegalNoticeTab } from './components/LegalNoticeTab';
import { LawyerBriefTab } from './components/LawyerBriefTab';
import { SettingsTab } from './components/SettingsTab';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT, SAMPLE_LEGAL_NOTICE } from './services/sampleDocuments';
import { TRANSLATIONS } from './services/localization';

export const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [activeDocument, setActiveDocument] = useState<DocumentData | null>(SAMPLE_RENTAL_AGREEMENT);
  const [availableDocuments, setAvailableDocuments] = useState<DocumentData[]>([
    SAMPLE_RENTAL_AGREEMENT,
    SAMPLE_EMPLOYMENT_CONTRACT,
    SAMPLE_LEGAL_NOTICE
  ]);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isMasked, setIsMasked] = useState<boolean>(false);
  const [selectedClauseForQA, setSelectedClauseForQA] = useState<string | undefined>(undefined);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleDocumentLoaded = (doc: DocumentData) => {
    setActiveDocument(doc);
    setAvailableDocuments(prev => {
      if (prev.some(d => d.id === doc.id)) return prev;
      return [doc, ...prev];
    });
    setActiveTab('overview');
  };

  const handleToggleMask = () => {
    setIsMasked(prev => {
      const nextVal = !prev;
      if (activeDocument) {
        setActiveDocument({ ...activeDocument, isMasked: nextVal });
      }
      return nextVal;
    });
  };

  const handleResetSession = () => {
    if (window.confirm('Delete all documents and purge session data? This cannot be undone.')) {
      setActiveDocument(null);
      setAvailableDocuments([]);
      setActiveTab('upload');
      setIsMasked(false);
    }
  };

  const handleAskQuestionFromClause = (clauseRef: string) => {
    setSelectedClauseForQA(clauseRef);
    setActiveTab('qa');
  };

  // Keyboard navigation: Escape key closes modal or mobile nav menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsUploadModalOpen(false);
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'upload', label: t.sidebar.upload },
    { id: 'overview', label: t.sidebar.overview },
    { id: 'clauses', label: t.sidebar.clauses, badge: activeDocument?.keyClauses.length },
    { id: 'qa', label: t.sidebar.qa },
    { id: 'compare', label: t.sidebar.compare },
    { id: 'legalNotice', label: t.sidebar.legalNotice },
    { id: 'lawyerPack', label: t.sidebar.lawyerPack },
    { id: 'settings', label: t.sidebar.settings }
  ];

  const activeNavItem = navItems.find(item => item.id === activeTab) || navItems[1];

  return (
    <div className="app-container">
      {/* Sticky Top Bar */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        hasDocument={!!activeDocument}
        docName={activeDocument?.fileName}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Mobile Navigation Toggle Bar (Replaces horizontal pills in mobile view) */}
      <div className="mobile-nav-toggle-bar">
        <button
          type="button"
          className="mobile-nav-toggle-btn"
          onClick={() => setIsMobileNavOpen(prev => !prev)}
          aria-expanded={isMobileNavOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="mobile-nav-toggle-left">
            <span className="mobile-toggle-icon" aria-hidden="true">
              {isMobileNavOpen ? '✕' : '☰'}
            </span>
            <div className="mobile-toggle-titles">
              <span className="mobile-toggle-sub">Section / Menu:</span>
              <span className="mobile-toggle-current">
                {activeNavItem.label}
                {activeNavItem.badge !== undefined && activeNavItem.badge !== null && (
                  <span className="nav-item-badge" style={{ marginLeft: '6px' }}>{activeNavItem.badge}</span>
                )}
              </span>
            </div>
          </div>
          <span className="mobile-toggle-action">
            {isMobileNavOpen ? '▲ Close' : '▼ Menu'}
          </span>
        </button>

        {/* Vertical Dropdown Menu when toggled open */}
        {isMobileNavOpen && (
          <div className="mobile-nav-dropdown-menu">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`mobile-nav-dropdown-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (item.id === 'upload') {
                      setIsUploadModalOpen(true);
                    } else {
                      setActiveTab(item.id);
                    }
                    setIsMobileNavOpen(false);
                  }}
                >
                  <span className="mobile-item-title">{item.label}</span>
                  {item.badge !== undefined && item.badge !== null && (
                    <span className="nav-item-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Body Layout: Left Sidebar + Single-Column Main */}
      <div className="app-body-layout">
        {/* Left Sidebar Navigation (Desktop only) */}
        <aside className="app-sidebar" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === 'upload') {
                    setIsUploadModalOpen(true);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge !== null && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area (Single Column, 900-1000px max width) */}
        <main id="main-content" className="main-content-column" tabIndex={-1}>
          {!activeDocument ? (
            /* Upload Screen when no document is active */
            <div className="tab-pane upload-screen">
              <div className="screen-header">
                <h2 className="screen-heading">{t.upload.modalTitle}</h2>
                <p className="screen-subheading">
                  {t.upload.dropzoneSub}
                </p>
              </div>

              <div
                className="upload-screen-box"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <div className="upload-main-text">
                  {t.upload.dragDropText}
                </div>
                <div className="upload-formats-text">
                  {t.upload.supportedFormats}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1.25rem' }}>
                  {t.upload.scannedNote}
                </p>
                <button
                  type="button"
                  className="bw-btn bw-btn-primary"
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  {t.upload.selectFile}
                </button>
              </div>

              <div className="sample-docs-panel">
                <h3 className="bw-card-title">{t.upload.loadSampleTitle}</h3>
                <div className="sample-list">
                  <div className="sample-row" onClick={() => handleDocumentLoaded(SAMPLE_RENTAL_AGREEMENT)}>
                    <div>
                      <strong>Bengaluru Residential Lease Agreement</strong>
                      <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>11-month lease, Rs 38,000 rent, Rs 2,00,000 security deposit</div>
                    </div>
                    <button className="bw-btn bw-btn-secondary" style={{ minHeight: '36px', fontSize: '0.8rem' }}>{t.upload.loadBtn}</button>
                  </div>

                  <div className="sample-row" onClick={() => handleDocumentLoaded(SAMPLE_EMPLOYMENT_CONTRACT)}>
                    <div>
                      <strong>Senior Architect Employment Contract</strong>
                      <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>90-day notice period, 12-month non-compete restraint</div>
                    </div>
                    <button className="bw-btn bw-btn-secondary" style={{ minHeight: '36px', fontSize: '0.8rem' }}>Load</button>
                  </div>

                  <div className="sample-row" onClick={() => handleDocumentLoaded(SAMPLE_LEGAL_NOTICE)}>
                    <div>
                      <strong>Section 138 NI Act Statutory Legal Notice</strong>
                      <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>Rs 4,50,000 dishonoured cheque, 15-day statutory response clock</div>
                    </div>
                    <button className="bw-btn bw-btn-secondary" style={{ minHeight: '36px', fontSize: '0.8rem' }}>Load</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Active Document Views with instant synchronous rendering */
            <>
              {activeTab === 'overview' && (
                <OverviewTab
                  document={activeDocument}
                  currentLanguage={currentLanguage}
                  onNavigateToTab={setActiveTab}
                  onToggleMask={handleToggleMask}
                />
              )}

              {activeTab === 'clauses' && (
                <ClausesTab
                  document={activeDocument}
                  currentLanguage={currentLanguage}
                  onAskQuestionAboutClause={handleAskQuestionFromClause}
                />
              )}

              {activeTab === 'qa' && (
                <AskDocumentTab
                  document={activeDocument}
                  currentLanguage={currentLanguage}
                  initialQuestionPrompt={selectedClauseForQA}
                />
              )}

              {activeTab === 'compare' && (
                <ComparisonTab
                  currentDocument={activeDocument}
                  availableDocuments={availableDocuments}
                  currentLanguage={currentLanguage}
                  onNavigateToLawyerPack={() => setActiveTab('lawyerPack')}
                />
              )}

              {activeTab === 'legalNotice' && (
                <LegalNoticeTab
                  document={activeDocument}
                  onLoadLegalNoticeSample={() => {
                    setActiveDocument(SAMPLE_LEGAL_NOTICE);
                    setActiveTab('legalNotice');
                  }}
                  currentLanguage={currentLanguage}
                />
              )}

              {activeTab === 'lawyerPack' && (
                <LawyerBriefTab
                  document={activeDocument}
                  currentLanguage={currentLanguage}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                  document={activeDocument}
                  isMasked={isMasked}
                  onToggleMask={handleToggleMask}
                  onResetSession={handleResetSession}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onDocumentLoaded={handleDocumentLoaded}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default App;
