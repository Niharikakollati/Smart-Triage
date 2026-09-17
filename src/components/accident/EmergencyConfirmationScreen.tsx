import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  MapPin,
  Users,
  Ambulance,
  Building2,
  Clock,
  PhoneCall,
  ChevronLeft,
  Navigation,
  Activity,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PriorityBadge } from '../common/PriorityBadge';
import { PRIORITY_CONFIG } from '../../data/mockData';

export const EmergencyConfirmationScreen: React.FC = () => {
  const {
    activeIncident,
    setCurrentScreen,
    ambulances,
    hospitals
  } = useApp();

  const [simulatedEta, setSimulatedEta] = useState(activeIncident?.ambulanceEtaMinutes || 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  if (!activeIncident) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm">No active emergency report found.</p>
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const assignedAmb = ambulances.find((a) => a.id === activeIncident.assignedAmbulanceId) || ambulances[0];
  const assignedHosp = hospitals.find((h) => h.id === activeIncident.assignedHospitalId) || hospitals[0];

  const getStatusStep = () => {
    switch (activeIncident.status) {
      case 'REPORTED':
        return 1;
      case 'AMBULANCE_DISPATCHED':
        return 2;
      case 'AMBULANCE_AT_SCENE':
        return 3;
      case 'EN_ROUTE_TO_HOSPITAL':
        return 4;
      case 'ARRIVED_AT_HOSPITAL':
      case 'TRIAGED_IN_ER':
        return 5;
      default:
        return 2;
    }
  };

  const currentStep = getStatusStep();

  return (
    <div className="flex-1 p-4 pb-24 space-y-5 animate-fadeIn">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            DISPATCH ACTIVE
          </span>
          <h1 className="text-sm font-bold text-white tracking-tight mt-0.5">
            Emergency Dispatch #{activeIncident.id}
          </h1>
        </div>
        <div className="w-9" />
      </div>

      {/* DISPATCH CONFIRMED HERO CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 p-5 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7 animate-pulse text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                Emergency Logged
              </span>
              <h2 className="text-base font-extrabold text-white">
                Units En Route to Scene
              </h2>
            </div>
          </div>
          <PriorityBadge priority={activeIncident.priority} size="md" />
        </div>

        {/* PROGRESS STEPPER */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {[
              { num: 1, label: 'Reported' },
              { num: 2, label: 'Dispatched' },
              { num: 3, label: 'At Scene' },
              { num: 4, label: 'Transit' },
              { num: 5, label: 'Hospital' }
            ].map((step) => {
              const isPassed = step.num <= currentStep;
              const isCurrent = step.num === currentStep;
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 border-white ring-2 ring-emerald-400/40 animate-pulse'
                        : isPassed
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-900 text-slate-500 border-slate-700'
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className={`text-[9px] mt-1 font-semibold ${isPassed ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AMBULANCE STATUS CARD */}
      <div className="rounded-2xl bg-slate-900/90 border border-amber-500/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Assigned ALS Ambulance
            </span>
          </div>
          <span className="text-xs font-bold font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 animate-pulse">
            ETA: ~{simulatedEta} mins
          </span>
        </div>

        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Unit Name:</span>
            <span className="text-white font-bold">{assignedAmb.id} &bull; {assignedAmb.vehicleType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Driver & Paramedic:</span>
            <span className="text-slate-200 font-semibold">{assignedAmb.driverName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Vehicle Reg:</span>
            <span className="font-mono text-slate-300">{assignedAmb.vehicleNumber}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span className="text-slate-400">Current Speed:</span>
            <span className="text-emerald-400 font-semibold font-mono">68 km/h (Emergency Sirens Active)</span>
          </div>
        </div>

        <a
          href={`tel:${assignedAmb.driverPhone}`}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call Ambulance Driver ({assignedAmb.driverName})</span>
        </a>
      </div>

      {/* HOSPITAL ER NOTIFICATION CARD */}
      <div className="rounded-2xl bg-slate-900/90 border border-blue-500/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Hospital Trauma Alert
            </span>
          </div>
          <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
            Red Bay Reserved
          </span>
        </div>

        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
          <div>
            <p className="text-white font-bold text-sm">{assignedHosp.name}</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{assignedHosp.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-400">Department:</span>
              <p className="text-blue-300 font-semibold mt-0.5">{activeIncident.recommendedDepartment || 'Trauma Resuscitation'}</p>
            </div>
            <div>
              <span className="text-slate-400">Attending Surgeon:</span>
              <p className="text-slate-200 font-semibold mt-0.5">{activeIncident.assignedDoctorName || 'Dr. Arvind Mehta (Standby)'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* INCIDENT DETAILS SUMMARY */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2.5 text-xs">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
          Report Summary
        </span>

        <div className="flex items-start gap-2 text-slate-300">
          <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">{activeIncident.locationName}</p>
            {activeIncident.locationLandmark && (
              <p className="text-slate-400 text-[11px]">Landmark: {activeIncident.locationLandmark}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
          <div>
            <span className="text-slate-400">Accident Type:</span>
            <p className="font-semibold text-white">{activeIncident.accidentType}</p>
          </div>
          <div>
            <span className="text-slate-400">Victims Count:</span>
            <p className="font-semibold text-white">{activeIncident.victimsCount} Person(s)</p>
          </div>
          <div>
            <span className="text-slate-400">Consciousness:</span>
            <p className="font-semibold text-white">{activeIncident.consciousness}</p>
          </div>
          <div>
            <span className="text-slate-400">Bleeding:</span>
            <p className="font-semibold text-white">{activeIncident.bleeding}</p>
          </div>
        </div>
      </div>

      {/* DISPATCH STATUS REASSURANCE */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800/80 p-3.5 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Emergency Response Dispatch Confirmed</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Emergency response units are en route with GPS navigation locked to your coordinates. Keep your line open.
        </p>
      </div>
    </div>
  );
};
