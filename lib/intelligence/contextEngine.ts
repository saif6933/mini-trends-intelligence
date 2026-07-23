// ==========================================================
// Mini Trends Intelligence System
// Context Engine (Phase 3.1.4 - Step 2)
// Version 1.0 - Production Grade
// ==========================================================

import { KeywordIntelligenceResult } from "./keywordIdentityEngine";

export interface KeywordContext {
  country: string;
  category: string;
  source: string;
  signalType: string;
  collectedAt: string;
}

export interface EnrichedKeywordResult extends KeywordIntelligenceResult {
  context: KeywordContext;
}

export interface RawContextInput {
  country?: string;
  category?: string;
  source?: string;
  signalType?: string;
  collectedAt?: string;
}

/**
 * Context Engine
 * Attaches immutable contextual data to the Keyword Intelligence Engine output.
 */
export function attachContext(
  identityResult: KeywordIntelligenceResult,
  rawContext?: RawContextInput
): EnrichedKeywordResult {
  return {
    ...identityResult,
    context: {
      country: rawContext?.country ?? "Global",
      category: rawContext?.category ?? "General",
      source: rawContext?.source ?? "Direct",
      signalType: rawContext?.signalType ?? "Trend",
      collectedAt: rawContext?.collectedAt ?? new Date().toISOString(),
    },
  };
}