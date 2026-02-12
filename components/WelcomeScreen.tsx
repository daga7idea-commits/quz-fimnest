import React, { useState } from 'react';
import { UserData } from '../types';

interface WelcomeScreenProps {
  onStart: (data: UserData) => void;
  isLoading: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    status: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.status || !formData.contact) return;
    onStart(formData);
  };

  return (
    <div className="w-full">
      <header className="mb-14 text-center">
        <h1 className="text-5xl md:text-7xl font-amiri font-bold gold-gradient mb-5 leading-tight tracking-tight">مقياس الأنوثة الصاخبة</h1>
        <p className="text-white/40 text-lg font-light tracking-[0.1em] uppercase">رحلة لاكتشاف سحر طاقتكِ الكامن</p>
      </header>

      <div className="glass-card rounded-[2.5rem] p-10 md:p-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="space-y-3 text-right">
            <label className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold font-bold mr-1">الاسم الكريم</label>
            <input 
              required
              type="text"
              className="premium-input"
              placeholder="كيف نلقبكِ؟"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-3 text-right">
            <label className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold font-bold mr-1">الحالة الاجتماعية</label>
            <div className="relative">
              <select 
                required
                className="premium-input appearance-none cursor-pointer pr-5"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="" disabled>اختاري حالتك...</option>
                <option value="عزباء">عزباء</option>
                <option value="متزوجة">متزوجة</option>
                <option value="منفصلة">منفصلة</option>
                <option value="أرملة">أرملة</option>
              </select>
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-mystic-gold/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-right">
            <label className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold font-bold mr-1">وسيلة التواصل (واتساب/إيميل)</label>
            <input 
              required
              type="text"
              dir="ltr"
              className="premium-input text-left"
              placeholder="contact@elegance.com"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="premium-button mt-4 shadow-xl shadow-mystic-gold/10"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-mystic-black/20 border-t-mystic-black rounded-full animate-spin"></span>
            ) : (
              "بدء الجلسة الاستكشافية"
            )}
          </button>
        </form>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4 text-white/20">
        <div className="h-px w-8 bg-current"></div>
        <p className="text-[10px] italic font-light max-w-[280px] text-center">
          "الأنوثة طاقة كونية تشع من الداخل لتغير واقعك"
        </p>
        <div className="h-px w-8 bg-current"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;