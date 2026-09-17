import React from 'react';
import {
  AlertOctagon,
  MapPin,
  Clock,
  Users,
  Navigation,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Flame,
  Activity
} from 'lucide-react';
import { IncidentReport, TriagePriority } from '../../types';
import { PRIORITY_CONFIG } from '../../data/mockData';

interface AmbulanceActiveEmergencyCardProps {
  incident: IncidentReport;
  isAssignedToMe: boolean;
  onAccept: (incidentId: string) => void;
  onViewDetails: (incidentId: string) => void;
}

export const AmbulanceActiveEmergencyCard: React.FC<AmbulanceActiveEmergencyCardProps> = ({
  incident,
  isAssignedToMe,
  onAccept,
  onViewDetails
}) => {
  const priorityConf = PRIORITY_CONFIG[incident.priority];

  return (
    <div
      className={`rounded-3xl p-4.5 border-2 transition-all shadow-2xl space-y-3.5 relative overflow-hidden ${
        isAssignedToMe
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border-red-500/80 ring-2 ring-red-500/30'
          : 'bg-slate-900 border-red-500/50 hover:border-red-400'
      }`}
    >
      {/* CARD TOP BADGE: 🚨 NEW EMERGENCY / ACTIVE MISSION */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            incident.priority === 'RED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}>
            <AlertOctagon className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-white tracking-wider uppercase">
                {isAssignedToMe ? '🚑 ACTIVE EMERGENCY MISSION' : '🚨 NEW EMERGENCY ALERT'}
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                #{incident.id}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              Reported: {incident.reportedAt} • {incident.accidentType}
            </span>
          </div>
        </div>

        {/* PRIORITY BADGE WITH OFFICIAL COLORS */}
        <div className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider shadow-md ${priorityConf.badgeBg}`}>
          {incident.priority} • {priorityConf.name}
        </div>
      </div>

      {/* METRICS ROW: DISTANCE, ETA, PATIENTS */}
      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800/90 text-center">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Distance</span>
          <span className="text-xs font-mono font-extrabold text-amber-400 flex items-center justify-center gap-1">
            <Navigation className="w-3 h-3 text-amber-400" />
            {incident.distanceKm || 2.3} km
          </span>
        </div>

        <div className="space-y-0.5 border-x border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">ETA</span>
          <span className="text-xs font-mono font-extrabold text-emerald-400 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            ~{incident.ambulanceEtaMinutes || 4} mins
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Patients</span>
          <span className="text-xs font-mono font-extrabold text-blue-400 flex items-center justify-center gap-1">
            <Users className="w-3 h-3 text-blue-400" />
            {incident.victimsCount} Victim(s)
          </span>
        </div>
      </div>

      {/* LOCATION & LANDMARK */}
      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-white leading-snug">
            {incident.locationName}
          </p>
        </div>
        {incident.locationLandmark && (
          <p className="text-[10px] text-amber-300 pl-5 font-medium">
            Landmark: {incident.locationLandmark}
          </p>
        )}
      </div>

      {/* CHIEF COMPLAINT / CITIZEN REPORT SUMMARY */}
      <div className="space-y-1">
        <p className="text-[11px] text-slate-300 line-clamp-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60 leading-relaxed">
          "{incident.description}"
        </p>
      </div>

      {/* BUTTONS: [ ACCEPT EMERGENCY ] & [ VIEW DETAILS ] */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onViewDetails(incident.id)}
          className="py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <span>VIEW DETAILS</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {isAssignedToMe ? (
          <button
            type="button"
            onClick={() => onViewDetails(incident.id)}
            className="py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-1.5 transition-all active:scale-98"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>CONTINUE TRIP</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onAccept(incident.id)}
            className="py-3 px-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs shadow-lg shadow-red-900/40 flex items-center justify-center gap-1.5 transition-all active:scale-98 animate-pulse"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ACCEPT EMERGENCY</span>
          </button>
        )}
      </div>
    </div>
  );
};
