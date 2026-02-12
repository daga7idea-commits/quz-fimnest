
import React, { useState, useMemo } from 'react';
import { QUESTIONS, RESULTS } from './translations';
import { AppStep, UserData, OptionId } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './constants';
import './index.css';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<OptionId[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async (data: UserData) => {
    setLoading(true);
    setUserData(data);

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `✨ عميلة جديدة ✨\n\n👤 الاسم: ${data.name}\n💍 الحالة: ${data.status}\n📱 التواصل: ${data.contact}`
        })
      });
      setStep(AppStep.QUIZ);
    } catch (error) {
      console.error("Telegram error:", error);
      setStep(AppStep.QUIZ);
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
    <div className="min-h-screen bg-mystic-black text-white selection:bg-mystic-rose selection:text-white relative overflow-hidden font-cairo">
      {/* Background Decor - Blobs */}
      <div className="blob w-[600px] h-[600px] bg-mystic-purple/20 -top-[10%] -right-[10%]"></div>
      <div className="blob w-[500px] h-[500px] bg-mystic-rose/10 -bottom-[10%] -left-[10%] delay-700"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <main className="w-full max-w-lg animate-fade-in">
          {step === AppStep.WELCOME && (
            <WelcomeScreen onStart={handleStartQuiz} isLoading={loading} />
          )}
          
          {step === AppStep.QUIZ && (
            <QuizScreen onFinish={handleFinishQuiz} />
          )}

          {step === AppStep.RESULT && calculatedResult && (
            <ResultScreen 
              result={calculatedResult} 
              onReset={() => {
                setStep(AppStep.WELCOME);
                setAnswers([]);
              }} 
              userName={userData?.name || ''} 
            />
          )}
        </main>

        <footer className="mt-12 text-center text-white/10 text-[10px] uppercase tracking-[0.5em] font-light">
          Mystique & Elegance Portfolio © 2024
        </footer>
      </div>
    </div>
  );
};

export default App;
