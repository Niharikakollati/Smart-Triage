import React from 'react';
import {
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  HeartPulse,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export type AmbulanceWorkflowState =
  | 'AVAILABLE'
  | 'EMERGENCY_RECEIVED'
  | 'EN_ROUTE_TO_PATIENT'
  | 'ARRIVED_AT_SCENE'
  | 'PATIENT_ASSESSMENT'
  | 'PATIENT_PICKED_UP'
  | 'EN_ROUTE_TO_HOSPITAL'
  | 'ARRIVED_AT_HOSPITAL'
  | 'PATIENT_HANDED_OVER';

interface AmbulanceWorkflowStepperProps {
  currentState: AmbulanceWorkflowState;
  onAdvanceState: (nextState: AmbulanceWorkflowState) => void;
  onResetToAvailable: () => void;
}

interface StepDef {
  key: AmbulanceWorkflowState;
  title: string;
  shortLabel: string;
  icon: React.ReactNode;
  actionText: string;
  bgGradient: string;
}

export const AmbulanceWorkflowStepper: React.FC<AmbulanceWorkflowStepperProps> = ({
  currentState,
  onAdvanceState,
  onResetToAvailable
}) => {
  const steps: StepDef[] = [
    {
      key: 'EN_ROUTE_TO_PATIENT',
      title: 'En Route to Patient',
      shortLabel: 'En Route',
      icon: <Truck className="w-4 h-4" />,
      actionText: 'MARK ARRIVED AT SCENE',
      bgGradient: 'from-amber-600 to-orange-600'
    },
    {
      key: 'ARRIVED_AT_SCENE',
      title: 'Arrived at Accident Scene',
      shortLabel: 'At Scene',
      icon: <MapPin className="w-4 h-4" />,
      actionText: 'START PATIENT ASSESSMENT',
      bgGradient: 'from-orange-600 to-red-600'
    },
    {
      key: 'PATIENT_ASSESSMENT',
      title: 'Patient Assessment & Vitals',
      shortLabel: 'Assessment',
      icon: <HeartPulse className="w-4 h-4" />,
      actionText: 'CONFIRM PATIENT PICKED UP',
      bgGradient: 'from-red-600 to-pink-600'
    },
    {
      key: 'PATIENT_PICKED_UP',
      title: 'Patient Picked Up',
      shortLabel: 'Loaded',
      icon: <CheckCircle2 className="w-4 h-4" />,
      actionText: 'START EN ROUTE TO HOSPITAL',
      bgGradient: 'from-indigo-600 to-blue-600'
    },
    {
      key: 'EN_ROUTE_TO_HOSPITAL',
      title: 'En Route to Hospital ER',
      shortLabel: 'To Hospital',
      icon: <Building2 className="w-4 h-4" />,
      actionText: 'MARK ARRIVED AT HOSPITAL',
      bgGradient: 'from-blue-600 to-cyan-600'
    },
    {
      key: 'ARRIVED_AT_HOSPITAL',
      title: 'Arrived at Hospital Trauma ER',
      shortLabel: 'At ER',
      icon: <Building2 className="w-4 h-4" />,
      actionText: 'COMPLETE PATIENT HANDOVER',
      bgGradient: 'from-emerald-600 to-teal-600'
    },
    {
      key: 'PATIENT_HANDED_OVER',
      title: 'Patient Handed Over to ER Staff',
      shortLabel: 'Handed Over',
      icon: <ShieldCheck className="w-4 h-4" />,
      actionText: 'COMPLETE MISSION & RETURN TO AVAILABLE',
      bgGradient: 'from-emerald-600 to-green-600'
    }
  ];

  const currentIndex = steps.findIndex(s => s.key === currentState);
  const currentStepDef = steps[currentIndex] || steps[0];

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      onAdvanceState(steps[currentIndex + 1].key);
    } else if (currentState === 'PATIENT_HANDED_OVER') {
      onResetToAvailable();
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3.5 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Emergency Mission Workflow
          </span>
          <h3 className="text-xs font-black text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{currentStepDef.title}</span>
          </h3>
        </div>

        <span className="text-[10px] font-mono font-bold bg-slate-950 text-amber-400 border border-slate-800 px-2.5 py-1 rounded-xl">
          Step {currentIndex + 1} of {steps.length}
        </span>
      </div>

      {/* HORIZONTAL STEPPER PROGRESS */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="flex items-center shrink-0">
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                    : isDone
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : step.icon}
                <span className="whitespace-nowrap">{step.shortLabel}</span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className={`w-3 h-3 mx-0.5 shrink-0 ${isDone ? 'text-emerald-500' : 'text-slate-400'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* 1-TAP BIG ACTION BUTTON FOR ADVANCING */}
      <button
        type="button"
        onClick={handleNext}
        className={`w-full py-4 px-4 rounded-2xl bg-gradient-to-r ${currentStepDef.bgGradient} text-white font-black text-xs shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98`}
      >
        <span>{currentStepDef.actionText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
