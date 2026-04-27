import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import CollegeMap from "./CollegeMap";
import { IoMdArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import logo from "../images/Gineralogoimage.jpg";
import laboratoryImage from "../images/laboratory1.jpg";
import libraryImage from "../images/library1.jpg";
import ourVisionImage from "../images/ourvision.jpg";
import ourMissionImage from "../images/ourmision.jpg";
import collegeImage1 from "../images/collegeimage1.jpg";
import backgroundImage4 from "../images/backgroundImage(4).png";
import backgroundImage from "../images/backgroundImage (2).jpg";
import backgroundImage1 from "../images/backgroundImage (1).jpg";
import backgroundImage2 from "../images/backgroundImage (3).jpg";
import { MapPin, Hospital } from "lucide-react";
import ViewAllProgramsButton from "./Buttons/ViewAllProgramsButton";
import { Button } from "./ui/button";
import principleImage from "../images/principleImage.jpeg"
import axiosInstance from "../api/axiosInstance";
import campusLocationImg from "../images/coll.jpeg";


// import collegeImage2 from "../images/collegeimage2.jpg";
// import collegeImage3 from "../images/collegeimage3.jpg";
// import collegeImage4 from "../images/collegeimage4.jpg";
// import collegeImage5 from "../images/collegeimage5.jpg";
// import collegeImage6 from "../images/collegeimage6.jpg";

export function AboutLogo() {
  const [collegeBranding, setCollegeBranding] = useState(null);

  useEffect(() => {
    axiosInstance.get('/about/college-logo').then(r => setCollegeBranding(r.data)).catch(() => {});
  }, []);

  const [visionMission, setVisionMission] = useState([]);
  useEffect(() => {
    axiosInstance.get('/about/vision-mission').then(r => setVisionMission(r.data)).catch(() => {});
  }, []);

  const visionPoints = visionMission.filter(v => v.type === 'vision').map(v => v.content);
  const missionPoints = visionMission.filter(v => v.type === 'mission').map(v => v.content);

  const displayLogo = collegeBranding?.logoUrl
    ? (collegeBranding.logoUrl.startsWith('http') ? collegeBranding.logoUrl : `http://localhost:8080${collegeBranding.logoUrl}`)
    : logo;

  const items = visionPoints.length ? visionPoints : [
    "A college of nursing's vision is to be a leader in nursing education, preparing competent, compassionate, and ethically grounded professionals who can contribute to global healthcare.",
    "This is achieved through fostering innovation, promoting research, and creating a learning environment that develops students into skilled and committed healthcare providers ready to meet diverse and changing societal needs.",
    "Ethical medical professionals with humanitarian values",
  ];
  const items2 = missionPoints.length ? missionPoints : [
    "The mission of a college of nursing is to prepare competent and compassionate nursing professionals to provide high-quality healthcare through excellence in education, clinical practice, and research.",
    "This includes developing nurses who can serve diverse communities, promote health, prevent illness, and contribute to the advancement of the nursing profession both locally and globally",
    "Deliver compassionate, ethical, and evidence-based healthcare services",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-[120px] pb-24 overflow-hidden">
      {/* 🔸 Background Image */}
      <img
        src={backgroundImage4}
        alt="About Logo Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 space-y-32">
        {/* ------------------- SECTION 1 ------------------- */}
        <motion.div
          style={{ marginTop: "70px" }}
          className="grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left: Logo */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              className="w-80 h-80 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-8 border-white"
              whileHover={{
                scale: 1.05,
                rotate: 5,
                boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.5)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={displayLogo}
                alt={collegeBranding?.collegeName || 'College Logo'}
                className="w-32 h-32 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Title & Description */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-[#78350f]"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              College Logo & Branding
            </motion.h1>

            <motion.div
              className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.5, duration: 1 }}
            />

            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              Discover our commitment to excellence in education, innovation,
              and community impact through our distinctive branding and visual
              identity.
            </p>
          </motion.div>
        </motion.div>

        {/* ------------------- SECTION 2 ------------------- */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl border border-orange-200">
          {/* HEADER */}
          <CardHeader className="text-center py-20 space-y-6 bg-gradient-to-r from-amber-500 to-orange-500">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <CardTitle className="text-4xl font-bold text-white">
                About Us
              </CardTitle>
              <motion.div
                className="h-1 bg-white/50 rounded-full mx-auto my-4 max-w-md"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
              />
              <p className="max-w-2xl mx-auto text-white/90 text-lg leading-relaxed">
                We are dedicated to fostering academic excellence and holistic
                development in a vibrant learning environment.
              </p>
            </motion.div>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="space-y-20 px-6 md:px-14 pb-20 pt-16">
            {/* --- GROUP 1: LEFT TEXT + RIGHT IMAGE --- */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-stretch min-h-[500px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* LEFT TEXT */}
              <div className="flex flex-col h-full">
                <motion.h3
                  className="text-2xl font-semibold flex items-center mb-8 text-[#78350f]"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="w-3 h-3 bg-amber-600 rounded-full mr-3"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.span>
                  Our Mission & Values
                </motion.h3>

                <div className="space-y-4 flex-1 overflow-y-auto">
                  {items.map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.15,
                        ease: "easeOut",
                      }}
                      className="h-24 flex items-center"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(245, 158, 11, 0.15)",
                          backgroundColor: "#fef3c7",
                          borderColor: "#f59e0b",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start space-x-4 p-4 border border-orange-200 rounded-xl bg-white shadow-sm cursor-pointer w-full h-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <IoMdArrowForward
                            className="text-amber-600 group-hover:text-orange-600"
                            size={20}
                          />
                        </motion.div>
                        <p className="text-gray-700 text-sm leading-relaxed flex-1 group-hover:text-amber-900 transition-colors line-clamp-3">
                          {text}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <motion.div
                className="rounded-2xl shadow-lg overflow-hidden h-full"
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={libraryImage}
                  alt="Mission & Values"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </motion.div>

            {/* --- GROUP 2: RIGHT TEXT + LEFT IMAGE --- */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-stretch min-h-[500px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* LEFT IMAGE */}
              <motion.div
                className="rounded-2xl shadow-lg overflow-hidden h-full order-1 md:order-none"
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={laboratoryImage}
                  alt="Branding Guidelines"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              {/* RIGHT TEXT */}
              <div className="flex flex-col h-full">
                <motion.h3
                  className="text-2xl font-semibold flex items-center mb-8 text-[#78350f]"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="w-3 h-3 bg-amber-600 rounded-full mr-3"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  ></motion.span>
                  Our Vision & Goals
                </motion.h3>

                <div className="space-y-4 flex-1 overflow-y-auto">
                  {items2.map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.15,
                        ease: "easeOut",
                      }}
                      className="h-24 flex items-center"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(245, 158, 11, 0.15)",
                          backgroundColor: "#fef3c7",
                          borderColor: "#f59e0b",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start space-x-4 p-4 border border-orange-200 rounded-xl bg-white shadow-sm cursor-pointer w-full h-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <IoMdArrowForward
                            className="text-amber-600 group-hover:text-orange-600"
                            size={20}
                          />
                        </motion.div>
                        <p className="text-gray-700 text-sm leading-relaxed flex-1 group-hover:text-amber-900 transition-colors line-clamp-3">
                          {text}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA BUTTON */}
            <motion.div
              className="pt-8 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-600 mb-6 text-lg">
                Explore more about our programs and initiatives.
              </p>

              <motion.button
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative text-white  rounded-full font-bold text-lg overflow-hidden border-2 border-[#1a0f07]
                shadow-lg shadow-[#5a280a]/40 "
              >
                <ViewAllProgramsButton
                  onClick={() => console.log("View All Programs")}
                />
              </motion.button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
// import { motion } from 'framer-motion';
// import { Card, CardContent } from "@/components/ui/card";

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const signatureVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.8,
    },
  },
};

// Animation variants

const statsVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
  hover: {
    scale: 1.08,
    y: -5,
    transition: { duration: 0.3 },
  },
};

export function DeanMessage() {
  const [dean, setDean] = useState(null);

  useEffect(() => {
    axiosInstance.get('/about/dean').then(r => setDean(r.data)).catch(() => {});
  }, []);

  const deanName = dean?.name || 'Dr. Hiral S. Shah';
  const deanTitle = dean?.title || 'Principal';
  const deanGreeting = dean?.greeting || 'Dear Students, Faculty and Visitors,';
  const deanParagraphs = dean?.paragraphs?.length ? dean.paragraphs : [
    "It is my immense pleasure to welcome all students, faculty members, and visitors to Government College of Nursing, GINERA, a beacon of excellence dedicated to shaping the future of healthcare.",
    "I extend my deepest gratitude to our dedicated and highly qualified faculty who are the backbone of our institution, serving not just as instructors, but as mentors and role models who instill the core values of compassion, integrity, and ethical practice in our students.",
    "Dear Students, You have chosen a noble profession—a calling to serve humanity with empathy, dedication, and skill. At Government College of Nursing, GINERA, you are at the heart of everything we do.",
    "Dear Valued Visitors, Whether you are a prospective student, a parent, or a partner from a healthcare institution, we welcome you to our vibrant community."
  ];
  const deanHighlight = dean?.highlight || 'Together, let us continue to work towards our shared goal of creating a healthier world.';
  const deanStats = dean?.stats?.length ? dean.stats : [
    { number: "62+", label: "Years of Excellence", color: "#A2632E" },
    { number: "10,000+", label: "Graduates", color: "#1e40af" },
    { number: "50+", label: "Faculty Members", color: "#059669" },
    { number: "35+", label: "Research Papers/Year", color: "#7c3aed" }
  ];
  const deanPhoto = dean?.photoUrl
    ? (dean.photoUrl.startsWith('http') ? dean.photoUrl : `http://localhost:8080${dean.photoUrl}`)
    : principleImage;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* ✅ Background Image */}
      <img
        src={backgroundImage4}
        style={{ opacity: 0.6 }}
        alt="Dean Section Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-0" />{" "}
      {/* Soft overlay */}
      {/* ✅ Content */}
      <motion.div
        style={{ marginTop: "70px" }}
        className="container mx-auto px-4 relative z-10"
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12 mb-16"
            variants={containerVariants}
          >
            {/* Dean Image */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-start"
              variants={imageVariants}
            >
              <div style={{ height: '285px' }} className="relative w-80 md:h-16 rounded-full shadow-2xl border-8 border-white overflow-hidden bg-gradient-to-br from-[#A2632E] to-[#804C22]">
                <img
                  src={deanPhoto}
                  className="w-full h-full object-cover relative z-10 rounded-full"
                  alt="Dean & Principal"
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#A2632E] blur-xl opacity-30 -z-10"
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              className="flex-1 text-center lg:text-right"
              variants={titleVariants}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{
                  color: "#A2632E",
                  textShadow: "0 4px 10px rgba(162, 99, 46, 0.3)",
                }}
              >
                Message from the Principal
              </motion.h1>

              <motion.div
                className="flex justify-center lg:justify-end mb-6"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.span
                  className="text-3xl"
                  style={{ color: "#A2632E" }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </motion.div>

              <motion.div className="space-y-4" variants={textVariants}>
                <h2 className="text-3xl font-bold text-gray-800">{deanName}</h2>
                <p className="text-xl text-gray-600 font-medium">{deanTitle}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Message Card */}
          <motion.div variants={cardVariants}>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <motion.div
                  className="text-center mb-8"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <p className="text-2xl font-semibold text-gray-800 mb-2">{deanGreeting}</p>
                  <div className="w-24 h-1 bg-[#A2632E] rounded-full mx-auto"></div>
                </motion.div>

                {/* Message Content */}
                <motion.div
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  {deanParagraphs.map((text, i) => (
                    <motion.p key={i} className="text-gray-700 leading-relaxed text-lg text-justify" variants={textVariants}>
                      {text}
                    </motion.p>
                  ))}  
                  <motion.div className="bg-gradient-to-r from-[#F8F4F0] to-[#EDE7E1] p-6 rounded-2xl border-l-4 border-[#A2632E] shadow-md" variants={textVariants}>
                    <p className="text-gray-700 leading-relaxed text-lg">{deanHighlight}</p>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-12"
            variants={containerVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {deanStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                variants={statsVariants}
              >
                <div
                  className="font-bold text-3xl mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Animation variants


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};



export function History() {
  const [dynamicMilestones, setDynamicMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryExpanded, setIsHistoryExpanded] = React.useState(false);
  const [expandedMilestones, setExpandedMilestones] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/about/milestones')
      .then(r => {
        setDynamicMilestones(r.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch milestones:", err);
        setLoading(false);
      });
  }, []);

  const milestonesToDisplay = dynamicMilestones;

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* ---------- HERO IMAGE ---------- */}
      <motion.div
        className="relative w-full h-96 mb-16 overflow-hidden rounded-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={collegeImage1}
          alt="College Library"
          className="w-full h-full object-cover rounded-xl"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Our History
        </motion.h1>
      </motion.div>

      <div className="container mx-auto px-6 space-y-18">
        {/* ---------- INSTITUTIONAL TIMELINE ---------- */}
        <motion.div
          style={{ marginTop: "10px" }}
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
        >
          {/* Image Section */}
          <motion.div
            variants={imageAnimation}
            className="flex flex-col  items-center justify-center"
          >
            <motion.img
              style={{ marginTop: '70px' }}
              src={laboratoryImage}
              alt="Institutional Timeline"
              className="rounded-2xl shadow-2xl w-full max-w-md h-84   object-cover border-4 border-white"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-6 flex flex-col justify-center h-full"
            variants={fadeInUp}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#f59e0b" }}
            >
              Institutional Timeline
            </motion.h2>

            <div
              className="space-y-4 text-lg leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              <p>
                The college has completed 62 years of teaching to nursing students. Students of this college have obtained various statuses in administration, education and clinical field in Gujarat (India) as well abroad.
              </p>
              {isHistoryExpanded && (
                <>
                  <p>
                    The college has the roots in the post basic Nursing School, which was started in 1963. At the time Gujarat was very young state and the need for P.H.N. nurses was acute. So the diploma course in Public Health Nursing was started. Two years later with the increasing in Nursing Schools a especially the ANM schools the need for tutors was felt, so in 1965 a Diploma in Nursing Education course was started.
                  </p>
                  <p>During the years when the Diploma courses were being conducted, the concept of post Basic B.Sc. Degree course in Nursing was conceived. The Idea very new too many but was easily accepted. It was realized that changing needs of the society which in turn is due to the rapid advanced medicine and technology demands professional Nurses. This could be done if a collegiate program was started thus, in July 1963 the post Basic nursing school ceased to exist and the college of Nursing born.</p>
                </>
              )}
              <button
                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                className="text-orange-600 font-semibold hover:underline text-sm focus:outline-none mt-2"
              >
                {isHistoryExpanded ? "Read less" : "Read more"}
              </button>
            </div>

            {/* Stats */}
          </motion.div>
        </motion.div>

        {/* ---------- LEGACY OF EXCELLENCE ---------- */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          style={{ marginTop: "10px" }}
        >
          {/* Content Section */}
          <motion.div
            className="space-y-6 flex flex-col justify-center h-full order-2 md:order-1"
            variants={fadeInUp}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#f59e0b" }}
            >
              Legacy of Excellence
            </motion.h2>

            <div
              className="space-y-4 text-lg leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              <p>
                Government College of Nursing, GINERA, Ahmedabad signifies a history of producing high-quality, competent nurses through a combination of strong academics, practical experience, and a commitment to ethical and compassionate care. This legacy is built on proven leadership, consistent accreditation, and a holistic approach that develops critical thinking, empathy, and job-ready skills for a dynamic healthcare environment.
              </p>

            </div>

            {/* Stats */}
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex items-center justify-center order-1 md:order-2"
            variants={imageAnimation}
          >
            <motion.img
              src={laboratoryImage}
              alt="Legacy of Excellence"
              className="rounded-2xl shadow-2xl w-full max-w-md h-80 object-cover border-4 border-white"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </motion.div>

        {/* ---------- MILESTONES & ACHIEVEMENTS ---------- */}
        <motion.div variants={fadeInUp}>
          <Card className="shadow-2xl border-0 bg-[var(--color-neutral-light-gray)] rounded-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle
                className="font-bold text-3xl md:text-4xl"
                style={{ color: "#f59e0b" }}
              >
                Milestones & Achievements
              </CardTitle>
              <p className="text-lg mt-2" style={{ color: "#6b7280" }}>
                Celebrating our journey through significant accomplishments
              </p>
            </CardHeader>

            <CardContent className="px-4 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading milestones...</p>
                  </div>
                ) : milestonesToDisplay.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">No milestones found in database.</p>
                  </div>
                ) : (
                  milestonesToDisplay.map((milestone, index) => (
                    <motion.div
                      key={milestone._id || index}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                    >
                      <div
                        className="h-2 w-full"
                        style={{ backgroundColor: milestone.color || '#f59e0b' }}
                      ></div>
                      <div className="p-6" style={{ color: "#6b7280" }}>
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                            style={{ backgroundColor: milestone.color || '#f59e0b' }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {milestone.icon || '🎯'}
                          </motion.div>
                          <span className="font-bold text-gray-800 text-xl bg-gray-100 px-3 py-1 rounded-lg">
                            {milestone.year}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                          {milestone.event}
                        </h3>
                        <p className="text-sm leading-relaxed">
                          {(milestone.description || '').length > 100 ? (
                            <>
                              {expandedMilestones.includes(index)
                                ? milestone.description
                                : milestone.description.slice(0, 100) + "..."}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedMilestones((prev) =>
                                    prev.includes(index)
                                      ? prev.filter((i) => i !== index)
                                      : [...prev, index]
                                  );
                                }}
                                className="text-orange-600 font-semibold hover:underline text-xs ml-1 focus:outline-none"
                              >
                                {expandedMilestones.includes(index) ? "Read less" : "Read more"}
                              </button>
                            </>
                          ) : (
                            milestone.description
                          )}
                        </p>

                        <motion.div
                          className="h-1 w-12 rounded-full mt-4"
                          style={{ backgroundColor: milestone.color || '#f59e0b' }}
                          whileHover={{ width: "100%" }}
                        />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Additional Info */}
              <motion.div
                className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                variants={fadeInUp}
              >
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#f59e0b" }}
                >
                  Continuing Our Journey
                </h3>
                <p
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: "#6b7280" }}
                >
                  With each passing year, we continue to build upon our legacy
                  of excellence, embracing innovation while staying true to our
                  core mission of serving humanity.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Location() {
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
        alt="Location Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Campus Location
            </motion.h1>
            <motion.div
              className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 max-w-sm"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.p
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              variants={textVariants}
            >
              Discover our campus location and get in touch with us
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {/* Campus Map Card */}
            <motion.div variants={itemVariants}>
              <Card className="border border-orange-200 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-200">
                  <CardTitle
                    className="flex items-center gap-3"
                    style={{ color: "#78350f" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      🗺️
                    </motion.div>
                    Campus Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <motion.div
                    className="aspect-video bg-amber-50 rounded-xl border border-orange-200 flex items-center justify-center shadow-inner"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CollegeMap />
                  </motion.div>
                  <motion.p
                    className="text-sm text-gray-600 mt-4 text-center"
                    variants={textVariants}
                  >
                    Click on different areas of the campus to explore facilities
                    and departments.
                  </motion.p>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </Card>
            </motion.div>

            {/* Address & Contact Card */}
            <motion.div variants={itemVariants}>
              <Card className="border border-orange-200 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-200">
                  <CardTitle
                    className="flex items-center gap-3"
                    style={{ color: "#78350f" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      📍
                    </motion.div>
                    Address & Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.div
                    variants={itemVariants}
                    className="p-4 bg-amber-50 rounded-xl border border-amber-200 hover:bg-orange-50 transition-colors duration-300 group cursor-pointer"
                  >
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-amber-800">
                      <MapPin className="h-4 w-4" />
                      College Address
                    </h4>
                    <p className="text-gray-700 leading-relaxed group-hover:text-amber-900 transition-colors">
                      Gujarat Institute Of Nursing Education and Research Ahmedabad (GINERA) Government Nursing College
                      <br />
                      Civil Hospital Campus Asarwa
                      <br />
                      Ahmedabad - 380016
                      <br />
                      Gujarat, India
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-amber-50 transition-colors duration-300 group cursor-pointer"
                  >
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-orange-800">
                      <Hospital className="h-4 w-4" />
                      Hospital Address
                    </h4>
                    <p className="text-gray-700 leading-relaxed group-hover:text-orange-900 transition-colors">
                      Civil Hospital Ahmedabad Asarwa
                      <br />
                      Ahmedabad - 380016
                      <br />
                      Gujarat, India
                    </p>
                  </motion.div>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </Card>
            </motion.div>

            {/* Full Width Campus Image */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card className="border border-orange-200 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <motion.img
                    src={campusLocationImg}
                    alt="College Campus"
                    className="w-full h-80 object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-orange-200">
                    <motion.p
                      className="text-center text-gray-700 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Our beautiful campus - A hub of Excellent Nursing education and
                      innovation
                    </motion.p>
                  </div>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </Card>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              style={{ backgroundColor: "#f59e0b" }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              Get Directions
            </Button>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const listItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const valueCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

export function VisionMission() {
  const [expandedCoreValues, setExpandedCoreValues] = React.useState([]);

  const toggleCoreValue = (title) => {
    setExpandedCoreValues((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };
  const [visionMission, setVisionMission] = useState([]);
  const [coreValuesData, setCoreValuesData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/about/vision-mission').then(r => setVisionMission(r.data)).catch(() => {});
    axiosInstance.get('/about/core-values').then(r => setCoreValuesData(r.data)).catch(() => {});
  }, []);

  const visionPoints = visionMission.filter(v => v.type === 'vision').map(v => v.content);
  const missionPoints = visionMission.filter(v => v.type === 'mission').map(v => v.content);

  const items = visionPoints.length ? visionPoints : [
    "A college of nursing's vision is to be a leader in nursing education, preparing competent, compassionate, and ethically grounded professionals who can contribute to global healthcare.",
    "This is achieved through fostering innovation, promoting research, and creating a learning environment that develops students into skilled and committed healthcare providers ready to meet diverse and changing societal needs.",
    "Ethical medical professionals with humanitarian values",
  ];
  const items2 = missionPoints.length ? missionPoints : [
    "The mission of a college of nursing is to prepare competent and compassionate nursing professionals to provide high-quality healthcare through excellence in education, clinical practice, and research.",
    "This includes developing nurses who can serve diverse communities, promote health, prevent illness, and contribute to the advancement of the nursing profession both locally and globally",
    "Deliver compassionate, ethical, and evidence-based healthcare services",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      {/* Background Image */}
      <img
        src={backgroundImage4}
        alt="Vision Mission Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Vision & Mission
            </motion.h1>
            <motion.div
              className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 max-w-md"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.p
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Guiding principles that shape our journey towards medical
              excellence and innovation
            </motion.p>
          </motion.div>

          {/* Vision Section - Image Left, Content Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch min-h-[500px]"
          >
            {/* Vision Image - Left Side */}
            <motion.div
              variants={imageVariants}
              className="order-1 lg:order-1 h-full"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 h-full">
                <img
                  src={ourVisionImage}
                  alt="Our Vision for Medical Excellence"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // If image fails to load, show fallback content
                    e.target.style.display = "none";
                    const fallback = e.target.parentElement;
                    fallback.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-center p-8">
                          <span class="text-6xl mb-4 block">🔭</span>
                          <p class="text-2xl font-bold text-gray-700 mb-2">Our Vision</p>
                          <p class="text-gray-600">Medical Excellence & Innovation</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </motion.div>

            {/* Vision Content - Right Side */}
            <motion.div
              variants={contentVariants}
              className="order-2 lg:order-2 h-full"
            >
              <Card className="h-full border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-200">
                  <CardTitle
                    className="flex items-center gap-3 text-2xl font-bold"
                    style={{ color: "#78350f" }}
                  >
                    <motion.span
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                    >
                      🎯
                    </motion.span>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    {items.map((text, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-start gap-3 p-4 ${i % 3 === 0 ? 'bg-amber-50 border-amber-200' : i % 3 === 1 ? 'bg-orange-50 border-orange-200' : 'bg-yellow-50 border-yellow-200'} rounded-lg border group cursor-pointer`}
                        variants={listItemVariants}
                        whileHover={{ scale: 1.02, backgroundColor: i % 3 === 0 ? "#fef3c7" : i % 3 === 1 ? "#ffedd5" : "#fef9c3" }}
                      >
                        <span className={`${i % 3 === 0 ? 'text-amber-600' : i % 3 === 1 ? 'text-orange-600' : 'text-yellow-600'} mt-1 text-xl flex-shrink-0 group-hover:text-orange-600`}>
                          ✓
                        </span>
                        <span className="text-gray-700 font-medium group-hover:text-amber-900">
                          {text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </Card>
            </motion.div>
          </motion.div>

          {/* Mission Section - Image Right, Content Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch min-h-[500px]"
          >
            {/* Mission Content - Left Side */}
            <motion.div
              variants={contentVariants}
              className="order-2 lg:order-1 h-full"
            >
              <Card className="h-full border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-amber-200">
                  <CardTitle
                    className="flex items-center gap-3 text-2xl font-bold"
                    style={{ color: "#78350f" }}
                  >
                    <motion.span
                      animate={{
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                    >
                      🚀
                    </motion.span>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.ul
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                  >
                    {items2.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group cursor-pointer border border-transparent hover:border-amber-200"
                          variants={listItemVariants}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <motion.span
                            className="text-amber-600 mt-1 flex-shrink-0 text-xl font-bold group-hover:text-orange-600"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              delay: index * 0.1,
                            }}
                          >
                            •
                          </motion.span>
                          <span className="text-gray-700 group-hover:text-amber-900">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </Card>
            </motion.div>

            {/* Mission Image - Right Side */}
            <motion.div
              variants={imageVariants}
              className="order-1 lg:order-2 h-full"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-amber-100 h-full">
                <img
                  src={ourMissionImage}
                  alt="Our Mission in Action"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // If image fails to load, show fallback content
                    e.target.style.display = "none";
                    const fallback = e.target.parentElement;
                    fallback.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-center p-8">
                          <span class="text-6xl mb-4 block">🎯</span>
                          <p class="text-2xl font-bold text-gray-700 mb-2">Our Mission</p>
                          <p class="text-gray-600">Healthcare Excellence & Service</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle
                  className="text-3xl mb-2"
                  style={{ color: "#78350f" }}
                >
                  Our Core Values
                </CardTitle>
                <motion.div
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 max-w-sm"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className="text-gray-700 max-w-2xl mx-auto text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  The foundational principles that guide our journey towards
                  Nursing excellence
                </motion.p>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {coreValuesData.map((value, index) => (
                    <motion.div
                      key={index}
                      variants={valueCardVariants}
                      whileHover="hover"
                      className="text-center group cursor-pointer p-6 rounded-xl bg-white border border-orange-200 hover:shadow-lg transition-all duration-300"
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl text-white">
                          {value.icon}
                        </span>
                      </motion.div>
                      <motion.h4
                        className="font-bold text-lg mb-3"
                        style={{ color: "#78350f" }}
                        whileHover={{ color: "#f59e0b" }}
                      >
                        {value.title}
                      </motion.h4>
                      <motion.p
                        className="text-sm text-gray-600 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {value.description.length > 80 ? (
                          <>
                            {expandedCoreValues.includes(value.title)
                              ? value.description
                              : value.description.slice(0, 80) + "..."}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCoreValue(value.title);
                              }}
                              className="text-orange-600 font-semibold hover:underline text-xs ml-1 focus:outline-none"
                            >
                              {expandedCoreValues.includes(value.title) ? "Read less" : "Read more"}
                            </button>
                          </>
                        ) : (
                          value.description
                        )}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>

              {/* Animated Border */}
              <motion.div
                className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Achievements() {
  const achievements = [
    {
      category: "Academic Excellence",
      items: [
        "NAAC 'A' Grade Accreditation (2015)",
        "Top 10 Medical Colleges in Gujarat State",
        "100% NEET PG pass rate for the last 3 years",
        "Winner of Best Medical College Award (State Level - 2022)",
      ],
    },
    {
      category: "Research & Innovation",
      items: [
        "50+ research papers published in international journals (2023)",
        "5 patents filed by faculty and students",
        "₹2 Crore research grants received from government agencies",
        "Established Center of Excellence in Molecular Biology",
      ],
    },
    {
      category: "Clinical Excellence",
      items: [
        "NABH accreditation for Civil Hospital",
        "Successful organ transplant program",
        "Advanced cardiac surgery program",
        "Telemedicine services covering 100+ villages",
      ],
    },
    {
      category: "Recognition & Awards",
      items: [
        "Best Teaching Hospital Award - Gujarat (2023)",
        "Excellence in Medical Education - National Award (2022)",
        "Outstanding Community Service Recognition",
        "Digital Initiative of the Year Award (2021)",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* ✅ Background Image with opacity */}
      <img
        src={backgroundImage4}
        alt="Achievements Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* ✅ Content Container */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        style={{ marginTop: "70px" }}
      >
        {/* Section Title */}
        <motion.h1
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ color: "#1E3A8A" }}
        >
          Achievements of Our College
        </motion.h1>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <Card className="group h-full border-0 shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl bg-white/90 backdrop-blur-md hover:scale-[1.03]">
                {/* Header */}
                <CardHeader className="pb-4 border-b rounded-t-2xl transition-all duration-500 bg-gradient-to-r from-[#A2632E]/10 to-[#A2632E]/20 group-hover:from-[#A2632E]/30 group-hover:to-[#A2632E]/40">
                  <CardTitle
                    className="flex items-center gap-3 text-xl font-semibold"
                    style={{ color: "#A2632E" }}
                  >
                    <motion.span
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      🏆
                    </motion.span>
                    {achievement.category}
                  </CardTitle>
                </CardHeader>

                {/* ✅ Content (Removed orange background) */}
                <CardContent className="pt-4 bg-white/70 rounded-b-2xl">
                  <ul className="space-y-3">
                    {achievement.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start gap-3 transition-all duration-300 group/item hover:translate-x-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="outline"
                          className="mt-1 flex-shrink-0 border-[#A2632E] text-[#A2632E] text-xs font-medium px-2 py-1 transition-all duration-300 group-hover:bg-[#A2632E] group-hover:text-white"
                        >
                          {itemIndex + 1}.
                        </Badge>
                        <span className="text-gray-700 text-sm leading-relaxed flex-1 group-hover:text-[#111827] transition-colors duration-300">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Notable Statistics */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-md rounded-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "#A2632E" }}
              >
                Notable Statistics
              </CardTitle>
              <p className="text-gray-700 mt-2 max-w-md mx-auto">
                Key milestones that highlight our impact and success in medical
                education and healthcare.
              </p>
            </CardHeader>

            <CardContent className="pt-4 pb-10">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
                variants={containerVariants}
              >
                {[
                  { number: "5000+", label: "Alumni Doctors" },
                  { number: "95%", label: "Graduate Employment Rate" },
                  { number: "200+", label: "Research Publications" },
                  { number: "25", label: "Academic Awards" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer p-4 rounded-xl bg-white/80 shadow-md hover:shadow-lg transition-all duration-300"
                    variants={statVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div
                      className="text-4xl font-bold mb-3 transition-colors duration-300"
                      style={{ color: "#A2632E" }}
                    >
                      {stat.number}
                    </div>
                    <p className="text-gray-700 font-medium text-sm">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
