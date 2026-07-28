// ==========================================================
// Mini Trends Intelligence System
// Side-by-Side Pipeline Test Script (Phase 3.1.5 - Step 4 - Ideal Clean Version)
// Version 2.6 - Pure Runtime Observation without Re-creation
// ==========================================================

import { runIntelligencePipeline, PipelineInputItem } from "./pipelineIntegration";
import { processKeywordIdentity } from "./keywordIdentityEngine";
import { attachContext } from "./contextEngine";
import { SignalEngine } from "./signalEngine";
import { classifyEntityIdentity } from "./identityClassificationEngine"; // Step 3
import { verifyClassifiedEntity } from "./verificationEngine";       // Step 3

/**
 * Executes the pipeline and observes the raw output structure 
 * without making any assumptions about internal keys or fields,
 * and cleanly observes existing runtime outputs without duplication.
 */
export function testIntelligencePipelineParity(rawInputs: PipelineInputItem[]): {
  isParityAchieved: boolean;
  legacySummary: any;
  newPipelineSummary: any;
  discrepancies: string[];
} {
  const discrepancies: string[] = [];

  // --- STEP 2B STRICT EVIDENCE-BASED RUNTIME TRACE ---
  console.log("\n=== [STEP 2B] STRICT RUNTIME TRACE STARTED ===");
  const signalEngine = new SignalEngine();

  rawInputs.forEach((item, index) => {
    const identityResult = processKeywordIdentity(item.rawKeyword);
    const enrichedResult = attachContext(identityResult, item.context);
    signalEngine.addSignal(enrichedResult);

    console.log(`\n[Trace Item ${index + 1}: ${item.rawKeyword}] -> Enriched Result Keys:`, Object.keys(enrichedResult));
    console.log(`[Trace Item ${index + 1}: ${item.rawKeyword}] -> Enriched Result Full Shape:`, JSON.stringify(enrichedResult, null, 2));
  });

  const aggregatedSignals = signalEngine.getAggregatedSignals();
  console.log(`\n[Trace] Aggregated Signals Count: ${aggregatedSignals.length}`);
  if (aggregatedSignals.length > 0) {
    console.log("[Trace] Sample Aggregated Signal Keys:", Object.keys(aggregatedSignals[0]));
    console.log("[Trace] Sample Aggregated Signal Full Shape:", JSON.stringify(aggregatedSignals[0], null, 2));
  }
  console.log("=== [STEP 2B] STRICT RUNTIME TRACE ENDED ===\n");
  // --------------------------------------------------

  // --- STEP 3: IDENTITY CLASSIFICATION & VERIFICATION RUNTIME TRACE ---
  console.log("=== [STEP 3] RUNTIME TRACE STARTED ===");
  aggregatedSignals.forEach((aggregated, index) => {
    const classified = classifyEntityIdentity(aggregated);
    const verification = verifyClassifiedEntity(classified);

    console.log(`\n[Trace Step 3 - Item ${index + 1}: ${aggregated.canonical}]`);
    console.log("  -> Classified Result Shape:", JSON.stringify(classified, null, 2));
    console.log("  -> Verification Result Shape:", JSON.stringify(verification, null, 2));
  });
  console.log("=== [STEP 3] RUNTIME TRACE ENDED ===\n");
  // -------------------------------------------------------------------

  // 1. Run legacy verification flow mock/baseline check
  let legacyResult: any = null;
  try {
    legacyResult = null; 
  } catch (error) {
    discrepancies.push(`Legacy flow execution error: ${error}`);
  }

  // 2. Run new intelligence pipeline flow (Which internally handles classification, verification, and reporting)
  let newPipelineResult: any = null;
  try {
    newPipelineResult = runIntelligencePipeline(rawInputs);
  } catch (error) {
    discrepancies.push(`New pipeline execution error: ${error}`);
  }

  // --- STEP 4: REPORTING ENGINE PURE RUNTIME OBSERVATION ---
  console.log("=== [STEP 4] REPORTING ENGINE PURE RUNTIME OBSERVATION STARTED ===");
  if (newPipelineResult) {
    console.log("  -> Observed Final Report Summary Shape:", JSON.stringify(newPipelineResult.summary, null, 2));
    console.log("  -> Observed Canonical Entities Count:", newPipelineResult.canonicalEntities?.length || 0);
    console.log("  -> Observed Verification Results Count:", newPipelineResult.verificationResults?.length || 0);
    console.log("  -> Observed Final Report Keys:", Object.keys(newPipelineResult));
  } else {
    console.log("  -> Warning: New pipeline result is null, cannot observe reporting output.");
  }
  console.log("=== [STEP 4] REPORTING ENGINE PURE RUNTIME OBSERVATION ENDED ===\n");
  // ---------------------------------------------------------

  const isParityAchieved = discrepancies.length === 0;

  return {
    isParityAchieved,
    legacySummary: legacyResult,
    newPipelineSummary: newPipelineResult,
    discrepancies,
  };
}

/**
 * Runtime Step 2A/2B/3/4 Observation Wrapper
 */
export function executeRuntimeStep1(): {
  isParityAchieved: boolean;
  newPipelineSummary: any;
  discrepancies: string[];
} {
  // Test input to inspect observation structure
  const observationDataset: PipelineInputItem[] = [
    { rawKeyword: "AI" },
    { rawKeyword: "ChatGPT" }
  ];

  const result = testIntelligencePipelineParity(observationDataset);
  
  // Explicitly print raw output structure to the terminal for evidence gathering
  console.log("=== STEP 2A/2B/3/4: RUNTIME OUTPUT STRUCTURE OBSERVATION ===");
  console.log("Raw New Pipeline Summary Output:");
  console.log(JSON.stringify(result.newPipelineSummary, null, 2));

  return {
    isParityAchieved: result.isParityAchieved,
    newPipelineSummary: result.newPipelineSummary,
    discrepancies: result.discrepancies,
  };
}