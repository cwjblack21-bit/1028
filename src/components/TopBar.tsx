import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Heart, Sparkles, X, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const {
    user,
    cartCount,
    setIsCartOpen,
    setIsAuthModalOpen,
    setIsProfileOpen,
    favorites,
  } = useApp();

  const [showPromoBanner, setShowPromoBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/60 transition-all">
      {/* Promotional Ribbon - Slim, dismissible, <= 40px */}
      {showPromoBanner && (
        <div className="bg-[#2D241E] text-[#F3EAD8] text-xs py-2 px-4 flex items-center justify-between border-b border-[#3D322A]">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="text-[#C59B63] font-serif-display tracking-widest text-[11px] uppercase">Salon Privilège</span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span>新會員註冊即贈 NT$200 點心金</span>
            <span className="text-white/40">·</span>
            <span>全館滿 NT$1,200 享雙北低溫冷鏈免運直送</span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-white/60 hover:text-white p-1 transition-colors"
            aria-label="關閉公告"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Header Contract: Brand Zone — Nav Links — Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="text-xl sm:text-2xl font-serif-display tracking-wider text-[#26211E] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-baseline gap-2"
        >
          <span className="font-semibold">Maison de Thé</span>
          <span className="text-sm tracking-widest font-normal text-[#8A7865] font-serif-tc">沐時午後</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5E5144]">
          <a
            href="#grand-sets"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            午茶盛宴
          </a>
          <a
            href="#patisserie"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            法式極致甜點
          </a>
          <a
            href="#scones-baked"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            溫熱司康與常溫
          </a>
          <a
            href="#artisanal-tea"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            莊園花果茗茶
          </a>
          <a
            href="#sommelier"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            侍茶師推薦
          </a>
          <a
            href="#story"
            className="hover:text-[#936639] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C59B63]/60"
          >
            沙龍哲學
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Member Profile / Login Button */}
          {user ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#2C231C] bg-[#EFE8DD] hover:bg-[#E5DBCB] rounded-lg transition-colors whitespace-nowrap shrink-0 border border-[#DDD3C1]"
              title="查看會員專區"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#936639]" />
              <span className="hidden sm:inline font-serif-tc">{user.name}</span>
              <span className="text-[10px] text-[#936639] font-serif-display uppercase tracking-wider bg-white/70 px-1.5 py-0.5 rounded">
                {user.tier === 'diamond' ? '鑽石黑卡' : user.tier === 'gold' ? '琥珀金卡' : '品味會員'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5E5144] hover:text-[#26211E] hover:bg-[#EFE8DD]/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <UserIcon className="w-4 h-4 text-[#936639]" />
              <span>會員登入 / 註冊</span>
            </button>
          )}

          {/* Cart Bag Action Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-lg text-[#FAF7F2] bg-[#2D241E] hover:bg-[#43362D] transition-colors shadow-sm whitespace-nowrap shrink-0"
            aria-label="查看購物袋"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#B85D38] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
