import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={hoverEffect ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' } : {}}
      className={`
        relative backdrop-blur-xl bg-white/10 border border-white/20 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
        rounded-3xl p-6 sm:p-8 overflow-hidden
        ${className}
      `}
    >
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {children}
    </motion.div>
  );
};
