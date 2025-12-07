export type Language = 'en' | 'pt';

export type QuestionType = 'pattern' | 'logic' | 'math';

export interface Question {
  id: number;
  type: QuestionType;
  questionText: Record<Language, string>;
  imageUrl?: string; // Placeholder for visual pattern image
  options: {
    id: string;
    text?: string; // Sometimes options are just images (A, B, C, D)
    isCorrect: boolean;
  }[];
  difficulty: number; // 1-10
}

export type AppView = 'home' | 'quiz' | 'calculating' | 'results';

export type TestMode = 'basic' | 'advanced';

export interface QuizState {
  language: Language;
  view: AppView;
  selectedMode: TestMode;
  currentQuestionIndex: number;
  answers: Record<number, string>; // questionId -> optionId
  score: number;
  isPaid: boolean;
  
  // Actions
  setLanguage: (lang: Language) => void;
  startQuiz: (mode: TestMode) => void;
  answerQuestion: (questionId: number, optionId: string) => void;
  nextQuestion: () => void;
  finishQuiz: () => void;
  unlockResults: () => void;
  resetQuiz: () => void;
}
