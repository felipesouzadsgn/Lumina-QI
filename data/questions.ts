import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    type: 'pattern',
    questionText: {
      en: "Which shape completes the pattern?",
      pt: "Qual forma completa o padrão?"
    },
    imageUrl: "https://picsum.photos/600/300?grayscale&blur=2", 
    difficulty: 2,
    options: [
      { id: 'A', text: 'A', isCorrect: false },
      { id: 'B', text: 'B', isCorrect: true },
      { id: 'C', text: 'C', isCorrect: false },
      { id: 'D', text: 'D', isCorrect: false },
    ]
  },
  {
    id: 2,
    type: 'logic',
    questionText: {
      en: "Select the odd one out.",
      pt: "Selecione o intruso."
    },
    difficulty: 3,
    options: [
      { id: 'A', text: 'Circle', isCorrect: false },
      { id: 'B', text: 'Square', isCorrect: false },
      { id: 'C', text: 'Triangle', isCorrect: false },
      { id: 'D', text: 'Sphere', isCorrect: true }, // 3D object among 2D
    ]
  },
  {
    id: 3,
    type: 'math',
    questionText: {
      en: "If the sequence is 2, 4, 8, 16... what comes next?",
      pt: "Se a sequência é 2, 4, 8, 16... qual é o próximo?"
    },
    difficulty: 4,
    options: [
      { id: 'A', text: '24', isCorrect: false },
      { id: 'B', text: '32', isCorrect: true },
      { id: 'C', text: '20', isCorrect: false },
      { id: 'D', text: '64', isCorrect: false },
    ]
  },
  {
    id: 4,
    type: 'pattern',
    questionText: {
      en: "Visual Analogy: Hand is to Glove as Foot is to...?",
      pt: "Analogia Visual: Mão está para Luva assim como Pé está para...?"
    },
    difficulty: 2,
    options: [
      { id: 'A', text: 'Shoe', isCorrect: false }, // Too simple?
      { id: 'B', text: 'Sock', isCorrect: true },  // Closer analogy (clothing layer)
      { id: 'C', text: 'Leg', isCorrect: false },
      { id: 'D', text: 'Toe', isCorrect: false },
    ]
  },
  {
    id: 5,
    type: 'logic',
    questionText: {
      en: "Which block fits the hole?",
      pt: "Qual bloco encaixa no buraco?"
    },
    imageUrl: "https://picsum.photos/600/300?random=2&grayscale",
    difficulty: 6,
    options: [
      { id: 'A', text: 'Shape A', isCorrect: false },
      { id: 'B', text: 'Shape B', isCorrect: false },
      { id: 'C', text: 'Shape C', isCorrect: true },
      { id: 'D', text: 'Shape D', isCorrect: false },
    ]
  }
];

// Helper to get questions based on mode
// Using deterministic generation to prevent key issues in React
export const getQuestions = (mode: 'basic' | 'advanced') => {
  const base = questions;
  const count = mode === 'basic' ? 14 : 33;
  let result: Question[] = [];
  
  for (let i = 0; i < count; i++) {
      // Cycle through the base questions
      const baseQuestion = base[i % base.length];
      
      // Create a unique ID for this instance of the question in this specific quiz session
      result.push({
          ...baseQuestion,
          id: i + 1 
      });
  }
  
  return result;
};