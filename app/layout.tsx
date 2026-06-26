import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Mini Trends Intelligence System",
    template: "%s | Mini Trends Intelligence",
  },
  description:
    "Real-time trends, viral content, and keyword intelligence dashboard with AI-powered actionable insights.",
  keywords: [
    "trends",
    "viral content",
    "keywords intelligence",
    "SEO dashboard",
    "AI insights",
  ],
  authors: [{ name: "Mini Trends System" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0f0f0f",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}