import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wifi,
  Signal,
  Battery,
  Smartphone,
  Maximize2,
  Code,
  Shield,
  Truck,
  Building2,
  Activity,
  LogOut,
  KeyRound
} from 'lucide-react';

export const AndroidFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentRole,
    authSession,
    isAuthenticated,
    logout,
    deviceFrame,
    setDeviceFrame,
    setIsKotlinCodeOpen,
    notificationToast
  } = useApp();

  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start selection:bg-red-500/30 selection:text-white">
      {/* TOP DESKTOP APP CONTROL BAR */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-2.5 z-40 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center shadow-md shadow-red-500/20 text-white font-black text-sm">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-sm sm:text-base">
                  Smart Triage
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 font-semibold">
                  Android Native Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Emergency Healthcare & Hospital-Ambulance Network
              </p>
            </div>
          </div>

          {/* Locked Current Portal Info & Dedicated Log Out Button */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
              <KeyRound className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-bold text-slate-200">Secure Sign-In</span>
              <span className="text-[11px] text-slate-500 font-mono hidden md:inline">• Enter credentials to access portal</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {/* Portal Identity Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold">
                {currentRole === 'PUBLIC_USER' && (
                  <>
                    <div className="p-1 rounded-lg bg-emerald-950 border border-emerald-800">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-bold text-emerald-400 block text-xs">Citizen Portal</span>
                      <span className="text-[10px] text-slate-400 font-normal">{authSession.name}</span>
                    </div>
                  </>
                )}

                {currentRole === 'AMBULANCE_DRIVER' && (
                  <>
                    <div className="p-1 rounded-lg bg-amber-950 border border-amber-800">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-bold text-amber-400 block text-xs">108 Ambulance Driver</span>
                      <span className="text-[10px] text-slate-400 font-normal">{authSession.name}</span>
                    </div>
                  </>
                )}

                {currentRole === 'HOSPITAL_STAFF' && (
                  <>
                    <div className="p-1 rounded-lg bg-blue-950 border border-blue-800">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-bold text-blue-400 block text-xs">Hospital ER Staff</span>
                      <span className="text-[10px] text-slate-400 font-normal">{authSession.name}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Dedicated Log Out Button */}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 hover:text-white transition-colors shadow-sm ml-1"
                title="Log out and return to Login Screen to switch user"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          {/* Frame & Code toggles */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => setIsKotlinCodeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              title="View Kotlin & Jetpack Compose Architecture Reference"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Kotlin / Compose Code</span>
            </button>

            <button
              onClick={() => setDeviceFrame(!deviceFrame)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
              title={deviceFrame ? 'Switch to Full Screen View' : 'Switch to Android Phone View'}
            >
              {deviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{deviceFrame ? 'Expand View' : 'Phone Frame'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATION FLOATING */}
      {notificationToast && (
        <div className="fixed top-14 z-50 animate-bounce transition-all px-4 pointer-events-none">
          <div
            className={`px-4 py-2.5 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2 ${
              notificationToast.type === 'urgent'
                ? 'bg-red-600 text-white border-red-400 shadow-red-600/30'
                : notificationToast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-100 border-slate-700 shadow-black/40'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0 animate-spin" />
            <span>{notificationToast.message}</span>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {deviceFrame ? (
          /* ANDROID PHONE MOCKUP SHELL */
          <div className="w-full max-w-[420px] h-[92vh] max-h-[860px] bg-slate-900 border-[7px] border-slate-800 rounded-[48px] shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-slate-700/60">
            {/* ANDROID STATUS BAR */}
            <div className="bg-slate-900 text-slate-300 text-xs px-6 pt-3 pb-1 flex items-center justify-between select-none z-30 shrink-0">
              <span className="font-semibold tracking-tight text-[12px]">{currentTime}</span>
              
              {/* Camera Notch Punch hole */}
              <div className="w-3.5 h-3.5 bg-black rounded-full border border-slate-800 mx-auto shadow-inner" />

              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-mono">98%</span>
                  <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                </div>
              </div>
            </div>

            {/* SCREEN SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-100 relative scrollbar-none flex flex-col">
              {children}
            </div>

            {/* ANDROID GESTURE PILL / BOTTOM BAR */}
            <div className="bg-slate-950 py-2 px-6 flex items-center justify-center shrink-0 border-t border-slate-900">
              <div className="w-28 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        ) : (
          /* FULL SCREEN RESPONSIVE VIEW */
          <div className="w-full max-w-6xl min-h-[84vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-xl flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto text-slate-100 flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
