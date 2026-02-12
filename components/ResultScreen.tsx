
import React, { useEffect, useState } from 'react';
import { QuizResult } from '../types';

interface ResultScreenProps {
  result: QuizResult;
  userName: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, userName, onReset }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`text-center transition-all duration-1000 ease-out transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="relative mb-12 inline-block">
        <div className="absolute inset-0 bg-mystic-gold/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative w-32 h-32 mx-auto rounded-full border-2 border-mystic-gold/30 flex items-center justify-center bg-mystic-black shadow-[0_0_60px_rgba(212,175,55,0.2)]">
          <svg className="w-16 h-16 text-mystic-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
          </svg>
        </div>
      </div>

      <p className="text-mystic-rose/80 text-xl font-light mb-2 tracking-wide">عزيزتي {userName}، نتيجتك هي:</p>
      <h2 
        className="text-5xl md:text-7xl font-amiri font-bold mb-10 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
        style={{ color: result.color }}
      >
        {result.title}
      </h2>

      <div className="glass-card p-10 rounded-[3rem] mb-12 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
        <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light italic">
          "{result.description}"
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <button 
          onClick={onReset}
          className="premium-button bg-none border border-white/10 !bg-transparent !text-white hover:!bg-white/10"
        >
          إعادة الاختبار
        </button>
        <div className="text-[11px] text-white/20 uppercase tracking-[0.4em] mt-6 font-bold">
          Mystique Consciousness
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
