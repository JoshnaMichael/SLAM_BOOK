import { useState, useEffect } from "react";
import AdminLogin from "../components/AdminLogin";
import { fetchEntries, deleteEntry } from "../api/index";

function EntryCard({ entry, onDelete, deleting }) {
  const [expanded, setExpanded] = useState(false);
  const initial = entry.name ? entry.name[0].toUpperCase() : "?";
  const date = new Date(entry.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const isEven = Math.random() > 0.5;

  return (
    <div
      style={{
        position: "relative",
        background: isEven
          ? "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,247,240,0.94))"
          : "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(247,244,255,0.94))",
        border: expanded ? "1px solid rgba(185, 167, 245, 0.45)" : "1px solid rgba(123, 106, 167, 0.2)",
        borderRadius: "22px",
        marginBottom: "1rem",
        overflow: "hidden",
        boxShadow: expanded ? "0 18px 30px rgba(89, 70, 128, 0.18)" : "0 14px 28px rgba(89, 70, 128, 0.14)",
        transition: "all 0.2s ease, transform 0.2s ease",
        transform: expanded ? "translateY(-2px)" : "translateY(0)"
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
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.4rem 1.3rem",
          cursor: "pointer",
          marginLeft: "0.3rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(247, 184, 214, 0.2)",
              border: "1px solid rgba(247, 184, 214, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', serif",
              fontSize: "16px",
              color: "#f7b8d6",
              fontWeight: "600"
            }}
          >
            {initial}
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "500", color: "#4b3f72" }}>
              {entry.name || "Anonymous"}
            </div>
            <div style={{ fontSize: "11px", color: "#8f7aad" }}>{date}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id, entry.name || "Anonymous");
            }}
            disabled={deleting}
            title="Delete entry"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid rgba(247, 184, 214, 0.4)",
              background: deleting ? "rgba(247, 184, 214, 0.15)" : "rgba(247, 184, 214, 0.25)",
              color: deleting ? "#b19acd" : "#f7b8d6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleting ? "default" : "pointer",
              fontSize: "14px",
              lineHeight: "1"
            }}
          >
            {deleting ? "..." : "🗑"}
          </button>
          <div style={{ fontSize: "18px", color: "#f7b8d6" }}>{expanded ? "↑" : "↓"}</div>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "1.2rem 0 1.2rem 0" }}>
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
                  margin: "0 1.3rem 1rem 1.3rem",
                  background: index % 2 === 0
                    ? "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,247,240,0.94))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(247,244,255,0.94))",
                  border: "1px solid rgba(123, 106, 167, 0.2)",
                  borderRadius: "18px",
                  padding: "1.2rem 1.2rem 1rem 1.2rem",
                  boxShadow: "0 8px 16px rgba(89, 70, 128, 0.08)",
                  animation: "fadeInUp 0.3s ease both",
                  animationDelay: `${index * 0.04}s`,
                  transition: "all 0.2s ease"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: "4px",
                    background: index % 2 === 0
                      ? "linear-gradient(180deg, #f7b8d6, #f2a9cd)"
                      : "linear-gradient(180deg, #b9a7f5, #d3c6ff)",
                    borderRadius: "18px 0 0 18px"
                  }}
                />
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "#8169a8",
                    letterSpacing: "0.12em",
                    marginBottom: "6px",
                    textTransform: "uppercase"
                  }}
                >
                  {tag}
                </div>
                <div style={{ fontSize: "14px", color: "#4b3f72", lineHeight: "1.65", wordBreak: "break-word" }}>{val}</div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("slam_token"));
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authed) loadEntries();
  }, [authed]);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch {
      localStorage.removeItem("slam_token");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId, name) => {
    const ok = window.confirm(`Delete entry from "${name}"?`);
    if (!ok) return;

    setDeletingId(entryId);
    try {
      await deleteEntry(entryId);
      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch {
      alert("Could not delete this entry. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEntries = entries.filter((entry) =>
    (entry.name || "Anonymous").toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif"
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

      <div
        style={{
          position: "relative",
          zIndex: "1",
          width: "100%",
          padding: "2rem clamp(0.9rem, 3.8vw, 2.6rem) 4.5rem"
        }}
      >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(123, 106, 167, 0.15)"
        }}
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", color: "#4b3f72", lineHeight: "1.15", marginBottom: "0" }}>
          Memories with your Josh
        </h1>
        <span
          style={{
            fontSize: "12px",
            color: "#7d6aa9",
            background: "rgba(247, 184, 214, 0.15)",
            border: "1px solid rgba(247, 184, 214, 0.3)",
            borderRadius: "99px",
            padding: "6px 14px",
            whiteSpace: "nowrap"
          }}
        >
          {searchQuery.trim() ? `${filteredEntries.length} of ${entries.length}` : `${entries.length} entries`}
        </span>
      </div>

      <div style={{ marginBottom: "1.8rem" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#7d6aa9",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1rem"
          }}
        >
          search entries
        </p>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search by name..."
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(247, 184, 214, 0.3)",
            background: "rgba(247, 184, 214, 0.08)",
            color: "#4b3f72",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            outline: "none",
            transition: "all 0.2s ease"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(247, 184, 214, 0.5)";
            e.target.style.boxShadow = "0 0 0 4px rgba(185, 167, 245, 0.22)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(247, 184, 214, 0.3)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {loading && <p style={{ color: "#8f7aad", textAlign: "center", fontSize: "14px" }}>loading entries...</p>}

      {filteredEntries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onDelete={handleDelete}
          deleting={deletingId === entry.id}
        />
      ))}

      {!loading && entries.length === 0 && (
        <p style={{ color: "#9a8fbb", textAlign: "center", fontStyle: "italic", fontSize: "14px", marginTop: "3rem" }}>
          no entries yet - share your link!
        </p>
      )}

      {!loading && entries.length > 0 && filteredEntries.length === 0 && (
        <p style={{ color: "#9a8fbb", textAlign: "center", fontStyle: "italic", fontSize: "14px", marginTop: "2rem" }}>
          no entries found for that name
        </p>
      )}
      </div>
    </div>
  );
}
