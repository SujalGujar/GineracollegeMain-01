import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroImage1 from "../images/collegeimage1.jpg"
import HeroImage2 from "../images/collegeimage2.jpg"
import HeroImage3 from "../images/collegeimage3.jpg"
import axiosInstance, { getMediaUrl } from "../api/axiosInstance";

const backgroundSlides = [
  { 
    image: HeroImage1,
    alt: "Modern Medical Campus"
  },
  { 
    image: HeroImage2,
    alt: "Surgical Innovation"
  },
  { 
    image:HeroImage3,
    alt: "Research Laboratory"
  },
];

const HeroSection = ({ departmentName }) => {
  const [currentBgSlide, setCurrentBgSlide] = useState(0);
  const [slides, setSlides] = useState(backgroundSlides);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        let url = "/sliders?department=null";
        if (departmentName) {
          // departmentName here is the slug from App.tsx (e.g. "department-of-fundamentals-of-nursing")
          // We need to find the department ID. We can fetch all departments and match.
          const deptsRes = await axiosInstance.get("/departments");
          const depts = deptsRes.data;
          
          const matchedDept = depts.find(d => {
            if (d.slug) return d.slug === departmentName;
            // Fallback to legacy slug generation if slug field is missing
            const legacySlug = d.name.toLowerCase().replace(/\s+/g, "-");
            return legacySlug === departmentName;
          });

          if (matchedDept) {
            url = `/sliders?department=${matchedDept._id}`;
          }
        }
        
        const response = await axiosInstance.get(url);
        if (response.data && response.data.length > 0) {
          const backendSlides = response.data.filter(item => item.imageUrl).map(item => ({
            image: getMediaUrl(item.imageUrl),
            alt: item.title || "Ginera College Slider"
          }));
          setSlides(backendSlides.length > 0 ? backendSlides : backgroundSlides);
        } else {
          setSlides(backgroundSlides);
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
        setSlides(backgroundSlides);
      }
    };
    fetchSliders();
  }, [departmentName]);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, [slides.length]);

  return (
    <section
      style={{ height: "600px", marginTop: "0px" }}
      className="relative flex items-center justify-center overflow-hidden"
    >
      <style>{`
        .slide-dot {
          width: 24px;
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.3);
          transition: all 0.4s ease;
          cursor: pointer;
          border: none;
        }

        .slide-dot.active {
          width: 40px;
          background: #f5c842;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
        }

        .shimmer-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,200,66,0.4), transparent);
          animation: shimmerSlide 4s ease-in-out infinite;
        }

        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            animate={{ opacity: currentBgSlide === index ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-top"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = backgroundSlides[index % backgroundSlides.length].image;
              }}
            />
            {/* Dark overlay for better visibility of UI elements */}
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        ))}
      </div>

      {/* Subtle gold radial glow */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(245,200,66,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Bottom shimmer line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", overflow: "hidden", zIndex: 20 }}>
        <div className="shimmer-line" />
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 right-12 flex items-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slide-dot ${currentBgSlide === index ? "active" : ""}`}
            onClick={() => setCurrentBgSlide(index)}
          />
        ))}
      </div>


    </section>
  );
}
export default HeroSection;
