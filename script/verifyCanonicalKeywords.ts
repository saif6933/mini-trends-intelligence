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
  source: "trend" | "viral",
  country: string
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
// Duplicate Intelligence Report
// ----------------------------------------------------------

function checkDuplicates() {

  const duplicateMap =
    new Map<string, DuplicateInfo>();


  for (const keyword of keywordRegistry) {

    const existing =
      duplicateMap.get(keyword.id);

    if (existing) {

      existing.count++;

      existing.countries.add(
        keyword.country
      );

      existing.categories.add(
        keyword.category
      );

      existing.sources.add(
        keyword.source
      );

      continue;

    }

    duplicateMap.set(
      keyword.id,
      {
        id: keyword.id,

        canonical: keyword.canonical,

        count: 1,

        countries: new Set([
          keyword.country,
        ]),

        categories: new Set([
          keyword.category,
        ]),

        sources: new Set([
          keyword.source,
        ]),
      }
    );

  }
   const duplicates =
    Array.from(duplicateMap.values())
      .filter(
        (item) => item.count > 1
      );

  console.log("");

  console.log(
    "=================================================="
  );

  console.log(
    "DUPLICATE INTELLIGENCE REPORT"
  );

  console.log(
    "=================================================="
  );

  if (duplicates.length === 0) {

    console.log(
      "No duplicate keywords found."
    );

  }
  else {

    for (const item of duplicates) {

      console.log("");

      console.log(
        `Keyword : ${item.canonical}`
      );

      console.log(
        `ID      : ${item.id}`
      );

      console.log(
        `Count   : ${item.count}`
      );

      console.log("");

      console.log("Countries");

      console.log("---------");

      for (const country of item.countries) {

        console.log(country);

      }

      console.log("");

      console.log("Categories");

      console.log("----------");

      for (const category of item.categories) {

        console.log(category);

      }

      console.log("");

      console.log("Sources");

      console.log("-------");

      for (const source of item.sources) {

        console.log(source);

      }

      console.log("");

      console.log(
        "--------------------------------------------------"
      );

    }

  }
    return {

    duplicateIds: duplicates.length,

    duplicateCanonicals: duplicates.length,

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