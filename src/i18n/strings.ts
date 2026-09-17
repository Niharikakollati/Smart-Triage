import { LanguageCode } from '../types';

export interface AppStrings {
  appName: string;
  emergencySos: string;
  reportAccident: string;
  healthProfile: string;
  womensHealth: string;
  yogaWellness: string;
  emergencyContacts: string;
  needUrgentHelp: string;
  sosBroadcastSubtitle: string;
  activeDispatch: string;
  ambulanceDashboard: string;
  hospitalDashboard: string;
  doctorDashboard: string;
  triageCalculator: string;
  locationPermissionTitle: string;
  locationPermissionDesc: string;
  notificationPermissionTitle: string;
  notificationPermissionDesc: string;
  allow: string;
  deny: string;
  openGoogleMaps: string;
  scanPatientInjury: string;
  injuryAnalysis: string;
  aiPreliminaryNotice: string;
  logSymptoms: string;
  todaysHealthGuidance: string;
  patientQueue: string;
  preArrivalInfo: string;
  preparing: string;
  ready: string;
  patientArrived: string;
  privacySafety: string;
  languageSettings: string;
  selectLanguage: string;
  notifications: string;
  priorityImmediate: string;
  priorityVeryUrgent: string;
  priorityUrgent: string;
  priorityLower: string;
  allPriorities: string;
  disclaimerMedical: string;
  watchOnYoutube: string;
  save: string;
  back: string;
  cancel: string;
}

export const STRINGS: Record<LanguageCode, AppStrings> = {
  en: {
    appName: 'Smart Triage',
    emergencySos: 'Emergency SOS',
    reportAccident: 'Report Accident',
    healthProfile: 'Health Profile',
    womensHealth: "Women's Health",
    yogaWellness: 'Yoga & Wellness',
    emergencyContacts: 'Emergency Contacts',
    needUrgentHelp: 'Need Urgent Help?',
    sosBroadcastSubtitle: 'Tap to auto-broadcast your GPS coords to 108 ALS Ambulance & ER trauma center.',
    activeDispatch: 'Active Dispatch',
    ambulanceDashboard: 'Ambulance Driver',
    hospitalDashboard: 'Hospital ER',
    doctorDashboard: 'Doctor Cockpit',
    triageCalculator: 'Triage Assessment',
    locationPermissionTitle: 'Allow Location Access',
    locationPermissionDesc: 'Location is required to send your exact emergency location to nearby 108 ambulances and hospital trauma units.',
    notificationPermissionTitle: 'Enable Emergency Notifications',
    notificationPermissionDesc: 'Notifications are required to receive real-time ambulance ETA updates, hospital bed reservation status, and critical alerts.',
    allow: 'Allow',
    deny: 'Deny',
    openGoogleMaps: 'Open in Google Maps',
    scanPatientInjury: 'SCAN PATIENT INJURY',
    injuryAnalysis: 'Injury Analysis (Preliminary)',
    aiPreliminaryNotice: 'AI-assisted preliminary assessment. Not a definitive medical diagnosis.',
    logSymptoms: "Log Today's Symptoms",
    todaysHealthGuidance: "Today's Health Guidance",
    patientQueue: 'Emergency Patient Queue',
    preArrivalInfo: 'Pre-Arrival Information',
    preparing: 'Preparing',
    ready: 'Ready',
    patientArrived: 'Patient Arrived',
    privacySafety: 'Privacy & Safety',
    languageSettings: 'Language Settings',
    selectLanguage: 'Select Application Language',
    notifications: 'Notifications',
    priorityImmediate: 'RED - IMMEDIATE',
    priorityVeryUrgent: 'ORANGE - VERY URGENT',
    priorityUrgent: 'YELLOW - URGENT',
    priorityLower: 'GREEN - LOWER PRIORITY',
    allPriorities: 'ALL PATIENTS',
    disclaimerMedical: 'Smart Triage is an emergency coordination and decision-support prototype. In life-threatening situations, dial 108 or 112 directly.',
    watchOnYoutube: 'Watch on YouTube',
    save: 'Save',
    back: 'Back',
    cancel: 'Cancel'
  },
  te: {
    appName: 'స్మార్ట్ ట్రయాజ్',
    emergencySos: 'ఎమర్జెన్సీ SOS',
    reportAccident: 'ప్రమాదాన్ని నివేదించండి',
    healthProfile: 'ఆరోగ్య ప్రొఫైల్',
    womensHealth: 'మహిళల ఆరోగ్యం',
    yogaWellness: 'యోగా & సంక్షేమం',
    emergencyContacts: 'అత్యవసర పరిచయాలు',
    needUrgentHelp: 'తక్షణ సహాయం కావాలా?',
    sosBroadcastSubtitle: '108 అంబులెన్స్ మరియు అత్యవసర విభాగానికి మీ GPS స్థానాన్ని ప్రసారం చేయడానికి నొక్కండి.',
    activeDispatch: 'యాక్టివ్ డిస్పాచ్',
    ambulanceDashboard: 'అంబులెన్స్ డ్రైవర్',
    hospitalDashboard: 'హాస్పిటల్ ER',
    doctorDashboard: 'డాక్టర్ కాక్‌పిట్',
    triageCalculator: 'ట్రయాజ్ గణన',
    locationPermissionTitle: 'స్థాన అనుమతి అవసరం',
    locationPermissionDesc: 'సమీపంలోని 108 అంబులెన్స్‌లు మరియు ఆసుపత్రి అత్యవసర కేంద్రాలకు మీ ఖచ్చితమైన స్థానాన్ని పంపడానికి స్థానం అవసరం.',
    notificationPermissionTitle: 'నోటిఫికేషన్‌లను ప్రారంభించండి',
    notificationPermissionDesc: 'అంబులెన్స్ రాక మరియు ఆసుపత్రి అప్‌డేట్‌లను పొందడానికి నోటిఫికేషన్‌లు అవసరం.',
    allow: 'అనుమతించు',
    deny: 'తిరస్కరించు',
    openGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
    scanPatientInjury: 'రోగి గాయాన్ని స్కాన్ చేయండి',
    injuryAnalysis: 'గాయ విశ్లేషణ (ప్రాథమిక)',
    aiPreliminaryNotice: 'AI-సహాయక ప్రాథమిక అంచనా. ఇది ఖచ్చితమైన వైద్య నిర్ధారణ కాదు.',
    logSymptoms: 'ఈనాటి లక్షణాలను నమోదు చేయండి',
    todaysHealthGuidance: 'ఈనాటి ఆరోగ్య మార్గదర్శకత్వం',
    patientQueue: 'ఎమర్జెన్సీ పేషెంట్ క్యూ',
    preArrivalInfo: 'రాకముందు సమాచారం',
    preparing: 'సిద్ధమవుతోంది',
    ready: 'సిద్ధంగా ఉంది',
    patientArrived: 'రోగి వచ్చారు',
    privacySafety: 'గోప్యత & భద్రత',
    languageSettings: 'భాష సెట్టింగ్‌లు',
    selectLanguage: 'అనువర్తన భాషను ఎంచుకోండి',
    notifications: 'నోటిఫికేషన్‌లు',
    priorityImmediate: 'ఎరుపు - తక్షణ (RED)',
    priorityVeryUrgent: 'నారింజ - అత్యవసరం (ORANGE)',
    priorityUrgent: 'పసుపు - అర్జెంట్ (YELLOW)',
    priorityLower: 'ఆకుపచ్చ - తక్కువ ప్రాధాన్యత (GREEN)',
    allPriorities: 'అన్ని రికార్డులు',
    disclaimerMedical: 'స్మార్ట్ ట్రయాజ్ అత్యవసర సమన్వయ సాధనం. క్లిష్ట పరిస్థితుల్లో 108 లేదా 112 కు నేరుగా కాల్ చేయండి.',
    watchOnYoutube: 'యూట్యూబ్‌లో చూడండి',
    save: 'సేవ్ చేయండి',
    back: 'వెనుకకు',
    cancel: 'రద్దు చేయండి'
  },
  hi: {
    appName: 'स्मार्ट ट्रायज',
    emergencySos: 'इमरजेंसी एसओएस (SOS)',
    reportAccident: 'दुर्घटना की सूचना दें',
    healthProfile: 'स्वास्थ्य प्रोफ़ाइल',
    womensHealth: 'महिला स्वास्थ्य',
    yogaWellness: 'योग एवं कल्याण',
    emergencyContacts: 'आपातकालीन संपर्क',
    needUrgentHelp: 'क्या तत्काल सहायता चाहिए?',
    sosBroadcastSubtitle: '108 एम्बुलेंस और अस्पताल ट्रॉमा सेंटर को अपना जीपीएस लोकेशन भेजने के लिए टैप करें।',
    activeDispatch: 'सक्रिय डिस्पैच',
    ambulanceDashboard: 'एम्बुलेंस चालक',
    hospitalDashboard: 'अस्पताल इमरजेंसी',
    doctorDashboard: 'डॉक्टर कॉकपिट',
    triageCalculator: 'ट्रायज मूल्यांकन',
    locationPermissionTitle: 'स्थान (लोकेशन) अनुमति दें',
    locationPermissionDesc: 'निकटतम 108 एम्बुलेंस और अस्पताल ट्रॉमा यूनिट को आपका सटीक स्थान भेजने के लिए लोकेशन की आवश्यकता है।',
    notificationPermissionTitle: 'आपातकालीन सूचनाएं सक्षम करें',
    notificationPermissionDesc: 'एम्बुलेंस ईटीए और अस्पताल बेड बुकिंग अपडेट प्राप्त करने के लिए नोटिफिकेशन आवश्यक हैं।',
    allow: 'अनुमति दें',
    deny: 'अस्वीकार करें',
    openGoogleMaps: 'गूगल मैप्स में खोलें',
    scanPatientInjury: 'मरीज़ की चोट स्कैन करें',
    injuryAnalysis: 'चोट विश्लेषण (प्रारंभिक)',
    aiPreliminaryNotice: 'एआई-सहायक प्रारंभिक मूल्यांकन। यह कोई अंतिम चिकित्सकीय निदान नहीं है।',
    logSymptoms: 'आज के लक्षण दर्ज करें',
    todaysHealthGuidance: 'आज का स्वास्थ्य मार्गदर्शन',
    patientQueue: 'इमरजेंसी मरीज़ कतार',
    preArrivalInfo: 'आगमन पूर्व जानकारी',
    preparing: 'तैयारी जारी',
    ready: 'तैयार है',
    patientArrived: 'मरीज़ पहुँच गया',
    privacySafety: 'गोपनीयता एवं सुरक्षा',
    languageSettings: 'भाषा सेटिंग्स',
    selectLanguage: 'एप्लिकेशन भाषा चुनें',
    notifications: 'सूचनाएं',
    priorityImmediate: 'लाल - अति गंभीर (RED)',
    priorityVeryUrgent: 'नारंगी - अत्यंत आवश्यक (ORANGE)',
    priorityUrgent: 'पीला - जरूरी (YELLOW)',
    priorityLower: 'हरा - सामान्य (GREEN)',
    allPriorities: 'सभी मरीज़',
    disclaimerMedical: 'स्मार्ट ट्रायज एक आपातकालीन समन्वय प्रणाली है। जीवन रक्षक स्थितियों में 108 या 112 पर तुरंत कॉल करें।',
    watchOnYoutube: 'यूट्यूब पर देखें',
    save: 'सुरक्षित करें',
    back: 'वापस जाएं',
    cancel: 'रद्द करें'
  }
};
