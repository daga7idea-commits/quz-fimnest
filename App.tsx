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
      setStep(AppStep.QUIZ);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishQuiz = (finalAnswers: OptionId[]) => {
    setAnswers(finalAnswers);
    setStep(AppStep.RESULT);
  };

  const result = useMemo(() => {
    if (answers.length === 0) return null;
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    let dominant: OptionId = 'ج';
    let max = 0;
    (Object.keys(counts) as OptionId[]).forEach(k => {
      if (counts[k] > max) { max = counts[k]; dominant = k; }
    });
    return RESULTS[dominant];
  }, [answers]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Decorative BG elements */}
      <div className="blob-bg w-[400px] h-[400px] bg-gold-primary/10 -top-20 -right-20"></div>
      <div className="blob-bg w-[300px] h-[300px] bg-rose-soft/5 bottom-0 -left-20"></div>

      <main className="w-full max-w-xl z-10 animate-fade-up">
        {step === AppStep.WELCOME && <WelcomeScreen onStart={handleStartQuiz} isLoading={loading} />}
        {step === AppStep.QUIZ && <QuizScreen onFinish={handleFinishQuiz} />}
        {step === AppStep.RESULT && result && (
          <ResultScreen result={result} userName={userData?.name || ''} onReset={() => setStep(AppStep.WELCOME)} />
        )}
      </main>

      <footer className="mt-12 opacity-30 text-[10px] uppercase tracking-[0.4em] text-center font-light">
        Loud Femininity • 2024
      </footer>
    </div>
  );
};

export default App;