import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  ShieldCheck,
  Phone,
  Power,
  Activity,
  Award,
  CheckCircle2,
  Settings,
  Building2,
  Clock,
  Radio,
  FileCheck2,
  LogOut
} from 'lucide-react';
import { AmbulanceUnit } from '../../types';

interface AmbulanceProfileScreenProps {
  ambulance: AmbulanceUnit;
  isOnline: boolean;
  onToggleOnline: () => void;
}

export const AmbulanceProfileScreen: React.FC<AmbulanceProfileScreenProps> = ({
  ambulance,
  isOnline,
  onToggleOnline
}) => {
  const { logout } = useApp();
  return (
    <div className="space-y-4 pb-12">
      {/* DRIVER PROFILE CARD */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt={ambulance.driverName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
              isOnline ? 'bg-emerald-500' : 'bg-slate-500'
            }`} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">{ambulance.driverName}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Lead Paramedic
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">ID: {ambulance.id} • {ambulance.vehicleNumber}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{ambulance.driverPhone}</span>
            </p>
          </div>
        </div>

        {/* ONLINE / OFFLINE TOGGLE */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">Duty Availability</span>
            <p className="text-[11px] text-slate-400">
              {isOnline ? 'Available for emergency dispatch' : 'Offline / Off-duty'}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleOnline}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ${
              isOnline
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOnline ? 'ONLINE' : 'GO ONLINE'}</span>
          </button>
        </div>
      </div>

      {/* VEHICLE & EQUIPMENT SPECS */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Ambulance Unit Specifications
              </h3>
              <span className="text-[10px] text-slate-400">{ambulance.vehicleType}</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-xl border border-blue-800">
            {ambulance.vehicleNumber}
          </span>
        </div>

        {/* BASE HOSPITAL */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Base Trauma Station:</span>
              <span className="font-bold text-white">{ambulance.baseHospital}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400">Station #4</span>
        </div>

        {/* ONBOARD MEDICAL EQUIPMENT CHECKLIST */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Onboard Emergency Equipment (ALS Certified):
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {ambulance.equipment.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHIFT TELEMETRY & STATS */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3 shadow-xl">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Shift Performance Telemetry</span>
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Today's Runs</span>
            <span className="text-sm font-mono font-black text-amber-400">4</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Avg Response</span>
            <span className="text-sm font-mono font-black text-emerald-400">4.2m</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Duty Time</span>
            <span className="text-sm font-mono font-black text-blue-400">6h 20m</span>
          </div>
        </div>
      </div>

      {/* DEDICATED LOG OUT ACTION */}
      <button
        type="button"
        onClick={logout}
        className="w-full py-3.5 px-4 rounded-2xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800/80 text-rose-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
      >
        <LogOut className="w-4 h-4 text-rose-400" />
        <span>Log Out of 108 Ambulance Driver Portal</span>
      </button>
    </div>
  );
};
