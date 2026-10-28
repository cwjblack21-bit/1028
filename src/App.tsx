/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { SommelierSection } from './components/SommelierSection';
import { BrandStory } from './components/BrandStory';
import { SalonSpacesSection } from './components/SalonSpacesSection';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { MemberAuthModal } from './components/MemberAuthModal';
import { MemberProfileModal } from './components/MemberProfileModal';
import { ShoppingBag } from 'lucide-react';

const MainApp: React.FC = () => {
  const { cartCount, cartSubtotal, setIsCartOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#26211E] flex flex-col font-sans selection:bg-[#EBDDC8]">
      {/* 3-Zone Top Bar Navigation */}
      <TopBar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <SalonSpacesSection />
        <SommelierSection />
        <BrandStory />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Interactive Drawers */}
      <ItemCustomizerModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <MemberAuthModal />
      <MemberProfileModal />

      {/* Mobile Floating Sticky Quick Bag (Adheres to <= 15% mobile viewport cap) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 bg-[#2D241E] text-white rounded-xl shadow-xl flex items-center justify-between border border-white/20 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C59B63]" />
              <span className="text-xs font-semibold">午茶購物袋 ({cartCount} 件)</span>
            </div>
            <div className="text-xs font-mono font-semibold tabular-nums text-[#E6C697]">
              NT$ {cartSubtotal} · 前往確認
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
