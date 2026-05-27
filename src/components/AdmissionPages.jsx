import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  CheckCircle,
  Award, // Add this import
  Download,
  Info,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import backgroundImage4 from "../images/backgroundImage(4).png";
import ViewAllProgramsButton from "../components/Buttons/ViewAllProgramsButton";
// import DownloadProspectusButton from "./DownloadProspectusButton";
import AnimatedLearnMoreButton from "./Buttons/AnimatedLearnMoreButton";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import axiosInstance from "../api/axiosInstance";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Sub-component for Feature cards to avoid Hook violations in loops
const FeatureCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const shortDescription = item.description.length > 100
    ? `${item.description.substring(0, 100)}...`
    : item.description;
  const isTruncated = item.description.length > 100;

  return (
    <motion.div
      key={index}
      className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200"
      whileHover={{ translateY: -6, scale: 1.01 }}
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}>
        {item.icon}
      </div>

      <h4 className="font-bold text-xl mb-3" style={{ color: "#78350f" }}>
        {item.title}
      </h4>

      {/* description area */}
      <div className="text-gray-700 leading-relaxed text-left">
        <p className="mb-3">
          {expanded ? item.description : shortDescription}
        </p>

        {isTruncated && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            aria-expanded={expanded}
            className="text-sm font-semibold text-orange-700 hover:text-orange-900 transition-colors focus:outline-none"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export function CoursesOffered() {
  const [expandedIds, setExpandedIds] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/courses");
        const grouped = response.data.reduce((acc, course) => {
          const cat = acc.find(c => c.type === course.category);
          if (cat) {
            cat.programs.push(course);
          } else {
            acc.push({ type: course.category, programs: [course] });
          }
          return acc;
        }, []);
        setCourses(grouped);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  //   admission: "Through University Entrance Exam",
  // },



  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };


  const getSeatColor = (seats) => {
    if (seats <= 4) return "bg-red-500 text-white";
    if (seats <= 8) return "bg-orange-500 text-white";
    if (seats <= 20) return "bg-yellow-500 text-white";
    return "bg-green-500 text-white";
  };

  const toggleDescription = (programId) => {
    setExpandedIds(prev =>
      prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image */}
      <img
        src={backgroundImage4}
        alt="Courses Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={titleVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Courses Offered
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Comprehensive Nursing education programs designed to shape the next
            generation of healthcare professionals with world-class training and
            clinical exposure.
          </p>
        </motion.div>

        {courses.map((courseType, index) => (
          <motion.div key={index} className="mb-20" variants={fadeInUp}>
            {/* Section Header Animation */}
            <motion.div
              className="flex items-center justify-between px-6 py-3 rounded-2xl mb-8 bg-white/70 backdrop-blur-sm border border-orange-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* 🔹 Left side: Cap + Undergraduate Programs */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: "#f59e0b" }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {courseType.icon}
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold"
                  style={{ color: "#78350f" }}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {courseType.type}
                </motion.h2>
              </div>

              {/* 🔹 Right side: Cap + Diploma Programs */}
              {courseType.type === "Undergraduate Programs" && (
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: "#f59e0b" }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {courseType.icon}
                  </motion.div>

                  <motion.h2
                    className="text-3xl font-bold"
                    style={{ color: "#78350f" }}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {courseType.type2}
                  </motion.h2>
                </div>
              )}
            </motion.div>

            {/* Cards Section */}
            <motion.div
              className="grid gap-8 lg:grid-cols-2 xl:grid-cols-2"
              variants={staggerContainer}
            >
              {courseType.programs.map((program, programIndex) => (
                <motion.div
                  key={program.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Card */}
                  <Card className="h-full border-0 shadow-xl rounded-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border border-orange-200">
                    {/* 🔹 Header */}
                    <CardHeader
                      style={{ backgroundColor: "#fef3c7" }}
                      className="pb-4 rounded-t-2xl"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl"
                          style={{ color: "#b45309" }}
                          initial={{ rotateY: 90 }}
                          whileInView={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          {program.icon}
                        </motion.div>

                        <Badge
                          className={
                            getSeatColor(program.seats) +
                            " font-semibold px-3 py-1 bg-white/90 text-gray-800 border border-orange-300"
                          }
                        >
                          {program.seats} Seats
                        </Badge>
                      </div>

                      {/* Program Title */}
                      <motion.h3
                        className="text-lg font-bold leading-tight"
                        style={{ color: "#78350f" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {program.name}
                      </motion.h3>

                      {/* Description with Read More / Read Less */}
                      <motion.p
                        className="text-sm mt-2 text-gray-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {program.description ? (
                          <>
                            {/* Show truncated or full description based on expanded state */}
                            {expandedIds.includes(`${courseType.type}-${programIndex}`)
                              ? program.description
                              : program.description.slice(0, 80) +
                              (program.description.length > 80 ? "..." : "")}

                            {/* Show toggle only if longer than 80 */}
                            {program.description.length > 80 && (
                              <button
                                onClick={() => {
                                  setExpandedIds((prev) =>
                                    prev.includes(`${courseType.type}-${programIndex}`)
                                      ? prev.filter(
                                        (id) => id !== `${courseType.type}-${programIndex}`
                                      )
                                      : [...prev, `${courseType.type}-${programIndex}`]
                                  );
                                }}
                                className="text-blue-600 text-sm font-medium hover:underline ml-1"
                              >
                                {expandedIds.includes(`${courseType.type}-${programIndex}`)
                                  ? "Read less"
                                  : "Read more"}
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="italic text-gray-500">No description available.</span>
                        )}
                      </motion.p>

                    </CardHeader>

                    {/* 🔹 Content */}
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-3">
                        {/* ✅ Duration, Eligibility, Fees */}
                        {[
                          {
                            icon: <Calendar className="w-4 h-4" style={{ color: "#b45309" }} />,
                            label: "Duration",
                            value: program.duration,
                          },
                          {
                            icon: <GraduationCap className="w-4 h-4" style={{ color: "#b45309" }} />,
                            label: "Eligibility",
                            value: program.eligibility,
                          },
                          {
                            icon: <Users className="w-4 h-4" style={{ color: "#b45309" }} />,
                            label: "Annual Fees",
                            value: program.fees,
                          },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {item.icon}
                            <div>
                              <p className="text-xs text-gray-600">{item.label}</p>
                              <p className="text-sm font-medium text-gray-800">{item.value}</p>
                            </div>
                          </motion.div>
                        ))}

                        {/* ✅ Admission with Read More / Less */}
                        <motion.div
                          className="flex flex-col gap-1"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" style={{ color: "#b45309" }} />
                            <p className="text-xs text-gray-600">Admission</p>
                          </div>

                          <p className="text-sm font-medium text-gray-800 ml-7">
                            {expandedIds.includes(`adm-${program.title}`)
                              ? program.admission
                              : program.admission && program.admission.length > 100
                                ? `${program.admission.slice(0, 100)}...`
                                : program.admission}
                          </p>

                          {program.admission && program.admission.length > 100 && (
                            <button
                              onClick={() => toggleExpand(`adm-${program.title}`)}
                              className="ml-7 text-orange-600 font-semibold hover:underline text-xs"
                            >
                              {expandedIds.includes(`adm-${program.title}`)
                                ? "Read less"
                                : "Read more"}
                            </button>
                          )}
                        </motion.div>
                      </div>

                      {/* 🔹 Highlights */}
                      <motion.div
                        className="pt-4 border-t border-orange-200"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <h4 className="font-semibold text-sm mb-3 text-gray-800 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" style={{ color: "#b45309" }} />
                          Course Highlights
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-orange-100 text-amber-900 px-3 py-1 rounded-full border border-orange-200 font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* 🔹 Website Link */}
                      {program.websiteLink && (
                        <motion.div
                          className="pt-4 border-t border-orange-200"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <a
                            href={program.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 hover:underline transition-colors"
                          >
                            🌐 Visit Official Website
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </motion.div>
                      )}
                    </CardContent>

                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}

        <motion.div variants={fadeInUp} className="mt-16">
          <Alert className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-black">
            <Info className="h-5 w-5 text-black" />
            <AlertDescription className="text-black">
              <strong>Admission Information:</strong>
              <a href="https://www.medadmgujarat.org/ga/home.aspx" target="_blank">https://www.medadmgujarat.org/ga/home.aspx</a>
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {[
            {
              icon: <Stethoscope className="w-8 h-8" />,
              title: "Expert Faculty",
              description: "Learn from experienced nursing professionals and researchers with decades of clinical experience and academic expertise in their respective fields.",
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Clinical Exposure",
              description: "Hands-on training in affiliated hospitals and healthcare centers with state-of-the-art facilities and diverse patient populations.",
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Research Opportunities",
              description: "Access to modern laboratories and research facilities with funding opportunities and mentorship for innovative healthcare research projects.",
              color: "from-amber-500 to-orange-500",
            },
          ].map((item, index) => (
            <FeatureCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
// example variants

export function AdmissionProcedure() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Calendar": return <Calendar className="w-6 h-6" />;
      case "Users": return <Users className="w-6 h-6" />;
      case "CheckCircle": return <CheckCircle className="w-6 h-6" />;
      case "GraduationCap": return <GraduationCap className="w-6 h-6" />;
      case "FileText": return <FileText className="w-6 h-6" />;
      case "Download": return <Download className="w-6 h-6" />;
      case "Info": return <Info className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axiosInstance.get("/admission-steps");
        setSteps(response.data);
      } catch (err) {
        console.error("Error fetching admission steps:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const [expandedProcedureSteps, setExpandedProcedureSteps] = useState([]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }



  const toggleProcedureStep = (stepId) => {
    setExpandedProcedureSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };


  const requiredDocs = [

    "Class 10th & 12th Marksheet and Certificates",
    "Transfer Certificate",
    "Birthdate Proof(Birth Certificate or 10th Certificate)"
  ];
  const additionalDocs = [
    "Caste Certificate (if applicable)",

    "Medical Fitness Certificate",
    "Passport Size Photographs",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      {/* Background Image */}
      <img
        src={backgroundImage4}
        alt="Admission Procedure Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Admission Procedure
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Step-by-step guide to secure your seat in our prestigious medical
            programs
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Steps Cards */}
          <Card className="mb-12 border-0 shadow-xl bg-white/90 backdrop-blur-sm border border-orange-200">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <GraduationCap className="w-10 h-10" />
              </div>
              <CardTitle
                className="text-3xl font-bold"
                style={{ color: "#78350f" }}
              >
                Step-by-Step Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="text-center p-6 rounded-2xl shadow-lg border border-orange-200 bg-white/90 backdrop-blur-sm group"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-amber-700 mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                      {step.icon}
                    </div>
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: "#78350f" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      {step.readMoreRequired ? (
                        <>
                          {expandedProcedureSteps.includes(step.step)
                            ? step.description
                            : step.description.slice(0, 100) +
                            (step.description.length > 100 ? "..." : "")}
                          {step.description.length > 100 && (
                            <button
                              onClick={() => toggleProcedureStep(step.step)}
                              className="text-orange-600 font-semibold hover:underline text-xs ml-1 focus:outline-none"
                            >
                              {expandedProcedureSteps.includes(step.step)
                                ? "Read less"
                                : "Read more"}
                            </button>
                          )}
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                    {step.details && (
                      <p className="text-gray-600 text-xs bg-orange-50 rounded-lg p-2 border border-orange-100 break-words">
                        {step.details}
                      </p>
                    )}
                    {step.detailsUrl && (
                      <a
                        href={step.detailsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                      >
                        Visit Link
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Required Documents",
                docs: requiredDocs,
                iconColor: "text-amber-600",
                gradient: "from-amber-500 to-orange-500",
                borderColor: "border-amber-200",
                bgColor: "bg-amber-50",
              },
              {
                title: "Additional Documents",
                docs: additionalDocs,
                iconColor: "text-orange-600",
                gradient: "from-orange-500 to-amber-500",
                borderColor: "border-orange-200",
                bgColor: "bg-orange-50",
              },
            ].map((docSection, idx) => (
              <motion.div key={idx} variants={cardVariants} whileHover="hover">
                <Card
                  className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full group/card border ${docSection.borderColor}`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle
                      className="flex items-center gap-3 text-2xl"
                      style={{ color: "#78350f" }}
                    >
                      <motion.div
                        animate={{
                          rotate: idx % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: idx * 0.5,
                        }}
                      >
                        <FileText
                          className={`w-8 h-8 ${docSection.iconColor}`}
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.2 }}
                      >
                        {docSection.title}
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="grid gap-3"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3 + idx * 0.2,
                          },
                        },
                      }}
                    >
                      {docSection.docs.map((doc, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg border border-orange-200 cursor-pointer bg-white group-hover/item:bg-orange-50 transition-colors"
                          whileHover={{
                            x: idx === 0 ? 10 : -10,
                            scale: 1.02,
                            backgroundColor: "#fef3c7",
                            borderColor: "#f59e0b",
                            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <motion.div
                            initial={{
                              scale: 0,
                              rotate: idx === 0 ? -180 : 180,
                            }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              delay: 0.5 + index * 0.1,
                            }}
                            whileHover={{
                              scale: 1.2,
                              rotate: idx === 0 ? 360 : -360,
                              transition: { duration: 0.3 },
                            }}
                          >
                            <CheckCircle
                              className={`w-5 h-5 flex-shrink-0 text-amber-600`}
                            />
                          </motion.div>
                          <motion.span className="font-medium flex-1 text-gray-800">
                            {doc}
                          </motion.span>
                          <motion.div
                            className="w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover/item:opacity-100"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>

                  <motion.div
                    className={`h-1 rounded-b-lg bg-gradient-to-r ${docSection.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8 + idx * 0.2, duration: 0.6 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}


        </motion.div>
      </div>
    </div>
  );
}

// export function AdmissionRules() {
//   // Animation variants (same as before)
//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       scale: 0.95,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         duration: 0.8,
//       },
//     },
//     hover: {
//       y: -5,
//       scale: 1.02,
//       boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       x: -20,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//     hover: {
//       x: 5,
//       backgroundColor: "rgba(245, 158, 11, 0.05)",
//       transition: { duration: 0.3 },
//     },
//   };

//   const iconVariants = {
//     hidden: {
//       scale: 0,
//       rotate: -180,
//     },
//     visible: {
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         duration: 0.8,
//       },
//     },
//     hover: {
//       scale: 1.2,
//       rotate: 360,
//       transition: { duration: 0.4 },
//     },
//   };

//   const listItemVariants = {
//     hidden: {
//       opacity: 0,
//       x: -30,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//     hover: {
//       x: 10,
//       scale: 1.02,
//       transition: { duration: 0.2 },
//     },
//   };

//   const badgeVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         delay: 0.3,
//       },
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.2 },
//     },
//   };

//   const pulseAnimation = {
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       repeatType: "reverse",
//     },
//   };

//   // Program data organized by type
//   const programData = {
//     postgraduate: {
//       title: "Postgraduate Programs",
//       icon: Users,
//       eligibility: "B.Sc. Nursing + University Entrance Exam",
//       academicQualification: [
//         "Bachelor's degree in relevant field (B.Sc. Nursing/BPT/B.Pharm)",
//         "Minimum 55% aggregate marks in qualifying examination",
//         "Valid score in university entrance exam/PG-NEET",
//         "Registration with respective state/national council",
//         "Minimum one year of work experience (for some specialties)"
//       ],
//       ageCriteria: [
//         "No upper age limit for most postgraduate programs",
//         "Minimum age: 21 years",
//         "For nursing programs: 21-35 years (relaxable for reserved categories)",
//         "Age as on December 31st of admission year"
//       ]
//     },
//     undergraduate: {
//       title: "Undergraduate Programs",
//       icon: GraduationCap,
//       eligibility: "12th with Physics, Chemistry, Biology",
//       academicQualification: [
//         "10+2 with Physics, Chemistry, Biology/Biotechnology and English",
//         "Minimum 50% marks (40% for SC/ST/OBC candidates)",
//         "Qualified NEET-UG examination",
//         "English as compulsory subject in 10+2",
//         "PCB subjects from recognized board"
//       ],
//       ageCriteria: [
//         "Minimum 17 years as on December 31st of admission year",
//         "Maximum 25 years (30 years for SC/ST/OBC)",
//         "Age proof certificate mandatory",
//         "No age relaxation for management/NRI quota"
//       ]
//     },
//     diploma: {
//       title: "Diploma Programs",
//       icon: BookOpen,
//       eligibility: "12th Pass With English",
//       academicQualification: [
//         "10+2 passed from recognized board",
//         "English as compulsory subject",
//         "Minimum 45% aggregate marks",
//         "Science background preferred but not mandatory",
//         "No entrance exam required for most diploma programs"
//       ],
//       ageCriteria: [
//         "Minimum 17 years as on admission date",
//         "Maximum 30 years (35 years for SC/ST/OBC)",
//         "No age limit for working professionals",
//         "Age relaxation as per government norms"
//       ]
//     },
//     specialization: {
//       title: "Specialisation Diploma Programs",
//       icon: Award,
//       eligibility: "B.Sc. Nursing + University Entrance Exam",
//       academicQualification: [
//         "B.Sc. Nursing from recognized university",
//         "Minimum 55% aggregate marks",
//         "Valid registration with State Nursing Council",
//         "Qualified university entrance examination",
//         "Minimum one year of clinical experience"
//       ],
//       ageCriteria: [
//         "No upper age limit",
//         "Minimum age: 21 years",
//         "Working professionals can apply anytime",
//         "Age relaxation for in-service candidates"
//       ]
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
//       {/* Background Image */}
//       <img
//         src={backgroundImage4}
//         alt="Admission Rules Background"
//         className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
//       />

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Enhanced Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, type: "spring" }}
//           className="text-center mb-16"
//         >
//           <motion.h1
//             className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent"
//             animate={pulseAnimation}
//           >
//             Admission Rules & Eligibility
//           </motion.h1>

//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: 200 }}
//             transition={{ delay: 0.8, duration: 1 }}
//             className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6"
//           />

//           <motion.p
//             className="text-xl text-gray-700 max-w-3xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             Comprehensive guidelines and criteria for admission to our medical programs
//           </motion.p>
//         </motion.div>

//         {/* Cards Container */}
//         <motion.div
//           style={{ marginTop: "10px" }}
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           className="max-w-6xl mx-auto space-y-8"
//         >
//           {/* Render program cards dynamically */}
//           {Object.entries(programData).map(([key, program], index) => (
//             <motion.div key={key} variants={cardVariants} whileHover="hover">
//               <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group border border-orange-200">
//                 {/* Animated Header */}
//                 <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50 relative overflow-hidden">
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
//                     animate={{
//                       x: index % 2 === 0 ? [-100, 100] : [100, -100],
//                       opacity: [0, 0.3, 0],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       repeatType: "reverse",
//                     }}
//                   />
//                   <CardTitle
//                     className="flex items-center gap-3 text-2xl relative z-10"
//                     style={{ color: "#78350f" }}
//                   >
//                     <motion.div variants={iconVariants} whileHover="hover">
//                       <program.icon className="w-8 h-8 text-amber-600" />
//                     </motion.div>
//                     <motion.span
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       {program.title}
//                     </motion.span>
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="space-y-6 pt-6">
//                   {/* Eligibility Badge */}
//                   <motion.div
//                     variants={badgeVariants}
//                     className="inline-block"
//                   >
//                     <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-4 py-2 text-base">
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       Eligibility: {program.eligibility}
//                     </Badge>
//                   </motion.div>

//                   <div className="grid md:grid-cols-2 gap-8">
//                     {/* Left Column - Academic Qualification */}
//                     <motion.div
//                       className="space-y-6"
//                       variants={{
//                         hidden: { opacity: 0 },
//                         visible: {
//                           opacity: 1,
//                           transition: {
//                             staggerChildren: 0.1,
//                             delayChildren: 0.4,
//                           },
//                         },
//                       }}
//                     >
//                       <motion.div
//                         variants={itemVariants}
//                         whileHover="hover"
//                         className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
//                       >
//                         <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
//                           <motion.div
//                             whileHover={{ rotate: 360 }}
//                             transition={{ duration: 0.5 }}
//                           >
//                             <BookOpen className="w-5 h-5 text-amber-600" />
//                           </motion.div>
//                           Academic Qualification
//                         </h4>
//                         <motion.ul
//                           className="text-gray-700 space-y-2 ml-7"
//                           variants={{
//                             hidden: { opacity: 0 },
//                             visible: {
//                               opacity: 1,
//                               transition: {
//                                 staggerChildren: 0.05,
//                                 delayChildren: 0.6,
//                               },
//                             },
//                           }}
//                         >
//                           {program.academicQualification.map((item, itemIndex) => (
//                             <motion.li
//                               key={itemIndex}
//                               variants={listItemVariants}
//                               whileHover="hover"
//                               className="flex items-start gap-2 group/list-item cursor-pointer"
//                             >
//                               <motion.span
//                                 className="text-amber-600 mt-1 flex-shrink-0"
//                                 animate={{ scale: [1, 1.2, 1] }}
//                                 transition={{
//                                   duration: 2,
//                                   repeat: Infinity,
//                                   delay: itemIndex * 0.5,
//                                 }}
//                               >
//                                 •
//                               </motion.span>
//                               <span className="group-hover/list-item:text-amber-900 transition-colors duration-300">
//                                 {item}
//                               </span>
//                             </motion.li>
//                           ))}
//                         </motion.ul>
//                       </motion.div>
//                     </motion.div>

//                     {/* Right Column - Age Criteria */}
//                     <motion.div
//                       className="space-y-6"
//                       variants={{
//                         hidden: { opacity: 0 },
//                         visible: {
//                           opacity: 1,
//                           transition: {
//                             staggerChildren: 0.1,
//                             delayChildren: 0.5,
//                           },
//                         },
//                       }}
//                     >
//                       <motion.div
//                         variants={itemVariants}
//                         whileHover="hover"
//                         className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
//                       >
//                         <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
//                           <motion.div
//                             whileHover={{ rotate: 360 }}
//                             transition={{ duration: 0.5 }}
//                           >
//                             <Calendar className="w-5 h-5 text-orange-600" />
//                           </motion.div>
//                           Age Criteria
//                         </h4>
//                         <motion.ul
//                           className="text-gray-700 space-y-2 ml-7"
//                           variants={{
//                             hidden: { opacity: 0 },
//                             visible: {
//                               opacity: 1,
//                               transition: {
//                                 staggerChildren: 0.05,
//                                 delayChildren: 0.7,
//                               },
//                             },
//                           }}
//                         >
//                           {program.ageCriteria.map((item, itemIndex) => (
//                             <motion.li
//                               key={itemIndex}
//                               variants={listItemVariants}
//                               whileHover="hover"
//                               className="flex items-start gap-2 group/list-item cursor-pointer"
//                             >
//                               <motion.span
//                                 className="text-orange-600 mt-1 flex-shrink-0"
//                                 animate={{ scale: [1, 1.2, 1] }}
//                                 transition={{
//                                   duration: 2,
//                                   repeat: Infinity,
//                                   delay: 0.5 + itemIndex * 0.5,
//                                 }}
//                               >
//                                 •
//                               </motion.span>
//                               <span className="group-hover/list-item:text-amber-900 transition-colors duration-300">
//                                 {item}
//                               </span>
//                             </motion.li>
//                           ))}
//                         </motion.ul>
//                       </motion.div>
//                     </motion.div>
//                   </div>
//                 </CardContent>

//                 {/* Animated Footer */}
//                 <motion.div
//                   className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ delay: 1, duration: 0.8 }}
//                 />
//               </Card>
//             </motion.div>
//           ))}

//           {/* Important Rules Card */}
//           <motion.div variants={cardVariants} whileHover="hover">
//             <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group border border-orange-200">
//               <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-red-50 relative overflow-hidden">
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"
//                   animate={{
//                     x: [-100, 100],
//                     opacity: [0, 0.3, 0],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                   }}
//                 />
//                 <CardTitle
//                   className="flex items-center gap-3 text-2xl relative z-10"
//                   style={{ color: "#78350f" }}
//                 >
//                   <motion.div variants={iconVariants} whileHover="hover">
//                     <Info className="w-8 h-8 text-orange-600" />
//                   </motion.div>
//                   <motion.span
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     Important Rules
//                   </motion.span>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-6 pt-6">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <Alert className="bg-orange-50 border-orange-300 hover:bg-orange-100 transition-colors duration-300 cursor-pointer">
//                     <motion.div
//                       animate={{ rotate: [0, 10, -10, 0] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <Info className="w-5 h-5 text-orange-600" />
//                     </motion.div>
//                     <AlertDescription className="text-orange-800">
//                       <strong>Important:</strong> All admissions are subject to verification of original documents. Any discrepancy found during document verification will lead to cancellation of admission.
//                     </AlertDescription>
//                   </Alert>
//                 </motion.div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                   {[
//                     [
//                       "Admission purely merit-based through centralized counseling",
//                       "No direct admission or management quota available",
//                       "Seat allotment final and non-transferable",
//                       "Anti-ragging undertaking mandatory for all students",
//                     ],
//                     [
//                       "Regular attendance (75% minimum) compulsory",
//                       "Migration requires NOC from respective university",
//                       "Professional conduct expected at all times",
//                       "Strict anti-ragging policy enforced across campus",
//                     ],
//                   ].map((column, colIndex) => (
//                     <motion.div
//                       key={colIndex}
//                       className="space-y-3"
//                       variants={{
//                         hidden: { opacity: 0 },
//                         visible: {
//                           opacity: 1,
//                           transition: {
//                             staggerChildren: 0.1,
//                             delayChildren: 0.5 + colIndex * 0.1,
//                           },
//                         },
//                       }}
//                     >
//                       {column.map((rule, index) => (
//                         <motion.div
//                           key={index}
//                           className="flex items-center gap-3 p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-all duration-300 group/rule cursor-pointer"
//                           variants={listItemVariants}
//                           whileHover="hover"
//                         >
//                           <motion.div
//                             whileHover={{ scale: 1.3, x: 5 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <ArrowRight className="w-4 h-4 text-amber-600" />
//                           </motion.div>
//                           <motion.span
//                             className="text-gray-700 flex-1"
//                             whileHover={{ color: "#ea580c", fontWeight: "500" }}
//                           >
//                             {rule}
//                           </motion.span>

//                           {/* Animated dot */}
//                           <motion.div
//                             className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover/rule:opacity-100"
//                             animate={{
//                               scale: [1, 1.5, 1],
//                               opacity: [0.5, 1, 0.5],
//                             }}
//                             transition={{
//                               duration: 1.5,
//                               repeat: Infinity,
//                               delay: index * 0.2,
//                             }}
//                           />
//                         </motion.div>
//                       ))}
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>

//               <motion.div
//                 className="h-1 bg-gradient-to-r from-orange-500 to-red-500"
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ delay: 1.4, duration: 0.8 }}
//               />
//             </Card>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
export function AdmissionRules() {
  const [isCommitteeTextExpanded, setIsCommitteeTextExpanded] = useState(false);
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      backgroundColor: "rgba(245, 158, 11, 0.05)",
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.4 },
    },
  };

  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      x: 10,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      {/* Background Image */}
      <img
        src={backgroundImage4}
        alt="Admission Rules Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent"
            animate={pulseAnimation}
          >
            Admission Rules & Eligibility
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6"
          />

          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Comprehensive guidelines and criteria for admission to our medical
            programs
          </motion.p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          style={{ marginTop: "10px" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* MBBS Eligibility Card */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group border border-orange-200">
              {/* Animated Header */}
              <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
                  animate={{
                    x: [-100, 100],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <CardTitle
                  className="flex items-center gap-3 text-2xl relative z-10"
                  style={{ color: "#78350f" }}
                >
                  <motion.div variants={iconVariants} whileHover="hover">
                    <GraduationCap className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    UnderGraduated Programs
                  </motion.span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <motion.div
                    className="space-y-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.4,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-5 h-5 text-amber-600" />
                        </motion.div>
                        Academic Qualification
                      </h4>
                      <motion.ul
                        className="text-gray-700 space-y-2 ml-7"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.6,
                            },
                          },
                        }}
                      >
                        {["10+2 with Physics, Chemistry, Biology/Biotechnology and English",
                          "Minimum 45% marks (40% for SC/ST/OBC candidates)",

                          "English as compulsory subject in 10+2",
                          "PCB subjects from recognized board",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            variants={listItemVariants}
                            whileHover="hover"
                            className="flex items-start gap-2 group/list-item cursor-pointer"
                          >
                            <motion.span
                              className="text-amber-600 mt-1 flex-shrink-0"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                            >
                              •
                            </motion.span>
                            <span className="group-hover/list-item:text-amber-900 transition-colors duration-300">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>

                    </motion.div>
                    <motion.div className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item">
                      <motion.p className="text-sm text-gray-700">
                        {isCommitteeTextExpanded
                          ? "Admission Committee for Physiotherapy, BSC Nursing, Prosthetics and Orthotics, Occupational Therapy, Optometry, Naturopathy, Audiology and Speech Therapy, GNM And ANM Admission Government of Gujarat, Gandhinagar"
                          : "Admission Committee for Physiotherapy, BSC Nursing, Prosthetics and Orthotics..."}
                        <button
                          onClick={() => setIsCommitteeTextExpanded(!isCommitteeTextExpanded)}
                          className="text-orange-600 font-semibold hover:underline text-xs ml-1 focus:outline-none"
                        >
                          {isCommitteeTextExpanded ? "Read less" : "Read more"}
                        </button>
                      </motion.p>
                      <a
                        href="https://www.medadmgujarat.org/ga/home.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                      >
                        Visit Us
                      </a>
                    </motion.div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div
                    className="space-y-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.5,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Calendar className="w-5 h-5 text-orange-600" />
                        </motion.div>
                        Age Criteria
                      </h4>
                      <motion.ul
                        className="text-gray-700 space-y-2 ml-7"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.7,
                            },
                          },
                        }}
                      >
                        {[
                          "Minimum 17 years as on December 31st of admission year",

                          "Age proof certificate mandatory",
                          "No age relaxation for management/NRI quota"
                        ]
                          .map((item, index) => (
                            <motion.li
                              key={index}
                              variants={listItemVariants}
                              whileHover="hover"
                              className="flex items-start gap-2 group/list-item cursor-pointer"
                            >
                              <motion.span
                                className="text-orange-600 mt-1 flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: 0.5 + index * 0.5,
                                }}
                              >
                                •
                              </motion.span>
                              <span className="group-hover/list-item:text-amber-900 transition-colors duration-300">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Stethoscope className="w-5 h-5 text-red-500" />
                        </motion.div>
                        Medical Fitness
                      </h4>
                      <motion.p
                        className="text-gray-700 ml-7"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ x: 5, color: "#78350f" }}
                      >
                        Candidates must be medically fit as per MCI standards
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>

              {/* Animated Footer */}
              <motion.div
                className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </Card>
          </motion.div>

          {/* Postgraduate Eligibility Card */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group border border-amber-200">
              <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-yellow-50 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"
                  animate={{
                    x: [100, -100],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <CardTitle
                  className="flex items-center gap-3 text-2xl relative z-10"
                  style={{ color: "#78350f" }}
                >
                  <motion.div variants={iconVariants} whileHover="hover">
                    <Users className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Diploma In General Nursing Midwifery
                  </motion.span>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.4,
                        },
                      },
                    }}
                  >
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">
                      Academic Qualification
                    </h4>
                    <motion.ul className="text-gray-700 space-y-3">
                      {[
                        "10+2 passed from recognized board",
                        "English as compulsory subject",
                        "Minimum 40% aggregate marks (SC,ST, SEBC including Physically disabled Categories - 35%)",


                        "Science Stream, General Stream, vyavsaylakshi stream, uchchatar uttar, buniyadi pravah",
                        "No entrance exam required for most diploma programs"
                      ]
                        .map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-amber-200 hover:bg-amber-50 transition-all duration-300 group/item cursor-pointer"
                            variants={listItemVariants}
                            whileHover="hover"
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.4 }}
                            >
                              <CheckCircle className="w-5 h-5 text-amber-600" />
                            </motion.div>
                            <span className="group-hover/item:text-amber-900 transition-colors duration-300">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                    </motion.ul>
                  </motion.div>
                  <motion.div
                    className="space-y-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.5,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Calendar className="w-5 h-5 text-orange-600" />
                        </motion.div>
                        Age Criteria
                      </h4>
                      <motion.ul
                        className="text-gray-700 space-y-2 ml-7"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.7,
                            },
                          },
                        }}
                      >
                        {[
                          "Minimum 17 years as on admission date",

                          "No age limit for working professionals",
                          "Age relaxation as per government norms"
                        ]

                          .map((item, index) => (
                            <motion.li
                              key={index}
                              variants={listItemVariants}
                              whileHover="hover"
                              className="flex items-start gap-2 group/list-item cursor-pointer"
                            >
                              <motion.span
                                className="text-orange-600 mt-1 flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: 0.5 + index * 0.5,
                                }}
                              >
                                •
                              </motion.span>
                              <span className="group-hover/list-item:text-amber-900 transition-colors duration-300">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Stethoscope className="w-5 h-5 text-red-500" />
                        </motion.div>
                        Medical Fitness
                      </h4>
                      <motion.p
                        className="text-gray-700 ml-7"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ x: 5, color: "#78350f" }}
                      >
                        Candidates must be medically fit as per MCI standards
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  {/* <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ x: 5 }}
                  >
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">
                      Registration
                    </h4>
                    <motion.p
                      className="text-gray-700 p-4 bg-amber-50 rounded-lg border border-amber-200"
                      whileHover={{
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        borderColor: "rgb(245, 158, 11)",
                        scale: 1.02,
                      }}
                    >
                      Must be registered with State Medical Council/Medical
                      Council of India
                    </motion.p>
                  </motion.div> */}
                  {/* <motion.div className="p-4 rounded-lg border border-orange-200 bg-orange-50/50 group/item">
                        <motion.p>Admission Committee for Physiotherapy,BSC Nursing,Prosthetics and Orthotics ,Occupational Therapy,Optometry ,
Naturopathy,Audiology and Speech Therapy,GNM And ANM Admission
Government of Gujarat ,Gandhinagar</motion.p>
                        <motion.a  className="text-blue" href="https://www.medadmgujarat.org/ga/home.aspx" target="_blank">Click Here</motion.a>
                      </motion.div>
                  </motion.div> */}
                </div>
              </CardContent>

              <motion.div
                className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />

            </Card>
          </motion.div>

          {/* Important Rules Card */}

        </motion.div>
      </div>
    </div>
  );
}


export function Instructions() {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const response = await axiosInstance.get("/guidelines");
        setGuidelines(response.data);
      } catch (err) {
        console.error("Error fetching guidelines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuidelines();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 } },
    hover: { y: -5, scale: 1.01, transition: { duration: 0.3 } },
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full" />
    </div>
  );

  const groupedGuidelines = guidelines.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      <img src={backgroundImage4} alt="Instructions Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Instructions for Students and Parents</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Essential guidelines and code of conduct for a successful academic journey</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* General Guidelines Block */}
            {groupedGuidelines["General Guidelines"] && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-orange-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                      <GraduationCap className="w-8 h-8 text-amber-600" />
                      General Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {groupedGuidelines["General Guidelines"].map((sub, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-800">
                          {sub.subCategory === "Academic Conduct" ? <BookOpen className="w-5 h-5 text-amber-600" /> : <Users className="w-5 h-5 text-amber-600" />}
                          {sub.subCategory}
                        </h4>
                        <ul className="space-y-2 ml-3">
                          {sub.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Code of Conduct Block */}
            {groupedGuidelines["Code of Conduct"] && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-orange-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                      <FileText className="w-8 h-8 text-amber-600" />
                      Code of Conduct
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="bg-orange-50 border-orange-300 text-orange-800 p-3 rounded-xl">
                      <Info className="h-5 w-5 text-orange-600 mr-2" />
                      <AlertDescription>
                        <strong>Zero Tolerance Policy:</strong> Strict anti-ragging policy. Any form of ragging is punishable and may lead to expulsion.
                      </AlertDescription>
                    </Alert>
                    {groupedGuidelines["Code of Conduct"].map((sub, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                        <ul className="space-y-2 ml-3">
                          {sub.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                              <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Requirements Block */}
            {groupedGuidelines["Academic Requirements"] && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-amber-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                      <Calendar className="w-8 h-8 text-amber-600" />
                      Academic Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {groupedGuidelines["Academic Requirements"].map((sub, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                        <ul className="space-y-2 ml-3">
                          {sub.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* For Parents/Guardians Block */}
            {groupedGuidelines["For Parents/Guardians"] && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-amber-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                      <Users className="w-8 h-8 text-amber-600" />
                      For Parents/Guardians
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {groupedGuidelines["For Parents/Guardians"].map((sub, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                        <ul className="space-y-2 ml-3">
                          {sub.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Contact Information Block */}
          {groupedGuidelines["Contact Information"] && (
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm border border-amber-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                    <Info className="w-8 h-8 text-amber-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-1 gap-8">
                    {groupedGuidelines["Contact Information"].map((sub, idx) => (
                      <div key={idx} className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                        <div className="space-y-2 text-gray-700">
                          {sub.points.map((point, pIdx) => (
                            <p key={pIdx}>{point}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}