// ==========================================================
// Mini Trends Intelligence System
// Pipeline Integration (Phase 3.1.5 - Step 1)
// Version 1.0 - Production Grade
// ==========================================================

import { processKeywordIdentity } from "./keywordIdentityEngine";
import { attachContext, RawContextInput } from "./contextEngine";
import { SignalEngine } from "./signalEngine";
import { classifyEntityIdentity } from "./identityClassificationEngine";
import { verifyClassifiedEntity } from "./verificationEngine";
import { generateIntelligenceReport, SystemIntelligenceReport } from "./reportingEngine";

export interface PipelineInputItem {
  rawKeyword: string;
  context?: RawContextInput;
}

/**
 * Executes the complete intelligence pipeline for a batch of raw keywords/signals.
 * Integrates all locked layers from normalization to reporting.
 */
export function runIntelligencePipeline(items: PipelineInputItem[]): SystemIntelligenceReport {
  const signalEngine = new SignalEngine();

  // 1. Process and route through identity -> context -> signal engine
  for (const item of items) {
    const identityResult = processKeywordIdentity(item.rawKeyword);
    const enrichedResult = attachContext(identityResult, item.context);
    signalEngine.addSignal(enrichedResult);
  }

  const aggregatedSignals = signalEngine.getAggregatedSignals();

  // 2. Process through classification, verification, and aggregate for reporting
  const processedEntries = aggregatedSignals.map((aggregated) => {
    const classified = classifyEntityIdentity(aggregated);
    const verification = verifyClassifiedEntity(classified);
    return {
      classified,
      verification,
    };
  });

  // 3. Generate final intelligence report via reporting engine
  return generateIntelligenceReport(processedEntries);
}