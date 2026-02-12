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
      <div className="relative mb-16 inline-block">
        <div className="absolute inset-0 bg-mystic-gold/10 blur-[80px] rounded-full animate-pulse"></div>
        <div className="relative w-40 h-40 mx-auto rounded-full border border-mystic-gold/20 flex items-center justify-center bg-[#050206] shadow-[0_0_80px_rgba(197,160,89,0.15)] overflow-hidden">
          {/* Subtle spinning light effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-mystic-gold/5 to-transparent animate-[spin_10s_linear_infinite]"></div>
          <svg className="w-20 h-20 text-mystic-gold relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
          </svg>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <p className="text-mystic-rose/60 text-xl font-light tracking-[0.2em] uppercase italic">عزيزتي {userName}</p>
        <h2 
          className="text-6xl md:text-8xl font-amiri font-bold drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-tight"
          style={{ color: result.color }}
        >
          {result.title}
        </h2>
      </div>

      <div className="glass-card p-12 rounded-[3.5rem] mb-16 relative group max-w-2xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mystic-gold/10 border border-mystic-gold/20 px-6 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase text-mystic-gold font-bold backdrop-blur-xl">
          الجوهر الطاقي
        </div>
        <p className="text-2xl md:text-3xl leading-[1.8] text-white/90 font-light italic font-amiri">
          "{result.description}"
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button 
          onClick={onReset}
          className="premium-button min-w-[240px] !bg-transparent border border-mystic-gold/20 !text-mystic-gold hover:!bg-mystic-gold hover:!text-mystic-black transition-all duration-700 group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <svg className="w-4 h-4 transition-transform duration-700 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            رحلة جديدة
          </span>
        </button>
        
        <div className="text-[10px] text-white/10 uppercase tracking-[0.8em] mt-4 font-bold">
          Mystique Consciousness
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;