import { InjuryAnalysisResult } from '../types';

/**
 * ML Injury Detection Service Interface
 * 
 * Modular architecture for connecting with external Python ML / PyTorch / TensorFlow backend.
 * Currently provides realistic simulated preliminary predictions with confidence scores,
 * clinical first-aid guidance, and explicit safety disclaimers.
 */

export interface MLPredictionRequest {
  imageFile?: File;
  imageDataUrl?: string;
  bodyPartHint?: string;
  notes?: string;
}

export const analyzePatientInjury = async (
  request: MLPredictionRequest
): Promise<InjuryAnalysisResult> => {
  // Simulate network latency to ML inference server (e.g. FastAPI / PyTorch endpoint)
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const sampleOutcomes: InjuryAnalysisResult[] = [
    {
      id: `INJ-${Math.floor(1000 + Math.random() * 9000)}`,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      detectedInjuryType: 'Open Wound & Laceration',
      confidencePercentage: 89,
      severityLevel: 'MODERATE',
      firstAidGuidance: [
        'Apply direct, firm pressure with sterile gauze to control bleeding.',
        'Elevate the affected limb above the level of the heart if no bone fracture is suspected.',
        'Do NOT remove deeply embedded foreign objects; stabilize around them.',
        'Maintain sterile dressing and prepare for immediate wound debridement at hospital.'
      ],
      warningAdvice: 'Active subcutaneous tissue disruption visible. High risk of secondary microbial infection.',
      disclaimer: 'AI-assisted preliminary assessment. Not a definitive medical diagnosis. For clinical decision support only.',
      imageUrl: request.imageDataUrl
    },
    {
      id: `INJ-${Math.floor(1000 + Math.random() * 9000)}`,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      detectedInjuryType: 'Possible Bone Fracture / Deformity',
      confidencePercentage: 86,
      severityLevel: 'SEVERE',
      firstAidGuidance: [
        'Immobilize the limb immediately using a rigid vacuum splint or SAM splint.',
        'Check and monitor distal pulse, motor function, and sensation (PMS check).',
        'Do NOT attempt to manually realign or push protruding bone fragments.',
        'Apply cold pack wrapped in cloth over swelling; avoid direct ice on broken skin.'
      ],
      warningAdvice: 'Angular deformity detected. Potential neurovascular compromise requiring urgent orthopedic radiology.',
      disclaimer: 'AI-assisted preliminary assessment. Not a definitive medical diagnosis. Requires confirmatory X-ray / CT.',
      imageUrl: request.imageDataUrl
    },
    {
      id: `INJ-${Math.floor(1000 + Math.random() * 9000)}`,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      detectedInjuryType: 'Burn (Thermal / Chemical)',
      confidencePercentage: 92,
      severityLevel: 'MODERATE',
      firstAidGuidance: [
        'Cool the burn immediately under gentle, cool running water for at least 10–20 minutes.',
        'Do NOT use ice, butter, or harsh chemical ointments.',
        'Cover loosely with a clean, dry, non-adherent sterile plastic wrap or burn sheet.',
        'Keep patient warm to prevent hypothermia; monitor airway if facial burns present.'
      ],
      warningAdvice: 'Partial-thickness dermis involvement. Watch for progressive blistering and fluid loss.',
      disclaimer: 'AI-assisted preliminary assessment. Not a definitive medical diagnosis.',
      imageUrl: request.imageDataUrl
    },
    {
      id: `INJ-${Math.floor(1000 + Math.random() * 9000)}`,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      detectedInjuryType: 'Bruising & Hematoma',
      confidencePercentage: 94,
      severityLevel: 'MILD',
      firstAidGuidance: [
        'Apply cold compress wrapped in a towel for 15 minutes to limit subcutaneous bleeding.',
        'Rest and elevate the affected area.',
        'Monitor for expanding hematoma or compartment syndrome hardness.'
      ],
      warningAdvice: 'Superficial contusion without open skin breach. Monitor for underlying deep tissue tenderness.',
      disclaimer: 'AI-assisted preliminary assessment. Not a definitive medical diagnosis.',
      imageUrl: request.imageDataUrl
    }
  ];

  // Pick realistic outcome or default to open wound
  const selected = sampleOutcomes[Math.floor(Math.random() * sampleOutcomes.length)];
  return {
    ...selected,
    imageUrl: request.imageDataUrl || selected.imageUrl
  };
};
