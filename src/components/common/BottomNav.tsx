import React from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import {
  Home,
  AlertOctagon,
  Activity,
  Heart,
  Sparkles,
  Truck,
  Building2,
  Bell
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRole, currentScreen, setCurrentScreen, unreadNotificationsCount } = useApp();

  if (currentRole === 'PUBLIC_USER') {
    const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
      { id: 'HOME', label: 'Home', icon: <Home className="w-5 h-5" /> },
      { id: 'REPORT_ACCIDENT', label: 'Report', icon: <AlertOctagon className="w-5 h-5" /> },
      { id: 'TRIAGE', label: 'Triage', icon: <Activity className="w-5 h-5" /> },
      { id: 'WOMENS_HEALTH', label: "Women's", icon: <Heart className="w-5 h-5" /> },
      { id: 'YOGA', label: 'Yoga', icon: <Sparkles className="w-5 h-5" /> }
    ];

    return (
      <nav className="sticky bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 z-30 shrink-0">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const isReport = item.id === 'REPORT_ACCIDENT';

            if (isReport) {
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className="flex flex-col items-center group relative -mt-4"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/50 border-2 border-slate-900 group-active:scale-95 transition-transform">
                    <AlertOctagon className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-bold text-red-400 mt-0.5">Report</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-red-400 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // AMBULANCE DRIVER NAV
  if (currentRole === 'AMBULANCE_DRIVER') {
    return (
      <nav className="sticky bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2 z-30 shrink-0">
        <div className="flex items-center justify-around text-xs">
          <button
            onClick={() => setCurrentScreen('AMBULANCE_DASHBOARD')}
            className={`flex flex-col items-center gap-1 font-semibold ${
              currentScreen === 'AMBULANCE_DASHBOARD' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>Dispatches & Nav</span>
          </button>

          <button
            onClick={() => setCurrentScreen('TRIAGE')}
            className={`flex flex-col items-center gap-1 font-semibold ${
              currentScreen === 'TRIAGE' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>Field Triage</span>
          </button>

          <button
            onClick={() => setCurrentScreen('NOTIFICATIONS')}
            className={`flex flex-col items-center gap-1 font-semibold relative ${
              currentScreen === 'NOTIFICATIONS' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
            <span>Alerts</span>
          </button>
        </div>
      </nav>
    );
  }

  // HOSPITAL STAFF NAV
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2 z-30 shrink-0">
      <div className="flex items-center justify-around text-xs">
        <button
          onClick={() => setCurrentScreen('HOSPITAL_DASHBOARD')}
          className={`flex flex-col items-center gap-1 font-semibold ${
            currentScreen === 'HOSPITAL_DASHBOARD' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>ER Intake Board</span>
        </button>

        <button
          onClick={() => setCurrentScreen('TRIAGE')}
          className={`flex flex-col items-center gap-1 font-semibold ${
            currentScreen === 'TRIAGE' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span>Triage Scoring</span>
        </button>

        <button
          onClick={() => setCurrentScreen('NOTIFICATIONS')}
          className={`flex flex-col items-center gap-1 font-semibold relative ${
            currentScreen === 'NOTIFICATIONS' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
          <span>ER Telemetry Alerts</span>
        </button>
      </div>
    </nav>
  );
};
