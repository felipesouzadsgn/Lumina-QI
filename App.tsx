import React from 'react';
import { useQuizStore } from './store/useQuizStore';
import { useTranslation } from './translations';
import { Home } from './views/Home';
import { Quiz } from './views/Quiz';
import { Calculating } from './views/Calculating';
import { Results } from './views/Results';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const { view, language, setLanguage, resetQuiz } = useQuizStore();

  const renderView = () => {
    switch(view) {
      case 'home': return <Home />;
      case 'quiz': return <Quiz />;
      case 'calculating': return <Calculating />;
      case 'results': return <Results />;
      default: return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-ios-purple selection:text-white">
      
      {/* Dynamic Animated Mesh Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ios-indigo/30 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-ios-purple/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-ios-blue/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div 
          onClick={resetQuiz} 
          className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-2"
        >
          <div className="w-3 h-3 rounded-full bg-ios-cyan shadow-[0_0_10px_#64D2FF]" />
          Lumina
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            {language === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full">
         {renderView()}
      </main>

    </div>
  );
};

export default App;
