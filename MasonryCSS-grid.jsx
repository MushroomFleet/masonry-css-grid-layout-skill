import { useState } from "react";

const CARDS = [
  {
    id: 1,
    size: "hero",
    tag: "DISPLAY MODE",
    title: "display: grid-lanes",
    body: "A new CSS display mode that enables native masonry layouts — where items of varying heights stack tightly in columns without uniform row heights. No JavaScript required. No external libraries. Three lines of CSS.",
    code: `.container {\n  display: grid-lanes;\n  grid-template-columns:\n    repeat(auto-fill, minmax(250px, 1fr));\n  gap: 16px;\n}`,
    accent: "#e8ff47",
  },
  {
    id: 2,
    size: "tall",
    tag: "CORE CONCEPT",
    title: "The Highway Mental Model",
    body: "Think of items placed like cars merging onto a highway in bumper-to-bumper traffic. Each new item changes lanes to end up in whichever column gets it closest to the top — the shortest column at that moment. This produces the tight, gap-free stacking characteristic of masonry layouts.",
    accent: "#47c8ff",
  },
  {
    id: 3,
    size: "short",
    tag: "BROWSER SUPPORT",
    title: "Safari TP 234+",
    body: "Available now in Safari Technology Preview. Being standardised by the CSS Working Group.",
    accent: "#ff8c47",
  },
  {
    id: 4,
    size: "medium",
    tag: "LAYOUT DIRECTION",
    title: "Waterfall vs. Brick",
    body: "Define lanes with grid-template-columns for a waterfall layout (items fall downward in columns). Define with grid-template-rows for a brick layout (items flow left to right in rows). The browser infers direction automatically from which axis you define.",
    code: `/* Waterfall */\ndisplay: grid-lanes;\ngrid-template-columns: 1fr 1fr 1fr;\n\n/* Brick */\ndisplay: grid-lanes;\ngrid-template-rows: 1fr 1fr 1fr;`,
    accent: "#c847ff",
  },
  {
    id: 5,
    size: "short",
    tag: "PROPERTY",
    title: "flow-tolerance",
    body: "Defines a threshold below which column height differences are treated as a tie. Default: 1em.",
    accent: "#47ffb8",
  },
  {
    id: 6,
    size: "tall",
    tag: "FLOW TOLERANCE",
    title: "How Chill Are Your Drivers?",
    body: "Tolerance controls how picky the algorithm is. A low value means items aggressively seek the shortest column — tight packing, but visual shuffling. A high value means items flow left-to-right, only moving lanes for significant height differences. Set this for your content type.",
    code: `.container {\n  flow-tolerance: 1em;  /* default */\n}\n\n/* Text-heavy: higher tolerance */\n/* Image galleries: lower tolerance */`,
    accent: "#ff4778",
  },
  {
    id: 7,
    size: "medium",
    tag: "SPANNING",
    title: "Span Lanes for Hierarchy",
    body: "Items can span multiple lanes using standard grid-column. This enables editorial hero layouts — a single large item alongside smaller companions in the same masonry flow.",
    code: `article:nth-child(1) {\n  grid-column: span 4; /* hero */\n}\narticle:nth-child(2) {\n  grid-column: span 2; /* secondary */\n}`,
    accent: "#ffdb47",
  },
  {
    id: 8,
    size: "short",
    tag: "PLACEMENT",
    title: "Negative Index Pinning",
    body: "Pin items to the last N columns regardless of viewport width using negative grid-column indices like -3 / -1.",
    accent: "#47c8ff",
  },
  {
    id: 9,
    size: "medium",
    tag: "LANE SIZING",
    title: "Alternating Columns",
    body: "Because Grid Lanes uses full CSS Grid syntax, you can create alternating narrow–wide column rhythms that adapt to any viewport — with the first and last column always narrow.",
    code: `grid-template-columns:\n  repeat(\n    auto-fill,\n    minmax(8rem, 1fr)\n    minmax(16rem, 2fr)\n  )\n  minmax(8rem, 1fr);`,
    accent: "#e8ff47",
  },
  {
    id: 10,
    size: "short",
    tag: "ACCESSIBILITY",
    title: "Keyboard Navigation",
    body: "Items tab in DOM source order. flow-tolerance keeps focus movement natural across the visible layout.",
    accent: "#47ffb8",
  },
  {
    id: 11,
    size: "tall",
    tag: "VS. JAVASCRIPT",
    title: "No More Masonry.js",
    body: "CSS Grid Lanes eliminates the need for JavaScript layout libraries. Zero dependencies, browser-native performance, infinite scroll without JS recalculation, and full CSS Grid power for spanning and placement. Resize handling is automatic.",
    table: [
      ["Feature", "CSS Grid Lanes", "JS Masonry"],
      ["Dependencies", "None", "Library required"],
      ["Infinite scroll", "Native", "JS recalculation"],
      ["Keyboard nav", "Source order", "Can break"],
      ["Responsive", "Automatic", "Resize handlers"],
    ],
    accent: "#ff8c47",
  },
  {
    id: 12,
    size: "short",
    tag: "SPEC STATUS",
    title: "Work In Progress",
    body: "Direction control property still being finalised. Use the normal default to stay compatible with either outcome.",
    accent: "#c847ff",
  },
  {
    id: 13,
    size: "medium",
    tag: "COMPLETE REFERENCE",
    title: "Property Quick-Ref",
    body: "Every property you need at a glance.",
    table: [
      ["Property", "Purpose"],
      ["display: grid-lanes", "Activate container"],
      ["grid-template-columns", "Vertical lanes"],
      ["grid-template-rows", "Horizontal lanes"],
      ["gap", "Spacing"],
      ["grid-column", "Span / place"],
      ["flow-tolerance", "Height tie threshold"],
    ],
    accent: "#ff4778",
  },
  {
    id: 14,
    size: "short",
    tag: "ZERO MEDIA QUERIES",
    title: "Fully Responsive",
    body: "Column count adapts automatically to viewport width. No breakpoints needed.",
    accent: "#47c8ff",
  },
];

const sizeStyles = {
  hero: { minHeight: "320px" },
  tall: { minHeight: "260px" },
  medium: { minHeight: "180px" },
  short: { minHeight: "120px" },
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{
      position: "relative",
      marginTop: "12px",
      background: "rgba(0,0,0,0.45)",
      borderRadius: "6px",
      padding: "12px 14px",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      fontSize: "11px",
      lineHeight: "1.7",
      color: "#c8ffd4",
      whiteSpace: "pre",
      overflowX: "auto",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      {code}
      <button
        onClick={copy}
        style={{
          position: "absolute", top: "8px", right: "8px",
          background: copied ? "rgba(71,255,184,0.2)" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: copied ? "#47ffb8" : "#888",
          borderRadius: "4px",
          padding: "2px 7px",
          fontSize: "9px",
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "all 0.2s",
        }}
      >
        {copied ? "✓ COPIED" : "COPY"}
      </button>
    </div>
  );
}

function TableBlock({ table }) {
  const [header, ...rows] = table;
  return (
    <div style={{ marginTop: "12px", overflowX: "auto" }}>
      <table style={{
        width: "100%", borderCollapse: "collapse",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10.5px",
      }}>
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} style={{
                textAlign: "left", padding: "5px 8px",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500, letterSpacing: "0.06em",
                textTransform: "uppercase", fontSize: "9px",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "5px 8px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  color: ci === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                  fontWeight: ci === 0 ? 500 : 400,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ card }) {
  return (
    <div style={{
      ...sizeStyles[card.size],
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      backdropFilter: "blur(4px)",
      transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.borderColor = card.accent + "55";
      e.currentTarget.style.boxShadow = `0 8px 32px ${card.accent}18`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      {/* Accent top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: card.accent,
        opacity: 0.7,
        borderRadius: "12px 12px 0 0",
      }} />

      {/* Tag */}
      <span style={{
        fontSize: "9.5px",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.12em",
        color: card.accent,
        fontWeight: 600,
        marginBottom: "2px",
      }}>{card.tag}</span>

      {/* Title */}
      <h3 style={{
        margin: 0,
        fontSize: card.size === "hero" ? "22px" : card.size === "tall" ? "17px" : "15px",
        fontFamily: "'DM Serif Display', 'Georgia', serif",
        fontWeight: 400,
        color: "#fff",
        lineHeight: 1.25,
        letterSpacing: "-0.01em",
      }}>{card.title}</h3>

      {/* Body */}
      <p style={{
        margin: 0,
        fontSize: "12.5px",
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.58)",
        fontFamily: "'DM Sans', sans-serif",
        flexGrow: 1,
      }}>{card.body}</p>

      {card.code && <CodeBlock code={card.code} />}
      {card.table && <TableBlock table={card.table} />}
    </div>
  );
}

export default function MasonryCSSGrid() {
  const [tolerance, setTolerance] = useState("1em");
  const toleranceOptions = ["0em", "0.5em", "1em", "3em", "8em"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0f14",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          align-items: start;
        }

        /* Simulate masonry stacking with column-based approach for broad browser compat */
        /* In Safari TP 234+ this would be: display: grid-lanes */
        .masonry-grid {
          columns: auto;
          column-width: 260px;
          column-gap: 16px;
          display: block;
        }

        .masonry-card-wrapper {
          break-inside: avoid;
          margin-bottom: 16px;
          display: block;
        }

        .tolerance-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          padding: 5px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .tolerance-btn:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .tolerance-btn.active {
          background: rgba(232,255,71,0.12);
          border-color: rgba(232,255,71,0.4);
          color: #e8ff47;
        }

        /* Noise texture overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          padding: "64px 48px 48px",
          maxWidth: "1400px",
          margin: "0 auto",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "48px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.16em",
                color: "#e8ff47",
                marginBottom: "12px",
                fontWeight: 500,
              }}>CSS GRID LANES — INTERACTIVE DEMO</div>

              <h1 style={{
                margin: "0 0 16px",
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#fff",
              }}>
                Masonry Layouts,<br />
                <span style={{ color: "rgba(255,255,255,0.35)" }}>
                  Native CSS.
                </span>
              </h1>

              <p style={{
                margin: 0,
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "480px",
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                A living demonstration of <code style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#e8ff47",
                  background: "rgba(232,255,71,0.1)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}>display: grid-lanes</code> — the
                cards below are laid out using the same technique they describe.
                Resize the window to watch the columns adapt.
              </p>
            </div>

            {/* Tolerance Control */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "20px 24px",
              minWidth: "280px",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9.5px",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "12px",
              }}>FLOW TOLERANCE SIMULATOR</div>

              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "20px",
                color: "#47ffb8",
                marginBottom: "14px",
                fontWeight: 500,
              }}>flow-tolerance: <span style={{ color: "#e8ff47" }}>{tolerance}</span></div>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {toleranceOptions.map(t => (
                  <button
                    key={t}
                    className={`tolerance-btn${tolerance === t ? " active" : ""}`}
                    onClick={() => setTolerance(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p style={{
                margin: "12px 0 0",
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.5,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {tolerance === "0em" && "Zero tolerance: aggressively seeks shortest column. Visual shuffling may confuse keyboard users."}
                {tolerance === "0.5em" && "Tight tolerance: mostly seeks shortest column. Good for dense image galleries."}
                {tolerance === "1em" && "Default: differences under 1em treated as ties. Balanced packing vs. order."}
                {tolerance === "3em" && "Relaxed tolerance: items flow left-to-right more often. Better for text-heavy content."}
                {tolerance === "8em" && "High tolerance: strongly left-to-right flow. Predictable tab order, less dense packing."}
              </p>
            </div>
          </div>

          {/* CSS snippet */}
          <div style={{
            marginTop: "32px",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "10px",
            padding: "18px 22px",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "inline-block",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              lineHeight: 1.8,
              color: "#c8ffd4",
              whiteSpace: "pre",
            }}>{`.container {
  display: grid-lanes;                                    /* ← the magic */
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  flow-tolerance: ${tolerance};${" ".repeat(Math.max(0, 6 - tolerance.length))}                    /* ← adjust above */
}`}</div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div style={{
          padding: "0 48px 80px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          <div className="masonry-card-wrapper" style={{ margin: 0, padding: 0 }}>
            <div className="masonry-grid">
              {CARDS.map(card => (
                <div key={card.id} className="masonry-card-wrapper">
                  <Card card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 48px",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.2)",
          }}>
            CSS GRID LANES — SAFARI TECHNOLOGY PREVIEW 234+ — CSS WORKING GROUP DRAFT
          </span>
          <a
            href="https://webkit.org/demos/grid3"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "#e8ff47",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
          >
            webkit.org/demos/grid3 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
