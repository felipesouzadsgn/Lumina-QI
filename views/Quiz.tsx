import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../store/useQuizStore';
import { getQuestions } from '../data/questions';
import { useTranslation } from '../translations';
import { GlassCard } from '../components/UI/GlassCard';
import { Button } from '../components/UI/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Quiz: React.FC = () => {
  const { language, currentQuestionIndex, selectedMode, nextQuestion, answerQuestion, answers } = useQuizStore();
  const t = useTranslation(language);
  const questions = getQuestions(selectedMode);
  const currentQuestion = questions[currentQuestionIndex];
  
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionClick = (optionId: string) => {
    answerQuestion(currentQuestion.id, optionId);
    // Slight delay before auto-advancing could be added here, 
    // but users might want to change their mind before clicking Next.
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 min-h-[80vh] flex flex-col justify-center">
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/10 rounded-full mb-8 relative overflow-hidden">
        <motion.div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-ios-blue to-ios-purple"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <GlassCard className="min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6 text-white/50 text-sm uppercase tracking-widest font-bold">
              <span>{t.question} {currentQuestionIndex + 1} / {questions.length}</span>
              <span>Level {currentQuestion.difficulty}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-medium mb-8 text-center">
              {currentQuestion.questionText[language]}
            </h3>

            {currentQuestion.imageUrl && (
              <div className="flex justify-center mb-8">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src={currentQuestion.imageUrl} alt="Pattern" className="max-h-48 object-cover" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              {currentQuestion.options.map((option) => {
                 const isSelected = answers[currentQuestion.id] === option.id;
                 return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option.id)}
                    className={`
                      relative p-6 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between
                      ${isSelected 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}
                    `}
                  >
                    <span className="font-semibold text-lg">{option.text || `Option ${option.id}`}</span>
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-black" />}
                  </motion.button>
                 );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <Button 
                onClick={nextQuestion} 
                disabled={!answers[currentQuestion.id]}
                className="flex items-center gap-2"
              >
                {t.next} <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
