// ==========================================================
// Mini Trends Intelligence System
// Keyword Identity Intelligence Engine (KIIE)
// Version 1.0 - Production Grade
// ==========================================================

import { CANONICAL_ALIASES } from "../data/canonicalAliases";
import { resolveKeywordIdentity } from "./keywordIdentity";
import { IdentityDecision, IdentityType } from "./identityTypes";

export interface KeywordIntelligenceResult {
  rawKeyword: string;
  normalizedKeyword: string;
  identity: IdentityType;
  canonical: string;
  reason: string;
}

/**
 * Local helper to normalize keyword using existing canonical aliases dictionary safely
 */
function normalizeKeyword(keyword: string): string {
  if (!keyword) return "";
  const cleaned = keyword.trim().toLowerCase();
  
  for (const item of CANONICAL_ALIASES) {
    for (const alias of item.aliases) {
      if (alias.toLowerCase() === cleaned) {
        return item.canonical;
      }
    }
  }
  return keyword.trim();
}

/**
 * Keyword Identity Intelligence Engine (KIIE)
 * Processes a raw keyword through normalization and identity resolution.
 */
export function processKeywordIdentity(
  rawKeyword: string
): KeywordIntelligenceResult {
  const trimmedRaw = rawKeyword ?? "";
  
  // 1. Normalize the raw keyword safely using the dictionary
  const normalizedKeyword = normalizeKeyword(trimmedRaw);

  // 2. Resolve the identity using the existing registry and identity resolver
  const decision: IdentityDecision = resolveKeywordIdentity(trimmedRaw);

  return {
    rawKeyword: trimmedRaw,
    normalizedKeyword,
    identity: decision.type,
    canonical: decision.canonical,
    reason: decision.reason,
  };
}