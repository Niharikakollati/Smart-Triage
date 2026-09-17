import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Sparkles,
  Droplet,
  Heart,
  Activity,
  FileText,
  AlertTriangle,
  Upload,
  ChevronRight,
  ChevronLeft,
  Info,
  Clock,
  Shield,
  Apple,
  Dumbbell,
  Play,
  Plus
} from 'lucide-react';
import { HEALTH_GUIDES, YOGA_LIBRARY } from '../../data/mockData';
import { HealthGuideArticle } from '../../types';

export const WomensHealthScreen: React.FC = () => {
  const { mensCycle, reports, addReport, navigateBack, setCurrentScreen, latestLoggedSymptoms, t } = useApp();

  const [activeTab, setActiveTab] = useState<'CYCLE' | 'EDUCATION' | 'REPORTS'>('CYCLE');
  const [selectedGuide, setSelectedGuide] = useState<HealthGuideArticle | null>(null);

  const activeSymptoms = latestLoggedSymptoms?.symptoms || mensCycle.loggedSymptomsToday || [];

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
            {t.womensHealth} & Hormonal Wellness
          </h1>
          <p className="text-[11px] text-teal-400 font-medium">Cycle, Nutrition & Metabolic Support</p>
        </div>
        <div className="w-9" />
      </div>

      {/* QUICK ACTION: LOG TODAY'S SYMPTOMS PROMINENT BUTTON */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-900/60 via-slate-900 to-slate-900 border-2 border-teal-500/40 p-4 shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider block">
            Daily Wellness Check-In
          </span>
          <h2 className="text-sm font-black text-white">
            {activeSymptoms.length > 0 ? `${activeSymptoms.length} Symptoms Logged Today` : 'Track Your Symptoms'}
          </h2>
          <p className="text-[11px] text-slate-400">
            Log physical cues to generate tailored self-care guidance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentScreen('WOMENS_HEALTH_LOG_SYMPTOMS')}
          className="px-4 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/30 flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.logSymptoms}</span>
        </button>
      </div>

      {/* SEGMENTED TAB SELECTOR */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('CYCLE')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'CYCLE'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Cycle Tracker
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('EDUCATION')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'EDUCATION'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          PCOS & Guides
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('REPORTS')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'REPORTS'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Medical Reports
        </button>
      </div>

      {/* TAB 1: MENSTRUAL CYCLE OVERVIEW */}
      {activeTab === 'CYCLE' && (
        <div className="space-y-4">
          {/* Cycle Dial Card */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Current Cycle: Day 14
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                {mensCycle.currentPhase} PHASE
              </span>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative w-36 h-36 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950 shadow-inner">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin duration-3000 opacity-60" />
                <div className="text-center">
                  <span className="text-3xl font-black text-white font-mono">
                    {mensCycle.nextPeriodDays}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Days to Period
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Fertile Window:</span>
                <span className="text-xs font-bold text-teal-300">
                  {mensCycle.fertileWindowDays}
                </span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Average Cycle:</span>
                <span className="text-xs font-bold text-white font-mono">
                  {mensCycle.cycleLength} Days
                </span>
              </div>
            </div>

            {/* Link to Today's Guidance */}
            <button
              type="button"
              onClick={() => setCurrentScreen('WOMENS_HEALTH_GUIDANCE')}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>View Today's Health Guidance</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Logged symptoms preview */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider">
                Logged Symptoms & Notes
              </span>
              <button
                type="button"
                onClick={() => setCurrentScreen('WOMENS_HEALTH_LOG_SYMPTOMS')}
                className="text-teal-400 font-semibold text-[11px] hover:underline"
              >
                + Log More
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeSymptoms.map((sym, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-medium"
                >
                  {sym}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PCOS & NUTRITIONAL GUIDES */}
      {activeTab === 'EDUCATION' && (
        <div className="space-y-3">
          {HEALTH_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                  {guide.category.replace(/_/g, ' ')}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                  <Apple className="w-3.5 h-3.5" /> Dietary Guidance:
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {guide.dietaryRecommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs */}
              <div className="bg-amber-950/20 p-2.5 rounded-2xl border border-amber-900/50 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> When to See a Gynecologist:
                </span>
                <p className="text-[11px] text-amber-200/90">
                  {guide.warningSigns[0]}
                </p>
              </div>

              <p className="text-[10px] text-slate-500 italic">
                {guide.disclaimer}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MEDICAL REPORTS & SUMMARIES */}
      {activeTab === 'REPORTS' && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Uploaded Blood Panels & Ultrasounds
              </span>
              <span className="text-[10px] font-mono text-teal-400 font-bold">
                {reports.length} Records
              </span>
            </div>

            <div className="space-y-3">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-400" />
                      <span className="font-bold text-white truncate max-w-[180px]">
                        {rep.fileName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{rep.uploadDate}</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-teal-300 uppercase">
                      Extracted Clinical Metrics:
                    </span>
                    <ul className="space-y-0.5 text-slate-300 text-[11px]">
                      {rep.findings.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-teal-400">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[10px] text-slate-400 bg-slate-900/40 p-2 rounded-lg border border-slate-800/40 leading-relaxed">
                    {rep.aiExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
