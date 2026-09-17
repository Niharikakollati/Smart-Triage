import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Play,
  Clock,
  Flame,
  AlertTriangle,
  ChevronLeft,
  CheckCircle2,
  Pause,
  RotateCcw,
  Volume2,
  Shield,
  Layers,
  ChevronRight,
  Heart,
  ExternalLink
} from 'lucide-react';
import { YOGA_LIBRARY } from '../../data/mockData';
import { YogaSession } from '../../types';

export const YogaWellnessScreen: React.FC = () => {
  const { navigateBack, t } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSession, setActiveSession] = useState<YogaSession | null>(null);
  
  // Interactive Session Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(120);

  const categories = [
    { id: 'ALL', label: 'All Sessions' },
    { id: 'BEGINNER', label: 'Beginner Yoga' },
    { id: 'STRESS_RELIEF', label: 'Stress Management' },
    { id: 'FITNESS', label: 'General Fitness' },
    { id: 'RECOVERY', label: 'Joint & Trauma Recovery' }
  ];

  const filteredSessions = selectedCategory === 'ALL'
    ? YOGA_LIBRARY
    : YOGA_LIBRARY.filter((s) => s.category === selectedCategory);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && activeSession) {
      if (currentPoseIndex < activeSession.poses.length - 1) {
        setCurrentPoseIndex((prev) => prev + 1);
        setSecondsRemaining(activeSession.poses[currentPoseIndex + 1].durationSec);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, secondsRemaining, currentPoseIndex, activeSession]);

  const handleStartSession = (session: YogaSession) => {
    setActiveSession(session);
    setCurrentPoseIndex(0);
    setSecondsRemaining(session.poses[0].durationSec);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setActiveSession(null);
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
            {t.yogaWellness}
          </h1>
          <p className="text-[11px] text-teal-400 font-medium">Pranayama, Alignment & Somatics</p>
        </div>
        <div className="w-9" />
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SESSIONS VIDEO LIBRARY LIST */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl hover:border-teal-500/50 transition-all flex flex-col"
          >
            {/* Thumbnail Video Banner */}
            <div
              className="relative w-full h-44 bg-slate-950 overflow-hidden group cursor-pointer"
              onClick={() => handleStartSession(session)}
            >
              <img
                src={session.thumbnailUrl}
                alt={session.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/40 group-hover:scale-110 group-active:scale-95 transition-all">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-slate-900/90 text-teal-300 px-2 py-0.5 rounded-lg border border-slate-700">
                  {session.difficulty}
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-400" />
                  {session.durationMinutes} mins
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-teal-300">
                  Target: {session.targetArea}
                </span>
                <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold">
                  <Flame className="w-3 h-3" />
                  ~{session.caloriesBurnEstimate} kcal
                </span>
              </div>
            </div>

            {/* Session Card Info */}
            <div className="p-4 space-y-3 text-xs">
              <h2 className="text-sm font-bold text-white leading-snug">
                {session.title}
              </h2>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {session.description}
              </p>

              {/* Safety Precautions Box */}
              <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Safety Precaution:
                </span>
                <p className="text-slate-400 text-[10px] leading-tight">
                  {session.precautions[0]}
                </p>
              </div>

              {/* ACTION BUTTONS: APP GUIDED PRACTICE & YOUTUBE INTENT */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleStartSession(session)}
                  className="py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/30 flex items-center justify-center gap-1.5 transition-colors active:scale-98"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Interactive Flow</span>
                </button>

                <a
                  href={session.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 transition-colors active:scale-98 text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.watchOnYoutube}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DISCLAIMER BOX */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 space-y-1 text-slate-500 text-[10px] leading-relaxed">
        <p className="font-semibold text-slate-400 uppercase">Wellness & Rehabilitation Notice:</p>
        <p>
          Yoga sessions are intended for general mobility, relaxation, and physical well-being. Yoga is not a cure for medical conditions or acute injuries. Please consult a physician before starting any new movement program.
        </p>
      </div>

      {/* FULLSCREEN GUIDED SESSION PLAYER MODAL */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 flex flex-col justify-between animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClosePlayer}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              ✕ Exit Session
            </button>
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">
                POSE {currentPoseIndex + 1} OF {activeSession.poses.length}
              </span>
              <h3 className="text-xs font-bold text-white">
                {activeSession.title}
              </h3>
            </div>
            <div className="w-12" />
          </div>

          {/* Center Pose Guidance Card */}
          <div className="my-auto rounded-3xl bg-slate-900 border border-teal-500/40 p-6 text-center space-y-5 shadow-2xl">
            <div>
              <span className="text-xs font-mono text-teal-400 italic">
                {activeSession.poses[currentPoseIndex].sanskritName}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {activeSession.poses[currentPoseIndex].englishName}
              </h2>
            </div>

            {/* Big Countdown Timer Circle */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-teal-400 border-t-transparent animate-spin" />
              
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white font-mono">
                  {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-teal-300 uppercase font-semibold">
                  Remaining
                </span>
              </div>
            </div>

            {/* Pose Key Tips & Benefits */}
            <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-800 text-xs space-y-1.5 text-left">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 font-medium">
                  {activeSession.poses[currentPoseIndex].keyTip}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                Benefit: {activeSession.poses[currentPoseIndex].benefits}
              </p>
            </div>

            {/* Controls: Play/Pause, Next */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/40 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentPoseIndex < activeSession.poses.length - 1) {
                    setCurrentPoseIndex((p) => p + 1);
                    setSecondsRemaining(activeSession.poses[currentPoseIndex + 1].durationSec);
                  }
                }}
                disabled={currentPoseIndex >= activeSession.poses.length - 1}
                className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-xs border border-slate-700 flex items-center gap-1"
              >
                <span>Next Pose</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 pb-2">
            Inhale deeply through your nose, exhale fully through mouth.
          </div>
        </div>
      )}
    </div>
  );
};
