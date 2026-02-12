
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
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-amiri font-bold gold-gradient mb-4 leading-tight">مقياس الأنوثة الصاخبة</h1>
        <p className="text-mystic-rose/60 text-lg font-light italic">رحلة لاكتشاف سحر طاقتكِ الكامن</p>
      </header>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2 text-right">
            <label className="text-xs uppercase tracking-widest text-mystic-gold/60 mr-1">الاسم الكريم</label>
            <input 
              required
              type="text"
              className="premium-input"
              placeholder="اسمكِ الجميل..."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2 text-right">
            <label className="text-xs uppercase tracking-widest text-mystic-gold/60 mr-1">الحالة الاجتماعية</label>
            <div className="relative">
              <select 
                required
                className="premium-input appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="" disabled>اختاري حالتك...</option>
                <option value="عزباء">عزباء</option>
                <option value="متزوجة">متزوجة</option>
                <option value="منفصلة">منفصلة</option>
                <option value="أرملة">أرملة</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-mystic-gold/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <label className="text-xs uppercase tracking-widest text-mystic-gold/60 mr-1">وسيلة التواصل (واتساب/إيميل)</label>
            <input 
              required
              type="text"
              dir="ltr"
              className="premium-input text-left"
              placeholder="example@mail.com"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="premium-button mt-4"
          >
            {isLoading ? (
              <span className="w-6 h-6 border-2 border-mystic-black/20 border-t-mystic-black rounded-full animate-spin"></span>
            ) : (
              "ابدئي رحلة الاكتشاف الآن"
            )}
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-white/30 text-[10px] leading-relaxed max-w-xs mx-auto italic font-light">
        "الأنوثة ليست مجرد مظهر، بل هي طاقة تشع من الداخل لتغير واقعك وتجذب لكِ كل ما تستحقين."
      </p>
    </div>
  );
};

export default WelcomeScreen;
