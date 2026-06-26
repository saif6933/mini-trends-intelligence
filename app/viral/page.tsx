"use client";

import { getViralData } from "@/lib/data/datalayer";

export default function ViralPage() {
  const data = [...getViralData()];

  const ranked = [...data].sort(
    (a: any, b: any) => b.score - a.score
  );

  const predicted = [...data].sort(
    (a: any, b: any) => b.prediction - a.prediction
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🔥 Viral Intelligence</h1>

        <p style={styles.subtitle}>
          Monitor viral signals, momentum and prediction scores
        </p>
      </div>

      <div style={styles.topGrid}>
        <div style={styles.highlightCard}>
          <h2>🏆 Top Viral Signal</h2>
          <p>{ranked?.[0]?.title ?? "N/A"}</p>
        </div>

        <div style={styles.highlightCard}>
          <h2>🔮 Highest Prediction</h2>
          <p>{predicted?.[0]?.title ?? "N/A"}</p>
        </div>
      </div>

      <div style={styles.grid}>
        {ranked.map((item: any, i: number) => (
          <div key={i} style={styles.card}>
            <div style={styles.rank}>#{i + 1}</div>

            <h3>{item.title}</h3>

            <p>
              <strong>Score:</strong> {item.score}
            </p>

            <p>
              <strong>Momentum:</strong> {item.momentum}
            </p>

            <p>
              <strong>Prediction:</strong> {item.prediction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    padding: 20,
    background: "#0f0f0f",
    color: "#fff",
    minHeight: "100vh",
  },

  header: {
    marginBottom: 25,
  },

  subtitle: {
    color: "#999",
    marginTop: 6,
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: 15,
    marginBottom: 25,
  },

  highlightCard: {
    background: "#151515",
    padding: 18,
    borderRadius: 12,
    border: "1px solid #222",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
    gap: 15,
  },

  card: {
    background: "#151515",
    padding: 18,
    borderRadius: 12,
    border: "1px solid #222",
  },

  rank: {
    color: "#00ffcc",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: "14px",
  },
};