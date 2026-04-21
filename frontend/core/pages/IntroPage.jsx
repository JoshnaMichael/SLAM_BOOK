import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();
  const reveal = (delay) => ({
    opacity: 0,
    animation: `fadeInUp 0.6s ease ${delay}s forwards`
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "2.4rem clamp(1rem, 4vw, 3rem) 3rem",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid rgba(123, 106, 167, 0.25)",
          borderRadius: "26px",
          padding: "clamp(1.5rem, 3.8vw, 3rem)",
          boxShadow: "0 20px 44px rgba(99, 76, 146, 0.20)"
        }}
      >
        <p
          style={{
            display: "inline-block",
            background: "rgba(247, 184, 214, 0.3)",
            border: "1px solid rgba(185, 167, 245, 0.45)",
            borderRadius: "999px",
            padding: "0.35rem 0.8rem",
            color: "#5f4b8b",
            fontWeight: "600",
            letterSpacing: "0.06em",
            fontSize: "12px",
            textTransform: "uppercase",
            marginBottom: "1.4rem",
            ...reveal(0.05)
          }}
        >
          memories with josh
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            color: "#4b3f72",
            lineHeight: "1.15",
            marginBottom: "1.8rem",
            ...reveal(0.14)
          }}
        >
          Before we begin...
        </h1>

        <div
          style={{
            borderLeft: "4px solid #f7b8d6",
            background: "rgba(255, 247, 252, 0.85)",
            borderRadius: "14px",
            padding: "1.25rem 1.2rem 1.25rem 1.35rem",
            marginBottom: "1.4rem",
            ...reveal(0.24)
          }}
        >
          <p style={{ color: "#5b4b87", fontSize: "16px", lineHeight: "1.75" }}>
            Thank you for being such an important part of my life. Meeting you,
            getting to know you, and building this bond with you is something I
            truly cherish.
          </p>
        </div>

        <div
          style={{
            borderLeft: "4px solid #b9a7f5",
            background: "rgba(247, 244, 255, 0.9)",
            borderRadius: "14px",
            padding: "1.25rem 1.2rem 1.25rem 1.35rem",
            marginBottom: "1.8rem",
            ...reveal(0.36)
          }}
        >
          <p style={{ color: "#5b4b87", fontSize: "16px", lineHeight: "1.75" }}>
            If I&apos;ve ever hurt you, even in the smallest way, I&apos;m really
            sorry. It was never my intention. You mean more to me than I can ever
            properly put into words.
          </p>
        </div>

        <p style={{ color: "#7664a7", fontSize: "17px", marginBottom: "1.5rem", letterSpacing: "0.02em", lineHeight: "1.6", ...reveal(0.5) }}>
          If you&apos;re ready... let&apos;s walk through our memories together.
        </p>

        <button
          onClick={() => navigate("/form")}
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "14px 16px",
            background: "linear-gradient(90deg, #f7b8d6 0%, #e8b8fa 45%, #b9a7f5 100%)",
            color: "#3f3165",
            border: "1px solid rgba(123, 106, 167, 0.34)",
            borderRadius: "14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            cursor: "pointer",
            boxShadow: "0 12px 24px rgba(98, 79, 146, 0.22)",
            ...reveal(0.62),
            transition: "transform 0.2s ease, box-shadow 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 16px 28px rgba(98, 79, 146, 0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(98, 79, 146, 0.22)";
          }}
        >
          enter memory lane
        </button>
      </div>
    </div>
  );
}
