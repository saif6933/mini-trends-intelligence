"use client";

import {
  getHomeData,
  getTrendsData,
  getViralData,
  getKeywordsData,
} from "@/lib/data/datalayer";

export default function HomePage() {
  const data = getHomeData();

  const focus = data?.focus ?? { name: "N/A", score: 0 };
  const modules = data?.modules ?? [];
  const countries = data?.countries ?? [];
  const topCountry = data?.topCountry ?? { name: "N/A", score: 0 };

  const topTrend = getTrendsData()?.[0] ?? null;
  const topViral = getViralData()?.[0] ?? null;
  const topKeyword = getKeywordsData()?.[0] ?? null;

  return (
    <div style={styles.container}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.badge}>LIVE INTELLIGENCE SYSTEM</div>

        <h1 style={styles.heroTitle}>
          🌍 Intelligence Command Center
        </h1>

        <p style={styles.heroText}>
          Real-time global trend intelligence dashboard with AI-driven insights
        </p>
      </section>

      {/* TOP METRICS */}
      <section style={styles.topGrid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🧠 Focus Area</h2>
          <h3>{focus.name}</h3>
          <p>Score: <b>{focus.score}</b></p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🌍 Top Country</h2>
          <h3>{topCountry.name}</h3>
          <p>Score: <b>{topCountry.score}</b></p>
        </div>
      </section>

      {/* MODULES */}
      <section style={styles.sectionTitle}>
        <h2>📊 Intelligence Modules</h2>
      </section>

      <section style={styles.grid}>
        {modules.map((m: any, i: number) => (
          <div key={i} style={styles.card}>
            <h3>{m.name}</h3>
            <p>Score: <b>{m.score}</b></p>
          </div>
        ))}
      </section>

      {/* LIVE INTELLIGENCE */}
      <section style={styles.sectionTitle}>
        <h2>🔥 Live Intelligence Preview</h2>
      </section>

      <section style={styles.grid}>
        <div style={styles.cardHover}>
          <h3>🌍 Top Trend</h3>
          <p>{topTrend?.country ?? "N/A"}</p>
          <p>{topTrend?.topCategory?.name ?? "N/A"}</p>
        </div>

        <div style={styles.cardHover}>
          <h3>🔥 Viral Signal</h3>
          <p>{topViral?.title ?? "N/A"}</p>
          <p>Score: <b>{topViral?.prediction ?? 0}</b></p>
        </div>

        <div style={styles.cardHover}>
          <h3>🔎 Keyword Signal</h3>
          <p>{topKeyword?.keyword ?? "N/A"}</p>
          <p>Score: <b>{topKeyword?.score ?? 0}</b></p>
        </div>
      </section>

      {/* COUNTRIES */}
      <section style={styles.sectionTitle}>
        <h2>🌎 Country Intelligence</h2>
      </section>

      <section style={styles.grid}>
        {countries.map((c: any, i: number) => (
          <div key={i} style={styles.card}>
            <h3>{c.name}</h3>
            <p>Score: <b>{c.score}</b></p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <div style={styles.footer}>
        Stable Mode Active • UI Polished Version
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    padding: "30px",
    background: "radial-gradient(circle at top, #0f0f0f, #0a0a0a)",
    color: "#fff",
    minHeight: "100vh",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
    animation: "fadeIn 0.6s ease-in",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#00ffcc",
    color: "#000",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  heroTitle: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#00ffcc",
  },

  heroText: {
    color: "#aaa",
    fontSize: "1rem",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "15px",
    marginBottom: "25px",
  },

  sectionTitle: {
    marginTop: "35px",
    marginBottom: "15px",
    color: "#00ffcc",
  },

  card: {
    background: "#151515",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #222",
  },

  cardHover: {
    background: "#151515",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #222",
    transition: "0.2s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  },

  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#666",
    fontSize: "13px",
  },
};