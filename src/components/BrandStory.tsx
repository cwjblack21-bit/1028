import React from 'react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#936639] font-serif-display font-semibold">
            Notre Philosophie · 沙龍美學精神
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-semibold text-[#26211E] tracking-tight">
            時光在茶香中緩步停留
          </h2>
          <p className="text-sm sm:text-base text-[#6F6052] font-serif-tc leading-relaxed">
            我們相信，一份好的下午茶不只是味覺的甘甜，而是一段重拾內心平靜與儀式感的靜謐時光。
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-[#EBE0CF] space-y-4 shadow-xs">
            <span className="text-xs font-serif-display text-[#936639] tracking-widest uppercase font-semibold">
              01. Terroir & Ingrédients
            </span>
            <h3 className="text-lg font-serif-display font-semibold text-[#26211E]">
              法國諾曼第發酵奶油與波旁香草
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5F50] font-serif-tc leading-relaxed">
              堅持使用諾曼第 Isigny Sainte-Mère 原產發酵奶油，歷經 16 小時低溫天然熟成；搭配馬達加斯加手工採摘頂級波旁香草莢，賦予酥皮與奶餡最純淨深邃的香氣。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#EBE0CF] space-y-4 shadow-xs">
            <span className="text-xs font-serif-display text-[#936639] tracking-widest uppercase font-semibold">
              02. Artisanat Cuisson
            </span>
            <h3 className="text-lg font-serif-display font-semibold text-[#26211E]">
              晨光慢火烘烤 · 當日限量手作
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5F50] font-serif-tc leading-relaxed">
              每日清晨六點由主廚親手揉製折疊千層派皮與司康麵團，絕不添加人工香精與防腐劑。每一塊點心都保留了出爐時最頂級的層次與酥脆口感。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#EBE0CF] space-y-4 shadow-xs">
            <span className="text-xs font-serif-display text-[#936639] tracking-widest uppercase font-semibold">
              03. Service & Écrin
            </span>
            <h3 className="text-lg font-serif-display font-semibold text-[#26211E]">
              保冷專車直送 · 專屬精緻封緘
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5F50] font-serif-tc leading-relaxed">
              外送採用全程 4°C 恆溫冷鏈配送車隊，搭配特製防震加厚保冷禮盒與絲質緞帶包裝，確保送達您指尖時宛如親臨巴黎精品沙龍。
            </p>
          </div>
        </div>

        {/* Quote Strip */}
        <div className="border-t border-b border-[#E8DFC9] py-8 text-center max-w-3xl mx-auto space-y-2">
          <p className="font-serif-display text-lg sm:text-xl text-[#3D3126] italic">
            "Le temps perdu n'est jamais perdu quand on le passe autour d'une tasse de thé."
          </p>
          <p className="text-xs text-[#8A7967] font-serif-tc">
            「只要是在茶香裊裊的時光裡度過，就從來不是虛度。」—— Maison de Thé 沐時午後
          </p>
        </div>

      </div>
    </section>
  );
};
