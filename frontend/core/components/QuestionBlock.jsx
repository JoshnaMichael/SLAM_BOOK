import { useEffect, useState } from "react";

export default function QuestionBlock({ num, label, type, value, onChange, index = 0 }) {
  const isShort = type === "short";
  const isLong = type === "long";
  const rows = isShort ? 1 : isLong ? 10 : 4;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;
  const [focused, setFocused] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!value?.trim()) {
      setShowSaved(false);
      return;
    }
    setShowSaved(false);
    const timer = setTimeout(() => setShowSaved(true), 550);
    return () => clearTimeout(timer);
  }, [value]);

  const inputStyle = {
    width: "100%",
    border: focused ? "1px solid #b9a7f5" : "1px solid rgba(123, 106, 167, 0.24)",
    borderRadius: "12px",
    padding: "11px 14px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    color: "#4b3f72",
    background: focused ? "#ffffff" : "rgba(255, 255, 255, 0.82)",
    outline: "none",
    resize: "vertical",
    transition: "all 0.2s ease",
    boxShadow: focused ? "0 0 0 4px rgba(185, 167, 245, 0.22)" : "none"
  };

  return (
    <div
      style={{
        position: "relative",
        background: isEven
          ? "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,247,240,0.94))"
          : "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(247,244,255,0.94))",
        border: focused ? "1px solid rgba(185, 167, 245, 0.45)" : "1px solid rgba(123, 106, 167, 0.2)",
        borderRadius: "22px",
        padding: "1.4rem 1.3rem 1.2rem",
        marginBottom: "1rem",
        boxShadow: focused ? "0 18px 30px rgba(89, 70, 128, 0.18)" : "0 14px 28px rgba(89, 70, 128, 0.14)",
        overflow: "hidden",
        animation: "fadeInUp 0.45s ease both",
        animationDelay: `${index * 0.05}s`,
        transition: "box-shadow 0.2s ease, border 0.2s ease, transform 0.2s ease",
        transform: focused ? "translateY(-2px)" : "translateY(0)"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: "6px",
          background: isEven
            ? "linear-gradient(180deg, #f7b8d6, #f2a9cd)"
            : "linear-gradient(180deg, #b9a7f5, #d3c6ff)"
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "0.3rem", marginBottom: "8px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#8169a8", letterSpacing: "0.14em" }}>{num}</div>
        {showSaved && (
          <div style={{
            fontSize: "10px", fontWeight: "600", color: "#6f5ca0",
            background: "rgba(185, 167, 245, 0.24)", border: "1px solid rgba(185, 167, 245, 0.5)",
            borderRadius: "999px", padding: "3px 8px", animation: "fadeInUp 0.25s ease both"
          }}>
            saved ✦
          </div>
        )}
      </div>

      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.15rem, 2.8vw, 2.3rem)", color: "#4b3f72", marginBottom: "1rem", lineHeight: "1.2", fontStyle: "italic", marginLeft: "0.3rem" }}>
        {label}
      </div>

      {isShort ? (
        <input
          type="text"
          style={{ ...inputStyle, height: "48px" }}
          placeholder="your answer..."
          value={value}
          onFocus={() => { setFocused(true); setShowSaved(false); }}
          onBlur={() => { setFocused(false); if (value.trim()) setShowSaved(true); }}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <textarea
          style={{ ...inputStyle, minHeight: isLong ? "210px" : "115px" }}
          rows={rows}
          placeholder="your answer..."
          value={value}
          onFocus={() => { setFocused(true); setShowSaved(false); }}
          onBlur={() => { setFocused(false); if (value.trim()) setShowSaved(true); }}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {/* word/char count for all fields */}
      <div style={{ fontSize: "11px", color: "#8672ad", textAlign: "right", marginTop: "7px", fontWeight: "600" }}>
        {isLong
          ? `${wordCount} words`
          : isShort
          ? charCount > 0 ? `${charCount} characters` : ""
          : `${wordCount} words · ${charCount} characters`
        }
      </div>
    </div>
  );
}