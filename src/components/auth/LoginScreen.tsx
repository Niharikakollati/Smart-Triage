import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Activity,
  ArrowRight,
  Info
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(username, password);
      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid username or password.');
      }
    }, 150);
  };

  const handleFillCredentials = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setErrorMessage(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 py-8 max-w-sm mx-auto w-full animate-fadeIn">
      {/* BRAND & HEADER */}
      <div className="w-full text-center space-y-2 mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/30 border border-red-400/40">
          <Activity className="w-7 h-7 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Smart Triage
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your portal dashboard
          </p>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-2xl space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-[0.99] transition-all disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* DISCREET DEMO CREDENTIALS ACCORDION */}
      <div className="w-full mt-4 text-center">
        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="text-[11px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5 transition-colors py-1 px-2 rounded-lg"
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>{showHints ? 'Hide Demo Logins' : 'View Demo Logins'}</span>
        </button>

        {showHints && (
          <div className="mt-2.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2 animate-fadeIn">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Available Test Accounts (Click to Fill):
            </span>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleFillCredentials('citizen', 'public123')}
                className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800/80 text-left flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-emerald-400 block text-[11px]">
                    Citizen Portal
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    citizen / public123
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 font-medium">
                  Use &rarr;
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillCredentials('driver108', 'driver108')}
                className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800/80 text-left flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-amber-400 block text-[11px]">
                    Ambulance Driver Portal
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    driver108 / driver108
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-amber-400 font-medium">
                  Use &rarr;
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillCredentials('er_staff', 'staff123')}
                className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800/80 text-left flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-blue-400 block text-[11px]">
                    Hospital ER Portal
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    er_staff / staff123
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-400 font-medium">
                  Use &rarr;
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
