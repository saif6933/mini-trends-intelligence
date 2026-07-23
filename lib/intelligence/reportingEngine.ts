// ==========================================================
// Mini Trends Intelligence System
// Reporting Engine (Phase 3.1.4 - Step 6)
// Version 1.0 - Production Grade
// ==========================================================

import { ClassifiedEntityResult } from "./identityClassificationEngine";
import { VerificationResult } from "./verificationEngine";

export interface SystemIntelligenceReport {
  summary: {
    totalEntities: number;
    validEntities: number;
    invalidEntities: number;
    totalSignals: number;
    generationTimestamp: string;
  };
  canonicalEntities: ClassifiedEntityResult[];
  signals: any[];
  aliasMerges: ClassifiedEntityResult[];
  trueDuplicates: ClassifiedEntityResult[];
  intentionalDuplicates: ClassifiedEntityResult[];
  conflictDuplicates: ClassifiedEntityResult[];
  unknownCandidates: ClassifiedEntityResult[];
  verificationResults: {
    entityCanonical: string;
    verification: VerificationResult;
  }[];
}

/**
 * Reporting Engine
 * Aggregates verified and classified pipeline results into a comprehensive final intelligence report
 * without altering business logic, performing validation, or executing resolution.
 */
export function generateIntelligenceReport(
  processedEntries: {
    classified: ClassifiedEntityResult;
    verification: VerificationResult;
  }[]
): SystemIntelligenceReport {
  let totalSignalsCount = 0;
  let validCount = 0;
  let invalidCount = 0;

  const canonicalEntities: ClassifiedEntityResult[] = [];
  const aliasMerges: ClassifiedEntityResult[] = [];
  const trueDuplicates: ClassifiedEntityResult[] = [];
  const intentionalDuplicates: ClassifiedEntityResult[] = [];
  const conflictDuplicates: ClassifiedEntityResult[] = [];
  const unknownCandidates: ClassifiedEntityResult[] = [];
  const allSignals: any[] = [];
  const verificationResults: { entityCanonical: string; verification: VerificationResult }[] = [];

  processedEntries.forEach((entry) => {
    const { classified, verification } = entry;

    verificationResults.push({
      entityCanonical: classified.canonical,
      verification,
    });

    if (verification.valid) {
      validCount++;
    } else {
      invalidCount++;
    }

    if (classified.signals && Array.isArray(classified.signals)) {
      totalSignalsCount += classified.signals.length;
      allSignals.push(...classified.signals);
    }

    // Categorize based on classification type
    switch (classified.classification) {
      case "Canonical Match":
        canonicalEntities.push(classified);
        break;
      case "Alias Duplicate":
        aliasMerges.push(classified);
        break;
      case "True Duplicate":
        trueDuplicates.push(classified);
        break;
      case "Intentional Duplicate":
        intentionalDuplicates.push(classified);
        break;
      case "Conflict Duplicate":
        conflictDuplicates.push(classified);
        break;
      case "Unknown Entity":
        unknownCandidates.push(classified);
        break;
      default:
        canonicalEntities.push(classified);
        break;
    }
  });

  return {
    summary: {
      totalEntities: processedEntries.length,
      validEntities: validCount,
      invalidEntities: invalidCount,
      totalSignals: totalSignalsCount,
      generationTimestamp: new Date().toISOString(),
    },
    canonicalEntities,
    signals: allSignals,
    aliasMerges,
    trueDuplicates,
    intentionalDuplicates,
    conflictDuplicates,
    unknownCandidates,
    verificationResults,
  };
}