
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
    <div className="fade-in text-center">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-amiri font-bold gold-gradient mb-4">مقياس الأنوثة الصاخبة</h1>
        <p className="text-mystic-rose/80 text-lg font-light tracking-wide">اكتشفي قوتكِ الخفية وتناغمكِ مع ذاتك</p>
      </header>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl shadow-2xl flex flex-col gap-6 text-right">
        <div className="space-y-2">
          <label className="block text-sm text-mystic-gold font-medium">الاسم</label>
          <input 
            required
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mystic-gold/50 transition-all text-white text-right"
            placeholder="أدخلِ اسمك هنا..."
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-mystic-gold font-medium">الحالة الاجتماعية</label>
          <select 
            required
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mystic-gold/50 transition-all text-white text-right appearance-none"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="" disabled>اختاري حالتك...</option>
            <option value="عزباء">عزباء</option>
            <option value="متزوجة">متزوجة</option>
            <option value="منفصلة">منفصلة</option>
            <option value="أرملة">أرملة</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-mystic-gold font-medium">رقم الواتساب أو الإيميل</label>
          <input 
            required
            type="text"
            dir="ltr"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mystic-gold/50 transition-all text-white text-left"
            placeholder="example@mail.com / +966..."
            value={formData.contact}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-gradient-to-r from-mystic-gold to-mystic-rose text-mystic-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="w-6 h-6 border-2 border-mystic-black/30 border-t-mystic-black rounded-full animate-spin"></span>
          ) : (
            "ابدئي رحلة الاكتشاف"
          )}
        </button>
      </form>

      <p className="mt-8 text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
        هذا المقياس صُمم بوعي ليساعدكِ على فهم طاقتكِ وتطويرها للوصول لأقصى مراحل التجلي والجاذبية.
      </p>
    </div>
  );
};

export default WelcomeScreen;
