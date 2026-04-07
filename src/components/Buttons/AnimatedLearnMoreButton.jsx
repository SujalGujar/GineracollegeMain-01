import "..//..//styles/button.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AnimatedLearnMoreButton = ({
  programType = "default",
  onClick,
  className = "",
  children = "Learn More",
}) => {
  return (
    <motion.button
      style={{
        background:
          "linear-gradient(135deg, #6A3A13 0%, #8B4513 50%, #3A1F0E 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding: "12px 24px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`animated-learn-more-btn ${programType} ${className}`}
      onClick={onClick}
    >
      {/* 🔹 Wave Text */}
      <span className="wave-text flex items-center gap-2">
        {children.split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </span>

      {/* 🔹 Arrow Icon */}
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight className="h-4 w-4" />
      </motion.div>

      {/* 🔹 Button Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default AnimatedLearnMoreButton;
