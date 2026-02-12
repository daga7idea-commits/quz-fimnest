
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
    <div className={`fade-in text-center transition-all duration-1000 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-mystic-gold/20 blur-3xl rounded-full"></div>
        <div 
          className="relative w-24 h-24 mx-auto rounded-full flex items-center justify-center border-2 border-mystic-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-mystic-black"
        >
          <svg className="w-12 h-12 text-mystic-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      </div>

      <h3 className="text-mystic-rose text-xl font-light mb-2">عزيزتي {userName}، نتيجتك هي:</h3>
      <h2 
        className="text-4xl md:text-5xl font-amiri font-bold mb-8 drop-shadow-lg"
        style={{ color: result.color }}
      >
        {result.title}
      </h2>

      <div className="glass-card p-8 rounded-3xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-mystic-gold/5 rounded-bl-full"></div>
        <p className="text-lg md:text-xl leading-loose text-white/80 font-light italic">
          "{result.description}"
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <button 
          onClick={onReset}
          className="bg-white/5 border border-white/10 text-white font-medium py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          إعادة الاختبار
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        <p className="text-white/30 text-xs mt-4">
          شاركي النتيجة مع صديقاتك لتكتشفن معاً سر الأنوثة الصاخبة
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;
