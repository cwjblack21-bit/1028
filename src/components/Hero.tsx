import React from 'react';
import { Sparkles, Clock, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/menu';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { setDeliveryType, setIsCartOpen } = useApp();

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Refined Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-widest text-[#936639] uppercase font-serif-display">
              <span className="w-6 h-px bg-[#C59B63]"></span>
              <span>L'Art de Vivre · 法式午後生活美學</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-semibold text-[#26211E] tracking-tight leading-[1.25] text-balance">
              在日光凝結的午後，<br className="hidden sm:inline" />
              品嚐一片巴黎的優雅與溫柔
            </h1>

            <p className="text-base sm:text-lg text-[#635547] font-serif-tc leading-relaxed max-w-xl">
              伊斯尼天然發酵奶油千層摺疊的酥脆薄片、現烤出爐微潤的德文郡凝脂司康，與喜馬拉雅夏摘莊園紅茶交織。我們將巴黎頂級沙龍的精緻儀式感，直送至您的餐桌。
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#grand-sets"
                className="px-6 py-3.5 bg-[#2D241E] text-[#FAF7F2] hover:bg-[#43362D] rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 group whitespace-nowrap"
              >
                <span>探索今日午後點心菜單</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C59B63]" />
              </a>

              <a
                href="#sommelier"
                className="px-5 py-3.5 bg-[#EFE8DD] text-[#3D3126] hover:bg-[#E5DACB] border border-[#D8CCB9] rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
              >
                侍茶師推薦搭配
              </a>
            </div>

            {/* Quick Service Indicator */}
            <div className="pt-6 border-t border-[#E8DFC9] grid grid-cols-3 gap-4 text-xs text-[#706050]">
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-[#2C231C]">雙北低溫保冷</span>
                <span>專車冷鏈直達府上</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-[#2C231C]">每日清晨現烤</span>
                <span>法國頂級發酵奶油</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-[#2C231C]">沙龍尊榮禮遇</span>
                <span>訂製燙金緞帶提盒</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10]">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="Maison de Thé 凡爾賽三層奢華下午茶盛宴"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Visual Vignette / Warm Atmosphere Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                {/* Floating Signature Tag on the visual frame */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-white/90 backdrop-blur-md rounded-xl p-3.5 border border-[#EDE3D2] flex items-center justify-between shadow-lg">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#936639] font-serif-display font-semibold">
                      Signature Collection
                    </div>
                    <div className="text-sm font-semibold text-[#2D241E]">
                      「凡爾賽日光」雙人英法三層午茶塔
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#82715F]">雙人盛宴</div>
                    <div className="text-sm font-semibold text-[#936639] font-mono tabular-nums">
                      NT$ 1,480
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Background Glow */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-[#E8DAC3]/50 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
