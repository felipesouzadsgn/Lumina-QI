import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/useQuizStore';
import { useTranslation } from '../translations';
import { GlassCard } from '../components/UI/GlassCard';
import { Button } from '../components/UI/Button';
import { Lock, Award, ShieldCheck, Download, CreditCard } from 'lucide-react';

export const Results: React.FC = () => {
  const { language, isPaid, unlockResults, score, selectedMode } = useQuizStore();
  const t = useTranslation(language);
  const [isProcessing, setIsProcessing] = useState(false);

  const price = selectedMode === 'basic' ? t.basicPrice : t.advancedPrice;

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock Payment Delay
    setTimeout(() => {
        setIsProcessing(false);
        unlockResults();
    }, 2000);
  };

  const getIntelligenceTier = (score: number) => {
      if (score > 130) return "Very Superior";
      if (score > 120) return "Superior";
      if (score > 110) return "High Average";
      return "Average";
  };

  if (!isPaid) {
    // LOCKED STATE
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-4 gap-8">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-4xl font-bold mb-2">{t.complete}</h2>
                <p className="text-xl text-white/70">{t.profileReady}</p>
            </motion.div>

            <GlassCard className="w-full relative overflow-hidden group">
                <div className="absolute inset-0 backdrop-blur-3xl bg-black/40 z-10 flex flex-col items-center justify-center text-center p-8">
                    <Lock className="w-12 h-12 text-white/50 mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{t.lockedBlur}</h3>
                    <p className="text-white/60 mb-6 max-w-xs">{t.payToView}</p>
                    <Button onClick={handlePayment} isLoading={isProcessing} className="w-full max-w-xs bg-white text-black font-bold">
                       {t.unlockReport} — {price}
                    </Button>
                    <div className="flex items-center gap-2 mt-4 text-xs text-white/40">
                        <ShieldCheck className="w-3 h-3" /> {t.paymentSecure}
                    </div>
                </div>

                {/* Blurred Content Background Mockup */}
                <div className="opacity-30 blur-sm pointer-events-none select-none">
                    <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-8">
                        <div>
                            <div className="text-6xl font-black tracking-tighter">1--</div>
                            <div className="text-sm uppercase tracking-widest text-white/50">IQ Score</div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-ios-purple">Top --%</div>
                            <div className="text-sm text-white/50">Percentile</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded w-1/2"></div>
                        <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
  }

  // UNLOCKED STATE
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-4 py-12">
        <GlassCard className="w-full text-center">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12"
            >
                <div className="inline-block relative">
                    <div className="absolute inset-0 bg-ios-cyan/30 blur-[60px] rounded-full" />
                    <h1 className="relative text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        {score}
                    </h1>
                </div>
                <p className="text-lg text-ios-cyan uppercase tracking-[0.2em] font-bold mt-4">
                    {t.iqScore}
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-white/50 text-sm uppercase tracking-widest mb-2">{t.classification}</div>
                    <div className="text-3xl font-semibold text-white">{getIntelligenceTier(score)}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-white/50 text-sm uppercase tracking-widest mb-2">{t.percentile}</div>
                    <div className="text-3xl font-semibold text-white">Top {(100 - ((score - 50)/150 * 100)).toFixed(1)}%</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> {t.downloadCert}
                </Button>
                <Button variant="glass" onClick={() => window.print()}>
                    Save Result
                </Button>
            </div>
        </GlassCard>
    </div>
  );
};
