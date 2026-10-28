import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#241C16] text-[#D8CBBC] pt-16 pb-12 border-t border-[#382C23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="text-xl font-serif-display font-semibold text-[#FAF7F2] tracking-wider">
              Maison de Thé
              <span className="block text-xs font-serif-tc tracking-widest text-[#B59676] font-normal mt-0.5">
                沐時午後 · 甜點沙龍
              </span>
            </div>
            <p className="text-xs text-[#A89887] font-serif-tc leading-relaxed">
              法式手工烘烤千層酥與莊園原葉茗茶的私享空間。在日光斜映的午後，為您呈獻最精緻的舌尖饗宴。
            </p>
          </div>

          {/* Salon Location & Hours */}
          <div className="space-y-3 md:col-span-1 text-xs">
            <div className="text-[11px] font-serif-display uppercase tracking-wider text-[#C59B63] font-semibold">
              Boutique & Salon · 門市資訊
            </div>
            <div className="space-y-2 text-[#B8A796]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B63] shrink-0 mt-0.5" />
                <span>台北市大安區敦化南路一段 188 號 1 樓</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C59B63] shrink-0" />
                <span>週二至週日 12:00 - 19:30 (週一休館)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B63] shrink-0" />
                <span>02-2775-8890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-1 text-xs">
            <div className="text-[11px] font-serif-display uppercase tracking-wider text-[#C59B63] font-semibold">
              Découvrir · 典藏目錄
            </div>
            <ul className="space-y-2 text-[#A89887]">
              <li><a href="#grand-sets" className="hover:text-white transition-colors">凡爾賽三層午茶塔</a></li>
              <li><a href="#patisserie" className="hover:text-white transition-colors">馬達加斯加香草千層派</a></li>
              <li><a href="#scones-baked" className="hover:text-white transition-colors">英式德文郡金黃奶油司康</a></li>
              <li><a href="#artisanal-tea" className="hover:text-white transition-colors">初綻金盞茉莉花果茶</a></li>
              <li><a href="#sommelier" className="hover:text-white transition-colors">侍茶師推薦搭配</a></li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div className="space-y-3 md:col-span-1 text-xs">
            <div className="text-[11px] font-serif-display uppercase tracking-wider text-[#C59B63] font-semibold">
              Engagement · 服務承諾
            </div>
            <ul className="space-y-1.5 text-[#A89887]">
              <li>· 採用諾曼第 Isigny A.O.P. 原產發酵奶油</li>
              <li>· 雙北地區專屬 4°C 低溫冷鏈專車直送</li>
              <li>· 尊榮會員筆筆消費享 5% 點數回饋</li>
              <li>· 支援線上刷卡、LINE Pay、Apple Pay 結帳</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#382C23] text-center text-xs text-[#8A7969] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Maison de Thé 沐時午後. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>隱私權政策</span>
            <span>·</span>
            <span>服務條款</span>
            <span>·</span>
            <span>常溫冷藏宅配說明</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
