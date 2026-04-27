// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   GraduationCap,
//   Users,
//   FileText,
//   ArrowRight,
//   ChevronRight,
//   Quote,
//   Sparkles,
//   Zap,
//   Heart,
//   Star,
// } from "lucide-react";

// // ─── Replace these with your actual imports ───────────────────────────────────
// import logo from "../icons/logo (2).png";
// import laboratoryImage from "../images/laboratory.jpg";
// import libraryImage from "../images/library.jpg";
// import backgroundImage4 from "../images/backgroundImage(4).jpg";
// import collegeImage1 from "../images/collegeimage1.jpg";
// import collegeImage2 from "../images/collegeimage2.jpg";
// import collegeImage3 from "../images/collegeimage3.jpg";
// import HomepageImage1 from "../images/homepageimage1.webp";
// import HomepageImage2 from "../images/homepageimage2.webp";
// import HomepageImage3 from "../images/homepageimage3.webp";
// import collegelogo1 from "../Logos/collegelogo1.webp";
// import collegelogo2 from "../Logos/collegelogo2.webp";
// import collegelogo3 from "../Logos/collegelogo3.webp";
// import collegelogo4 from "../Logos/collegelogo4.webp";
// import HeroSection from "../Homepages/HeroSection.jsx";
// // ─────────────────────────────────────────────────────────────────────────────

// /* ═══════════════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════════════ */
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

//   :root {
//     --navy:   #1e3a8a;
//     --brown:  #8B4513;
//     --brown-dark: #6A3A13;
//     --gold:   #f59e0b;
//     --slate:  #475569;
//     --light:  #f8fafc;
//     --card-shadow: 0 4px 24px rgba(30,58,138,0.09);
//     --card-shadow-hover: 0 12px 40px rgba(30,58,138,0.18);
//   }

//   body { font-family: 'DM Sans', sans-serif; }

//   h1,h2,h3 { font-family: 'Playfair Display', serif; }

//   /* ── Learn More button ── */
//   .btn-learn-more {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 12px 24px;
//     border-radius: 9999px;
//     border: none;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 600;
//     font-size: 14px;
//     background: linear-gradient(135deg, var(--brown-dark), var(--brown));
//     color: #fff;
//     overflow: hidden;
//     transition: transform 0.2s, box-shadow 0.2s;
//     width: 100%;
//     justify-content: center;
//   }
//   .btn-learn-more:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 24px rgba(139,69,19,0.35);
//   }
//   .btn-learn-more .shine {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
//     transform: translateX(-100%);
//     transition: transform 0.5s;
//   }
//   .btn-learn-more:hover .shine { transform: translateX(100%); }

//   /* ── View All button ── */
//   .btn-view-all {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     gap: 10px;
//     padding: 14px 36px;
//     border-radius: 14px;
//     border: none;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 700;
//     font-size: 16px;
//     background: linear-gradient(135deg, var(--brown-dark), var(--brown));
//     color: #fff;
//     transition: transform 0.2s, box-shadow 0.2s;
//     overflow: hidden;
//   }
//   .btn-view-all:hover {
//     transform: translateY(-3px) scale(1.04);
//     box-shadow: 0 12px 36px rgba(139,69,19,0.4);
//   }
//   .btn-view-all svg path { fill: currentColor; }

//   /* ── Program card list items ── */
//   .prog-list-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     padding: 8px 10px;
//     border-radius: 10px;
//     transition: background 0.2s;
//   }
//   .prog-list-item:hover { background: #f1f5f9; }
//   .prog-list-item .bullet {
//     flex-shrink: 0;
//     width: 22px;
//     height: 22px;
//     border-radius: 50%;
//     background: #fef3c7;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-top: 1px;
//   }
//   .prog-list-item span {
//     font-size: 14px;
//     font-weight: 500;
//     color: #374151;
//     line-height: 1.45;
//   }

//   /* ── Logo slider ── */
//   .logo-track {
//     display: flex;
//     gap: 24px;
//     transition: transform 0.5s cubic-bezier(.4,0,.2,1);
//   }
//   .logo-card {
//     flex-shrink: 0;
//     width: 160px;
//     height: 100px;
//     border-radius: 16px;
//     border: 1px solid #e2e8f0;
//     background: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 16px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//     transition: transform 0.3s;
//   }
//   .logo-card:hover { transform: scale(1.06); }
//   .logo-card img { max-width: 100%; max-height: 100%; object-fit: contain; }

//   /* ── Section title accent ── */
//   .section-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     background: #eff6ff;
//     color: var(--navy);
//     border-radius: 9999px;
//     padding: 6px 18px;
//     font-size: 13px;
//     font-weight: 600;
//     letter-spacing: 0.04em;
//     text-transform: uppercase;
//     margin-bottom: 16px;
//   }

//   /* ── Testimonial card ── */
//   .testimonial-card {
//     background: #fff;
//     border-radius: 28px;
//     box-shadow: var(--card-shadow-hover);
//     border: 1px solid #e8edf5;
//     overflow: hidden;
//   }
// `;

// /* ═══════════════════════════════════════════════════════
//    SUB-COMPONENTS
// ═══════════════════════════════════════════════════════ */

// const LearnMoreButton = ({ onClick }) => (
//   <button className="btn-learn-more" onClick={onClick}>
//     <span className="shine" />
//     <span style={{ position: "relative", zIndex: 1 }}>Learn More</span>
//     <ArrowRight size={15} style={{ position: "relative", zIndex: 1 }} />
//   </button>
// );

// const ViewAllButton = ({ onClick }) => (
//   <button className="btn-view-all" onClick={onClick}>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
//       <path fill="none" d="M0 0h24v24H0z" />
//       <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
//     </svg>
//     View All Programs
//   </button>
// );

// /* ═══════════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════════ */
// const PROGRAMS = [
//   {
//     title: "Undergraduate Programs",
//     description: "Comprehensive medical education with hands-on clinical training",
//     icon: GraduationCap,
//     image: HomepageImage2,
//     courses: [
//       "Graduate Course",
//       "B.Sc. Nursing",
//       "Post-Basic B.Sc. Nursing (IGNOU)",
//     ],
//   },
//   {
//     title: "Postgraduate Programs",
//     description: "Specialized advanced training in various Nursing disciplines",
//     icon: Users,
//     image: HomepageImage3,
//     courses: [
//       "M.Sc. – Medical Surgical Nursing",
//       "M.Sc. – Child Health Nursing",
//       "M.Sc. – Obstetric & Gynecological Nursing",
//       "M.Sc. – Mental Health & Psychiatric Nursing",
//       "M.Sc. – Community Health Nursing",
//       "Nurses Practitioner in Critical Care – PG Residency (NPCC)",
//     ],
//   },
//   {
//     title: "Diploma Courses",
//     description: "Short-term specialized courses for skill enhancement",
//     icon: FileText,
//     image: HomepageImage1,
//     courses: [
//       "Diploma in General Nursing & Midwifery (3 Years)",
//       "Post Basic Diploma – Burn & Reconstructive Surgery Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Orthopaedic & Rehabilitation Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Neonatal Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Oncology Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Critical Care Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Emergency & Disaster Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Cardiothoracic Specialty Nursing (1 Year)",
//       "Post Basic Diploma – Nurse Practitioners in Midwifery (1.5 Years)",
//       "Nurse Practitioner Midwifery (NPM) Educator Program",
//     ],
//   },
// ];

// const TESTIMONIALS = [
//   {
//     name: "Sarah Johnson",
//     role: "Medical Student",
//     content: "Univer provided me with exceptional education and opportunities that shaped my career in ways I never imagined possible.",
//     rating: 5,
//     image: libraryImage,
//   },
//   {
//     name: "Michael Chen",
//     role: "Research Scholar",
//     content: "The academic environment and faculty support at Univer are truly outstanding. I felt supported every step of the way.",
//     rating: 5,
//     image: laboratoryImage,
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Alumni",
//     content: "My experience at Univer prepared me perfectly for my medical career. I highly recommend it to anyone serious about nursing.",
//     rating: 5,
//     image: libraryImage,
//   },
// ];

// const LOGOS = [collegelogo1, collegelogo2, collegelogo3, collegelogo4];

// /* ═══════════════════════════════════════════════════════
//    ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════ */
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const cardVariant = {
//   hidden: { opacity: 0, y: 50, scale: 0.96 },
//   visible: (i = 0) => ({
//     opacity: 1, y: 0, scale: 1,
//     transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// export function HomePage({ onNavigate }) {
//   const [testimonialsIndex, setTestimonialsIndex] = useState(0);
//   const [logoOffset, setLogoOffset] = useState(0);
//   const [programsVisible, setProgramsVisible] = useState(false);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const id = setInterval(() => {
//       setTestimonialsIndex((p) => (p + 1) % TESTIMONIALS.length);
//     }, 6000);
//     return () => clearInterval(id);
//   }, []);

//   // Intersection observer for programs section
//   useEffect(() => {
//     const el = document.getElementById("academic-programs");
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setProgramsVisible(true); },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];
//   const LOGO_WIDTH = 184; // 160px + 24px gap

//   const prevLogo = () =>
//     setLogoOffset((p) => Math.max(p - 1, 0));
//   const nextLogo = () =>
//     setLogoOffset((p) => Math.min(p + 1, LOGOS.length - 1));

//   const prevTestimonial = () =>
//     setTestimonialsIndex((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));
//   const nextTestimonial = () =>
//     setTestimonialsIndex((p) => (p + 1) % TESTIMONIALS.length);

//   const current = TESTIMONIALS[testimonialsIndex];

//   return (
//     <>
//       <style>{globalStyles}</style>

//       <div className="relative min-h-screen bg-white overflow-x-hidden">
//         {/* subtle background texture */}
//         <img
//           src={backgroundImage4}
//           alt=""
//           aria-hidden="true"
//           style={{
//             position: "fixed", inset: 0, width: "100%", height: "100%",
//             objectFit: "cover", opacity: 0.06, zIndex: 0, pointerEvents: "none",
//           }}
//         />

//         {/* ── Hero ─────────────────────────────────────────── */}
//         <HeroSection />

//         {/* ── Academic Programs ─────────────────────────────── */}
//         <section
//           id="academic-programs"
//           style={{
//             position: "relative",
//             padding: "96px 0 80px",
//             background: "linear-gradient(160deg, #f0f4ff 0%, #e8edf8 100%)",
//             overflow: "hidden",
//           }}
//         >
//           {/* decorative blobs */}
//           {[
//             { top: 60, left: 40, w: 220, color: "#facc15", delay: 0 },
//             { bottom: 60, right: 40, w: 280, color: "#1e3a8a", delay: 1 },
//             { top: "45%", left: "30%", w: 180, color: "#10b981", delay: 2 },
//           ].map((blob, i) => (
//             <motion.div
//               key={i}
//               style={{
//                 position: "absolute",
//                 width: blob.w, height: blob.w,
//                 borderRadius: "50%",
//                 background: blob.color,
//                 opacity: 0.07,
//                 filter: "blur(48px)",
//                 top: blob.top, bottom: blob.bottom,
//                 left: blob.left, right: blob.right,
//                 pointerEvents: "none",
//               }}
//               animate={{ scale: [1, 1.15, 1] }}
//               transition={{ duration: 6 + i, repeat: Infinity, delay: blob.delay }}
//             />
//           ))}

//           <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

//             {/* Section header */}
//             <motion.div
//               variants={fadeUp} initial="hidden"
//               animate={programsVisible ? "visible" : "hidden"}
//               style={{ textAlign: "center", marginBottom: 64 }}
//             >
//               <div className="section-badge">
//                 <Sparkles size={14} />
//                 Our Offerings
//                 <Zap size={14} />
//               </div>
//               <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111827", marginBottom: 20, lineHeight: 1.2 }}>
//                 Academic Programs
//               </h2>
//               <p style={{ fontSize: 17, color: "#4b5563", maxWidth: 720, margin: "0 auto 12px", lineHeight: 1.7 }}>
//                 Academic nursing programs are structured educational pathways designed to prepare individuals
//                 for the nursing profession — from entry-level bedside care to advanced clinical practice,
//                 education, and research.
//               </p>
//               <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
//                 Programs span <strong>4 years</strong> (Undergraduate), <strong>3 years</strong> (Diploma),
//                 <strong> 2 years</strong> (Masters in Nursing), and <strong>1 year</strong> (Post-Basic Diploma).
//               </p>
//             </motion.div>

//             {/* Program cards */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//                 gap: 28,
//                 alignItems: "start",
//               }}
//             >
//               {PROGRAMS.map((prog, i) => (
//                 <motion.div
//                   key={i}
//                   custom={i}
//                   variants={cardVariant}
//                   initial="hidden"
//                   animate={programsVisible ? "visible" : "hidden"}
//                   whileHover={{ y: -8, transition: { duration: 0.3 } }}
//                   style={{
//                     background: "#fff",
//                     borderRadius: 24,
//                     boxShadow: "var(--card-shadow)",
//                     border: "1px solid #e2e8f0",
//                     overflow: "hidden",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "box-shadow 0.3s",
//                   }}
//                   onHoverStart={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow-hover)"}
//                   onHoverEnd={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow)"}
//                 >
//                   {/* Image */}
//                   <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
//                     <motion.img
//                       src={prog.image}
//                       alt={prog.title}
//                       style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       whileHover={{ scale: 1.06 }}
//                       transition={{ duration: 0.5 }}
//                     />
//                     <div style={{
//                       position: "absolute", inset: 0,
//                       background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
//                     }} />
//                     {/* title on image */}
//                     <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 16px" }}>
//                       <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 4, lineHeight: 1.2 }}>
//                         {prog.title}
//                       </h3>
//                       <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 1.4 }}>
//                         {prog.description}
//                       </p>
//                     </div>
//                     {/* pulse dot */}
//                     <motion.span
//                       style={{
//                         position: "absolute", top: 14, right: 14,
//                         width: 10, height: 10, borderRadius: "50%",
//                         background: "#fff",
//                       }}
//                       animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
//                       transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
//                     />
//                   </div>

//                   {/* Courses list */}
//                   <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
//                     <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, flex: 1 }}>
//                       {prog.courses.map((course, ci) => (
//                         <li key={ci} className="prog-list-item">
//                           <span className="bullet">
//                             <ChevronRight size={12} color="#d97706" strokeWidth={3} />
//                           </span>
//                           <span>{course}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     <LearnMoreButton onClick={() => console.log(`Learn more: ${prog.title}`)} />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* View All */}
//             <motion.div
//               variants={fadeUp} custom={3}
//               initial="hidden"
//               animate={programsVisible ? "visible" : "hidden"}
//               style={{ textAlign: "center", marginTop: 56 }}
//             >
//               <ViewAllButton onClick={() => console.log("View All Programs")} />
//               <p style={{ marginTop: 20, color: "#6b7280", fontSize: 16 }}>
//                 10,000+ successful alumni in the field of Nursing
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* ── Testimonials ─────────────────────────────────── */}
//         <section style={{
//           position: "relative",
//           padding: "96px 0",
//           background: "linear-gradient(160deg, #eff6ff 0%, #eef2ff 100%)",
//           overflow: "hidden",
//         }}>
//           {/* blobs */}
//           <motion.div style={{
//             position: "absolute", top: 40, right: 60,
//             width: 320, height: 320, borderRadius: "50%",
//             background: "#bfdbfe", opacity: 0.25, filter: "blur(60px)",
//             pointerEvents: "none",
//           }}
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 8, repeat: Infinity }}
//           />
//           <motion.div style={{
//             position: "absolute", bottom: 40, left: 60,
//             width: 400, height: 400, borderRadius: "50%",
//             background: "#c7d2fe", opacity: 0.2, filter: "blur(72px)",
//             pointerEvents: "none",
//           }}
//             animate={{ scale: [1.1, 1, 1.1] }}
//             transition={{ duration: 10, repeat: Infinity, delay: 2 }}
//           />

//           <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

//             {/* Header */}
//             <motion.div
//               variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
//               style={{ textAlign: "center", marginBottom: 56 }}
//             >
//               <div className="section-badge" style={{ background: "#fef2f2", color: "#dc2626" }}>
//                 <Heart size={14} />
//                 Student Voices
//                 <Heart size={14} />
//               </div>
//               <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#111827", marginBottom: 12 }}>
//                 What Our Students Say
//               </h2>
//               <p style={{ fontSize: 17, color: "#4b5563", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
//                 Hear the inspiring experiences of learners who grew their careers with us.
//               </p>
//             </motion.div>

//             {/* Slider */}
//             <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>

//               {/* Prev / Next */}
//               {[
//                 { side: "left", fn: prevTestimonial, style: { left: -56 } },
//                 { side: "right", fn: nextTestimonial, style: { right: -56 } },
//               ].map(({ side, fn, style }) => (
//                 <motion.button
//                   key={side}
//                   onClick={fn}
//                   whileHover={{ scale: 1.1, backgroundColor: "#1e3a8a", color: "#fff" }}
//                   whileTap={{ scale: 0.95 }}
//                   style={{
//                     position: "absolute", top: "50%", transform: "translateY(-50%)",
//                     width: 44, height: 44, borderRadius: "50%", border: "1px solid #e2e8f0",
//                     background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     cursor: "pointer", zIndex: 10, color: "#374151",
//                     transition: "background 0.2s, color 0.2s",
//                     ...style,
//                   }}
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </motion.button>
//               ))}

//               {/* Card */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={testimonialsIndex}
//                   initial={{ opacity: 0, x: 60 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -60 }}
//                   transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//                   className="testimonial-card"
//                 >
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr" }}>
//                     {/* Image */}
//                     <div style={{ position: "relative", minHeight: 320, overflow: "hidden" }}>
//                       <img
//                         src={current.image}
//                         alt={current.name}
//                         style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//                       />
//                       <div style={{
//                         position: "absolute", inset: 0,
//                         background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
//                       }} />
//                       {/* Stars badge */}
//                       <div style={{
//                         position: "absolute", top: 18, left: 18,
//                         background: "rgba(255,255,255,0.92)",
//                         backdropFilter: "blur(6px)",
//                         borderRadius: 9999,
//                         padding: "6px 14px",
//                         display: "flex", alignItems: "center", gap: 3,
//                         boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
//                       }}>
//                         {[...Array(current.rating)].map((_, si) => (
//                           <Star key={si} size={14} fill="#f59e0b" color="#f59e0b" />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Text */}
//                     <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                       <Quote size={40} color="#3b82f6" style={{ marginBottom: 20, opacity: 0.8 }} />
//                       <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, fontStyle: "italic", marginBottom: 28 }}>
//                         "{current.content}"
//                       </p>
//                       <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
//                         <p style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 4 }}>
//                           {current.name}
//                         </p>
//                         <p style={{ fontSize: 14, color: "#6b7280" }}>{current.role}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Dots */}
//               <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
//                 {TESTIMONIALS.map((_, di) => (
//                   <button
//                     key={di}
//                     onClick={() => setTestimonialsIndex(di)}
//                     style={{
//                       width: di === testimonialsIndex ? 28 : 10,
//                       height: 10,
//                       borderRadius: 9999,
//                       border: "none",
//                       background: di === testimonialsIndex ? "#1e3a8a" : "#cbd5e1",
//                       cursor: "pointer",
//                       transition: "all 0.3s",
//                       padding: 0,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Trusted Logos ────────────────────────────────── */}
//         <section style={{
//           position: "relative",
//           padding: "64px 0",
//           background: "#fff",
//           overflow: "hidden",
//         }}>
//           <img
//             src={backgroundImage4}
//             alt=""
//             aria-hidden="true"
//             style={{
//               position: "absolute", inset: 0, width: "100%", height: "100%",
//               objectFit: "cover", opacity: 0.05, pointerEvents: "none",
//             }}
//           />
//           <div style={{ position: "relative", zIndex: 1 }}>
//             <motion.p
//               variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
//               style={{ textAlign: "center", color: "#6b7280", fontSize: 15, marginBottom: 36, letterSpacing: "0.02em" }}
//             >
//               Trusted by leading organizations and institutions worldwide
//             </motion.p>

//             <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
//               <div style={{ overflow: "hidden" }}>
//                 <motion.div
//                   className="logo-track"
//                   animate={{ x: -logoOffset * LOGO_WIDTH }}
//                   transition={{ type: "spring", stiffness: 280, damping: 28 }}
//                 >
//                   {duplicatedLogos.map((src, i) => (
//                     <div key={i} className="logo-card">
//                       <img src={src} alt={`Partner logo ${(i % LOGOS.length) + 1}`} />
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>

//               {/* Logo nav buttons */}
//               {[
//                 { side: "left", fn: prevLogo, pos: { left: -24 } },
//                 { side: "right", fn: nextLogo, pos: { right: -24 } },
//               ].map(({ side, fn, pos }) => (
//                 <button
//                   key={side}
//                   onClick={fn}
//                   style={{
//                     position: "absolute", top: "50%", transform: "translateY(-50%)",
//                     width: 40, height: 40, borderRadius: "50%",
//                     border: "1px solid #e2e8f0", background: "#fff",
//                     boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     cursor: "pointer", color: "#374151", zIndex: 5,
//                     ...pos,
//                   }}
//                 >
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//       </div>
//     </>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  FileText,
  ArrowRight,
  ChevronRight,
  Quote,
  Sparkles,
  Zap,
  Heart,
  Star,
} from "lucide-react";

// ─── Replace these with your actual imports ───────────────────────────────────
import logo from "../icons/logo (2).png";
import laboratoryImage from "../images/laboratory.jpg";
import libraryImage from "../images/library.jpg";
import backgroundImage4 from "../images/backgroundImage(4).png";
import collegeImage1 from "../images/collegeimage1.jpg";
import collegeImage2 from "../images/collegeimage2.jpg";
import collegeImage3 from "../images/collegeimage3.jpg";
import HomepageImage1 from "../images/homepageimage1.webp";
import HomepageImage2 from "../images/homepageimage2.webp";
import HomepageImage3 from "../images/homepageimage3.webp";
import collegelogo1 from "../Logos/collegelogo1.webp";
import collegelogo2 from "../Logos/collegelogo2.webp";
import collegelogo3 from "../Logos/collegelogo3.webp";
import collegelogo4 from "../Logos/collegelogo4.webp";
import HeroSection from "../Homepages/HeroSection";
import axiosInstance from "../api/axiosInstance";
// ─────────────────────────────────────────────────────────────────────────────

/* ═══════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════ */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  :root {
    --navy: #1e3a8a;
    --brown: #8B4513;
    --brown-dark: #6A3A13;
    --gold: #f59e0b;
    --slate: #475569;
    --light: #f8fafc;
    --card-shadow: 0 4px 24px rgba(30,58,138,0.09);
    --card-shadow-hover: 0 12px 40px rgba(30,58,138,0.18);
  }
  body { font-family: 'DM Sans', sans-serif; }
  h1,h2,h3 { font-family: 'Playfair Display', serif; }
  .btn-learn-more {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    background: linear-gradient(135deg, var(--brown-dark), var(--brown));
    color: #fff;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
    justify-content: center;
  }
  .btn-learn-more:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139,69,19,0.35);
  }
  .btn-learn-more .shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .btn-learn-more:hover .shine { transform: translateX(100%); }
  .btn-view-all {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 36px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 16px;
    background: linear-gradient(135deg, var(--brown-dark), var(--brown));
    color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .btn-view-all:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 12px 36px rgba(139,69,19,0.4);
  }
  .btn-view-all svg path { fill: currentColor; }
  .prog-list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    transition: background 0.2s;
  }
  .prog-list-item:hover { background: #f1f5f9; }
  .prog-list-item .bullet {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fef3c7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }
  .prog-list-item span {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    line-height: 1.45;
  }
  .logo-track {
    display: flex;
    gap: 24px;
    transition: transform 0.5s cubic-bezier(.4,0,.2,1);
  }
  .logo-card {
    flex-shrink: 0;
    width: 160px;
    height: 100px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: transform 0.3s;
  }
  .logo-card:hover { transform: scale(1.06); }
  .logo-card img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #eff6ff;
    color: var(--navy);
    border-radius: 9999px;
    padding: 6px 18px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .testimonial-card {
    background: #fff;
    border-radius: 28px;
    box-shadow: var(--card-shadow-hover);
    border: 1px solid #e8edf5;
    overflow: hidden;
  }
  .read-more-btn {
    background: none;
    border: none;
    color: #8B4513;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    padding: 4px 8px;
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
  }
  .read-more-btn:hover {
    color: #6A3A13;
    transform: translateX(2px);
  }
`;

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════ */
const LearnMoreButton = ({ onClick }) => (
  <button className="btn-learn-more" onClick={onClick}>
    <span className="shine" />
    <span style={{ position: "relative", zIndex: 1 }}>Learn More</span>
    <ArrowRight size={15} style={{ position: "relative", zIndex: 1 }} />
  </button>
);

const ViewAllButton = ({ onClick }) => (
  <button className="btn-view-all" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
    </svg>
    View All Programs
  </button>
);

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const PROGRAMS = [
  {
    title: "Undergraduate Programs",
    description: "Comprehensive medical education with hands-on clinical training",
    icon: GraduationCap,
    image: HomepageImage2,
    courses: [
      "Graduate Course",
      "B.Sc. Nursing",
      "Post-Basic B.Sc. Nursing (IGNOU)",
    ],
  },
  {
    title: "Postgraduate Programs",
    description: "Specialized advanced training in various Nursing disciplines",
    icon: Users,
    image: HomepageImage3,
    courses: [
      "M.Sc. – Medical Surgical Nursing",
      "M.Sc. – Child Health Nursing",
      "M.Sc. – Obstetric & Gynecological Nursing",
      "M.Sc. – Mental Health & Psychiatric Nursing",
      "M.Sc. – Community Health Nursing",
      "Nurses Practitioner in Critical Care – PG Residency (NPCC)",
    ],
  },
  {
    title: "Diploma Courses",
    description: "Short-term specialized courses for skill enhancement",
    icon: FileText,
    image: HomepageImage1,
    courses: [
      "Diploma in General Nursing & Midwifery (3 Years)",
      "Post Basic Diploma – Burn & Reconstructive Surgery Specialty Nursing (1 Year)",
      "Post Basic Diploma – Orthopaedic & Rehabilitation Specialty Nursing (1 Year)",
      "Post Basic Diploma – Neonatal Specialty Nursing (1 Year)",
      "Post Basic Diploma – Oncology Specialty Nursing (1 Year)",
      "Post Basic Diploma – Critical Care Specialty Nursing (1 Year)",
      "Post Basic Diploma – Emergency & Disaster Specialty Nursing (1 Year)",
      "Post Basic Diploma – Cardiothoracic Specialty Nursing (1 Year)",
      "Post Basic Diploma – Nurse Practitioners in Midwifery (1.5 Years)",
      "Nurse Practitioner Midwifery (NPM) Educator Program",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    content: "Univer provided me with exceptional education and opportunities that shaped my career in ways I never imagined possible.",
    rating: 5,
    image: libraryImage,
  },
  {
    name: "Michael Chen",
    role: "Research Scholar",
    content: "The academic environment and faculty support at Univer are truly outstanding. I felt supported every step of the way.",
    rating: 5,
    image: laboratoryImage,
  },
  {
    name: "Emily Rodriguez",
    role: "Alumni",
    content: "My experience at Univer prepared me perfectly for my medical career. I highly recommend it to anyone serious about nursing.",
    rating: 5,
    image: libraryImage,
  },
];

const LOGOS = [collegelogo1, collegelogo2, collegelogo3, collegelogo4];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const HomePage=({ onNavigate }) => {
  const [testimonialsIndex, setTestimonialsIndex] = useState(0);
  const [logoOffset, setLogoOffset] = useState(0);
  const [programsVisible, setProgramsVisible] = useState(false);
  const [expandedProgram, setExpandedProgram] = useState(null);

  const [dynamicPrograms, setDynamicPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const [academicContent, setAcademicContent] = useState({
    title: "Academic Programs",
    description1: "Academic nursing programs are structured educational pathways designed to prepare individuals for the nursing profession — from entry-level bedside care to advanced clinical practice, education, and research.",
    description2: "Programs span 4 years (Undergraduate), 3 years (Diploma), 2 years (Masters in Nursing), and 1 year (Post-Basic Diploma)."
  });

  const testimonialsToDisplay = dynamicTestimonials.length > 0 ? dynamicTestimonials : TESTIMONIALS;

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialsIndex((p) => (p + 1) % testimonialsToDisplay.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonialsToDisplay.length]);

  useEffect(() => {
    const el = document.getElementById("academic-programs");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setProgramsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fetchDynamicPrograms = async () => {
      try {
        const response = await axiosInstance.get("/programs");
        setDynamicPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoadingPrograms(false);
      }
    };
    fetchDynamicPrograms();
  }, []);

  useEffect(() => {
    const fetchAcademicContent = async () => {
      try {
        const response = await axiosInstance.get("/content/academic");
        if (response.data) setAcademicContent(response.data);
      } catch (error) {
        console.error("Error fetching academic content:", error);
      }
    };
    fetchAcademicContent();
  }, []);

  useEffect(() => {
    const fetchDynamicTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/testimonials");
        setDynamicTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchDynamicTestimonials();
  }, []);

  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];
  const LOGO_WIDTH = 184;

  const prevLogo = () => setLogoOffset((p) => Math.max(p - 1, 0));
  const nextLogo = () => setLogoOffset((p) => Math.min(p + 1, LOGOS.length - 1));
  const prevTestimonial = () => setTestimonialsIndex((p) => (p === 0 ? testimonialsToDisplay.length - 1 : p - 1));
  const nextTestimonial = () => setTestimonialsIndex((p) => (p + 1) % testimonialsToDisplay.length);
  
  const current = testimonialsToDisplay[testimonialsIndex] || TESTIMONIALS[0];

  const toggleReadMore = (programId) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  const programsToDisplay = dynamicPrograms.length > 0 ? dynamicPrograms : PROGRAMS;

  const scrollPrograms = (dir) => {
    const el = document.getElementById("programs-slider");
    if (el) el.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="relative min-h-screen bg-white overflow-x-hidden">
        <img
          src={backgroundImage4}
          alt=""
          aria-hidden="true"
          style={{
            position: "fixed", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.06, zIndex: 0, pointerEvents: "none",
          }}
        />
        <HeroSection />
        <section
          id="academic-programs"
          style={{
            position: "relative",
            padding: "64px 0 48px",
            background: "linear-gradient(160deg, #f0f4ff 0%, #e8edf8 100%)",
            overflow: "hidden",
          }}
        >
          {[
            { top: 60, left: 40, w: 220, color: "#facc15", delay: 0 },
            { bottom: 60, right: 40, w: 280, color: "#1e3a8a", delay: 1 },
            { top: "45%", left: "30%", w: 180, color: "#10b981", delay: 2 },
          ].map((blob, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: blob.w, height: blob.w,
                borderRadius: "50%",
                background: blob.color,
                opacity: 0.07,
                filter: "blur(48px)",
                top: blob.top, bottom: blob.bottom,
                left: blob.left, right: blob.right,
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: blob.delay }}
            />
          ))}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={programsVisible ? "visible" : "hidden"}
              style={{ textAlign: "center", marginBottom: 64 }}
            >
              <div className="section-badge">
                <Sparkles size={14} />
                Our Offerings
                <Zap size={14} />
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111827", marginBottom: 20, lineHeight: 1.2 }}>
                {academicContent.title}
              </h2>
              <p style={{ fontSize: 17, color: "#4b5563", maxWidth: 720, margin: "0 auto 12px", lineHeight: 1.7 }}>
                {academicContent.description1}
              </p>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: academicContent.description2 }} />
            </motion.div>
            <div style={{ position: "relative" }}>
              {programsToDisplay.length > 3 && (
                <>
                  <button 
                    onClick={() => scrollPrograms(-1)}
                    style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid #e2e8f0" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button 
                    onClick={() => scrollPrograms(1)}
                    style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid #e2e8f0" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </>
              )}
              <div
                id="programs-slider"
                style={{
                  display: "flex",
                  gap: 28,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingBottom: 24,
                }}
              >
                <style>{`
                  #programs-slider::-webkit-scrollbar { display: none; }
                `}</style>
              {programsToDisplay.map((prog, i) => {
                const programId = prog._id || i;
                const isExpanded = expandedProgram === programId;
                const courses = Array.isArray(prog.courses) ? prog.courses : [];
                const displayCourses = isExpanded ? courses : courses.slice(0, 5);
                const hasMore = courses.length > 5;
                const imageUrl = prog.imageUrl ? (prog.imageUrl.startsWith('http') ? prog.imageUrl : `http://localhost:8080${prog.imageUrl}`) : prog.image;
                
                return (
                  <motion.div
                    key={programId}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    animate={programsVisible ? "visible" : "hidden"}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      boxShadow: "var(--card-shadow)",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "box-shadow 0.3s",
                      height: "100%",
                      flexShrink: 0,
                      width: 350,
                      scrollSnapAlign: "start",
                    }}
                    onHoverStart={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow-hover)"}
                    onHoverEnd={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow)"}
                  >
                    <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
                      <motion.img
                        src={imageUrl}
                        alt={prog.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                      }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 16px" }}>
                        <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 4, lineHeight: 1.2 }}>
                          {prog.title}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 1.4 }}>
                          {prog.description}
                        </p>
                      </div>
                      <motion.span
                        style={{
                          position: "absolute", top: 14, right: 14,
                          width: 10, height: 10, borderRadius: "50%",
                          background: "#fff",
                        }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </div>
                    <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, flex: 1 }}>
                        {displayCourses.map((course, ci) => (
                          <li key={ci} className="prog-list-item">
                            <span className="bullet">
                              <ChevronRight size={12} color="#d97706" strokeWidth={3} />
                            </span>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                      {hasMore && (
                        <button
                          onClick={() => toggleReadMore(programId)}
                          className="read-more-btn"
                          style={{
                            marginBottom: 16,
                            alignSelf: "flex-start",
                          }}
                        >
                          {isExpanded ? "Show Less ↑" : `Read More (+${courses.length - 5} more)`}
                          <ArrowRight size={12} style={{ transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                        </button>
                      )}
                      <LearnMoreButton onClick={() => console.log(`Learn more: ${prog.title}`)} />
                    </div>
                  </motion.div>
                );
              })}
              </div>
            </div>
            <motion.div
              variants={fadeUp} custom={3}
              initial="hidden"
              animate={programsVisible ? "visible" : "hidden"}
              style={{ textAlign: "center", marginTop: 32 }}
            >
              <ViewAllButton onClick={() => console.log("View All Programs")} />
              <p style={{ marginTop: 20, color: "#6b7280", fontSize: 16 }}>
                10,000+ successful alumni in the field of Nursing
              </p>
            </motion.div>
          </div>
        </section>
        <section style={{
          position: "relative",
          padding: "48px 0 64px",
          background: "linear-gradient(160deg, #eff6ff 0%, #eef2ff 100%)",
          overflow: "hidden",
        }}>
          <motion.div style={{
            position: "absolute", top: 40, right: 60,
            width: 320, height: 320, borderRadius: "50%",
            background: "#bfdbfe", opacity: 0.25, filter: "blur(60px)",
            pointerEvents: "none",
          }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div style={{
            position: "absolute", bottom: 40, left: 60,
            width: 400, height: 400, borderRadius: "50%",
            background: "#c7d2fe", opacity: 0.2, filter: "blur(72px)",
            pointerEvents: "none",
          }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: 32 }}
            >
              <div className="section-badge" style={{ background: "#fef2f2", color: "#dc2626" }}>
                <Heart size={14} />
                Student Voices
                <Heart size={14} />
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#111827", marginBottom: 12 }}>
                What Our Students Say
              </h2>
              <p style={{ fontSize: 17, color: "#4b5563", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Hear the inspiring experiences of learners who grew their careers with us.
              </p>
            </motion.div>
            <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
              {[
                { side: "left", fn: prevTestimonial, style: { left: -56 } },
                { side: "right", fn: nextTestimonial, style: { right: -56 } },
              ].map(({ side, fn, style }) => (
                <motion.button
                  key={side}
                  onClick={fn}
                  whileHover={{ scale: 1.1, backgroundColor: "#1e3a8a", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    width: 44, height: 44, borderRadius: "50%", border: "1px solid #e2e8f0",
                    background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", zIndex: 10, color: "#374151",
                    transition: "background 0.2s, color 0.2s",
                    ...style,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              ))}
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialsIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="testimonial-card"
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr" }}>
                    <div style={{ position: "relative", minHeight: 320, overflow: "hidden" }}>
                      <img
                        src={current.imageUrl ? (current.imageUrl.startsWith('http') ? current.imageUrl : `http://localhost:8080${current.imageUrl}`) : current.image}
                        alt={current.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                      }} />
                      <div style={{
                        position: "absolute", top: 18, left: 18,
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(6px)",
                        borderRadius: 9999,
                        padding: "6px 14px",
                        display: "flex", alignItems: "center", gap: 3,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                      }}>
                        {[...Array(current.rating)].map((_, si) => (
                          <Star key={si} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <Quote size={40} color="#3b82f6" style={{ marginBottom: 20, opacity: 0.8 }} />
                      <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, fontStyle: "italic", marginBottom: 28 }}>
                        "{current.content}"
                      </p>
                      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
                        <p style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 4 }}>
                          {current.name}
                        </p>
                        <p style={{ fontSize: 14, color: "#6b7280" }}>{current.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
                {testimonialsToDisplay.map((_, di) => (
                  <button
                    key={di}
                    onClick={() => setTestimonialsIndex(di)}
                    style={{
                      width: di === testimonialsIndex ? 28 : 10,
                      height: 10,
                      borderRadius: 9999,
                      border: "none",
                      background: di === testimonialsIndex ? "#1e3a8a" : "#cbd5e1",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section style={{
          position: "relative",
          padding: "64px 0",
          background: "#fff",
          overflow: "hidden",
        }}>
          <img
            src={backgroundImage4}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: 0.05, pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ textAlign: "center", color: "#6b7280", fontSize: 15, marginBottom: 36, letterSpacing: "0.02em" }}
            >
              Trusted by leading organizations and institutions worldwide
            </motion.p>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="logo-track"
                  animate={{ x: -logoOffset * LOGO_WIDTH }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                >
                  {duplicatedLogos.map((src, i) => (
                    <div key={i} className="logo-card">
                      <img src={src} alt={`Partner logo ${(i % LOGOS.length) + 1}`} />
                    </div>
                  ))}
                </motion.div>
              </div>
              {[
                { side: "left", fn: prevLogo, pos: { left: -24 } },
                { side: "right", fn: nextLogo, pos: { right: -24 } },
              ].map(({ side, fn, pos }) => (
                <button
                  key={side}
                  onClick={fn}
                  style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1px solid #e2e8f0", background: "#fff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#374151", zIndex: 5,
                    ...pos,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;