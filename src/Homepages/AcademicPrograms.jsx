import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Sample Data ─────────────────────────────────────────────────────────── */
const programs = [
  {
    title: "Undergraduate Medicine",
    type: "undergraduate",
    description: "Foundation programmes for aspiring medical professionals.",
    accent: "#1e3a8a",
    tag: "UG",
    icon: "🎓",
    stats: [{ label: "Duration", value: "4–5.5 Yrs" }, { label: "Seats", value: "150" }, { label: "Eligibility", value: "NEET UG" }],
    programs: ["MBBS", "BDS", "B.Pharm", "B.Sc Nursing", "BMLT"],
    details: {
      duration: "5.5 Years",
      seats: "150",
      eligibility: "10+2 with PCB, NEET qualified",
      highlights: [
        "State-of-the-art simulation labs",
        "Clinical rotations from Year 2",
        "Affiliated teaching hospitals",
        "Research elective in final year",
      ],
      overview:
        "Our undergraduate medicine track is built on a rigorous integrated curriculum that balances foundational science with early clinical exposure. Students benefit from small-group teaching, standardised patient programmes, and dedicated mentorship from practising clinicians.",
    },
  },
  {
    title: "Postgraduate Medicine",
    type: "postgraduate",
    description: "Advanced specialisation for practising doctors.",
    accent: "#0f766e",
    tag: "PG",
    icon: "🔬",
    stats: [{ label: "Duration", value: "2–3 Yrs" }, { label: "Seats", value: "80" }, { label: "Eligibility", value: "NEET PG" }],
    programs: ["MD", "MS", "MDS", "M.Pharm", "M.Sc Medical"],
    details: {
      duration: "3 Years",
      seats: "80",
      eligibility: "MBBS / BDS with NEET-PG / NEET-MDS",
      highlights: [
        "Super-speciality exposure",
        "Thesis & original research mandatory",
        "National & international conference grants",
        "Fellowship pathways available",
      ],
      overview:
        "Postgraduate programmes offer deep specialisation under expert faculty. Each resident is attached to a dedicated department with access to a high patient-volume tertiary care hospital, enabling intensive skill development and independent research.",
    },
  },
  {
    title: "Allied Health Sciences",
    type: "allied",
    description: "Paramedical & technology-driven healthcare careers.",
    accent: "#b45309",
    tag: "AHS",
    icon: "🏥",
    stats: [{ label: "Duration", value: "3–4 Yrs" }, { label: "Seats", value: "120" }, { label: "Eligibility", value: "10+2 Sci" }],
    programs: [
      "Physiotherapy",
      "Occupational Therapy",
      "Radiography",
      "Optometry",
      "Dialysis Tech",
    ],
    details: {
      duration: "3 – 4 Years",
      seats: "120",
      eligibility: "10+2 with Science",
      highlights: [
        "Hands-on clinical placements",
        "Industry-certified skill modules",
        "Inter-disciplinary team training",
        "Placement assistance cell",
      ],
      overview:
        "Allied Health Sciences programmes are designed in collaboration with leading hospitals to ensure graduates are workforce-ready from day one. The curriculum combines technical knowledge with patient-communication skills and evidence-based practice.",
    },
  },
];

const allPrograms = [
  { category: "Undergraduate", items: ["MBBS", "BDS", "B.Pharm", "B.Sc Nursing", "BMLT", "B.Sc Radiology", "B.Sc Anaesthesia Technology"] },
  { category: "Postgraduate", items: ["MD – General Medicine", "MD – Paediatrics", "MS – Orthopaedics", "MS – Surgery", "MDS – Orthodontics", "M.Pharm", "M.Sc Medical Biochemistry"] },
  { category: "Allied Health", items: ["Physiotherapy (BPT)", "Occupational Therapy", "Radiography", "Optometry", "Dialysis Technology", "Operation Theatre Technology", "Cardiac Care Technology"] },
  { category: "Diploma & Certificate", items: ["Diploma in Nursing", "Certificate in Phlebotomy", "Certificate in Medical Coding", "PG Diploma – Hospital Administration", "Certificate in Yoga Therapy"] },
  { category: "Fellowship", items: ["Fellowship – Minimal Access Surgery", "Fellowship – Neonatology", "Fellowship – Interventional Cardiology", "Fellowship – Pain Management"] },
];

/* ─── Course Detail Panel ────────────────────────────────────────────────── */
function DetailPanel({ program, onClose }) {
  return (
    <AnimatePresence>
      {program && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 flex flex-col overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
          >
            {/* Panel Header */}
            <div
              className="px-8 pt-10 pb-8 flex-shrink-0"
              style={{ borderBottom: `3px solid ${program.accent}` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: program.accent + "18", color: program.accent }}
                >
                  {program.tag}
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <h2 className="panel-title text-2xl font-bold text-gray-900 mt-3">{program.title}</h2>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">{program.description}</p>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-7">
              {/* Meta row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Duration", value: program.details.duration },
                  { label: "Seats", value: program.details.seats },
                  { label: "Eligibility", value: program.details.eligibility },
                ].map((m) => (
                  <div key={m.label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Overview</p>
                <p className="text-gray-600 text-sm leading-relaxed">{program.details.overview}</p>
              </div>

              {/* Highlights */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Programme Highlights</p>
                <ul className="space-y-2">
                  {program.details.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: program.accent + "18" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3" stroke={program.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Courses list */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Offered Courses</p>
                <div className="flex flex-wrap gap-2">
                  {program.programs.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-3 py-1.5 rounded-full font-medium border"
                      style={{ borderColor: program.accent + "40", color: program.accent, background: program.accent + "08" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 py-6 border-t border-gray-100 flex-shrink-0">
              <button
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: program.accent }}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── View All Modal ─────────────────────────────────────────────────────── */
function ViewAllModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="modal-title text-xl font-bold text-gray-900">All Programmes</h2>
              <p className="text-sm text-gray-400 mt-0.5">Complete course catalogue</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto flex-1 px-8 py-6 space-y-7">
            {allPrograms.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.07 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{cat.category}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <button
                      key={item}
                      className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-5 border-t border-gray-100 flex-shrink-0 flex items-center justify-between">
            <p className="text-sm text-gray-400">5000+ successful alumni</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#1e3a8a] text-white text-sm font-semibold hover:bg-[#1e3a8a]/90 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function AcademicPrograms() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ap-section {
          font-family: 'DM Sans', sans-serif;
        }
        .ap-heading {
          font-family: 'Lora', serif;
          font-weight: 700;
          color: #111827;
        }
        .panel-title, .modal-title {
          font-family: 'Lora', serif;
        }
        .ap-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .ap-card:hover {
          box-shadow: 0 16px 40px rgba(0,0,0,0.10);
          transform: translateY(-3px);
        }
        .ap-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, gap 0.2s;
          color: white;
        }
        .learn-btn:hover { gap: 10px; }
        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap-8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 13px 36px;
          border-radius: 10px;
          border: 2px solid #1e3a8a;
          color: #1e3a8a;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .view-all-btn:hover {
          background: #1e3a8a;
          color: white;
        }
      `}</style>

      <section
        id="academic-programs"
        ref={sectionRef}
        className="ap-section relative py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fb] overflow-hidden"
      >
        {/* Subtle top rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">

          {/* ── Header ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1e3a8a] mb-3">Programmes</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="ap-heading text-4xl md:text-5xl">Academic Programs</h2>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Comprehensive programmes designed to shape the next generation of medical leaders.
              </p>
            </div>
            <div className="mt-6 h-px bg-gray-200" />
          </motion.div>

          {/* ── Cards Grid ───────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="ap-card flex flex-col"
              >
                {/* Card top accent bar */}
                <div className="h-1 w-full" style={{ background: program.accent }} />

                {/* Icon Header */}
                <div
                  className="px-6 pt-7 pb-6"
                  style={{ background: program.accent + "08" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: program.accent + "18" }}
                    >
                      {program.icon}
                    </div>
                    <span
                      className="ap-tag px-2.5 py-1 rounded-md"
                      style={{ background: program.accent + "14", color: program.accent }}
                    >
                      {program.tag}
                    </span>
                  </div>
                  <h3 className="ap-heading text-xl mb-1">{program.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-b border-gray-100">
                  {program.stats.map((s) => (
                    <div key={s.label} className="px-3 py-3 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{s.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights preview */}
                <div className="px-6 py-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Highlights</p>
                  <ul className="space-y-2">
                    {program.details.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: program.accent }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    className="learn-btn w-full justify-center"
                    style={{ background: program.accent }}
                    onClick={() => setSelectedProgram(program)}
                  >
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Footer ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 text-center flex flex-col items-center gap-4"
          >
            <button className="view-all-btn" onClick={() => setShowAllModal(true)}>
              View All Programs
            </button>
            <p className="text-gray-400 text-sm">Join 5000+ successful alumni in the medical field</p>
          </motion.div>

        </div>
      </section>

      {/* ── Course Detail Panel ─── */}
      <DetailPanel program={selectedProgram} onClose={() => setSelectedProgram(null)} />

      {/* ── View All Modal ─── */}
      {showAllModal && <ViewAllModal onClose={() => setShowAllModal(false)} />}
    </>
  );
}