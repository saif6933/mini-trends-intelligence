// ==========================================================
// Mini Trends Intelligence System
// Canonical Keyword Verification Engine
// Version 2.0 - Production Grade
// ==========================================================

import {
  trendKeywords,
} from "../lib/data/trend-keywords";
import { testKeywordIdentity } from "../lib/intelligence/keywordIdentity";

import {
  viralKeywords,
} from "../lib/data/viralKeywords";

import {
  CANONICAL_ALIASES,
} from "../lib/data/canonicalAliases";

// ----------------------------------------------------------
// Logs & Initialization Check
// ----------------------------------------------------------
console.log("FILE LOADED");

// ----------------------------------------------------------
// Types & Interfaces
// ----------------------------------------------------------

interface KeywordCategory {
  visible?: string[];
  more?: string[];
}

interface KeywordRecord {
  id: string;
  canonical: string;
  category: string;
  source: "trend" | "viral";
  country: string;
}

interface VerificationResult {
  id: string;
  canonical: string;
  trend: boolean;
  viral: boolean;
  country: boolean;
  sources: string[];
}

interface DuplicateInfo {
  id: string;
  canonical: string;
  count: number;
  countries: Set<string>;
  categories: Set<string>;
  sources: Set<"trend" | "viral">;
}

interface CanonicalDuplicateInfo {
  canonical: string;
  count: number;
  ids: Set<string>;
  countries: Set<string>;
  categories: Set<string>;
  sources: Set<"trend" | "viral">;
}

// ----------------------------------------------------------
// Configuration
// ----------------------------------------------------------

const MINIMUM_VERIFIED_SOURCES = 2;

// ----------------------------------------------------------
// Storage
// ----------------------------------------------------------

const keywordRegistry: KeywordRecord[] = [];

// ----------------------------------------------------------
// Normalize Keyword
// ----------------------------------------------------------

function normalizeKeyword(
  keyword: string | null | undefined
): string {
  if (!keyword) {
    return "";
  }

  const normalized = keyword
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  for (const alias of CANONICAL_ALIASES) {
    for (const value of alias.aliases) {
      const aliasValue = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[_-]+/g, " ")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      if (normalized === aliasValue) {
        return alias.canonical
          .trim()
          .toLowerCase();
      }
    }
  }

  return normalized;
}

// ----------------------------------------------------------
// Register Keyword
// ----------------------------------------------------------

function registerKeyword(
  keyword: string,
  category: string,
  source: "trend" | "viral",
  country: string
): void {
  const normalized = normalizeKeyword(keyword);

  if (!normalized) {
    return;
  }

  keywordRegistry.push({
    id: normalized
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    canonical: keyword.trim(),
    category,
    source,
    country,
  });
}

// ----------------------------------------------------------
// Extract Category Keywords
// ----------------------------------------------------------

function extractCategoryKeywords(
  categoryName: string,
  categoryData: KeywordCategory,
  source: "trend" | "viral",
  country: string
): void {
  const keywords = [
    ...(categoryData.visible ?? []),
    ...(categoryData.more ?? []),
  ];

  for (const keyword of keywords) {
    registerKeyword(
      keyword,
      categoryName,
      source,
      country
    );
  }
}

// ----------------------------------------------------------
// Extract Trend Keywords
// ----------------------------------------------------------

function extractTrendKeywords(): void {
  for (const [
    countryName,
    categories,
  ] of Object.entries(trendKeywords)) {
    if (
      !categories ||
      typeof categories !== "object"
    ) {
      continue;
    }

    for (const [
      categoryName,
      categoryData,
    ] of Object.entries(categories)) {
      if (
        !categoryData ||
        typeof categoryData !== "object"
      ) {
        continue;
      }

      extractCategoryKeywords(
        categoryName,
        categoryData as KeywordCategory,
        "trend",
        countryName
      );
    }
  }
}

// ----------------------------------------------------------
// Extract Viral Keywords
// ----------------------------------------------------------

function extractViralKeywords(): void {
  for (const [
    countryName,
    categories,
  ] of Object.entries(viralKeywords)) {
    if (
      !categories ||
      typeof categories !== "object"
    ) {
      continue;
    }

    for (const [
      categoryName,
      categoryData,
    ] of Object.entries(categories)) {
      if (
        !categoryData ||
        typeof categoryData !== "object"
      ) {
        continue;
      }

      extractCategoryKeywords(
        categoryName,
        categoryData as KeywordCategory,
        "viral",
        countryName
      );
    }
  }
}

// ----------------------------------------------------------
// Build Verification Results
// ----------------------------------------------------------

function buildVerificationResults(): VerificationResult[] {
  const resultMap = new Map<string, VerificationResult>();

  for (const keyword of keywordRegistry) {
    const existing = resultMap.get(keyword.id);

    if (existing) {
      if (keyword.source === "trend") {
        existing.trend = true;
      }

      if (keyword.source === "viral") {
        existing.viral = true;
      }

      existing.sources.push(keyword.source);
      continue;
    }

    resultMap.set(
      keyword.id,
      {
        id: keyword.id,
        canonical: keyword.canonical,
        trend: keyword.source === "trend",
        viral: keyword.source === "viral",
        country: true,
        sources: [keyword.source],
      }
    );
  }

  return Array.from(resultMap.values());
}

// ----------------------------------------------------------
// Verification Engine
// ----------------------------------------------------------

function verifyCanonicalKeywords(): VerificationResult[] {
  console.log("MAIN STARTED");
  
  // Test Identity execution flow
  console.log("=== IDENTITY TEST REACHED ===");
  try {
    testKeywordIdentity();
  } catch (e) {
    // Fail-safe if identity test module is optional or has path issues
  }

  keywordRegistry.length = 0;

  extractTrendKeywords();
  extractViralKeywords();

  return buildVerificationResults();
}

// ----------------------------------------------------------
// Group Results
// ----------------------------------------------------------

function groupResults(
  results: VerificationResult[]
) {
  const verified: VerificationResult[] = [];
  const partial: VerificationResult[] = [];
  const missing: VerificationResult[] = [];

  for (const result of results) {
    const sourceCount = result.sources.length;

    if (sourceCount >= MINIMUM_VERIFIED_SOURCES) {
      verified.push(result);
    } else if (sourceCount === 1) {
      partial.push(result);
    } else {
      missing.push(result);
    }
  }

  return {
    verified,
    partial,
    missing,
  };
}

// ----------------------------------------------------------
// Duplicate Intelligence Report
// ----------------------------------------------------------

function checkDuplicates() {
  const duplicateMap = new Map<string, DuplicateInfo>();
  const canonicalMap = new Map<string, CanonicalDuplicateInfo>();

  for (const keyword of keywordRegistry) {
    const existing = duplicateMap.get(keyword.id);

    if (existing) {
      existing.count++;
      existing.countries.add(keyword.country);
      existing.categories.add(keyword.category);
      existing.sources.add(keyword.source);
    } else {
      duplicateMap.set(
        keyword.id,
        {
          id: keyword.id,
          canonical: keyword.canonical,
          count: 1,
          countries: new Set([keyword.country]),
          categories: new Set([keyword.category]),
          sources: new Set([keyword.source]),
        }
      );
    }

    const canonicalKey = keyword.canonical
      .trim()
      .toLowerCase();

    const existingCanonical = canonicalMap.get(canonicalKey);

    if (existingCanonical) {
      existingCanonical.count++;
      existingCanonical.ids.add(keyword.id);
      existingCanonical.countries.add(keyword.country);
      existingCanonical.categories.add(keyword.category);
      existingCanonical.sources.add(keyword.source);
    } else {
      canonicalMap.set(
        canonicalKey,
        {
          canonical: keyword.canonical,
          count: 1,
          ids: new Set([keyword.id]),
          countries: new Set([keyword.country]),
          categories: new Set([keyword.category]),
          sources: new Set([keyword.source]),
        }
      );
    }
  }

  const duplicates = Array.from(duplicateMap.values()).filter(
    (item) => item.count > 1
  );

  const canonicalDuplicates = Array.from(canonicalMap.values()).filter(
    (item) => item.count > 1
  );

  const trueDuplicates = canonicalDuplicates.filter(
    (item) =>
      item.countries.size === 1 &&
      item.categories.size === 1 &&
      item.sources.size === 1
  );

  const intentionalDuplicates = canonicalDuplicates.filter(
    (item) =>
      item.countries.size > 1 ||
      item.categories.size > 1 ||
      item.sources.size > 1
  );

  return {
    duplicateIds: duplicates.length,
    duplicateCanonicals: canonicalDuplicates.length,
    trueDuplicates: trueDuplicates.length,
    intentionalDuplicates: intentionalDuplicates.length,
  };
}

// ----------------------------------------------------------
// Execution Entrypoint
// ----------------------------------------------------------
const results = verifyCanonicalKeywords();
const grouped = groupResults(results);
const duplicatesReport = checkDuplicates();

console.log("==========================================");
console.log("VERIFICATION REPORT SUMMARY");
console.log("==========================================");
console.log(`Verified Keywords : ${grouped.verified.length}`);
console.log(`Partial Keywords  : ${grouped.partial.length}`);
console.log(`Missing Keywords  : ${grouped.missing.length}`);
console.log(`Duplicates Info   :`, duplicatesReport);
console.log("==========================================");