"use client";

import { useState, useMemo } from "react";
import { getViralData } from "@/lib/data/datalayer";

// ✅ FRONTEND CATEGORIES (clean UI layer)
const VIRAL_CATEGORIES = [
  "All",
  "News & Current Affairs",
  "Disasters & Emergencies",
  "Entertainment",
  "Sports",
  "Tech & AI",
  "Music",
  "Lifestyle & Culture",
];

// ✅ BACKEND → FRONTEND MAPPING FIX
const normalizeCategory = (cat: string) => {
  switch ((cat || "").toLowerCase()) {
    case "ai":
      return "Tech & AI";
    case "tech & ai":
      return "Tech & AI";

    case "news":
      return "News & Current Affairs";

    case "video":
      return "Entertainment";

    case "sports":
      return "Sports";

    case "music":
      return "Music";

    case "disasters & emergencies":
      return "Disasters & Emergencies";

    case "lifestyle & culture":
      return "Lifestyle & Culture";

    default:
      return cat;
  }
};

export default function ViralPage() {
  const rawData = getViralData();

  // ✅ normalize data ONCE
  const data = useMemo(() => {
    return rawData.map((item: any) => ({
      ...item,
      category: normalizeCategory(item.category),
    }));
  }, [rawData]);

  const [category, setCategory] = useState("All");

  // ✅ safe filtering
  const filteredData = useMemo(() => {
    if (category === "All") return data;
    return data.filter((item: any) => item.category === category);
  }, [category, data]);

  const ranked = [...filteredData].sort(
    (a: any, b: any) => b.score - a.score
  );

  const predicted = [...filteredData].sort(
    (a: any, b: any) => b.prediction - a.prediction
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🔥 Viral Intelligence</h1>
        <p style={styles.subtitle}>
          Monitor viral signals, momentum and prediction scores
        </p>

        {/* CATEGORY DROPDOWN */}
        <div style={styles.dropdownWrapper}>
          <label style={{ marginRight: 10 }}>Category:</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            {VIRAL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.topGrid}>
        <div style={styles.highlightCard}>
          <h2>🏆 Top Viral Signal</h2>
          <p>{ranked?.[0]?.title ?? "No Data"}</p>
        </div>

        <div style={styles.highlightCard}>
          <h2>🔮 Highest Prediction</h2>
          <p>{predicted?.[0]?.title ?? "No Data"}</p>
        </div>
      </div>

      <div style={styles.grid}>
        {ranked.map((item: any, i: number) => (
          <div key={i} style={styles.card}>
            <div style={styles.rank}>#{i + 1}</div>

            <h3>{item.title}</h3>

            <p>
              <strong>Category:</strong> {item.category ?? "Unknown"}
            </p>

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
  header: { marginBottom: 25 },
  subtitle: { color: "#999", marginTop: 6 },

  dropdownWrapper: {
    marginTop: 15,
    display: "flex",
    alignItems: "center",
  },

  select: {
    padding: 8,
    background: "#151515",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 6,
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