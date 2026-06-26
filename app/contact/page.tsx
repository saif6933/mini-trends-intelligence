export default function ContactPage() {
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
          Contact Us
        </h1>

        <p
          style={{
            marginBottom: "20px",
            lineHeight: 1.8,
            color: "#d6d6d6",
          }}
        >
          If you have questions, suggestions, partnership inquiries, or general
          feedback regarding the Mini Trends Intelligence System, feel free to
          contact us using the information below.
        </p>

        <div
          style={{
            background: "#1d1d1d",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Email</strong>
          <p style={{ marginTop: "8px" }}>
            saifdailyausaf@gmail.com
          </p>
        </div>

        <div
          style={{
            background: "#1d1d1d",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Phone / WhatsApp</strong>
          <p style={{ marginTop: "8px" }}>
            +92 332 6044547
          </p>
        </div>

        <div
          style={{
            background: "#1d1d1d",
            padding: "18px",
            borderRadius: "10px",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Location</strong>
          <p style={{ marginTop: "8px" }}>
            Islamabad, Pakistan
          </p>
        </div>
      </div>
    </div>
  );
}