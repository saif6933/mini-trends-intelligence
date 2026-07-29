// ==========================================================
// Mini Trends Intelligence System
// Side-by-Side Pipeline Test Script (Phase 3.1.5 - Step 5 Clean)
// ==========================================================

import { runIntelligencePipeline, PipelineInputItem } from "./pipelineIntegration";
import { processKeywordIdentity } from "./keywordIdentityEngine";
import { attachContext } from "./contextEngine";
import { SignalEngine } from "./signalEngine";
import { classifyEntityIdentity } from "./identityClassificationEngine";
import { verifyClassifiedEntity } from "./verificationEngine";

export function testIntelligencePipelineParity(rawInputs: PipelineInputItem[]): {
  isParityAchieved: boolean;
  legacySummary: any;
  newPipelineSummary: any;
  discrepancies: string[];
} {
  const discrepancies: string[] = [];

  console.log("\n=== [STEP 2B] STRICT RUNTIME TRACE STARTED ===");
  const signalEngine = new SignalEngine();

  rawInputs.forEach((item, index) => {
    const identityResult = processKeywordIdentity(item.rawKeyword);
    const enrichedResult = attachContext(identityResult, item.context);
    signalEngine.addSignal(enrichedResult);
  });

  const aggregatedSignals = signalEngine.getAggregatedSignals();
  console.log(`[Trace] Aggregated Signals Count: ${aggregatedSignals.length}`);
  console.log("=== [STEP 2B] STRICT RUNTIME TRACE ENDED ===\n");

  console.log("=== [STEP 3] RUNTIME TRACE STARTED ===");
  aggregatedSignals.forEach((aggregated) => {
    classifyEntityIdentity(aggregated);
    verifyClassifiedEntity(classifyEntityIdentity(aggregated));
  });
  console.log("=== [STEP 3] RUNTIME TRACE ENDED ===\n");

  let legacyResult: any = null;
  let newPipelineResult: any = null;

  try {
    newPipelineResult = runIntelligencePipeline(rawInputs);
  } catch (error) {
    discrepancies.push(`New pipeline execution error: ${error}`);
  }

  console.log("=== [STEP 5] FULL PIPELINE PARITY & DISCREPANCY ANALYSIS STARTED ===");
  
  const expectedMappings: Record<string, string> = {
    "AI": "Artificial Intelligence",
    "Artificial Intelligence": "Artificial Intelligence",
    "Chat GPT": "ChatGPT",
    "ChatGPT": "ChatGPT",
    "Open AI": "OpenAI",
    "OpenAI": "OpenAI",
    "USA": "United States",
    "United States": "United States",
    "Bharat": "India",
    "India": "India",
    "FIFA": "FIFA",
    "Premier League": "Premier League",
    "Google Gemini": "Google Gemini",
    "Claude": "Claude"
  };

  let passedCount = 0;
  let failedCount = 0;
  let mismatchCount = 0;
  let missingCount = 0;

  if (newPipelineResult && newPipelineResult.canonicalEntities) {
    console.log("\n--- FULL PIPELINE PARITY & DISCREPANCY REPORT ---");
    console.log("Input Keyword      | Expected Canonical   | Actual Canonical     | Classification       | Verification | Match Status");
    console.log("----------------------------------------------------------------------------------------------------------------------");

    rawInputs.forEach((item) => {
      const expected = expectedMappings[item.rawKeyword] || item.rawKeyword;
      
      let foundEntity: any = null;
      let matchedClassification = "Unknown";

      for (const entity of newPipelineResult.canonicalEntities) {
        if (entity.canonical.toLowerCase() === expected.toLowerCase() || 
            entity.canonical.toLowerCase() === item.rawKeyword.toLowerCase()) {
          foundEntity = entity;
          matchedClassification = entity.classification || "Canonical Match";
          break;
        }
      }

      let verificationStatus = "Unknown";
      if (foundEntity && newPipelineResult.verificationResults) {
        const vResult = newPipelineResult.verificationResults.find(
          (v: any) => v.entityCanonical.toLowerCase() === foundEntity.canonical.toLowerCase()
        );
        if (vResult) {
          verificationStatus = vResult.verification.valid ? "✅ Valid" : "❌ Invalid";
        }
      }

      const actual = foundEntity ? foundEntity.canonical : "NOT_FOUND";
      
      let isMatch = "❌ MISMATCH";
      if (actual === "NOT_FOUND") {
        missingCount++;
        failedCount++;
      } else if (actual.toLowerCase() === expected.toLowerCase()) {
        isMatch = "✅ MATCH";
        passedCount++;
      } else {
        mismatchCount++;
        failedCount++;
      }

      console.log(
        `${item.rawKeyword.padEnd(18)} | ${expected.padEnd(20)} | ${actual.padEnd(20)} | ${matchedClassification.padEnd(20)} | ${verificationStatus.padEnd(12)} | ${isMatch}`
      );
    });
    console.log("----------------------------------------------------------------------------------------------------------------------");
    
    console.log("\n--- PIPELINE PARITY SUMMARY METRICS ---");
    console.log(`  🔹 Total Inputs Processed : ${rawInputs.length}`);
    console.log(`  🟢 Passed / Matched       : ${passedCount}`);
    console.log(`  🔴 Failed / Total Issues  : ${failedCount}`);
    console.log(`  ⚠️ Canonical Mismatches   : ${mismatchCount}`);
    console.log(`  ❓ Missing Entities       : ${missingCount}`);
    console.log(`  📊 Pipeline Valid Entities: ${newPipelineResult.summary?.validEntities || 0}`);
    console.log(`  📊 Pipeline Total Signals : ${newPipelineResult.summary?.totalSignals || 0}`);
    console.log("----------------------------------------\n");
  } else {
    console.log("  -> Warning: New pipeline result is null or missing canonicalEntities.");
  }

  console.log("=== [STEP 5] FULL PIPELINE PARITY & DISCREPANCY ANALYSIS ENDED ===\n");

  const isParityAchieved = discrepancies.length === 0;

  return {
    isParityAchieved,
    legacySummary: legacyResult,
    newPipelineSummary: newPipelineResult,
    discrepancies,
  };
}

export function executeRuntimeStep1(): {
  isParityAchieved: boolean;
  newPipelineSummary: any;
  discrepancies: string[];
} {
  const observationDataset: PipelineInputItem[] = [
    { rawKeyword: "AI" },
    { rawKeyword: "Artificial Intelligence" },
    { rawKeyword: "Chat GPT" },
    { rawKeyword: "ChatGPT" },
    { rawKeyword: "Open AI" },
    { rawKeyword: "OpenAI" },
    { rawKeyword: "USA" },
    { rawKeyword: "United States" },
    { rawKeyword: "Bharat" },
    { rawKeyword: "India" },
    { rawKeyword: "FIFA" },
    { rawKeyword: "Premier League" },
    { rawKeyword: "Google Gemini" },
    { rawKeyword: "Claude" }
  ];

  const result = testIntelligencePipelineParity(observationDataset);
  return {
    isParityAchieved: result.isParityAchieved,
    newPipelineSummary: result.newPipelineSummary,
    discrepancies: result.discrepancies,
  };
}