export default function EntryCard({ entry }) {
  const initial = entry.name ? entry.name[0].toUpperCase() : "?";
  const date    = new Date(entry.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const rowStyle = { marginBottom: "0.75rem" };
  const tagStyle = { fontSize: "10px", fontWeight: "500", color: "#d4537e", letterSpacing: "0.08em", marginBottom: "3px" };
  const ansStyle = { fontSize: "13px", color: "#6b4060", lineHeight: "1.6" };

  return (
    <div style={{ background: "#fff", border: "1px solid #f2d4ee", borderRadius: "20px", padding: "1.5rem", marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fdf0f8", border: "1px solid #f2d4ee", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#d4537e", fontWeight: "600" }}>
            {initial}
          </div>
          <span style={{ fontSize: "15px", fontWeight: "500", color: "#4a2040" }}>{entry.name || "Anonymous"}</span>
        </div>
        <span style={{ fontSize: "11px", color: "#c9a0c0" }}>{date}</span>
      </div>

      <div style={{ height: "1px", background: "#f5e6f5", margin: "0.75rem 0" }} />

      {[
        { tag: "FIRST IMPRESSION",   key: "first_impression"   },
        { tag: "CURRENT IMPRESSION", key: "current_impression" },
        { tag: "ROAST",              key: "roast"              },
        { tag: "A MEMORY",           key: "memory"             },
        { tag: "NEVER SAID",         key: "unsaid"             },
        { tag: "THOUGHTS",           key: "thoughts"           },
      ].map(({ tag, key }) => (
        entry[key] && (
          <div key={key} style={rowStyle}>
            <div style={tagStyle}>{tag}</div>
            <div style={ansStyle}>{entry[key]}</div>
          </div>
        )
      ))}
    </div>
  );
}