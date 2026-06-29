import { countries } from "./countries";
export type Country = (typeof countries)[number];

export type ViralItem = {
  title: string;
  country: Country;
  category: (typeof viralCategories)[number];
  platform: (typeof viralPlatforms)[number];
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

// ================= PLATFORMS =================

export const viralPlatforms = [
  "YouTube",
  "X (Twitter)",
  "TikTok",
  "Instagram",
  "Facebook",
  "Reddit",
  "Google Discover",
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
    country: "United States",
    category: "News & Current Affairs",
    platform: "Google Discover",
  },
  {
    title: "UK Flood Emergency",
    country: "United Kingdom",
    category: "Disasters & Emergencies",
    platform: "X (Twitter)",
  },
  {
    title: "K-Drama Buzz",
    country: "South Korea",
    category: "Entertainment",
    platform: "YouTube",
  },
  {
    title: "Brazil Football Fever",
    country: "Brazil",
    category: "Sports",
    platform: "Instagram",
  },
  {
    title: "Japan AI Robotics",
    country: "Japan",
    category: "Tech & AI",
    platform: "YouTube",
  },
  {
    title: "India Music Reels",
    country: "India",
    category: "Music",
    platform: "TikTok",
  },
  {
    title: "China Lifestyle Trends",
    country: "China",
    category: "Lifestyle & Culture",
    platform: "Reddit",
  },
  {
    title: "Germany Election Headlines",
    country: "Germany",
    category: "News & Current Affairs",
    platform: "Facebook",
  },
  {
    title: "France Heatwave",
    country: "France",
    category: "Disasters & Emergencies",
    platform: "Google Discover",
  },
  {
    title: "Canada Movie Premiere",
    country: "Canada",
    category: "Entertainment",
    platform: "YouTube",
  },
  {
    title: "Australia Cricket Buzz",
    country: "Australia",
    category: "Sports",
    platform: "X (Twitter)",
  },
  {
    title: "Spain AI Startups",
    country: "Spain",
    category: "Tech & AI",
    platform: "Facebook",
  },
  {
    title: "Indonesia Music Festival",
    country: "Indonesia",
    category: "Music",
    platform: "TikTok",
  },
  {
    title: "Mexico Travel Lifestyle",
    country: "Mexico",
    category: "Lifestyle & Culture",
    platform: "Instagram",
  },
];

// ================= HELPERS =================

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

function resolveViralCategory(category: string): string {
  const cat = normalize(category);

  if (VIRAL_CATEGORY_MAP[cat]) return VIRAL_CATEGORY_MAP[cat];

  if (
    viralCategories.includes(category as (typeof viralCategories)[number])
  ) {
    return category;
  }

  return "Entertainment";
}

export function getViralScore(item: ViralItem): number {
  const resolved = resolveViralCategory(item.category);

  const categoryScore =
    VIRAL_CATEGORY_SCORE_MAP[resolved] ?? 70;

  const countryScore =
    COUNTRY_SCORE_MAP[item.country] ?? 50;

  let platformBoost = 0;

  switch (item.platform) {
    case "Google Discover":
      platformBoost = 8;
      break;
    case "YouTube":
      platformBoost = 7;
      break;
    case "X (Twitter)":
      platformBoost = 6;
      break;
    case "TikTok":
      platformBoost = 6;
      break;
    case "Instagram":
      platformBoost = 5;
      break;
    case "Facebook":
      platformBoost = 4;
      break;
    case "Reddit":
      platformBoost = 3;
      break;
  }

  return Math.round(
    categoryScore * 0.55 +
      countryScore * 0.35 +
      platformBoost
  );
}

export function getViralMomentum(item: ViralItem): number {
  let momentum = getViralScore(item);

  if (normalize(item.title).includes("breaking")) momentum += 8;
  if (normalize(item.title).includes("viral")) momentum += 8;
  if (normalize(item.title).includes("trending")) momentum += 5;

  return momentum;
}

export function getViralPredictionScore(
  item: ViralItem
): number {
  return Math.round(getViralMomentum(item) * 1.1);
}

export function getViralIntelligence(item: ViralItem) {
  const base = getViralScore(item);
  const momentum = getViralMomentum(item);
  const prediction = getViralPredictionScore(item);

  return {
    baseScore: base,
    momentumScore: momentum,
    predictionScore: prediction,

    country: item.country,
    category: item.category,
    platform: item.platform,

    isHighPotential: prediction >= 95,

    riskLevel:
      prediction >= 95
        ? "High"
        : prediction >= 80
        ? "Medium"
        : "Low",
  };
}