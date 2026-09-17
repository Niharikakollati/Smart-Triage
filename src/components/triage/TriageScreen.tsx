import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  HeartPulse,
  Thermometer,
  Wind,
  Smile,
  AlertCircle,
  Clock,
  Sparkles,
  Layers,
  ChevronLeft,
  CheckCircle2,
  RefreshCw,
  Info,
  ShieldAlert
} from 'lucide-react';
import {
  TriagePriority,
  ConsciousnessStatus,
  BreathingStatus,
  BleedingStatus,
  BurnStatus,
  FractureStatus,
  VitalsData
} from '../../types';
import {
  calculateTriagePriority,
  PRIORITY_CONFIG,
  SAMPLE_TRIAGE_SCENARIOS
} from '../../data/mockData';
import { PriorityBadge } from '../common/PriorityBadge';

export const TriageScreen: React.FC = () => {
  const { navigateBack, submitNewIncident, setCurrentScreen } = useApp();

  // Vitals State
  const [heartRate, setHeartRate] = useState<number>(110);
  const [systolicBp, setSystolicBp] = useState<number>(95);
  const [diastolicBp, setDiastolicBp] = useState<number>(65);
  const [spO2, setSpO2] = useState<number>(92);
  const [respRate, setRespRate] = useState<number>(26);
  const [temperature, setTemperature] = useState<number>(37.2);
  const [painLevel, setPainLevel] = useState<number>(8);

  // Clinical checklist
  const [consciousness, setConsciousness] = useState<ConsciousnessStatus>('ALERT');
  const [breathing, setBreathing] = useState<BreathingStatus>('LABORED');
  const [bleeding, setBleeding] = useState<BleedingStatus>('MINOR');
  const [burns, setBurns] = useState<BurnStatus>('NONE');
  const [fracture, setFracture] = useState<FractureStatus>('SUSPECTED_CLOSED');

  // Computed Priority
  const [priority, setPriority] = useState<TriagePriority>('ORANGE');

  useEffect(() => {
    const vitalsObj: Partial<VitalsData> = {
      heartRate,
      bloodPressureSystolic: systolicBp,
      bloodPressureDiastolic: diastolicBp,
      spO2,
      respiratoryRate: respRate,
      temperature,
      painLevel
    };
    const calculated = calculateTriagePriority(
      consciousness,
      breathing,
      bleeding,
      burns,
      fracture,
      vitalsObj
    );
    setPriority(calculated);
  }, [
    heartRate,
    systolicBp,
    diastolicBp,
    spO2,
    respRate,
    temperature,
    painLevel,
    consciousness,
    breathing,
    bleeding,
    burns,
    fracture
  ]);

  const loadScenario = (scenario: typeof SAMPLE_TRIAGE_SCENARIOS[0]) => {
    setHeartRate(scenario.vitals.heartRate);
    setSystolicBp(scenario.vitals.bloodPressureSystolic);
    setDiastolicBp(scenario.vitals.bloodPressureDiastolic);
    setSpO2(scenario.vitals.spO2);
    setRespRate(scenario.vitals.respiratoryRate);
    setTemperature(scenario.vitals.temperature);
    setPainLevel(scenario.vitals.painLevel);
    setConsciousness(scenario.consciousness);
    setBreathing(scenario.breathing);
    setBleeding(scenario.bleeding);
    setBurns(scenario.burns);
    setFracture(scenario.fracture);
  };

  const handleDispatchFromTriage = () => {
    submitNewIncident({
      accidentType: 'Medical Emergency',
      victimsCount: 1,
      consciousness,
      breathing,
      bleeding,
      burns,
      fracture,
      priority,
      vitals: {
        heartRate,
        bloodPressureSystolic: systolicBp,
        bloodPressureDiastolic: diastolicBp,
        spO2,
        respiratoryRate: respRate,
        temperature,
        painLevel
      },
      description: `Evaluated via Triage Calculator: ${priority} priority calculated. Heart Rate: ${heartRate} BPM, SpO2: ${spO2}%, BP: ${systolicBp}/${diastolicBp}`
    });
    setCurrentScreen('EMERGENCY_CONFIRM');
  };

  const config = PRIORITY_CONFIG[priority];

  return (
    <div className="flex-1 p-4 pb-24 space-y-5 animate-fadeIn">
      {/* SCREEN HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-white uppercase tracking-wider">
            Clinical Triage Calculator
          </h1>
          <p className="text-[11px] text-slate-400 font-mono">Manchester & START Protocol</p>
        </div>
        <div className="w-9" />
      </div>

      {/* DYNAMIC TRIAGE RESULT HERO CARD */}
      <div
        className={`rounded-3xl border p-5 shadow-2xl space-y-3 transition-all relative overflow-hidden ${
          priority === 'RED'
            ? 'bg-red-950/40 border-red-500 shadow-red-900/40 text-red-100'
            : priority === 'ORANGE'
            ? 'bg-orange-950/40 border-orange-500 shadow-orange-900/40 text-orange-100'
            : priority === 'YELLOW'
            ? 'bg-amber-950/40 border-amber-500 shadow-amber-900/40 text-amber-100'
            : 'bg-emerald-950/40 border-emerald-500 shadow-emerald-900/40 text-emerald-100'
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-80">
              Calculated Triage Severity
            </span>
            <div className="flex items-center gap-2 mt-1">
              <PriorityBadge priority={priority} size="lg" />
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] opacity-80 uppercase font-mono">Response Window</span>
            <p className="text-sm font-black mt-0.5">{config.targetResponseTime}</p>
          </div>
        </div>

        <p className="text-xs opacity-90 leading-relaxed font-medium pt-2 border-t border-white/10">
          {config.subtext}
        </p>
      </div>

      {/* QUICK PRE-LOAD SAMPLE PATIENT SCENARIOS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            1-Click Sample Patient Scenarios
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Demo Presets</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_TRIAGE_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => loadScenario(scen)}
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-left transition-all text-xs active:scale-95"
            >
              <span className="font-bold text-white block truncate">{scen.name}</span>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{scen.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* VITALS CONTROLS */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              1. Vital Signs Parameters
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Continuous Sliders</span>
        </div>

        {/* Heart Rate Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Heart Rate (BPM)</span>
            <span className={`font-mono font-bold ${heartRate > 120 || heartRate < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
              {heartRate} BPM
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="190"
            value={heartRate}
            onChange={(e) => setHeartRate(Number(e.target.value))}
            className="w-full accent-red-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>Bradycardia (&lt;50)</span>
            <span>Normal (60-100)</span>
            <span>Tachycardia (&gt;120)</span>
          </div>
        </div>

        {/* SpO2 Oxygen Saturation Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Oxygen Saturation (SpO2)</span>
            <span className={`font-mono font-bold ${spO2 < 90 ? 'text-red-400' : spO2 < 94 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {spO2}%
            </span>
          </div>
          <input
            type="range"
            min="70"
            max="100"
            value={spO2}
            onChange={(e) => setSpO2(Number(e.target.value))}
            className="w-full accent-cyan-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>Critical (&lt;90%)</span>
            <span>Mild Hypoxia (90-93%)</span>
            <span>Normal (95-100%)</span>
          </div>
        </div>

        {/* Blood Pressure (Systolic) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Systolic Blood Pressure (mmHg)</span>
            <span className={`font-mono font-bold ${systolicBp < 85 ? 'text-red-400' : 'text-amber-400'}`}>
              {systolicBp} / {diastolicBp} mmHg
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="220"
            value={systolicBp}
            onChange={(e) => setSystolicBp(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>Shock (&lt;85)</span>
            <span>Normal (100-125)</span>
            <span>Hypertensive Crisis (&gt;180)</span>
          </div>
        </div>

        {/* Respiratory Rate & Temperature */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
              <Wind className="w-3 h-3 text-cyan-400" /> Resp Rate (/min)
            </label>
            <input
              type="number"
              value={respRate}
              onChange={(e) => setRespRate(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-rose-400" /> Temp (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
            />
          </div>
        </div>

        {/* Pain Level 0 to 10 Scale */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Pain Severity (0-10 Scale)</span>
            <span className={`font-mono font-bold ${painLevel >= 8 ? 'text-red-400' : painLevel >= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {painLevel} / 10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="w-full accent-rose-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>0 (No Pain)</span>
            <span>5 (Moderate)</span>
            <span>10 (Worst Pain)</span>
          </div>
        </div>
      </div>

      {/* DISPATCH BASED ON TRIAGE */}
      <button
        onClick={handleDispatchFromTriage}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs tracking-wider shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <ShieldAlert className="w-4 h-4" />
        <span>DISPATCH AMBULANCE & TRANSMIT TRIAGE RECORD</span>
      </button>

      {/* PROTOCOL INFO */}
      <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          Triage algorithms are aligned with the Manchester Triage System (MTS) and Emergency Severity Index (ESI). Final field classification is verified by attending paramedics and trauma physicians.
        </p>
      </div>
    </div>
  );
};
