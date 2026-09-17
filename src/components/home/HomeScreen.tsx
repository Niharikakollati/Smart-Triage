import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  AlertOctagon,
  Heart,
  Sparkles,
  PhoneCall,
  User,
  MapPin,
  Ambulance,
  Activity,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Info,
  Globe,
  Bell,
  Lock,
  Plus,
  LogOut,
  Radio
} from 'lucide-react';
import { PriorityBadge } from '../common/PriorityBadge';

export const HomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setIsSosModalOpen,
    userProfile,
    activeIncident,
    locationPermission,
    requestLocationPermission,
    triggerSosEmergency,
    unreadNotificationsCount,
    logout,
    t
  } = useApp();

  const emergencyHelplines = [
    { name: '108 National Ambulance', number: '108', desc: 'Free ALS/BLS Emergency Dispatch', color: 'border-red-500/40 bg-red-950/20 text-red-400' },
    { name: '112 Unified Emergency', number: '112', desc: 'Police, Fire & Disaster Response', color: 'border-blue-500/40 bg-blue-950/20 text-blue-400' },
    { name: '102 Women & Child ER', number: '102', desc: 'Maternity & Pediatric Transport', color: 'border-pink-500/40 bg-pink-950/20 text-pink-400' },
    { name: '181 Women in Distress', number: '181', desc: '24/7 Domestic Violence & Safety', color: 'border-purple-500/40 bg-purple-950/20 text-purple-400' }
  ];

  const handleSosClick = () => {
    if (locationPermission !== 'granted') {
      requestLocationPermission(() => {
        setIsSosModalOpen(true);
      });
    } else {
      setIsSosModalOpen(true);
    }
  };

  return (
    <div className="flex-1 space-y-6 animate-fadeIn w-full">
      {/* 1. WELCOME & PORTAL OVERVIEW BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white font-bold shadow-md shadow-red-500/30">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">
                {t.appName}
              </h1>
              <span className="text-[10px] bg-red-900/70 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-700/60 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                108 NETWORK LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <span className="text-white font-semibold">{userProfile.name}</span> • Blood Group: <span className="text-red-400 font-bold">{userProfile.bloodGroup}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentScreen('TRIAGE')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>AI Triage Check</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('PROFILE')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <User className="w-4 h-4 text-red-400" />
            <span>Health Passport</span>
          </button>
        </div>
      </div>

      {/* 2. RESPONSIVE WEB DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: HERO EMERGENCY ACTIONS & HEALTH MODULES (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* EMERGENCY SOS HERO BANNER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-rose-950 p-6 sm:p-8 text-white shadow-2xl shadow-red-900/40 border border-red-500/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-red-200 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  {t.emergencySos}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {t.needUrgentHelp}
                </h2>
                <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                  {t.sosBroadcastSubtitle} Automatically alerts nearest 108 ALS ambulances and locks closest hospital trauma bays.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSosClick}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white hover:bg-red-50 text-red-700 font-black text-xs sm:text-sm flex flex-col items-center justify-center shadow-2xl shadow-black/40 active:scale-95 transition-all shrink-0 border-4 border-red-200 cursor-pointer group"
                title="Trigger Immediate 108 Emergency SOS"
              >
                <ShieldAlert className="w-8 h-8 sm:w-9 sm:h-9 animate-bounce text-red-600 group-hover:scale-110 transition-transform" />
                <span className="mt-1 font-mono tracking-wider">TRIGGER</span>
              </button>
            </div>
          </div>

          {/* PRIMARY ACTION: REPORT ACCIDENT & TRAUMA BUTTON */}
          <button
            type="button"
            onClick={() => setCurrentScreen('REPORT_ACCIDENT')}
            className="w-full group rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 sm:p-6 border border-red-500/40 hover:border-red-500 flex items-center justify-between shadow-xl shadow-slate-950/60 active:scale-[0.99] transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform shrink-0">
                <AlertOctagon className="w-7 h-7 text-red-500 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base sm:text-lg">
                    {t.reportAccident}
                  </span>
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    FAST AUTO-TRIAGE
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Victims count, consciousness &amp; bleeding status, injury photo upload &amp; real-time GPS map
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-red-600 transition-colors shrink-0 ml-3">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* ACTIVE INCIDENT STATUS BANNER (IF ANY) */}
          {activeIncident && (
            <div
              onClick={() => setCurrentScreen('EMERGENCY_CONFIRM')}
              className="cursor-pointer rounded-3xl bg-slate-900/90 border border-amber-500/40 p-5 space-y-3 hover:border-amber-500 transition-colors shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    Active Emergency Incident: #{activeIncident.id}
                  </span>
                </div>
                <PriorityBadge priority={activeIncident.priority} size="md" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Ambulance className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block">Assigned 108 Unit:</span>
                    <span className="font-bold text-white text-xs">{activeIncident.assignedAmbulanceName || 'ALS Ambulance AMB-04'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Estimated Arrival:</span>
                    <span className="text-amber-400 font-extrabold text-sm font-mono">
                      {activeIncident.ambulanceEtaMinutes || 4} Mins En-Route
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TWO PRIMARY MODULE TILES: WOMEN'S HEALTH & YOGA WELLNESS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Women's Health Tile */}
            <button
              type="button"
              onClick={() => setCurrentScreen('WOMENS_HEALTH')}
              className="group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-pink-500/30 hover:border-pink-500/60 text-left transition-all relative overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-base">{t.womensHealth}</span>
                <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Log symptoms, menstrual cycle tracker, pregnancy support, PCOS health guides &amp; daily wellness tips.
              </p>
            </button>

            {/* Yoga & Wellness Tile */}
            <button
              type="button"
              onClick={() => setCurrentScreen('YOGA')}
              className="group rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 border border-teal-500/30 hover:border-teal-500/60 text-left transition-all relative overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-base">{t.yogaWellness}</span>
                <ChevronRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Stress relief routines, beginner asanas, Pranayama breathwork &amp; restorative guided recovery flows.
              </p>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: HELPLINES, HEALTH PASSPORT & NETWORK TELEMETRY (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          {/* QUICK HEALTH PASSPORT CARD */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.healthProfile}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentScreen('PROFILE')}
                className="text-xs font-bold text-red-400 hover:text-red-300"
              >
                Edit Passport &rarr;
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Blood</span>
                <p className="font-black text-red-400 text-base mt-0.5">{userProfile.bloodGroup}</p>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Allergies</span>
                <p className="font-bold text-amber-400 text-xs mt-0.5 truncate">{userProfile.allergies[0]}</p>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Donor</span>
                <p className="font-bold text-emerald-400 text-xs mt-0.5">Yes</p>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Emergency Contact</span>
                <span className="font-bold text-white text-xs">{userProfile.emergencyContactName} ({userProfile.emergencyContactRelation})</span>
              </div>
              <a href={`tel:${userProfile.emergencyContactPhone}`} className="p-2 rounded-xl bg-red-600/20 text-red-400 font-bold hover:bg-red-600 hover:text-white transition-colors">
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 24/7 TOLL FREE EMERGENCY HELPLINES */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.emergencyContacts}
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">24x7 Active</span>
            </div>

            <div className="space-y-2">
              {emergencyHelplines.map((line) => (
                <a
                  key={line.number}
                  href={`tel:${line.number}`}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${line.color}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{line.name}</span>
                      <span className="text-[10px] font-mono font-bold bg-white/10 px-1.5 py-0.2 rounded text-white">
                        {line.number}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300/80 mt-0.5">{line.desc}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 text-white font-bold text-xs flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* PRIVACY, SAFETY & COMPLIANCE */}
          <button
            type="button"
            onClick={() => setCurrentScreen('PRIVACY_SAFETY')}
            className="w-full p-4 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <span className="font-bold block text-white text-xs">{t.privacySafety} &amp; Security</span>
                <span className="text-[10px] text-slate-400">Location, Camera &amp; Medical data policies</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* MEDICAL DISCLAIMER */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>{t.disclaimerMedical}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
