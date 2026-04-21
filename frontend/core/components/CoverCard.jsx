export default function CoverCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,248,238,0.96))",
        border: "1px solid rgba(247, 184, 214, 0.6)",
        borderRadius: "28px",
        padding: "2.2rem clamp(1.2rem, 3vw, 2.6rem)",
        marginBottom: "1.4rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 18px 35px rgba(36, 65, 92, 0.10)",
        backdropFilter: "blur(5px)",
        animation: "fadeInUp 0.55s ease both"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          top: "-80px",
          right: "-50px",
          background: "radial-gradient(circle, rgba(185,167,245,0.28), rgba(185,167,245,0) 70%)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          bottom: "-90px",
          left: "-70px",
          background: "radial-gradient(circle, rgba(247,184,214,0.26), rgba(247,184,214,0) 70%)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "0",
          background:
            "linear-gradient(120deg, rgba(247,184,214,0.12), rgba(185,167,245,0.12) 50%, rgba(255,255,255,0))",
          pointerEvents: "none"
        }}
      />

      <div style={{ position: "relative", display: "inline-block", marginBottom: "0.75rem", padding: "0.32rem 0.75rem", borderRadius: "999px", background: "rgba(75, 63, 114, 0.08)", color: "#4b3f72", fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Joshna Michael
      </div>

      <div
        style={{
          position: "relative",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
          lineHeight: "1.14",
          color: "#4b3f72",
          fontWeight: "600",
          marginBottom: "0.7rem"
        }}
      >
        Memories with your Josh
      </div>

      <div style={{ width: "90px", height: "4px", borderRadius: "99px", background: "linear-gradient(90deg, #f7b8d6, #b9a7f5)", marginBottom: "0.9rem" }} />
      <div style={{ color: "#7b6aa7", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        write from the heart, keep it real
      </div>
    </div>
  );
}
