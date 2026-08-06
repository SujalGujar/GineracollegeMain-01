import React from 'react';
import { motion } from 'framer-motion';
import gineraLogo2 from '../images/ginera-logo2.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="relative flex flex-col items-center"
      >
        {/* Logo Container with Pulse Effect */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-orange-400 rounded-full blur-2xl"
          />
          <img 
            src={gineraLogo2} 
            alt="Logo" 
            className="relative w-16 h-16 object-contain z-10"
          />
        </div>

        {/* Branded Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Ginera Nursing College</h2>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Line at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
