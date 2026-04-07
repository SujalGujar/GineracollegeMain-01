import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import "..//..//styles/button.css";

const SendMessageButton = ({
  onClick,
  isSubmitting = false,
  children = "Send Message",
  className = "",
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isSubmitting}
      whileTap={{ scale: 0.95 }}
      className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white py-3 rounded-md shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${className}`}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Sending...
        </div>
      ) : (
        <>
          <Send className="h-4 w-4" />
          {children}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </motion.button>
  );
};

export default SendMessageButton;
