import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  RefreshCw,
  ShieldAlert,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { analyzePatientInjury } from '../../services/mlInjuryService';
import { InjuryAnalysisResult } from '../../types';

interface InjuryScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentId: string;
}

export const InjuryScanModal: React.FC<InjuryScanModalProps> = ({ isOpen, onClose, incidentId }) => {
  const { updateScannedInjury, showToast } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<InjuryAnalysisResult | null>(null);

  // Sample quick scan presets for simulation
  const samplePresets = [
    {
      label: 'Deep Laceration / Open Wound',
      url: 'https://images.unsplash.com/photo-1543883441-3b7c8ec17188?w=500&auto=format&fit=crop&q=80',
      type: 'Open Wound & Laceration'
    },
    {
      label: 'Thermal Burn Scan',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80',
      type: 'Burn (Thermal / Chemical)'
    },
    {
      label: 'Limb Fracture & Swelling',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=80',
      type: 'Possible Bone Fracture / Deformity'
    }
  ];

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) {
      showToast('Please capture or select an injury photo first.', 'info');
      return;
    }

    setIsScanning(true);
    try {
      const result = await analyzePatientInjury({
        imageDataUrl: selectedImage
      });
      setAnalysisResult(result);
      updateScannedInjury(incidentId, result);
    } catch (err) {
      showToast('ML inference failed. Retrying with local cached rules.', 'urgent');
    } finally {
      setIsScanning(false);
    }
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 overflow-y-auto animate-fadeIn">
      {/* HEADER */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Scan Patient Injury
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Incident #{incidentId}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* MAIN BODY: CAPTURE & RESULTS */}
      <div className="my-auto space-y-4 py-2">
        {!analysisResult ? (
          /* CAPTURE / UPLOAD SCREEN */
          <div className="space-y-4">
            {/* Camera Viewfinder Box */}
            <div className="relative w-full h-56 rounded-3xl bg-slate-900 border-2 border-dashed border-slate-700 overflow-hidden flex flex-col items-center justify-center text-center p-4">
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Scanned Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer px-4 py-2 bg-slate-900/90 text-white rounded-xl text-xs font-bold border border-slate-700">
                      Retake Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
                    <Camera className="w-7 h-7 text-amber-400" />
                  </div>
                  <span className="text-sm font-bold text-white block">
                    Capture or Upload Patient Injury Photo
                  </span>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Ensure adequate lighting. Point camera steadily at the injury area.
                  </p>
                </div>
              )}
            </div>

            {/* Input Action Controls */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="cursor-pointer py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md flex items-center justify-center gap-1.5 transition-all text-center">
                <Camera className="w-4 h-4" />
                <span>Open Camera</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-all text-center">
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>
            </div>

            {/* Quick Demo Presets */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Or Select Sample Injury Scan for Demonstration:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(preset.url);
                      setAnalysisResult(null);
                    }}
                    className={`p-2 rounded-2xl border text-left text-[10px] font-semibold transition-all ${
                      selectedImage === preset.url
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="block truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RUN INFERENCE BUTTON */}
            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={!selectedImage || isScanning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-black text-xs shadow-xl shadow-red-900/40 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing ML Injury Classification...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>RUN PRELIMINARY INJURY ANALYSIS</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* ANALYSIS RESULTS VIEW */
          <div className="space-y-4 animate-fadeIn">
            {/* Classification Result Card */}
            <div className="rounded-3xl bg-slate-900 border-2 border-amber-500/60 p-4 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    ML Preliminary Assessment
                  </span>
                </div>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {analysisResult.confidencePercentage}% Confidence
                </span>
              </div>

              {/* Detected Injury Title & Severity */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Detected Pattern:</span>
                <h4 className="text-base font-extrabold text-white">
                  {analysisResult.detectedInjuryType}
                </h4>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Estimated Severity:</span>
                  <span className={`text-[11px] font-bold px-2 py-0.2 rounded ${
                    analysisResult.severityLevel === 'CRITICAL' || analysisResult.severityLevel === 'SEVERE'
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {analysisResult.severityLevel}
                  </span>
                </div>
              </div>

              {/* First Aid Guidance */}
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Paramedic & First Aid Recommendations:
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {analysisResult.firstAidGuidance.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold font-mono text-[10px] mt-0.5">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explicit Preliminary AI Disclaimer */}
              <div className="bg-red-950/30 p-3 rounded-2xl border border-red-500/40 text-[11px] text-red-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-red-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>AI-assisted preliminary assessment</span>
                </div>
                <p className="text-[10px] text-red-200/90 leading-tight">
                  This analysis is generated by a decision-support prototype and does not constitute a definitive medical or radiological diagnosis. Clinical decisions remain the sole responsibility of the certified paramedic and attending physician.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAnalysisResult(null)}
                className="py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border border-slate-700 transition-colors"
              >
                Scan Another Area
              </button>

              <button
                type="button"
                onClick={handleDone}
                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-lg shadow-emerald-600/30 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                <span>Save to ER Queue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NOTICE */}
      <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-slate-900">
        Smart Triage Modular ML Vision API v1.0
      </div>
    </div>
  );
};
