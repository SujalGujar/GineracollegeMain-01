import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useSectionVisibility } from "../context/SectionVisibilityContext";
import { SectionOffNotice } from "./SectionOffNotice";

// ─── Individual document card ─────────────────────────────────────────────────
function DocumentCard({ section }) {
  const [expanded, setExpanded] = useState(false);
  const items = Array.isArray(section.items) ? section.items : [];
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${section.gradientFrom || "#FFF7ED"} 0%, ${section.gradientTo || "#FFFBF5"} 100%)`,
        border: `1.5px solid ${section.borderColor || "#FCD34D"}`,
        borderRadius: "20px",
        padding: "28px 28px 24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "110px", height: "110px", borderRadius: "50%",
          background: section.color || "#F59E0B", opacity: 0.08, pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "18px" }}>
        <div
          style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: section.color || "#F59E0B",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", flexShrink: 0,
            boxShadow: `0 4px 14px ${(section.color || "#F59E0B")}55`,
          }}
        >
          {section.icon || "📄"}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
            {section.tag && (
              <span
                style={{
                  background: section.badgeColor || "#D97706",
                  color: "#fff", fontSize: "11px", fontWeight: 700,
                  padding: "2px 10px", borderRadius: "20px",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}
              >
                {section.tag}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", lineHeight: "1.35", margin: 0 }}>
            {section.title}
          </h2>
          {section.subtitle && (
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: section.color || "#F59E0B", fontSize: "20px",
            padding: "2px 4px", borderRadius: "6px", flexShrink: 0, lineHeight: 1,
          }}
          aria-label={expanded ? "Collapse section" : "Expand section"}
        >
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Optional description */}
      {section.description && (
        <p style={{
          margin: "0 0 14px", fontSize: "13px", color: "#475569",
          lineHeight: "1.6", padding: "10px 14px",
          background: "rgba(255,255,255,0.6)", borderRadius: "10px",
          borderLeft: `3px solid ${section.color || "#F59E0B"}`,
        }}>
          {section.description}
        </p>
      )}

      {/* Document list */}
      {items.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {visibleItems.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "9px 12px", borderRadius: "10px", marginBottom: "6px",
                background: "rgba(255,255,255,0.72)",
                border: `1px solid ${(section.borderColor || "#FCD34D")}80`,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.72)"; }}
            >
              <span
                style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: section.color || "#F59E0B",
                  color: "#fff", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500, lineHeight: "1.4" }}>
                {item}
              </span>
              <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "14px" }}>✓</span>
            </li>
          ))}
        </ul>
      )}

      {items.length > 3 && (
        <button type="button" onClick={() => setExpanded(value => !value)} style={{ marginTop: "14px", width: "100%", border: `1px solid ${section.borderColor || "#FCD34D"}`, borderRadius: "10px", padding: "9px", background: "rgba(255,255,255,0.72)", color: section.color || "#D97706", fontWeight: 700, cursor: "pointer" }}>
          {expanded ? "Read less" : `Read more (${items.length - 3} more)`}
        </button>
      )}

      {!expanded && items.length === 0 && (
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", textAlign: "center" }}>
          {(section.items || []).length} document{(section.items || []).length !== 1 ? "s" : ""} required — click ▼ to expand
        </p>
      )}

      {expanded && (!section.items || section.items.length === 0) && (
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", textAlign: "center", padding: "16px 0" }}>
          No documents listed yet.
        </p>
      )}
    </div>
  );
}

// ─── Main StudentCorner page ──────────────────────────────────────────────────
export function StudentCorner({ onNavigate }) {
  const { isSectionVisible } = useSectionVisibility();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axiosInstance.get("/student-corner");
        setSections(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load Student Corner sections:", err);
        setError("Could not load document sections. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  // Respect site control toggle
  if (!isSectionVisible("student_corner")) {
    return <SectionOffNotice name="Student Corner" />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8faff 0%, #fff7ed 100%)", paddingBottom: "60px" }}>

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #1a2340 100%)",
          padding: "56px 24px 48px", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-60px", right: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: "#F59E0B", opacity: 0.08, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "#6366F1", opacity: 0.08, pointerEvents: "none" }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: "30px", padding: "6px 18px", marginBottom: "20px" }}>
            <span style={{ fontSize: "16px" }}>🎓</span>
            <span style={{ color: "#FCD34D", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Student Resources</span>
          </div>

          <h1 style={{ color: "#fff", fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.15 }}>
            Student Corner
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 2.5vw, 17px)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.65 }}>
            All important document requirements issued by the Principal — G.I.N.E.R.A., College of Nursing, Ahmedabad. Please read carefully before submitting any application.
          </p>

          {/* Quick-jump pills */}
          {sections.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
              {sections.map((s) => (
                <a
                  key={s._id}
                  href={`#section-${s._id}`}
                  style={{
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e2e8f0", borderRadius: "30px", padding: "7px 18px",
                    fontSize: "13px", fontWeight: 600, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    transition: "background 0.18s, color 0.18s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.25)"; e.currentTarget.style.color = "#FCD34D"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#e2e8f0"; }}
                >
                  <span>{s.icon || "📄"}</span> {s.tag || s.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Notice source strip ──────────────────────────────────────────── */}
      <div style={{ background: "#FEF3C7", borderBottom: "1px solid #FDE68A", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <span style={{ fontSize: "16px" }}>📌</span>
        <span style={{ fontSize: "13px", color: "#92400e", fontWeight: 600 }}>
          Official notice issued by: Principal CL-I, College of Nursing, G.I.N.E.R.A., Ahmedabad
        </span>
      </div>

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px 24px" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #FCD34D", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {!loading && error && (
        <div style={{ maxWidth: "600px", margin: "48px auto", padding: "24px", background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: "16px", textAlign: "center" }}>
          <span style={{ fontSize: "32px" }}>⚠️</span>
          <p style={{ margin: "12px 0 0", color: "#DC2626", fontWeight: 600 }}>{error}</p>
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {!loading && !error && sections.length === 0 && (
        <div style={{ maxWidth: "600px", margin: "64px auto", padding: "48px 24px", textAlign: "center" }}>
          <span style={{ fontSize: "48px" }}>📋</span>
          <h3 style={{ margin: "16px 0 8px", color: "#374151", fontWeight: 700 }}>No Sections Available</h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Document sections will appear here once added by the administrator.</p>
        </div>
      )}

      {/* ── Document sections ─────────────────────────────────────────────── */}
      {!loading && !error && sections.length > 0 && (
        <div
          style={{
            maxWidth: "960px", margin: "48px auto 0", padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
            gap: "28px",
          }}
        >
          {sections.map((section) => (
            <div key={section._id} id={`section-${section._id}`}>
              <DocumentCard section={section} />
            </div>
          ))}
        </div>
      )}

      {/* ── Info note ─────────────────────────────────────────────────────── */}
      {!loading && !error && (
        <div style={{ maxWidth: "960px", margin: "36px auto 0", padding: "0 20px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)",
              border: "1.5px solid #BFDBFE", borderRadius: "16px",
              padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "14px",
            }}
          >
            <span style={{ fontSize: "24px", flexShrink: 0 }}>ℹ️</span>
            <div>
              <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#1e40af", fontSize: "14px" }}>Important Note</p>
              <p style={{ margin: 0, fontSize: "13.5px", color: "#334155", lineHeight: "1.65" }}>
                All documents must be submitted as <strong>Xerox copies</strong> unless specified otherwise.
                Ensure originals are available for verification. For any queries, contact the college office directly or visit the{" "}
                <button
                  onClick={() => onNavigate && onNavigate("contact")}
                  style={{ background: "none", border: "none", padding: 0, color: "#2563EB", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                >
                  Contact Us
                </button>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCorner;
