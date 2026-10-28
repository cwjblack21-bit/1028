import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check, Sparkles, MapPin, Calendar, Clock, Users, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SeatingZoneSelector } from './SeatingZoneSelector';
import { SALON_SEATING_ZONES } from '../data/seating';
import { SeatingZone } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryType,
    setDeliveryType,
    appliedDiscount,
    user,
    createOrder,
  } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.savedAddresses?.[0] || '台北市大安區敦化南路一段 188 號 12 樓');
  const [deliverySlot, setDeliverySlot] = useState('下午茶精華時段 14:00 - 16:00');
  const [dineinGuests, setDineinGuests] = useState(2);
  const [dineinTime, setDineinTime] = useState('今日午後 14:30');
  const [selectedZone, setSelectedZone] = useState<SeatingZone>(SALON_SEATING_ZONES[0]);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'line_pay' | 'apple_pay' | 'counter'>('credit_card');
  const [usePoints, setUsePoints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1200;
  const deliveryFee = deliveryType === 'delivery' && cartSubtotal < FREE_SHIPPING_THRESHOLD ? 120 : 0;
  
  // Member Points logic: 1 point = NT$1 discount up to 50% of subtotal
  const maxPointsCanUse = user ? Math.min(user.points, Math.floor(cartSubtotal * 0.5)) : 0;
  const pointsDeduction = usePoints ? maxPointsCanUse : 0;
  const grandTotal = Math.max(0, cartSubtotal - appliedDiscount - pointsDeduction + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('請填寫完整的收件聯絡人資訊');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setErrorMessage('請填寫完整的宅配收件地址');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      createOrder({
        deliveryType,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        address: deliveryType === 'delivery' ? address : undefined,
        pickupOrDineinTime: deliveryType === 'dinein' ? dineinTime : deliverySlot,
        guestCount: deliveryType === 'dinein' ? dineinGuests : undefined,
        seatingZone: deliveryType === 'dinein' ? selectedZone.name : undefined,
        paymentMethod,
        usePoints,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-[#E5DAC8] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white/80 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif-display uppercase tracking-widest text-[#936639] font-semibold">
              Règlement · 訂單結帳
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs text-[#705F4E] font-serif-tc">
              {deliveryType === 'delivery' ? '低溫專車外送' : deliveryType === 'pickup' ? '門市自取' : '沙龍內用預約'}
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-[#6E5E4E] hover:bg-[#F2ECE1] transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Section 1: Customer Contact Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#403429] uppercase tracking-wider flex items-center gap-2">
              <span>01. 顧客與訂餐人資訊</span>
              {user && (
                <span className="text-[10px] text-[#936639] font-normal font-serif-display">
                  (已帶入 {user.name} 會員資料)
                </span>
              )}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#695847] block mb-1">姓名 *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#695847] block mb-1">行動電話 *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx-xxx-xxx"
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#695847] block mb-1">電子郵件 *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Service Mode & Delivery/Dine-in Details */}
          <div className="space-y-4 pt-2 border-t border-[#E8DFC9]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
                02. 服務模式與預約細節
              </h3>

              {/* Mode Switcher Segmented Control */}
              <div className="flex items-center gap-1 bg-[#E8DFC9] p-0.5 rounded-lg">
                {[
                  { id: 'dinein', label: '沙龍內用預約' },
                  { id: 'delivery', label: '冷鏈外送' },
                  { id: 'pickup', label: '門市自取' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDeliveryType(mode.id as any)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                      deliveryType === mode.id
                        ? 'bg-[#2D241E] text-white shadow-xs'
                        : 'text-[#615142] hover:text-[#26211E]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {deliveryType === 'delivery' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-[#695847] block mb-1">低溫直送地址 *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="請填寫完整地址 (例: 台北市大安區...)"
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119] focus:outline-none focus:border-[#936639]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#695847] block mb-1">希望送達時段</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      '午間搶先 11:30 - 13:00',
                      '下午茶時段 14:00 - 16:00',
                      '傍晚餘暉 16:30 - 18:30',
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        className={`p-2 text-xs rounded-xl border text-center transition-all ${
                          deliverySlot === slot
                            ? 'bg-[#2D241E] text-white border-[#2D241E]'
                            : 'bg-white text-[#5C4C3E] border-[#DDD3C2]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {deliveryType === 'pickup' && (
              <div className="p-4 bg-white rounded-xl border border-[#DDD3C2] space-y-2 text-xs text-[#5E4E3F]">
                <div className="font-semibold text-[#2D241E] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#936639]" />
                  <span>Maison de Thé 敦化旗艦沙龍店</span>
                </div>
                <p>門市地址：台北市大安區敦化南路一段 188 號 1 樓</p>
                <p>取貨營業時間：12:00 - 19:30 (每日現烤點心出爐)</p>
                <div className="pt-1">
                  <label className="text-[11px] text-[#695847] block mb-1">預計到店取貨時間</label>
                  <input
                    type="text"
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    placeholder="例如：今日 15:30"
                    className="w-full text-xs p-2 rounded-lg bg-[#FAF7F2] border border-[#DDD3C2]"
                  />
                </div>
              </div>
            )}

            {deliveryType === 'dinein' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#695847] block mb-1">預約入座時間</label>
                    <input
                      type="text"
                      value={dineinTime}
                      onChange={(e) => setDineinTime(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#695847] block mb-1">貴賓人數</label>
                    <select
                      value={dineinGuests}
                      onChange={(e) => setDineinGuests(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#2C2119]"
                    >
                      <option value={1}>1 位貴賓 (專屬單人沙發茶席)</option>
                      <option value={2}>2 位貴賓 (經典雙人窗景茶席)</option>
                      <option value={3}>3 位貴賓 (花園陽光雅席)</option>
                      <option value={4}>4 位貴賓 (凡爾賽長桌沙發席)</option>
                      <option value={5}>5-6 位貴賓 (圓頂宮廷大席)</option>
                    </select>
                  </div>
                </div>

                {/* Interactive Seating Zone Selector Component */}
                <div className="pt-1">
                  <SeatingZoneSelector
                    selectedZoneId={selectedZone.id}
                    onSelectZone={(zone) => setSelectedZone(zone)}
                  />
                </div>

                <p className="text-[11px] text-[#8C7A68]">
                  ※ 內用席位保留 15 分鐘，抵達沙龍時為您優先引導至【{selectedZone.name}】，點餐內容將依序以純銀三層塔或溫熱骨瓷壺呈上。
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Member Points Redemption */}
          {user && maxPointsCanUse > 0 && (
            <div className="p-4 bg-[#EFE8DD] rounded-xl border border-[#D9CDBC] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#2C2119] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#936639]" />
                  <span>使用沐時會員點數折抵</span>
                </div>
                <div className="text-[11px] text-[#7A6957]">
                  您目前擁有 <span className="font-mono font-semibold text-[#936639]">{user.points}</span> 點 (最多可折抵 NT$ {maxPointsCanUse})
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                  className="w-4 h-4 accent-[#936639] rounded"
                />
                <span className="text-xs font-medium text-[#2C2119]">
                  {usePoints ? `已折抵 NT$ ${maxPointsCanUse}` : '折抵此筆訂單'}
                </span>
              </label>
            </div>
          )}

          {/* Section 4: Payment Method */}
          <div className="space-y-3 pt-2 border-t border-[#E8DFC9]">
            <h3 className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
              03. 選擇付款方式
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'credit_card', label: '信用卡付款' },
                { id: 'line_pay', label: 'LINE Pay' },
                { id: 'apple_pay', label: 'Apple Pay' },
                { id: 'counter', label: '現場付款' },
              ].map((pm) => (
                <button
                  type="button"
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`py-2.5 px-2 text-xs rounded-xl border text-center transition-all ${
                    paymentMethod === pm.id
                      ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-xs'
                      : 'bg-white text-[#5C4C3E] border-[#DDD3C2]'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'credit_card' && (
              <div className="p-4 bg-white rounded-xl border border-[#DDD3C2] space-y-2.5">
                <div className="text-[11px] text-[#786756] flex items-center justify-between">
                  <span>信用卡交易環境 (256-bit SSL 安全加密)</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <input
                  type="text"
                  placeholder="卡號: 4242 ···· ···· 4242"
                  defaultValue="4000 1234 5678 9010"
                  className="w-full text-xs p-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C2] font-mono tabular-nums"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="到期日 MM/YY"
                    defaultValue="12/28"
                    className="text-xs p-2 rounded-lg bg-[#FAF7F2] border border-[#DDD3C2] font-mono"
                  />
                  <input
                    type="text"
                    placeholder="安全碼 CVC"
                    defaultValue="888"
                    className="text-xs p-2 rounded-lg bg-[#FAF7F2] border border-[#DDD3C2] font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Order Itemization Summary */}
          <div className="pt-3 border-t border-[#E8DFC9] space-y-2 text-xs text-[#6F5F4F]">
            <div className="flex justify-between">
              <span>共 {cart.length} 款點心商品小計</span>
              <span className="font-mono tabular-nums text-[#2D241E]">NT$ {cartSubtotal}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>優惠代碼折抵</span>
                <span className="font-mono tabular-nums">- NT$ {appliedDiscount}</span>
              </div>
            )}

            {pointsDeduction > 0 && (
              <div className="flex justify-between text-[#936639]">
                <span>會員點數折抵</span>
                <span className="font-mono tabular-nums">- NT$ {pointsDeduction}</span>
              </div>
            )}

            {deliveryType === 'delivery' && (
              <div className="flex justify-between">
                <span>低溫冷鏈運費</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? '免運直送' : `NT$ ${deliveryFee}`}
                </span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t border-[#EDE4D5] text-sm font-semibold text-[#2D241E]">
              <span>應付總額 (TWD)</span>
              <span className="text-lg font-mono tabular-nums text-[#936639]">
                NT$ {grandTotal}
              </span>
            </div>
          </div>

          {/* Submit Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>處理訂單與付款中...</span>
            ) : (
              <>
                <span>確認下單並完成預訂</span>
                <span className="font-mono tabular-nums text-[#E6C697] text-xs">
                  (NT$ {grandTotal})
                </span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
