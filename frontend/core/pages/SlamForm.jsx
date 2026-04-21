import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import CoverCard from "../components/CoverCard";
import QuestionBlock from "../components/QuestionBlock";
import ProgressBar from "../components/ProgressBar";
import { submitEntry, adminLogin } from "../api/index";

const questions = [
  { id: "name", num: "01", label: "Enter your name", type: "short" },
  { id: "call_me", num: "02", label: "What do u call me (name)?", type: "short" },
  { id: "first_impression", num: "03", label: "Your first impression of me - be honest.", type: "medium" },
  { id: "current_impression", num: "04", label: "And now? Your current impression of me.", type: "medium" },
  { id: "memory", num: "05", label: "A memory we share that you'll never forget.", type: "medium" },
  { id: "unsaid", num: "06", label: "What's one thing you wish you could tell me but never did?", type: "medium" },
  { id: "thoughts", num: "07", label: "Just write your thoughts. All of them. Take your time.", type: "long" }
];

const fireConfetti = () => {
  const colors = ["#f7b8d6", "#b9a7f5", "#e8b8fa", "#f2a9cd", "#d3c6ff"];
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 50, spread: 90, origin: { y: 0.5 }, colors }), 300);
  setTimeout(() => confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors }), 600);
};

export default function SlamForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLock, setShowLock] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showRail, setShowRail] = useState(false);
  const questionRefs = useRef([]);

  const filled = questions.filter((q) => form[q.id]?.trim()).length;
  const handleChange = (id, value) => setForm((prev) => ({ ...prev, [id]: value }));

  useEffect(() => {
    const onResize = () => setShowRail(window.innerWidth >= 1100);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = 0;
      questionRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.38) current = index;
      });
      setActiveQuestion(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async () => {
    if (filled < questions.length) {
      setError("Please fill in all questions before submitting!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await submitEntry(form);
      fireConfetti();
      setTimeout(() => navigate("/thank-you", { state: { entry: form } }), 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setPwLoading(true);
    setPwError("");
    try {
      await adminLogin(password);
      navigate("/admin");
    } catch {
      setPwError("Sorry, you can only view your message to Josh.");
      setPassword("");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "2rem clamp(0.9rem, 3.8vw, 2.6rem) 4.5rem",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-180px", left: "-140px",
          width: "460px", height: "460px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,184,214,0.38), rgba(247,184,214,0) 70%)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%", right: "-180px",
          width: "520px", height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(185,167,245,0.30), rgba(185,167,245,0) 72%)",
          pointerEvents: "none"
        }}
      />

      {showRail && (
        <div
          style={{
            position: "fixed",
            top: "44%", right: "20px",
            transform: "translateY(-50%)",
            zIndex: "950",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "10px 8px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(123, 106, 167, 0.2)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 10px 26px rgba(97, 77, 144, 0.17)"
          }}
        >
          {questions.map((q, index) => {
            const active = index === activeQuestion;
            return (
              <button
                key={q.id}
                onClick={() => questionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{
                  width: "34px", height: "34px",
                  borderRadius: "10px",
                  border: active ? "1px solid rgba(123, 106, 167, 0.35)" : "1px solid rgba(123, 106, 167, 0.18)",
                  background: active
                    ? "linear-gradient(90deg, rgba(247,184,214,0.9), rgba(185,167,245,0.95))"
                    : "rgba(255,255,255,0.86)",
                  color: active ? "#3f3165" : "#7864a4",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: active ? "700" : "600",
                  fontSize: "12px",
                  cursor: "pointer",
                  boxShadow: active ? "0 6px 14px rgba(123, 106, 167, 0.24)" : "none",
                  transition: "all 0.2s ease"
                }}
                title={`Question ${q.num}`}
              >
                {q.num}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ position: "relative", zIndex: "1" }}>
        <CoverCard />
        <ProgressBar filled={filled} total={questions.length} />
        <p
          style={{
            fontSize: "12px",
            color: "#7d6aa9",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            animation: "fadeInUp 0.45s ease both",
            animationDelay: "0.14s"
          }}
        >
          take your time - every word matters
        </p>

        {questions.map((q, index) => (
          <div
            key={q.id}
            ref={(el) => { questionRefs.current[index] = el; }}
            style={{ scrollMarginTop: "120px" }}
          >
            <QuestionBlock
              num={q.num}
              label={q.label}
              type={q.type}
              value={form[q.id] || ""}
              onChange={(val) => handleChange(q.id, val)}
              index={index}
            />
          </div>
        ))}

        {error && (
          <p
            style={{
              color: "#9a4b79",
              fontSize: "13px",
              marginBottom: "1rem",
              textAlign: "center",
              background: "rgba(247, 184, 214, 0.16)",
              border: "1px solid rgba(247, 184, 214, 0.55)",
              borderRadius: "12px",
              padding: "0.65rem 0.8rem",
              fontWeight: "500"
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: "linear-gradient(90deg, #f7b8d6 0%, #e8b8fa 45%, #b9a7f5 100%)",
            backgroundSize: "170% 170%",
            color: "#3f3165",
            border: "1px solid rgba(123, 106, 167, 0.3)",
            borderRadius: "14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            cursor: loading ? "default" : "pointer",
            boxShadow: "0 14px 30px rgba(98, 79, 146, 0.24)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
            opacity: loading ? "0.82" : "1"
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 18px 36px rgba(98, 79, 146, 0.28)";
              e.currentTarget.style.backgroundPosition = "100% 0";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 14px 30px rgba(98, 79, 146, 0.24)";
            e.currentTarget.style.backgroundPosition = "0 0";
          }}
        >
          {loading ? "sending... 🌸" : "submit memory ✦"}
        </button>
      </div>

      {/* lock icon */}
      <div
        onClick={() => { setShowLock(!showLock); setPwError(""); setPassword(""); }}
        style={{
          position: "fixed",
          bottom: "20px", right: "20px",
          zIndex: "1200",
          width: "38px", height: "38px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(247, 184, 214, 0.95), rgba(185, 167, 245, 0.95))",
          border: "1px solid rgba(141, 116, 200, 0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: showLock ? "1" : "0.82",
          transition: "opacity 0.2s, transform 0.2s",
          boxShadow: "0 10px 24px rgba(141, 116, 200, 0.35)",
          backdropFilter: "blur(3px)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          if (!showLock) e.currentTarget.style.opacity = "0.82";
          e.currentTarget.style.transform = "translateY(0px)";
        }}
        title="admin"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      {/* popup */}
      {showLock && (
        <div
          style={{
            position: "fixed",
            bottom: "66px", right: "20px",
            zIndex: "1199",
            background: "rgba(255,255,255,0.96)",
            border: "1px solid rgba(123, 106, 167, 0.3)",
            borderRadius: "16px",
            padding: "1rem",
            width: "248px",
            boxShadow: "0 14px 30px rgba(89, 70, 128, 0.2)",
            backdropFilter: "blur(7px)"
          }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: "#4b3f72", marginBottom: "3px", fontWeight: "600" }}>
            only Josh can read this memory lane
          </p>
          <p style={{ fontSize: "11px", color: "#7e69a9", marginBottom: "11px" }}>
            enter password to continue
          </p>
          <input
            type="password"
            placeholder="private passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
            style={{
              width: "100%",
              border: "1px solid rgba(123, 106, 167, 0.35)",
              borderRadius: "10px",
              padding: "8px 11px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#4b3f72",
              background: "rgba(255,255,255,0.96)",
              outline: "none",
              marginBottom: "8px"
            }}
          />
          <button
            onClick={handleAdminLogin}
            disabled={pwLoading}
            style={{
              width: "100%",
              padding: "9px",
              background: "#8d74c8",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {pwLoading ? "checking..." : "unlock memory lane"}
          </button>
          {pwError && (
            <p style={{ fontSize: "11px", color: "#ba4f86", marginTop: "8px", textAlign: "center", fontStyle: "italic" }}>
              {pwError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

