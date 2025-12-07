import { create } from 'zustand';
import { QuizState, TestMode } from '../types';
import { getQuestions } from '../data/questions';

export const useQuizStore = create<QuizState>((set, get) => ({
  language: 'en',
  view: 'home',
  selectedMode: 'basic',
  currentQuestionIndex: 0,
  answers: {},
  score: 0,
  isPaid: false,

  setLanguage: (lang) => set({ language: lang }),
  
  startQuiz: (mode) => set({ 
    selectedMode: mode, 
    view: 'quiz', 
    currentQuestionIndex: 0, 
    answers: {},
    score: 0,
    isPaid: false
  }),

  answerQuestion: (qId, optionId) => set((state) => ({
    answers: { ...state.answers, [qId]: optionId }
  })),

  nextQuestion: () => {
    const state = get();
    const questions = getQuestions(state.selectedMode);
    
    if (state.currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
    } else {
      // Logic to calculate actual score
      let correct = 0;
      questions.forEach((q) => {
         const ansId = state.answers[q.id];
         if (!ansId) return;

         // Find the correct option in the question definition
         // Note: In real app, we might want to lookup the original question by ID 
         // if getQuestions generates dynamic properties, but here strict ID mapping works 
         // because we regenerated IDs sequentially in getQuestions.
         // However, since getQuestions creates new objects with new IDs (1,2,3...), 
         // we need to check the answer against the *original* base logic. 
         // But since we copy the 'options' array directly in getQuestions, checking q.options works.
         
         const selectedOption = q.options.find(o => o.id === ansId);
         if (selectedOption?.isCorrect) {
             correct += 1;
         }
      });
      
      // Basic scoring algorithm (placeholder)
      // Base score 85 + (percentage * 75) = Max 160
      const percentage = correct / questions.length;
      const rawScore = Math.round(85 + (percentage * 75)); 
      
      set({ view: 'calculating', score: rawScore });
      
      setTimeout(() => {
        set({ view: 'results' });
      }, 3500);
    }
  },

  finishQuiz: () => {
    // Logic handled in nextQuestion transition
  },

  unlockResults: () => set({ isPaid: true }),
  
  resetQuiz: () => set({ view: 'home', currentQuestionIndex: 0, answers: {}, isPaid: false })
}));