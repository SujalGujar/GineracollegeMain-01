import "..//..//styles/button.css";
import { motion } from "framer-motion";

const ViewAllProgramsButton = ({
  onClick,
  className = "",
  children = "View All Programs",
}) => {
  return (
    <motion.button
      style={{
        background:
          "linear-gradient(135deg, #6A3A13 0%, #8B4513 50%, #3A1F0E 100%)",
        color: "white",
      }}
      className={`view-all-programs-btn ${className}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
      </div>
      <span>{children}</span>
    </motion.button>
  );
};

export default ViewAllProgramsButton;
