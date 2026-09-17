import React from 'react';
import { Truck, AlertOctagon, Map, History, User } from 'lucide-react';

export type AmbulanceTab = 'HOME' | 'EMERGENCIES' | 'MAP' | 'HISTORY' | 'PROFILE';

interface AmbulanceDriverNavProps {
  activeTab: AmbulanceTab;
  onSelectTab: (tab: AmbulanceTab) => void;
  hasActiveEmergency: boolean;
  emergencyCount: number;
}

export const AmbulanceDriverNav: React.FC<AmbulanceDriverNavProps> = ({
  activeTab,
  onSelectTab,
  hasActiveEmergency,
  emergencyCount
}) => {
  const tabs: { id: AmbulanceTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'HOME',
      label: 'Home',
      icon: <Truck className="w-4 h-4" />
    },
    {
      id: 'EMERGENCIES',
      label: 'Alerts',
      icon: <AlertOctagon className="w-4 h-4" />,
      badge: emergencyCount > 0 ? `${emergencyCount}` : undefined
    },
    {
      id: 'MAP',
      label: 'Map',
      icon: <Map className="w-4 h-4" />
    },
    {
      id: 'HISTORY',
      label: 'History',
      icon: <History className="w-4 h-4" />
    },
    {
      id: 'PROFILE',
      label: 'Profile',
      icon: <User className="w-4 h-4" />
    }
  ];

  return (
    <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 px-2 py-2 mb-3">
      <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all relative ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80 font-semibold'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
