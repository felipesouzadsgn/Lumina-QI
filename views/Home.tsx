import React from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/useQuizStore';
import { useTranslation } from '../translations';
import { GlassCard } from '../components/UI/GlassCard';
import { Button } from '../components/UI/Button';
import { Brain, Zap, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { language, startQuiz } = useQuizStore();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto px-4 gap-12">
      
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tighter">
          {t.heroTitle}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          {t.heroSubtitle}
        </p>
        <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-ios-cyan mt-4">
          {t.ageRange}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Basic Mode Card */}
        <GlassCard hoverEffect className="flex flex-col items-center text-center gap-6 group cursor-pointer" >
          <div className="w-16 h-16 rounded-full bg-ios-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-8 h-8 text-ios-blue" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{t.startBasic}</h2>
            <p className="text-white/60">{t.basicDesc}</p>
          </div>
          
          <div className="mt-2 text-sm uppercase tracking-widest text-ios-cyan font-bold bg-ios-cyan/10 px-3 py-1 rounded-full">
            {t.startFree}
          </div>

          <Button variant="glass" onClick={() => startQuiz('basic')} className="w-full mt-2">
             <span className="flex items-center justify-center gap-2">
               Start <ArrowRight className="w-4 h-4" />
             </span>
          </Button>
        </GlassCard>

        {/* Advanced Mode Card */}
        <GlassCard hoverEffect className="flex flex-col items-center text-center gap-6 group cursor-pointer border-ios-purple/30">
           <div className="absolute inset-0 bg-ios-purple/5 group-hover:bg-ios-purple/10 transition-colors duration-500" />
           <div className="w-16 h-16 rounded-full bg-ios-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
            <Brain className="w-8 h-8 text-ios-purple" />
          </div>
          <div className="space-y-2 relative z-10">
            <h2 className="text-3xl font-bold">{t.startAdvanced}</h2>
            <p className="text-white/60">{t.advancedDesc}</p>
          </div>
          
          <div className="mt-2 text-sm uppercase tracking-widest text-ios-purple font-bold bg-ios-purple/10 px-3 py-1 rounded-full relative z-10">
            {t.startFree}
          </div>

          <Button variant="secondary" onClick={() => startQuiz('advanced')} className="w-full relative z-10 mt-2">
            <span className="flex items-center justify-center gap-2">
               Start <ArrowRight className="w-4 h-4" />
             </span>
          </Button>
        </GlassCard>
      </div>
    </div>
  );
};