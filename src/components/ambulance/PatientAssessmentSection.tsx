import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  User,
  Thermometer,
  Wind,
  Droplets,
  Bone,
  Info,
  Send,
  FileText,
  Clock,
  Radio,
  Plus,
  X,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  IncidentReport,
  VitalsData,
  InjuryAnalysisResult,
  ConsciousnessStatus,
  BreathingStatus,
  BleedingStatus,
  TriagePriority
} from '../../types';
import { InjuryScanModal } from './InjuryScanModal';

interface PatientAssessmentSectionProps {
  incident: IncidentReport;
  onUpdateVitals?: (vitals: Partial<VitalsData>) => void;
  onUpdateAssessment?: (updates: Partial<IncidentReport>) => void;
}

export const PatientAssessmentSection: React.FC<PatientAssessmentSectionProps> = ({
  incident
}) => {
  const { saveAmbulancePatientDetails } = useApp();

  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [selectedPresetInjury, setSelectedPresetInjury] = useState<string | null>(
    incident.scannedInjuryAnalysis?.detectedInjuryType || null
  );

  // Local editable form state initialized from incident
  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: incident.vitals?.heartRate ?? 112,
    bloodPressureSystolic: incident.vitals?.bloodPressureSystolic ?? 95,
    bloodPressureDiastolic: incident.vitals?.bloodPressureDiastolic ?? 65,
    spO2: incident.vitals?.spO2 ?? 93,
    respiratoryRate: incident.vitals?.respiratoryRate ?? 22,
    temperature: incident.vitals?.temperature ?? 37.1,
    painLevel: incident.vitals?.painLevel ?? 7
  });

  const [consciousness, setConsciousness] = useState<ConsciousnessStatus>(incident.consciousness || 'ALERT');
  const [breathing, setBreathing] = useState<BreathingStatus>(incident.breathing || 'LABORED');
  const [bleeding, setBleeding] = useState<BleedingStatus>(incident.bleeding || 'MODERATE');
  const [priority, setPriority] = useState<TriagePriority>(incident.priority || 'RED');
  const [paramedicNotes, setParamedicNotes] = useState<string>(
    incident.paramedicNotes ||
    'Patient stabilized on vacuum mattress. Cervical collar applied. 18G IV line secured in left antecubital fossa with 500ml normal saline running. High-flow O2 at 10L/min via NRB mask. Pupils equal and reactive to light (PEARL).'
  );
  const [symptomsList, setSymptomsList] = useState<string[]>(incident.otherSymptoms || ['Head trauma', 'Left arm fracture', 'Hypotension']);
  const [newSymptomInput, setNewSymptomInput] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(incident.paramedicTransmittedAt || null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Quick vital increment/decrement helpers
  const adjustVital = (key: keyof VitalsData, delta: number) => {
    setVitals(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta)
    }));
  };

  const handleAddSymptom = (sym: string) => {
    const trimmed = sym.trim();
    if (trimmed && !symptomsList.includes(trimmed)) {
      setSymptomsList(prev => [...prev, trimmed]);
    }
    setNewSymptomInput('');
  };

  const handleRemoveSymptom = (sym: string) => {
    setSymptomsList(prev => prev.filter(s => s !== sym));
  };

  const handleSaveAndTransmit = () => {
    setIsSaving(true);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Call context action which saves data and dispatches notification to hospital staff
    saveAmbulancePatientDetails(incident.id, {
      vitals,
      consciousness,
      breathing,
      bleeding,
      otherSymptoms: symptomsList,
      paramedicNotes,
      priority
    });

    setTimeout(() => {
      setIsSaving(false);
      setLastSavedTime(nowTime);
      setSaveSuccessNotice(`Patient details saved & live notification sent to Hospital ER Staff (${nowTime})`);
    }, 250);
  };

  // First aid guides mapped to injury categories
  const FIRST_AID_GUIDES: Record<string, {
    immediateSteps: string[];
    whatToAvoid: string[];
    whenErRequired: string;
  }> = {
    'Open Wound & Laceration': {
      immediateSteps: [
        'Apply firm, continuous direct pressure with sterile trauma dressing/gauze.',
        'Elevate injured extremity above heart level if no compound fracture is suspected.',
        'Apply pressure bandage; if arterial spurting persists, apply combat tourniquet 2-3 inches proximal to wound.'
      ],
      whatToAvoid: [
        'Do NOT probe or attempt to clean deep wound cavity in the field.',
        'Do NOT remove deeply embedded glass, metal, or foreign objects (stabilize in situ).',
        'Do NOT remove saturated dressings; place additional dressings on top.'
      ],
      whenErRequired: 'Immediate ER trauma resuscitation required for deep fascial tears, tendon involvement, or uncontrolled arterial hemorrhage.'
    },
    'Burn (Thermal / Chemical)': {
      immediateSteps: [
        'Cool thermal burns immediately with clean, room-temperature or cool water (10–20 mins).',
        'Cover loosely with sterile, non-adherent burn dressing or dry sterile sheet.',
        'Administer supplemental high-flow oxygen if inhalation wheezing or facial soot is observed.'
      ],
      whatToAvoid: [
        'Do NOT apply ice, ice water, butter, grease, or adhesive bandages.',
        'Do NOT pop, prick, or debride burn blisters in pre-hospital setting.',
        'Do NOT forcefully remove clothing melted or stuck to the burned skin.'
      ],
      whenErRequired: 'Direct transfer to specialized Burn ICU / ER required for burns >10% TBSA, circumferential limb burns, or facial airway compromise.'
    },
    'Possible Bone Fracture / Deformity': {
      immediateSteps: [
        'Immobilize the joint above and below the suspected fracture with a rigid splint.',
        'Perform PMS check (Pulse, Motor, Sensory) distal to the injury before and after splinting.',
        'Cover open compound bone breaches with sterile moist saline dressing.'
      ],
      whatToAvoid: [
        'Do NOT attempt manual bone reduction or push protruding bone fragments back into the skin.',
        'Do NOT allow the patient to bear weight or move the injured limb.',
        'Do NOT apply tight circumferential tape over swelling.'
      ],
      whenErRequired: 'Urgent orthopedic surgical reduction and radiological scan required immediately upon hospital arrival.'
    },
    'Visible Bleeding (Arterial / Venous)': {
      immediateSteps: [
        'Apply direct bilateral pressure with hemostatic gauze if available.',
        'Keep patient warm with thermal shock blanket to avoid coagulopathy.',
        'Establish large-bore IV line en route and titrate isotonic saline bolus.'
      ],
      whatToAvoid: [
        'Do NOT release pressure to check if bleeding has stopped.',
        'Do NOT use makeshift narrow wire as a tourniquet.',
        'Do NOT give oral fluids or medication.'
      ],
      whenErRequired: 'Emergency blood typing & cross-match alert transmitted to trauma surgical bank.'
    },
    'Bruising & Hematoma': {
      immediateSteps: [
        'Apply cold pack wrapped in cloth to reduce swelling and pain.',
        'Support and rest the affected area with an elastic compression bandage.',
        'Continuously monitor for expanding tense hematoma or compartment firmness.'
      ],
      whatToAvoid: [
        'Do NOT apply direct heat to active hematomas.',
        'Do NOT massage deeply into the bruise or strained muscle.'
      ],
      whenErRequired: 'ER evaluation required if hematoma rapidly expands or causes neurovascular compression.'
    },
    'Swelling & Soft Tissue Edema': {
      immediateSteps: [
        'Elevate limb on pillows/stretcher supports above heart level.',
        'Apply cold compression wrap.',
        'Assess distal capillary refill time (< 2 seconds).'
      ],
      whatToAvoid: [
        'Do NOT constrict circulation with non-elastic bindings.',
        'Do NOT ignore progressive numbness or tingling in extremities.'
      ],
      whenErRequired: 'Immediate ER decompression if compartment syndrome is suspected.'
    },
    'No Obvious Visible Injury': {
      immediateSteps: [
        'Conduct full secondary survey: cervical spine, chest expansion, and abdominal palpation.',
        'Check baseline vitals, GCS score, and blood glucose level.',
        'Maintain spinal precautions if high-velocity impact mechanism is reported.'
      ],
      whatToAvoid: [
        'Do NOT rule out occult internal injuries based purely on lack of external bleeding.',
        'Do NOT allow patient to walk unassisted until spinal stability is confirmed.'
      ],
      whenErRequired: 'Hospital observation advised for high-energy impact or loss of consciousness.'
    }
  };

  const activeFirstAidKey = selectedPresetInjury || 'Open Wound & Laceration';
  const activeFirstAid = FIRST_AID_GUIDES[activeFirstAidKey] || FIRST_AID_GUIDES['Open Wound & Laceration'];

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4 shadow-xl">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Ambulance Paramedic Patient Details
            </h3>
            <span className="text-[10px] text-slate-400">
              Update vitals & clinical details below, then click Save to alert ER Staff
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {lastSavedTime ? (
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Sent {lastSavedTime}</span>
            </span>
          ) : (
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800">
              Draft Mode
            </span>
          )}
        </div>
      </div>

      {/* SUCCESS CONFIRMATION BANNER */}
      {saveSuccessNotice && (
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex-1">
            <span className="font-bold block text-white">{saveSuccessNotice}</span>
            <span className="text-[10px] text-emerald-300/90 block mt-0.5">
              Hospital ER Staff have received this notification and can view complete vitals immediately.
            </span>
          </div>
        </div>
      )}

      {/* 1. TRIAGE LEVEL & CRITICAL STATUS SELECTORS */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Triage Priority */}
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Triage Priority
          </span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TriagePriority)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-1.5 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none"
          >
            <option value="RED">🔴 RED - Immediate / Critical</option>
            <option value="YELLOW">🟡 YELLOW - Urgent / Delayed</option>
            <option value="GREEN">🟢 GREEN - Non-Urgent / Walking</option>
          </select>
        </div>

        {/* Consciousness (AVPU) */}
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Consciousness (AVPU)
          </span>
          <select
            value={consciousness}
            onChange={(e) => setConsciousness(e.target.value as ConsciousnessStatus)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-1.5 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none"
          >
            <option value="ALERT">Alert (A)</option>
            <option value="VOICE_RESPONSIVE">Voice Responsive (V)</option>
            <option value="PAIN_RESPONSIVE">Pain Responsive (P)</option>
            <option value="UNRESPONSIVE">Unresponsive (U)</option>
          </select>
        </div>

        {/* Breathing Status */}
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Breathing Status
          </span>
          <select
            value={breathing}
            onChange={(e) => setBreathing(e.target.value as BreathingStatus)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-1.5 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none"
          >
            <option value="NORMAL">Normal</option>
            <option value="LABORED">Labored</option>
            <option value="SHALLOW">Shallow</option>
            <option value="SEVERE_DISTRESS">Severe Distress</option>
            <option value="NONE">None (Apnea)</option>
          </select>
        </div>

        {/* Visible Bleeding */}
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Visible Bleeding
          </span>
          <select
            value={bleeding}
            onChange={(e) => setBleeding(e.target.value as BleedingStatus)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-1.5 text-xs font-bold text-white focus:ring-1 focus:ring-amber-500 outline-none"
          >
            <option value="NONE">None</option>
            <option value="MINOR">Minor / Capillary</option>
            <option value="MODERATE">Moderate / Venous</option>
            <option value="SEVERE_ARTERIAL">Severe Arterial</option>
          </select>
        </div>
      </div>

      {/* 2. EDITABLE VITALS MONITOR TILES */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>Telemetry Vitals Entry (Adjust / Type):</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">Live Monitor</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {/* Heart Rate */}
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block">Heart Rate</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                value={vitals.heartRate}
                onChange={(e) => setVitals(prev => ({ ...prev, heartRate: Number(e.target.value) }))}
                className="w-14 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-red-400 text-sm py-0.5 outline-none"
              />
              <span className="text-[10px] text-slate-400">bpm</span>
            </div>
            <div className="flex justify-center gap-1 pt-1">
              <button
                type="button"
                onClick={() => adjustVital('heartRate', -5)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-[10px] font-bold"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => adjustVital('heartRate', +5)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-[10px] font-bold"
              >
                +5
              </button>
            </div>
          </div>

          {/* SpO2 */}
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block">SpO2 Oxygen</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                value={vitals.spO2}
                onChange={(e) => setVitals(prev => ({ ...prev, spO2: Number(e.target.value) }))}
                className="w-14 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-blue-400 text-sm py-0.5 outline-none"
              />
              <span className="text-[10px] text-slate-400">%</span>
            </div>
            <div className="flex justify-center gap-1 pt-1">
              <button
                type="button"
                onClick={() => adjustVital('spO2', -1)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-[10px] font-bold"
              >
                -1
              </button>
              <button
                type="button"
                onClick={() => adjustVital('spO2', +1)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-[10px] font-bold"
              >
                +1
              </button>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block">Blood Pressure</span>
            <div className="flex items-center justify-center gap-0.5">
              <input
                type="number"
                value={vitals.bloodPressureSystolic}
                onChange={(e) => setVitals(prev => ({ ...prev, bloodPressureSystolic: Number(e.target.value) }))}
                className="w-10 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-emerald-400 text-xs py-0.5 outline-none"
              />
              <span className="text-slate-500">/</span>
              <input
                type="number"
                value={vitals.bloodPressureDiastolic}
                onChange={(e) => setVitals(prev => ({ ...prev, bloodPressureDiastolic: Number(e.target.value) }))}
                className="w-10 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-emerald-400 text-xs py-0.5 outline-none"
              />
            </div>
            <span className="text-[9px] text-slate-500">mmHg</span>
          </div>

          {/* Temperature & Resp */}
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block">Temp / RR</span>
            <div className="flex items-center justify-center gap-1">
              <input
                type="number"
                step="0.1"
                value={vitals.temperature}
                onChange={(e) => setVitals(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                className="w-11 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-amber-400 text-xs py-0.5 outline-none"
              />
              <span className="text-[10px] text-slate-400">°C</span>
            </div>
            <span className="text-[9px] text-slate-400">RR: {vitals.respiratoryRate} /min</span>
          </div>
        </div>
      </div>

      {/* 3. SYMPTOMS & CLINICAL OBSERVATIONS */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
          Patient Symptoms & Observed Injuries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {symptomsList.map((sym) => (
            <span
              key={sym}
              className="px-2.5 py-1 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-[11px] font-medium flex items-center gap-1.5"
            >
              <span>{sym}</span>
              <button
                type="button"
                onClick={() => handleRemoveSymptom(sym)}
                className="text-red-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add quick symptom */}
        <div className="flex gap-1.5 pt-1">
          <input
            type="text"
            value={newSymptomInput}
            onChange={(e) => setNewSymptomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSymptom(newSymptomInput);
              }
            }}
            placeholder="Add symptom (e.g. Pupil asymmetry, chest pain)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={() => handleAddSymptom(newSymptomInput)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* 4. PARAMEDIC CLINICAL FIELD NOTES */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Paramedic Field Treatment & Interventions:</span>
          </span>
          <span className="text-[10px] text-slate-400">Transmitted to ER Staff</span>
        </div>
        <textarea
          rows={3}
          value={paramedicNotes}
          onChange={(e) => setParamedicNotes(e.target.value)}
          placeholder="Describe interventions administered en route (e.g., collar, IV fluids, tourniquet, splinting, medications)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
        />
      </div>

      {/* 5. BIG SAVE PATIENT DETAILS BUTTON (Triggers notification to hospital staff) */}
      <div className="pt-1">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSaveAndTransmit}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <span>Transmitting live telemetry to ER...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>SAVE PATIENT DETAILS & NOTIFY HOSPITAL ER STAFF</span>
            </>
          )}
        </button>
        <span className="text-[10px] text-slate-400 text-center block mt-1.5">
          🔔 Saving immediately transmits full patient telemetry & sends a high-priority notification to Hospital ER Staff.
        </span>
      </div>

      {/* 6. ML INJURY SCANNER & CLASSIFIER */}
      <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 space-y-2.5 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>AI-Assisted Preliminary Injury Assessment</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">ML Vision Support</span>
        </div>

        {/* SCAN BUTTON */}
        <button
          type="button"
          onClick={() => setIsScanModalOpen(true)}
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Camera className="w-4 h-4 text-slate-950" />
          <span>📷 SCAN INJURY WITH ML CAMERA</span>
        </button>

        {/* SAMPLE INJURY CATEGORY SELECTOR */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Or Select Clinical Category for First-Aid Protocol:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Open Wound & Laceration',
              'Burn (Thermal / Chemical)',
              'Possible Bone Fracture / Deformity',
              'Visible Bleeding (Arterial / Venous)',
              'Bruising & Hematoma',
              'Swelling & Soft Tissue Edema',
              'No Obvious Visible Injury'
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedPresetInjury(cat);
                  handleAddSymptom(cat);
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold border transition-all ${
                  activeFirstAidKey === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7. DEDICATED FIRST-AID & SAFETY GUIDANCE */}
      <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-800 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>First-Aid Guidance: {activeFirstAidKey}</span>
          </h4>
          <span className="text-[9px] font-mono text-slate-400">Standard Protocols</span>
        </div>

        {/* Immediate Steps */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Immediate Safety Steps:
          </span>
          <ul className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
            {activeFirstAid.immediateSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold font-mono text-[10px] mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Avoid */}
        <div className="space-y-1 bg-red-950/20 p-2.5 rounded-xl border border-red-900/40">
          <span className="text-[10px] font-bold text-red-400 uppercase block">
            What to Avoid (Contraindications):
          </span>
          <ul className="space-y-1 text-red-200/90 text-[10px] leading-relaxed">
            {activeFirstAid.whatToAvoid.map((avoid, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-red-400 font-bold font-mono text-[10px] mt-0.5">✕</span>
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When ER Required */}
        <div className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded-xl border border-amber-900/40 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>{activeFirstAid.whenErRequired}</span>
        </div>

        {/* Safety Disclaimer */}
        <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-900 leading-tight">
          Disclaimer: This is general informational guidance and does not replace certified paramedic or medical assessment.
        </div>
      </div>

      {/* SCAN MODAL */}
      <InjuryScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        incidentId={incident.id}
      />
    </div>
  );
};
