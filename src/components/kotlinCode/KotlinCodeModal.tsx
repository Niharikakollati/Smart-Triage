import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Code, Copy, Check, X, FileCode2, Layers, Smartphone } from 'lucide-react';
import { KOTLIN_ARCHITECTURE_CODE } from '../../data/mockData';

export const KotlinCodeModal: React.FC = () => {
  const { isKotlinCodeOpen, setIsKotlinCodeOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isKotlinCodeOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(KOTLIN_ARCHITECTURE_CODE);
    setCopied(true);
    showToast('Kotlin Jetpack Compose code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-slate-900 border border-cyan-500/40 rounded-3xl p-5 shadow-2xl text-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  Native Android Kotlin Architecture Reference
                </h3>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                  Jetpack Compose &bull; Hilt
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1:1 mapping with ViewModels, StateFlow, Room & Material 3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <button
              onClick={() => setIsKotlinCodeOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-y-auto mt-3 rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
          <pre className="whitespace-pre-wrap">{KOTLIN_ARCHITECTURE_CODE.trim()}</pre>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Ready for Android Studio Gradle compilation (Kotlin 2.0+ / Compose BOM 2024+)</span>
          <button
            onClick={() => setIsKotlinCodeOpen(false)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
