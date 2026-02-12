import React, { useState } from 'react';
import { QUESTIONS } from '../translations';
import { OptionId } from '../types';

interface QuizScreenProps {
  onFinish: (answers: OptionId[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<OptionId[]>([]);
  const [animating, setAnimating] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (optionId: OptionId) => {
    if (animating) return;

    const newAnswers = [...selectedAnswers, optionId];
    setSelectedAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setAnimating(false);
      }, 500);
    } else {
      onFinish(newAnswers);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/[0.03] z-50">
        <div 
          className="h-full bg-gradient-to-r from-mystic-gold via-mystic-gold-bright to-mystic-rose transition-all duration-700 ease-out shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`transition-all duration-500 ease-out transform ${animating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-mystic-gold/10 bg-mystic-gold/5 text-mystic-gold text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">
            Step {currentIndex + 1} / {QUESTIONS.length}
          </div>
          <h2 className="text-3xl md:text-5xl font-amiri font-bold leading-snug text-white/95 drop-shadow-2xl">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid gap-5 mt-12">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="w-full text-right p-7 rounded-[1.5rem] glass-card group flex items-center gap-7 transition-all duration-300 hover:bg-white/[0.05] hover:border-mystic-gold/20 active:scale-[0.98] border-white/5"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-mystic-gold group-hover:bg-mystic-gold group-hover:text-mystic-black transition-all duration-500 font-bold text-xl shadow-inner">
                {option.id}
              </div>
              <span className="text-lg md:text-xl text-white/60 group-hover:text-white transition-colors flex-grow leading-relaxed">
                {option.text}
              </span>
              <div className="w-1 h-0 bg-mystic-gold group-hover:h-8 transition-all duration-500 rounded-full"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;