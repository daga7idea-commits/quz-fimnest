import React from 'react';
import { QuizResult } from '../types';

interface ResultScreenProps {
  result: QuizResult;
  userName: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, userName, onReset }) => {
  return (
    <div className="text-center animate-fade-up">
      <div className="mb-12">
        <div className="w-24 h-24 mx-auto rounded-full border border-gold-primary/20 flex items-center justify-center bg-white/[0.02] shadow-[0_0_50px_rgba(212,175,55,0.1)] mb-8">
          <svg className="w-12 h-12 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
          </svg>
        </div>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-2">عزيزتي {userName}</p>
        <h2 className="text-5xl md:text-6xl font-amiri font-bold" style={{ color: result.color }}>{result.title}</h2>
      </div>

      <div className="premium-card mb-12">
        <p className="text-xl md:text-2xl leading-[1.8] text-white/80 font-amiri italic font-medium">"{result.description}"</p>
      </div>

      <button onClick={onReset} className="btn-royal max-w-[280px] mx-auto !bg-transparent border border-gold-primary/30 !text-gold-primary hover:!bg-gold-primary/10">
        بدء رحلة جديدة
      </button>
    </div>
  );
};

export default ResultScreen;