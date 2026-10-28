import React, { useState } from 'react';
import { Search, Heart, Plus, Sparkles, Filter } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem, MenuCategory } from '../types';
import { useApp } from '../context/AppContext';

export const MenuSection: React.FC = () => {
  const { setCustomizingItem, toggleFavorite, isFavorite, addToCart } = useApp();

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory | 'all'; label: string; french: string }[] = [
    { id: 'all', label: '全部典藏', french: 'Toute la Collection' },
    { id: 'grand-sets', label: '午茶盛宴', french: 'Grands Plateaux' },
    { id: 'patisserie', label: '法式極致甜點', french: 'Haute Pâtisserie' },
    { id: 'scones-baked', label: '溫熱司康與常溫', french: 'Scones & Biscuits' },
    { id: 'artisanal-tea', label: '莊園花果茗茶', french: 'Thés de Terroir' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.frenchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#936639] font-serif-display font-semibold">
            Carte de Saison · 當季午後獻禮
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-semibold text-[#26211E] tracking-tight">
            沐時手作點心與莊園茗茶
          </h2>
          <p className="text-sm sm:text-base text-[#6F6052] font-serif-tc">
            每一道甜品皆由法式工藝精心琢磨，選用 Isigny 產區發酵奶油與馬達加斯加頂級香草，純手工限量出爐。
          </p>
        </div>

        {/* Filter Controls Bar: Functional Button Segmented Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b border-[#E8DEC8]">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE8DD] rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#2D241E] text-white shadow-sm'
                      : 'text-[#635445] hover:text-[#26211E] hover:bg-white/40'
                  }`}
                >
                  <span className="block">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Filter */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="搜尋點心或風味..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-[#DDD3C2] text-[#2C2119] placeholder:text-[#A08F7E] focus:outline-none focus:border-[#936639]"
            />
            <Search className="w-3.5 h-3.5 text-[#8A7865] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A7865] hover:text-[#26211E]"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop / 2-column tablet with gap-8 */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#DDD0BE]">
            <p className="text-sm text-[#736353]">沒有找到符合條件的點心，試試其他關鍵字吧。</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#936639] hover:underline"
            >
              重設所有篩選條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isFav = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  id={item.category}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EDE2D1] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Product Card Image Container - 65%-70% of upper visual weight */}
                  <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Unboxed Status text indicator */}
                    {item.isSignature && (
                      <div className="absolute top-3 left-3 bg-[#2D241E]/80 backdrop-blur-md text-[#E8D4B4] text-[10px] tracking-widest font-serif-display uppercase px-2.5 py-1 rounded">
                        Chef's Signature
                      </div>
                    )}
                    {item.isNew && (
                      <div className="absolute top-3 left-3 bg-[#936639]/90 backdrop-blur-md text-white text-[10px] tracking-widest font-serif-display uppercase px-2.5 py-1 rounded">
                        New Saison
                      </div>
                    )}

                    {/* Wishlist Heart Toggle */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isFav
                          ? 'bg-white/95 text-rose-500 shadow-sm'
                          : 'bg-white/70 text-[#6B5A4B] hover:bg-white hover:text-rose-500'
                      }`}
                      aria-label="收藏點心"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Quiet 1-line text kicker - NO pill box */}
                      <div className="text-[11px] text-[#8C7A68] font-serif-display tracking-widest uppercase">
                        {item.frenchName}
                      </div>

                      <h3 className="text-lg font-serif-display font-semibold text-[#26211E] tracking-tight group-hover:text-[#936639] transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#6B5C4D] leading-relaxed line-clamp-2 font-serif-tc">
                        {item.description}
                      </p>

                      {/* Clean unboxed metadata with dot separators */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#8A7969] pt-1">
                        {item.flavorNotes.map((note, idx) => (
                          <React.Fragment key={note}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{note}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Card Purchase Module Footer */}
                    <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-[#8C7B6B] uppercase font-serif-display">Prix</div>
                        <div className="text-base font-semibold font-mono tabular-nums text-[#2D241E]">
                          NT$ {item.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Customization modal trigger */}
                        <button
                          onClick={() => setCustomizingItem(item)}
                          className="px-3.5 py-2 text-xs font-medium bg-[#EFE8DD] text-[#3D3126] hover:bg-[#E5DBCB] rounded-lg transition-colors border border-[#D9CEBC]"
                        >
                          客製選購
                        </button>

                        {/* Quick 1-click Add to Cart */}
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="p-2 bg-[#2D241E] hover:bg-[#43362D] text-white rounded-lg transition-colors shadow-sm"
                          title="快速加入購物袋"
                          aria-label="加入購物袋"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
