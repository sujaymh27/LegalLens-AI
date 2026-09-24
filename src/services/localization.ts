import { SupportedLanguage, ClauseItem } from '../types';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  disclaimerBanner: string;
  header: {
    noticeTag: string;
    noticeText: string;
    groundedText: string;
    switchDoc: string;
    noDoc: string;
    help: string;
    helpTitle: string;
    helpStep1: string;
    helpStep2: string;
    helpStep3: string;
    helpStep4: string;
    helpStep5: string;
    closeBtn: string;
  };
  sidebar: {
    upload: string;
    overview: string;
    clauses: string;
    qa: string;
    compare: string;
    legalNotice: string;
    lawyerPack: string;
    settings: string;
  };
  upload: {
    dropzoneTitle: string;
    dropzoneSub: string;
    sampleDocsTitle: string;
    loadSample: string;
    detectingDoc: string;
    parsingOcr: string;
    warningOcr: string;
    modalTitle: string;
    closeBtn: string;
    dragDropText: string;
    supportedFormats: string;
    scannedNote: string;
    selectFile: string;
    warningAuthorized: string;
    legalInfoOnly: string;
    loadSampleTitle: string;
    loadBtn: string;
    analyzingBtn: string;
    startAnalysisBtn: string;
  };
  overview: {
    partiesTitle: string;
    datesTitle: string;
    amountsTitle: string;
    signaturesTitle: string;
    docTypeDetected: string;
    confidence: string;
    witnesses: string;
    keyFacts: string;
    firstParty: string;
    secondParty: string;
    startDate: string;
    endDate: string;
    financialTerms: string;
    primaryAmount: string;
    securityDeposit: string;
    penalties: string;
    executionStatus: string;
    signed: string;
    witnessCount: string;
    notFound: string;
    importantClausesTitle: string;
    simpleExplanation: string;
    originalRef: string;
    whyItMatters: string;
    pointsToConsider: string;
    askAboutClause: string;
    viewAllClauses: string;
    actionItemsTitle: string;
    deadlineCalcTitle: string;
    triggerDateLabel: string;
    calcBtn: string;
    targetDeadlineLabel: string;
    ocrQualityNotice: string;
  };
  clauses: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    plainExplanation: string;
    whyItMatters: string;
    actionToConsider: string;
    flaggedBadge: string;
    noMatch: string;
    pageLabel: string;
    askAboutClause: string;
  };
  risks: {
    title: string;
    subtitle: string;
    severityCritical: string;
    severityHigh: string;
    severityMedium: string;
    attentionNotice: string;
  };
  obligations: {
    title: string;
    subtitle: string;
    calculatorTitle: string;
    enterEventDate: string;
    calculateBtn: string;
    deadlineLabel: string;
    statusUrgent: string;
    statusPending: string;
  };
  qa: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    sendBtn: string;
    suggestedTitle: string;
    citationsTitle: string;
    generalLegalInfoNotice: string;
    welcomeMsg: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    selectDocA: string;
    selectDocB: string;
    categoryCol: string;
    differencesCol: string;
    practicalImpactCol: string;
    noDocSelected: string;
  };
  legalNotice: {
    title: string;
    subtitle: string;
    sampleNoticeBanner: string;
    loadSampleBtn: string;
    basicInfo: string;
    sender: string;
    recipient: string;
    date: string;
    medium: string;
    allegationsTitle: string;
    consequencesTitle: string;
    checklistTitle: string;
    downloadBtn: string;
  };
  lawyerBrief: {
    title: string;
    subtitle: string;
    printBtn: string;
    factsSummary: string;
    keyDatesTitle: string;
    concernsTitle: string;
    questionsTitle: string;
    statusExecuted: string;
    statusDraft: string;
  };
  privacy: {
    title: string;
    subtitle: string;
    sensitiveFound: string;
    maskToggle: string;
    clearSession: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageTitle: string;
    languageDesc: string;
    languageLabel: string;
    privacyTitle: string;
    maskTitle: string;
    maskDesc: string;
    optInTitle: string;
    optInDesc: string;
    dangerTitle: string;
    dangerDesc: string;
    clearBtn: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'LegalLens AI',
    appSubtitle: 'Professional Legal Information & Document Navigation Assistant',
    disclaimerBanner: 'LegalLens AI provides legal information, not legal advice, and does not create an attorney-client relationship. All analysis is grounded directly in your uploaded documents. For specific legal counsel, consult a qualified lawyer.',
    header: {
      noticeTag: 'NOTICE',
      noticeText: 'Legal information only, not legal advice. No attorney-client relationship is created.',
      groundedText: 'All analysis grounded in uploaded document',
      switchDoc: '[Switch]',
      noDoc: 'No document loaded',
      help: 'Help',
      helpTitle: 'LegalLens AI – Quick Guide',
      helpStep1: '1. Upload or Select Document: Ingest any PDF, DOCX, or scanned photo. Use built-in sample contracts for testing.',
      helpStep2: '2. Document Overview: View extracted parties, important dates, financial amounts, and execution details.',
      helpStep3: '3. Important Clauses: Explore plain-language translations with references, why it matters, and strategic considerations.',
      helpStep4: '4. Ask Questions: Ask questions grounded strictly in the document text with page citations.',
      helpStep5: '5. Checklist & Lawyer Pack: Export a structured brief to take to your advocate consultation.',
      closeBtn: 'Close'
    },
    sidebar: {
      upload: 'Upload Document',
      overview: 'Document Overview',
      clauses: 'Clauses',
      qa: 'Questions',
      compare: 'Compare',
      legalNotice: 'Legal Notice',
      lawyerPack: 'Checklist & Lawyer Pack',
      settings: 'Settings'
    },
    upload: {
      dropzoneTitle: 'Upload Legal Document',
      dropzoneSub: 'Supports PDF, DOCX, or scanned photos (PNG, JPG) with in-browser OCR',
      sampleDocsTitle: 'Or Explore Pre-loaded Real-World Legal Documents',
      loadSample: 'Load Document',
      detectingDoc: 'Analyzing document structure & detecting legal type...',
      parsingOcr: 'Running optical character recognition (OCR) on scan...',
      warningOcr: 'Scanned image quality may be low or skewed. Recommendations: review extracted text or re-upload a higher resolution scan.',
      modalTitle: 'Upload Document',
      closeBtn: 'Close [X]',
      dragDropText: 'Drag and drop your document here or click to select file',
      supportedFormats: 'Supported formats: PDF, DOCX, JPG, PNG',
      scannedNote: 'You can upload scanned photos of documents.',
      selectFile: 'Select File',
      warningAuthorized: 'Do not upload documents you are not authorized to share.',
      legalInfoOnly: 'This tool provides legal information, not legal advice.',
      loadSampleTitle: 'Or Load a Pre-Configured Sample Document:',
      loadBtn: 'Load',
      analyzingBtn: 'Analyzing Document...',
      startAnalysisBtn: 'Start Analysis'
    },
    overview: {
      partiesTitle: 'Identified Parties & Roles',
      datesTitle: 'Key Dates & Timelines',
      amountsTitle: 'Financial Values & Deposits',
      signaturesTitle: 'Execution & Signatures Status',
      docTypeDetected: 'Detected Document Classification',
      confidence: 'Confidence Score',
      witnesses: 'Attestation & Witnesses',
      keyFacts: 'Key Facts',
      firstParty: 'First Party',
      secondParty: 'Second Party',
      startDate: 'Start Date',
      endDate: 'End Date',
      financialTerms: 'Financial Terms & Amounts',
      primaryAmount: 'Primary Amount',
      securityDeposit: 'Security / Deposit',
      penalties: 'Deductions / Penalties',
      executionStatus: 'Execution & Formalities',
      signed: 'Signed',
      witnessCount: 'Witness Count',
      notFound: 'Not found in document',
      importantClausesTitle: 'Important Clauses (Requires Attention)',
      simpleExplanation: 'Simple Explanation',
      originalRef: 'Original Text Reference',
      whyItMatters: 'Why This Matters',
      pointsToConsider: 'Points to Consider',
      askAboutClause: 'Ask Question About This Clause',
      viewAllClauses: 'View All Clauses in Detail',
      actionItemsTitle: 'Action Items & Obligations',
      deadlineCalcTitle: 'Event-Based Statutory Deadline Calculator',
      triggerDateLabel: 'Notice / Trigger Date:',
      calcBtn: 'Calculate Statutory Deadline',
      targetDeadlineLabel: 'Target Legal Deadline:',
      ocrQualityNotice: 'Note on Extraction Quality: This document was parsed via optical character recognition. Verify extracted figures against the original physical paper.'
    },
    clauses: {
      title: 'Clauses in This Document',
      subtitle: 'Explore individual clauses with plain-language explanations, citations, and strategic considerations.',
      searchPlaceholder: 'Search clauses (for example: termination, rent, notice)...',
      allCategories: 'All Categories',
      plainExplanation: 'Simple Explanation',
      whyItMatters: 'Why This Matters',
      actionToConsider: 'Points to Consider',
      flaggedBadge: 'Requires Special Attention',
      noMatch: 'No clauses found matching your search. Try searching for terms like "notice", "rent", or "termination".',
      pageLabel: 'Page',
      askAboutClause: 'Ask Question About This Clause'
    },
    risks: {
      title: 'Risk & Attention Flags',
      subtitle: 'Clauses with substantive financial, operational, or legal liability implications.',
      severityCritical: 'High Caution / Significant Impact',
      severityHigh: 'Important Attention Required',
      severityMedium: 'Standard Commercial Attention',
      attentionNotice: 'Flags indicate clauses that warrant careful review or discussion with a qualified legal professional, rather than definitive determinations of legality.'
    },
    obligations: {
      title: 'Obligations & Deadline Tracker',
      subtitle: 'Who must do what, by when, and under what specific conditions.',
      calculatorTitle: 'Event-Based Deadline Calculator',
      enterEventDate: 'Specify triggering event date (e.g., Notice Delivery Date, Vacation Date):',
      calculateBtn: 'Calculate Projected Deadline',
      deadlineLabel: 'Calculated Target Deadline',
      statusUrgent: 'Urgent / Statutory Clock Running',
      statusPending: 'Active Obligation'
    },
    qa: {
      title: 'Ask-Your-Document Q&A',
      subtitle: 'Ask any question strictly answered and cited from the uploaded document text.',
      inputPlaceholder: 'Ask a question about this document (e.g. Can the landlord deduct painting charges?)...',
      sendBtn: 'Ask LegalLens',
      suggestedTitle: 'Common Questions For This Document',
      citationsTitle: 'Supporting Document Citations',
      generalLegalInfoNotice: 'General legal information: Not legal advice. Consult a licensed advocate for individual counsel.',
      welcomeMsg: 'Hello. You can ask any question about your document. I will answer based strictly on the text and cite the page and clause.'
    },
    comparison: {
      title: 'Document Comparison',
      subtitle: 'Compare key obligations, costs, and risks side-by-side across two legal documents.',
      selectDocA: 'Document A (Base Document):',
      selectDocB: 'Document B (Comparison Document):',
      categoryCol: 'Category',
      differencesCol: 'Key Differences & Practical Impact',
      practicalImpactCol: 'Summary of Changes',
      noDocSelected: 'Select two documents from the dropdowns above to compare clauses and obligations side-by-side.'
    },
    legalNotice: {
      title: 'Legal Notice Navigator',
      subtitle: 'Structured analysis of statutory notices, allegations, deadlines, and response checklist.',
      sampleNoticeBanner: 'Currently viewing non-notice document. Click below to load an official Section 138 NI Act Statutory Demand Notice sample.',
      loadSampleBtn: 'Load Section 138 Notice Sample',
      basicInfo: '1. Basic Information',
      sender: 'Sender:',
      recipient: 'Recipient:',
      date: 'Date:',
      medium: 'Medium:',
      allegationsTitle: '2. Key Allegations',
      consequencesTitle: '3. Demanded Actions & Legal Consequences',
      checklistTitle: '4. Immediate Response Checklist',
      downloadBtn: 'Print / Save Notice Pack'
    },
    lawyerBrief: {
      title: 'Your Document Summary and Lawyer Pack',
      subtitle: 'A concise, printable executive summary to maximize the productivity of your consultation with a qualified lawyer.',
      printBtn: 'Print / Save as PDF Brief',
      factsSummary: '1. Short Facts Summary',
      keyDatesTitle: '2. Chronological Timeline & Critical Deadlines',
      concernsTitle: '3. Priority Points of Concern',
      questionsTitle: '4. Strategic Questions to Ask Your Lawyer',
      statusExecuted: 'Executed Agreement',
      statusDraft: 'Draft Copy'
    },
    privacy: {
      title: 'Privacy, Confidentiality & Redaction Vault',
      subtitle: 'Client-side sensitive data scanner for Indian IDs, PAN, Aadhaar, bank numbers, and salaries.',
      sensitiveFound: 'Sensitive Personal Data Discovered',
      maskToggle: 'Mask Sensitive Identifiers in Explanations & LLM Prompts',
      clearSession: 'Purge Document Data & Reset Session'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage language, privacy, and data settings.',
      languageTitle: 'Language',
      languageDesc: 'Choose your preferred language for explanations and document summaries.',
      languageLabel: 'Display & Explanation Language:',
      privacyTitle: 'Privacy & Security',
      maskTitle: 'Mask Sensitive Identifiers (Client-Side Redaction)',
      maskDesc: 'Automatically detects and hides Aadhaar, PAN, phone numbers, and bank accounts in explanations and AI requests.',
      optInTitle: 'Do Not Use My Documents for Model Training',
      optInDesc: 'Ensure uploaded agreements are never retained or used to retrain public foundation models.',
      dangerTitle: 'Session Data Management',
      dangerDesc: 'Permanently erase loaded documents, extracted clauses, and reset conversation history from browser storage.',
      clearBtn: 'Erase All Documents & Reset Session'
    }
  },

  hi: {
    appName: 'लीगल-लेंस एआई (LegalLens AI)',
    appSubtitle: 'व्यावसायिक कानूनी सूचना एवं दस्तावेज़ नेविगेशन सहायक',
    disclaimerBanner: 'लीगल-लेंस एआई केवल कानूनी जानकारी प्रदान करता है, कानूनी सलाह नहीं, और यह वकील-मुवक्किल संबंध स्थापित नहीं करता है। सभी विश्लेषण केवल आपके दस्तावेज़ पर आधारित हैं। व्यक्तिगत सलाह हेतु योग्य वकील से परामर्श करें।',
    header: {
      noticeTag: 'सूचना',
      noticeText: 'केवल कानूनी जानकारी, कानूनी सलाह नहीं। कोई वकील-मुवक्किल संबंध नहीं बनता।',
      groundedText: 'सभी विश्लेषण अपलोड किए गए दस्तावेज़ पर आधारित हैं',
      switchDoc: '[बदलें]',
      noDoc: 'कोई दस्तावेज़ लोड नहीं है',
      help: 'सहायता',
      helpTitle: 'लीगल-लेंस एआई – त्वरित मार्गदर्शिका',
      helpStep1: '1. दस्तावेज़ अपलोड या चुनें: कोई भी PDF, DOCX या स्कैन फोटो अपलोड करें। परीक्षण के लिए दिए गए नमूनों का उपयोग करें।',
      helpStep2: '2. दस्तावेज़ अवलोकन: पहचाने गए पक्ष, महत्वपूर्ण तिथियां, वित्तीय राशि और हस्ताक्षर स्थिति देखें।',
      helpStep3: '3. महत्वपूर्ण धाराएं: सरल भाषा में व्याख्या, संदर्भ, महत्व और विचारणीय बिंदु देखें।',
      helpStep4: '4. प्रश्न पूछें: दस्तावेज़ के आधार पर सीधे प्रश्न पूछें और संदर्भ प्राप्त करें।',
      helpStep5: '5. वकील तैयारी पत्र: वकील के साथ परामर्श के लिए संक्षिप्त विवरण पत्र तैयार करें।',
      closeBtn: 'बंद करें'
    },
    sidebar: {
      upload: 'दस्तावेज़ अपलोड करें',
      overview: 'दस्तावेज़ अवलोकन',
      clauses: 'धाराएं एवं नियम',
      qa: 'प्रश्न पूछें',
      compare: 'दस्तावेज़ तुलना',
      legalNotice: 'कानूनी नोटिस',
      lawyerPack: 'वकील परामर्श पत्र',
      settings: 'सेटिंग्स'
    },
    upload: {
      dropzoneTitle: 'कानूनी दस्तावेज़ अपलोड करें',
      dropzoneSub: 'पीडीएफ, डॉक्स, या स्कैन की गई तस्वीर (PNG, JPG) समर्थित',
      sampleDocsTitle: 'या पूर्व-निर्धारित वास्तविक दस्तावेज़ देखें',
      loadSample: 'दस्तावेज़ लोड करें',
      detectingDoc: 'दस्तावेज़ संरचना और प्रकार का विश्लेषण किया जा रहा है...',
      parsingOcr: 'स्कैन किए गए दस्तावेज़ से ओसीआर (OCR) द्वारा पाठ निकाला जा रहा है...',
      warningOcr: 'स्कैन की गुणवत्ता कम हो सकती है। कृपया स्पष्ट स्कैन पुनः अपलोड करने पर विचार करें।',
      modalTitle: 'दस्तावेज़ अपलोड करें',
      closeBtn: 'बंद करें [X]',
      dragDropText: 'अपना दस्तावेज़ यहां खींचें और छोड़ें या फ़ाइल चुनने के लिए क्लिक करें',
      supportedFormats: 'समर्थित प्रारूप: PDF, DOCX, JPG, PNG',
      scannedNote: 'आप दस्तावेज़ों की स्कैन की गई तस्वीरें भी अपलोड कर सकते हैं।',
      selectFile: 'फ़ाइल चुनें',
      warningAuthorized: 'ऐसे दस्तावेज़ अपलोड न करें जिन्हें साझा करने का अधिकार आपको नहीं है।',
      legalInfoOnly: 'यह उपकरण कानूनी जानकारी प्रदान करता है, कानूनी सलाह नहीं।',
      loadSampleTitle: 'या पहले से लोड किया गया नमूना दस्तावेज़ चुनें:',
      loadBtn: 'लोड करें',
      analyzingBtn: 'दस्तावेज़ का विश्लेषण हो रहा है...',
      startAnalysisBtn: 'विश्लेषण शुरू करें'
    },
    overview: {
      partiesTitle: 'पहचाने गए पक्षकार एवं भूमिकाएं',
      datesTitle: 'महत्वपूर्ण तिथियां एवं समय-सारणी',
      amountsTitle: 'वित्तीय राशि एवं सुरक्षा जमा',
      signaturesTitle: 'हस्ताक्षर एवं निष्पादन स्थिति',
      docTypeDetected: 'दस्तावेज़ का प्रकार',
      confidence: 'सटीकता स्कोर',
      witnesses: 'गवाह एवं सत्यापन',
      keyFacts: 'मुख्य तथ्य',
      firstParty: 'प्रथम पक्ष',
      secondParty: 'द्वितीय पक्ष',
      startDate: 'प्रारंभ तिथि',
      endDate: 'समाप्ति तिथि',
      financialTerms: 'वित्तीय शर्तें एवं राशि',
      primaryAmount: 'मुख्य राशि',
      securityDeposit: 'सुरक्षा जमा',
      penalties: 'कटौती / जुर्माना',
      executionStatus: 'हस्ताक्षर एवं औपचारिकताएं',
      signed: 'हस्ताक्षरित',
      witnessCount: 'गवाहों की संख्या',
      notFound: 'दस्तावेज़ में नहीं मिला',
      importantClausesTitle: 'महत्वपूर्ण धाराएं (विशेष ध्यान आवश्यक)',
      simpleExplanation: 'सरल व्याख्या',
      originalRef: 'मूल दस्तावेज़ संदर्भ',
      whyItMatters: 'यह आपके लिए क्यों महत्वपूर्ण है',
      pointsToConsider: 'विचारणीय बिंदु',
      askAboutClause: 'इस धारा के बारे में प्रश्न पूछें',
      viewAllClauses: 'सभी धाराएं विस्तार से देखें',
      actionItemsTitle: 'कार्य सूची एवं दायित्व',
      deadlineCalcTitle: 'घटना आधारित कानूनी समय-सीमा गणक (कैलकुलेटर)',
      triggerDateLabel: 'नोटिस / घटना की तिथि:',
      calcBtn: 'समय-सीमा की गणना करें',
      targetDeadlineLabel: 'अंतिम कानूनी समय-सीमा:',
      ocrQualityNotice: 'निकाले गए पाठ की गुणवत्ता: यह दस्तावेज़ ओसीआर द्वारा स्कैन किया गया है। कृपया मूल कागज़ से आंकड़ों की पुष्टि करें।'
    },
    clauses: {
      title: 'इस दस्तावेज़ की धाराएं एवं नियम',
      subtitle: 'प्रत्येक धारा की सरल व्याख्या, संदर्भ और महत्वपूर्ण सुझाव देखें।',
      searchPlaceholder: 'धाराएं खोजें (उदाहरण: समाप्ति, किराया, नोटिस)...',
      allCategories: 'सभी श्रेणियां',
      plainExplanation: 'सरल व्याख्या',
      whyItMatters: 'यह आपके लिए क्यों महत्वपूर्ण है',
      actionToConsider: 'विचारणीय बिंदु',
      flaggedBadge: 'विशेष ध्यान देने योग्य',
      noMatch: 'आपकी खोज से मेल खाती कोई धारा नहीं मिली। अन्य शब्द खोजें।',
      pageLabel: 'पृष्ठ',
      askAboutClause: 'इस धारा के बारे में प्रश्न पूछें'
    },
    risks: {
      title: 'जोखिम एवं ध्यान देने योग्य शर्तें',
      subtitle: 'वित्तीय या कानूनी दायित्व वाली प्रमुख धाराएं।',
      severityCritical: 'उच्च सावधानी आवश्यक',
      severityHigh: 'महत्वपूर्ण समीक्षा अपेक्षित',
      severityMedium: 'सामान्य व्यावसायिक ध्यान',
      attentionNotice: 'ये संकेत केवल ध्यान दिलाने के लिए हैं, वैधता का अंतिम निर्णय वकील से चर्चा के बाद ही करें।'
    },
    obligations: {
      title: 'दायित्व एवं समय-सीमा ट्रैकर',
      subtitle: 'किसको क्या करना है, कब तक और किन शर्तों के तहत।',
      calculatorTitle: 'घटना आधारित समय-सीमा गणक (कैलकुलेटर)',
      enterEventDate: 'शुरुआती घटना की तारीख दर्ज करें (जैसे नोटिस प्राप्ति तिथि):',
      calculateBtn: 'समय-सीमा की गणना करें',
      deadlineLabel: 'अंतिम समय-सीमा',
      statusUrgent: 'अत्यंत आवश्यक / समय सीमित',
      statusPending: 'सक्रिय दायित्व'
    },
    qa: {
      title: 'दस्तावेज़ से प्रश्न-उत्तर',
      subtitle: 'अपने दस्तावेज़ के आधार पर सीधे प्रश्न पूछें।',
      inputPlaceholder: 'दस्तावेज़ के बारे में प्रश्न पूछें...',
      sendBtn: 'पूछें',
      suggestedTitle: 'दस्तावेज़ से संबंधित सामान्य प्रश्न',
      citationsTitle: 'दस्तावेज़ के संदर्भ एवं पृष्ठ संख्या',
      generalLegalInfoNotice: 'सामान्य कानूनी जानकारी: यह कानूनी सलाह नहीं है। विशिष्ट सलाह के लिए वकील से संपर्क करें।',
      welcomeMsg: 'नमस्ते। आप अपने दस्तावेज़ के बारे में कोई भी प्रश्न पूछ सकते हैं। उत्तर सीधे दस्तावेज़ के आधार पर दिया जाएगा।'
    },
    comparison: {
      title: 'दस्तावेज़ तुलना',
      subtitle: 'दो कानूनी दस्तावेज़ों के बीच दायित्वों, लागतों और जोखिमों की सीधी तुलना करें।',
      selectDocA: 'दस्तावेज़ A (मूल दस्तावेज़):',
      selectDocB: 'दस्तावेज़ B (तुलना दस्तावेज़):',
      categoryCol: 'श्रेणी',
      differencesCol: 'मुख्य अंतर एवं व्यावहारिक प्रभाव',
      practicalImpactCol: 'परिवर्तनों का सारांश',
      noDocSelected: 'दो दस्तावेज़ चुनें ताकि धाराओं की तुलना की जा सके।'
    },
    legalNotice: {
      title: 'कानूनी नोटिस विश्लेषक',
      subtitle: 'कानूनी नोटिस, आरोपों, समय-सीमा और उत्तर की तैयारी की समीक्षा।',
      sampleNoticeBanner: 'वर्तमान में सामान्य दस्तावेज़ देख रहे हैं। धारा 138 चेक बाउंस नोटिस का नमूना देखने के लिए नीचे क्लिक करें।',
      loadSampleBtn: 'धारा 138 नोटिस नमूना लोड करें',
      basicInfo: '1. मूलभूत जानकारी',
      sender: 'प्रेषक:',
      recipient: 'प्राप्तकर्ता:',
      date: 'दिनांक:',
      medium: 'माध्यम:',
      allegationsTitle: '2. मुख्य आरोप',
      consequencesTitle: '3. मांगी गई कार्रवाई एवं कानूनी परिणाम',
      checklistTitle: '4. तत्काल कार्रवाई एवं दस्तावेज़ चेकलिस्ट',
      downloadBtn: 'प्रिंट / नोटिस पैक सेव करें'
    },
    lawyerBrief: {
      title: 'दस्तावेज़ सारांश एवं वकील परामर्श पत्र',
      subtitle: 'योग्य वकील से मिलने से पहले तैयारी के लिए एक संक्षिप्त एवं मुद्रण योग्य विवरण पत्र।',
      printBtn: 'प्रिंट / पीडीएफ सेव करें',
      factsSummary: '1. मुख्य तथ्यों का सारांश',
      keyDatesTitle: '2. महत्वपूर्ण तिथियां एवं समय-सीमाएं',
      concernsTitle: '3. प्राथमिकता वाली चिंताएं',
      questionsTitle: '4. वकील से पूछने योग्य रणनीतिक प्रश्न',
      statusExecuted: 'हस्ताक्षरित अनुबंध',
      statusDraft: 'प्रारूप (ड्राफ्ट) प्रति'
    },
    privacy: {
      title: 'गोपनीयता एवं संवेदनशील डेटा सुरक्षा',
      subtitle: 'आधार, पैन, बैंक खाता व वेतन संबंधी व्यक्तिगत डेटा सुरक्षा।',
      sensitiveFound: 'संवेदनशील व्यक्तिगत डेटा मिला',
      maskToggle: 'संवेदनशील विवरणों को सुरक्षित रूप से छुपाएं (Mask/Redact)',
      clearSession: 'दस्तावेज़ डेटा मिटाएं और सत्र रीसेट करें'
    },
    settings: {
      title: 'सेटिंग्स',
      subtitle: 'भाषा, गोपनीयता और डेटा सेटिंग्स प्रबंधित करें।',
      languageTitle: 'भाषा',
      languageDesc: 'व्याख्या और सारांश के लिए अपनी पसंदीदा भाषा चुनें।',
      languageLabel: 'प्रदर्शन एवं व्याख्या की भाषा:',
      privacyTitle: 'गोपनीयता एवं सुरक्षा',
      maskTitle: 'संवेदनशील पहचानकर्ताओं को छुपाएं (Mask/Redact)',
      maskDesc: 'व्याख्याओं और एआई अनुरोधों में आधार, पैन, फोन नंबर और बैंक खातों को स्वतः छुपाता है।',
      optInTitle: 'मॉडल प्रशिक्षण के लिए मेरे दस्तावेज़ों का उपयोग न करें',
      optInDesc: 'यह सुनिश्चित करता है कि आपके दस्तावेज़ कभी भी संग्रहीत या सार्वजनिक मॉडल के लिए उपयोग नहीं होंगे।',
      dangerTitle: 'सत्र डेटा प्रबंधन',
      dangerDesc: 'लोड किए गए दस्तावेज़ों, निकाली गई धाराओं और चैट इतिहास को हमेशा के लिए मिटाएं।',
      clearBtn: 'सभी दस्तावेज़ मिटाएं और सत्र रीसेट करें'
    }
  },

  kn: {
    appName: 'ಲೀಗಲ್-ಲೆನ್ಸ್ ಎಐ (LegalLens AI)',
    appSubtitle: 'ವೃತ್ತಿಪರ ಕಾನೂನು ಮಾಹಿತಿ ಮತ್ತು ದಾಖಲೆ ಸಂಚರಣೆ ಸಹಾಯಕ',
    disclaimerBanner: 'ಲೀಗಲ್-ಲೆನ್ಸ್ ಎಐ ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ, ಕಾನೂನು ಸಲಹೆಯನ್ನಲ್ಲ, ಮತ್ತು ಇದು ವಕೀಲ-ಕ್ಲೈಂಟ್ ಸಂಬಂಧವನ್ನು ಸೃಷ್ಟಿಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ವಿಶ್ಲೇಷಣೆಗಳು ನಿಮ್ಮ ದಾಖಲೆಯ ಮೇಲೆಯೇ ಆಧಾರಿತವಾಗಿವೆ. ಕಾನೂನು ಸಲಹೆಗಾಗಿ ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    header: {
      noticeTag: 'ಸೂಚನೆ',
      noticeText: 'ಕಾನೂನು ಮಾಹಿತಿ ಮಾತ್ರ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ಯಾವುದೇ ವಕೀಲ-ಕ್ಲೈಂಟ್ ಸಂಬಂಧವಿಲ್ಲ.',
      groundedText: 'ಎಲ್ಲಾ ವಿಶ್ಲೇಷಣೆಗಳು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯನ್ನು ಆಧರಿಸಿವೆ',
      switchDoc: '[ಬದಲಾಯಿಸಿ]',
      noDoc: 'ಯಾವುದೇ ದಾಖಲೆ ಲೋಡ್ ಆಗಿಲ್ಲ',
      help: 'ಸಹಾಯ',
      helpTitle: 'ಲೀಗಲ್-ಲೆನ್ಸ್ ಎಐ – ತ್ವರಿತ ಮಾರ್ಗದರ್ಶಿ',
      helpStep1: '1. ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ: ಯಾವುದೇ PDF, DOCX ಅಥವಾ ಸ್ಕ್ಯಾನ್ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
      helpStep2: '2. ದಾಖಲೆಯ ವಿವರಣೆ: ವ್ಯಕ್ತಿಗಳು, ಪ್ರಮುಖ ದಿನಾಂಕಗಳು, ಮೊತ್ತ ಮತ್ತು ಸಹಿ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
      helpStep3: '3. ಪ್ರಮುಖ ನಿಯಮಗಳು: ಸರಳ ವಿವರಣೆ, ಉಲ್ಲೇಖಗಳು, ಮತ್ತು ಪರಿಗಣಿಸಬೇಕಾದ ಅಂಶಗಳನ್ನು ನೋಡಿ.',
      helpStep4: '4. ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ: ದಾಖಲೆಯ ಆಧಾರದ ಮೇಲೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಉಲ್ಲೇಖಗಳನ್ನು ಪಡೆಯಿರಿ.',
      helpStep5: '5. ವಕೀಲರ ಸಿದ್ಧತಾ ಪತ್ರ: ವಕೀಲರ ಭೇಟಿಗಾಗಿ ವ್ಯವಸ್ಥಿತ ಸಾರಾಂಶವನ್ನು ಮುದ್ರಿಸಿ.',
      closeBtn: 'ಮುಚ್ಚಿ'
    },
    sidebar: {
      upload: 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
      overview: 'ದಾಖಲೆಯ ವಿವರಣೆ',
      clauses: 'ನಿಯಮಗಳು',
      qa: 'ಪ್ರಶ್ನೋತ್ತರ',
      compare: 'ಹೋಲಿಕೆ',
      legalNotice: 'ಕಾನೂನು ನೋಟಿಸ್',
      lawyerPack: 'ವಕೀಲರ ಸಿದ್ಧತಾ ಪತ್ರ',
      settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್'
    },
    upload: {
      dropzoneTitle: 'ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      dropzoneSub: 'PDF, DOCX ಅಥವಾ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಚಿತ್ರಗಳು (PNG, JPG) ಬೆಂಬಲಿತವಾಗಿದೆ',
      sampleDocsTitle: 'ಅಥವಾ ನೈಜ ಮಾದರಿ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      loadSample: 'ದಾಖಲೆ ವೀಕ್ಷಿಸಿ',
      detectingDoc: 'ದಾಖಲೆಯ ಪ್ರಕಾರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      parsingOcr: 'OCR ಮೂಲಕ ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...',
      warningOcr: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಕಡಿಮೆ ಇರಬಹುದು. ಸ್ಪಷ್ಟವಾದ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.',
      modalTitle: 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      closeBtn: 'ಮುಚ್ಚಿ [X]',
      dragDropText: 'ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      supportedFormats: 'ಬೆಂಬಲಿತ ಫಾರ್ಮ್ಯಾಟ್‌ಗಳು: PDF, DOCX, JPG, PNG',
      scannedNote: 'ನೀವು ದಾಖಲೆಗಳ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಫೋಟೋಗಳನ್ನು ಸಹ ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು.',
      selectFile: 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
      warningAuthorized: 'ನೀವು ಹಂಚಿಕೊಳ್ಳಲು ಅಧಿಕಾರ ಹೊಂದಿರದ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ.',
      legalInfoOnly: 'ಈ ವ್ಯವಸ್ಥೆಯು ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ, ಕಾನೂನು ಸಲಹೆಯನ್ನಲ್ಲ.',
      loadSampleTitle: 'ಅಥವಾ ಮೊದಲೇ ಸಿದ್ಧಪಡಿಸಿದ ಮಾದರಿ ದಾಖಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
      loadBtn: 'ಲೋಡ್ ಮಾಡಿ',
      analyzingBtn: 'ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      startAnalysisBtn: 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ'
    },
    overview: {
      partiesTitle: 'ಗುರುತಿಸಲಾದ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಪಾತ್ರಗಳು',
      datesTitle: 'ಪ್ರಮುಖ ದಿನಾಂಕಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ',
      amountsTitle: 'ಹಣಕಾಸಿನ ಮೊತ್ತ ಮತ್ತು ಮುಂಗಡ ಠೇವಣಿ',
      signaturesTitle: 'ಸಹಿ ಮತ್ತು ದೃಢೀಕರಣದ ಸ್ಥಿತಿ',
      docTypeDetected: 'ದಾಖಲೆಯ ವರ್ಗೀಕರಣ',
      confidence: 'ನಿಖರತೆಯ ಅಂಕ',
      witnesses: 'ಸಾಕ್ಷಿಗಳು ಮತ್ತು ದೃಢೀಕರಣ',
      keyFacts: 'ಪ್ರಮುಖ ಸತ್ಯಾಂಶಗಳು',
      firstParty: 'ಮೊದಲ ಪಕ್ಷ',
      secondParty: 'ಎರಡನೇ ಪಕ್ಷ',
      startDate: 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
      endDate: 'ಮುಕ್ತಾಯ ದಿನಾಂಕ',
      financialTerms: 'ಹಣಕಾಸಿನ ನಿಯಮಗಳು ಮತ್ತು ಮೊತ್ತ',
      primaryAmount: 'ಮುಖ್ಯ ಮೊತ್ತ',
      securityDeposit: 'ಭದ್ರತಾ ಠೇವಣಿ',
      penalties: 'ಕಡಿತ / ದಂಡ',
      executionStatus: 'ಸಹಿ ಮತ್ತು ದೃಢೀಕರಣ',
      signed: 'ಸಹಿ ಮಾಡಲಾಗಿದೆ',
      witnessCount: 'ಸಾಕ್ಷಿಗಳ ಸಂಖ್ಯೆ',
      notFound: 'ದಾಖಲೆಯಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ',
      importantClausesTitle: 'ಪ್ರಮುಖ ನಿಯಮಗಳು (ವಿಶೇಷ ಗಮನ ಬೇಕು)',
      simpleExplanation: 'ಸರಳ ವಿವರಣೆ',
      originalRef: 'ಮೂಲ ಪಠ್ಯದ ಉಲ್ಲೇಖ',
      whyItMatters: 'ಇದು ನಿಮಗೆ ಏಕೆ ಮುಖ್ಯ',
      pointsToConsider: 'ಪರಿಗಣಿಸಬೇಕಾದ ಅಂಶಗಳು',
      askAboutClause: 'ಈ ನಿಯಮದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ',
      viewAllClauses: 'ಎಲ್ಲಾ ನಿಯಮಗಳನ್ನು ವಿವರವಾಗಿ ನೋಡಿ',
      actionItemsTitle: 'ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಜವಾಬ್ದಾರಿಗಳು',
      deadlineCalcTitle: 'ದಿನಾಂಕ ಆಧಾರಿತ ಕಾನೂನು ಗಡುವು ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      triggerDateLabel: 'ನೋಟಿಸ್ / ಪ್ರಾರಂಭ ದಿನಾಂಕ:',
      calcBtn: 'ಗಡುವನ್ನು ಲೆಕ್ಕಹಾಕಿ',
      targetDeadlineLabel: 'ಅಂತಿಮ ಕಾನೂನು ಗಡುವು:',
      ocrQualityNotice: 'ದಾಖಲೆಯ ನಿಖರತೆ: ಈ ದಾಖಲೆಯನ್ನು OCR ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗಿದೆ. ಮೂಲ ಕಾಗದದೊಂದಿಗೆ ಅಂಕಿಅಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
    },
    clauses: {
      title: 'ದಾಖಲೆಯಲ್ಲಿರುವ ನಿಯಮಗಳು',
      subtitle: 'ಪ್ರತಿಯೊಂದು ನಿಯಮದ ಸರಳ ವಿವರಣೆ, ಉಲ್ಲೇಖ ಮತ್ತು ಸಲಹೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
      searchPlaceholder: 'ನಿಯಮಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ರದ್ದತಿ, ಬಾಡಿಗೆ, ನೋಟಿಸ್)...',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      plainExplanation: 'ಸರಳ ವಿವರಣೆ',
      whyItMatters: 'ಇದು ನಿಮಗೆ ಏಕೆ ಮುಖ್ಯ',
      actionToConsider: 'ಪರಿಗಣಿಸಬೇಕಾದ ಅಂಶಗಳು',
      flaggedBadge: 'ವಿಶೇಷ ಗಮನ ಬೇಕಾದ ನಿಯಮ',
      noMatch: 'ಯಾವುದೇ ನಿಯಮಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಬೇರೆ ಪದವನ್ನು ಹುಡುಕಿ ನೋಡಿ.',
      pageLabel: 'ಪುಟ',
      askAboutClause: 'ಈ ನಿಯಮದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ'
    },
    risks: {
      title: 'ಗಮನಾರ್ಹ ನಿಯಮಗಳು ಮತ್ತು ಅಪಾಯಗಳು',
      subtitle: 'ಹಣಕಾಸು ಅಥವಾ ಕಾನೂನು ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಒಳಗೊಂಡಿರುವ ಪ್ರಮುಖ ನಿಯಮಗಳು.',
      severityCritical: 'ಹೆಚ್ಚಿನ ಎಚ್ಚರಿಕೆ ಅಗತ್ಯವಿದೆ',
      severityHigh: 'ಮುಖ್ಯ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
      severityMedium: 'ಸಾಮಾನ್ಯ ವಾಣಿಜ್ಯ ಗಮನ',
      attentionNotice: 'ಈ ಸೂಚನೆಗಳು ಕೇವಲ ಗಮನ ಸೆಳೆಯಲು ಮಾತ್ರ. ಅಂತಿಮ ನಿರ್ಧಾರಕ್ಕಾಗಿ ಅರ್ಹ ವಕೀಲರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.'
    },
    obligations: {
      title: 'ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಗಡುವು ಟ್ರ್ಯಾಕರ್',
      subtitle: 'ಯಾರು, ಯಾವಾಗ, ಮತ್ತು ಯಾವ ಷರತ್ತುಗಳ ಅಡಿಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸಬೇಕು.',
      calculatorTitle: 'ದಿನಾಂಕ ಆಧಾರಿತ ಗಡುವು ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      enterEventDate: 'ಪ್ರಾರಂಭದ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ (ಉದಾ: ನೋಟಿಸ್ ತಲುಪಿದ ದಿನಾಂಕ):',
      calculateBtn: 'ಗಡುವನ್ನು ಲೆಕ್ಕಹಾಕಿ',
      deadlineLabel: 'ಅಂತಿಮ ಗಡುವು',
      statusUrgent: 'ತುರ್ತು / ಸಮಯ ಸೀಮಿತವಾಗಿದೆ',
      statusPending: 'ಸಕ್ರಿಯ ಕರ್ತವ್ಯ'
    },
    qa: {
      title: 'ದಾಖಲೆಯಿಂದ ಪ್ರಶ್ನೆ ಕೇಳಿ',
      subtitle: 'ನಿಮ್ಮ ದಾಖಲೆಯ ಆಧಾರದ ಮೇಲೆ ನೇರವಾಗಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.',
      inputPlaceholder: 'ದಾಖಲೆಯ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
      sendBtn: 'ಕೇಳಿ',
      suggestedTitle: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
      citationsTitle: 'ದಾಖಲೆಯ ಉಲ್ಲೇಖ ಮತ್ತು ಪುಟ ಸಂಖ್ಯೆ',
      generalLegalInfoNotice: 'ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿ: ಇದು ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ನಿರ್ದಿಷ್ಟ ಸಲಹೆಗಾಗಿ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      welcomeMsg: 'ನಮಸ್ಕಾರ. ನಿಮ್ಮ ದಾಖಲೆಯ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಬಹುದು. ದಾಖಲೆಯ ಆಧಾರದ ಮೇಲೆ ನಿಖರವಾದ ಉತ್ತರ ನೀಡಲಾಗುವುದು.'
    },
    comparison: {
      title: 'ದಾಖಲೆಗಳ ಹೋಲಿಕೆ',
      subtitle: 'ಎರಡು ದಾಖಲೆಗಳ ನಡುವಿನ ಜವಾಬ್ದಾರಿಗಳು, ವೆಚ್ಚಗಳು ಮತ್ತು ಅಪಾಯಗಳನ್ನು ಪಕ್ಕಪಕ್ಕದಲ್ಲಿ ಹೋಲಿಸಿ ನೋಡಿ.',
      selectDocA: 'ದಾಖಲೆ A (ಮೂಲ ದಾಖಲೆ):',
      selectDocB: 'ದಾಖಲೆ B (ಹೋಲಿಕೆ ದಾಖಲೆ):',
      categoryCol: 'ವರ್ಗ',
      differencesCol: 'ಮುಖ್ಯ ವ್ಯತ್ಯಾಸಗಳು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಪರಿಣಾಮ',
      practicalImpactCol: 'ಬದಲಾವಣೆಗಳ ಸಾರಾಂಶ',
      noDocSelected: 'ನಿಯಮಗಳನ್ನು ಹೋಲಿಸಲು ಎರಡು ದಾಖಲೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.'
    },
    legalNotice: {
      title: 'ಕಾನೂನು ನೋಟಿಸ್ ಮಾರ್ಗದರ್ಶಿ',
      subtitle: 'ಕಾನೂನು ನೋಟಿಸ್, ಆರೋಪಗಳು, ಗಡುವು ಮತ್ತು ಸಿದ್ಧತಾ ಪಟ್ಟಿಯ ವಿಶ್ಲೇಷಣೆ.',
      sampleNoticeBanner: 'ಪ್ರಸ್ತುತ ಸಾಮಾನ್ಯ ದಾಖಲೆ ವೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ. ಸೆಕ್ಷನ್ 138 ಚೆಕ್ ಬೌನ್ಸ್ ನೋಟಿಸ್ ಮಾದರಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
      loadSampleBtn: 'ಸೆಕ್ಷನ್ 138 ನೋಟಿಸ್ ಮಾದರಿ ಲೋಡ್ ಮಾಡಿ',
      basicInfo: '1. ಮೂಲಭೂತ ಮಾಹಿತಿ',
      sender: 'ಕಳುಹಿಸಿದವರು:',
      recipient: 'ಸ್ವೀಕರಿಸಿದವರು:',
      date: 'ದಿನಾಂಕ:',
      medium: 'ಮಾರ್ಗ:',
      allegationsTitle: '2. ಪ್ರಮುಖ ಆರೋಪಗಳು',
      consequencesTitle: '3. ಬೇಡಿಕೆ ಮತ್ತು ಕಾನೂನು ಪರಿಣಾಮಗಳು',
      checklistTitle: '4. ತಕ್ಷಣದ ಸಿದ್ಧತಾ ಪಟ್ಟಿ',
      downloadBtn: 'ಪ್ರಿಂಟ್ / ನೋಟಿಸ್ ಪ್ರತಿ ಉಳಿಸಿ'
    },
    lawyerBrief: {
      title: 'ದಾಖಲೆಯ ಸಾರಾಂಶ ಮತ್ತು ವಕೀಲರ ಸಿದ್ಧತಾ ಪತ್ರ',
      subtitle: 'ಅರ್ಹ ವಕೀಲರ ಭೇಟಿಗೆ ಮುನ್ನ ಸಿದ್ಧತೆಗಾಗಿ ಮುದ್ರಿಸಬಹುದಾದ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ ಪತ್ರ.',
      printBtn: 'ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ',
      factsSummary: '1. ಪ್ರಮುಖ ಸತ್ಯಾಂಶಗಳ ಸಾರಾಂಶ',
      keyDatesTitle: '2. ಪ್ರಮುಖ ದಿನಾಂಕಗಳು ಮತ್ತು ಗಡುವುಗಳು',
      concernsTitle: '3. ಪ್ರಮುಖ ಕಾಳಜಿಗಳು',
      questionsTitle: '4. ವಕೀಲರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು',
      statusExecuted: 'ದೃಢೀಕೃತ ಒಪ್ಪಂದ',
      statusDraft: 'ಕರಡು ಪ್ರತಿ'
    },
    privacy: {
      title: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
      subtitle: 'ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ವೇತನ ವಿವರಗಳ ಗೌಪ್ಯತೆ ಸಂರಕ್ಷಣೆ.',
      sensitiveFound: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳು ಪತ್ತೆಯಾಗಿವೆ',
      maskToggle: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ (Mask/Redact)',
      clearSession: 'ದಾಖಲೆ ಡೇಟಾವನ್ನು ಅಳಿಸಿ ಮತ್ತು ರೀಸೆಟ್ ಮಾಡಿ'
    },
    settings: {
      title: 'ಸೆಟ್ಟಿಂಗ್ಸ್',
      subtitle: 'ಭಾಷೆ, ಗೌಪ್ಯತೆ ಮತ್ತು ಡೇಟಾ ಸೆಟ್ಟಿಂಗ್ಸ್ ನಿರ್ವಹಿಸಿ.',
      languageTitle: 'ಭಾಷೆ',
      languageDesc: 'ವಿವರಣೆ ಮತ್ತು ಸಾರಾಂಶಕ್ಕಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      languageLabel: 'ಪ್ರದರ್ಶನ ಮತ್ತು ವಿವರಣೆಯ ಭಾಷೆ:',
      privacyTitle: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
      maskTitle: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ (Mask/Redact)',
      maskDesc: 'ವಿವರಣೆಗಳು ಮತ್ತು AI ಸಂದೇಶಗಳಲ್ಲಿ ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ಖಾತೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರೆಮಾಡುತ್ತದೆ.',
      optInTitle: 'ಮಾದರಿ ತರಬೇತಿಗಾಗಿ ನನ್ನ ದಾಖಲೆಗಳನ್ನು ಬಳಸಬೇಡಿ',
      optInDesc: 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಉಳಿಸಿಕೊಳ್ಳುವುದಿಲ್ಲ ಅಥವಾ ಮಾದರಿ ತರಬೇತಿಗೆ ಬಳಸುವುದಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ.',
      dangerTitle: 'ಡೇಟಾ ನಿರ್ವಹಣೆ',
      dangerDesc: 'ಲೋಡ್ ಮಾಡಲಾದ ದಾಖಲೆಗಳು ಮತ್ತು ಚಾಟ್ ಇತಿಹಾಸವನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿ.',
      clearBtn: 'ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಿ ಮತ್ತು ರೀಸೆಟ್ ಮಾಡಿ'
    }
  }
};

/**
 * Localized translations for specific key clauses in sample agreements
 */
const CLAUSE_TRANSLATIONS: Record<string, Record<'hi' | 'kn', { title: string; plainExplanation: string; whyItMatters: string; actionToConsider: string }>> = {
  'c-1': {
    hi: {
      title: 'अनुबंध की अवधि एवं प्रारंभ',
      plainExplanation: 'यह किराया अनुबंध 11 महीनों के लिए वैध है, जो 1 नवंबर 2024 से शुरू होकर 30 सितंबर 2025 तक रहेगा। दोनों पक्षों की सहमति से इसका नवीनीकरण किया जा सकता है।',
      whyItMatters: 'भारत में पंजीकरण अधिनियम से बचने के लिए 11 महीने के समझौते मानक हैं। सितंबर 2025 से कम से कम 60 दिन पहले नवीनीकरण की बात शुरू करनी होगी।',
      actionToConsider: 'अगस्त 2025 में नवीनीकरण पर बातचीत करने या घर खाली करने की योजना के लिए रिमाइंडर लगाएं।'
    },
    kn: {
      title: 'ಒಪ್ಪಂದದ ಅವಧಿ ಮತ್ತು ಪ್ರಾರಂಭ',
      plainExplanation: 'ಈ ಬಾಡಿಗೆ ಒಪ್ಪಂದವು 11 ತಿಂಗಳುಗಳವರೆಗೆ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ (1 ನವೆಂಬರ್ 2024 ರಿಂದ 30 ಸೆಪ್ಟೆಂಬರ್ 2025 ರವರೆಗೆ). ಪರಸ್ಪರ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ನವೀಕರಿಸಬಹುದು.',
      whyItMatters: 'ನೋಂದಣಿ ಕಾಯ್ದೆಯಿಂದ ವಿನಾಯಿತಿ ಪಡೆಯಲು 11 ತಿಂಗಳ ಒಪ್ಪಂದಗಳು ಸಾಮಾನ್ಯವಾಗಿರುತ್ತವೆ. ಸೆಪ್ಟೆಂಬರ್ 2025 ಕ್ಕಿಂತ 60 ದಿನ ಮುಂಚಿತವಾಗಿ ನವೀಕರಣದ ಬಗ್ಗೆ ಮಾತನಾಡಿ.',
      actionToConsider: 'ಆಗಸ್ಟ್ 2025 ರಲ್ಲಿ ನವೀಕರಣ ಅಥವಾ ಸ್ಥಳಾಂತರಕ್ಕೆ ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ.'
    }
  },
  'c-2': {
    hi: {
      title: 'लॉक-इन अवधि एवं नोटिस विंडो',
      plainExplanation: 'पहले 3 महीनों (नवंबर 2024 से जनवरी 2025) के दौरान आप बिना जुर्माना दिए घर खाली नहीं कर सकते। इसके बाद, खाली करने से पहले पूरे 2 महीने का लिखित नोटिस देना अनिवार्य है।',
      whyItMatters: 'यदि आप लॉक-इन अवधि में खाली करते हैं या 2 महीने का नोटिस नहीं देते हैं, तो मकान मालिक 2 महीने का किराया (₹76,000) काट सकता है।',
      actionToConsider: '31 जनवरी 2025 से पहले बाहर जाने की योजना न बनाएं। हमेशा ईमेल और लिखित पत्र के माध्यम से नोटिस दें।'
    },
    kn: {
      title: 'ಲಾಕ್-ಇನ್ ಅವಧಿ ಮತ್ತು ನೋಟಿಸ್ ನಿಯಮ',
      plainExplanation: 'ಮೊದಲ 3 ತಿಂಗಳಲ್ಲಿ (ನವೆಂಬರ್ 2024 ರಿಂದ ಜನವರಿ 2025) ದಂಡವಿಲ್ಲದೆ ಮನೆ ಖಾಲಿ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ನಂತರ 2 ತಿಂಗಳ ಲಿಖಿತ ನೋಟಿಸ್ ನೀಡಬೇಕು.',
      whyItMatters: 'ಲಾಕ್-ಇನ್ ಅವಧಿಯಲ್ಲಿ ಅಥವಾ ನೋಟಿಸ್ ಇಲ್ಲದೆ ಖಾಲಿ ಮಾಡಿದರೆ ಮಾಲೀಕರು 2 ತಿಂಗಳ ಬಾಡಿಗೆಯನ್ನು (₹76,000) ಠೇವಣಿಯಿಂದ ಕಡಿತಗೊಳಿಸಬಹುದು.',
      actionToConsider: 'ಜನವರಿ 31, 2025 ರವರೆಗೆ ಮುಂಚಿತವಾಗಿ ಹೊರಡಬೇಡಿ. ಯಾವಾಗಲೂ ಇಮೇಲ್ ಅಥವಾ ಪತ್ರದ ಮೂಲಕ ನೋಟಿಸ್ ನೀಡಿ.'
    }
  },
  'c-3': {
    hi: {
      title: 'मासिक किराया, देय तिथि एवं विलंब शुल्क',
      plainExplanation: 'किराया ₹38,000 प्रति माह है और प्रत्येक अंग्रेजी कैलेंडर महीने की 5 तारीख को या उससे पहले बैंक खाते में देय है। 5 तारीख के बाद ₹500 प्रति दिन विलंब शुल्क लगेगा।',
      whyItMatters: 'यदि आप 5 तारीख तक भुगतान नहीं करते हैं, तो भारी दैनिक जुर्माना लगेगा।',
      actionToConsider: 'अपने बैंक खाते में ऑटो-डेबिट या हर महीने की 3 तारीख का रिमाइंडर सेट करें ताकि विलंब शुल्क से बचा जा सके।'
    },
    kn: {
      title: 'ಮಾಸಿಕ ಬಾಡಿಗೆ ಮತ್ತು ದಂಡ',
      plainExplanation: 'ಬಾಡಿಗೆ ತಿಂಗಳಿಗೆ ₹38,000 ಆಗಿದ್ದು, ಪ್ರತಿ ತಿಂಗಳ 5 ನೇ ತಾರೀಖಿನೊಳಗೆ ಪಾವತಿಸಬೇಕು. 5 ನೇ ತಾರೀಖಿನ ನಂತರ ದಿನಕ್ಕೆ ₹500 ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ.',
      whyItMatters: '5 ನೇ ತಾರೀಖಿನೊಳಗೆ ಪಾವತಿಸದಿದ್ದರೆ ಹೆಚ್ಚಿನ ದಂಡ ಪಾವತಿಸಬೇಕಾಗುತ್ತದೆ.',
      actionToConsider: 'ದಂಡ ತಪ್ಪಿಸಲು ಪ್ರತಿ ತಿಂಗಳ 3 ನೇ ತಾರೀಖಿಗೆ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಆಟೋ-ಡೆಬಿಟ್ ಅಥವಾ ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ.'
    }
  },
  'c-4': {
    hi: {
      title: 'सुरक्षा जमा राशि एवं वापसी शर्तें',
      plainExplanation: 'मकान मालिक के पास ₹2,00,000 ब्याज मुक्त सुरक्षा जमा रहेगा। मकान खाली करने और चाबियां सौंपने पर यह राशि वापस की जाएगी।',
      whyItMatters: 'मकान मालिक बिना बिल दिखाए नुकसान के नाम पर कटौती कर सकता है।',
      actionToConsider: 'मकान में प्रवेश करते समय और खाली करते समय फोटो एवं वीडियो प्रमाण अवश्य रखें।'
    },
    kn: {
      title: 'ಭದ್ರತಾ ಠೇವಣಿ ಮತ್ತು ಮರುಪಾವತಿ',
      plainExplanation: 'ಮಾಲೀಕರ ಬಳಿ ₹2,00,000 ಬಡ್ಡಿ ರಹಿತ ಭದ್ರತಾ ಠೇವಣಿ ಇರುತ್ತದೆ. ಮನೆ ಖಾಲಿ ಮಾಡಿ ಕೀ ಹಸ್ತಾಂತರಿಸಿದ ನಂತರ ಇದನ್ನು ಮರುಪಾವತಿಸಲಾಗುತ್ತದೆ.',
      whyItMatters: 'ಮಾಲೀಕರು ನವೀಕರಣ ಅಥವಾ ಪೇಂಟಿಂಗ್ ಹೆಸರಿನಲ್ಲಿ ಅನಗತ್ಯ ಹಣ ಕಡಿತಗೊಳಿಸುವ ಸಾಧ್ಯತೆಯಿದೆ.',
      actionToConsider: 'ಮನೆ ಪ್ರವೇಶಿಸುವಾಗ ಮತ್ತು ಬಿಡುವಾಗ ಫೋಟೋ ಹಾಗೂ ವಿಡಿಯೋ ಪುರಾವೆಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ.'
    }
  },
  'c-5': {
    hi: {
      title: 'पेंटिंग एवं नवीनीकरण कटौती',
      plainExplanation: 'खाली करते समय सुरक्षा जमा से एक महीने का पूरा किराया (₹38,000) पेंटिंग और सफाई शुल्क के रूप में काटा जाएगा, चाहे दीवारों की स्थिति कैसी भी हो।',
      whyItMatters: 'वास्तविक खर्च के बजाय एकमुश्त पूरा किराया काटा जा रहा है, भले ही दीवारें साफ हों।',
      actionToConsider: 'मकान मालिक से कहें कि कटौती केवल वास्तविक पेंटिंग बिल या कोटेशन के आधार पर ही होनी चाहिए।'
    },
    kn: {
      title: 'ಪೇಂಟಿಂಗ್ ಮತ್ತು ನವೀಕರಣ ಶುಲ್ಕ ಕಡಿತ',
      plainExplanation: 'ಮನೆ ಬಿಡುವಾಗ ಒಂದು ತಿಂಗಳ ಪೂರ್ಣ ಬಾಡಿಗೆಯನ್ನು (₹38,000) ಪೇಂಟಿಂಗ್ ಶುಲ್ಕವಾಗಿ ಠೇವಣಿಯಿಂದ ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ.',
      whyItMatters: 'ಗೋಡೆಗಳು ಸ್ವಚ್ಛವಾಗಿದ್ದರೂ ಸಹ ಪೂರ್ಣ ತಿಂಗಳ ಬಾಡಿಗೆಯನ್ನು ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ.',
      actionToConsider: 'ನೈಜ ಪೇಂಟಿಂಗ್ ಬಿಲ್ ಆಧಾರದ ಮೇಲೆ ಮಾತ್ರ ಹಣ ಕಡಿತಗೊಳಿಸಲು ಮಾಲೀಕರೊಂದಿಗೆ ಒಪ್ಪಂದ ಮಾಡಿಕೊಳ್ಳಿ.'
    }
  },
  'c-emp-1': {
    hi: {
      title: 'परिवीक्षा एवं पद समाप्ति नोटिस अवधि (90 दिन)',
      plainExplanation: 'परिवीक्षा के बाद किसी भी पक्ष द्वारा रोजगार समाप्त करने के लिए 90 दिन (3 महीने) का लिखित नोटिस अनिवार्य है।',
      whyItMatters: '3 महीने की नोटिस अवधि बहुत लंबी है और नई नौकरी में शामिल होने में बाधा उत्पन्न कर सकती है।',
      actionToConsider: 'एचआर से नोटिस अवधि को 30 या 60 दिन करने या नोटिस वेतन समायोजन की अनुमति देने का अनुरोध करें।'
    },
    kn: {
      title: 'ಉದ್ಯೋಗ ರದ್ದತಿ ನೋಟಿಸ್ ಅವಧಿ (90 ದಿನಗಳು)',
      plainExplanation: 'ಉದ್ಯೋಗವನ್ನು ಕೊನೆಗೊಳಿಸಲು ಎರಡೂ ಕಡೆಯಿಂದ 90 ದಿನಗಳ (3 ತಿಂಗಳು) ಲಿಖಿತ ನೋಟಿಸ್ ಕಡ್ಡಾಯವಾಗಿದೆ.',
      whyItMatters: '3 ತಿಂಗಳ ನೋಟಿಸ್ ಅವಧಿಯು ತುಂಬಾ ದೀರ್ಘವಾಗಿದ್ದು ಹೊಸ ಉದ್ಯೋಗಕ್ಕೆ ಸೇರಲು ತೊಂದರೆಯಾಗಬಹುದು.',
      actionToConsider: 'ನೋಟಿಸ್ ಅವಧಿಯನ್ನು 30 ಅಥವಾ 60 ದಿನಗಳಿಗೆ ಇಳಿಸಲು ಎಚ್‌ಆರ್ ಜೊತೆ ಮಾತನಾಡಿ.'
    }
  },
  'c-emp-2': {
    hi: {
      title: 'गैर-प्रतिस्पर्धा एवं ग्राहक प्रतिबंध (12 महीने)',
      plainExplanation: 'कंपनी छोड़ने के बाद 12 महीने तक आप किसी प्रतियोगी कंपनी में काम नहीं कर सकते या ग्राहकों को आकर्षित नहीं कर सकते।',
      whyItMatters: 'भारतीय अनुबंध अधिनियम की धारा 27 के तहत रोजगार के बाद गैर-प्रतिस्पर्धा खंड आमतौर पर शून्य और अप्रवर्तनीय माने जाते हैं।',
      actionToConsider: 'वकील से परामर्श लें क्योंकि भारतीय कानून व्यापार की स्वतंत्रता की रक्षा करता है।'
    },
    kn: {
      title: 'ಸ್ಪರ್ಧೆ ಮಾಡದಿರುವ ನಿಯಮ (12 ತಿಂಗಳು)',
      plainExplanation: 'ಕಂಪನಿ ಬಿಟ್ಟ ನಂತರ 12 ತಿಂಗಳುಗಳ ಕಾಲ ಯಾವುದೇ ಸ್ಪರ್ಧಿ ಕಂಪನಿಯಲ್ಲಿ ಕೆಲಸ ಮಾಡುವಂತಿಲ್ಲ.',
      whyItMatters: 'ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 27 ರ ಅಡಿಯಲ್ಲಿ ಈ ನಿಯಮವು ಕಾನೂನಿನ ಪ್ರಕಾರ ಜಾರಿಯಾಗುವುದಿಲ್ಲ.',
      actionToConsider: 'ಭಾರತೀಯ ಕಾನೂನು ಉದ್ಯೋಗ ಮಾಡುವ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ನೀಡುವುದರಿಂದ ವಕೀಲರ ಸಲಹೆ ಪಡೆಯಿರಿ.'
    }
  },
  'c-not-1': {
    hi: {
      title: 'चेक अनादरण एवं मांग (धारा 138 एनआई एक्ट)',
      plainExplanation: '₹4,50,000 का चेक अपर्याप्त निधि के कारण बाउंस हो गया। यह नोटिस प्राप्ति के 15 दिनों के भीतर भुगतान की मांग करता है।',
      whyItMatters: 'यदि 15 दिनों में भुगतान नहीं किया गया, तो धारा 138 के तहत आपराधिक शिकायत दर्ज की जाएगी जिसमें 2 साल तक की जेल हो सकती है।',
      actionToConsider: 'प्राप्ति की तिथि से 15 दिनों के भीतर योग्य वकील के माध्यम से कानूनी जवाब अवश्य भिजवाएं।'
    },
    kn: {
      title: 'ಚೆಕ್ ಬೌನ್ಸ್ ಮತ್ತು ಬೇಡಿಕೆ (ಸೆಕ್ಷನ್ 138)',
      plainExplanation: '₹4,50,000 ಮೊತ್ತದ ಚೆಕ್ ಹಣದ ಕೊರತೆಯಿಂದ ಬೌನ್ಸ್ ಆಗಿದೆ. ನೋಟಿಸ್ ತಲುಪಿದ 15 ದಿನಗಳಲ್ಲಿ ಹಣ ಪಾವತಿಸಲು ತಿಳಿಸಲಾಗಿದೆ.',
      whyItMatters: '15 ದಿನಗಳೊಳಗೆ ಹಣ ಪಾವತಿಸದಿದ್ದರೆ 2 ವರ್ಷಗಳವರೆಗೆ ಜೈಲು ಶಿಕ್ಷೆ ವಿಧಿಸಬಹುದಾದ ಕ್ರಿಮಿನಲ್ ಪ್ರಕರಣ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.',
      actionToConsider: 'ನೋಟಿಸ್ ತಲುಪಿದ 15 ದಿನಗಳೊಳಗೆ ವಕೀಲರ ಮೂಲಕ ಕಾನೂನುಬದ್ಧ ಉತ್ತರವನ್ನು ಕಳುಹಿಸಿ.'
    }
  }
};

/**
 * Returns translated clause content if available for current language
 */
export function getLocalizedClause(
  clause: ClauseItem,
  lang: SupportedLanguage
): { title: string; plainExplanation: string; whyItMatters: string; actionToConsider: string } {
  if (lang === 'en') {
    return {
      title: clause.title,
      plainExplanation: clause.plainExplanation,
      whyItMatters: clause.whyItMatters,
      actionToConsider: clause.actionToConsider
    };
  }

  const trans = CLAUSE_TRANSLATIONS[clause.id]?.[lang];
  if (trans) {
    return trans;
  }

  return {
    title: clause.title,
    plainExplanation: clause.plainExplanation,
    whyItMatters: clause.whyItMatters,
    actionToConsider: clause.actionToConsider
  };
}
