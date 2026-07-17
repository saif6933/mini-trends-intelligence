// ==========================================================
// Mini Trends Intelligence System
// Canonical Keyword Verification Engine
// Version 2.0 - Production Grade
// Part 1 / 3
// ==========================================================


// ----------------------------------------------------------
// Imports
// ----------------------------------------------------------

import {
  trendKeywords,
} from "../lib/data/trend-keywords";


import {
  viralKeywords,
} from "../lib/data/viralKeywords";


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
}


interface VerificationResult {
  id: string;
  canonical: string;

  trend: boolean;
  viral: boolean;
  country: boolean;

  sources: string[];
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


  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

}


// ----------------------------------------------------------
// Register Keyword
// ----------------------------------------------------------

function registerKeyword(
  keyword: string,
  category: string,
  source: "trend" | "viral"
): void {


  const normalized =
    normalizeKeyword(keyword);


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

  });

}
// ----------------------------------------------------------
// Extract Category Keywords
// ----------------------------------------------------------

function extractCategoryKeywords(
  categoryName: string,
  categoryData: KeywordCategory,
  source: "trend" | "viral"
): void {


  const keywords = [

    ...(categoryData.visible ?? []),

    ...(categoryData.more ?? []),

  ];



  for (const keyword of keywords) {


    registerKeyword(
      keyword,
      categoryName,
      source
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

        "trend"

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

        "viral"

      );


    }


  }


}


// ----------------------------------------------------------
// Build Verification Results
// ----------------------------------------------------------

function buildVerificationResults(): VerificationResult[] {


  const resultMap =
    new Map<string, VerificationResult>();



  for (const keyword of keywordRegistry) {


    const existing =
      resultMap.get(keyword.id);



    if (existing) {


      if (keyword.source === "trend") {

        existing.trend = true;

      }



      if (keyword.source === "viral") {

        existing.viral = true;

      }



      existing.sources.push(
        keyword.source
      );


      continue;

    }



    resultMap.set(

      keyword.id,

      {

        id: keyword.id,

        canonical: keyword.canonical,

        trend:
          keyword.source === "trend",

        viral:
          keyword.source === "viral",

        country: true,

        sources: [
          keyword.source,
        ],

      }

    );


  }



  return Array.from(
    resultMap.values()
  );


}


// ----------------------------------------------------------
// Verification Engine
// ----------------------------------------------------------

function verifyCanonicalKeywords(): VerificationResult[] {


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


    const sourceCount =
      result.sources.length;



    if (
      sourceCount >= MINIMUM_VERIFIED_SOURCES
    ) {

      verified.push(result);

    }
    else if (
      sourceCount === 1
    ) {

      partial.push(result);

    }
    else {

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
// Reporting
// ----------------------------------------------------------

function printSection(
  title: string,
  items: VerificationResult[]
): void {


  console.log("");

  console.log(
    "=================================================="
  );

  console.log(title);

  console.log(
    "=================================================="
  );



  if (items.length === 0) {

    console.log("None");

    return;

  }



  for (const item of items) {


    console.log(

      `${item.id.padEnd(35)} ` +

      `Trend:${item.trend ? "✓" : "✗"}  ` +

      `Viral:${item.viral ? "✓" : "✗"}  ` +

      `Country:${item.country ? "✓" : "✗"}`

    );


  }


}


// ----------------------------------------------------------
// Duplicate Check
// ----------------------------------------------------------

function checkDuplicates() {


  const ids =
    new Set<string>();


  const canonicals =
    new Set<string>();


  let duplicateIds = 0;

  let duplicateCanonicals = 0;



  for (const keyword of keywordRegistry) {


    if (
      ids.has(keyword.id)
    ) {

      duplicateIds++;

      console.log(
        `Duplicate ID: ${keyword.id}`
      );

    }


    ids.add(keyword.id);



    const canonical =
      normalizeKeyword(
        keyword.canonical
      );



    if (
      canonicals.has(canonical)
    ) {

      duplicateCanonicals++;

      console.log(
        `Duplicate Canonical: ${keyword.canonical}`
      );

    }



    canonicals.add(canonical);


  }



  return {

    duplicateIds,

    duplicateCanonicals,

  };

}


// ----------------------------------------------------------
// Main
// ----------------------------------------------------------

function main(): void {


  console.clear();


  console.log("");

  console.log(
    "==============================================="
  );

  console.log(
    " Mini Trends Intelligence System"
  );

  console.log(
    " Canonical Keyword Verification Engine v2.0"
  );

  console.log(
    "==============================================="
  );



  const results =
    verifyCanonicalKeywords();



  const grouped =
    groupResults(results);



  const duplicates =
    checkDuplicates();



  printSection(
    "VERIFIED (2+ Sources)",
    grouped.verified
  );


  printSection(
    "PARTIAL (1 Source)",
    grouped.partial
  );


  printSection(
    "MISSING",
    grouped.missing
  );



  console.log("");

  console.log(
    "==============================================="
  );

  console.log(
    "SUMMARY"
  );

  console.log(
    "==============================================="
  );



  console.log(
    `Total Keywords      : ${results.length}`
  );


  console.log(
    `Verified            : ${grouped.verified.length}`
  );


  console.log(
    `Partial             : ${grouped.partial.length}`
  );


  console.log(
    `Missing             : ${grouped.missing.length}`
  );


  console.log(
    `Duplicate IDs       : ${duplicates.duplicateIds}`
  );


  console.log(
    `Duplicate Canonical : ${duplicates.duplicateCanonicals}`
  );



  console.log("");

  console.log(
    "Verification Complete."
  );


}


// ----------------------------------------------------------
// Execute
// ----------------------------------------------------------

main();