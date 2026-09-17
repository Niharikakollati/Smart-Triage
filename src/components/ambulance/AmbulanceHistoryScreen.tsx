import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Users,
  ChevronRight,
  ShieldCheck,
  FileText,
  X,
  Activity,
  Award
} from 'lucide-react';
import { CompletedEmergencyTrip, TriagePriority } from '../../types';
import { SAMPLE_DRIVER_HISTORY, PRIORITY_CONFIG } from '../../data/mockData';

interface AmbulanceHistoryScreenProps {
  onBackToDashboard: () => void;
}

export const AmbulanceHistoryScreen: React.FC<AmbulanceHistoryScreenProps> = ({
  onBackToDashboard
}) => {
  const [selectedTrip, setSelectedTrip] = useState<CompletedEmergencyTrip | null>(null);
  const [historyList] = useState<CompletedEmergencyTrip[]>(SAMPLE_DRIVER_HISTORY);

  return (
    <div className="space-y-4 pb-12">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Emergency Dispatch History</h2>
            <p className="text-xs text-slate-400">Past completed paramedic runs & hospital handovers</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-2xl border border-slate-800 text-xs font-bold text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{historyList.length} Runs Logged</span>
        </div>
      </div>

      {/* COMPLETED TRIPS LIST */}
      <div className="space-y-3">
        {historyList.map((trip) => {
          const priorityConf = PRIORITY_CONFIG[trip.priority];
          return (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition-all cursor-pointer shadow-lg active:scale-99"
            >
              {/* TOP ROW */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-white">#{trip.id}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${priorityConf.badgeBg}`}>
                    {trip.priority}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{trip.incidentDate}, {trip.incidentTime}</span>
                </div>
              </div>

              {/* COMPLAINT */}
              <p className="text-xs font-bold text-slate-200 line-clamp-1">
                {trip.chiefComplaint}
              </p>

              {/* ROUTE LOCATIONS */}
              <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{trip.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{trip.hospitalName}</span>
                </div>
              </div>

              {/* BOTTOM METRICS */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono text-amber-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    {trip.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 font-mono text-blue-400 font-semibold">
                    <Users className="w-3 h-3" />
                    {trip.patientCount} Patient(s)
                  </span>
                </div>

                <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Handed Over</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL FOR INSPECTING COMPLETED TRIP */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Dispatch #{selectedTrip.id} Summary</h3>
                  <span className="text-[10px] text-slate-400">{selectedTrip.incidentDate} at {selectedTrip.incidentTime}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTrip(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PRIORITY & STATUS */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Triage Priority</span>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${PRIORITY_CONFIG[selectedTrip.priority].badgeBg}`}>
                  {selectedTrip.priority} • {PRIORITY_CONFIG[selectedTrip.priority].name}
                </span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Status</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Handed Over to ER
                </span>
              </div>
            </div>

            {/* CHIEF COMPLAINT */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chief Complaint</span>
              <p className="text-xs font-semibold text-white bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {selectedTrip.chiefComplaint}
              </p>
            </div>

            {/* VITALS & INJURY */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Activity className="w-4 h-4" />
                <span>Field Vitals & Paramedic Notes</span>
              </div>
              <p className="text-[11px] font-mono text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
                {selectedTrip.vitalsSummary}
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {selectedTrip.paramedicNotes}
              </p>
              {selectedTrip.injuryClassification && (
                <div className="pt-1 text-[10px] text-amber-300">
                  <span className="font-bold">ML Scan Classification:</span> {selectedTrip.injuryClassification}
                </div>
              )}
            </div>

            {/* ROUTE INFO */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Pickup Location:</span>
                  <span className="text-white font-medium">{selectedTrip.pickupLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Handover Hospital:</span>
                  <span className="text-white font-medium">{selectedTrip.hospitalName}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTrip(null)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Dispatch Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
