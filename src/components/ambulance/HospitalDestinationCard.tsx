import React from 'react';
import {
  Building2,
  Navigation,
  Clock,
  MapPin,
  CheckCircle2,
  Radio,
  ExternalLink,
  BedDouble,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { HospitalFacility, IncidentReport } from '../../types';

interface HospitalDestinationCardProps {
  hospitals: HospitalFacility[];
  selectedHospitalId: string;
  onSelectHospital: (hospitalId: string) => void;
  incident: IncidentReport;
  ambulanceId: string;
  ambulanceCoords: { lat: number; lng: number };
}

export const HospitalDestinationCard: React.FC<HospitalDestinationCardProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  incident,
  ambulanceId,
  ambulanceCoords
}) => {
  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0];

  // Coordinates for navigation
  const hospitalLat = 28.4595;
  const hospitalLng = 77.0266;
  const hospitalNavUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospitalLat},${hospitalLng}`;

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              🏥 Hospital Destination & ER Routing
            </h3>
            <span className="text-[10px] text-slate-400">Select trauma center for incoming transfer</span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800">
          En Route
        </span>
      </div>

      {/* HOSPITAL SELECTOR BUTTONS */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Select Destination Hospital:
        </span>
        <div className="grid grid-cols-1 gap-2">
          {hospitals.map((hosp) => {
            const isSelected = hosp.id === selectedHospital.id;
            return (
              <button
                key={hosp.id}
                type="button"
                onClick={() => onSelectHospital(hosp.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{hosp.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">{hosp.tier} • {hosp.address.split(',')[0]}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-xs font-mono font-bold text-amber-400 block">{hosp.distanceKm} km</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                      {hosp.erBedsAvailable} ER Beds Free
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED DESTINATION SUMMARY */}
      <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Selected Destination:</span>
            <h4 className="text-sm font-black text-white">{selectedHospital.name}</h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-extrabold text-amber-400 block">{selectedHospital.distanceKm} km away</span>
            <span className="text-[10px] text-slate-400 font-mono">ETA ~4 mins</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="truncate">{selectedHospital.address}</span>
        </div>
      </div>

      {/* HOSPITAL PRE-ARRIVAL UPDATE PAYLOAD */}
      <div className="bg-slate-950/90 rounded-2xl p-3.5 border border-emerald-500/40 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Hospital Notified (Pre-Arrival Broadcast)
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            ER Sync Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono">
          <div><span className="text-slate-500">Patient ID:</span> #{incident.id}</div>
          <div><span className="text-slate-500">Priority:</span> <span className="text-red-400 font-bold">{incident.priority}</span></div>
          <div><span className="text-slate-500">Ambulance:</span> {ambulanceId}</div>
          <div><span className="text-slate-500">ETA:</span> ~{incident.ambulanceEtaMinutes || 4} mins</div>
          <div><span className="text-slate-500">Vitals:</span> HR {incident.vitals?.heartRate || 110}, BP {incident.vitals?.bloodPressureSystolic || 95}/{incident.vitals?.bloodPressureDiastolic || 65}</div>
          <div><span className="text-slate-500">SpO2:</span> {incident.vitals?.spO2 || 93}%</div>
        </div>

        <p className="text-[10px] text-slate-400">
          ER Trauma resuscitation bay and attending surgeon Dr. Arvind Mehta alerted for pre-admission readiness.
        </p>
      </div>

      {/* NAVIGATE TO HOSPITAL BUTTON */}
      <a
        href={hospitalNavUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 transition-all active:scale-98 text-center"
      >
        <Navigation className="w-4 h-4 text-amber-400 fill-current" />
        <span>NAVIGATE TO HOSPITAL IN GOOGLE MAPS</span>
      </a>
    </div>
  );
};
