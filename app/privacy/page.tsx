export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          We respect the privacy of our visitors and are committed to protecting
          any information that may be shared while using this platform.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          We do not intentionally collect personally identifiable information
          from users. The platform is designed primarily for informational,
          educational, and analytical purposes.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          We do not sell user data, engage in aggressive profiling, or share
          personal information with third parties for marketing purposes.
        </p>

        <p
          style={{
            marginBottom: "15px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          Basic technical information such as browser type, device information,
          or anonymous analytics may be collected to improve platform
          performance and user experience.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          By using this website, you agree to this Privacy Policy and any future
          updates made to improve transparency and compliance.
        </p>
      </div>
    </div>
  );
}