export default function AboutPage() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#fff",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "#151515",
          padding: "25px",
          borderRadius: "14px",
          border: "1px solid #222",
        }}
      >
        <h1
          style={{
            color: "#00ffcc",
            marginBottom: "20px",
            fontSize: "2rem",
          }}
        >
          About Us
        </h1>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Mini Trends Intelligence System is a real-time intelligence platform
          designed to analyze global trends, viral content signals, and keyword
          opportunities across multiple markets.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Our mission is to transform raw data into meaningful insights that
          help identify emerging opportunities, trending topics, and digital
          behavior patterns through structured intelligence models.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          The platform combines trend analysis, keyword intelligence, viral
          signal monitoring, and strategic insight generation to provide a
          unified view of digital activity.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Mini Trends Intelligence System is provided for educational,
          informational, and research purposes only.
        </p>
      </div>
    </div>
  );
}