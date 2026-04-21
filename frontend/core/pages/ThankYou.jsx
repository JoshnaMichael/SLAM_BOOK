import { useLocation } from "react-router-dom";

export default function ThankYou() {
  const location = useLocation();
  const entry = location.state?.entry;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "2.2rem clamp(1rem, 4vw, 3rem) 3rem",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(123, 106, 167, 0.25)",
          borderRadius: "26px",
          padding: "clamp(1.5rem, 3.8vw, 3rem)",
          boxShadow: "0 18px 40px rgba(99, 76, 146, 0.18)",
          marginBottom: "2rem",
          animation: "fadeInUp 0.55s ease both"
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.3rem)",
            color: "#4b3f72",
            marginBottom: "1.1rem",
            lineHeight: "1.2"
          }}
        >
          thank you for <em>leaving a piece of you</em>
        </h1>

        <div
          style={{
            width: "70px",
            height: "4px",
            borderRadius: "99px",
            background: "linear-gradient(90deg, #f7b8d6, #b9a7f5)",
            marginBottom: "1.3rem"
          }}
        />

        <p style={{ color: "#5b4b87", fontSize: "17px", lineHeight: "1.85", marginBottom: "1rem" }}>
          Your words are safe here - only I can read them.
          <br />
          But honestly... they mean a lot more than that.
        </p>

        <p style={{ color: "#5b4b87", fontSize: "17px", lineHeight: "1.85", marginBottom: "1rem" }}>
          Thank you for taking a moment to write something for me. I know for you this might feel small, maybe even random... but to me, it is not.
          It is something I will come back to, something I will remember.
        </p>

        <p style={{ color: "#5b4b87", fontSize: "17px", lineHeight: "1.85", marginBottom: "1rem" }}>
          There is something really special about knowing you paused your day, thought of me, and left a little part of yourself behind.
          That is not something I take lightly.
        </p>

        <p style={{ color: "#5b4b87", fontSize: "17px", lineHeight: "1.85", marginBottom: "1rem" }}>
          Even the simplest words... they stay.
        </p>

        <p style={{ color: "#7e69a9", fontSize: "16px", lineHeight: "1.8", fontStyle: "italic" }}>
          You can close this tab now.
          <br />
          But what you wrote - and the feeling behind it - stays with me.
        </p>
      </div>

      {entry && (
        <div>
          <p
            style={{
              fontSize: "12px",
              color: "#7d6aa9",
              letterSpacing: "0.08em",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              fontWeight: "600"
            }}
          >
            here&apos;s what you wrote
          </p>
          {[
            { tag: "QN 1", val: entry.name },
            { tag: "QN 2", val: entry.call_me },
            { tag: "FIRST IMPRESSION", val: entry.first_impression },
            { tag: "CURRENT IMPRESSION", val: entry.current_impression },
            { tag: "A MEMORY", val: entry.memory },
            { tag: "NEVER SAID", val: entry.unsaid },
            { tag: "YOUR THOUGHTS", val: entry.thoughts }
          ].map(({ tag, val }, index) =>
            val ? (
              <div
                key={tag}
                style={{
                  position: "relative",
                  background: index % 2 === 0
                    ? "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,247,240,0.94))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(247,244,255,0.94))",
                  border: "1px solid rgba(123, 106, 167, 0.2)",
                  borderRadius: "22px",
                  padding: "1.4rem 1.3rem 1.2rem",
                  marginBottom: "1rem",
                  boxShadow: "0 14px 28px rgba(89, 70, 128, 0.14)",
                  animation: "fadeInUp 0.4s ease both",
                  animationDelay: `${index * 0.05}s`,
                  transition: "all 0.2s ease"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: "6px",
                    background: index % 2 === 0
                      ? "linear-gradient(180deg, #f7b8d6, #f2a9cd)"
                      : "linear-gradient(180deg, #b9a7f5, #d3c6ff)",
                    borderRadius: "22px 0 0 22px"
                  }}
                />
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#8169a8",
                    letterSpacing: "0.14em",
                    marginBottom: "6px",
                    textTransform: "uppercase"
                  }}
                >
                  {tag}
                </div>
                <div style={{ fontSize: "15px", color: "#4b3f72", lineHeight: "1.7", wordBreak: "break-word" }}>{val}</div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
