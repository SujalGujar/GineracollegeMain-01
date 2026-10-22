import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Download
} from "lucide-react";
import backgroundImage4 from "../images/backgroundImage4_opt.jpg";
import axiosInstance, { getMediaUrl } from "../api/axiosInstance";

export function AnnouncementsPage({ onNavigate }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Default content for Post Basic Diploma Course in Nursing
  const defaultAnnouncement = {
    title: "Admission Announcements Will Be Available Soon",
    badge: "Will Be Updated Soon",
    description:
      "The official admission notices, circulars, and application schedules for Post Basic Diploma Course in Nursing at Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad) will be published here.",
    points: [
      "Official admission notifications and merit lists will be published here as soon as released.",
      "Post Basic Diploma Course in Nursing admissions are conducted for Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad)."
    ],
    formUrl: "",
    formName: ""
  };

  const displayList = announcements.length > 0 ? announcements : [defaultAnnouncement];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-amber-50/70 pt-12 pb-24 relative overflow-hidden">
      {/* Background graphic */}
      <img
        src={backgroundImage4}
        alt="Background Pattern"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-15 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-xs mb-4">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "5s" }} />
            Government College of Nursing, GINERA, Ahmedabad
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Admission Announcements
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Official announcements, notices, and admission circulars for Government College of Nursing, GINERA.
          </p>

          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-5 max-w-xs" />
        </motion.div>

        {/* Announcement Cards */}
        <div className="space-y-8">
          {displayList.map((item, index) => {
            const hasForm = Boolean(item.formUrl);
            const downloadUrl = hasForm ? getMediaUrl(item.formUrl) : null;
            const pointsList = Array.isArray(item.points) && item.points.length > 0 
              ? item.points 
              : defaultAnnouncement.points;

            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 * (index + 1) }}
                className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200 shadow-xl overflow-hidden p-8 sm:p-12 text-center relative"
              >
                {/* Subtle Top Decorative Bar */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

                {/* Animated Bell Icon */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-orange-300 flex items-center justify-center shadow-inner mb-6">
                  <Bell className="w-10 h-10 text-orange-600 animate-bounce" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-300 mb-4">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  {item.badge || "Will Be Updated Soon"}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                  {item.title}
                </h2>

                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Points */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 max-w-xl mx-auto text-left space-y-2 mb-8">
                  {pointsList.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-sm text-amber-900 font-medium">
                      {pIdx === 0 ? (
                        <CalendarCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Action Area: Shows prominent Download Form and View buttons when file is uploaded */}
                {hasForm && (
                  <div className="flex flex-col items-center justify-center gap-3 pt-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Official Admission Form Available for Download</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-sm tracking-wide shadow-xl transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #B45309 0%, #D97706 45%, #EA580C 100%)",
                          color: "#FFFFFF",
                          border: "2px solid #FDE68A",
                          boxShadow: "0 12px 26px -4px rgba(180, 83, 9, 0.45), 0 4px 6px -2px rgba(180, 83, 9, 0.25)"
                        }}
                      >
                        <Download className="w-5 h-5 text-white" />
                        <span>Download Form (PDF)</span>
                        {item.formSize > 0 && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-md font-bold"
                            style={{ background: "rgba(0, 0, 0, 0.25)", color: "#FEF3C7" }}
                          >
                            {(item.formSize / 1024).toFixed(0)} KB
                          </span>
                        )}
                      </a>
                    </div>

                    {item.formName && (
                      <p className="text-xs text-gray-500 font-medium">
                        Attached Document: <span className="font-semibold text-gray-800">{item.formName}</span>
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Local GINERA College Details Card */}
        {/* Note: Redundant email removed as principalgcona@gmail.com is already featured in the footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-orange-200 shadow-md p-6 sm:p-8"
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

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-orange-100">
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Admission Helpline</span>
                <span className="font-semibold text-gray-900">+91 79 2268 0074 / 0075</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-orange-100">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
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
