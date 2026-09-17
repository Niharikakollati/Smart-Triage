import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  IncidentReport,
  AmbulanceUnit,
  HospitalFacility,
  DoctorProfile,
  UserHealthProfile,
  MensCycleData,
  UploadedReportSummary,
  TriagePriority,
  LanguageCode,
  EmergencyNotification,
  HospitalPreArrivalStatus,
  InjuryAnalysisResult,
  SymptomLogEntry,
  AuthSession,
  UserAccountCredentials,
  VitalsData
} from '../types';
import {
  INITIAL_INCIDENTS,
  INITIAL_AMBULANCES,
  INITIAL_HOSPITALS,
  INITIAL_USER_PROFILE,
  INITIAL_MENS_CYCLE,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  SYSTEM_CREDENTIALS
} from '../data/mockData';
import { STRINGS, AppStrings } from '../i18n/strings';

export type ScreenId = 
  | 'LOGIN'
  | 'HOME' 
  | 'REPORT_ACCIDENT' 
  | 'EMERGENCY_CONFIRM' 
  | 'TRIAGE' 
  | 'WOMENS_HEALTH' 
  | 'WOMENS_HEALTH_LOG_SYMPTOMS' 
  | 'WOMENS_HEALTH_GUIDANCE' 
  | 'YOGA' 
  | 'PROFILE' 
  | 'AMBULANCE_DASHBOARD' 
  | 'AMBULANCE_EMERGENCY_DETAILS' 
  | 'HOSPITAL_DASHBOARD' 
  | 'HOSPITAL_PATIENT_DETAILS' 
  | 'LANGUAGE_SETTINGS' 
  | 'PRIVACY_SAFETY' 
  | 'NOTIFICATIONS';

export type PermissionStatus = 'prompt' | 'granted' | 'denied';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  navigateBack: () => void;
  canGoBack: boolean;

  // Authentication & Separate Credentials
  authSession: AuthSession | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string, role?: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  switchPortalWithAuth: (role: UserRole) => void;
  
  // Language & i18n
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  t: AppStrings;

  // Permissions state
  locationPermission: PermissionStatus;
  setLocationPermission: (status: PermissionStatus) => void;
  notificationPermission: PermissionStatus;
  setNotificationPermission: (status: PermissionStatus) => void;
  isLocationPromptOpen: boolean;
  setIsLocationPromptOpen: (open: boolean) => void;
  isNotificationPromptOpen: boolean;
  setIsNotificationPromptOpen: (open: boolean) => void;
  requestLocationPermission: (onGranted?: () => void) => void;
  requestNotificationPermission: (onGranted?: () => void) => void;
  
  // Incidents state
  incidents: IncidentReport[];
  activeIncidentId: string | null;
  setActiveIncidentId: (id: string | null) => void;
  activeIncident?: IncidentReport;
  submitNewIncident: (data: Partial<IncidentReport>) => string;
  updateIncident: (id: string, updates: Partial<IncidentReport>) => void;
  triggerSosEmergency: () => string;
  
  // Ambulances state
  ambulances: AmbulanceUnit[];
  activeDriverAmbulance: AmbulanceUnit;
  toggleDriverOnlineStatus: (ambulanceId: string) => void;
  driverAcceptEmergency: (ambulanceId: string, incidentId: string) => void;
  driverRejectEmergency: (ambulanceId: string, incidentId: string) => void;
  advanceAmbulanceProgress: (ambulanceId: string) => void;
  updateScannedInjury: (incidentId: string, injuryResult: InjuryAnalysisResult) => void;
  saveAmbulancePatientDetails: (
    incidentId: string,
    updates: {
      vitals?: Partial<VitalsData>;
      consciousness?: any;
      breathing?: any;
      bleeding?: any;
      otherSymptoms?: string[];
      paramedicNotes?: string;
      priority?: TriagePriority;
      scannedInjuryAnalysis?: InjuryAnalysisResult;
    }
  ) => void;
  
  // Hospitals
  hospitals: HospitalFacility[];
  admitPatientToEr: (incidentId: string, hospitalId: string) => void;
  updatePreArrivalStatus: (incidentId: string, status: HospitalPreArrivalStatus) => void;
  
  // Women's Health & Reports & Symptoms
  userProfile: UserHealthProfile;
  updateUserProfile: (profile: Partial<UserHealthProfile>) => void;
  mensCycle: MensCycleData;
  updateMensCycle: (data: Partial<MensCycleData>) => void;
  reports: UploadedReportSummary[];
  addReport: (report: UploadedReportSummary) => void;
  latestLoggedSymptoms?: SymptomLogEntry;
  saveSymptomLog: (entry: SymptomLogEntry) => void;
  
  // Notifications
  notifications: EmergencyNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<EmergencyNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  unreadNotificationsCount: number;

  // UI & Tools
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  isKotlinCodeOpen: boolean;
  setIsKotlinCodeOpen: (open: boolean) => void;
  deviceFrame: boolean;
  setDeviceFrame: (val: boolean) => void;
  notificationToast: { message: string; type: 'urgent' | 'info' | 'success' } | null;
  showToast: (message: string, type?: 'urgent' | 'info' | 'success') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('PUBLIC_USER');
  const [currentScreen, setCurrentScreenState] = useState<ScreenId>('LOGIN');
  const [navigationHistory, setNavigationHistory] = useState<ScreenId[]>(['LOGIN']);
  
  // Localization
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const t = STRINGS[currentLanguage] || STRINGS.en;

  // Permissions
  const [locationPermission, setLocationPermission] = useState<PermissionStatus>('prompt');
  const [notificationPermission, setNotificationPermission] = useState<PermissionStatus>('prompt');
  const [isLocationPromptOpen, setIsLocationPromptOpen] = useState(false);
  const [isNotificationPromptOpen, setIsNotificationPromptOpen] = useState(false);
  const [pendingLocationCallback, setPendingLocationCallback] = useState<(() => void) | null>(null);
  const [pendingNotificationCallback, setPendingNotificationCallback] = useState<(() => void) | null>(null);

  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(INITIAL_INCIDENTS[0].id);
  const [ambulances, setAmbulances] = useState<AmbulanceUnit[]>(INITIAL_AMBULANCES);
  const [hospitals, setHospitals] = useState<HospitalFacility[]>(INITIAL_HOSPITALS);
  const [userProfile, setUserProfile] = useState<UserHealthProfile>(INITIAL_USER_PROFILE);
  const [mensCycle, setMensCycle] = useState<MensCycleData>(INITIAL_MENS_CYCLE);
  const [reports, setReports] = useState<UploadedReportSummary[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<EmergencyNotification[]>(INITIAL_NOTIFICATIONS);
  const [latestLoggedSymptoms, setLatestLoggedSymptoms] = useState<SymptomLogEntry | undefined>(undefined);

  // Authentication state - starts logged out so user lands on Login Screen first
  const [authSession, setAuthSession] = useState<AuthSession>({
    userId: '',
    name: 'Guest User',
    role: 'PUBLIC_USER',
    title: 'Portal Guest',
    portalName: 'Portal Sign-In'
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isKotlinCodeOpen, setIsKotlinCodeOpen] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState(true);
  const [notificationToast, setNotificationToast] = useState<{ message: string; type: 'urgent' | 'info' | 'success' } | null>(null);

  const showToast = (message: string, type: 'urgent' | 'info' | 'success' = 'info') => {
    setNotificationToast({ message, type });
    setTimeout(() => {
      setNotificationToast(null);
    }, 4000);
  };

  const login = (userId: string, password: string): { success: boolean; error?: string } => {
    const u = userId.trim().toLowerCase();
    const p = password.trim();

    let matched: UserAccountCredentials | null = null;

    if (
      (u === 'citizen' || u === 'citizen_user' || u === 'public' || u === 'user') &&
      (p === 'public123' || p === 'citizen123' || p === '123456')
    ) {
      matched = SYSTEM_CREDENTIALS.PUBLIC_USER;
    } else if (
      (u === 'driver' || u === 'driver108' || u === 'driver_als108' || u === 'ambulance') &&
      (p === 'driver108' || p === 'als108' || p === '123456')
    ) {
      matched = SYSTEM_CREDENTIALS.AMBULANCE_DRIVER;
    } else if (
      (u === 'er_staff' || u === 'er_staff_apex' || u === 'hospital' || u === 'staff') &&
      (p === 'staff123' || p === 'hospital789' || p === 'hospital123' || p === '123456')
    ) {
      matched = SYSTEM_CREDENTIALS.HOSPITAL_STAFF;
    } else {
      // Direct exact match against mock data
      const credEntries = Object.values(SYSTEM_CREDENTIALS);
      const exact = credEntries.find(c => 
        c.userId.trim().toLowerCase() === u && c.password.trim() === p
      );
      if (exact) {
        matched = exact;
      }
    }

    if (!matched) {
      return {
        success: false,
        error: 'Invalid username or password. Please verify your credentials.'
      };
    }

    setAuthSession({
      userId: matched.userId,
      name: matched.name,
      role: matched.role,
      title: matched.title,
      portalName: matched.portalName
    });
    setIsAuthenticated(true);
    setCurrentRoleState(matched.role);

    // Direct user to their respective portal dashboard based on login info
    if (matched.role === 'PUBLIC_USER') {
      setCurrentScreenState('HOME');
      setNavigationHistory(['HOME']);
    } else if (matched.role === 'AMBULANCE_DRIVER') {
      setCurrentScreenState('AMBULANCE_DASHBOARD');
      setNavigationHistory(['AMBULANCE_DASHBOARD']);
    } else if (matched.role === 'HOSPITAL_STAFF') {
      setCurrentScreenState('HOSPITAL_DASHBOARD');
      setNavigationHistory(['HOSPITAL_DASHBOARD']);
    }

    showToast(`Access granted: ${matched.portalName} (${matched.name})`, 'success');
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthSession({
      userId: '',
      name: 'Guest User',
      role: 'PUBLIC_USER',
      title: 'Portal Guest',
      portalName: 'Portal Sign-In'
    });
    setCurrentScreenState('LOGIN');
    setNavigationHistory(['LOGIN']);
    showToast('Logged out to Login Screen', 'info');
  };

  const switchPortalWithAuth = (role: UserRole) => {
    const cred = SYSTEM_CREDENTIALS[role];
    if (cred) {
      setAuthSession({
        userId: cred.userId,
        name: cred.name,
        role: cred.role,
        title: cred.title,
        portalName: cred.portalName
      });
      setIsAuthenticated(true);
      setCurrentRoleState(role);
      if (role === 'PUBLIC_USER') {
        setCurrentScreenState('HOME');
        setNavigationHistory(['HOME']);
      } else if (role === 'AMBULANCE_DRIVER') {
        setCurrentScreenState('AMBULANCE_DASHBOARD');
        setNavigationHistory(['AMBULANCE_DASHBOARD']);
      } else if (role === 'HOSPITAL_STAFF') {
        setCurrentScreenState('HOSPITAL_DASHBOARD');
        setNavigationHistory(['HOSPITAL_DASHBOARD']);
      }
      showToast(`Switched to ${cred.portalName} (${cred.name})`, 'info');
    }
  };

  const addNotification = (notif: Omit<EmergencyNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: EmergencyNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const requestLocationPermission = (onGranted?: () => void) => {
    if (locationPermission === 'granted') {
      if (onGranted) onGranted();
      return;
    }
    if (onGranted) setPendingLocationCallback(() => onGranted);
    setIsLocationPromptOpen(true);
  };

  const requestNotificationPermission = (onGranted?: () => void) => {
    if (notificationPermission === 'granted') {
      if (onGranted) onGranted();
      return;
    }
    if (onGranted) setPendingNotificationCallback(() => onGranted);
    setIsNotificationPromptOpen(true);
  };

  // Switch role helper that opens appropriate screen
  const setCurrentRole = (role: UserRole) => {
    if (!isAuthenticated) {
      setCurrentScreenState('LOGIN');
      return;
    }
    setCurrentRoleState(role);
    if (role === 'PUBLIC_USER') {
      setCurrentScreenState('HOME');
    } else if (role === 'AMBULANCE_DRIVER') {
      setCurrentScreenState('AMBULANCE_DASHBOARD');
    } else if (role === 'HOSPITAL_STAFF') {
      setCurrentScreenState('HOSPITAL_DASHBOARD');
    }
  };

  const setCurrentScreen = (screen: ScreenId) => {
    if (!isAuthenticated && screen !== 'LOGIN') {
      setCurrentScreenState('LOGIN');
      return;
    }
    setNavigationHistory(prev => [...prev, screen]);
    setCurrentScreenState(screen);
  };

  const navigateBack = () => {
    if (!isAuthenticated) {
      setCurrentScreenState('LOGIN');
      return;
    }
    if (navigationHistory.length > 1) {
      const newHist = [...navigationHistory];
      newHist.pop();
      const prevScreen = newHist[newHist.length - 1];
      setNavigationHistory(newHist);
      setCurrentScreenState(prevScreen);
    } else {
      if (currentRole === 'PUBLIC_USER') setCurrentScreenState('HOME');
      else if (currentRole === 'AMBULANCE_DRIVER') setCurrentScreenState('AMBULANCE_DASHBOARD');
      else if (currentRole === 'HOSPITAL_STAFF') setCurrentScreenState('HOSPITAL_DASHBOARD');
    }
  };

  const activeIncident = incidents.find(i => i.id === activeIncidentId) || incidents[0];
  const activeDriverAmbulance = ambulances[0]; // AMB-04

  const submitNewIncident = (data: Partial<IncidentReport>): string => {
    const randomId = `EMG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newIncident: IncidentReport = {
      id: randomId,
      reporterName: data.reporterName || userProfile.name,
      reporterPhone: data.reporterPhone || userProfile.emergencyContacts[0].phone,
      reportedAt: 'Just now',
      locationName: data.locationName || 'Cyber Gateway Flyover, Sector 44',
      coordinates: data.coordinates || { lat: 28.4682, lng: 77.0421 },
      distanceKm: 2.1,
      locationLandmark: data.locationLandmark || 'Near North Exit Toll',
      victimsCount: data.victimsCount || 1,
      patientAge: userProfile.age,
      patientGender: userProfile.gender as any,
      accidentType: data.accidentType || 'Road Collision',
      consciousness: data.consciousness || 'ALERT',
      breathing: data.breathing || 'NORMAL',
      bleeding: data.bleeding || 'MINOR',
      burns: data.burns || 'NONE',
      fracture: data.fracture || 'NONE',
      otherSymptoms: data.otherSymptoms || [],
      photoUrl: data.photoUrl,
      description: data.description || 'Emergency incident reported via Smart Triage Mobile App.',
      priority: data.priority || 'RED',
      vitals: data.vitals || {
        heartRate: 110,
        bloodPressureSystolic: 95,
        bloodPressureDiastolic: 65,
        spO2: 93,
        respiratoryRate: 24,
        temperature: 37.0,
        painLevel: 8
      },
      status: 'AMBULANCE_DISPATCHED',
      assignedAmbulanceId: 'AMB-04',
      assignedAmbulanceName: 'AMB-04 (Advanced Life Support)',
      ambulanceEtaMinutes: 3,
      assignedHospitalId: 'HOSP-01',
      assignedHospitalName: 'Apex Regional Trauma Hospital',
      recommendedDepartment: 'Trauma Surgery / ER Red Bay',
      hospitalPreArrivalStatus: 'PREPARING',
      aiTriageAssessment: `AUTOMATED TRIAGE ASSESSMENT (AI/ML Placeholder):\n• Priority: ${data.priority || 'RED'}\n• Emergency units dispatched.\n• Pre-hospital notifications transmitted to Apex Regional Trauma Center.`
    };

    setIncidents(prev => [newIncident, ...prev]);
    setActiveIncidentId(newIncident.id);
    
    // Update Ambulance Status
    setAmbulances(prev => prev.map(amb => {
      if (amb.id === 'AMB-04') {
        return {
          ...amb,
          status: 'DISPATCHED',
          activeIncidentId: newIncident.id,
          speedKmH: 64
        };
      }
      return amb;
    }));

    // Trigger Notification for all roles
    addNotification({
      recipientRole: 'PUBLIC_USER',
      title: `Emergency Alert Sent (#${randomId})`,
      message: 'ALS Ambulance AMB-04 dispatched to your GPS coordinates. ETA 3 mins.',
      priority: newIncident.priority,
      incidentId: randomId,
      actionScreen: 'EMERGENCY_CONFIRM'
    });

    addNotification({
      recipientRole: 'AMBULANCE_DRIVER',
      title: `New Emergency Dispatch (#${randomId})`,
      message: `Emergency reported at ${newIncident.locationName}. Priority: ${newIncident.priority}.`,
      priority: newIncident.priority,
      incidentId: randomId,
      actionScreen: 'AMBULANCE_EMERGENCY_DETAILS'
    });

    addNotification({
      recipientRole: 'HOSPITAL_STAFF',
      title: `Incoming Trauma Pre-Arrival (#${randomId})`,
      message: `ALS Ambulance AMB-04 en route with ${newIncident.priority} priority patient. ETA 3 mins.`,
      priority: newIncident.priority,
      incidentId: randomId,
      actionScreen: 'HOSPITAL_PATIENT_DETAILS'
    });

    showToast(`Emergency alert #${randomId} dispatched to ALS Ambulance AMB-04 & Apex Trauma ER`, 'urgent');
    return randomId;
  };

  const triggerSosEmergency = (): string => {
    return submitNewIncident({
      accidentType: 'Medical Emergency',
      victimsCount: 1,
      consciousness: 'ALERT',
      breathing: 'LABORED',
      bleeding: 'NONE',
      burns: 'NONE',
      fracture: 'NONE',
      priority: 'RED',
      description: 'HIGH-PRIORITY SOS TRIGGERED. Automatic GPS broadcast from citizen mobile device.',
      vitals: {
        heartRate: 128,
        bloodPressureSystolic: 90,
        bloodPressureDiastolic: 60,
        spO2: 91,
        respiratoryRate: 28,
        temperature: 37.1,
        painLevel: 9
      }
    });
  };

  const updateIncident = (id: string, updates: Partial<IncidentReport>) => {
    setIncidents(prev => prev.map(inc => (inc.id === id ? { ...inc, ...updates } : inc)));
  };

  const updateScannedInjury = (incidentId: string, injuryResult: InjuryAnalysisResult) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          scannedInjuryAnalysis: injuryResult,
          photoUrl: injuryResult.imageUrl || inc.photoUrl
        };
      }
      return inc;
    }));
    showToast(`Injury scan recorded and synchronized with ER trauma center.`, 'success');
  };

  const updatePreArrivalStatus = (incidentId: string, status: HospitalPreArrivalStatus) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, hospitalPreArrivalStatus: status };
      }
      return inc;
    }));

    if (status === 'ARRIVED') {
      admitPatientToEr(incidentId, 'HOSP-01');
    } else {
      showToast(`Hospital pre-arrival status updated to: ${status}`, 'info');
    }
  };

  const toggleDriverOnlineStatus = (ambulanceId: string) => {
    setAmbulances(prev => prev.map(amb => {
      if (amb.id === ambulanceId) {
        const nextStatus = !amb.isOnline;
        showToast(nextStatus ? 'You are now ONLINE & receiving emergency dispatches' : 'You are now OFFLINE', nextStatus ? 'success' : 'info');
        return { ...amb, isOnline: nextStatus };
      }
      return amb;
    }));
  };

  const driverAcceptEmergency = (ambulanceId: string, incidentId: string) => {
    setAmbulances(prev => prev.map(amb => {
      if (amb.id === ambulanceId) {
        return {
          ...amb,
          status: 'DISPATCHED',
          activeIncidentId: incidentId,
          speedKmH: 68
        };
      }
      return amb;
    }));

    updateIncident(incidentId, {
      status: 'AMBULANCE_DISPATCHED',
      assignedAmbulanceId: ambulanceId,
      assignedAmbulanceName: 'AMB-04 (Advanced Life Support)',
      ambulanceEtaMinutes: 4
    });

    addNotification({
      recipientRole: 'PUBLIC_USER',
      title: 'Ambulance Has Accepted Call',
      message: 'Ambulance AMB-04 is en route with active siren and GPS navigation. ETA 4 mins.',
      priority: 'RED',
      incidentId
    });

    showToast(`Accepted Emergency #${incidentId}. GPS Navigation routing initiated.`, 'success');
  };

  const driverRejectEmergency = (ambulanceId: string, incidentId: string) => {
    setAmbulances(prev => prev.map(amb => {
      if (amb.id === ambulanceId) {
        return { ...amb, activeIncidentId: undefined, status: 'IDLE' };
      }
      return amb;
    }));
    showToast(`Declined dispatch for #${incidentId}. Rerouted to nearest backup ambulance.`, 'info');
  };

  const advanceAmbulanceProgress = (ambulanceId: string) => {
    setAmbulances(prev => prev.map(amb => {
      if (amb.id === ambulanceId && amb.activeIncidentId) {
        const inc = incidents.find(i => i.id === amb.activeIncidentId);
        if (!inc) return amb;

        let nextAmbStatus = amb.status;
        let nextIncStatus = inc.status;

        if (amb.status === 'DISPATCHED') {
          nextAmbStatus = 'AT_SCENE';
          nextIncStatus = 'AMBULANCE_AT_SCENE';
          showToast(`Arrived at scene for #${inc.id}. Patient assessment underway.`, 'urgent');
          addNotification({
            recipientRole: 'PUBLIC_USER',
            title: 'Ambulance Arrived at Scene',
            message: 'Paramedics have arrived at your location and are initiating treatment.',
            priority: 'RED',
            incidentId: inc.id
          });
        } else if (amb.status === 'AT_SCENE') {
          nextAmbStatus = 'TRANSPORTING';
          nextIncStatus = 'EN_ROUTE_TO_HOSPITAL';
          showToast(`Patient secured on stretcher. En route to ${inc.assignedHospitalName || 'Apex Trauma ER'}.`, 'urgent');
          addNotification({
            recipientRole: 'HOSPITAL_STAFF',
            title: 'Ambulance Transporting to ER',
            message: `Patient from #${inc.id} secured. ETA to hospital 4 mins.`,
            priority: 'RED',
            incidentId: inc.id
          });
        } else if (amb.status === 'TRANSPORTING') {
          nextAmbStatus = 'IDLE';
          nextIncStatus = 'ARRIVED_AT_HOSPITAL';
          showToast(`Patient arrived and handed over to ER Trauma Team.`, 'success');
          updatePreArrivalStatus(inc.id, 'ARRIVED');
        }

        updateIncident(inc.id, { status: nextIncStatus });
        return {
          ...amb,
          status: nextAmbStatus,
          activeIncidentId: nextAmbStatus === 'IDLE' ? undefined : amb.activeIncidentId
        };
      }
      return amb;
    }));
  };

  const saveAmbulancePatientDetails = (
    incidentId: string,
    updates: {
      vitals?: Partial<VitalsData>;
      consciousness?: any;
      breathing?: any;
      bleeding?: any;
      otherSymptoms?: string[];
      paramedicNotes?: string;
      priority?: TriagePriority;
      scannedInjuryAnalysis?: InjuryAnalysisResult;
    }
  ) => {
    let targetPriority: TriagePriority = 'RED';

    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const mergedVitals = updates.vitals ? { ...inc.vitals, ...updates.vitals } : inc.vitals;
        targetPriority = updates.priority || inc.priority;
        return {
          ...inc,
          consciousness: updates.consciousness || inc.consciousness,
          breathing: updates.breathing || inc.breathing,
          bleeding: updates.bleeding || inc.bleeding,
          otherSymptoms: updates.otherSymptoms || inc.otherSymptoms,
          paramedicNotes: updates.paramedicNotes !== undefined ? updates.paramedicNotes : inc.paramedicNotes,
          paramedicTransmittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          vitals: mergedVitals,
          priority: targetPriority,
          scannedInjuryAnalysis: updates.scannedInjuryAnalysis || inc.scannedInjuryAnalysis
        };
      }
      return inc;
    }));

    // Trigger explicit notification to Hospital ER Staff
    const vitalsDesc = updates.vitals
      ? `HR ${updates.vitals.heartRate ?? 110} bpm, SpO2 ${updates.vitals.spO2 ?? 94}%, BP ${updates.vitals.bloodPressureSystolic ?? 110}/${updates.vitals.bloodPressureDiastolic ?? 70}`
      : 'Live telemetry synchronized';

    addNotification({
      recipientRole: 'HOSPITAL_STAFF',
      title: `🚨 Paramedic Updated Patient Details (#${incidentId})`,
      message: `Ambulance AMB-04 saved patient details (${vitalsDesc}). AVPU: ${updates.consciousness || 'ALERT'}. Click to view full patient details.`,
      priority: targetPriority,
      incidentId,
      actionScreen: 'HOSPITAL_PATIENT_DETAILS'
    });

    showToast(`Patient details saved and transmitted to Hospital ER Staff! Notification sent.`, 'urgent');
  };

  const admitPatientToEr = (incidentId: string, hospitalId: string) => {
    updateIncident(incidentId, { status: 'TRIAGED_IN_ER', hospitalPreArrivalStatus: 'ARRIVED' });
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId && h.erBedsAvailable > 0) {
        return { ...h, erBedsAvailable: h.erBedsAvailable - 1 };
      }
      return h;
    }));
    showToast(`Patient #${incidentId} admitted to ER Resuscitation Bay.`, 'success');
  };

  const updateUserProfile = (profile: Partial<UserHealthProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    showToast('Health profile updated successfully', 'success');
  };

  const updateMensCycle = (data: Partial<MensCycleData>) => {
    setMensCycle(prev => ({ ...prev, ...data }));
  };

  const saveSymptomLog = (entry: SymptomLogEntry) => {
    setLatestLoggedSymptoms(entry);
    setMensCycle(prev => ({
      ...prev,
      loggedSymptomsToday: entry.symptoms,
      dailyNotes: entry.notes,
      historyLogs: [entry, ...(prev.historyLogs || [])]
    }));
    showToast("Today's symptoms logged. Generating health guidance...", 'success');
  };

  const addReport = (report: UploadedReportSummary) => {
    setReports(prev => [report, ...prev]);
    showToast(`Report '${report.fileName}' uploaded and summarized.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentScreen,
        setCurrentScreen,
        navigateBack,
        canGoBack: navigationHistory.length > 1,
        authSession,
        isAuthenticated,
        login,
        logout,
        switchPortalWithAuth,
        currentLanguage,
        setCurrentLanguage,
        t,
        locationPermission,
        setLocationPermission,
        notificationPermission,
        setNotificationPermission,
        isLocationPromptOpen,
        setIsLocationPromptOpen,
        isNotificationPromptOpen,
        setIsNotificationPromptOpen,
        requestLocationPermission,
        requestNotificationPermission,
        incidents,
        activeIncidentId,
        setActiveIncidentId,
        activeIncident,
        submitNewIncident,
        updateIncident,
        triggerSosEmergency,
        ambulances,
        activeDriverAmbulance,
        toggleDriverOnlineStatus,
        driverAcceptEmergency,
        driverRejectEmergency,
        advanceAmbulanceProgress,
        updateScannedInjury,
        saveAmbulancePatientDetails,
        hospitals,
        admitPatientToEr,
        updatePreArrivalStatus,
        userProfile,
        updateUserProfile,
        mensCycle,
        updateMensCycle,
        reports,
        addReport,
        latestLoggedSymptoms,
        saveSymptomLog,
        notifications,
        markNotificationAsRead,
        addNotification,
        unreadNotificationsCount,
        isSosModalOpen,
        setIsSosModalOpen,
        isKotlinCodeOpen,
        setIsKotlinCodeOpen,
        deviceFrame,
        setDeviceFrame,
        notificationToast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
