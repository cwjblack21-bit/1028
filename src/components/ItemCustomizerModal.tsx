import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Heart, Sparkles } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types';
import { useApp } from '../context/AppContext';

export const ItemCustomizerModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart, toggleFavorite, isFavorite } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'熱沖 Hot' | '冰鎮 Iced' | '常溫 Room Temp'>('熱沖 Hot');
  const [sweetness, setSweetness] = useState<'原味甜度 Standard' | '微甜 Low Sugar' | '無糖 Unsweetened'>('原味甜度 Standard');
  const [clottedCream, setClottedCream] = useState(false);
  const [extraJam, setExtraJam] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Reset when a new item is selected
  useEffect(() => {
    if (customizingItem) {
      setQuantity(1);
      setTemperature('熱沖 Hot');
      setSweetness('原味甜度 Standard');
      setClottedCream(false);
      setExtraJam(false);
      setGiftPackaging(false);
      setSpecialInstructions('');
      setIsAddedSuccess(false);
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  // Calculate pricing
  let unitExtra = 0;
  if (clottedCream) unitExtra += 45;
  if (extraJam) unitExtra += 35;
  if (giftPackaging) unitExtra += 60;

  const unitTotal = customizingItem.price + unitExtra;
  const grandTotal = unitTotal * quantity;

  const handleConfirmAdd = () => {
    const opts: CustomizationOptions = {
      temperature: customizingItem.allowedCustomizations.temperature ? temperature : undefined,
      sweetness: customizingItem.allowedCustomizations.sweetness ? sweetness : undefined,
      clottedCream: customizingItem.allowedCustomizations.clottedCream ? clottedCream : undefined,
      extraJam: customizingItem.allowedCustomizations.extraJam ? extraJam : undefined,
      giftPackaging: customizingItem.allowedCustomizations.giftPackaging ? giftPackaging : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
    };

    addToCart(customizingItem, quantity, opts);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setCustomizingItem(null);
    }, 400);
  };

  const isFav = isFavorite(customizingItem.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E4D9C7] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#936639] font-serif-display font-semibold">
              {customizingItem.categoryName}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs text-[#82715F] font-serif-tc">午茶點心自訂</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(customizingItem.id)}
              className={`p-2 rounded-full border transition-colors ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-[#E0D5C3] text-[#786754] hover:text-rose-500'
              }`}
              title={isFav ? '已在心願清單' : '加入心願清單'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setCustomizingItem(null)}
              className="p-2 rounded-full bg-white border border-[#E0D5C3] text-[#635342] hover:bg-[#F2ECE1] transition-colors"
              aria-label="關閉"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Main Visual & Info Header */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 rounded-xl overflow-hidden aspect-[4/3] bg-[#EFE9DE] border border-[#DDD0BC] shadow-inner">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-2">
              <div className="text-xs text-[#8D7B6A] font-serif-display italic">
                {customizingItem.frenchName}
              </div>
              <h3 className="text-xl font-serif-display font-semibold text-[#26211E]">
                {customizingItem.name}
              </h3>
              <p className="text-sm text-[#675747] leading-relaxed font-serif-tc">
                {customizingItem.description}
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-[#806E5C]">
                {customizingItem.servings && <span>{customizingItem.servings}</span>}
                {customizingItem.calories && (
                  <>
                    <span>·</span>
                    <span>{customizingItem.calories}</span>
                  </>
                )}
              </div>
              <div className="pt-1 text-lg font-mono font-semibold text-[#936639] tabular-nums">
                NT$ {customizingItem.price}
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-5 pt-4 border-t border-[#E8DFC9]">
            {/* Temperature Option (if applicable) */}
            {customizingItem.allowedCustomizations.temperature && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
                  茶飲溫控 / Serving Temperature
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['熱沖 Hot', '冰鎮 Iced', '常溫 Room Temp'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setTemperature(temp)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                        temperature === temp
                          ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                          : 'bg-white text-[#5E4F41] border-[#DDD3C2] hover:border-[#B5A591]'
                      }`}
                    >
                      {temp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sweetness Option (if applicable) */}
            {customizingItem.allowedCustomizations.sweetness && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
                  甜度調整 / Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['原味甜度 Standard', '微甜 Low Sugar', '無糖 Unsweetened'] as const).map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                        sweetness === sw
                          ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                          : 'bg-white text-[#5E4F41] border-[#DDD3C2] hover:border-[#B5A591]'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Accompaniments / Extras */}
            {(customizingItem.allowedCustomizations.clottedCream ||
              customizingItem.allowedCustomizations.extraJam ||
              customizingItem.allowedCustomizations.giftPackaging) && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
                  加購佐料與法式禮盒 / Accompaniments
                </label>
                <div className="space-y-2">
                  {customizingItem.allowedCustomizations.clottedCream && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DDD3C2] hover:border-[#C59B63] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={clottedCream}
                          onChange={(e) => setClottedCream(e.target.checked)}
                          className="w-4 h-4 accent-[#936639] rounded"
                        />
                        <span className="text-sm text-[#3E3227] font-medium">
                          加購英國德文郡凝脂奶油一份 (Cornish Clotted Cream, 35g)
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#936639] tabular-nums">
                        +NT$ 45
                      </span>
                    </label>
                  )}

                  {customizingItem.allowedCustomizations.extraJam && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DDD3C2] hover:border-[#C59B63] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={extraJam}
                          onChange={(e) => setExtraJam(e.target.checked)}
                          className="w-4 h-4 accent-[#936639] rounded"
                        />
                        <span className="text-sm text-[#3E3227] font-medium">
                          加購大馬士革玫瑰草莓手工果醬 (Handcrafted Rose Jam, 30g)
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#936639] tabular-nums">
                        +NT$ 35
                      </span>
                    </label>
                  )}

                  {customizingItem.allowedCustomizations.giftPackaging && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DDD3C2] hover:border-[#C59B63] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={giftPackaging}
                          onChange={(e) => setGiftPackaging(e.target.checked)}
                          className="w-4 h-4 accent-[#936639] rounded"
                        />
                        <div>
                          <span className="text-sm text-[#3E3227] font-medium block">
                            升級法式燙金禮盒與午後手寫祝福卡
                          </span>
                          <span className="text-xs text-[#8A7968]">含絲質緞帶包裝與精美保冷禮袋</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#936639] tabular-nums">
                        +NT$ 60
                      </span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Special Instructions Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#403429] uppercase tracking-wider">
                備註需求 / Special Notes
              </label>
              <input
                type="text"
                placeholder="例如：附慶祝蠟燭一支、堅果過敏提醒、分裝保冷袋..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full text-xs p-3 rounded-xl bg-white border border-[#DDD3C2] focus:outline-none focus:border-[#936639] text-[#2C2219]"
                maxLength={80}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-[#FAF7F2] px-6 py-4 border-t border-[#E8DEC8] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-[#DDD3C2]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-1 rounded text-[#5C4D3E] hover:text-[#26211E] disabled:opacity-30"
              aria-label="減少數量"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-semibold font-mono tabular-nums text-[#26211E] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 rounded text-[#5C4D3E] hover:text-[#26211E]"
              aria-label="增加數量"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Add to Cart CTA */}
          <button
            onClick={handleConfirmAdd}
            disabled={isAddedSuccess}
            className="flex-1 py-3 px-5 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-xl text-sm font-medium transition-all shadow-md flex items-center justify-between gap-2"
          >
            <span>{isAddedSuccess ? '已加入購物袋' : '確認加入購物袋'}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#E6C697] font-mono tabular-nums">
                NT$ {grandTotal}
              </span>
              {isAddedSuccess && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
