import { countries } from "./countries";

import {
  trendCategories,
  keywordTypes,
  viral,
  getCountryScore,
  getTrendScore,
  getModuleScore,
  getFocusArea,
  getViralIntelligence,
} from "./intelligence";

// ================= GATEWAY EXPORT =================

export { countries, trendCategories, keywordTypes };

// ================= HOME =================

export function getHomeData() {
  const focus = getFocusArea();

  const modules = ["Trends", "Viral", "Keywords"].map((m) => ({
    name: m,
    score: getModuleScore(m),
  }));

  const countriesWithScore = countries.map((c) => ({
    name: c,
    score: getCountryScore(c),
  }));

  const topCountry = [...countriesWithScore].sort(
    (a, b) => b.score - a.score
  )[0];

  return {
    focus,
    modules,
    countries: countriesWithScore,
    topCountry,
    totalCountries: countries.length,
  };
}

// ================= TRENDS =================

export function getTrendsData() {
  return countries.map((country) => {
    const cats = trendCategories.map((cat) => ({
      name: cat,
      score: getTrendScore(country, cat),
    }));

    const avg =
      cats.reduce((a, b) => a + b.score, 0) / cats.length;

    const top = [...cats].sort((a, b) => b.score - a.score)[0];

    return {
      country,
      avgScore: avg,
      topCategory: top,
      categories: cats,
    };
  });
}

// ================= VIRAL =================

export function getViralData() {
  return viral.map((item) => {
    const intel = getViralIntelligence(item.category, item.title);

    return {
      ...item,
      score: intel.baseScore,
      momentum: intel.momentumScore,
      prediction: intel.predictionScore,
      hot: intel.isHighPotential,
      status: intel.isHighPotential ? "HOT" : "NORMAL",
    };
  });
}

// ================= KEYWORDS =================

export function getKeywordsData() {
  return countries.flatMap((country) =>
    keywordTypes.map((type) => {
      const score = Math.min(country.length * 2 + type.length, 100);

      return {
        keyword: `${country} ${type}`,
        country,
        category: "General",
        type,

        searchVolume: score * 1000,
        growth: Math.min(score, 100),
        intent: "Informational",
        difficulty: Math.max(10, 100 - score),

        score,
      };
    })
  );
}