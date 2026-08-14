import React, { useState, useEffect } from 'react';
import { PACKING_ITEMS } from '../data/kilimanjaroData';
import { PackingItem } from '../types';
import { CheckSquare, Square, ShieldCheck, HeartPulse, Dumbbell, Compass, Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const PlanView: React.FC = () => {
  const { t } = useTranslation();
  // Load checked state from localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vamos_packing_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('vamos_packing_checklist', JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { key: 'All', label: t.plan.filterAll },
    { key: 'Clothing', label: t.plan.filterClothing },
    { key: 'Footwear', label: t.plan.filterFootwear },
    { key: 'Technical Gear', label: t.plan.filterTechnical },
    { key: 'Medical & Hygiene', label: t.plan.filterMedical }
  ];

  const filteredItems = PACKING_ITEMS.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((totalChecked / PACKING_ITEMS.length) * 100);

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-2xs min-h-[36px]"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>{t.common.back}</span>
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 px-2">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {t.plan.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit uppercase leading-tight">
            {t.plan.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.plan.pageSubtitle}
          </p>
        </div>

        {/* Interactive Packing List Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t.plan.checklistTitle}</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">{t.plan.checklistSaved}</p>
            </div>

            {/* Progress Badge */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-900 block">{totalChecked} / {PACKING_ITEMS.length} {t.plan.packed}</span>
                <span className="text-[10px] text-emerald-700 font-black">{progressPercent}% {t.plan.ready}</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-slate-100 border-t-emerald-700 flex items-center justify-center font-black text-[11px] sm:text-xs text-emerald-800 shrink-0">
                {progressPercent}%
              </div>
            </div>
          </div>

          {/* Category Filter Tabs (Horizontal Scroll on Mobile) */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-extrabold rounded-xl uppercase transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeCategory === cat.key ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="mt-0.5 text-emerald-700 shrink-0">
                    {isChecked ? <CheckSquare className="w-5 h-5 fill-emerald-800 text-white" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </div>
                  
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-black ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {item.name}
                      </span>
                      {item.required && (
                        <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-sm font-bold uppercase shrink-0">
                          {t.plan.mandatory}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setCheckedItems({})}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.plan.resetChecklist}</span>
            </button>
          </div>
        </div>

        {/* Altitude & Safety Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3 text-emerald-800">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-black font-outfit uppercase text-slate-900 leading-snug">
                {t.plan.amsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.plan.amsIntro}
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.polePole}:</strong> {t.plan.polePoleDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.pulseOximeter}:</strong> {t.plan.pulseOximeterDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.emergencyOxygen}:</strong> {t.plan.emergencyOxygenDesc}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3 text-emerald-800">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-black font-outfit uppercase text-slate-900 leading-snug">
                {t.plan.fitnessTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.plan.fitnessIntro}
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.stairClimber}:</strong> {t.plan.stairClimberDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.weekendHikes}:</strong> {t.plan.weekendHikesDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                <span><strong>{t.plan.hydration}:</strong> {t.plan.hydrationDesc}</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
