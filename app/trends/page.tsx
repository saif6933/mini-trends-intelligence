"use client";

import { getTrendsData } from "@/lib/data/datalayer";

export default function TrendsPage() {
  const ranked = [...getTrendsData()].sort(
    (a: any, b: any) => b.avgScore - a.avgScore
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🌍 Trends Intelligence</h1>
        <p style={styles.subtitle}>
          Real-time country trend ranking and category intelligence
        </p>
      </div>

      <div style={styles.grid}>
        {ranked.map((item: any, i: number) => (
          <div key={i} style={styles.card}>
            <div style={styles.rank}>#{i + 1}</div>

            <h3>{item.country}</h3>

            <p>
              <strong>Top Category:</strong>{" "}
              {item.topCategory?.name ?? "N/A"}
            </p>

            <p>
              <strong>Average Score:</strong>{" "}
              {item.avgScore?.toFixed?.(1) ?? 0}
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
    transition: "0.2s",
  },

  rank: {
    color: "#00ffcc",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: "14px",
  },
};