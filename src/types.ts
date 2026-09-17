export type UserRole = 'PUBLIC_USER' | 'AMBULANCE_DRIVER' | 'HOSPITAL_STAFF';

export interface UserAccountCredentials {
  role: UserRole;
  userId: string;
  password: string;
  name: string;
  title: string;
  portalName: string;
  badgeLabel: string;
}

export interface AuthSession {
  userId: string;
  name: string;
  role: UserRole;
  title: string;
  portalName: string;
}

export type TriagePriority = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';

export interface PriorityInfo {
  level: TriagePriority;
  name: string;
  subtext: string;
  targetResponseTime: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
}

export type LanguageCode = 'en' | 'te' | 'hi';

export type AccidentType = 
  | 'Road Collision' 
  | 'Pedestrian Hit' 
  | 'Motorcycle Crash' 
  | 'Fall / Severe Trauma' 
  | 'Fire / Severe Burn' 
  | 'Industrial Injury' 
  | 'Medical Emergency' 
  | 'Other';

export type ConsciousnessStatus = 'ALERT' | 'VOICE_RESPONSIVE' | 'PAIN_RESPONSIVE' | 'UNRESPONSIVE';

export type BreathingStatus = 'NORMAL' | 'LABORED' | 'SHALLOW' | 'SEVERE_DISTRESS' | 'NONE';

export type BleedingStatus = 'NONE' | 'MINOR' | 'MODERATE' | 'SEVERE_ARTERIAL';

export type BurnStatus = 'NONE' | 'FIRST_DEGREE' | 'SECOND_DEGREE' | 'THIRD_DEGREE_EXTENSIVE';

export type FractureStatus = 'NONE' | 'SUSPECTED_CLOSED' | 'COMPOUND_OPEN';

export interface VitalsData {
  heartRate: number; // BPM (e.g. 110)
  bloodPressureSystolic: number; // mmHg (e.g. 90)
  bloodPressureDiastolic: number; // mmHg (e.g. 60)
  spO2: number; // % (e.g. 92)
  respiratoryRate: number; // breaths/min (e.g. 26)
  temperature: number; // Celsius (e.g. 37.2)
  painLevel: number; // 0 to 10
}

export type IncidentStatus = 
  | 'REPORTED' 
  | 'AMBULANCE_DISPATCHED' 
  | 'AMBULANCE_AT_SCENE' 
  | 'PATIENT_PICKED_UP' 
  | 'EN_ROUTE_TO_HOSPITAL' 
  | 'ARRIVED_AT_HOSPITAL' 
  | 'TRIAGED_IN_ER' 
  | 'RESOLVED';

export type HospitalPreArrivalStatus = 'PENDING' | 'PREPARING' | 'READY' | 'ARRIVED';

export interface IncidentReport {
  id: string; // e.g. "EMG-84920"
  reporterName: string;
  reporterPhone: string;
  reportedAt: string; // ISO string or timestamp
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
  locationLandmark?: string;
  victimsCount: number;
  patientAge?: number;
  patientGender?: 'Male' | 'Female' | 'Other' | 'Unknown';
  accidentType: AccidentType;
  consciousness: ConsciousnessStatus;
  breathing: BreathingStatus;
  bleeding: BleedingStatus;
  burns: BurnStatus;
  fracture: FractureStatus;
  otherSymptoms: string[];
  photoUrl?: string;
  description: string;
  priority: TriagePriority;
  vitals?: VitalsData;
  status: IncidentStatus;
  
  // Assigned Units
  assignedAmbulanceId?: string;
  assignedAmbulanceName?: string;
  ambulanceEtaMinutes?: number;
  assignedHospitalId?: string;
  assignedHospitalName?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  recommendedDepartment?: string;
  doctorNotes?: string;
  paramedicNotes?: string;
  paramedicTransmittedAt?: string;
  aiTriageAssessment?: string;
  
  // Hospital Pre-arrival coordination
  hospitalPreArrivalStatus?: HospitalPreArrivalStatus;
  scannedInjuryAnalysis?: InjuryAnalysisResult;
}

export interface InjuryAnalysisResult {
  id: string;
  scannedAt: string;
  detectedInjuryType: 
    | 'Burn (Thermal / Chemical)'
    | 'Open Wound & Laceration'
    | 'Visible Bleeding (Arterial / Venous)'
    | 'Bruising & Hematoma'
    | 'Swelling & Soft Tissue Edema'
    | 'Possible Bone Fracture / Deformity'
    | 'No Obvious Visible Injury';
  confidencePercentage: number;
  severityLevel: 'MILD' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
  firstAidGuidance: string[];
  warningAdvice: string;
  disclaimer: string;
  imageUrl?: string;
}

export interface CompletedEmergencyTrip {
  id: string;
  incidentDate: string;
  incidentTime: string;
  patientCount: number;
  priority: TriagePriority;
  pickupLocation: string;
  hospitalName: string;
  completionStatus: 'HANDED_OVER_TO_ER' | 'COMPLETED' | 'CANCELLED';
  durationMinutes: number;
  distanceKm: number;
  chiefComplaint: string;
  vitalsSummary: string;
  paramedicNotes: string;
  injuryClassification?: string;
}

export interface AmbulanceUnit {
  id: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)';
  isOnline: boolean;
  status: 'IDLE' | 'DISPATCHED' | 'AT_SCENE' | 'TRANSPORTING' | 'MAINTENANCE';
  currentLocationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  baseHospital: string;
  equipment: string[];
  activeIncidentId?: string;
  speedKmH?: number;
}

export interface HospitalFacility {
  id: string;
  name: string;
  tier: 'Level 1 Trauma Center' | 'Super Specialty ER' | 'General Hospital & Trauma';
  address: string;
  distanceKm: number;
  phone: string;
  erBedsTotal: number;
  erBedsAvailable: number;
  icuBedsAvailable: number;
  traumaTeamsActive: number;
  departments: string[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  department: string;
  hospitalName: string;
  qualification: string;
  avatarUrl: string;
  onDuty: boolean;
}

export interface UserHealthProfile {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
    isPrimary: boolean;
  }[];
  organDonor: boolean;
  insurancePolicyNo: string;
}

export interface SymptomLogEntry {
  id: string;
  date: string;
  symptoms: string[];
  customSymptoms?: string;
  menstrualInfo?: {
    cycleDay: number;
    phase: string;
    flowIntensity?: 'Spotting' | 'Light' | 'Moderate' | 'Heavy';
  };
  sleepHours: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Restful';
  physicalActivity: {
    activityType: string;
    durationMinutes: number;
  };
  waterIntakeLiters: number;
  notes: string;
}

export interface MensCycleData {
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLength: number; // default 28
  periodLength: number; // default 5
  currentPhase: 'MENSTRUAL' | 'FOLLICULAR' | 'OVULATORY' | 'LUTEAL';
  nextPeriodDays: number;
  fertileWindowDays: string;
  loggedSymptomsToday: string[];
  dailyNotes: string;
  historyLogs?: SymptomLogEntry[];
}

export interface HealthGuideArticle {
  id: string;
  title: string;
  category: 'PCOS_PCOD' | 'DIABETES' | 'NUTRITION' | 'EXERCISE';
  summary: string;
  keyPoints: string[];
  dietaryRecommendations: string[];
  recommendedExercises: string[];
  warningSigns: string[];
  disclaimer: string;
}

export interface UploadedReportSummary {
  id: string;
  fileName: string;
  uploadDate: string;
  category: 'Blood Work' | 'Ultrasound' | 'Thyroid Panel' | 'Glucose / HbA1c' | 'General';
  status: 'ANALYZED' | 'PENDING';
  findings: string[];
  extractedMetrics: { [key: string]: string };
  aiExplanation: string;
}

export interface YogaSession {
  id: string;
  title: string;
  category: 'BEGINNER' | 'STRESS_RELIEF' | 'FITNESS' | 'FLEXIBILITY' | 'RECOVERY';
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'All Levels';
  thumbnailUrl: string;
  youtubeUrl: string;
  youtubeVideoId?: string;
  targetArea: string;
  caloriesBurnEstimate: number;
  description: string;
  instructions: string[];
  precautions: string[];
  poses: {
    sanskritName: string;
    englishName: string;
    durationSec: number;
    benefits: string;
    keyTip: string;
  }[];
}

export interface EmergencyNotification {
  id: string;
  recipientRole: UserRole | 'ALL';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: TriagePriority | 'INFO';
  incidentId?: string;
  actionScreen?: string;
}
