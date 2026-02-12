
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
      <h3 className="text-mystic-rose text-xl font-light mb-2">عزيزتي {userName}، نتيجتك هي:</h3>
      <h2 
        className="text-4xl md:text-5xl font-amiri font-bold mb-8 drop-shadow-lg"
        style={{ color: result.color }}
      >
        {result.title}
      </h2>

      <div className="glass-card p-8 rounded-3xl mb-12">
        <p className="text-lg md:text-xl leading-loose text-white/80 font-light italic">
          "{result.description}"
        </p>
      </div>

      <button 
        onClick={onReset}
        className="mx-auto bg-white/5 border border-white/10 text-white font-medium py-4 px-12 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
      >
        إعادة الاختبار
      </button>
    </div>
  );
};

export default ResultScreen;
