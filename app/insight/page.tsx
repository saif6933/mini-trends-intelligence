"use client";

import {
  getHomeData,
  getTrendsData,
  getViralData,
  getKeywordsData,
} from "@/lib/data/datalayer";

export default function InsightPage() {
  const home = getHomeData();

  const trends = [...getTrendsData()].sort(
    (a, b) => b.avgScore - a.avgScore
  );

  const viral = [...getViralData()].sort(
    (a, b) => b.prediction - a.prediction
  );

  const keywords = [...getKeywordsData()].sort(
    (a, b) => b.score - a.score
  );

  const topTrend = trends[0];
  const topViral = viral[0];
  const topKeyword = keywords[0];

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.badge}>AI INSIGHT ENGINE</div>

        <h1 style={styles.title}>🧠 Insight Command Center</h1>

        <p style={styles.subtitle}>
          Actionable AI-driven recommendations from real-time intelligence signals
        </p>
      </div>

      {/* FOCUS */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔥 Focus Area</h2>
        <h3>{home.focus.name}</h3>
        <p>Score: <b>{home.focus.score}</b></p>

        <div style={styles.recommendation}>
          👉 Focus on AI, automation and technology-related content because this area currently has the strongest intelligence score.
        </div>
      </div>

      {/* TREND */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🌍 Top Trend Opportunity</h2>

        <h3>{topTrend?.country}</h3>
        <p>Category: <b>{topTrend?.topCategory?.name}</b></p>
        <p>Average Score: <b>{topTrend?.avgScore?.toFixed(1)}</b></p>

        <div style={styles.recommendation}>
          👉 Create content around <strong>{topTrend?.topCategory?.name}</strong> because it is leading in <strong>{topTrend?.country}</strong>.
        </div>
      </div>

      {/* VIRAL */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔥 Viral Opportunity</h2>

        <h3>{topViral?.title}</h3>
        <p>Score: <b>{topViral?.score}</b></p>
        <p>Prediction: <b>{topViral?.prediction}</b></p>

        <div style={styles.recommendation}>
          👉 This topic has high viral potential. Short videos, explainers and trend-based content may perform best.
        </div>
      </div>

      {/* KEYWORD */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔎 Keyword Opportunity</h2>

        <h3>{topKeyword?.keyword}</h3>
        <p>Score: <b>{topKeyword?.score}</b></p>

        <div style={styles.recommendation}>
          👉 Target this keyword in titles, descriptions and SEO strategy for maximum visibility.
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div style={styles.footer}>
        Insight Engine • Real-time Recommendation System
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    padding: "30px",
    background: "#0f0f0f",
    color: "#ffffff",
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  hero: {
    textAlign: "center",
    marginBottom: "35px",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#00ffcc",
    color: "#000",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  title: {
    color: "#00ffcc",
    marginBottom: "10px",
    fontSize: "2.3rem",
  },

  subtitle: {
    color: "#aaaaaa",
  },

  card: {
    background: "#151515",
    padding: "22px",
    borderRadius: "14px",
    marginBottom: "18px",
    border: "1px solid #222",
    transition: "0.2s",
  },

  cardTitle: {
    color: "#00ffcc",
    marginBottom: "10px",
  },

  recommendation: {
    marginTop: "14px",
    padding: "14px",
    background: "#1d1d1d",
    borderRadius: "10px",
    color: "#d6d6d6",
    borderLeft: "4px solid #00ffcc",
  },

  footer: {
    marginTop: "30px",
    textAlign: "center",
    color: "#666",
    fontSize: "13px",
  },
};