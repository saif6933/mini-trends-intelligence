"use client";

import { useMemo, useState } from "react";
import {
  getKeywordsData,
  countries,
  keywordTypes,
} from "@/lib/data/datalayer";

export default function KeywordsPage() {
  const [country, setCountry] = useState("All");
  const [type, setType] = useState("All");

  const data = useMemo(() => getKeywordsData(), []);

  const filtered = data
    .filter(
      (i: any) =>
        (country === "All" || i.country === country) &&
        (type === "All" || i.type === type)
    )
    .sort((a: any, b: any) => b.score - a.score);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🔎 Keywords Intelligence</h1>

        <p style={styles.subtitle}>
          Track keyword performance across countries and categories
        </p>
      </div>

      <div style={styles.filters}>
        <select
          style={styles.select}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="All">All Countries</option>

          {countries.map((c: any) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Types</option>

          {keywordTypes.map((t: any) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.results}>
        Results: {filtered.length}
      </div>

      <div style={styles.grid}>
        {filtered.map((item: any, i: number) => (
          <div key={i} style={styles.card}>
            <div style={styles.rank}>#{i + 1}</div>

            <h3>{item.keyword}</h3>

            <p>
              <strong>Score:</strong> {item.score}
            </p>

            {item.country && (
              <p>
                <strong>Country:</strong> {item.country}
              </p>
            )}

            {item.type && (
              <p>
                <strong>Type:</strong> {item.type}
              </p>
            )}
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

  filters: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 15,
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #222",
    background: "#151515",
    color: "#fff",
  },

  results: {
    color: "#00ffcc",
    marginBottom: 15,
    fontWeight: "bold",
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