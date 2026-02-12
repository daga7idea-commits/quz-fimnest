import React, { useState } from 'react';
import { QUESTIONS } from '../translations';
import { OptionId } from '../types';

interface QuizScreenProps {
  onFinish: (answers: OptionId[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<OptionId[]>([]);
  const [anim, setAnim] = useState(false);

  const q = QUESTIONS[current];

  const handleSelect = (id: OptionId) => {
    if (anim) return;
    const newAnswers = [...answers, id];
    setAnswers(newAnswers);

    if (current < QUESTIONS.length - 1) {
      setAnim(true);
      setTimeout(() => { setCurrent(current + 1); setAnim(false); }, 400);
    } else {
      onFinish(newAnswers);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-1.5 mb-12">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= current ? 'w-6 bg-gold-primary shadow-[0_0_8px_var(--gold-primary)]' : 'w-2 bg-white/10'}`} />
        ))}
      </div>

      <div className={`transition-all duration-500 ${anim ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-gold-primary/40 uppercase tracking-[0.3em] mb-4 block">السؤال {current + 1}</span>
          <h2 className="text-3xl md:text-4xl font-amiri font-bold leading-relaxed text-white">{q.text}</h2>
        </div>

        <div className="flex flex-col gap-4">
          {q.options.map((opt) => (
            <button
              key={opt.id} onClick={() => handleSelect(opt.id)}
              className="group w-full text-right p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-gold-primary/30 hover:bg-white/[0.06] transition-all flex items-center gap-5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-primary font-bold border border-white/10 group-hover:bg-gold-primary group-hover:text-obsidian transition-colors">
                {opt.id}
              </div>
              <span className="text-lg text-white/70 group-hover:text-white transition-colors flex-grow leading-relaxed font-medium">
                {opt.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;