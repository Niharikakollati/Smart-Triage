import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, MapPin, PhoneCall, Volume2, VolumeX, X, AlertTriangle } from 'lucide-react';
import { playEmergencyAlarm } from '../../utils/audioAlerts';

export const EmergencySosModal: React.FC = () => {
  const { isSosModalOpen, setIsSosModalOpen, triggerSosEmergency, setCurrentScreen, userProfile } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSosModalOpen) {
      setCountdown(5);
      if (soundEnabled) {
        playEmergencyAlarm();
      }
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleConfirmSos();
            return 0;
          }
          if (soundEnabled) playEmergencyAlarm();
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSosModalOpen, soundEnabled]);

  if (!isSosModalOpen) return null;

  const handleConfirmSos = () => {
    setIsSosModalOpen(false);
    const incidentId = triggerSosEmergency();
    setCurrentScreen('EMERGENCY_CONFIRM');
  };

  const handleCancel = () => {
    setIsSosModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-red-500/50 rounded-3xl p-6 shadow-2xl text-white overflow-hidden">
        {/* Glowing emergency background effect */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-red-800/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar controls */}
        <div className="flex items-center justify-between relative z-10 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono tracking-wider uppercase text-red-400 font-bold">
              CRITICAL SOS DISPATCH
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              title={soundEnabled ? 'Mute Siren' : 'Enable Siren'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={handleCancel}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Pulsing SOS Button / Timer */}
        <div className="relative z-10 flex flex-col items-center justify-center my-6">
          <div className="relative flex items-center justify-center">
            {/* Multi-ring pulse waves */}
            <div className="absolute w-36 h-36 rounded-full bg-red-500/20 animate-ping" />
            <div className="absolute w-44 h-44 rounded-full bg-red-500/10 animate-pulse" />
            
            <button
              onClick={handleConfirmSos}
              className="relative w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center shadow-lg shadow-red-500/50 border-4 border-red-300 active:scale-95 transition-transform"
            >
              <ShieldAlert className="w-10 h-10 text-white animate-bounce" />
              <span className="text-2xl font-black tracking-tight text-white mt-1">
                {countdown}s
              </span>
            </button>
          </div>

          <h2 className="text-xl font-bold text-center mt-6 text-white tracking-tight">
            Broadcasting Emergency Location
          </h2>
          <p className="text-xs text-center text-slate-300 mt-1 max-w-xs">
            Auto-alerting 108 ALS Ambulance & ER Trauma Center in <span className="text-red-400 font-bold">{countdown} seconds</span>
          </p>
        </div>

        {/* Live captured location info box */}
        <div className="relative z-10 bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 mb-5 text-xs space-y-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 font-medium">Auto-Detected GPS Location</p>
              <p className="text-white font-semibold">Cyber Gateway Flyover, Sector 44 (±4m accuracy)</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
            <span>Primary Contact: {userProfile.emergencyContacts[0].name}</span>
            <span className="text-red-400 font-mono">SMS Alert Ready</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          <button
            onClick={handleCancel}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
          >
            Cancel SOS
          </button>
          <button
            onClick={handleConfirmSos}
            className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md shadow-red-600/40 transition-colors flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Send NOW
          </button>
        </div>
      </div>
    </div>
  );
};
