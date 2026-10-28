import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeliveryType } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryType,
    setDeliveryType,
    couponCode,
    appliedDiscount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    user,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1200;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const deliveryFee = deliveryType === 'delivery' && cartSubtotal < FREE_SHIPPING_THRESHOLD ? 120 : 0;
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E6DBCA] flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8DEC8] flex items-center justify-between bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#936639]" />
              <h2 className="text-base font-serif-display font-semibold text-[#26211E]">
                您的午茶購物袋
              </h2>
              <span className="text-xs font-mono tabular-nums text-[#8A7967] bg-[#EFE8DD] px-2 py-0.5 rounded-full">
                {cart.length} 件
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#6E5E4E] hover:text-[#26211E] hover:bg-[#F2ECE1] transition-colors"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Mode Tabs: Segmented Buttons */}
          <div className="p-4 bg-[#F2ECE1] border-b border-[#E4D7C2]">
            <div className="grid grid-cols-3 gap-1 bg-[#E8DFC9] p-1 rounded-xl">
              {(
                [
                  { id: 'delivery', label: '冷鏈外送' },
                  { id: 'pickup', label: '門市自取' },
                  { id: 'dinein', label: '沙龍內用' },
                ] as { id: DeliveryType; label: string }[]
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setDeliveryType(mode.id)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                    deliveryType === mode.id
                      ? 'bg-white text-[#2D241E] shadow-xs'
                      : 'text-[#675747] hover:text-[#26211E]'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Delivery threshold tip */}
            {deliveryType === 'delivery' && (
              <div className="mt-2.5 text-[11px] text-[#706050] flex items-center justify-between">
                <span>雙北冷鏈直送滿 NT$1,200 免運</span>
                <span className="font-mono tabular-nums text-[#936639] font-medium">
                  {remainingForFreeShipping === 0
                    ? '已達免運門檻 🎉'
                    : `還差 NT$ ${remainingForFreeShipping}`}
                </span>
              </div>
            )}
          </div>

          {/* Itemized Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#936639]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#2C2219]">購物袋目前是空的</p>
                  <p className="text-xs text-[#82715F] font-serif-tc">
                    為您的午後時光挑選幾款精緻甜品與茗茶吧
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-[#2D241E] text-white rounded-xl text-xs font-medium hover:bg-[#43362D] transition-colors"
                >
                  前往挑選點心
                </button>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-white rounded-xl p-4 border border-[#EBE1D0] shadow-xs flex gap-3.5"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8DEC8]">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Customization */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#2D241E] truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItem.cartId)}
                          className="text-neutral-400 hover:text-rose-500 p-0.5 transition-colors"
                          title="移除商品"
                          aria-label="移除此商品"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Options notes */}
                      <div className="text-[11px] text-[#857463] space-y-0.5 mt-0.5">
                        {cartItem.customizations.temperature && (
                          <div>溫控：{cartItem.customizations.temperature}</div>
                        )}
                        {cartItem.customizations.sweetness && (
                          <div>甜度：{cartItem.customizations.sweetness}</div>
                        )}
                        {cartItem.customizations.clottedCream && (
                          <div>+ 德文郡凝脂奶油 (+NT$45)</div>
                        )}
                        {cartItem.customizations.extraJam && (
                          <div>+ 玫瑰草莓手工果醬 (+NT$35)</div>
                        )}
                        {cartItem.customizations.giftPackaging && (
                          <div>+ 尊榮燙金禮盒與午後卡 (+NT$60)</div>
                        )}
                        {cartItem.customizations.specialInstructions && (
                          <div className="italic text-[#936639]">
                            註：「{cartItem.customizations.specialInstructions}」
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1] mt-2">
                      <div className="flex items-center gap-2 bg-[#F7F3EB] px-2 py-0.5 rounded-lg border border-[#E4D7C2]">
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, -1)}
                          className="text-[#6B5A4B] hover:text-[#26211E]"
                          aria-label="減少"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold tabular-nums text-[#26211E] w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, 1)}
                          className="text-[#6B5A4B] hover:text-[#26211E]"
                          aria-label="增加"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-semibold font-mono tabular-nums text-[#2C2119]">
                        NT$ {cartItem.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8DEC8] bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="優惠碼 (試試: AFTERNOON10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DDD3C2] text-[#2C2119] placeholder:text-[#9F8F7E] focus:outline-none focus:border-[#936639] uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#936639] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-medium bg-[#EFE8DD] text-[#3E3227] hover:bg-[#E5DBCB] rounded-lg transition-colors border border-[#D9CEBC]"
                  >
                    套用
                  </button>
                </div>

                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <span>已套用優惠碼: {couponCode}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] underline hover:text-emerald-950"
                    >
                      移除
                    </button>
                  </div>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6F5E4E] border-t border-[#F2ECE1] pt-3">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span className="font-mono tabular-nums text-[#2D241E]">
                    NT$ {cartSubtotal}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>優惠折抵</span>
                    <span className="font-mono tabular-nums">- NT$ {appliedDiscount}</span>
                  </div>
                )}

                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>低溫冷鏈運費</span>
                    <span className="font-mono tabular-nums">
                      {deliveryFee === 0 ? '免費直送' : `NT$ ${deliveryFee}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-[#EDE4D5] text-sm font-semibold text-[#2D241E]">
                  <span>總金額 (TWD)</span>
                  <span className="text-base font-mono tabular-nums text-[#936639]">
                    NT$ {finalTotal}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-sm font-medium transition-all shadow-md flex items-center justify-between group"
              >
                <span>前往結帳確認</span>
                <div className="flex items-center gap-1.5 font-mono tabular-nums text-[#E6C697]">
                  <span>NT$ {finalTotal}</span>
                  <ArrowRight className="w-4 h-4 text-[#C59B63] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
