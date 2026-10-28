import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { SOMMELIER_PAIRINGS, MENU_ITEMS } from '../data/menu';
import { useApp } from '../context/AppContext';

export const SommelierSection: React.FC = () => {
  const { addToCart, setIsCartOpen } = useApp();
  const [addedPairingIdx, setAddedPairingIdx] = useState<number | null>(null);

  // Interactive Mood Sommelier Widget
  const [selectedMood, setSelectedMood] = useState<'relax' | 'luxury' | 'fruity' | 'chocolate'>('relax');

  const moodRecommendations = {
    relax: {
      title: '靜謐放鬆 · 溫柔香草與澄澈花香',
      desc: '在忙碌節奏中沉澱心靈，讓馬達加斯加波旁香草的滑順，陪伴初綻花茶的悠長清甜。',
      dessertId: 'pastry-millefeuille',
      teaId: 'tea-blooming',
    },
    luxury: {
      title: '極致犒賞 · 凡爾賽皇家雙人盛典',
      desc: '與珍愛之人共享華麗三層午茶塔，從溫熱司康到法式馬卡龍，譜寫巴黎宮廷般的午後。',
      dessertId: 'set-versailles',
      teaId: 'tea-darjeeling',
    },
    fruity: {
      title: '果香清爽 · 白桃伯爵與檸檬糖霜',
      desc: '輕盈無負擔的微酸果香，西西里檸檬皮屑的清新香氣搭配慢速低溫冷萃白桃茶湯。',
      dessertId: 'baked-madeleine',
      teaId: 'tea-peach-earlgrey',
    },
    chocolate: {
      title: '濃醇沉醉 · 72% 歌劇院黑金與大吉嶺夏摘',
      desc: '深度烘焙咖啡酒糖液浸潤的杏仁海綿，遇上夏摘大吉嶺的麝香葡萄木質底蘊。',
      dessertId: 'pastry-opera',
      teaId: 'tea-darjeeling',
    },
  };

  const handleAddPairingBundle = (dessertId: string, teaId: string, idx: number) => {
    const dessertItem = MENU_ITEMS.find((m) => m.id === dessertId);
    const teaItem = MENU_ITEMS.find((m) => m.id === teaId);

    if (dessertItem) addToCart(dessertItem, 1);
    if (teaItem) addToCart(teaItem, 1);

    setAddedPairingIdx(idx);
    setTimeout(() => {
      setAddedPairingIdx(null);
      setIsCartOpen(true);
    }, 500);
  };

  const activeMoodRec = moodRecommendations[selectedMood];
  const activeMoodDessert = MENU_ITEMS.find((m) => m.id === activeMoodRec.dessertId);
  const activeMoodTea = MENU_ITEMS.find((m) => m.id === activeMoodRec.teaId);

  return (
    <section id="sommelier" className="py-16 md:py-24 bg-[#F5EEE4] border-y border-[#EADBCA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#936639] font-serif-display font-semibold">
            Le Sommelier du Thé · 侍茶師特選指南
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-semibold text-[#26211E] tracking-tight">
            茶與甜點的完美二重奏
          </h2>
          <p className="text-sm sm:text-base text-[#6F6052] font-serif-tc">
            茶葉中微苦的單寧洗滌甜膩，甜點中的天然奶油則喚醒茶湯深處的熟果花香。
          </p>
        </div>

        {/* 3 Curated Pairing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOMMELIER_PAIRINGS.map((pairing, idx) => {
            const isAdded = addedPairingIdx === idx;

            return (
              <div
                key={pairing.title}
                className="bg-white rounded-2xl p-6 border border-[#E8DFC9] shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-serif-display uppercase tracking-wider text-[#936639] font-semibold">
                      {pairing.tag}
                    </span>
                    <span className="text-xs text-neutral-400 font-serif-display">0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-serif-display font-semibold text-[#26211E]">
                    {pairing.title}
                  </h3>

                  {/* Dual Thumbnail Display */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8]">
                        <img
                          src={pairing.dessertImage}
                          alt={pairing.dessertName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[11px] text-[#473A2E] font-medium truncate">
                        {pairing.dessertName}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DEC8]">
                        <img
                          src={pairing.teaImage}
                          alt={pairing.teaName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[11px] text-[#473A2E] font-medium truncate">
                        {pairing.teaName}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#6F6052] leading-relaxed font-serif-tc pt-2">
                    {pairing.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xs text-[#8A7865]">雙品合購禮遇價</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs line-through text-neutral-400 font-mono tabular-nums">
                        NT$ {pairing.setPrice}
                      </span>
                      <span className="text-base font-semibold text-[#936639] font-mono tabular-nums">
                        NT$ {pairing.discountPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPairingBundle(pairing.dessertId, pairing.teaId, idx)}
                    disabled={isAdded}
                    className="w-full py-2.5 px-4 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>已將雙品加入購物袋</span>
                      </>
                    ) : (
                      <>
                        <span>一鍵加入組合購物袋</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59B63]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Mood Recommendation Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4D7C2] shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-serif-display uppercase tracking-widest text-[#936639] font-semibold">
                Personnalisé · 今日午後探索
              </div>
              <h3 className="text-xl font-serif-display font-semibold text-[#26211E]">
                您今天想要如何度過午後時光？
              </h3>
            </div>

            {/* Mood Segmented Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE8DD] rounded-xl overflow-x-auto">
              {[
                { id: 'relax', label: '沉靜放鬆' },
                { id: 'luxury', label: '隆重盛典' },
                { id: 'fruity', label: '果香清雅' },
                { id: 'chocolate', label: '濃黑沉醉' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedMood(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedMood === tab.id
                      ? 'bg-[#2D241E] text-white shadow-xs'
                      : 'text-[#5C4D3E] hover:text-[#26211E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#EDE2D1] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-lg">
              <h4 className="text-base font-serif-display font-semibold text-[#2D241E]">
                {activeMoodRec.title}
              </h4>
              <p className="text-xs text-[#6F6052] leading-relaxed font-serif-tc">
                {activeMoodRec.desc}
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-[#8A7764]">
                <span>搭配點心：{activeMoodDessert?.name}</span>
                <span>·</span>
                <span>搭配茗茶：{activeMoodTea?.name}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (activeMoodDessert) addToCart(activeMoodDessert, 1);
                if (activeMoodTea) addToCart(activeMoodTea, 1);
                setIsCartOpen(true);
              }}
              className="px-5 py-2.5 bg-[#936639] hover:bg-[#7D532B] text-white rounded-xl text-xs font-medium transition-colors whitespace-nowrap shadow-sm shrink-0"
            >
              依此推薦一鍵點餐
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
