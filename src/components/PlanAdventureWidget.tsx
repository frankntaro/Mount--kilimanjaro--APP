import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, Mountain, Trees, Award, ArrowRight } from 'lucide-react';
import { KILIMANJARO_ROUTES } from '../data/kilimanjaroData';
import { useTranslation } from '../i18n/useTranslation';

interface PlanAdventureWidgetProps {
  onCheckAvailability: (routeId: string, date: string, climbersCount: number) => void;
}

export const PlanAdventureWidget: React.FC<PlanAdventureWidgetProps> = ({ onCheckAvailability }) => {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState(KILIMANJARO_ROUTES[0].id);
  const [selectedDate, setSelectedDate] = useState('2026-09-15');
  const [climbersCount, setClimbersCount] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability(selectedRoute, selectedDate, climbersCount);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-5 lg:p-5 xl:p-6 max-w-sm lg:max-w-md w-full relative z-10 backdrop-blur-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
          <Mountain className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-base xl:text-lg uppercase tracking-wide leading-tight">
            {t.planWidget.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{t.planWidget.subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5">
        {/* Choose a Route Dropdown */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            {t.planWidget.chooseRoute}
          </label>
          <div className="relative">
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              id="widget-route-select"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-semibold appearance-none pr-8"
            >
              {KILIMANJARO_ROUTES.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name} ({route.days} {t.common.days} • {route.difficulty})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-[10px] sm:text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Select Date */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            {t.planWidget.selectDate}
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            id="widget-date-input"
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-semibold"
          />
        </div>

        {/* Number of Climbers */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            {t.planWidget.numberOfClimbers}
          </label>
          <div className="relative">
            <select
              value={climbersCount}
              onChange={(e) => setClimbersCount(Number(e.target.value))}
              id="widget-climbers-select"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-semibold appearance-none pr-8"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? t.planWidget.soloClimber : `${t.booking.climbers} (${t.booking.groupSavings.replace('%', '10%')})`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-[10px] sm:text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="widget-check-availability-btn"
          className="w-full mt-1.5 sm:mt-2 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-black text-xs sm:text-sm py-2.5 sm:py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer min-h-[42px] sm:min-h-[46px]"
        >
          <span>{t.planWidget.checkAvailability}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* 4 Feature Badges Grid */}
      <div className="mt-3.5 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 sm:gap-2.5 text-left">
        <div className="flex items-start gap-1.5 sm:gap-2">
          <div className="p-1 sm:p-1.5 bg-blue-50 text-blue-700 rounded-lg shrink-0 mt-0.5">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">{t.planWidget.unesco}</span>
            <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-medium">{t.planWidget.worldHeritage}</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 sm:gap-2">
          <div className="p-1 sm:p-1.5 bg-emerald-50 text-emerald-700 rounded-lg shrink-0 mt-0.5">
            <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">{t.planWidget.elevation}</span>
            <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-medium">{t.planWidget.africasHighest}</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 sm:gap-2">
          <div className="p-1 sm:p-1.5 bg-amber-50 text-amber-700 rounded-lg shrink-0 mt-0.5">
            <Trees className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">{t.planWidget.unique}</span>
            <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-medium">{t.planWidget.floraFauna}</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 sm:gap-2">
          <div className="p-1 sm:p-1.5 bg-purple-50 text-purple-700 rounded-lg shrink-0 mt-0.5">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">{t.planWidget.experienced}</span>
            <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-medium">{t.planWidget.localGuides}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
