// ==========================================================
// Mini Trends Intelligence System
// Verification Engine (Phase 3.1.4 - Step 5)
// Version 1.0 - Production Grade
// ==========================================================

import { ClassifiedEntityResult } from "./identityClassificationEngine";

export interface VerificationIssue {
  code: string;
  message: string;
}

export interface VerificationResult {
  valid: boolean;
  issues: VerificationIssue[];
}

/**
 * Verification Engine
 * Performs validation checks only (Missing IDs, Broken Registry, Invalid Canonical, Invalid Context)
 * without making business decisions, classification, or reporting.
 */
export function verifyClassifiedEntity(
  classifiedResult: ClassifiedEntityResult
): VerificationResult {
  const issues: VerificationIssue[] = [];

  // 1. Check for Missing or Invalid Canonical
  if (!classifiedResult.canonical || classifiedResult.canonical.trim() === "") {
    issues.push({
      code: "INVALID_CANONICAL",
      message: "Canonical entity name is missing, empty, or undefined.",
    });
  }

  // 2. Check for Broken Registry / Classification
  if (!classifiedResult.classification) {
    issues.push({
      code: "BROKEN_REGISTRY",
      message: "Entity classification status is missing.",
    });
  }

  // 3. Check for Missing Signals (Invalid Context/Signals)
  if (!classifiedResult.signals || !Array.isArray(classifiedResult.signals)) {
    issues.push({
      code: "INVALID_SIGNALS",
      message: "Signals payload is missing or not a valid array.",
    });
  } else if (classifiedResult.signals.length === 0) {
    issues.push({
      code: "MISSING_SIGNALS",
      message: "No signals attached to the classified entity.",
    });
  } else {
    // 4. Check Individual Signals for Invalid Context
    classifiedResult.signals.forEach((signal, index) => {
      if (!signal.country || !signal.category || !signal.source || !signal.signalType) {
        issues.push({
          code: "INVALID_CONTEXT",
          message: `Signal at index ${index} contains missing or incomplete context fields.`,
        });
      }
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}