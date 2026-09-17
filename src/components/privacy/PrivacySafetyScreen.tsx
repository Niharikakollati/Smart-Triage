import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  Shield,
  MapPin,
  Bell,
  Sparkles,
  PhoneCall,
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const PrivacySafetyScreen: React.FC = () => {
  const { navigateBack, locationPermission, notificationPermission, requestLocationPermission, requestNotificationPermission, t } = useApp();

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
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
            Security & Trust
          </span>
          <h1 className="text-sm font-bold text-white">
            {t.privacySafety}
          </h1>
        </div>

        <div className="w-9" />
      </div>

      {/* EMERGENCY HELPLINE NOTICE */}
      <div className="rounded-3xl bg-red-950/40 border-2 border-red-500/60 p-4 space-y-2 shadow-xl">
        <div className="flex items-center gap-2 text-red-400">
          <PhoneCall className="w-5 h-5" />
          <h2 className="text-xs font-black uppercase tracking-wider">
            Critical Emergency Notice
          </h2>
        </div>
        <p className="text-xs text-red-200 leading-relaxed">
          Smart Triage is an auxiliary mobile emergency-response prototype. In active life-threatening situations, dial national emergency helplines directly:
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="tel:108"
            className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-red-900/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>108 Ambulance</span>
          </a>
          <a
            href="tel:112"
            className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center border border-slate-700 flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>112 Unified SOS</span>
          </a>
        </div>
      </div>

      {/* PERMISSIONS & PRIVACY SAFEGUARDS */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg text-xs">
        <div className="flex items-center gap-2 text-white">
          <Shield className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Device Permissions & Data Usage
          </h2>
        </div>

        {/* Location Permission Item */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Location (ACCESS_FINE_LOCATION)</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              locationPermission === 'granted'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'bg-slate-900 text-slate-400'
            }`}>
              {locationPermission.toUpperCase()}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Your GPS coordinates are accessed exclusively during active emergency SOS triggers or accident reporting to route the closest 108 Advanced Life Support ambulance and hospital trauma team.
          </p>
          {locationPermission !== 'granted' && (
            <button
              type="button"
              onClick={() => requestLocationPermission()}
              className="mt-1 text-[11px] font-bold text-red-400 hover:underline block"
            >
              Configure Location Access →
            </button>
          )}
        </div>

        {/* Notifications Permission Item */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Bell className="w-4 h-4 text-blue-400" />
              <span>Notifications (POST_NOTIFICATIONS)</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              notificationPermission === 'granted'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'bg-slate-900 text-slate-400'
            }`}>
              {notificationPermission.toUpperCase()}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Used to send high-priority siren push alerts, ambulance dispatch status, and hospital bed reservation telemetry in real time.
          </p>
          {notificationPermission !== 'granted' && (
            <button
              type="button"
              onClick={() => requestNotificationPermission()}
              className="mt-1 text-[11px] font-bold text-blue-400 hover:underline block"
            >
              Enable Push Notifications →
            </button>
          )}
        </div>
      </div>

      {/* AI DISCLAIMER NOTICE */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-2.5 shadow-lg text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Sparkles className="w-4 h-4" />
          <h2 className="uppercase tracking-wider text-xs">
            Preliminary AI Classification Policy
          </h2>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          The injury classification and triage calculators provided in this app are designed as pre-hospital decision support tools. They do NOT replace formal medical examinations, diagnostic X-rays, or clinical decisions made by licensed medical practitioners.
        </p>
      </div>

      {/* DATA ENCRYPTION & PRIVACY */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 flex items-center gap-3 text-xs">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-slate-400 text-[11px]">
          All health records, symptom logs, and emergency transmissions are handled locally with end-to-end sandbox privacy protection.
        </p>
      </div>
    </div>
  );
};
