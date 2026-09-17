import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Apple,
  Activity,
  Heart,
  AlertTriangle,
  Play,
  ExternalLink,
  Shield,
  ArrowRight,
  Droplet
} from 'lucide-react';
import { YOGA_LIBRARY } from '../../data/mockData';

export const HealthGuidanceScreen: React.FC = () => {
  const { navigateBack, latestLoggedSymptoms, mensCycle, setCurrentScreen, t } = useApp();

  const activeSymptoms = latestLoggedSymptoms?.symptoms || mensCycle.loggedSymptomsToday || [];

  // Tailored educational suggestions based on logged symptoms
  const hasFatigue = activeSymptoms.includes('Fatigue');
  const hasCramps = activeSymptoms.includes('Abdominal pain') || activeSymptoms.includes('Pelvic pain');
  const hasAcne = activeSymptoms.includes('Acne') || activeSymptoms.includes('Hair growth changes');
  const hasMood = activeSymptoms.includes('Mood changes');

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
          <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">
            Personalized Insights
          </span>
          <h1 className="text-sm font-bold text-white">
            {t.todaysHealthGuidance}
          </h1>
        </div>

        <div className="w-9" />
      </div>

      {/* LOGGED SYMPTOMS SUMMARY PILL STRIP */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Logged Today:
          </span>
          <button
            type="button"
            onClick={() => setCurrentScreen('WOMENS_HEALTH_LOG_SYMPTOMS')}
            className="text-[10px] text-teal-400 font-semibold hover:underline"
          >
            Edit Symptoms
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {activeSymptoms.length > 0 ? (
            activeSymptoms.map((sym, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold"
              >
                {sym}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500 italic">No symptoms logged today.</span>
          )}
        </div>
      </div>

      {/* 1. NON-DIAGNOSTIC EDUCATIONAL SUGGESTIONS */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Educational Observations & Self-Care
          </h2>
        </div>

        <div className="space-y-2 text-xs">
          {hasCramps && (
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-rose-400">For Abdominal & Pelvic Tension</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Localized warm compress or a hot water bottle placed over the lower abdomen promotes microcirculation and eases uterine smooth muscle contractions. Gentle magnesium-rich foods (such as pumpkin seeds or almonds) support muscle relaxation.
              </p>
            </div>
          )}

          {hasFatigue && (
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">For Energy Dips & Fatigue</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Prioritize steady-release complex carbohydrates paired with protein over quick sugar snacks to prevent glucose rollercoasters. Ensure daily hydration meets 2.5L and schedule 15 minutes of outdoor sunlight.
              </p>
            </div>
          )}

          {hasAcne && (
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-purple-400">For Hormonal Skin & Hair Balance</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Focus on anti-inflammatory nutrients, spearmint herbal tea, and low-glycemic meal balance which help regulate androgen and insulin sensitivity pathways over time.
              </p>
            </div>
          )}

          {!hasCramps && !hasFatigue && !hasAcne && (
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-teal-400">General Metabolic & Hormonal Wellness</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Maintain consistent circadian sleep cycles, nourish your gut with prebiotic fiber, and engage in daily restorative somatic movement to support balanced hormone clearance.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. LIFESTYLE & NUTRITION ADVICE */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Apple className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Daily Nutrition & Hydration Focus
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Recommended Meals:</span>
            <p className="text-slate-300 text-[11px]">
              High-fiber bowls, leafy greens, quinoa, lentils, and healthy fats (chia seeds, walnuts).
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Hydration Goal:</span>
            <p className="text-slate-300 text-[11px]">
              2.5 – 3.0 Liters with electrolytes or lemon water.
            </p>
          </div>
        </div>
      </div>

      {/* 3. QUESTIONS TO ASK A DOCTOR */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Questions for Your Next Doctor Visit
          </h2>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <p className="text-[11px] text-slate-400 font-medium">
            Save or note down these points for your gynecologist or physician:
          </p>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>"Would a pelvic ultrasound or hormone panel (LH/FSH/Free Testosterone) be recommended given my recent cycle patterns?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>"Should we evaluate fasting insulin or HbA1c to assess metabolic sensitivity?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>"Are my current symptom severity levels typical, or would targeted clinical therapy help?"</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. RECOMMENDED WELLNESS VIDEOS (WITH YOUTUBE LINKS) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Recommended Wellness Practices
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentScreen('YOGA')}
            className="text-[10px] text-amber-400 font-bold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-2">
          {YOGA_LIBRARY.slice(0, 2).map((session) => (
            <div
              key={session.id}
              className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5 max-w-[200px]">
                <h4 className="font-bold text-white truncate">{session.title}</h4>
                <p className="text-[10px] text-slate-400">{session.durationMinutes} mins • {session.difficulty}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={session.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-md shadow-red-900/30"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PROMINENT NON-DIAGNOSTIC DISCLAIMER */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3.5 space-y-1 text-slate-400 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Non-Diagnostic Disclaimer</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          This guidance is provided strictly for educational and wellness purposes. It is not a medical diagnosis or treatment plan. If you experience severe, persistent, or sudden pain, please consult a qualified healthcare professional immediately.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCurrentScreen('WOMENS_HEALTH')}
        className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
      >
        Return to Women's Health Hub
      </button>
    </div>
  );
};
