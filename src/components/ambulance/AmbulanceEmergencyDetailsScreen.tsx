import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  MapPin,
  Clock,
  User,
  Users,
  AlertTriangle,
  HeartPulse,
  Activity,
  Phone,
  Navigation,
  Camera,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Radio,
  Building2
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { AmbulanceTacticalMap } from './AmbulanceTacticalMap';
import { AmbulanceWorkflowStepper, AmbulanceWorkflowState } from './AmbulanceWorkflowStepper';
import { PatientAssessmentSection } from './PatientAssessmentSection';
import { HospitalDestinationCard } from './HospitalDestinationCard';
import { useAmbulanceLocation } from '../../hooks/useAmbulanceLocation';

export const AmbulanceEmergencyDetailsScreen: React.FC = () => {
  const {
    activeIncident,
    navigateBack,
    advanceAmbulanceProgress,
    activeDriverAmbulance,
    driverAcceptEmergency,
    updateIncident,
    hospitals
  } = useApp();

  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(hospitals[0]?.id || 'HOSP-01');

  // Track ambulance workflow stage
  const [workflowState, setWorkflowState] = useState<AmbulanceWorkflowState>(() => {
    if (!activeIncident) return 'EN_ROUTE_TO_PATIENT';
    if (activeIncident.status === 'ARRIVED_AT_SCENE') return 'ARRIVED_AT_SCENE';
    if (activeIncident.status === 'PATIENT_LOADED') return 'PATIENT_PICKED_UP';
    if (activeIncident.status === 'EN_ROUTE_TO_HOSPITAL') return 'EN_ROUTE_TO_HOSPITAL';
    if (activeIncident.status === 'ARRIVED_AT_HOSPITAL') return 'ARRIVED_AT_HOSPITAL';
    return 'EN_ROUTE_TO_PATIENT';
  });

  const locationState = useAmbulanceLocation(true, activeDriverAmbulance.isOnline);

  if (!activeIncident) {
    return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-slate-400 text-sm">No active emergency dispatch selected.</p>
        <button
          onClick={navigateBack}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
        >
          Return to Ambulance Dashboard
        </button>
      </div>
    );
  }

  const priorityConf = PRIORITY_CONFIG[activeIncident.priority];
  const isAssignedToMe = activeDriverAmbulance.activeIncidentId === activeIncident.id;

  const handleAdvanceWorkflow = (nextState: AmbulanceWorkflowState) => {
    setWorkflowState(nextState);

    // Sync with AppContext incident/ambulance status
    if (nextState === 'ARRIVED_AT_SCENE') {
      updateIncident(activeIncident.id, { status: 'ARRIVED_AT_SCENE' });
    } else if (nextState === 'PATIENT_PICKED_UP' || nextState === 'EN_ROUTE_TO_HOSPITAL') {
      updateIncident(activeIncident.id, {
        status: 'EN_ROUTE_TO_HOSPITAL',
        destinationHospital: hospitals.find(h => h.id === selectedHospitalId)?.name || hospitals[0].name
      });
    } else if (nextState === 'ARRIVED_AT_HOSPITAL') {
      updateIncident(activeIncident.id, { status: 'ARRIVED_AT_HOSPITAL' });
    } else if (nextState === 'PATIENT_HANDED_OVER') {
      updateIncident(activeIncident.id, { status: 'RESOLVED' });
    }
  };

  const handleResetToAvailable = () => {
    advanceAmbulanceProgress(activeDriverAmbulance.id);
    navigateBack();
  };

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0];

  return (
    <div className="flex-1 p-4 pb-24 space-y-4 animate-fadeIn">
      {/* 1. TOP HEADER BAR */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={navigateBack}
          className="p-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">
            Emergency Dispatch Command
          </span>
          <h1 className="text-sm font-black text-white font-mono">
            #{activeIncident.id}
          </h1>
        </div>

        {/* Priority Badge */}
        <div className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider shadow-md ${priorityConf.badgeBg}`}>
          {activeIncident.priority}
        </div>
      </div>

      {/* 2. LIVE TRACKING STATUS BANNER */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 flex items-center justify-between shadow-lg text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Ambulance Status
            </span>
          </div>
          <p className="font-bold text-emerald-400">
            {workflowState.replace(/_/g, ' ')}
          </p>
        </div>

        <div className="text-right space-y-0.5 font-mono">
          <span className="text-[10px] text-slate-400 uppercase">GPS Tracking</span>
          <p className="text-[11px] text-amber-400 font-bold">
            {locationState.isSampleLocation ? 'Sample GPS' : 'Live Device GPS'}
          </p>
        </div>
      </div>

      {/* 3. TACTICAL MAP WITH REAL-TIME GPS & GOOGLE MAPS NAVIGATION */}
      <AmbulanceTacticalMap
        ambulanceCoords={{ lat: locationState.lat, lng: locationState.lng }}
        isSampleLocation={locationState.isSampleLocation}
        selectedIncident={activeIncident}
        destinationHospital={
          workflowState === 'PATIENT_PICKED_UP' ||
          workflowState === 'EN_ROUTE_TO_HOSPITAL' ||
          workflowState === 'ARRIVED_AT_HOSPITAL' ||
          workflowState === 'PATIENT_HANDED_OVER'
            ? selectedHospital
            : undefined
        }
        heightClass="h-64"
        showNavigationButton={true}
      />

      {/* 4. EMERGENCY WORKFLOW STEPPER */}
      <AmbulanceWorkflowStepper
        currentState={workflowState}
        onAdvanceState={handleAdvanceWorkflow}
        onResetToAvailable={handleResetToAvailable}
      />

      {/* 5. PATIENT / VICTIM INFORMATION & CITIZEN REPORT CARD */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Accident Scene & Victim Info
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded-lg border border-amber-800">
            {activeIncident.victimsCount} Patient(s)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Accident Type:</span>
            <span className="text-xs font-bold text-amber-300">{activeIncident.accidentType}</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Consciousness:</span>
            <span className="text-xs font-bold text-white">{activeIncident.consciousness.replace(/_/g, ' ')}</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Breathing:</span>
            <span className="text-xs font-bold text-red-400">{activeIncident.breathing}</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold">Bleeding:</span>
            <span className="text-xs font-bold text-red-400">{activeIncident.bleeding.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {/* Symptoms List */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Reported Symptoms:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeIncident.otherSymptoms.map((sym, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-[11px] font-medium"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>

        {/* Description & Citizen Notes */}
        <div className="space-y-1 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Reporter Incident Description:
          </span>
          <p className="text-slate-300 text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800 leading-relaxed">
            "{activeIncident.description}"
          </p>
        </div>

        {/* Scene photo */}
        {activeIncident.photoUrl && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Attached Scene Photo:
            </span>
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
              <img
                src={activeIncident.photoUrl}
                alt="Scene injury"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-slate-950/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                Uploaded by Reporter Suresh Menon
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. PATIENT ASSESSMENT & CLINICAL INJURY SCAN (Visible during / after scene arrival) */}
      <PatientAssessmentSection
        incident={activeIncident}
      />

      {/* 7. HOSPITAL DESTINATION CARD (Visible when patient picked up or en route) */}
      {(workflowState === 'PATIENT_PICKED_UP' ||
        workflowState === 'EN_ROUTE_TO_HOSPITAL' ||
        workflowState === 'ARRIVED_AT_HOSPITAL' ||
        workflowState === 'PATIENT_HANDED_OVER') && (
        <HospitalDestinationCard
          hospitals={hospitals}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={setSelectedHospitalId}
          incident={activeIncident}
          ambulanceId={activeDriverAmbulance.id}
          ambulanceCoords={{ lat: locationState.lat, lng: locationState.lng }}
        />
      )}
    </div>
  );
};
