import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  Power,
  Navigation,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Radio,
  ExternalLink,
  Map,
  History,
  User,
  HeartPulse,
  LogOut
} from 'lucide-react';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { TriagePriority, IncidentReport } from '../../types';
import { useAmbulanceLocation } from '../../hooks/useAmbulanceLocation';
import { AmbulanceLocationTrackingCard } from './AmbulanceLocationTrackingCard';
import { AmbulanceTacticalMap } from './AmbulanceTacticalMap';
import { AmbulanceActiveEmergencyCard } from './AmbulanceActiveEmergencyCard';
import { AmbulanceDriverNav, AmbulanceTab } from './AmbulanceDriverNav';
import { AmbulanceHistoryScreen } from './AmbulanceHistoryScreen';
import { AmbulanceProfileScreen } from './AmbulanceProfileScreen';

export const AmbulanceDashboard: React.FC = () => {
  const {
    activeDriverAmbulance,
    toggleDriverOnlineStatus,
    incidents,
    driverAcceptEmergency,
    setActiveIncidentId,
    setCurrentScreen,
    hospitals,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState<AmbulanceTab>('HOME');

  // Real-time location tracking hook tied to ambulance online status
  const locationState = useAmbulanceLocation(true, activeDriverAmbulance.isOnline);

  const pendingDispatches = incidents.filter(
    (i) => i.status !== 'RESOLVED' && i.status !== 'ARRIVED_AT_HOSPITAL'
  );

  const activeIncident = incidents.find(
    (i) => i.id === activeDriverAmbulance.activeIncidentId
  ) || pendingDispatches[0];

  const hasActiveEmergency = Boolean(activeDriverAmbulance.activeIncidentId);

  const handleOpenEmergencyDetails = (incidentId: string) => {
    setActiveIncidentId(incidentId);
    setCurrentScreen('AMBULANCE_EMERGENCY_DETAILS');
  };

  const handleAcceptEmergency = (incidentId: string) => {
    driverAcceptEmergency(activeDriverAmbulance.id, incidentId);
    setActiveIncidentId(incidentId);
    // Request location access if not already granted
    locationState.requestPermission();
  };

  const ambulanceCoords = {
    lat: locationState.lat,
    lng: locationState.lng
  };

  // Determine ambulance status display text
  let statusBadgeText = 'AVAILABLE';
  let statusBadgeStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  if (!activeDriverAmbulance.isOnline) {
    statusBadgeText = 'OFFLINE';
    statusBadgeStyle = 'bg-slate-800 text-slate-400 border-slate-700';
  } else if (hasActiveEmergency) {
    statusBadgeText = 'ON EMERGENCY';
    statusBadgeStyle = 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse';
  }

  return (
    <div className="flex-1 pb-24 space-y-4 animate-fadeIn">
      {/* 1. TOP SUB-NAVIGATION TABS */}
      <AmbulanceDriverNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasActiveEmergency={hasActiveEmergency}
        emergencyCount={pendingDispatches.length}
      />

      <div className="px-4 space-y-4">
        {/* 2. TOP DRIVER PROFILE & STATUS HEADER */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Photo */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt={activeDriverAmbulance.driverName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500/80 shadow-md"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                    activeDriverAmbulance.isOnline ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-black text-white">
                    {activeDriverAmbulance.driverName}
                  </h1>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {activeDriverAmbulance.id}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full border ${statusBadgeStyle}`}>
                    {statusBadgeText}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {activeDriverAmbulance.vehicleType.split(' ')[0]} ALS
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS: ONLINE TOGGLE & LOGOUT */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toggleDriverOnlineStatus(activeDriverAmbulance.id)}
                className={`px-3 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ${
                  activeDriverAmbulance.isOnline
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{activeDriverAmbulance.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
              </button>

              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-2xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white transition-colors shadow-xs"
                title="Log out of 108 Ambulance Portal"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'HOME' && (
          <div className="space-y-4">
            {/* REAL-TIME LOCATION TRACKING STATUS CARD */}
            <AmbulanceLocationTrackingCard
              locationState={locationState}
              isOnline={activeDriverAmbulance.isOnline}
              onToggleOnline={() => toggleDriverOnlineStatus(activeDriverAmbulance.id)}
              onRequestPermission={locationState.requestPermission}
            />

            {/* LARGE TACTICAL MAP CARD */}
            <AmbulanceTacticalMap
              ambulanceCoords={ambulanceCoords}
              isSampleLocation={locationState.isSampleLocation}
              selectedIncident={activeIncident}
              destinationHospital={hospitals[0]}
              nearbyIncidents={pendingDispatches}
              heightClass="h-72"
              showNavigationButton={true}
            />

            {/* ACTIVE EMERGENCY OR ALERT QUEUE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <h2 className="text-xs font-black text-white uppercase tracking-wider">
                    {hasActiveEmergency ? 'Active Assigned Mission' : `Incoming Emergency Alerts (${pendingDispatches.length})`}
                  </h2>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {hasActiveEmergency ? '108 Priority Dispatch' : 'Real-time GPS Radius'}
                </span>
              </div>

              {pendingDispatches.length === 0 ? (
                <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">All Clear on 108 Dispatch Grid</p>
                  <p className="text-xs text-slate-400">No active emergency calls in your vicinity.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingDispatches.map((incident) => (
                    <AmbulanceActiveEmergencyCard
                      key={incident.id}
                      incident={incident}
                      isAssignedToMe={activeDriverAmbulance.activeIncidentId === incident.id}
                      onAccept={handleAcceptEmergency}
                      onViewDetails={handleOpenEmergencyDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EMERGENCIES QUEUE */}
        {activeTab === 'EMERGENCIES' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Emergency Incident Queue ({pendingDispatches.length})
              </h2>
              <span className="text-[10px] text-slate-400">Sorted by Triage Urgency</span>
            </div>

            {pendingDispatches.length === 0 ? (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white">No Pending Incidents</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDispatches.map((incident) => (
                  <AmbulanceActiveEmergencyCard
                    key={incident.id}
                    incident={incident}
                    isAssignedToMe={activeDriverAmbulance.activeIncidentId === incident.id}
                    onAccept={handleAcceptEmergency}
                    onViewDetails={handleOpenEmergencyDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FULL TACTICAL MAP */}
        {activeTab === 'MAP' && (
          <div className="space-y-3">
            <AmbulanceTacticalMap
              ambulanceCoords={ambulanceCoords}
              isSampleLocation={locationState.isSampleLocation}
              selectedIncident={activeIncident}
              destinationHospital={hospitals[0]}
              nearbyIncidents={pendingDispatches}
              heightClass="h-96"
              showNavigationButton={true}
            />

            <AmbulanceLocationTrackingCard
              locationState={locationState}
              isOnline={activeDriverAmbulance.isOnline}
              onToggleOnline={() => toggleDriverOnlineStatus(activeDriverAmbulance.id)}
              onRequestPermission={locationState.requestPermission}
            />
          </div>
        )}

        {/* TAB 4: DISPATCH HISTORY */}
        {activeTab === 'HISTORY' && (
          <AmbulanceHistoryScreen onBackToDashboard={() => setActiveTab('HOME')} />
        )}

        {/* TAB 5: DRIVER & VEHICLE PROFILE */}
        {activeTab === 'PROFILE' && (
          <AmbulanceProfileScreen
            ambulance={activeDriverAmbulance}
            isOnline={activeDriverAmbulance.isOnline}
            onToggleOnline={() => toggleDriverOnlineStatus(activeDriverAmbulance.id)}
          />
        )}
      </div>
    </div>
  );
};
