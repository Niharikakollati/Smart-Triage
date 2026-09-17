import React, { useState, useEffect } from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import {
  ShieldAlert,
  Shield,
  Truck,
  Building2,
  Activity,
  LogOut,
  Bell,
  Globe,
  Home,
  AlertOctagon,
  Heart,
  Sparkles,
  User,
  PhoneCall,
  Code,
  CheckCircle2,
  Radio,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { LanguageCode } from '../../types';

export const WebLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentRole,
    currentScreen,
    setCurrentScreen,
    authSession,
    isAuthenticated,
    logout,
    setIsSosModalOpen,
    setIsKotlinCodeOpen,
    notificationToast,
    unreadNotificationsCount,
    currentLanguage,
    setCurrentLanguage,
    t
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  // Role-specific navigation links for the top website header
  const getNavLinks = (): { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] => {
    if (!isAuthenticated) return [];

    if (currentRole === 'PUBLIC_USER') {
      return [
        { id: 'HOME', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
        { id: 'REPORT_ACCIDENT', label: 'Report Incident', icon: <AlertOctagon className="w-4 h-4" />, badge: 'LIVE' },
        { id: 'TRIAGE', label: 'Clinical Triage', icon: <Activity className="w-4 h-4" /> },
        { id: 'WOMENS_HEALTH', label: "Women's Health", icon: <Heart className="w-4 h-4" /> },
        { id: 'YOGA', label: 'Yoga & Wellness', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'PROFILE', label: 'Health Passport', icon: <User className="w-4 h-4" /> }
      ];
    }

    if (currentRole === 'AMBULANCE_DRIVER') {
      return [
        { id: 'AMBULANCE_DASHBOARD', label: 'Dispatch Center', icon: <Truck className="w-4 h-4" /> },
        { id: 'TRIAGE', label: 'Field Triage Protocol', icon: <Activity className="w-4 h-4" /> },
        { id: 'NOTIFICATIONS', label: 'Alerts & Messages', icon: <Bell className="w-4 h-4" /> }
      ];
    }

    if (currentRole === 'HOSPITAL_STAFF') {
      return [
        { id: 'HOSPITAL_DASHBOARD', label: 'ER Command Board', icon: <Building2 className="w-4 h-4" /> },
        { id: 'TRIAGE', label: 'Triage Scoring', icon: <Activity className="w-4 h-4" /> },
        { id: 'NOTIFICATIONS', label: 'Hospital Dispatches', icon: <Bell className="w-4 h-4" /> }
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-500/30 selection:text-white font-sans antialiased">
      {/* 1. TOP EMERGENCY BANNER TICKER */}
      <div className="bg-slate-900 border-b border-slate-800 text-[11px] py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Emergency Helplines */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Emergency Hotline:</span>
            </div>
            <a href="tel:108" className="hover:text-white font-mono font-semibold transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>108 Ambulance</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a href="tel:112" className="hover:text-white font-mono font-semibold transition-colors hidden sm:inline">
              112 Unified Police/Fire
            </a>
            <span className="text-slate-600 hidden md:inline">•</span>
            <a href="tel:181" className="hover:text-white font-mono font-semibold transition-colors hidden md:inline">
              181 Women Helpline
            </a>
          </div>

          {/* Real-time System Telemetry & Clock */}
          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Network Live (24ms)</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{currentTime || '00:00:00'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY WEBSITE HEADER & NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand Identity */}
            <div
              onClick={() => {
                if (isAuthenticated) {
                  if (currentRole === 'PUBLIC_USER') setCurrentScreen('HOME');
                  if (currentRole === 'AMBULANCE_DRIVER') setCurrentScreen('AMBULANCE_DASHBOARD');
                  if (currentRole === 'HOSPITAL_STAFF') setCurrentScreen('HOSPITAL_DASHBOARD');
                }
              }}
              className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform border border-red-400/30">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white tracking-tight">
                    Smart Triage
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800/80">
                    {authSession.portalName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {currentRole === 'PUBLIC_USER' && 'Citizen Emergency Healthcare & Health Passport'}
                  {currentRole === 'AMBULANCE_DRIVER' && '108 ALS/BLS Emergency Ambulance Dispatch Telemetry'}
                  {currentRole === 'HOSPITAL_STAFF' && 'Emergency Department Trauma & Resuscitation Management'}
                </p>
              </div>
            </div>

            {/* Middle: Desktop Navigation Links */}
            {isAuthenticated && (
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((item) => {
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Right: User, Utilities & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* EMERGENCY SOS QUICK ACTION (Available everywhere on website) */}
              <button
                onClick={() => setIsSosModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black shadow-lg shadow-red-600/30 active:scale-95 transition-all border border-red-400/40"
                title="Immediate 108 Emergency SOS Trigger"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>SOS 108</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline uppercase text-[11px] font-mono">{currentLanguage}</span>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1">
                      Select Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-red-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-[10px] opacity-80">{lang.native}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications Icon (when logged in) */}
              {isAuthenticated && (
                <button
                  onClick={() => setCurrentScreen('NOTIFICATIONS')}
                  className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Notifications & Alerts"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-md">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              )}

              {/* Authenticated Identity Pill & Log Out */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 px-2.5 py-1 text-xs">
                    {currentRole === 'PUBLIC_USER' && (
                      <div className="p-1 rounded-lg bg-emerald-950 border border-emerald-800">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                    {currentRole === 'AMBULANCE_DRIVER' && (
                      <div className="p-1 rounded-lg bg-amber-950 border border-amber-800">
                        <Truck className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    )}
                    {currentRole === 'HOSPITAL_STAFF' && (
                      <div className="p-1 rounded-lg bg-blue-950 border border-blue-800">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    )}

                    <div className="hidden md:block text-left">
                      <span className="font-bold text-white block text-xs truncate max-w-[130px]">
                        {authSession.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {authSession.portalName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 hover:text-white transition-colors shadow-xs"
                    title="Log out and return to Login Screen"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span className="hidden sm:inline">Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsKotlinCodeOpen(true)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
                  >
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span>System Specs</span>
                  </button>
                </div>
              )}

              {/* Mobile Hamburger Toggle */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
                  aria-label="Toggle Navigation Menu"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Dropdown Nav Menu */}
          {isAuthenticated && isMobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-800 py-3 space-y-1 animate-fadeIn">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    currentScreen === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white text-red-600">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsSosModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black mt-2 shadow-lg"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>TRIGGER 108 EMERGENCY SOS</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold mt-1 shadow-sm"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Log Out ({authSession.portalName})</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 3. FLOATING TOAST NOTIFICATION */}
      {notificationToast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce transition-all px-4 pointer-events-none max-w-md">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-3 ${
              notificationToast.type === 'urgent'
                ? 'bg-red-600 text-white border-red-400 shadow-red-600/40'
                : notificationToast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/40'
                : 'bg-slate-900 text-slate-100 border-slate-700 shadow-black/50'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0 animate-spin" />
            <span>{notificationToast.message}</span>
          </div>
        </div>
      )}

      {/* 4. MAIN WEBSITE BODY */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {children}
      </main>

      {/* 5. PROFESSIONAL WEBSITE FOOTER */}
      <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white font-black text-xs">
                  ST
                </div>
                <span className="font-bold text-white text-sm tracking-tight">
                  Smart Triage
                </span>
              </div>
              <p className="text-[12px] text-slate-400 leading-relaxed">
                National unified digital emergency response network integrating citizen trauma reporting, 108 ambulance dispatch telemetry, and hospital ER resuscitation bay management.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NDHM & HIPAA Compliant Data Security</span>
              </div>
            </div>

            {/* Column 2: 24/7 Verified Helplines */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                Emergency Helplines
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="tel:108" className="hover:text-red-400 flex items-center justify-between group transition-colors">
                    <span className="text-slate-300">108 Emergency Ambulance</span>
                    <span className="font-mono text-[11px] text-red-400 font-bold">24/7 Free</span>
                  </a>
                </li>
                <li>
                  <a href="tel:112" className="hover:text-blue-400 flex items-center justify-between group transition-colors">
                    <span className="text-slate-300">112 Unified Emergency</span>
                    <span className="font-mono text-[11px] text-blue-400 font-bold">Police/Fire</span>
                  </a>
                </li>
                <li>
                  <a href="tel:102" className="hover:text-pink-400 flex items-center justify-between group transition-colors">
                    <span className="text-slate-300">102 Maternity Transport</span>
                    <span className="font-mono text-[11px] text-pink-400">Mother & Child</span>
                  </a>
                </li>
                <li>
                  <a href="tel:181" className="hover:text-purple-400 flex items-center justify-between group transition-colors">
                    <span className="text-slate-300">181 Women in Distress</span>
                    <span className="font-mono text-[11px] text-purple-400">Helpline</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Portal Capabilities (Role Isolated) */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                {authSession.portalName} Services
              </h3>
              {currentRole === 'PUBLIC_USER' && (
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Emergency SOS & Accident Reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span>Clinical Triage Assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400" />
                    <span>Personal Health Passport & Records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preventive Wellness & Yoga Protocols</span>
                  </li>
                </ul>
              )}
              {currentRole === 'AMBULANCE_DRIVER' && (
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>108 Live Dispatch & GPS Navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span>Pre-Hospital Field Triage & Vitals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>En-Route Emergency Hospital Handover</span>
                  </li>
                </ul>
              )}
              {currentRole === 'HOSPITAL_STAFF' && (
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Trauma Resuscitation Bays & ER Command</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span>ICU Bed Availability & Clinical Readiness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Incoming Ambulance Telemetry Monitoring</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 4: System Operational Status */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                Network Status
              </h3>
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Dispatch Telemetry:</span>
                  <span className="text-emerald-400 font-bold font-mono">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">ER Bay Telemetry:</span>
                  <span className="text-emerald-400 font-bold font-mono">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Average ETA:</span>
                  <span className="text-amber-400 font-bold font-mono">6.4 Mins</span>
                </div>
              </div>

              <button
                onClick={() => setIsKotlinCodeOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kotlin Compose Architecture</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 Smart Triage Emergency Healthcare Platform. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>National Health Services</span>
              <span>•</span>
              <span>Emergency Medical Services (EMS) 108</span>
              <span>•</span>
              <span>Version 2.4-Web</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
