"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trends", label: "Trends" },
    { href: "/viral", label: "Viral" },
    { href: "/keywords", label: "Keywords" },
    { href: "/insight", label: "Insight" }, // ✅ ADDED
  ];

  return (
    <nav style={styles.nav}>
      {/* BRAND */}
      <div style={styles.brand}>
        🚀 Mini Trends Intelligence
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {navLinks.map((link) => {
          const active = path === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                ...styles.link,
                ...(active ? styles.activeLink : {}),
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const styles: any = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "rgba(17,17,17,0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #222",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
  },

  brand: {
    color: "#00ffcc",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  links: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "0.2s",
    fontSize: "14px",
  },

  activeLink: {
    color: "#00ffcc",
    background: "rgba(0,255,204,0.1)",
    fontWeight: "bold",
  },
};