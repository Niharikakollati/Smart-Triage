import React from 'react';
import { Radio, Crosshair, AlertTriangle, ShieldCheck, Settings, RefreshCw, MapPin } from 'lucide-react';
import { AmbulanceLocationState } from '../../hooks/useAmbulanceLocation';

interface AmbulanceLocationTrackingCardProps {
  locationState: AmbulanceLocationState;
  isOnline: boolean;
  onToggleOnline: () => void;
  onRequestPermission: () => void;
  onOpenSettings?: () => void;
}

export const AmbulanceLocationTrackingCard: React.FC<AmbulanceLocationTrackingCardProps> = ({
  locationState,
  isOnline,
  onToggleOnline,
  onRequestPermission,
  onOpenSettings
}) => {
  const isTracking = isOnline && locationState.isTracking;

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl space-y-3">
      {/* HEADER: STATUS & TOGGLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isTracking ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            <Radio className={`w-4 h-4 ${isTracking ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                📍 Location Tracking
              </span>
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                isTracking
                  ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {isTracking ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {isTracking
                ? 'Broadcasting live GPS coordinates to 108 Dispatch Grid'
                : 'Tracking stopped. Turn ON availability to activate location stream.'}
            </p>
          </div>
        </div>
      </div>

      {/* GPS TELEMETRY READOUT */}
      {isTracking ? (
        <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800/90 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold block">Latitude:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {locationState.lat.toFixed(5)}° N
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold block">Longitude:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {locationState.lng.toFixed(5)}° E
              </span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 font-mono">
              <Crosshair className="w-3 h-3 text-amber-400" />
              Accuracy: ±{locationState.accuracy || 10}m
            </span>
            <span className="font-mono text-slate-300">
              Last updated: {locationState.lastUpdated}
            </span>
          </div>

          {/* DEMO / REAL GPS BADGE */}
          {locationState.isSampleLocation ? (
            <div className="flex items-center justify-between bg-amber-950/40 border border-amber-500/40 rounded-xl px-2.5 py-1.5 text-[10px] text-amber-300">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Showing marked sample demo GPS coordinates</span>
              </span>
              <button
                type="button"
                onClick={onRequestPermission}
                className="underline font-bold text-amber-200 hover:text-white"
              >
                Use Real GPS
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-2.5 py-1 text-[10px] text-emerald-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Real device GPS active & transmitting</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Location tracking is paused while offline.
          </span>
          <button
            type="button"
            onClick={onToggleOnline}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md shadow-emerald-600/20"
          >
            Go Online
          </button>
        </div>
      )}

      {/* PERMISSION DENIED BANNER WITH OPEN SETTINGS ACTION */}
      {locationState.permissionState === 'denied' && (
        <div className="bg-rose-950/50 border border-rose-500/50 rounded-2xl p-3 space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="font-bold text-rose-200 text-xs">Location Permission Required</h4>
              <p className="text-[11px] text-rose-300/90 leading-relaxed">
                Location access is required to share the ambulance's location with the emergency coordination system and help navigate to patients.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onRequestPermission}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] shadow-sm"
            >
              Grant Permission
            </button>
            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] border border-slate-700 flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                <span>Open Settings</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
