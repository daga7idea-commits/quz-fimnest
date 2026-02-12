
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
    <div className="w-full">
      {/* Elegant Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-mystic-gold to-mystic-rose transition-all duration-700 ease-out shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`transition-all duration-500 ease-out transform ${animating ? 'opacity-0 scale-95 -translate-x-10' : 'opacity-100 scale-100 translate-x-0'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-mystic-gold/20 bg-mystic-gold/5 text-mystic-gold text-lg font-bold mb-6 shadow-inner">
            {currentIndex + 1}
          </div>
          <h2 className="text-2xl md:text-4xl font-amiri font-bold leading-relaxed text-white drop-shadow-xl">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid gap-4 mt-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="w-full text-right p-6 rounded-2xl glass-card group flex items-center gap-6 transition-all hover:bg-mystic-gold/10 hover:border-mystic-gold/30 active:scale-[0.98] relative overflow-hidden"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-mystic-gold group-hover:bg-mystic-gold group-hover:text-mystic-black transition-all duration-300 font-bold text-lg">
                {option.id}
              </div>
              <span className="text-lg md:text-xl text-white/70 group-hover:text-white transition-colors flex-grow">
                {option.text}
              </span>
              <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-mystic-gold to-mystic-rose opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
