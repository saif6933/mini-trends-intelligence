export default function DisclaimerPage() {
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
          Disclaimer
        </h1>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Mini Trends Intelligence System provides AI-assisted trend analysis,
          keyword intelligence, and data-driven insights for informational and
          educational purposes only.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          While every effort is made to present useful information, we do not
          guarantee the accuracy, completeness, reliability, or timeliness of
          any data, prediction, ranking, or recommendation displayed on this
          platform.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Users should independently verify information before making business,
          financial, marketing, SEO, content, or strategic decisions based on
          the insights provided.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          The platform may contain predictive scores, analytical models, and AI
          generated recommendations that are intended to assist research and
          decision-making, not replace professional judgment.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          By using this website, you acknowledge and agree that all use of the
          information is at your own risk.
        </p>
      </div>
    </div>
  );
}