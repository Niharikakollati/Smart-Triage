import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Truck,
  Building2,
  User,
  ExternalLink
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { TriagePriority } from '../../types';

export const NotificationScreen: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    setCurrentScreen,
    setActiveIncidentId,
    navigateBack,
    t
  } = useApp();

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.incidentId) {
      setActiveIncidentId(notif.incidentId);
    }
    if (notif.actionScreen) {
      setCurrentScreen(notif.actionScreen as any);
    }
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-4 animate-fadeIn">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={navigateBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
            Alerts & Dispatches
          </span>
          <h1 className="text-sm font-bold text-white">
            {t.notifications}
          </h1>
        </div>

        <div className="w-9" />
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">No active notifications</p>
            <p className="text-xs text-slate-400">All emergency notifications will appear here in real-time.</p>
          </div>
        ) : (
          notifications.map((notif) => {
            return (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`rounded-3xl p-4 border transition-all cursor-pointer shadow-lg space-y-2 relative overflow-hidden ${
                  !notif.isRead
                    ? 'bg-slate-900 border-red-500/60 ring-1 ring-red-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      notif.recipientRole === 'AMBULANCE_DRIVER'
                        ? 'bg-amber-500/20 text-amber-400'
                        : notif.recipientRole === 'HOSPITAL_STAFF'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {notif.recipientRole === 'AMBULANCE_DRIVER' ? (
                        <Truck className="w-4 h-4" />
                      ) : notif.recipientRole === 'HOSPITAL_STAFF' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        Recipient: <strong className="text-slate-300">{notif.recipientRole.replace(/_/g, ' ')}</strong> • {notif.timestamp}
                      </span>
                    </div>
                  </div>

                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>

                <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
                  {notif.message}
                </p>

                {notif.incidentId && (
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="font-mono text-amber-400 font-semibold">Incident #{notif.incidentId}</span>
                    <span className="text-blue-400 font-bold hover:underline">Tap to view full record →</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
