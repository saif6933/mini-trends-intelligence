import { countries } from "./countries";

export type Country = (typeof countries)[number];

export type ViralItem = {
  title: string;
  category: string;
};

// ================= CORE DATA =================

export const trendCategories = [
  "National News",
  "International News",
  "Politics",
  "Economy",
  "Markets & Business",
  "Tech News",
  "AI",
  "Space & Science",
  "Health",
  "Climate",
  "Sports",
  "Entertainment",
  "Music & Fashion",
  "Travel & Food",
] as const;

export const keywordTypes = [
  "Trending Search Terms",
  "Rising Keywords",
  "Popular Queries",
  "Geo-Based Keywords",
  "Long-tail Keywords",
  "Question-Based Keywords",
  "Intent-Based Keywords",
  "Real-Time Keywords",
] as const;

// ================= VIRAL CATEGORIES =================

export const viralCategories = [
  "News & Current Affairs",
  "Disasters & Emergencies",
  "Entertainment",
  "Sports",
  "Tech & AI",
  "Music",
  "Lifestyle & Culture",
] as const;

const VIRAL_CATEGORY_MAP: Record<string, string> = {
  video: "Entertainment",
  news: "News & Current Affairs",
  ai: "Tech & AI",
  social: "Lifestyle & Culture",
};

// ================= SCORES =================

const COUNTRY_SCORE_MAP: Record<string, number> = {
  "United States": 95,
  "United Kingdom": 80,
  "South Korea": 85,
  Brazil: 70,
  Japan: 75,
  India: 90,
  China: 88,
  Germany: 82,
  France: 78,
  Canada: 80,
  Australia: 76,
  Spain: 74,
  Indonesia: 72,
  Mexico: 73,
};

const CATEGORY_SCORE_MAP: Record<string, number> = {
  "National News": 88,
  "International News": 87,
  Politics: 85,
  Economy: 80,
  "Markets & Business": 84,
  "Tech News": 95,
  AI: 100,
  "Space & Science": 90,
  Health: 82,
  Climate: 78,
  Sports: 75,
  Entertainment: 70,
  "Music & Fashion": 72,
  "Travel & Food": 68,
};

const VIRAL_CATEGORY_SCORE_MAP: Record<string, number> = {
  "News & Current Affairs": 85,
  "Disasters & Emergencies": 95,
  Entertainment: 80,
  Sports: 75,
  "Tech & AI": 100,
  Music: 70,
  "Lifestyle & Culture": 78,
};

const MODULE_SCORE_MAP: Record<string, number> = {
  Trends: 85,
  Viral: 80,
  Keywords: 90,
};

// ================= VIRAL DATA =================

export const viral: ViralItem[] = [
  {
    title: "Breaking World Headlines",
    category: "news",
  },
  {
    title: "Global Disaster Updates",
    category: "Disasters & Emergencies",
  },
  {
    title: "Trending YouTube Shorts",
    category: "video",
  },
  {
    title: "Viral Sports Highlights",
    category: "Sports",
  },
  {
    title: "Viral AI Videos",
    category: "ai",
  },
  {
    title: "Trending Music Reels",
    category: "Music",
  },
  {
    title: "Lifestyle & Culture Moments",
    category: "Lifestyle & Culture",
  },
];

// ================= HELPERS =================

const normalize = (s: string = "") => s.toLowerCase().trim();

// ================= CORE =================

export function getCountryScore(country: string): number {
  return COUNTRY_SCORE_MAP[country] ?? 50;
}

export function getTrendScore(country: string, category: string): number {
  const countryScore = COUNTRY_SCORE_MAP[country] ?? 50;
  const categoryScore = CATEGORY_SCORE_MAP[category] ?? 60;

  return Math.round(countryScore * 0.6 + categoryScore * 0.4);
}

export function getModuleScore(module: string): number {
  return MODULE_SCORE_MAP[module] ?? 50;
}

export function getFocusArea() {
  return {
    name: "Tech & AI",
    score: 95,
    confidence: "High",
  };
}

// ================= TREND ANALYSIS =================

export function getTrendStrength(
  country: string,
  category: string
): "Low" | "Medium" | "High" {
  const score = getTrendScore(country, category);

  if (score >= 90) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

// ================= VIRAL ENGINE =================

function resolveViralCategory(
  rawCategory: string,
  title: string
): string {
  const cat = normalize(rawCategory);

  if (VIRAL_CATEGORY_MAP[cat]) return VIRAL_CATEGORY_MAP[cat];

  const t = normalize(title);

  if (t.includes("ai")) return "Tech & AI";

  if (
    t.includes("news") ||
    t.includes("breaking")
  ) {
    return "News & Current Affairs";
  }

  if (t.includes("sports")) return "Sports";

  return "Entertainment";
}

export function getViralScore(
  category: string,
  title: string
): number {
  const resolved = resolveViralCategory(category, title);

  const base =
    VIRAL_CATEGORY_SCORE_MAP[resolved] ?? 70;

  let boost = 0;

  const t = normalize(title);

  if (t.includes("viral")) boost += 10;
  if (t.includes("trending")) boost += 5;

  return base + boost;
}

export function getViralMomentum(
  category: string,
  title: string
): number {
  return (
    getViralScore(category, title) +
    (normalize(title).includes("trending") ? 8 : 0)
  );
}

export function getViralPredictionScore(
  category: string,
  title: string
): number {
  return Math.round(
    getViralMomentum(category, title) * 1.1
  );
}

export function getViralIntelligence(
  category: string,
  title: string
) {
  const base = getViralScore(category, title);
  const momentum = getViralMomentum(category, title);
  const prediction = getViralPredictionScore(
    category,
    title
  );

  return {
    baseScore: base,
    momentumScore: momentum,
    predictionScore: prediction,
    isHighPotential: prediction >= 95,
    riskLevel:
      prediction >= 95
        ? "High"
        : prediction >= 80
        ? "Medium"
        : "Low",
  };
}