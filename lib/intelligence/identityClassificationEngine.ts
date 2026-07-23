// ==========================================================
// Mini Trends Intelligence System
// Identity Classification Engine (Phase 3.1.4 - Step 4)
// Version 1.0 - Production Grade
// ==========================================================

import { AggregatedSignalResult } from "./signalEngine";
import { IdentityType } from "./identityTypes";

export type ClassificationType =
  | "Canonical Match"
  | "Alias Duplicate"
  | "Intentional Duplicate"
  | "True Duplicate"
  | "Conflict Duplicate"
  | "Unknown Entity";

export interface ClassifiedEntityResult {
  canonical: string;
  classification: ClassificationType;
  reason: string;
  signals: AggregatedSignalResult["signals"];
}

/**
 * Identity Classification Engine
 * Classifies aggregated canonical entities based on their signals and predefined types,
 * without performing verification, reporting, or fuzzy matching.
 */
export function classifyEntityIdentity(
  aggregatedSignal: AggregatedSignalResult
): ClassifiedEntityResult {
  const canonical = aggregatedSignal.canonical;
  const signals = aggregatedSignal.signals;

  let classification: ClassificationType = "Canonical Match";
  let reason = "Entity matched standard canonical criteria.";

  if (!canonical || canonical === "Unknown" || canonical.trim() === "") {
    classification = "Unknown Entity";
    reason = "Entity could not be mapped to a known canonical reference.";
  } else if (signals.length > 1) {
    // Basic structural classification rules based on signal volume/patterns
    const uniqueSignalTypes = new Set(signals.map((s) => s.signalType));
    if (uniqueSignalTypes.size > 1) {
      classification = "Conflict Duplicate";
      reason = "Multiple conflicting signal types detected under the same canonical entity.";
    } else {
      classification = "True Duplicate";
      reason = "Multiple identical signals grouped under the same canonical entity.";
    }
  } else {
    classification = "Canonical Match";
    reason = "Single clean signal mapped directly to the canonical entity.";
  }

  return {
    canonical,
    classification,
    reason,
    signals,
  };
}