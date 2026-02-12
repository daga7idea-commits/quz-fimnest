import React, { useState } from 'react';
import { UserData } from '../types';

interface WelcomeScreenProps {
  onStart: (data: UserData) => void;
  isLoading: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({ name: '', status: '', contact: '' });

  return (
    <div className="text-center">
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl gold-text mb-3">مقياس الأنوثة</h1>
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase">كشف الجوهر الطاقي الكامن</p>
      </div>

      <div className="premium-card">
        <form 
          className="flex flex-col gap-6" 
          onSubmit={(e) => { e.preventDefault(); onStart(formData); }}
        >
          <div className="text-right space-y-2">
            <label className="text-[10px] font-bold text-gold-primary/60 uppercase tracking-widest mr-1">الاسم الكريم</label>
            <input 
              required className="input-royal" placeholder="كيف نلقبكِ؟"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="text-right space-y-2">
            <label className="text-[10px] font-bold text-gold-primary/60 uppercase tracking-widest mr-1">الحالة الاجتماعية</label>
            <select 
              required className="input-royal"
              value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="" disabled>اختاري حالتك...</option>
              <option value="عزباء">عزباء</option>
              <option value="متزوجة">متزوجة</option>
              <option value="منفصلة">منفصلة</option>
              <option value="أرملة">أرملة</option>
            </select>
          </div>

          <div className="text-right space-y-2">
            <label className="text-[10px] font-bold text-gold-primary/60 uppercase tracking-widest mr-1">رقم التواصل أو الإيميل</label>
            <input 
              required className="input-royal text-left" dir="ltr" placeholder="contact@elegance.com"
              value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})}
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-royal mt-4">
            {isLoading ? "جاري البدء..." : "بدء جلسة الاستكشاف"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-[10px] text-white/20 italic font-light">
        "بياناتكِ في أمان تام وتعامل بخصوصية ملكية"
      </p>
    </div>
  );
};

export default WelcomeScreen;