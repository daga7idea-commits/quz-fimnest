
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
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-mystic-gold to-mystic-rose transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`transition-all duration-500 transform ${animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-mystic-gold/10 text-mystic-gold text-xs rounded-full border border-mystic-gold/20 mb-4">
            السؤال {currentIndex + 1} من {QUESTIONS.length}
          </span>
          <h2 className="text-2xl md:text-3xl font-amiri font-bold leading-relaxed text-white">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="space-y-4 mt-12">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="w-full text-right p-5 rounded-2xl glass-card border-white/5 hover:border-mystic-gold/40 hover:bg-mystic-gold/5 transition-all group flex items-center gap-4"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-mystic-black border border-white/10 flex items-center justify-center text-mystic-gold group-hover:bg-mystic-gold group-hover:text-mystic-black transition-colors font-bold">
                {option.id}
              </span>
              <span className="text-lg text-white/90 group-hover:text-white transition-colors">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
