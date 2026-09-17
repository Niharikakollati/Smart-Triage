import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  User,
  HeartPulse,
  Activity,
  MapPin,
  Clock,
  Truck,
  Building,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Camera,
  Shield,
  FileText,
  Thermometer,
  Wind,
  Droplets,
  Radio,
  Send
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { GoogleMapCard } from '../common/GoogleMapCard';
import { HospitalPreArrivalStatus, TriagePriority } from '../../types';

export const HospitalPatientDetailsScreen: React.FC = () => {
  const {
    activeIncident,
    navigateBack,
    updatePreArrivalStatus,
    admitPatientToEr,
    hospitals,
    t
  } = useApp();

  if (!activeIncident) {
    return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center space-y-3">
        <p className="text-slate-400 text-sm">No patient selected.</p>
        <button
          type="button"
          onClick={navigateBack}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
        >
          Return to ER Queue
        </button>
      </div>
    );
  }

  const priorityConf = PRIORITY_CONFIG[activeIncident.priority as TriagePriority];
  const preStatus = activeIncident.hospitalPreArrivalStatus || 'PENDING';
  const currentHospital = hospitals[0];

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
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
            ER Patient Intake Record
          </span>
          <h1 className="text-sm font-black text-white font-mono">
            #{activeIncident.id}
          </h1>
        </div>

        <div className={`px-2.5 py-1 rounded-xl text-[11px] font-black ${priorityConf.badgeBg}`}>
          {activeIncident.priority}
        </div>
      </div>

      {/* 1. PARAMEDIC TRANSMISSION NOTIFICATION BANNER */}
      {activeIncident.paramedicTransmittedAt && (
        <div className="rounded-2xl bg-emerald-950/80 border border-emerald-600/80 p-3 space-y-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Telemetry Transmitted by 108 Ambulance Driver</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-900/90 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700">
              {activeIncident.paramedicTransmittedAt}
            </span>
          </div>
          <p className="text-[11px] text-emerald-200/90 leading-tight">
            Live patient details and field interventions have been saved and synchronized from unit <strong>{activeIncident.assignedAmbulanceName || 'AMB-04'}</strong>.
          </p>
        </div>
      )}

      {/* 2. PRE-ARRIVAL INFORMATION & HOSPITAL READINESS */}
      <div className="rounded-3xl bg-slate-900 border-2 border-red-500/50 p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-400 animate-pulse" />
            <h2 className="text-xs font-black text-white uppercase tracking-wider">
              {t.preArrivalInfo}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/40">
            ETA ~{activeIncident.ambulanceEtaMinutes || 4} Mins
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <p className="text-white font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Patient arriving via {activeIncident.assignedAmbulanceName || 'ALS Unit AMB-04'} to Trauma Resuscitation Bay.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Recommended Department:</span>
              <span className="text-xs font-bold text-red-300">
                {activeIncident.recommendedDepartment || 'Trauma Resuscitation Bay 1'}
              </span>
            </div>

            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Destination Facility:</span>
              <span className="text-xs font-bold text-slate-200">
                {activeIncident.assignedHospitalName || 'Apex Regional Trauma ER'}
              </span>
            </div>
          </div>
        </div>

        {/* 1-TAP HOSPITAL STATUS BUTTONS */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Hospital ER Readiness Status:
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => updatePreArrivalStatus(activeIncident.id, 'PREPARING')}
              className={`py-2.5 rounded-xl font-bold transition-all ${
                preStatus === 'PREPARING'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.preparing}
            </button>

            <button
              type="button"
              onClick={() => updatePreArrivalStatus(activeIncident.id, 'READY')}
              className={`py-2.5 rounded-xl font-bold transition-all ${
                preStatus === 'READY'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.ready}
            </button>

            <button
              type="button"
              onClick={() => updatePreArrivalStatus(activeIncident.id, 'ARRIVED')}
              className={`py-2.5 rounded-xl font-bold transition-all ${
                preStatus === 'ARRIVED'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.patientArrived}
            </button>
          </div>
        </div>
      </div>

      {/* 3. FIELD VITALS & CLINICAL STATUS FROM AMBULANCE DRIVER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Ambulance Telemetry & Vitals
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            Live Streamed
          </span>
        </div>

        {/* 4-Tile Vitals */}
        {activeIncident.vitals && (
          <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-[9px] text-slate-500 block">Heart Rate</span>
              <span className="text-sm font-bold text-red-400">{activeIncident.vitals.heartRate} bpm</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-[9px] text-slate-500 block">Blood Press</span>
              <span className="text-xs font-bold text-amber-400">
                {activeIncident.vitals.bloodPressureSystolic}/{activeIncident.vitals.bloodPressureDiastolic}
              </span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-[9px] text-slate-500 block">SpO2</span>
              <span className="text-sm font-bold text-blue-400">{activeIncident.vitals.spO2}%</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="text-[9px] text-slate-500 block">Temp / RR</span>
              <span className="text-xs font-bold text-emerald-400">{activeIncident.vitals.temperature}°C</span>
              <span className="text-[9px] text-slate-500 block">{activeIncident.vitals.respiratoryRate}/m</span>
            </div>
          </div>
        )}

        {/* Neurological & Physical Evaluation */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">AVPU:</span>
            <span className="text-xs font-bold text-white">
              {activeIncident.consciousness || 'ALERT'}
            </span>
          </div>
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Breathing:</span>
            <span className="text-xs font-bold text-amber-300">
              {activeIncident.breathing || 'NORMAL'}
            </span>
          </div>
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Bleeding:</span>
            <span className="text-xs font-bold text-red-400">
              {activeIncident.bleeding || 'NONE'}
            </span>
          </div>
        </div>

        {/* Paramedic Notes & Interventions */}
        {activeIncident.paramedicNotes && (
          <div className="bg-slate-950 p-3 rounded-2xl border border-blue-900/60 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
              <FileText className="w-3.5 h-3.5" />
              <span>Paramedic Clinical Field Treatment Notes:</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed font-sans">
              {activeIncident.paramedicNotes}
            </p>
          </div>
        )}
      </div>

      {/* 4. PATIENT IDENTIFICATION & CITIZEN REPORT */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Patient Info & Accident Origin
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Reporter: {activeIncident.reporterName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Age & Gender:</span>
            <span className="text-xs font-bold text-white">
              {activeIncident.patientAge || 29} Yrs • {activeIncident.patientGender || 'Male'}
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Accident Mechanism:</span>
            <span className="text-xs font-bold text-amber-300">
              {activeIncident.accidentType}
            </span>
          </div>
        </div>

        {/* Symptoms list */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Reported Symptoms & Injuries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeIncident.otherSymptoms.map((sym, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-red-950 border border-red-800 text-red-300 text-[11px] font-medium"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>

        {/* Description & Photo */}
        <div className="space-y-2">
          <p className="text-slate-300 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
            "{activeIncident.description}"
          </p>

          {activeIncident.photoUrl && (
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
              <img
                src={activeIncident.photoUrl}
                alt="Injury"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                Scene Photo
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. SCANNED INJURY ANALYSIS (IF PERFORMED BY PARAMEDIC) */}
      {activeIncident.scannedInjuryAnalysis && (
        <div className="rounded-3xl bg-slate-900 border border-amber-500/50 p-4 space-y-2 shadow-lg text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 uppercase text-[10px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Paramedic Field ML Scan
            </span>
            <span className="text-[10px] font-mono text-amber-300">
              {activeIncident.scannedInjuryAnalysis.confidencePercentage}% Confidence
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <h4 className="font-bold text-white">
              {activeIncident.scannedInjuryAnalysis.detectedInjuryType}
            </h4>
            <p className="text-[11px] text-amber-300">
              Estimated Severity: {activeIncident.scannedInjuryAnalysis.severityLevel}
            </p>
          </div>
          <p className="text-[10px] text-slate-500 italic">
            {activeIncident.scannedInjuryAnalysis.disclaimer}
          </p>
        </div>
      )}

      {/* 6. ADMIT TO ER BAY ACTION */}
      <button
        type="button"
        onClick={() => admitPatientToEr(activeIncident.id, currentHospital.id)}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 active:scale-98 transition-all"
      >
        <Building className="w-4 h-4" />
        <span>ADMIT PATIENT TO ER RESUSCITATION BAY</span>
      </button>

      {/* 7. GOOGLE MAPS ACCIDENT LOCATION */}
      <GoogleMapCard
        latitude={activeIncident.coordinates.lat}
        longitude={activeIncident.coordinates.lng}
        locationName={activeIncident.locationName}
        landmark={activeIncident.locationLandmark}
        title="Incident Origin Location"
      />
    </div>
  );
};
