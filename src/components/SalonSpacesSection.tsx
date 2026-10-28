import React, { useState } from 'react';
import { Sun, Volume2, Users, Compass, Calendar, Check, ArrowRight, Sparkles } from 'lucide-react';
import { SALON_SEATING_ZONES } from '../data/seating';
import { SeatingZone } from '../types';
import { useApp } from '../context/AppContext';

export const SalonSpacesSection: React.FC = () => {
  const { setDeliveryType, setIsCheckoutOpen, cart, addToCart } = useApp();
  const [activeZone, setActiveZone] = useState<SeatingZone>(SALON_SEATING_ZONES[0]);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const displayZone =
    SALON_SEATING_ZONES.find((z) => z.id === hoveredZoneId) || activeZone;

  const handleReserveSpace = (zone: SeatingZone) => {
    setActiveZone(zone);
    setDeliveryType('dinein');
    setIsCheckoutOpen(true);
  };

  return (
    <section id="spaces" className="py-20 md:py-28 bg-[#F4EDE2] border-t border-[#E8DEC8] relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#936639] font-serif-display font-semibold flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Les Espaces du Salon · 沙龍座席體驗</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-semibold text-[#26211E] tracking-tight">
            為您的午後，挑選專屬的私享角落
          </h2>
          <p className="text-sm sm:text-base text-[#6F6052] font-serif-tc leading-relaxed">
            從灑滿天光的法式溫室窗席、暖意漫溢的真火壁爐沙發，到可近距離欣賞茶藝的大理石吧台。
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4 Interactive Seating Zone Cards with Exquisite Hover Animations */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SALON_SEATING_ZONES.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              const isHovered = hoveredZoneId === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  className={`relative p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                    isSelected
                      ? 'border-[#936639] shadow-md ring-2 ring-[#936639]/30 bg-white'
                      : isHovered
                      ? 'border-[#B8A492] shadow-sm -translate-y-1'
                      : 'border-[#E5DAC8] hover:border-[#C59B63]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-serif-display uppercase tracking-widest text-[#936639] font-semibold bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EDE2D1]">
                        {zone.atmosphereBadge}
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#936639]">
                          <Check className="w-3.5 h-3.5" />
                          <span>已選定</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#8C7A68]">
                          {zone.capacityRange}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-serif-display font-semibold text-[#26211E] group-hover:text-[#936639] transition-colors">
                        {zone.name}
                      </h3>
                      <div className="text-xs text-[#8C7A68] font-serif-display italic">
                        {zone.frenchName}
                      </div>
                    </div>

                    <p className="text-xs text-[#6F6052] font-serif-tc leading-relaxed line-clamp-2">
                      {zone.description}
                    </p>
                  </div>

                  {/* Micro Specs Indicators */}
                  <div className="pt-4 border-t border-[#F2ECE1] mt-4 space-y-1.5 text-[11px] text-[#7A6957]">
                    <div className="flex items-center gap-2">
                      <Sun className="w-3 h-3 text-[#936639] shrink-0" />
                      <span className="truncate">{zone.lighting}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3 h-3 text-[#936639] shrink-0" />
                      <span className="truncate">{zone.soundscape}</span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>即時開放預訂 ({zone.availableTables} 桌)</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReserveSpace(zone);
                        }}
                        className="text-[11px] text-[#936639] hover:text-[#2D241E] font-medium flex items-center gap-1 underline underline-offset-4 decoration-[#936639]/40"
                      >
                        <span>預約此席</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Immersive Selected Zone Visual Showcase Box */}
          <div className="lg:col-span-5 bg-[#261E18] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border border-[#48392D] relative overflow-hidden">
            {/* Visual Photo with Zoom Effect */}
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 group">
              <img
                src={displayZone.image}
                alt={displayZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3 bg-[#1E1712]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#E5C392] font-serif-display uppercase tracking-wider">
                {displayZone.atmosphereBadge}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="text-xs text-[#C59B63] font-serif-display italic">
                  {displayZone.frenchName}
                </div>
                <div className="text-lg font-serif-display font-semibold">
                  {displayZone.name}
                </div>
              </div>
            </div>

            {/* In-depth details */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="text-[11px] text-[#C59B63] font-serif-display uppercase tracking-widest">
                  Ambiance & Décoration · 席位體驗
                </div>
                <p className="text-xs sm:text-sm text-[#D8CBBC] font-serif-tc leading-relaxed">
                  {displayZone.description}
                </p>
              </div>

              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#E5D7C7]">
                  <Users className="w-3.5 h-3.5 text-[#C59B63]" />
                  <span>適合場合：{displayZone.suitableFor}</span>
                </div>
                <div className="flex items-center gap-2 text-[#E5D7C7]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B63]" />
                  <span>專屬禮遇：{displayZone.highlight}</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <button
              onClick={() => handleReserveSpace(displayZone)}
              className="w-full py-3.5 px-4 bg-[#C59B63] hover:bg-[#B3874E] text-[#1E1712] font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4 text-[#1E1712]" />
              <span>線上指定【{displayZone.name}】並預訂午茶</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
