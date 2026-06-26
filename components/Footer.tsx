"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "50px",
        padding: "25px 20px",
        background: "#111",
        borderTop: "1px solid #222",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <Link href="/about" style={linkStyle}>
          About
        </Link>

        <Link href="/contact" style={linkStyle}>
          Contact
        </Link>

        <Link href="/privacy" style={linkStyle}>
          Privacy
        </Link>

        <Link href="/disclaimer" style={linkStyle}>
          Disclaimer
        </Link>
      </div>

      <div
        style={{
          color: "#666",
          fontSize: "13px",
        }}
      >
        © {new Date().getFullYear()} Mini Trends Intelligence System
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#aaa",
  textDecoration: "none",
};