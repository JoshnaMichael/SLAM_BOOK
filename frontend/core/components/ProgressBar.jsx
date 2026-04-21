export default function ProgressBar({ filled, total }) {
  const pct = Math.round((filled / total) * 100);

  return (
    <div
      style={{
        position: "sticky",
        top: "10px",
        zIndex: "20",
        marginBottom: "1.2rem",
        borderRadius: "18px",
        background: "rgba(255, 255, 255, 0.86)",
        border: "1px solid rgba(185, 167, 245, 0.45)",
        padding: "0.9rem 1rem",
        boxShadow: "0 12px 26px rgba(75, 63, 114, 0.14)",
        backdropFilter: "blur(6px)",
        animation: "fadeInUp 0.55s ease both",
        animationDelay: "0.08s"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6f5a96", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        <span>Progress</span>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "11px",
              color: "#5f4b8b",
              borderRadius: "999px",
              border: "1px solid rgba(123, 106, 167, 0.28)",
              background: "rgba(255,255,255,0.75)",
              padding: "2px 8px"
            }}
          >
            {pct}%
          </span>
          {filled} of {total}
        </span>
      </div>
      <div style={{ height: "9px", borderRadius: "99px", background: "rgba(123, 106, 167, 0.18)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: "99px",
            background: "linear-gradient(90deg, #f7b8d6 0%, #e8b8fa 42%, #b9a7f5 100%)",
            transition: "width 0.35s ease"
          }}
        />
      </div>
    </div>
  );
}
