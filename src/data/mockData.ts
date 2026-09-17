import {
  IncidentReport,
  AmbulanceUnit,
  HospitalFacility,
  DoctorProfile,
  UserHealthProfile,
  MensCycleData,
  HealthGuideArticle,
  UploadedReportSummary,
  YogaSession,
  PriorityInfo,
  TriagePriority,
  VitalsData,
  EmergencyNotification,
  CompletedEmergencyTrip,
  UserAccountCredentials
} from '../types';

export const SYSTEM_CREDENTIALS: Record<string, UserAccountCredentials> = {
  PUBLIC_USER: {
    role: 'PUBLIC_USER',
    userId: 'citizen_user',
    password: 'public123',
    name: 'Ananya Sharma',
    title: 'Registered Citizen & Reporter',
    portalName: 'Public Citizen Portal',
    badgeLabel: 'Citizen Access'
  },
  AMBULANCE_DRIVER: {
    role: 'AMBULANCE_DRIVER',
    userId: 'driver_als108',
    password: 'driver108',
    name: 'Vikram Singh',
    title: '108 ALS Paramedic Driver (AMB-04)',
    portalName: '108 Ambulance Driver Portal',
    badgeLabel: '108 Emergency EMS'
  },
  HOSPITAL_STAFF: {
    role: 'HOSPITAL_STAFF',
    userId: 'er_staff_apex',
    password: 'staff123',
    name: 'Priya Nair, RN',
    title: 'Trauma ER Intake Coordinator',
    portalName: 'Hospital ER Staff Portal',
    badgeLabel: 'Hospital Trauma Staff'
  }
};

export const PRIORITY_CONFIG: Record<TriagePriority, PriorityInfo> = {
  RED: {
    level: 'RED',
    name: 'Immediate',
    subtext: 'Life-threatening critical condition. Immediate resuscitation required.',
    targetResponseTime: 'Immediate (0 min)',
    color: '#EF4444',
    bgLight: 'bg-red-50',
    bgDark: 'bg-red-950/40',
    borderColor: 'border-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-600 text-white'
  },
  ORANGE: {
    level: 'ORANGE',
    name: 'Very Urgent',
    subtext: 'Potential threat to life or limb. High risk vitals or severe trauma.',
    targetResponseTime: '< 10 mins',
    color: '#F97316',
    bgLight: 'bg-orange-50',
    bgDark: 'bg-orange-950/40',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-600 text-white'
  },
  YELLOW: {
    level: 'YELLOW',
    name: 'Urgent',
    subtext: 'Serious injury or illness. Stable vitals but requires urgent medical care.',
    targetResponseTime: '< 60 mins',
    color: '#EAB308',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-950/40',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500 text-slate-900'
  },
  GREEN: {
    level: 'GREEN',
    name: 'Lower Priority',
    subtext: 'Minor injury or non-urgent illness. Low risk, ambulatory patient.',
    targetResponseTime: '< 120 mins',
    color: '#10B981',
    bgLight: 'bg-emerald-50',
    bgDark: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-600 text-white'
  }
};

export const INITIAL_USER_PROFILE: UserHealthProfile = {
  name: 'Ananya Sharma',
  age: 26,
  gender: 'Female',
  bloodGroup: 'O+ (Positive)',
  heightCm: 165,
  weightKg: 58,
  allergies: ['Penicillin', 'Peanuts (Mild)'],
  chronicConditions: ['Mild Asthma (Exercise-induced)'],
  medications: ['Inhaler as needed (Salbutamol)'],
  emergencyContacts: [
    {
      name: 'Rohan Sharma',
      relationship: 'Brother',
      phone: '+91 98765 43210',
      isPrimary: true
    },
    {
      name: 'Dr. Meenakshi Iyer',
      relationship: 'Family Physician',
      phone: '+91 98111 22334',
      isPrimary: false
    }
  ],
  organDonor: true,
  insurancePolicyNo: 'CARE-HLTH-8829104'
};

export const INITIAL_HOSPITALS: HospitalFacility[] = [
  {
    id: 'HOSP-01',
    name: 'Apex Regional Trauma & Super Specialty Hospital',
    tier: 'Level 1 Trauma Center',
    address: 'Sector 44, Medical Enclave, Ring Road',
    distanceKm: 2.8,
    phone: '+91 11 4900 8000',
    erBedsTotal: 28,
    erBedsAvailable: 6,
    icuBedsAvailable: 2,
    traumaTeamsActive: 4,
    departments: ['Trauma Surgery', 'Neurosurgery', 'Orthopedics', 'Cardiology', 'Burn ICU', 'Pediatric ER']
  },
  {
    id: 'HOSP-02',
    name: 'Metro Care General Hospital',
    tier: 'Super Specialty ER',
    address: 'Near Cyber Hub Junction, Phase 2',
    distanceKm: 4.2,
    phone: '+91 11 2800 1122',
    erBedsTotal: 20,
    erBedsAvailable: 8,
    icuBedsAvailable: 3,
    traumaTeamsActive: 2,
    departments: ['Emergency Medicine', 'General Surgery', 'Orthopedics', 'Internal Medicine']
  },
  {
    id: 'HOSP-03',
    name: 'St. Jude Emergency & Care Institute',
    tier: 'General Hospital & Trauma',
    address: 'Highway Express Avenue, Exit 12',
    distanceKm: 6.5,
    phone: '+91 11 3344 5566',
    erBedsTotal: 16,
    erBedsAvailable: 4,
    icuBedsAvailable: 1,
    traumaTeamsActive: 2,
    departments: ['Trauma Care', 'Cardiopulmonary ICU', 'Orthopedic ER']
  }
];

export const INITIAL_AMBULANCES: AmbulanceUnit[] = [
  {
    id: 'AMB-04',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98450 12345',
    vehicleNumber: 'DL-01-EA-4492',
    vehicleType: 'Advanced Life Support (ALS)',
    isOnline: true,
    status: 'DISPATCHED',
    currentLocationName: 'Ring Road Dispatch Hub (1.2 km away)',
    coordinates: { lat: 28.4595, lng: 77.0266 },
    baseHospital: 'Apex Regional Trauma & Super Specialty Hospital',
    equipment: ['Multi-parameter Cardiac Monitor', 'Portable Ventilator', 'AED Defibrillator', 'Suction Unit', 'Spinal Immobilization Board'],
    activeIncidentId: 'EMG-84920',
    speedKmH: 68
  },
  {
    id: 'AMB-02',
    driverName: 'Vikram Singh',
    driverPhone: '+91 98123 99887',
    vehicleNumber: 'DL-01-EA-1822',
    vehicleType: 'Basic Life Support (BLS)',
    isOnline: true,
    status: 'IDLE',
    currentLocationName: 'Cyber City Post (3.5 km away)',
    coordinates: { lat: 28.4900, lng: 77.0800 },
    baseHospital: 'Metro Care General Hospital',
    equipment: ['Oxygen Cylinders', 'Stretcher', 'Basic First Aid Kit', 'Sphygmomanometer'],
    speedKmH: 0
  },
  {
    id: 'AMB-08',
    driverName: 'Amit Verma',
    driverPhone: '+91 97766 55443',
    vehicleNumber: 'DL-01-EA-8809',
    vehicleType: 'Advanced Life Support (ALS)',
    isOnline: false,
    status: 'MAINTENANCE',
    currentLocationName: 'Central Depot',
    coordinates: { lat: 28.4200, lng: 77.0400 },
    baseHospital: 'Apex Regional Trauma',
    equipment: ['Full Resuscitation Kit', 'Pediatric Bag-Valve'],
    speedKmH: 0
  }
];

export const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'DOC-01',
    name: 'Dr. Arvind Mehta',
    specialty: 'Trauma & Emergency Surgeon',
    department: 'Trauma Surgery',
    hospitalName: 'Apex Regional Trauma Hospital',
    qualification: 'MBBS, MS (General Surgery), FACS (Trauma)',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    onDuty: true
  },
  {
    id: 'DOC-02',
    name: 'Dr. Sarah Chen',
    specialty: 'Critical Care & Emergency Medicine',
    department: 'Emergency Medicine',
    hospitalName: 'Apex Regional Trauma Hospital',
    qualification: 'MD (Emergency Medicine), FEM (Australia)',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813581-2292f7678f24?w=150&auto=format&fit=crop&q=80',
    onDuty: true
  },
  {
    id: 'DOC-03',
    name: 'Dr. Priya Sharma',
    specialty: 'Interventional Cardiologist',
    department: 'Cardiology',
    hospitalName: 'Apex Regional Trauma Hospital',
    qualification: 'MD, DM (Cardiology)',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    onDuty: false
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'EMG-84920',
    reporterName: 'Suresh Menon',
    reporterPhone: '+91 98200 45678',
    reportedAt: '12 mins ago',
    locationName: 'NH-48 Highway Flyover, near Cyber Gateway Junction',
    coordinates: { lat: 28.4725, lng: 77.0542 },
    distanceKm: 2.3,
    locationLandmark: 'Opposite Shell Fuel Station, Pillar #142',
    victimsCount: 2,
    patientAge: 29,
    patientGender: 'Male',
    accidentType: 'Motorcycle Crash',
    consciousness: 'PAIN_RESPONSIVE',
    breathing: 'LABORED',
    bleeding: 'SEVERE_ARTERIAL',
    burns: 'NONE',
    fracture: 'COMPOUND_OPEN',
    otherSymptoms: ['Severe arterial pulsatile bleeding from right lower limb', 'Possible head trauma despite helmet', 'Pale and clammy skin'],
    photoUrl: 'https://images.unsplash.com/photo-1543883441-3b7c8ec17188?w=500&auto=format&fit=crop&q=80',
    description: 'High-speed motorcycle collision with road divider. Rider thrown 5 meters. Heavy blood loss on right thigh, breathing fast and groaning.',
    priority: 'RED',
    vitals: {
      heartRate: 124,
      bloodPressureSystolic: 85,
      bloodPressureDiastolic: 55,
      spO2: 91,
      respiratoryRate: 28,
      temperature: 36.8,
      painLevel: 9
    },
    status: 'AMBULANCE_DISPATCHED',
    assignedAmbulanceId: 'AMB-04',
    assignedAmbulanceName: 'AMB-04 (Advanced Life Support)',
    ambulanceEtaMinutes: 4,
    assignedHospitalId: 'HOSP-01',
    assignedHospitalName: 'Apex Regional Trauma Hospital',
    assignedDoctorId: 'DOC-01',
    assignedDoctorName: 'Dr. Arvind Mehta',
    recommendedDepartment: 'Trauma Surgery & OT Resuscitation',
    hospitalPreArrivalStatus: 'PREPARING'
  },
  {
    id: 'EMG-84919',
    reporterName: 'Vikram Batra',
    reporterPhone: '+91 98101 22334',
    reportedAt: '18 mins ago',
    locationName: 'Industrial Area Phase 1, Sector 18 Factory Gate 4',
    coordinates: { lat: 28.4850, lng: 77.0650 },
    distanceKm: 3.8,
    locationLandmark: 'Near Precision Steel Works',
    victimsCount: 1,
    patientAge: 42,
    patientGender: 'Male',
    accidentType: 'Fire / Severe Burn',
    consciousness: 'ALERT',
    breathing: 'LABORED',
    bleeding: 'NONE',
    burns: 'SECOND_DEGREE',
    fracture: 'NONE',
    otherSymptoms: ['Extensive thermal burns on chest and both arms', 'Singed nasal hairs with smoke inhalation cough'],
    description: 'Boiler steam valve rupture. Patient sustained deep partial thickness burns across upper body with inhalational wheezing.',
    priority: 'ORANGE',
    vitals: {
      heartRate: 118,
      bloodPressureSystolic: 135,
      bloodPressureDiastolic: 88,
      spO2: 93,
      respiratoryRate: 26,
      temperature: 37.4,
      painLevel: 8
    },
    status: 'REPORTED',
    assignedAmbulanceId: 'AMB-02',
    assignedAmbulanceName: 'AMB-02 (BLS)',
    ambulanceEtaMinutes: 7,
    assignedHospitalId: 'HOSP-01',
    assignedHospitalName: 'Apex Regional Trauma Hospital',
    recommendedDepartment: 'Burn ICU & Critical Care',
    hospitalPreArrivalStatus: 'READY'
  },
  {
    id: 'EMG-84918',
    reporterName: 'Kavita Rao',
    reporterPhone: '+91 97110 33221',
    reportedAt: '28 mins ago',
    locationName: 'Crossroads Shopping Plaza, Main Entrance',
    coordinates: { lat: 28.4550, lng: 77.0320 },
    distanceKm: 4.6,
    locationLandmark: 'Near Escalator A, Ground Floor',
    victimsCount: 1,
    patientAge: 64,
    patientGender: 'Female',
    accidentType: 'Fall / Severe Trauma',
    consciousness: 'ALERT',
    breathing: 'NORMAL',
    bleeding: 'MINOR',
    burns: 'NONE',
    fracture: 'SUSPECTED_CLOSED',
    otherSymptoms: ['Severe swelling around left wrist and ankle', 'Inability to bear weight on left leg'],
    description: 'Elderly shopper slipped on wet tile. Audibly heard wrist pop. Conscious and talking clearly, minor abrasion on elbow.',
    priority: 'YELLOW',
    vitals: {
      heartRate: 88,
      bloodPressureSystolic: 135,
      bloodPressureDiastolic: 82,
      spO2: 98,
      respiratoryRate: 16,
      temperature: 37.0,
      painLevel: 6
    },
    status: 'REPORTED',
    assignedAmbulanceId: 'AMB-02',
    assignedAmbulanceName: 'AMB-02 (BLS)',
    ambulanceEtaMinutes: 9,
    assignedHospitalId: 'HOSP-02',
    assignedHospitalName: 'Metro Care General Hospital',
    recommendedDepartment: 'Orthopedics & Imaging',
    hospitalPreArrivalStatus: 'PENDING'
  },
  {
    id: 'EMG-84915',
    reporterName: 'Manish Verma',
    reporterPhone: '+91 99220 11445',
    reportedAt: '45 mins ago',
    locationName: 'Sector 29 Market Complex, Block C',
    coordinates: { lat: 28.4610, lng: 77.0510 },
    distanceKm: 5.1,
    locationLandmark: 'Opposite State Bank ATM',
    victimsCount: 1,
    patientAge: 22,
    patientGender: 'Male',
    accidentType: 'Industrial Injury',
    consciousness: 'ALERT',
    breathing: 'NORMAL',
    bleeding: 'MINOR',
    burns: 'NONE',
    fracture: 'NONE',
    otherSymptoms: ['2 cm superficial palm laceration', 'Clean wound margin from glass fragment'],
    description: 'Broke glass bottle while packing shelf. Bleeding controlled with cloth bandage. Ambulatory and alert.',
    priority: 'GREEN',
    vitals: {
      heartRate: 74,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 78,
      spO2: 99,
      respiratoryRate: 14,
      temperature: 36.7,
      painLevel: 3
    },
    status: 'REPORTED',
    assignedHospitalId: 'HOSP-02',
    assignedHospitalName: 'Metro Care General Hospital',
    recommendedDepartment: 'Minor Procedure & ER Green Bay',
    hospitalPreArrivalStatus: 'PENDING'
  }
];

export const INITIAL_NOTIFICATIONS: EmergencyNotification[] = [
  {
    id: 'NOTIF-01',
    recipientRole: 'PUBLIC_USER',
    title: 'Emergency SOS Alert Broadcasted',
    message: 'Your emergency location has been transmitted to 108 Dispatch Grid. ALS Ambulance AMB-04 assigned.',
    timestamp: 'Just now',
    isRead: false,
    priority: 'RED',
    incidentId: 'EMG-84920',
    actionScreen: 'EMERGENCY_CONFIRM'
  },
  {
    id: 'NOTIF-02',
    recipientRole: 'AMBULANCE_DRIVER',
    title: 'High-Priority Red Dispatch Assigned',
    message: 'Motorcycle crash at NH-48 Flyover (2.3 km away). ETA calculated: 4 mins. Patient status: Pain responsive.',
    timestamp: '2 mins ago',
    isRead: false,
    priority: 'RED',
    incidentId: 'EMG-84920',
    actionScreen: 'AMBULANCE_EMERGENCY_DETAILS'
  },
  {
    id: 'NOTIF-03',
    recipientRole: 'HOSPITAL_STAFF',
    title: 'Incoming Level-1 Trauma Patient (#EMG-84920)',
    message: 'ALS Ambulance AMB-04 en route with polytrauma. ETA 4 mins. Red Bay trauma team requested.',
    timestamp: '4 mins ago',
    isRead: false,
    priority: 'RED',
    incidentId: 'EMG-84920',
    actionScreen: 'HOSPITAL_PATIENT_DETAILS'
  }
];

export const INITIAL_MENS_CYCLE: MensCycleData = {
  lastPeriodStart: '2026-08-12',
  cycleLength: 28,
  periodLength: 5,
  currentPhase: 'OVULATORY',
  nextPeriodDays: 14,
  fertileWindowDays: 'Aug 23 - Aug 28 (High Chance)',
  loggedSymptomsToday: ['Mild Cramps', 'High Energy', 'Clear Skin'],
  dailyNotes: 'Drinking 2.5L water, feeling motivated.'
};

export const HEALTH_GUIDES: HealthGuideArticle[] = [
  {
    id: 'GUIDE-PCOS',
    title: 'Understanding PCOS & PCOD: Holistic Management & Science',
    category: 'PCOS_PCOD',
    summary: 'Polycystic Ovary Syndrome (PCOS) is an endocrine condition affecting hormonal balance, ovulation, and insulin sensitivity. PCOD is often an ovarian condition related to lifestyle imbalance.',
    keyPoints: [
      'Irregular or skipped menstrual periods are the most common early sign.',
      'Hyperandrogenism may lead to acne, excess hair growth (hirsutism), or hair thinning.',
      'Insulin resistance occurs in up to 70% of women with PCOS regardless of body mass.',
      'Early lifestyle adjustments drastically lower long-term metabolic and cardiovascular risks.'
    ],
    dietaryRecommendations: [
      'Low Glycemic Index (GI) carbohydrates (Quinoa, oats, whole legumes)',
      'Healthy Omega-3 fats (Flaxseeds, chia seeds, walnuts, wild salmon)',
      'Seed cycling: Pumpkin & flax seeds in follicular phase, sunflower & sesame in luteal phase',
      'Minimizing ultra-processed refined sugars and sweetened beverages'
    ],
    recommendedExercises: [
      'Strength training 3x weekly to boost insulin receptor sensitivity',
      'Low-impact steady state (LISS) walking (8,000 - 10,000 steps daily)',
      'Mindful Yin Yoga to regulate high cortisol (stress hormone)'
    ],
    warningSigns: [
      'Periods absent for > 90 consecutive days (amenorrhea)',
      'Severe sudden pelvic pain',
      'Rapid unexplained weight gain with extreme fatigue'
    ],
    disclaimer: 'This guide is for informational and educational purposes only. It is not intended to diagnose PCOS or replace clinical gynecological evaluation.'
  },
  {
    id: 'GUIDE-DIABETES',
    title: "Women's Health & Blood Sugar: Insulin Resistance & Gestational Care",
    category: 'DIABETES',
    summary: 'Hormonal fluctuations across menstrual cycles and pregnancy can significantly affect glucose tolerance and insulin sensitivity in women.',
    keyPoints: [
      'Progesterone rise in the luteal phase often causes mild physiological insulin resistance.',
      'Gestational diabetes screening is typically conducted between 24–28 weeks of pregnancy.',
      'HbA1c tests measure average blood glucose over the previous 90 days (Normal < 5.7%).',
      'Combining protein with carbohydrates blunts sharp postprandial glucose spikes.'
    ],
    dietaryRecommendations: [
      'Eat vegetables and fiber first before carbs during meals to slow gastric emptying',
      'Incorporate apple cider vinegar or lemon dressing to lower glycemic index of meals',
      'Maintain adequate magnesium (spinach, almonds, pumpkin seeds) to support insulin action',
      'Hydrate with water and herbal infusions rather than fruit juices'
    ],
    recommendedExercises: [
      '10-15 minute post-meal walk ("glucose stroll") to activate muscle GLUT4 transporters',
      'Zone 2 cardiovascular training for mitochondrial health',
      'Resistance bands and bodyweight squats'
    ],
    warningSigns: [
      'Excessive unquenchable thirst (polydipsia) and frequent urination',
      'Unexplained recurring yeast infections or slow-healing wounds',
      'Blurry vision or dizziness after eating'
    ],
    disclaimer: 'Informational only. Please review all blood glucose readings and symptoms with an endocrinologist or primary care physician.'
  }
];

export const INITIAL_REPORTS: UploadedReportSummary[] = [
  {
    id: 'REP-01',
    fileName: 'Comprehensive_Blood_Panel_2026.pdf',
    uploadDate: '2026-08-10',
    category: 'Blood Work',
    status: 'ANALYZED',
    findings: [
      'Fasting Blood Glucose: 92 mg/dL (Normal reference: 70–99)',
      'HbA1c: 5.2% (Normal non-diabetic range < 5.7%)',
      'Hemoglobin: 13.4 g/dL (Healthy iron status)',
      'TSH: 2.1 mIU/L (Euthyroid normal range)'
    ],
    extractedMetrics: {
      'Fasting Glucose': '92 mg/dL',
      'HbA1c': '5.2%',
      'Hemoglobin': '13.4 g/dL',
      'TSH': '2.1 mIU/L'
    },
    aiExplanation: 'HEALTH REPORT OVERVIEW (Informational Preview):\nYour metabolic and thyroid markers fall within standard reference intervals. Fasting glucose and HbA1c reflect optimal glycemic control. Hemoglobin indicates good oxygen-carrying capacity.'
  }
];

export const YOGA_LIBRARY: YogaSession[] = [
  {
    id: 'YOGA-01',
    title: 'Morning Awakening & Spinal Alignment',
    category: 'BEGINNER',
    durationMinutes: 15,
    difficulty: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
    youtubeVideoId: 'v7AYKMP6rOE',
    targetArea: 'Spine, Hips & Chest',
    caloriesBurnEstimate: 65,
    description: 'A gentle morning sequence designed to release nocturnal spinal stiffness, awaken diaphragmatic breath, and establish calm mental focus.',
    instructions: [
      'Find a quiet space with a non-slip mat.',
      'Begin in Easy Pose (Sukhasana), focusing on 5 deep abdominal breaths.',
      'Move through Cat-Cow tilts to synchronize breath with vertebral articulation.',
      'Extend into Child\'s Pose (Balasana) whenever resting is needed.'
    ],
    precautions: [
      'Avoid hyperextending the lumbar spine if experiencing lower back pain.',
      'Use a folded blanket under the knees for comfort on hard surfaces.'
    ],
    poses: [
      {
        sanskritName: 'Sukhasana',
        englishName: 'Easy Seated Pose',
        durationSec: 120,
        benefits: 'Calms the nervous system and lengthens the spine',
        keyTip: 'Keep shoulders relaxed away from the ears.'
      },
      {
        sanskritName: 'Marjaryasana-Bitilasana',
        englishName: 'Cat-Cow Flow',
        durationSec: 180,
        benefits: 'Articulates spinal vertebrae and relieves morning lumbar tension',
        keyTip: 'Inhale on cow pose chest lift, exhale on cat curve.'
      },
      {
        sanskritName: 'Balasana',
        englishName: 'Child Pose',
        durationSec: 180,
        benefits: 'Releases back and hip strain while promoting deep diaphragmatic breathing',
        keyTip: 'Rest forehead gently on mat and surrender chest weight.'
      }
    ]
  },
  {
    id: 'YOGA-02',
    title: 'Deep Stress Relief & Cortisol Reduction',
    category: 'STRESS_RELIEF',
    durationMinutes: 20,
    difficulty: 'All Levels',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=sTANio_2E0Q',
    youtubeVideoId: 'sTANio_2E0Q',
    targetArea: 'Nervous System, Neck & Shoulders',
    caloriesBurnEstimate: 80,
    description: 'Restorative postures and parasympathetic breathing exercises scientifically recognized for down-regulating sympathetic fight-or-flight nervous arousal.',
    instructions: [
      'Dim lighting in your room.',
      'Maintain slow 4-second inhalation and 6-second exhalation ratio.',
      'Focus on releasing jaw, brow, and trap tension.'
    ],
    precautions: [
      'Do not hold breath if dealing with hypertension or pregnancy.',
      'Move gently without rapid postural transitions.'
    ],
    poses: [
      {
        sanskritName: 'Uttanasana (Supported)',
        englishName: 'Soft Knee Forward Fold',
        durationSec: 180,
        benefits: 'Increases cranial blood flow and calms emotional agitation',
        keyTip: 'Keep knees generously bent to protect hamstrings.'
      },
      {
        sanskritName: 'Viparita Karani',
        englishName: 'Legs-Up-The-Wall Pose',
        durationSec: 300,
        benefits: 'Enhances venous drainage and stimulates vagus nerve activity',
        keyTip: 'Place a small pillow under sacrum for maximum pelvic relaxation.'
      },
      {
        sanskritName: 'Savasana with Pranayama',
        englishName: 'Corpse Pose with Box Breathing',
        durationSec: 300,
        benefits: 'Complete somatic muscular release and heart-rate recovery',
        keyTip: 'Place one hand on belly and one on chest to observe breath flow.'
      }
    ]
  },
  {
    id: 'YOGA-03',
    title: 'Post-Trauma Mobility & Joint Gentle Rehab',
    category: 'RECOVERY',
    durationMinutes: 18,
    difficulty: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=4pKly2JojMw',
    youtubeVideoId: '4pKly2JojMw',
    targetArea: 'Knees, Ankles & Pelvic Floor',
    caloriesBurnEstimate: 50,
    description: 'Low-impact therapeutic somatic movement designed to safely restore articular range of motion without loading injured joints or axial vertebrae.',
    instructions: [
      'Perform on a padded mat or sturdy chair.',
      'Stop immediately if sharp or radiating joint pain occurs.',
      'Breathe smoothly through each movement arc.'
    ],
    precautions: [
      'Contraindicated in acute unhealed fractures or active ligament tears.',
      'Always follow your orthopedic surgeon or physical therapist guidelines.'
    ],
    poses: [
      {
        sanskritName: 'Supta Padangusthasana (Strap)',
        englishName: 'Reclining Hand-to-Big-Toe with Belt',
        durationSec: 240,
        benefits: 'Gently decompresses posterior chain without axial loading',
        keyTip: 'Keep pelvis anchored flat on the floor.'
      },
      {
        sanskritName: 'Setu Bandhasana (Restorative)',
        englishName: 'Supported Bridge Pose',
        durationSec: 240,
        benefits: 'Gently opens thoracic cage and restores pelvic stability',
        keyTip: 'Place a yoga block under lower sacrum.'
      }
    ]
  }
];

export function calculateTriagePriority(
  consciousness?: string,
  breathing?: string,
  bleeding?: string,
  burns?: string,
  fracture?: string,
  vitals?: Partial<VitalsData>
): TriagePriority {
  // RED checks (Immediate)
  if (
    consciousness === 'UNRESPONSIVE' ||
    consciousness === 'PAIN_RESPONSIVE' ||
    breathing === 'SEVERE_DISTRESS' ||
    breathing === 'NONE' ||
    bleeding === 'SEVERE_ARTERIAL' ||
    burns === 'THIRD_DEGREE_EXTENSIVE' ||
    (vitals && (
      (vitals.spO2 !== undefined && vitals.spO2 < 90) ||
      (vitals.bloodPressureSystolic !== undefined && vitals.bloodPressureSystolic < 85) ||
      (vitals.heartRate !== undefined && vitals.heartRate > 135) ||
      (vitals.respiratoryRate !== undefined && vitals.respiratoryRate > 30)
    ))
  ) {
    return 'RED';
  }

  // ORANGE checks (Very Urgent)
  if (
    consciousness === 'VOICE_RESPONSIVE' ||
    breathing === 'LABORED' ||
    fracture === 'COMPOUND_OPEN' ||
    burns === 'SECOND_DEGREE' ||
    (vitals && (
      (vitals.spO2 !== undefined && vitals.spO2 <= 93) ||
      (vitals.bloodPressureSystolic !== undefined && vitals.bloodPressureSystolic < 95) ||
      (vitals.heartRate !== undefined && vitals.heartRate > 115) ||
      (vitals.painLevel !== undefined && vitals.painLevel >= 8)
    ))
  ) {
    return 'ORANGE';
  }

  // YELLOW checks (Urgent)
  if (
    bleeding === 'MINOR' ||
    fracture === 'SUSPECTED_CLOSED' ||
    burns === 'FIRST_DEGREE' ||
    (vitals && (
      (vitals.painLevel !== undefined && vitals.painLevel >= 5) ||
      (vitals.heartRate !== undefined && vitals.heartRate > 100) ||
      (vitals.temperature !== undefined && vitals.temperature > 38.5)
    ))
  ) {
    return 'YELLOW';
  }

  // Default GREEN
  return 'GREEN';
}

export function calculateTriageCategory(vitals?: VitalsData, consciousness?: string, bleeding?: string, breathing?: string): TriagePriority {
  return calculateTriagePriority(consciousness, breathing, bleeding, undefined, undefined, vitals);
}

export const SAMPLE_TRIAGE_SCENARIOS = [
  {
    id: 'SCEN-1',
    name: 'Severe Arterial Hemorrhage',
    title: 'Severe Arterial Hemorrhage & Shock',
    description: 'High velocity road crash with arterial limb wound',
    priority: 'RED' as TriagePriority,
    consciousness: 'PAIN_RESPONSIVE' as const,
    breathing: 'LABORED' as const,
    bleeding: 'SEVERE_ARTERIAL' as const,
    burns: 'NONE' as const,
    fracture: 'COMPOUND_OPEN' as const,
    vitals: {
      heartRate: 138,
      bloodPressureSystolic: 78,
      bloodPressureDiastolic: 48,
      spO2: 89,
      respiratoryRate: 32,
      temperature: 36.4,
      painLevel: 9
    }
  },
  {
    id: 'SCEN-2',
    name: 'Boiler Steam Burns',
    title: 'Second Degree Boiler Steam Burns',
    description: 'Deep partial thickness thermal burns with inhalation wheeze',
    priority: 'ORANGE' as TriagePriority,
    consciousness: 'ALERT' as const,
    breathing: 'LABORED' as const,
    bleeding: 'NONE' as const,
    burns: 'SECOND_DEGREE' as const,
    fracture: 'NONE' as const,
    vitals: {
      heartRate: 118,
      bloodPressureSystolic: 135,
      bloodPressureDiastolic: 88,
      spO2: 93,
      respiratoryRate: 26,
      temperature: 37.4,
      painLevel: 8
    }
  },
  {
    id: 'SCEN-3',
    name: 'Closed Wrist Fracture',
    title: 'Closed Wrist Fracture / Slipping',
    description: 'Elderly fall with wrist deform and stable vitals',
    priority: 'YELLOW' as TriagePriority,
    consciousness: 'ALERT' as const,
    breathing: 'NORMAL' as const,
    bleeding: 'MINOR' as const,
    burns: 'NONE' as const,
    fracture: 'SUSPECTED_CLOSED' as const,
    vitals: {
      heartRate: 88,
      bloodPressureSystolic: 125,
      bloodPressureDiastolic: 80,
      spO2: 98,
      respiratoryRate: 16,
      temperature: 37.0,
      painLevel: 6
    }
  },
  {
    id: 'SCEN-4',
    name: 'Minor Glass Abrasion',
    title: 'Minor Glass Abrasion (Ambulatory)',
    description: 'Superficial palm cut, ambulatory and talking normally',
    priority: 'GREEN' as TriagePriority,
    consciousness: 'ALERT' as const,
    breathing: 'NORMAL' as const,
    bleeding: 'MINOR' as const,
    burns: 'NONE' as const,
    fracture: 'NONE' as const,
    vitals: {
      heartRate: 72,
      bloodPressureSystolic: 118,
      bloodPressureDiastolic: 76,
      spO2: 99,
      respiratoryRate: 14,
      temperature: 36.6,
      painLevel: 2
    }
  }
];

export const SAMPLE_DRIVER_HISTORY: CompletedEmergencyTrip[] = [
  {
    id: 'EMG-81042',
    incidentDate: 'Today, 25 Aug',
    incidentTime: '05:14 AM',
    patientCount: 1,
    priority: 'RED',
    pickupLocation: 'NH-48 Rajiv Chowk Underpass, Gurugram',
    hospitalName: 'Apex Regional Trauma Hospital',
    completionStatus: 'HANDED_OVER_TO_ER',
    durationMinutes: 18,
    distanceKm: 4.8,
    chiefComplaint: 'Severe head trauma & limb fracture from vehicular collision',
    vitalsSummary: 'HR 122 bpm, BP 88/54 mmHg, SpO2 91%, GCS 9',
    paramedicNotes: 'Cervical collar and pelvic binder applied. IV normal saline bolus given en route.',
    injuryClassification: 'Possible Bone Fracture / Deformity & Laceration'
  },
  {
    id: 'EMG-80921',
    incidentDate: 'Yesterday, 24 Aug',
    incidentTime: '11:45 PM',
    patientCount: 1,
    priority: 'ORANGE',
    pickupLocation: 'Cyber City Building 10, DLF Phase 2',
    hospitalName: 'Apex Regional Trauma Hospital',
    completionStatus: 'HANDED_OVER_TO_ER',
    durationMinutes: 14,
    distanceKm: 3.2,
    chiefComplaint: 'Acute chest pain with ST changes on monitor',
    vitalsSummary: 'HR 104 bpm, BP 148/92 mmHg, SpO2 96%',
    paramedicNotes: '12-lead ECG transmitted to ER. Aspirin 325mg and Sorbitrate administered under tele-med protocol.',
    injuryClassification: 'Cardiovascular Emergency'
  },
  {
    id: 'EMG-80774',
    incidentDate: 'Yesterday, 24 Aug',
    incidentTime: '04:20 PM',
    patientCount: 2,
    priority: 'YELLOW',
    pickupLocation: 'Sohna Road, Sector 48 Intersection',
    hospitalName: 'Metro Care General Hospital',
    completionStatus: 'HANDED_OVER_TO_ER',
    durationMinutes: 22,
    distanceKm: 6.5,
    chiefComplaint: 'Two passengers with lacerations & wrist injury following auto-rickshaw overturn',
    vitalsSummary: 'Vitals stable. Hemorrhage controlled with pressure bandages.',
    paramedicNotes: 'Splinted left wrist, ambulatory transfer into ER minor OT.',
    injuryClassification: 'Open Wound & Laceration'
  },
  {
    id: 'EMG-80419',
    incidentDate: '23 Aug 2026',
    incidentTime: '02:10 PM',
    patientCount: 1,
    priority: 'GREEN',
    pickupLocation: 'Golf Course Extension Road, Sector 65',
    hospitalName: 'Fortis Memorial Emergency',
    completionStatus: 'HANDED_OVER_TO_ER',
    durationMinutes: 16,
    distanceKm: 5.1,
    chiefComplaint: 'Cyclist fall with forearm road rash and abrasions',
    vitalsSummary: 'HR 76 bpm, BP 120/80 mmHg, SpO2 99%',
    paramedicNotes: 'Wounds cleaned with saline and dressed. Patient fully conscious and oriented.',
    injuryClassification: 'Bruising & Hematoma'
  }
];

export const KOTLIN_ARCHITECTURE_CODE = `
// ============================================================================
// SMART TRIAGE - NATIVE ANDROID JETPACK COMPOSE & ARCHITECTURE BLUEPRINT
// Package: com.smarttriage.app
// Architecture: MVVM + Clean Architecture + Hilt DI + Jetpack Compose + Coroutines
// ============================================================================

package com.smarttriage.app.presentation.ambulance

import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.compose.*

enum class TriagePriority { RED, ORANGE, YELLOW, GREEN }
enum class AmbulanceStatus { IDLE, DISPATCHED, EN_ROUTE_TO_PATIENT, PATIENT_LOADED, EN_ROUTE_TO_HOSPITAL, ARRIVED_AT_HOSPITAL }
enum class PreArrivalStatus { PENDING, PREPARING, READY, ARRIVED }

@Composable
fun AmbulanceEmergencyDetailsScreen(
    emergencyId: String,
    viewModel: AmbulanceViewModel = hiltViewModel(),
    onNavigateBack: () -> Unit
) {
    val incidentState by viewModel.getIncident(emergencyId).collectAsState(initial = null)
    var showInjuryScanDialog by remember { mutableStateOf(false) }

    incidentState?.let { incident ->
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Dispatch #\${incident.id}") },
                    navigationIcon = { IconButton(onClick = onNavigateBack) { Icon(Icons.Default.ArrowBack, "Back") } }
                )
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Emergency Priority Banner
                PriorityCard(priority = incident.priority)

                // Google Map Navigation Card
                GoogleMapLocationCard(
                    coordinates = LatLng(incident.lat, incident.lng),
                    locationName = incident.locationName
                )

                // 1-Tap Field Status Progression
                AmbulanceStatusSelector(
                    currentStatus = incident.ambulanceStatus,
                    onStatusChange = { viewModel.updateStatus(incident.id, it) }
                )

                // Paramedic ML Injury Scanner Button
                Button(
                    onClick = { showInjuryScanDialog = true },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Scan Patient Injury (ML Assistant)")
                }
            }
        }
    }
}
`;

