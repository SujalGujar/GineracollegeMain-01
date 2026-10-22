import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  ChevronRight
} from "lucide-react";
import backgroundImage4 from "../images/backgroundImage4_opt.jpg";
import axiosInstance, { getMediaUrl } from "../api/axiosInstance";
import { useSectionVisibility } from "../context/SectionVisibilityContext";
import SectionOffNotice from "./SectionOffNotice";

export function AnnouncementsPage({ onNavigate }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSectionVisible } = useSectionVisibility();

  useEffect(() => {
    let isMounted = true;
    const fetchAnnouncements = async () => {
      try {
        const res = await axiosInstance.get("/announcements");
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          setAnnouncements(res.data);
        }
      } catch (err) {
        console.warn("Could not load announcements from server, using default data.", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAnnouncements();
    return () => { isMounted = false; };
  }, []);

  // Section control check: allows admin to toggle this entire section on/off
  if (!isSectionVisible('admission_announcements') || !isSectionVisible('announcements_page')) {
    return <SectionOffNotice name="Admission Announcements" />;
  }

  // Default fallback announcement card if none created yet
  const defaultAnnouncement = {
    title: "Admission Announcements Will Be Available Soon",
    badge: "Will Be Updated Soon",
    description:
      "The official admission notices, circulars, and application schedules for Post Basic Diploma Course in Nursing at Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad) will be published here.",
    points: [
      "Official admission notifications and merit lists will be published here as soon as released.",
      "Post Basic Diploma Course in Nursing admissions are conducted for Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad)."
    ],
    files: []
  };

  const displayList = announcements.length > 0 ? announcements : [defaultAnnouncement];
  const isSingleCard = displayList.length === 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-amber-50/70 pt-10 pb-24 relative overflow-hidden font-sans">
      {/* Background Graphic Pattern */}
      <img
        src={backgroundImage4}
        alt="Background Pattern"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-15 pointer-events-none"
      />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isSingleCard ? "max-w-4xl" : "max-w-6xl"}`}>
        {/* Clean Header - redundant repetitive line removed */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-xs mb-3">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "5s" }} />
            Government College of Nursing, GINERA, Ahmedabad
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Admission Announcements
          </h1>

          <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Dynamic Responsive Announcement Cards Section */}
        {/* If 1 card: Centered prominent layout. If 2 or more: Modern responsive grid */}
        <div className={isSingleCard ? "max-w-4xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"}>
          {displayList.map((item, index) => {
            const filesList = Array.isArray(item.files) && item.files.length > 0
              ? item.files
              : (item.formUrl ? [{
                  fileUrl: item.formUrl,
                  fileName: item.formName || 'Application / Notice Form.pdf',
                  fileSize: item.formSize || 0,
                  fileType: (item.formName?.toLowerCase().endsWith('.xlsx') || item.formName?.toLowerCase().endsWith('.xls') || item.formName?.toLowerCase().endsWith('.csv')) ? 'excel' : 'pdf'
                }] : []);
            const hasFiles = filesList.length > 0;
            const pointsList = Array.isArray(item.points) && item.points.length > 0 
              ? item.points 
              : (defaultAnnouncement.points || []);

            const formattedDate = item.createdAt 
              ? new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
              : "Official Notice";

            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -4 }}
                className="group bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between relative"
              >
                {/* Top Decorative Amber Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status Badge & Publication Date */}
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-200 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        {item.badge || "Will Be Updated Soon"}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100/80 px-2.5 py-0.5 rounded-lg border border-gray-200">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formattedDate}</span>
                      </span>
                    </div>

                    {/* Announcement Title */}
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug mb-3 group-hover:text-amber-900 transition-colors">
                      {item.title}
                    </h2>

                    {/* Description Paragraph */}
                    {item.description && (
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
                        {item.description}
                      </p>
                    )}

                    {/* Bullet Points / Instructions List */}
                    {pointsList.length > 0 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2.5 mb-6">
                        {pointsList.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium">
                            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Attached Downloadable Documents Section (PDFs & Excel Sheets) */}
                  <div className="pt-4 border-t border-gray-100">
                    {hasFiles ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5 text-amber-600" />
                            <span>Download Attachments ({filesList.length})</span>
                          </p>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Verified Files
                          </span>
                        </div>

                        {/* Multiple PDFs and Sheets in One Row Grid with Generous Spacing */}
                        <div
                          className="w-full mt-2"
                          style={{
                            display: "grid",
                            gridTemplateColumns: filesList.length === 1
                              ? "minmax(0, 360px)"
                              : filesList.length === 2
                                ? "repeat(auto-fit, minmax(260px, 1fr))"
                                : "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "16px",
                            alignItems: "stretch"
                          }}
                        >
                          {filesList.map((doc, dIdx) => {
                            const isExcel = doc.fileType === "excel" || doc.fileName?.toLowerCase().endsWith(".xlsx") || doc.fileName?.toLowerCase().endsWith(".xls") || doc.fileName?.toLowerCase().endsWith(".csv");
                            const downloadUrl = getMediaUrl(doc.fileUrl);
                            const displayTitle = doc.displayName || doc.fileName || (isExcel ? "Spreadsheet Document" : "Official PDF Notice");

                            return (
                              <a
                                key={doc.fileUrl || dIdx}
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                title={displayTitle}
                                className="group relative flex items-center justify-between gap-3 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 cursor-pointer text-left min-w-0"
                                style={{
                                  padding: "14px 16px",
                                  borderRadius: "16px",
                                  background: isExcel
                                    ? "linear-gradient(135deg, #064E3B 0%, #065F46 55%, #047857 100%)"
                                    : "linear-gradient(135deg, #9A3412 0%, #C2410C 55%, #EA580C 100%)",
                                  border: isExcel ? "1.5px solid rgba(110, 231, 183, 0.4)" : "1.5px solid rgba(253, 230, 138, 0.4)",
                                  boxShadow: isExcel
                                    ? "0 6px 18px -4px rgba(6, 78, 59, 0.35)"
                                    : "0 6px 18px -4px rgba(194, 65, 12, 0.35)",
                                  color: "#FFFFFF"
                                }}
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                                    style={{ background: "rgba(0, 0, 0, 0.25)" }}
                                  >
                                    {isExcel ? <FileSpreadsheet className="w-5 h-5 text-emerald-100" /> : <FileText className="w-5 h-5 text-amber-100" />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1 leading-none">
                                      <span
                                        className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded leading-none shadow-xs"
                                        style={{ background: "rgba(255, 255, 255, 0.25)" }}
                                      >
                                        {isExcel ? "Excel Sheet" : "PDF Notice"}
                                      </span>
                                      {doc.fileSize > 0 && (
                                        <span className="text-[11px] text-white/85 font-semibold leading-none">
                                          {(doc.fileSize / 1024).toFixed(0)} KB
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold text-white truncate leading-snug group-hover:underline">
                                      {displayTitle}
                                    </p>
                                  </div>
                                </div>

                                <div
                                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110 shadow-xs"
                                  style={{ background: "rgba(255, 255, 255, 0.22)" }}
                                >
                                  <Download className="w-4 h-4 text-white" />
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-gray-500 py-1">
                        <span className="italic flex items-center gap-1.5 text-gray-400">
                          <FileText className="w-3.5 h-3.5" />
                          <span>No file download required for this notice</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Direct Notice
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtle Card Footer */}
                <div className="px-6 sm:px-8 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official Verified Circular</span>
                  </span>
                  <span className="font-semibold text-gray-700">GINERA Ahmedabad</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Local GINERA College Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 bg-white/90 backdrop-blur-sm rounded-3xl border border-orange-200 shadow-md p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Government College of Nursing, GINERA
              </h3>
              <p className="text-xs text-gray-500">
                Civil Hospital Campus, Asarwa, Ahmedabad - 380016, Gujarat
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-orange-100">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-gray-500 block">Campus Helpdesk Location</span>
                <span className="font-medium text-gray-800">
                  Government College of Nursing (GINERA), Civil Hospital Campus, Asarwa, Ahmedabad - 380016
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Hours: Mon – Sat (10:00 AM – 5:00 PM)
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;
