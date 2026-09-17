import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Layers,
  Crosshair,
  Truck,
  Building2,
  AlertOctagon,
  Compass,
  Maximize2
} from 'lucide-react';
import { IncidentReport, HospitalFacility, TriagePriority } from '../../types';
import { PRIORITY_CONFIG } from '../../data/mockData';

interface AmbulanceTacticalMapProps {
  ambulanceCoords: { lat: number; lng: number };
  isSampleLocation: boolean;
  selectedIncident?: IncidentReport;
  destinationHospital?: HospitalFacility;
  nearbyIncidents?: IncidentReport[];
  onSelectIncident?: (incident: IncidentReport) => void;
  heightClass?: string;
  showNavigationButton?: boolean;
}

export const AmbulanceTacticalMap: React.FC<AmbulanceTacticalMapProps> = ({
  ambulanceCoords,
  isSampleLocation,
  selectedIncident,
  destinationHospital,
  nearbyIncidents = [],
  onSelectIncident,
  heightClass = 'h-64 sm:h-72',
  showNavigationButton = true
}) => {
  const [mapLayer, setMapLayer] = useState<'roadmap' | 'satellite'>('roadmap');

  const destinationCoords = destinationHospital
    ? { lat: 28.4595, lng: 77.0266, name: destinationHospital.name }
    : selectedIncident
    ? { lat: selectedIncident.coordinates.lat, lng: selectedIncident.coordinates.lng, name: selectedIncident.locationName }
    : null;

  // Google Maps Deep Link / Navigation Intent URL
  const navUrl = destinationCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords.lat},${destinationCoords.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${ambulanceCoords.lat},${ambulanceCoords.lng}`;

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl space-y-2 p-3.5">
      {/* MAP HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">
            Tactical Emergency Map
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMapLayer(mapLayer === 'roadmap' ? 'satellite' : 'roadmap')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 hover:text-white transition-colors"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span>{mapLayer === 'roadmap' ? 'Satellite' : 'Vector'}</span>
          </button>
        </div>
      </div>

      {/* MAP CANVAS */}
      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col justify-between p-3 select-none`}>
        {/* Dynamic Map Visual Texture */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-60"
          style={{
            backgroundImage:
              mapLayer === 'roadmap'
                ? 'radial-gradient(#334155 1.2px, transparent 1.2px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)'
                : 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&auto=format&fit=crop&q=80)',
            backgroundSize: mapLayer === 'roadmap' ? '24px 24px, 48px 48px, 48px 48px' : 'cover'
          }}
        />

        {/* Tactical Simulated Route Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Simulated highway path from ambulance to emergency */}
          <path
            d="M 60 160 Q 140 100 200 120 T 320 80"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* TOP STATUS BAR: GPS BADGES */}
        <div className="relative z-20 flex items-center justify-between gap-2">
          <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 shadow-md">
            <Crosshair className="w-3 h-3 animate-spin" />
            <span>
              {ambulanceCoords.lat.toFixed(4)}° N, {ambulanceCoords.lng.toFixed(4)}° E
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isSampleLocation ? (
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg">
                Demo Sample Location
              </span>
            ) : (
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live GPS
              </span>
            )}
          </div>
        </div>

        {/* MAP MARKERS */}
        <div className="relative z-20 w-full h-full flex items-center justify-between px-6">
          {/* 1. AMBULANCE MARKER (Left / Origin) */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-60" />
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border-2 border-white text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-900/60">
                <Truck className="w-5 h-5 font-black" />
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 shadow-md whitespace-nowrap">
              ALS Ambulance
            </span>
          </div>

          {/* 2. INCIDENT MARKER (Middle / Destination) */}
          {selectedIncident && (
            <div className="flex flex-col items-center animate-bounce">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-500 opacity-75" />
                <div className={`w-9 h-9 rounded-2xl border-2 border-white text-white flex items-center justify-center shadow-xl ${
                  selectedIncident.priority === 'RED' ? 'bg-red-600 shadow-red-900/60' : 'bg-amber-600 shadow-amber-900/60'
                }`}>
                  <AlertOctagon className="w-5 h-5" />
                </div>
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-red-300 text-[10px] font-bold border border-red-500/50 shadow-md whitespace-nowrap">
                #{selectedIncident.id} ({selectedIncident.priority})
              </span>
            </div>
          )}

          {/* 3. HOSPITAL DESTINATION MARKER (Right) */}
          {destinationHospital && (
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white text-white flex items-center justify-center shadow-xl shadow-blue-900/60">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-blue-300 text-[10px] font-bold border border-blue-500/40 shadow-md whitespace-nowrap">
                {destinationHospital.name.split(' ')[0]} ER
              </span>
            </div>
          )}
        </div>

        {/* BOTTOM DESTINATION STRIP */}
        <div className="relative z-20 bg-slate-950/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="truncate pr-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              {destinationHospital ? 'Hospital ER Destination:' : 'Incident GPS Target:'}
            </span>
            <p className="font-semibold text-white truncate text-[11px]">
              {destinationCoords ? destinationCoords.name : 'Sector 44 Grid Navigation'}
            </p>
          </div>

          <a
            href={navUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[10px] font-black text-amber-400 hover:text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/80 transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* LARGE DIRECT NAVIGATION BUTTON */}
      {showNavigationButton && destinationCoords && (
        <div className="pt-1">
          <a
            href={navUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 transition-all active:scale-98 text-center"
          >
            <Navigation className="w-4 h-4 text-amber-400 fill-current" />
            <span>
              {destinationHospital ? '🗺️ NAVIGATE TO HOSPITAL' : '🗺️ NAVIGATE TO PATIENT'}
            </span>
          </a>
        </div>
      )}
    </div>
  );
};
