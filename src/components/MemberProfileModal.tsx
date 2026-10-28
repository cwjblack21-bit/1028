import React, { useState } from 'react';
import { X, Sparkles, Crown, Clock, Heart, Gift, LogOut, Package, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/menu';

export const MemberProfileModal: React.FC = () => {
  const {
    user,
    logout,
    isProfileOpen,
    setIsProfileOpen,
    orders,
    favorites,
    addToCart,
    setIsCartOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'perks'>('orders');

  if (!isProfileOpen || !user) return null;

  const favoriteMenuItems = MENU_ITEMS.filter((item) => favorites.includes(item.id));

  const tierName =
    user.tier === 'diamond' ? '雲頂黑鑽會員' : user.tier === 'gold' ? '琥珀金卡會員' : '品味雅集會員';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-[#E5DAC8] overflow-hidden flex flex-col">
        
        {/* Header with Luxury Membership Card */}
        <div className="bg-gradient-to-br from-[#2D241E] via-[#3D3128] to-[#1E1712] text-white p-6 relative">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#C59B63]" />
                <span className="text-[11px] font-serif-display uppercase tracking-widest text-[#C59B63]">
                  {tierName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-semibold">
                {user.name} 貴賓
              </h2>
              <div className="text-xs text-[#D1C3B2] flex items-center gap-2">
                <span>{user.email}</span>
                <span>·</span>
                <span>入會年份：{user.joinDate}</span>
              </div>
            </div>

            {/* Points Balance Pill */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-right sm:min-w-36">
              <div className="text-[10px] uppercase tracking-wider text-[#C59B63] font-serif-display">
                Solde de Points · 沐時點數
              </div>
              <div className="text-2xl font-serif-display font-semibold text-[#F3E7D3] font-mono tabular-nums">
                {user.points} <span className="text-xs font-normal text-white/70">pts</span>
              </div>
              <div className="text-[10px] text-white/60">可於結帳全額折抵</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8DEC8] bg-[#F2ECE1]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-[#FAF7F2] text-[#2C2119] border-b-2 border-[#936639] font-semibold'
                : 'text-[#6E5D4D] hover:text-[#26211E]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>午茶訂單紀錄 ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-[#FAF7F2] text-[#2C2119] border-b-2 border-[#936639] font-semibold'
                : 'text-[#6E5D4D] hover:text-[#26211E]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>心願清單 ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('perks')}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'perks'
                ? 'bg-[#FAF7F2] text-[#2C2119] border-b-2 border-[#936639] font-semibold'
                : 'text-[#6E5D4D] hover:text-[#26211E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#936639]" />
            <span>會員權益與優惠券</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#7A6B5B] space-y-2">
                  <p>尚無歷史午茶點餐紀錄</p>
                  <p className="font-serif-tc">隨時為自己點一壺好茶與酥脆千層派吧</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-xl p-4 border border-[#EBE1D0] space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs border-b border-[#F5EFE6] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-[#2C2119]">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[#8F7D6B] font-mono">{ord.createdAt}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EFE8DD] text-[#7A5A35]">
                        {ord.status === 'completed'
                          ? '已送達享用'
                          : ord.status === 'baking'
                          ? '主廚烘烤製作中'
                          : ord.status === 'delivering'
                          ? '低溫專車配送中'
                          : '訂單處理中'}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="space-y-1.5 text-xs">
                      {ord.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between text-[#5C4C3E]">
                          <span>
                            {i.item.name} × {i.quantity}
                          </span>
                          <span className="font-mono tabular-nums">NT$ {i.totalPrice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F5EFE6] text-xs">
                      <div className="text-[#7F6E5E]">
                        {ord.deliveryType === 'delivery'
                          ? '專車冷鏈外送'
                          : ord.deliveryType === 'pickup'
                          ? '敦化旗艦門市自取'
                          : '沙龍內用席位'}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm font-mono tabular-nums text-[#936639]">
                          NT$ {ord.totalAmount}
                        </span>
                        <button
                          onClick={() => {
                            // Re-order items
                            ord.items.forEach((it) => addToCart(it.item, it.quantity, it.customizations));
                            setIsProfileOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="px-2.5 py-1 text-[11px] rounded bg-[#2D241E] text-white hover:bg-[#43362D] transition-colors"
                        >
                          再次點購
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Favorites */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {favoriteMenuItems.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#7A6B5B] space-y-2">
                  <p>您尚未收藏任何午茶點心</p>
                  <p className="font-serif-tc">在菜單點心卡片右上角點擊愛心即可收藏</p>
                </div>
              ) : (
                favoriteMenuItems.map((fav) => (
                  <div
                    key={fav.id}
                    className="bg-white rounded-xl p-3.5 border border-[#EBE1D0] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8DEC8]">
                        <img
                          src={fav.image}
                          alt={fav.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#8C7A68] font-serif-display uppercase">
                          {fav.frenchName}
                        </div>
                        <h4 className="text-xs font-semibold text-[#2C2119]">{fav.name}</h4>
                        <div className="text-xs font-mono tabular-nums text-[#936639] font-medium">
                          NT$ {fav.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(fav, 1);
                        setIsProfileOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium bg-[#2D241E] hover:bg-[#43362D] text-white rounded-lg transition-colors whitespace-nowrap"
                    >
                      加入購物袋
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Perks & Coupons */}
          {activeTab === 'perks' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white rounded-xl p-4 border border-[#EBE1D0] space-y-2">
                <h4 className="font-semibold text-[#2C2119] flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#C59B63]" />
                  <span>琥珀金卡會員專屬特權</span>
                </h4>
                <ul className="space-y-1.5 text-[#6D5D4D] list-disc list-inside">
                  <li>全店點餐享 <span className="text-[#936639] font-semibold">5% 點數回饋</span> (1點 = NT$1)</li>
                  <li>雙北專車低溫冷鏈免運門檻降至 NT$1,200</li>
                  <li>生日月份獲贈主廚特製馬卡龍禮盒雙入提貨券</li>
                  <li>主廚當季新品預約試吃會優先席位</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#2C2119]">我的可用午後優惠券</h4>

                <div className="p-3 bg-white rounded-xl border border-[#EBE1D0] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#2C2119] block">午後時光 9 折專屬優惠碼</span>
                    <span className="text-[11px] text-[#8C7A68]">輸入優惠代碼：AFTERNOON10</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#936639] font-bold bg-[#EFE8DD] px-2 py-1 rounded">
                    全單 9 折
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EBE1D0] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#2C2119] block">金卡甜心禮遇金 NT$50</span>
                    <span className="text-[11px] text-[#8C7A68]">輸入優惠代碼：GOLDEN50</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#936639] font-bold bg-[#EFE8DD] px-2 py-1 rounded">
                    折抵 $50
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Logout */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] flex items-center justify-between">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>登出會員帳號</span>
          </button>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="px-5 py-2 bg-[#2D241E] text-white rounded-xl text-xs font-medium hover:bg-[#43362D] transition-colors"
          >
            關閉專區
          </button>
        </div>

      </div>
    </div>
  );
};
