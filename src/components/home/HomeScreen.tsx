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
  LogOut
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
    { name: '102 Women & Child ER', number: '102', desc: 'Maternity & Pediatric Transport', color: 'border-pink-500/40 bg-pink-950/20 text-pink-400' }
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
    <div className="flex-1 p-4 pb-20 space-y-4 animate-fadeIn">
      {/* TOP BAR: APP IDENTITY, LANGUAGE, NOTIFICATIONS, PROFILE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-white tracking-tight">
                {t.appName}
              </h1>
              <span className="text-[9px] bg-red-900/60 text-red-300 font-bold px-1.5 py-0.2 rounded">
                LIVE 108
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Welcome, <span className="text-slate-200 font-medium">{userProfile.name}</span>
            </p>
          </div>
        </div>

        {/* Quick Tools: Language, Notifications, Profile */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentScreen('LANGUAGE_SETTINGS')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Language Settings"
          >
            <Globe className="w-4 h-4 text-blue-400" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('NOTIFICATIONS')}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('PROFILE')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-red-400" />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 hover:text-white transition-colors"
            title="Log out of Citizen Portal"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>

      {/* EMERGENCY SOS HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-rose-900 p-5 text-white shadow-xl shadow-red-900/40 border border-red-500/40">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 text-red-200 text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              {t.emergencySos}
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">
              {t.needUrgentHelp}
            </h2>
            <p className="text-xs text-red-100/90 mt-1 max-w-[220px] leading-relaxed">
              {t.sosBroadcastSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSosClick}
            className="w-16 h-16 rounded-2xl bg-white text-red-700 font-black text-xs flex flex-col items-center justify-center shadow-lg shadow-black/30 active:scale-95 transition-transform shrink-0 border-2 border-red-200"
          >
            <ShieldAlert className="w-6 h-6 animate-bounce text-red-600" />
            <span className="mt-0.5">SOS</span>
          </button>
        </div>
      </div>

      {/* PRIMARY ACTION: REPORT ACCIDENT BUTTON */}
      <button
        type="button"
        onClick={() => setCurrentScreen('REPORT_ACCIDENT')}
        className="w-full group rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 p-4 border border-red-500/40 hover:border-red-500 flex items-center justify-between shadow-lg shadow-slate-950/50 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
            <AlertOctagon className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">
                {t.reportAccident}
              </span>
              <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                FAST
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Victims count, symptoms, injury photo & live GPS map
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-red-600 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* ACTIVE INCIDENT STATUS BANNER */}
      {activeIncident && (
        <div
          onClick={() => setCurrentScreen('EMERGENCY_CONFIRM')}
          className="cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-2.5 hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-200 font-mono">
                Active Incident: #{activeIncident.id}
              </span>
            </div>
            <PriorityBadge priority={activeIncident.priority} size="sm" />
          </div>

          <div className="text-xs text-slate-300 flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 truncate pr-2">
              <Ambulance className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate font-medium">{activeIncident.assignedAmbulanceName || 'ALS Ambulance AMB-04'}</span>
            </div>
            <span className="text-amber-400 font-bold whitespace-nowrap">
              ETA: {activeIncident.ambulanceEtaMinutes || 4} mins
            </span>
          </div>
        </div>
      )}

      {/* TWO PRIMARY MODULE TILES: WOMEN'S HEALTH & YOGA */}
      <div className="grid grid-cols-2 gap-3">
        {/* Women's Health Tile */}
        <button
          type="button"
          onClick={() => setCurrentScreen('WOMENS_HEALTH')}
          className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-4 border border-pink-500/30 hover:border-pink-500/60 text-left transition-all relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">{t.womensHealth}</span>
            <ChevronRight className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Log symptoms, cycle tracker, PCOS guides & daily health insights
          </p>
        </button>

        {/* Yoga & Wellness Tile */}
        <button
          type="button"
          onClick={() => setCurrentScreen('YOGA')}
          className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-4 border border-teal-500/30 hover:border-teal-500/60 text-left transition-all relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-teal-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">{t.yogaWellness}</span>
            <ChevronRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Stress relief, beginner asanas & guided YouTube flows
          </p>
        </button>
      </div>

      {/* QUICK HEALTH PROFILE CARD */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t.healthProfile}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCurrentScreen('PROFILE')}
            className="text-[11px] font-semibold text-red-400 hover:text-red-300"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Blood Group</span>
            <p className="font-bold text-red-400 text-sm mt-0.5">{userProfile.bloodGroup}</p>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Allergies</span>
            <p className="font-bold text-amber-400 text-xs mt-0.5 truncate">{userProfile.allergies[0]}</p>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Organ Donor</span>
            <p className="font-bold text-emerald-400 text-xs mt-0.5">Verified Yes</p>
          </div>
        </div>
      </div>

      {/* EMERGENCY CONTACTS QUICK HELPLINE DIALER */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t.emergencyContacts}
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">24x7 Toll-Free</span>
        </div>

        <div className="space-y-2">
          {emergencyHelplines.map((line) => (
            <a
              key={line.number}
              href={`tel:${line.number}`}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${line.color}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{line.name}</span>
                  <span className="text-xs font-mono font-bold bg-white/10 px-1.5 py-0.2 rounded text-white">
                    {line.number}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300/80 mt-0.5">{line.desc}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* PRIVACY & SAFETY LINK */}
      <button
        type="button"
        onClick={() => setCurrentScreen('PRIVACY_SAFETY')}
        className="w-full p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 text-xs text-slate-400 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{t.privacySafety} & Permissions</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500" />
      </button>

      {/* MEDICAL DISCLAIMER NOTICE */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          {t.disclaimerMedical}
        </p>
      </div>
    </div>
  );
};
