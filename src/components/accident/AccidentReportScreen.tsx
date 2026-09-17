import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Camera,
  Users,
  AlertTriangle,
  HeartPulse,
  Flame,
  Bone,
  CheckCircle2,
  ChevronLeft,
  Upload,
  Activity,
  Layers,
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  AccidentType,
  ConsciousnessStatus,
  BreathingStatus,
  BleedingStatus,
  BurnStatus,
  FractureStatus,
  TriagePriority
} from '../../types';
import { calculateTriagePriority, PRIORITY_CONFIG } from '../../data/mockData';
import { PriorityBadge } from '../common/PriorityBadge';
import { GoogleMapCard } from '../common/GoogleMapCard';

export const AccidentReportScreen: React.FC = () => {
  const { submitNewIncident, setCurrentScreen, navigateBack, locationPermission, requestLocationPermission, userProfile } = useApp();

  // Form State
  const [locationName, setLocationName] = useState('NH-48 Highway Flyover, near Cyber Gateway Junction');
  const [landmark, setLandmark] = useState('Opposite Shell Fuel Station, Pillar #142');
  const [coords, setCoords] = useState({ lat: 28.4725, lng: 77.0542 });
  
  const [victimsCount, setVictimsCount] = useState<number>(1);
  const [accidentType, setAccidentType] = useState<AccidentType>('Road Collision');
  
  // Triage indicators
  const [consciousness, setConsciousness] = useState<ConsciousnessStatus>('ALERT');
  const [breathing, setBreathing] = useState<BreathingStatus>('NORMAL');
  const [bleeding, setBleeding] = useState<BleedingStatus>('MINOR');
  const [burns, setBurns] = useState<BurnStatus>('NONE');
  const [fracture, setFracture] = useState<FractureStatus>('NONE');
  
  const [selectedOtherSymptoms, setSelectedOtherSymptoms] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  
  // Calculated Priority
  const [computedPriority, setComputedPriority] = useState<TriagePriority>('YELLOW');

  useEffect(() => {
    const priority = calculateTriagePriority(consciousness, breathing, bleeding, burns, fracture);
    setComputedPriority(priority);
  }, [consciousness, breathing, bleeding, burns, fracture]);

  const accidentTypes: AccidentType[] = [
    'Road Collision',
    'Motorcycle Crash',
    'Pedestrian Hit',
    'Fall / Severe Trauma',
    'Fire / Severe Burn',
    'Industrial Injury',
    'Medical Emergency',
    'Other'
  ];

  const symptomOptions = [
    'Head Trauma / Dizziness',
    'Severe Chest Pain',
    'Suspected Spinal Injury',
    'Loss of Sensation',
    'Cyanosis (Blue Lips)',
    'Trapped in Vehicle'
  ];

  const toggleSymptom = (s: string) => {
    setSelectedOtherSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitNewIncident({
      locationName,
      locationLandmark: landmark,
      coordinates: coords,
      victimsCount,
      accidentType,
      consciousness,
      breathing,
      bleeding,
      burns,
      fracture,
      otherSymptoms: selectedOtherSymptoms,
      photoUrl: photoPreview || undefined,
      description: description || `${accidentType} with ${victimsCount} injured reported.`,
      priority: computedPriority
    });
    setCurrentScreen('EMERGENCY_CONFIRM');
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-4 animate-fadeIn">
      {/* SCREEN HEADER */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={navigateBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-white uppercase tracking-wider">
            Report Accident & Injury
          </h1>
          <p className="text-[11px] text-red-400 font-medium">Auto-Triage & 108 Dispatch</p>
        </div>
        <div className="w-9" />
      </div>

      {/* DYNAMIC TRIAGE PRIORITY PREVIEW BAR */}
      <div className="sticky top-0 z-20 rounded-2xl bg-slate-900/95 backdrop-blur-md p-3 border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Live Triage Evaluation
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <PriorityBadge priority={computedPriority} size="sm" />
            <span className="text-xs font-bold text-white">
              {PRIORITY_CONFIG[computedPriority].targetResponseTime}
            </span>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 text-right max-w-[120px] font-mono leading-tight">
          {computedPriority === 'RED'
            ? '🚨 Immediate Dispatch'
            : computedPriority === 'ORANGE'
            ? '⚡ Very Urgent'
            : '⏱️ Field Queue'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. LOCATION & GOOGLE MAPS CARD */}
        <div className="space-y-2">
          <GoogleMapCard
            latitude={coords.lat}
            longitude={coords.lng}
            locationName={locationName}
            landmark={landmark}
            title="1. Accident Location (GPS)"
          />

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
            <div>
              <label className="text-[11px] text-slate-400 font-medium">Street / Highway Address</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-red-500 font-medium"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 font-medium">Landmark / Pillar Reference</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Opposite Shell Petrol Pump, Gate 2"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* 2. VICTIMS & ACCIDENT TYPE */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              2. Casualties & Type
            </span>
          </div>

          {/* Number of Victims */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium">Number of Injured / Victims</label>
            <div className="grid grid-cols-5 gap-2 mt-1.5">
              {[1, 2, 3, 4, '5+'].map((count, index) => {
                const numVal = typeof count === 'number' ? count : 5;
                const isSelected = victimsCount === numVal;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setVictimsCount(numVal)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accident Type Selector */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium">Accident / Incident Mechanism</label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {accidentTypes.map((type) => {
                const isSelected = accidentType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccidentType(type)}
                    className={`p-2 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                      isSelected
                        ? 'bg-red-950/70 border-red-500 text-red-300 shadow-xs'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. CLINICAL TRIAGE ASSESSMENTS */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                3. Victim Status Checklist
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Emergency Protocol</span>
          </div>

          {/* Consciousness Status */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-slate-300 font-semibold">Consciousness (AVPU)</label>
              {consciousness === 'UNRESPONSIVE' && (
                <span className="text-[10px] text-red-400 font-bold animate-pulse">CRITICAL</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { val: 'ALERT' as const, label: 'Alert & Talking' },
                { val: 'VOICE_RESPONSIVE' as const, label: 'Responds to Voice' },
                { val: 'PAIN_RESPONSIVE' as const, label: 'Responds to Pain' },
                { val: 'UNRESPONSIVE' as const, label: 'Unconscious / No Response' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setConsciousness(item.val)}
                  className={`p-2 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                    consciousness === item.val
                      ? item.val === 'UNRESPONSIVE' || item.val === 'PAIN_RESPONSIVE'
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'bg-amber-600 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Breathing Difficulty */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-300 font-semibold">Breathing Condition</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 'NORMAL' as const, label: 'Normal' },
                { val: 'LABORED' as const, label: 'Gasping / Labored' },
                { val: 'SEVERE_DISTRESS' as const, label: 'Choking / None' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setBreathing(item.val)}
                  className={`p-2 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                    breathing === item.val
                      ? item.val === 'SEVERE_DISTRESS'
                        ? 'bg-red-600 border-red-500 text-white'
                        : item.val === 'LABORED'
                        ? 'bg-orange-600 border-orange-500 text-white'
                        : 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bleeding Severity */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-300 font-semibold">Visible Bleeding</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 'NONE' as const, label: 'None' },
                { val: 'MINOR' as const, label: 'Minor / Scrapes' },
                { val: 'SEVERE_ARTERIAL' as const, label: 'Heavy / Pulsing' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setBleeding(item.val)}
                  className={`p-2 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                    bleeding === item.val
                      ? item.val === 'SEVERE_ARTERIAL'
                        ? 'bg-red-600 border-red-500 text-white'
                        : item.val === 'MINOR'
                        ? 'bg-amber-600 border-amber-500 text-white'
                        : 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Burns & Fractures */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Burns
              </label>
              <select
                value={burns}
                onChange={(e) => setBurns(e.target.value as BurnStatus)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-hidden"
              >
                <option value="NONE">No Burns</option>
                <option value="FIRST_DEGREE">1st Degree (Redness)</option>
                <option value="SECOND_DEGREE">2nd Degree (Blisters)</option>
                <option value="THIRD_DEGREE_EXTENSIVE">3rd Degree (Extensive)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                <Bone className="w-3 h-3 text-cyan-400" /> Fractures
              </label>
              <select
                value={fracture}
                onChange={(e) => setFracture(e.target.value as FractureStatus)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-hidden"
              >
                <option value="NONE">No Visible Fracture</option>
                <option value="SUSPECTED_CLOSED">Suspected Closed / Swelling</option>
                <option value="COMPOUND_OPEN">Compound (Bone Exposed)</option>
              </select>
            </div>
          </div>

          {/* Additional Symptom Chips */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium">Other Observed Complications</label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {symptomOptions.map((sym) => {
                const isSelected = selectedOtherSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      isSelected
                        ? 'bg-red-900/60 border-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. PHOTO UPLOAD & DESCRIPTION */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                4. Photo & Notes
              </span>
            </div>
            <span className="text-[10px] text-slate-500">For ER Trauma Team</span>
          </div>

          {/* Photo Preview / Upload Area */}
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-slate-700 hover:border-red-500/50 bg-slate-950 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Upload className="w-5 h-5 text-slate-400 mb-1" />
              <span className="text-xs text-slate-300 font-semibold">
                Capture / Upload Injury Photo
              </span>
              <span className="text-[10px] text-slate-500">
                Helps ER pre-pare trauma team
              </span>
            </label>

            {photoPreview && (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-medium">
              Additional Details / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Helmet found 10m away, rider trapped under barrier, groaning in pain..."
              rows={2}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
            />
          </div>
        </div>

        {/* SUBMIT EMERGENCY BUTTON */}
        <button
          type="submit"
          className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
            computedPriority === 'RED'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-600/40 border border-red-400'
              : computedPriority === 'ORANGE'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-orange-600/40 border border-orange-400'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-amber-500/40 border border-amber-300'
          }`}
        >
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span>SUBMIT EMERGENCY REPORT &bull; {computedPriority} PRIORITY</span>
        </button>
      </form>
    </div>
  );
};
