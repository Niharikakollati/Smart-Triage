import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebLayout } from './components/common/WebLayout';
import { BottomNav } from './components/common/BottomNav';
import { EmergencySosModal } from './components/common/EmergencySosModal';
import { KotlinCodeModal } from './components/kotlinCode/KotlinCodeModal';
import { PermissionModals } from './components/common/PermissionModals';
import { Activity } from 'lucide-react';

import { HomeScreen } from './components/home/HomeScreen';
import { AccidentReportScreen } from './components/accident/AccidentReportScreen';
import { EmergencyConfirmationScreen } from './components/accident/EmergencyConfirmationScreen';
import { AmbulanceDashboard } from './components/ambulance/AmbulanceDashboard';
import { AmbulanceEmergencyDetailsScreen } from './components/ambulance/AmbulanceEmergencyDetailsScreen';
import { HospitalDashboard } from './components/hospital/HospitalDashboard';
import { HospitalPatientDetailsScreen } from './components/hospital/HospitalPatientDetailsScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { TriageScreen } from './components/triage/TriageScreen';
import { WomensHealthScreen } from './components/womensHealth/WomensHealthScreen';
import { LogSymptomsScreen } from './components/womensHealth/LogSymptomsScreen';
import { HealthGuidanceScreen } from './components/womensHealth/HealthGuidanceScreen';
import { YogaWellnessScreen } from './components/yoga/YogaWellnessScreen';
import { HealthProfileScreen } from './components/profile/HealthProfileScreen';
import { LanguageSettingsScreen } from './components/settings/LanguageSettingsScreen';
import { PrivacySafetyScreen } from './components/privacy/PrivacySafetyScreen';
import { NotificationScreen } from './components/notifications/NotificationScreen';

const MainContent: React.FC = () => {
  const { currentScreen, isAuthenticated, currentRole, notificationToast } = useApp();

  const renderScreen = () => {
    if (!isAuthenticated || currentScreen === 'LOGIN') {
      return <LoginScreen />;
    }

    // Role-isolated screen routing: User can strictly only access screens belonging to their authenticated portal
    if (currentRole === 'PUBLIC_USER') {
      switch (currentScreen) {
        case 'HOME':
          return <HomeScreen />;
        case 'REPORT_ACCIDENT':
          return <AccidentReportScreen />;
        case 'EMERGENCY_CONFIRM':
          return <EmergencyConfirmationScreen />;
        case 'TRIAGE':
          return <TriageScreen />;
        case 'WOMENS_HEALTH':
          return <WomensHealthScreen />;
        case 'WOMENS_HEALTH_LOG_SYMPTOMS':
          return <LogSymptomsScreen />;
        case 'WOMENS_HEALTH_GUIDANCE':
          return <HealthGuidanceScreen />;
        case 'YOGA':
          return <YogaWellnessScreen />;
        case 'PROFILE':
          return <HealthProfileScreen />;
        case 'LANGUAGE_SETTINGS':
          return <LanguageSettingsScreen />;
        case 'PRIVACY_SAFETY':
          return <PrivacySafetyScreen />;
        case 'NOTIFICATIONS':
          return <NotificationScreen />;
        default:
          return <HomeScreen />;
      }
    }

    if (currentRole === 'AMBULANCE_DRIVER') {
      switch (currentScreen) {
        case 'AMBULANCE_DASHBOARD':
          return <AmbulanceDashboard />;
        case 'AMBULANCE_EMERGENCY_DETAILS':
          return <AmbulanceEmergencyDetailsScreen />;
        case 'TRIAGE':
          return <TriageScreen />;
        case 'NOTIFICATIONS':
          return <NotificationScreen />;
        case 'LANGUAGE_SETTINGS':
          return <LanguageSettingsScreen />;
        default:
          return <AmbulanceDashboard />;
      }
    }

    if (currentRole === 'HOSPITAL_STAFF') {
      switch (currentScreen) {
        case 'HOSPITAL_DASHBOARD':
          return <HospitalDashboard />;
        case 'HOSPITAL_PATIENT_DETAILS':
          return <HospitalPatientDetailsScreen />;
        case 'TRIAGE':
          return <TriageScreen />;
        case 'NOTIFICATIONS':
          return <NotificationScreen />;
        case 'LANGUAGE_SETTINGS':
          return <LanguageSettingsScreen />;
        default:
          return <HospitalDashboard />;
      }
    }

    return <LoginScreen />;
  };

  const isAuthScreen = !isAuthenticated || currentScreen === 'LOGIN';

  if (isAuthScreen) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 selection:bg-red-500/30 selection:text-white relative overflow-x-hidden">
        {/* Floating Toast Notification on Login Screen */}
        {notificationToast && (
          <div className="fixed top-6 z-50 animate-bounce transition-all px-4 pointer-events-none">
            <div
              className={`px-4 py-2.5 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2 ${
                notificationToast.type === 'urgent'
                  ? 'bg-red-600 text-white border-red-400 shadow-red-600/30'
                  : notificationToast.type === 'success'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-100 border-slate-700 shadow-black/40'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>{notificationToast.message}</span>
            </div>
          </div>
        )}
        <LoginScreen />
      </main>
    );
  }

  return (
    <WebLayout>
      <div className="flex-1 flex flex-col min-h-full">
        {renderScreen()}
        <BottomNav />
      </div>
      <EmergencySosModal />
      <KotlinCodeModal />
      <PermissionModals />
    </WebLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
