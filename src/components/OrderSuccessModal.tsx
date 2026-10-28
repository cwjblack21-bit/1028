import React from 'react';
import { CheckCircle2, Sparkles, X, Clock, MapPin, Receipt, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessModal: React.FC = () => {
  const {
    lastCompletedOrder,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    setIsProfileOpen,
  } = useApp();

  if (!isSuccessModalOpen || !lastCompletedOrder) return null;

  const earnedPoints = Math.floor(lastCompletedOrder.totalAmount * 0.05);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-xl w-full my-8 border border-[#E5DAC8] overflow-hidden flex flex-col">
        
        {/* Celebration Banner */}
        <div className="bg-[#2D241E] text-white p-6 text-center space-y-3 relative">
          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-[#C59B63]/20 flex items-center justify-center text-[#E5C392]">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-serif-display uppercase tracking-widest text-[#C59B63]">
              Commande Confirmée · 預約完成
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-display font-semibold tracking-tight">
              感謝您的訂購，美好午後即將抵達
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono tabular-nums text-[#F3E7D3] border border-white/15">
            <span>訂單編號：{lastCompletedOrder.orderNumber}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Points Reward Banner */}
          <div className="p-3.5 bg-[#EFE8DD] rounded-xl border border-[#D9CDBC] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#2C2119]">
              <Sparkles className="w-4 h-4 text-[#936639]" />
              <span>本筆訂單已累積會員回饋：</span>
            </div>
            <span className="text-xs font-mono font-semibold text-[#936639] tabular-nums">
              +{earnedPoints} 沐時點數
            </span>
          </div>

          {/* Simulated Order Status Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
              訂單準備狀態 / Préparation
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#936639]"></div>
                <span className="font-semibold text-[#2C2119]">已接單確認</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#936639]"></div>
                <span className="text-[#936639] font-medium">主廚烘烤中</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#E0D5C3]"></div>
                <span className="text-neutral-400">冷鏈專車配送</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#E0D5C3]"></div>
                <span className="text-neutral-400">已抵達享用</span>
              </div>
            </div>
          </div>

          {/* Delivery & Contact Summary */}
          <div className="bg-white rounded-xl p-4 border border-[#DDD3C2] space-y-2 text-xs text-[#5E4E3E]">
            <div className="flex justify-between">
              <span className="text-[#877665]">訂餐貴賓</span>
              <span className="font-medium text-[#2C2119]">{lastCompletedOrder.customerName} ({lastCompletedOrder.customerPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#877665]">服務模式</span>
              <span className="font-medium text-[#2C2119]">
                {lastCompletedOrder.deliveryType === 'delivery'
                  ? '雙北低溫冷鏈直送'
                  : lastCompletedOrder.deliveryType === 'pickup'
                  ? '敦化旗艦沙龍店自取'
                  : `沙龍內用茶席 (${lastCompletedOrder.guestCount} 位)`}
              </span>
            </div>
            {lastCompletedOrder.seatingZone && (
              <div className="flex justify-between">
                <span className="text-[#877665]">指定座位區</span>
                <span className="font-semibold text-[#936639]">{lastCompletedOrder.seatingZone}</span>
              </div>
            )}
            {lastCompletedOrder.address && (
              <div className="flex justify-between">
                <span className="text-[#877665]">配送地址</span>
                <span className="font-medium text-[#2C2119] text-right max-w-xs">{lastCompletedOrder.address}</span>
              </div>
            )}
            {lastCompletedOrder.pickupOrDineinTime && (
              <div className="flex justify-between">
                <span className="text-[#877665]">預約時段</span>
                <span className="font-medium text-[#2C2119]">{lastCompletedOrder.pickupOrDineinTime}</span>
              </div>
            )}
          </div>

          {/* Itemized Receipt Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#403429] uppercase tracking-wider">
              <Receipt className="w-3.5 h-3.5 text-[#936639]" />
              <span>點餐品項明細</span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#DDD3C2] space-y-3">
              {lastCompletedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-[#F5EFE6] pb-2 last:border-none last:pb-0">
                  <div>
                    <div className="font-medium text-[#2C2119]">
                      {item.item.name} × {item.quantity}
                    </div>
                    {item.customizations.temperature && (
                      <div className="text-[10px] text-[#8C7A68]">溫控：{item.customizations.temperature}</div>
                    )}
                    {item.customizations.sweetness && (
                      <div className="text-[10px] text-[#8C7A68]">甜度：{item.customizations.sweetness}</div>
                    )}
                    {item.customizations.clottedCream && (
                      <div className="text-[10px] text-[#8C7A68]">+ 凝脂奶油</div>
                    )}
                    {item.customizations.extraJam && (
                      <div className="text-[10px] text-[#8C7A68]">+ 玫瑰果醬</div>
                    )}
                    {item.customizations.giftPackaging && (
                      <div className="text-[10px] text-[#8C7A68]">+ 燙金禮盒與卡片</div>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-[#2C2119] font-medium">
                    NT$ {item.totalPrice}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-[#EADBCA] flex justify-between items-baseline text-xs text-[#2C2119] font-semibold">
                <span>實付金額 (含稅)</span>
                <span className="text-base font-mono tabular-nums text-[#936639]">
                  NT$ {lastCompletedOrder.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-white border-t border-[#E8DEC8] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
              setIsProfileOpen(true);
            }}
            className="px-4 py-2.5 text-xs font-medium bg-[#EFE8DD] text-[#3D3126] hover:bg-[#E5DBCB] rounded-xl border border-[#D9CEBC] transition-colors"
          >
            查看會員訂單紀錄
          </button>

          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="px-6 py-2.5 text-xs font-medium bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl transition-colors shadow-sm"
          >
            返回繼續品味點心
          </button>
        </div>

      </div>
    </div>
  );
};
