import React, { useState, useRef } from 'react';
import { DocumentData, SupportedLanguage } from '../types';
import { processUploadedFile } from '../services/documentExtractor';
import { ALL_SAMPLE_DOCS } from '../services/sampleDocuments';
import { TRANSLATIONS } from '../services/localization';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentLoaded: (doc: DocumentData) => void;
  currentLanguage: SupportedLanguage;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onDocumentLoaded,
  currentLanguage
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const handleFileChosen = (file: File) => {
    setErrorMessage(null);

    // Validation
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'txt'];
    if (!ext || !validExts.includes(ext)) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'यह फ़ाइल प्रकार समर्थित नहीं है। कृपया PDF, DOCX, JPG या PNG अपलोड करें।'
          : currentLanguage === 'kn'
          ? 'ಈ ಫೈಲ್ ಪ್ರಕಾರ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು PDF, DOCX, JPG ಅಥವಾ PNG ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'
          : 'This file type is not supported. Please upload PDF, DOCX, JPG, or PNG.'
      );
      setSelectedFile(null);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'फ़ाइल बहुत बड़ी है। कृपया 25 MB से कम आकार की फ़ाइल अपलोड करें।'
          : currentLanguage === 'kn'
          ? 'ಫೈಲ್ ತುಂಬಾ ದೊಡ್ಡದಾಗಿದೆ. ದಯವಿಟ್ಟು 25 MB ಗಿಂತ ಕಡಿಮೆ ಇರುವ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'
          : 'File is too large. Please upload a file under 25 MB.'
      );
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const doc = await processUploadedFile(selectedFile);
      setIsProcessing(false);
      onDocumentLoaded(doc);
      onClose();
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Unable to process document. Please check the file and try again.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChosen(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: DocumentData) => {
    onDocumentLoaded(sample);
    onClose();
  };

  return (
    <div className="bw-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bw-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Fixed Header */}
        <div className="bw-modal-header">
          <h2 className="screen-heading" style={{ fontSize: '1.35rem', marginBottom: 0 }}>
            {t.upload.modalTitle}
          </h2>
          <button
            className="bw-btn bw-btn-secondary"
            style={{ minHeight: '32px', padding: '4px 10px', fontSize: '0.8rem' }}
            onClick={onClose}
          >
            {t.upload.closeBtn}
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="bw-modal-body">
          {/* Upload Drop Box */}
          <div
            className="upload-screen-box"
            style={{ background: isDragging ? '#f3f4f6' : '#ffffff' }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.txt"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChosen(e.target.files[0]);
                }
              }}
            />

            <div className="upload-main-text">
              {t.upload.dragDropText}
            </div>
            <div className="upload-formats-text">
              {t.upload.supportedFormats}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '1rem', marginTop: '4px' }}>
              {t.upload.scannedNote}
            </p>

            <button
              type="button"
              className="bw-btn bw-btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {t.upload.selectFile}
            </button>
          </div>

          {/* Selected File Details */}
          {selectedFile && (
            <div className="selected-file-card" style={{ marginBottom: '1rem' }}>
              <div className="file-info-text">
                <strong>{selectedFile.name}</strong>
                <span>
                  {(selectedFile.size / 1024).toFixed(1)} KB | {selectedFile.type || 'Document'}
                </span>
              </div>
              <button
                className="bw-btn bw-btn-primary"
                disabled={isProcessing}
                onClick={handleStartAnalysis}
              >
                {isProcessing ? t.upload.analyzingBtn : t.upload.startAnalysisBtn}
              </button>
            </div>
          )}

          {/* Error notification */}
          {errorMessage && (
            <div className="upload-error-box" style={{ marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          {/* Small Disclaimers Below */}
          <div className="upload-small-disclaimers" style={{ marginBottom: '1.25rem' }}>
            <div>{t.upload.warningAuthorized}</div>
            <div>{t.upload.legalInfoOnly}</div>
          </div>

          {/* Pre-loaded Sample Documents */}
          <div className="sample-docs-panel">
            <strong style={{ display: 'block', fontSize: '0.95rem', color: '#000', marginBottom: '6px' }}>
              {t.upload.loadSampleTitle}
            </strong>
            <div className="sample-list">
              {ALL_SAMPLE_DOCS.map((sample) => (
                <div
                  key={sample.id}
                  className="sample-row"
                  onClick={() => handleSelectSample(sample)}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{sample.fileName}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#4b5563' }}>
                      {sample.docType.replace('_', ' ').toUpperCase()} ({sample.pageCount} Pages)
                    </span>
                  </div>
                  <button className="bw-btn bw-btn-secondary" style={{ minHeight: '32px', fontSize: '0.8rem', padding: '3px 10px' }}>
                    {t.upload.loadBtn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
