import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Bell,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  CalendarCheck
} from "lucide-react";
import backgroundImage4 from "../images/backgroundImage4_opt.jpg";

export function AnnouncementsPage({ onNavigate }) {
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

        {/* Main "Get As Soon As Possible" Announcement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
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
            Will Be Updated Soon
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            Admission Announcements Will Be Available Soon
          </h2>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
            The official admission notices, circulars, and schedules for Government College of Nursing, GINERA will be published here as soon as they are released by the Admission Committee for Professional Medical Educational Courses (ACPUGMEC / Government of Gujarat).
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 max-w-xl mx-auto text-left space-y-2 mb-8">
            <div className="flex items-start gap-2.5 text-sm text-amber-900 font-medium">
              <CalendarCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>Official admission notifications and merit lists will be published here as soon as released.</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-amber-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>Centralized online admissions are governed by ACPUGMEC Gujarat via medadmgujarat.org.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.medadmgujarat.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Visit ACPUGMEC Official Portal <ExternalLink className="w-4 h-4" />
            </a>

            <Button
              variant="outline"
              onClick={() => onNavigate && onNavigate("home")}
              className="px-6 py-3 rounded-xl border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold text-sm cursor-pointer"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>

        {/* Local GINERA College Details Card */}
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

            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-orange-100">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Official Inquiry Email</span>
                <span className="font-semibold text-gray-900">admission@ginera.org</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-orange-100 sm:col-span-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-gray-500 block">Campus Helpdesk Location</span>
                <span className="font-medium text-gray-800">
                  Government College of Nursing (GINERA), Civil Hospital Campus, Asarwa, Ahmedabad - 380016, Gujarat, India.
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Working Hours: Monday to Saturday (10:00 AM – 5:00 PM)
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
