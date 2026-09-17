import { useState, useEffect, useRef, useCallback } from 'react';

export interface AmbulanceLocationState {
  lat: number;
  lng: number;
  accuracy?: number;
  speed?: number | null;
  heading?: number | null;
  altitude?: number | null;
  lastUpdated: string;
  isSampleLocation: boolean;
  isTracking: boolean;
  statusText: 'ACTIVE' | 'INACTIVE' | 'SEARCHING_GPS' | 'PERMISSION_REQUIRED';
  permissionState: 'prompt' | 'granted' | 'denied' | 'permanently_denied';
  errorMessage?: string | null;
}

// Sample fallback coordinates (clearly labeled in UI as sample demo location if GPS is unavailable)
export const SAMPLE_AMBULANCE_COORDS = {
  lat: 28.4725,
  lng: 77.0542,
  locationName: 'Cyber Gateway Sector 44, Gurugram NCR (Sample Base)',
  accuracy: 12
};

export const useAmbulanceLocation = (autoTrackWhenOnline = true, isOnline = true) => {
  const [locationState, setLocationState] = useState<AmbulanceLocationState>({
    lat: SAMPLE_AMBULANCE_COORDS.lat,
    lng: SAMPLE_AMBULANCE_COORDS.lng,
    accuracy: SAMPLE_AMBULANCE_COORDS.accuracy,
    speed: null,
    heading: null,
    lastUpdated: 'Not started',
    isSampleLocation: true,
    isTracking: false,
    statusText: isOnline ? 'SEARCHING_GPS' : 'INACTIVE',
    permissionState: 'prompt',
    errorMessage: null
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const formatTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const startTracking = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationState(prev => ({
        ...prev,
        isTracking: false,
        isSampleLocation: true,
        statusText: 'INACTIVE',
        permissionState: 'denied',
        errorMessage: 'Geolocation API is not supported by this browser/device environment. Displaying sample coordinates.',
        lastUpdated: formatTime()
      }));
      return;
    }

    // Stop existing watch if any
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setLocationState(prev => ({
      ...prev,
      isTracking: true,
      statusText: 'SEARCHING_GPS',
      errorMessage: null
    }));

    try {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocationState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: Math.round(position.coords.accuracy),
            speed: position.coords.speed !== null ? Math.round(position.coords.speed * 3.6) : null, // convert m/s to km/h
            heading: position.coords.heading,
            altitude: position.coords.altitude,
            lastUpdated: formatTime(),
            isSampleLocation: false,
            isTracking: true,
            statusText: 'ACTIVE',
            permissionState: 'granted',
            errorMessage: null
          });
        },
        (error) => {
          console.warn('Ambulance GPS Location error:', error.message);
          let permState: AmbulanceLocationState['permissionState'] = 'denied';
          if (error.code === error.PERMISSION_DENIED) {
            permState = 'denied';
          }

          setLocationState(prev => ({
            ...prev,
            lat: SAMPLE_AMBULANCE_COORDS.lat,
            lng: SAMPLE_AMBULANCE_COORDS.lng,
            accuracy: SAMPLE_AMBULANCE_COORDS.accuracy,
            isSampleLocation: true,
            isTracking: true,
            statusText: 'ACTIVE',
            permissionState: permState,
            errorMessage: error.code === 1
              ? 'Location permission denied. Displaying marked sample GPS coordinates.'
              : 'GPS signal weak or unavailable. Using sample demo coordinates.',
            lastUpdated: formatTime()
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 5000
        }
      );

      watchIdRef.current = id;
    } catch (e: any) {
      console.warn('Ambulance tracking initialization exception:', e);
      setLocationState(prev => ({
        ...prev,
        lat: SAMPLE_AMBULANCE_COORDS.lat,
        lng: SAMPLE_AMBULANCE_COORDS.lng,
        isSampleLocation: true,
        isTracking: true,
        statusText: 'ACTIVE',
        lastUpdated: formatTime()
      }));
    }
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setLocationState(prev => ({
      ...prev,
      isTracking: false,
      statusText: 'INACTIVE',
      lastUpdated: formatTime()
    }));
  }, []);

  // Sync tracking with online status
  useEffect(() => {
    if (autoTrackWhenOnline && isOnline) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [autoTrackWhenOnline, isOnline, startTracking, stopTracking]);

  const requestPermission = () => {
    startTracking();
  };

  return {
    ...locationState,
    startTracking,
    stopTracking,
    requestPermission,
    showSettingsModal,
    setShowSettingsModal
  };
};
