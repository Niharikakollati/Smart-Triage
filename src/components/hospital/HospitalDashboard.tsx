import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  Bed,
  HeartPulse,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Shield,
  Stethoscope,
  MapPin,
  LogOut
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { TriagePriority } from '../../types';

export const HospitalDashboard: React.FC = () => {
  const {
    hospitals,
    incidents,
    setActiveIncidentId,
    setCurrentScreen,
    logout,
    authSession,
    t
  } = useApp();

  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('ALL');

  const activeHospital = hospitals[0]; // Apex Regional Trauma

  const filterOptions = [
    { id: 'ALL', label: t.allPriorities, count: incidents.length },
    { id: 'RED', label: t.priorityImmediate, count: incidents.filter(i => i.priority === 'RED').length },
    { id: 'ORANGE', label: t.priorityVeryUrgent, count: incidents.filter(i => i.priority === 'ORANGE').length },
    { id: 'YELLOW', label: t.priorityUrgent, count: incidents.filter(i => i.priority === 'YELLOW').length },
    { id: 'GREEN', label: t.priorityLower, count: incidents.filter(i => i.priority === 'GREEN').length }
  ];

  const filteredIncidents = selectedPriorityFilter === 'ALL'
    ? incidents
    : incidents.filter(i => i.priority === selectedPriorityFilter);

  const handleOpenPatientDetails = (incidentId: string) => {
    setActiveIncidentId(incidentId);
    setCurrentScreen('HOSPITAL_PATIENT_DETAILS');
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-4 animate-fadeIn">
      {/* HOSPITAL BANNER & BED CAPACITY */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white leading-tight">
                {activeHospital.name}
              </h1>
              <p className="text-[11px] text-blue-400 font-medium">
                {activeHospital.tier} • Staff: {authSession.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800/80 text-rose-300 hover:text-white text-xs font-bold transition-colors shadow-xs"
            title="Log out from ER Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Live ER Bed Capacity Counters */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 font-mono">
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-sans">ER Bays Free</span>
            <p className="text-base font-black text-emerald-400">
              {activeHospital.erBedsAvailable} / {activeHospital.erBedsTotal}
            </p>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-sans">ICU Beds Free</span>
            <p className="text-base font-black text-amber-400">
              {activeHospital.icuBedsAvailable}
            </p>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-sans">Trauma Teams</span>
            <p className="text-base font-black text-blue-400">
              {activeHospital.traumaTeamsActive} On-Duty
            </p>
          </div>
        </div>
      </div>

      {/* PRIORITY QUEUE FILTERS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.patientQueue}
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {filteredIncidents.length} Incoming Records
          </span>
        </div>

        {/* Horizontal Priority Filter Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedPriorityFilter(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedPriorityFilter === opt.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-950/60">
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PATIENT CARDS LIST */}
      <div className="space-y-3">
        {filteredIncidents.map((incident) => {
          const priorityConf = PRIORITY_CONFIG[incident.priority as TriagePriority];
          const preStatus = incident.hospitalPreArrivalStatus || 'PENDING';

          return (
            <div
              key={incident.id}
              onClick={() => handleOpenPatientDetails(incident.id)}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg hover:border-blue-500/50 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Header: ID, Priority, ETA */}
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black font-mono text-white">
                      #{incident.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${priorityConf.badgeBg}`}>
                      {incident.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-semibold">
                    {incident.patientAge || 29} Yrs • {incident.patientGender || 'Male'} • {incident.accidentType}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black font-mono text-amber-400 flex items-center justify-end gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ETA ~{incident.ambulanceEtaMinutes || 4}m
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                    preStatus === 'READY'
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : preStatus === 'PREPARING'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {preStatus}
                  </span>
                </div>
              </div>

              {/* Symptoms Preview */}
              <div className="flex flex-wrap gap-1">
                {incident.otherSymptoms.slice(0, 2).map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 text-[10px] border border-slate-800"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Location & Assigned Ambulance */}
              <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[210px]">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{incident.locationName}</span>
                </div>

                <span className="text-[10px] text-blue-400 font-bold font-mono">
                  {incident.assignedAmbulanceName?.split(' ')[0] || 'AMB-04'}
                </span>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                <span className="text-[10px] text-slate-400">
                  Target Dept: <strong className="text-white">{incident.recommendedDepartment?.split('/')[0] || 'Trauma Bay'}</strong>
                </span>
                <span className="text-blue-400 font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Intake Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
