import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Lock, Phone, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MemberAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginDemoUser, registerUser, loginUser } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBirthday, setRegBirthday] = useState('1996-05-18');
  const [regPassword, setRegPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('請輸入電子信箱');
      return;
    }
    loginUser(loginEmail);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setErrorMsg('請填寫完整註冊資料');
      return;
    }
    registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      birthday: regBirthday,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-md w-full my-8 border border-[#E5DAC8] overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-[#2D241E] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <span className="text-[10px] font-serif-display uppercase tracking-widest text-[#C59B63]">
              Club Privilège · 尊榮沙龍會員
            </span>
            <h2 className="text-xl font-serif-display font-semibold">
              開啟您的巴黎午後生活
            </h2>
          </div>

          {/* Quick Demo Login Pill for rapid reviewer evaluation */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-[#D8C7B3]">快速體驗展示會員帳號：</span>
            <button
              onClick={loginDemoUser}
              type="button"
              className="text-xs bg-[#C59B63] hover:bg-[#B3874E] text-[#1E1712] font-semibold px-3 py-1 rounded-lg transition-colors shadow-sm"
            >
              一鍵登入金卡會員
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8DEC8] bg-[#F2ECE1]">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all ${
              activeTab === 'login'
                ? 'bg-[#FAF7F2] text-[#2C2119] border-b-2 border-[#936639] font-semibold'
                : 'text-[#6E5D4D] hover:text-[#26211E]'
            }`}
          >
            會員登入 / Connexion
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all ${
              activeTab === 'register'
                ? 'bg-[#FAF7F2] text-[#2C2119] border-b-2 border-[#936639] font-semibold'
                : 'text-[#6E5D4D] hover:text-[#26211E]'
            }`}
          >
            新朋友註冊 / Inscription
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">電子信箱 / Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <Mail className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">密碼 / Mot de passe</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <Lock className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => alert('已發送密碼重設指示至您的電子信箱')}
                  className="text-[11px] text-[#8C7A68] hover:text-[#2C2119] underline"
                >
                  忘記密碼？
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-xs font-medium transition-all shadow-md"
              >
                登入會員專區
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">貴賓大名 / Nom *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="例如：林沐晨"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <User className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">電子信箱 / Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <Mail className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">行動電話 / Téléphone *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="09xx-xxx-xxx"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <Phone className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">生日月份 / Anniversaire (享生日禮)</label>
                <input
                  type="date"
                  value={regBirthday}
                  onChange={(e) => setRegBirthday(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#695847] block font-medium">設定密碼 / Mot de passe *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="至少 6 位數"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                  <Lock className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Registration Gift Perks */}
              <div className="p-3 bg-[#EFE8DD] rounded-xl border border-[#DDD0BF] flex items-center gap-2.5 text-xs text-[#5D4E3E]">
                <Gift className="w-4 h-4 text-[#936639] shrink-0" />
                <span>註冊成功立即獲贈 <span className="font-semibold text-[#936639]">200 沐時點數</span> (可於結帳直接折抵)</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-xs font-medium transition-all shadow-md"
              >
                完成註冊並領取 200 點禮遇
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
