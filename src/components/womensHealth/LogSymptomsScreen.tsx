import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Moon,
  Activity,
  Droplet,
  Sparkles,
  FileText,
  Heart,
  Info,
  ArrowRight
} from 'lucide-react';
import { SymptomLogEntry } from '../../types';

export const LogSymptomsScreen: React.FC = () => {
  const { navigateBack, setCurrentScreen, saveSymptomLog, mensCycle, t } = useApp();

  // Symptom checklist
  const predefinedSymptoms = [
    'Abdominal pain',
    'Pelvic pain',
    'Headache',
    'Fatigue',
    'Acne',
    'Hair growth changes',
    'Hair loss',
    'Irregular period',
    'Heavy period',
    'Missed period',
    'Mood changes',
    'Weight changes',
    'Increased thirst',
    'Frequent urination'
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    mensCycle.loggedSymptomsToday || []
  );
  const [customSymptoms, setCustomSymptoms] = useState('');
  
  // Menstrual info
  const [cycleDay, setCycleDay] = useState(14);
  const [phase, setPhase] = useState<'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal'>('Ovulatory');
  const [flowIntensity, setFlowIntensity] = useState<'None' | 'Spotting' | 'Light' | 'Moderate' | 'Heavy'>('None');

  // Sleep & Activity
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState<'Poor' | 'Fair' | 'Good' | 'Restful'>('Good');
  const [activityType, setActivityType] = useState('Walking & Light Stretch');
  const [activityMinutes, setActivityMinutes] = useState(30);
  const [waterIntake, setWaterIntake] = useState(2.5);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry: SymptomLogEntry = {
      id: `LOG-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      symptoms: selectedSymptoms,
      customSymptoms: customSymptoms.trim() || undefined,
      menstrualInfo: {
        cycleDay,
        phase,
        flowIntensity: flowIntensity === 'None' ? undefined : (flowIntensity as any)
      },
      sleepHours,
      sleepQuality,
      physicalActivity: {
        activityType,
        durationMinutes: activityMinutes
      },
      waterIntakeLiters: waterIntake,
      notes: notes.trim() || 'Logged daily symptoms.'
    };

    saveSymptomLog(entry);
    setCurrentScreen('WOMENS_HEALTH_GUIDANCE');
  };

  return (
    <div className="flex-1 p-4 pb-28 space-y-4 animate-fadeIn">
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
          <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">
            Daily Health Tracker
          </span>
          <h1 className="text-sm font-bold text-white">
            {t.logSymptoms}
          </h1>
        </div>

        <div className="w-9" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* 1. SYMPTOM CHECKLIST */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Select Today's Symptoms
              </h2>
            </div>
            <span className="text-[10px] font-mono text-teal-300 font-bold">
              {selectedSymptoms.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {predefinedSymptoms.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym);
              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => toggleSymptom(sym)}
                  className={`p-2.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-xs'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="truncate pr-1">{sym}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-teal-500 text-slate-950' : 'border border-slate-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Symptoms Input */}
          <div className="pt-1">
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">
              Other / Custom Symptoms:
            </label>
            <input
              type="text"
              value={customSymptoms}
              onChange={(e) => setCustomSymptoms(e.target.value)}
              placeholder="e.g. Mild lower back tension, sweet cravings..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>

        {/* 2. MENSTRUAL CYCLE INFO */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Menstrual Cycle Info
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                Current Cycle Day:
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={cycleDay}
                onChange={(e) => setCycleDay(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                Phase Estimate:
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Menstrual">Menstrual Phase</option>
                <option value="Follicular">Follicular Phase</option>
                <option value="Ovulatory">Ovulatory Window</option>
                <option value="Luteal">Luteal Phase</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">
              Flow Intensity:
            </label>
            <div className="grid grid-cols-5 gap-1 text-[10px] font-semibold">
              {['None', 'Spotting', 'Light', 'Moderate', 'Heavy'].map((flow) => (
                <button
                  key={flow}
                  type="button"
                  onClick={() => setFlowIntensity(flow as any)}
                  className={`py-2 rounded-xl border transition-colors ${
                    flowIntensity === flow
                      ? 'bg-rose-600 text-white border-rose-500 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {flow}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SLEEP, ACTIVITY & WATER */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Sleep, Activity & Hydration
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1 flex items-center gap-1">
                <Moon className="w-3 h-3 text-indigo-400" /> Sleep (Hours):
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                Sleep Quality:
              </label>
              <select
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Restful">Restful & Deep</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair / Interrupted</option>
                <option value="Poor">Poor / Insomnia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                Activity Duration (Mins):
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={activityMinutes}
                onChange={(e) => setActivityMinutes(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-cyan-400" /> Water (Liters):
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={waterIntake}
                onChange={(e) => setWaterIntake(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" /> Personal Daily Notes:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling overall today?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-xs shadow-xl shadow-teal-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <span>Save Log & View Today's Health Guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
