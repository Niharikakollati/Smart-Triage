import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Bell, Shield, CheckCircle2, X } from 'lucide-react';

export const PermissionModals: React.FC = () => {
  const {
    isLocationPromptOpen,
    setIsLocationPromptOpen,
    locationPermission,
    setLocationPermission,
    isNotificationPromptOpen,
    setIsNotificationPromptOpen,
    notificationPermission,
    setNotificationPermission,
    showToast,
    t
  } = useApp();

  const handleGrantLocation = () => {
    setLocationPermission('granted');
    setIsLocationPromptOpen(false);
    showToast('Location permission granted for emergency dispatch.', 'success');
  };

  const handleDenyLocation = () => {
    setLocationPermission('denied');
    setIsLocationPromptOpen(false);
    showToast('Location permission denied. Sample GPS coordinates will be used.', 'info');
  };

  const handleGrantNotifications = () => {
    setNotificationPermission('granted');
    setIsNotificationPromptOpen(false);
    showToast('Emergency alert notifications enabled.', 'success');
  };

  const handleDenyNotifications = () => {
    setNotificationPermission('denied');
    setIsNotificationPromptOpen(false);
    showToast('Notifications denied. You may enable them in settings later.', 'info');
  };

  return (
    <>
      {/* 1. ANDROID LOCATION PERMISSION DIALOG */}
      {isLocationPromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xs rounded-3xl bg-slate-900 border border-slate-700 p-5 shadow-2xl space-y-4 text-center">
            {/* Android Icon Header */}
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 mx-auto flex items-center justify-center text-red-400">
              <MapPin className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white leading-tight">
                {t.locationPermissionTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.locationPermissionDesc}
              </p>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Precise GPS Coordinates</span>
              </div>
              <p className="text-[10px] text-slate-400">Used strictly during active emergency SOS & accident reports.</p>
            </div>

            {/* Android Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleGrantLocation}
                className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all active:scale-95"
              >
                While using the app (Allow)
              </button>

              <button
                type="button"
                onClick={handleDenyLocation}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold text-xs border border-slate-700 transition-colors"
              >
                Don't allow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ANDROID NOTIFICATIONS PERMISSION DIALOG */}
      {isNotificationPromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xs rounded-3xl bg-slate-900 border border-slate-700 p-5 shadow-2xl space-y-4 text-center">
            {/* Android Icon Header */}
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 mx-auto flex items-center justify-center text-blue-400">
              <Bell className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white leading-tight">
                {t.notificationPermissionTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.notificationPermissionDesc}
              </p>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Emergency Broadcasts</span>
              </div>
              <p className="text-[10px] text-slate-400">Receive instant siren alerts and incoming ambulance ETA telemetry.</p>
            </div>

            {/* Android Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleGrantNotifications}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                Allow Notifications
              </button>

              <button
                type="button"
                onClick={handleDenyNotifications}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold text-xs border border-slate-700 transition-colors"
              >
                Don't allow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
