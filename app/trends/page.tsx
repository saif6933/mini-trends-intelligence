"use client";

import { useMemo, useState } from "react";
import {
  getTrendsData,
  trendCategories,
} from "@/lib/data/datalayer";

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const ranked = useMemo(() => {
    const data = [...getTrendsData()].sort(
      (a: any, b: any) => b.avgScore - a.avgScore
    );

    return data;
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
       npm run dev

        <p style={styles.subtitle}>
          Real-time country trend ranking and category intelligence
        </p>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option>All Categories</option>

          {trendCategories.map((cat: string) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {ranked.map((item: any, i: number) => {
          const categories =
            selectedCategory === "All Categories"
              ? item.categories
              : item.categories.filter(
                  (c: any) => c.name === selectedCategory
                );

          return (
            <div key={i} style={styles.card}>
              <div style={styles.rank}>#{i + 1}</div>

              <h3>{item.country}</h3>

              <p>
                <strong>Top Category:</strong>{" "}
                {item.topCategory?.name}
              </p>

              <p>
                <strong>Average Score:</strong>{" "}
                {item.avgScore.toFixed(1)}
              </p>

              <hr style={styles.hr} />

              <div style={styles.categoryList}>
                {categories.map((cat: any) => (
                  <div
                    key={cat.name}
                    style={styles.categoryRow}
                  >
                    <span>{cat.name}</span>

                    <strong>{cat.score}</strong>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
    marginBottom: 15,
  },

  select: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#181818",
    color: "#fff",
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 18,
  },

  card: {
    background: "#151515",
    border: "1px solid #222",
    borderRadius: 12,
    padding: 18,
  },

  rank: {
    color: "#00ffcc",
    fontWeight: "bold",
    marginBottom: 10,
  },

  hr: {
    margin: "14px 0",
    borderColor: "#2b2b2b",
  },

  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  categoryRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #222",
    paddingBottom: 5,
    fontSize: 14,
  },
};