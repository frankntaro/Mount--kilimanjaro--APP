import React, { useState } from 'react';
import { Route } from '../types';
import { KILIMANJARO_ROUTES } from '../data/kilimanjaroData';
import { Clock, TrendingUp, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface RoutesViewProps {
  onSelectRoute: (route: Route) => void;
  onBookRoute: (routeId: string) => void;
}

export const RoutesView: React.FC<RoutesViewProps> = ({ onSelectRoute, onBookRoute }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'popular' | 'high-success' | 'camping' | 'huts'>('all');

  const filteredRoutes = KILIMANJARO_ROUTES.filter(r => {
    if (filter === 'popular') return r.badgeText === 'MOST POPULAR' || r.badgeText === 'BEST FOR VIEWS';
    if (filter === 'high-success') return r.successRate >= 95;
    if (filter === 'camping') return r.accommodation === 'Camping';
    if (filter === 'huts') return r.accommodation === 'Mountain Huts';
    return true;
  });

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-8 text-left">
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
            {t.routesView.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit uppercase leading-tight">
            {t.routes.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.routesView.subtitle}
          </p>
        </div>

        {/* Filter Controls (Horizontal Scroll on Mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-colors shrink-0 min-h-[38px] ${
              filter === 'all' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.routesView.filterAll} ({KILIMANJARO_ROUTES.length})
          </button>

          <button
            onClick={() => setFilter('high-success')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-colors shrink-0 min-h-[38px] ${
              filter === 'high-success' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.routesView.filterHighSuccess}
          </button>

          <button
            onClick={() => setFilter('popular')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-colors shrink-0 min-h-[38px] ${
              filter === 'popular' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.routesView.filterPopular}
          </button>

          <button
            onClick={() => setFilter('huts')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-colors shrink-0 min-h-[38px] ${
              filter === 'huts' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.routesView.filterHuts}
          </button>

          <button
            onClick={() => setFilter('camping')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-colors shrink-0 min-h-[38px] ${
              filter === 'camping' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.routesView.filterCamping}
          </button>
        </div>

        {/* Routes Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image header */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={route.heroImage}
                    alt={route.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {route.badgeText && (
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-emerald-700 text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs">
                      {route.badgeText}
                    </span>
                  )}

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="font-black text-base sm:text-lg font-outfit uppercase">{route.name}</span>
                    <span className="text-emerald-300 font-extrabold text-sm">${route.priceUSD}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-100 text-xs font-bold">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">{t.routesView.labelDays}</span>
                      <span className="text-slate-900 text-xs">{route.days} {t.common.days}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">{t.routesView.labelSuccess}</span>
                      <span className="text-emerald-700 text-xs">{route.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">{t.routesView.labelDifficulty}</span>
                      <span className="text-amber-700 text-xs">{route.difficulty}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {route.fullDescription}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 sm:p-5 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectRoute(route)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs uppercase rounded-xl transition-colors min-h-[40px]"
                >
                  {t.routesView.viewDetails}
                </button>
                <button
                  onClick={() => onBookRoute(route.id)}
                  className="w-1/2 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-extrabold text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-1 min-h-[40px]"
                >
                  <span>{t.common.bookNow}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase">
              {t.routesView.comparisonTitle}
            </h2>
            <span className="text-[10px] text-slate-400 block sm:hidden uppercase font-bold">← Scroll →</span>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs text-slate-700 min-w-[640px]">
              <thead className="bg-slate-100 uppercase text-[9px] sm:text-[10px] font-extrabold text-slate-600">
                <tr>
                  <th className="p-2.5 sm:p-3">{t.routesView.colRouteName}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colDuration}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colSuccessRate}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colDifficulty}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colScenery}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colAccommodation}</th>
                  <th className="p-2.5 sm:p-3">{t.routesView.colPriceFrom}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {KILIMANJARO_ROUTES.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 sm:p-3 font-bold text-slate-900">{r.name}</td>
                    <td className="p-2.5 sm:p-3">{r.days} {t.common.days}</td>
                    <td className="p-2.5 sm:p-3 font-black text-emerald-700">{r.successRate}%</td>
                    <td className="p-2.5 sm:p-3">{r.difficulty}</td>
                    <td className="p-2.5 sm:p-3">{r.sceneryRating}/10 ★</td>
                    <td className="p-2.5 sm:p-3">{r.accommodation}</td>
                    <td className="p-2.5 sm:p-3 font-bold text-slate-900">${r.priceUSD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
