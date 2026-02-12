
import React, { useState, useMemo } from 'react';
import { QUESTIONS, RESULTS } from './translations';
import { AppStep, UserData, OptionId } from './types';
import WelcomeScreen from './component/WelcomeScreen';
import QuizScreen from './component/QuizScreen';
import ResultScreen from './component/ResultScreen';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<OptionId[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async (data: UserData) => {
    setLoading(true);
    setUserData(data);

    try {
      // إرسال البيانات لتليجرام (يمكن نقل هذا المسار لسيرفر Node.js حقيقي مستقبلاً)
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `الاسم: ${data.name}\nالحالة الاجتماعية: ${data.status}\nرقم الواتساب أو الإيميل: ${data.contact}`
        })
      });
      setStep(AppStep.QUIZ);
    } catch (error) {
      console.error("Telegram notification failed:", error);
      setStep(AppStep.QUIZ); // الاستمرار حتى لو فشل الإرسال
    } finally {
      setLoading(false);
    }
  };

  const handleFinishQuiz = (finalAnswers: OptionId[]) => {
    setAnswers(finalAnswers);
    setStep(AppStep.RESULT);
  };

  const calculatedResult = useMemo(() => {
    if (answers.length === 0) return null;
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let dominant: OptionId = 'ج';
    let max = 0;
    (Object.keys(counts) as OptionId[]).forEach(key => {
      if (counts[key] > max) {
        max = counts[key];
        dominant = key;
      }
    });
    return RESULTS[dominant];
  }, [answers]);

  return (
    <div className="min-h-screen bg-mystic-black text-white selection:bg-mystic-rose selection:text-white overflow-hidden relative font-cairo">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mystic-rose/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <main className="max-w-xl mx-auto px-6 py-12 relative z-10 min-h-screen flex flex-col justify-center">
        {step === AppStep.WELCOME && (
          <WelcomeScreen onStart={handleStartQuiz} isLoading={loading} />
        )}
        
        {step === AppStep.QUIZ && (
          <QuizScreen onFinish={handleFinishQuiz} />
        )}

        {step === AppStep.RESULT && calculatedResult && (
          <ResultScreen 
            result={calculatedResult} 
            onReset={() => setStep(AppStep.WELCOME)} 
            userName={userData?.name || ''} 
          />
        )}
      </main>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30 font-light uppercase tracking-widest pointer-events-none">
        Mystique & Elegance © 2024
      </footer>
    </div>
  );
};

export default App;
