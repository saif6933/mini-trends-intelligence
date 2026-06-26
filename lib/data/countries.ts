export const countries = [
  "United States",
  "United Kingdom",
  "South Korea",
  "Brazil",
  "Japan",
  "India",
  "China",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Spain",
  "Indonesia",
  "Mexico",
] as const;

// 🔒 Auto derived type (safe, no manual mismatch risk)
export type Country = (typeof countries)[number];

// Optional: helper for validation (future use)
export const isCountry = (value: string): value is Country =>
  (countries as readonly string[]).includes(value);