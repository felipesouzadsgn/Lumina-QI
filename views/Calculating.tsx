import React from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/useQuizStore';
import { useTranslation } from '../translations';
import { BrainCircuit } from 'lucide-react';

export const Calculating: React.FC = () => {
  const { language } = useQuizStore();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center px-4">
      <div className="relative w-40 h-40 mb-12">
        {/* Animated Rings */}
        <motion.div 
          className="absolute inset-0 rounded-full border-t-2 border-ios-cyan"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full border-r-2 border-ios-purple"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-4 rounded-full border-b-2 border-ios-indigo"
          animate={{ rotate: 180 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="w-16 h-16 text-white/80 animate-pulse" />
        </div>
      </div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-light tracking-wide mb-2"
      >
        {t.analyzing}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/50"
      >
        Processing logic matrices...
      </motion.p>
    </div>
  );
};
