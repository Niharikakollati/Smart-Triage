import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Layers, Crosshair } from 'lucide-react';

interface GoogleMapCardProps {
  latitude: number;
  longitude: number;
  locationName: string;
  landmark?: string;
  zoomLevel?: number;
  title?: string;
  interactive?: boolean;
  className?: string;
  showNavigationButton?: boolean;
}

export const GoogleMapCard: React.FC<GoogleMapCardProps> = ({
  latitude,
  longitude,
  locationName,
  landmark,
  title = 'Google Maps Location',
  className = '',
  showNavigationButton = true
}) => {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Google Maps Deep Link / Web intent URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className={`rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg space-y-2 p-3 ${className}`}>
      {/* MAP HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300 hover:text-white"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span>{mapType === 'roadmap' ? 'Satellite' : 'Vector'}</span>
          </button>
        </div>
      </div>

      {/* MAP CANVAS DISPLAY */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col justify-between p-3">
        {/* Dynamic map visual background */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-60"
          style={{
            backgroundImage:
              mapType === 'roadmap'
                ? 'radial-gradient(#475569 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)'
                : 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80)',
            backgroundSize: mapType === 'roadmap' ? '20px 20px, 40px 40px, 40px 40px' : 'cover'
          }}
        />

        {/* GPS Coordinates & Accuracy Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <Crosshair className="w-3 h-3 animate-spin" />
            <span>GPS: {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E</span>
          </div>

          <span className="text-[10px] bg-red-600/90 text-white font-bold px-2 py-0.5 rounded-md shadow-xs">
            LIVE PIN
          </span>
        </div>

        {/* Center Target Marker */}
        <div className="relative z-10 self-center my-auto flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75"></span>
            <div className="w-9 h-9 rounded-full bg-red-600 border-2 border-white text-white flex items-center justify-center shadow-xl shadow-red-900/60">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-red-300 text-[10px] font-bold border border-red-500/50 shadow-md">
            {locationName.split(',')[0]}
          </span>
        </div>

        {/* Map Bottom Information Strip */}
        <div className="relative z-10 bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="truncate pr-2">
            <p className="font-semibold text-white truncate">{locationName}</p>
            {landmark && <p className="text-[10px] text-amber-400 truncate">Near: {landmark}</p>}
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-950/50 px-2 py-1 rounded-lg border border-amber-800/80"
          >
            <span>View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ACTION: OPEN IN GOOGLE MAPS NAVIGATION */}
      {showNavigationButton && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-800 flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>Open in Maps</span>
          </a>

          <a
            href={navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Navigation</span>
          </a>
        </div>
      )}
    </div>
  );
};
