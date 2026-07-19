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

import {
  CANONICAL_ALIASES,
} from "../lib/data/canonicalAliases";

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
console.log("=================================");
console.log("SPORTS NORMALIZATION TEST");
console.log("=================================");

const sportsTestKeywords = [
  "EPL",
  "English Premier League",
  "UCL",
  "Champions League",
  "FIFA WC",
  "IPL",
  "NBA",
  "F1",
];

for (const keyword of sportsTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("ALIAS COVERAGE TEST");
console.log("=================================");

let aliasMatches = 0;

for (const keyword of keywordRegistry) {

  const normalized = normalizeKeyword(keyword.id);

  if (normalized !== keyword.id.toLowerCase()) {
    aliasMatches++;
  }

}

console.log(
  "Total Keywords:",
  keywordRegistry.length
);

console.log(
  "Alias Matches:",
  aliasMatches
);
console.log("=================================");
console.log("CANONICAL ALIAS MATCH TEST");
console.log("=================================");

let canonicalAliasMatches = 0;

for (const keyword of keywordRegistry) {

  const original =
    keyword.id
      .toLowerCase()
      .trim();

  const normalized =
    normalizeKeyword(keyword.id);

  for (const alias of CANONICAL_ALIASES) {

    const canonical =
      alias.canonical
        .toLowerCase()
        .trim();

    if (
      normalized === canonical &&
      original !== canonical
    ) {
      canonicalAliasMatches++;
      break;
    }

  }

}

console.log(
  "Canonical Alias Matches:",
  canonicalAliasMatches
);
console.log("=================================");
console.log("POLITICS NORMALIZATION TEST");
console.log("=================================");

const politicsTestKeywords = [
  "Trump",
  "President Trump",
  "Biden",
  "PM Modi",
  "President Xi",
  "Putin",
  "Zelensky",
  "Macron",
  "Starmer",
  "UN",
  "EU",
  "North Atlantic Treaty Organization",
];

for (const keyword of politicsTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("TECH NORMALIZATION TEST");
console.log("=================================");

const techTestKeywords = [
  "Google Search",
  "MSFT",
  "Apple Inc.",
  "Facebook",
  "Amazon.com",
  "Open AI",
  "Claude AI",
  "Nvidia",
  "Tesla Motors",
  "Space Exploration Technologies",
];

for (const keyword of techTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("SOCIAL PLATFORMS NORMALIZATION TEST");
console.log("=================================");

const socialTestKeywords = [
  "YT",
  "FB",
  "Insta",
  "IG",
  "Twitter",
  "X.com",
  "Tik Tok",
  "WA",
  "TG",
  "Linked In",
];

for (const keyword of socialTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("ENTERTAINMENT NORMALIZATION TEST");
console.log("=================================");

const entertainmentTestKeywords = [
  "Netflix Inc.",
  "The Walt Disney Company",
  "Marvel Studios",
  "DC Comics",
  "Spotify Music",
  "Apple Music",
  "Amazon Prime Video",
  "Max",
  "Disney Plus",
  "Crunchyroll",
];

for (const keyword of entertainmentTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("ORGANIZATIONS NORMALIZATION TEST");
console.log("=================================");

const organizationTestKeywords = [
  "WHO",
  "IMF",
  "WB",
  "WTO",
  "International Criminal Police Organization",
  "United Nations Educational, Scientific and Cultural Organization",
  "United Nations Children's Fund",
];

for (const keyword of organizationTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("ECONOMY & FINANCE NORMALIZATION TEST");
console.log("=================================");

const financeTestKeywords = [
  "SP500",
  "Nasdaq Composite",
  "DJIA",
  "BTC",
  "ETH",
  "USD",
  "EUR",
  "XAU",
  "WTI",
  "Fed",
];

for (const keyword of financeTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}
console.log("=================================");
console.log("SCIENCE & SPACE NORMALIZATION TEST");
console.log("=================================");

const scienceTestKeywords = [
  "National Aeronautics and Space Administration",
  "European Space Agency",
  "Indian Space Research Organization",
  "Blue Origin",
  "JWST",
  "Hubble",
  "NASA Artemis",
  "ISS",
  "European Organization for Nuclear Research",
];

for (const keyword of scienceTestKeywords) {
  console.log(
    keyword,
    "=>",
    normalizeKeyword(keyword)
  );
}