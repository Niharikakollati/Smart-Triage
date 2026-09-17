import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Globe, CheckCircle2, Shield } from 'lucide-react';
import { LanguageCode } from '../../types';

export const LanguageSettingsScreen: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, navigateBack, showToast, t } = useApp();

  const languages: { code: LanguageCode; name: string; nativeName: string; region: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', region: 'Default / International' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'National / North India' }
  ];

  const handleSelectLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    showToast(`Language updated to ${code === 'en' ? 'English' : code === 'te' ? 'తెలుగు' : 'हिन्दी'}`, 'success');
  };

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
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
            Localization Settings
          </span>
          <h1 className="text-sm font-bold text-white">
            {t.languageSettings}
          </h1>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-3">
        <p className="text-xs text-slate-400 px-1">
          {t.selectLanguage} for emergency alerts, instructions, and symptom tracking:
        </p>

        <div className="space-y-2.5">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full p-4 rounded-3xl border transition-all text-left flex items-center justify-between shadow-lg ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-blue-900/30 ring-2 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{lang.name}</span>
                      <span className="text-xs font-semibold text-blue-400 font-mono">({lang.nativeName})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{lang.region}</span>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-blue-500 text-slate-950' : 'border border-slate-700'
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DISCLOSURE */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 space-y-1 text-slate-500 text-[10px]">
        <p className="font-semibold text-slate-400">Android String Resources Compliance:</p>
        <p>
          String mappings match standard Android `res/values/strings.xml`, `res/values-te/strings.xml`, and `res/values-hi/strings.xml` resource tables.
        </p>
      </div>
    </div>
  );
};
