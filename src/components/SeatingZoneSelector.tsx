import React, { useState } from 'react';
import { Sparkles, Sun, Volume2, Users, Check, MapPin, Eye, Compass } from 'lucide-react';
import { SALON_SEATING_ZONES } from '../data/seating';
import { SeatingZone } from '../types';

interface SeatingZoneSelectorProps {
  selectedZoneId?: string;
  onSelectZone: (zone: SeatingZone) => void;
  isCompact?: boolean;
}

export const SeatingZoneSelector: React.FC<SeatingZoneSelectorProps> = ({
  selectedZoneId = 'zone-garden-window',
  onSelectZone,
  isCompact = false,
}) => {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone =
    SALON_SEATING_ZONES.find((z) => z.id === (hoveredZoneId || selectedZoneId)) ||
    SALON_SEATING_ZONES[0];

  const selectedZone =
    SALON_SEATING_ZONES.find((z) => z.id === selectedZoneId) || SALON_SEATING_ZONES[0];

  return (
    <div className="space-y-4">
      {/* Header / Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#936639]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3D3126]">
              挑選沙龍偏好座位區 / Choix de l'Espace
            </h4>
          </div>
          <p className="text-[11px] text-[#786756] font-serif-tc">
            滑鼠懸浮或點擊探索不同角落的採光、聲學氛圍與窗景特色
          </p>
        </div>

        {/* Selected Zone Quick Indicator */}
        <div className="text-xs bg-white px-3 py-1.5 rounded-xl border border-[#DDD3C2] flex items-center gap-2 shadow-xs shrink-0">
          <span className="text-[#8A7968] text-[11px]">已指定席位：</span>
          <span className="font-semibold text-[#936639]">{selectedZone.name}</span>
        </div>
      </div>

      {/* Interactive Salon Architectural Blueprint View */}
      <div className="relative bg-[#261E18] text-[#F3EADB] rounded-2xl p-4 sm:p-5 border border-[#45372C] overflow-hidden shadow-lg">
        {/* Subtle decorative background architectural grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6C2A5_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-6">
          
          {/* Left: Interactive Architectural Map Layout */}
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#BCAEA0] border-b border-white/10 pb-2">
              <span className="font-serif-display uppercase tracking-widest text-[#C59B63]">
                Plan du Salon · 沙龍座席平面配置
              </span>
              <span className="text-[10px]">點擊區塊即可選定茶席</span>
            </div>

            {/* Salon Zones Grid Representation */}
            <div className="grid grid-cols-2 gap-2.5">
              {SALON_SEATING_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                const isHovered = hoveredZoneId === zone.id;

                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => onSelectZone(zone)}
                    onMouseEnter={() => setHoveredZoneId(zone.id)}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-300 group overflow-hidden ${
                      isSelected
                        ? 'bg-[#3E3127] border-[#C59B63] shadow-md ring-1 ring-[#C59B63]/60'
                        : isHovered
                        ? 'bg-[#332820] border-[#936639] -translate-y-0.5'
                        : 'bg-[#2E241D]/90 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Active Indicator Pip */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-serif-display uppercase tracking-wider text-[#C59B63]">
                        {zone.atmosphereBadge}
                      </span>
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-[#C59B63] text-[#1E1712] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] text-white/40 group-hover:text-white/80 transition-colors">
                          {zone.capacityRange}
                        </span>
                      )}
                    </div>

                    <div className="font-semibold text-xs text-[#FAF7F2] truncate group-hover:text-[#E8D4B4] transition-colors">
                      {zone.name}
                    </div>

                    <div className="text-[10px] text-[#A89887] truncate font-serif-display italic mt-0.5">
                      {zone.frenchName}
                    </div>

                    {/* Live table availability tag */}
                    <div className="mt-2 text-[10px] flex items-center gap-1.5 text-[#D1C2AF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>席位預約開放中 (尚餘 {zone.availableTables} 桌)</span>
                    </div>

                    {/* Subtle corner indicator on selection */}
                    {isSelected && (
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[#C59B63]/30 to-transparent pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-[#8E7E70] flex items-center justify-between pt-1">
              <span>※ 沙龍全面實施桌距 1.5 米私密間隔</span>
              <span>敦化門市旗艦席位</span>
            </div>
          </div>

          {/* Right: Dynamic Hover & Selection Feature Spotlight Box with Rich Animations */}
          <div className="md:w-64 lg:w-72 bg-[#1E1712] rounded-xl border border-white/15 p-3.5 flex flex-col justify-between space-y-3 transition-all duration-300">
            {/* Live Visual Photo with Ambient Glow */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-white/10 group">
              <img
                src={activeZone.image}
                alt={activeZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-2 left-2 bg-[#2D241E]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#E8D4B4] font-serif-display uppercase">
                {activeZone.atmosphereBadge}
              </div>

              <div className="absolute bottom-2 left-2 right-2 text-white">
                <div className="text-[10px] text-[#C59B63] font-serif-display italic truncate">
                  {activeZone.frenchName}
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {activeZone.name}
                </div>
              </div>
            </div>

            {/* Hovered Zone Detailed Acoustic, Lighting & Feature Specs */}
            <div className="space-y-2 text-[11px] text-[#C5B5A5]">
              <p className="text-[11px] text-[#E2D5C7] leading-relaxed line-clamp-2 font-serif-tc">
                {activeZone.description}
              </p>

              <div className="space-y-1 pt-1 border-t border-white/10 text-[10px]">
                <div className="flex items-start gap-1.5">
                  <Sun className="w-3 h-3 text-[#E5C392] shrink-0 mt-0.5" />
                  <span className="text-[#D6C7B7]">{activeZone.lighting}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Volume2 className="w-3 h-3 text-[#E5C392] shrink-0 mt-0.5" />
                  <span className="text-[#D6C7B7]">{activeZone.soundscape}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Users className="w-3 h-3 text-[#E5C392] shrink-0 mt-0.5" />
                  <span className="text-[#D6C7B7]">{activeZone.suitableFor}</span>
                </div>
              </div>

              {/* Special perk */}
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[10px] text-[#E0D0BD]">
                <span className="text-[#C59B63] font-semibold">特選禮遇：</span>
                {activeZone.highlight}
              </div>
            </div>

            {/* Select this zone button if not selected */}
            {selectedZoneId !== activeZone.id && (
              <button
                type="button"
                onClick={() => onSelectZone(activeZone)}
                className="w-full py-1.5 text-xs font-medium text-white bg-[#936639] hover:bg-[#A67543] rounded-lg transition-colors text-center shadow-xs"
              >
                選定此座席區
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
