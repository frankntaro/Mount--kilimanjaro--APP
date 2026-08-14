import React, { useState } from 'react';
import { Route } from '../types';
import { X, Clock, TrendingUp, ShieldCheck, MapPin, Calendar, Compass, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface RouteDetailModalProps {
  route: Route;
  onClose: () => void;
  onBookRoute: (routeId: string) => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({
  route,
  onClose,
  onBookRoute
}) => {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState<number>(1);
  const selectedDayItem = route.dailyItinerary.find(d => d.day === activeDay) || route.dailyItinerary[0];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full p-4 sm:p-6 md:p-8 relative shadow-2xl border border-slate-200 text-left my-4 sm:my-8 max-h-[92vh] overflow-y-auto space-y-5 sm:space-y-6" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 text-white sm:text-slate-400 bg-black/50 sm:bg-slate-100 hover:text-white sm:hover:text-slate-800 rounded-full hover:bg-black/70 sm:hover:bg-slate-200 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 md:-mx-8 md:-mt-8 mb-4 sm:mb-6">
          <img
            src={route.heroImage}
            alt={route.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="bg-emerald-700 text-white font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md uppercase tracking-wider">
                {route.days} {t.routeDetail.daysExpedition}
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md border border-slate-700">
                {route.successRate}{t.routeDetail.summitSuccess}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-outfit uppercase leading-tight">
              {route.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl font-normal">
              {route.fullDescription}
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 font-bold block uppercase text-[9px] sm:text-[10px]">{t.routeDetail.duration}</span>
            <span className="font-black text-slate-900 text-xs sm:text-sm">{route.days} {t.routeDetail.daysNights} {route.days - 1} {t.routeDetail.nights}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block uppercase text-[9px] sm:text-[10px]">{t.routeDetail.difficulty}</span>
            <span className="font-black text-slate-900 text-xs sm:text-sm">{route.difficulty}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block uppercase text-[9px] sm:text-[10px]">{t.routeDetail.accommodation}</span>
            <span className="font-black text-slate-900 text-xs sm:text-sm">{route.accommodation}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block uppercase text-[9px] sm:text-[10px]">{t.routeDetail.startingRate}</span>
            <span className="font-black text-emerald-800 text-sm sm:text-base">${route.priceUSD} {t.routeDetail.perPerson}</span>
          </div>
        </div>

        {/* Elevation Profile Visualization */}
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            {t.routeDetail.elevationProfile}
          </h3>
          <div className="bg-slate-950 p-3 sm:p-4 rounded-xl text-white overflow-x-auto no-scrollbar">
            <div className="h-32 sm:h-36 min-w-[300px] flex items-end justify-between gap-1 sm:gap-2 pt-6 px-1 sm:px-2 border-b border-slate-800">
              {route.elevationProfile.map((ep, idx) => {
                const heightPercent = Math.max(15, Math.min(100, ((ep.elevation - 1500) / (5895 - 1500)) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 bg-emerald-700 text-white text-[9px] sm:text-[10px] font-bold py-0.5 px-1.5 rounded-md whitespace-nowrap z-30 pointer-events-none">
                      {ep.label}: {ep.elevation}m
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold">{ep.elevation}m</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        ep.elevation === 5895
                          ? 'bg-amber-400 shadow-md shadow-amber-400/50'
                          : 'bg-emerald-700 hover:bg-emerald-500'
                      }`}
                    />
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium truncate w-full text-center">
                      D{ep.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Day-by-Day Interactive Itinerary */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
            {t.routeDetail.dayByDayTitle}
          </h3>

          {/* Days Tabs */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
            {route.dailyItinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  activeDay === d.day
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.routeDetail.dayTab} {d.day}
              </button>
            ))}
          </div>

          {/* Day Detail Card */}
          {selectedDayItem && (
            <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-xl border border-emerald-100 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-emerald-100 pb-2">
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                  {selectedDayItem.title}
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3 text-emerald-800 font-bold text-[11px] sm:text-xs">
                  <span>{t.routeDetail.elevation} {selectedDayItem.startElevation}m → {selectedDayItem.endElevation}m</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{t.routeDetail.distance} {selectedDayItem.distanceKm} km</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{t.routeDetail.time} {selectedDayItem.hikingHours}</span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed font-normal">
                {selectedDayItem.description}
              </p>

              <div>
                <span className="font-bold text-slate-900 block mb-1 text-xs">{t.routeDetail.highlights}</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedDayItem.highlights.map((h, i) => (
                    <span key={i} className="bg-white px-2 sm:px-2.5 py-1 rounded-md text-emerald-900 font-semibold border border-emerald-200 flex items-center gap-1 text-[11px] sm:text-xs">
                      <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* What's Included */}
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
            {t.routeDetail.inclusions}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {route.includedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-xs text-slate-500 font-medium block">{t.routeDetail.readyToTackle} {route.name}?</span>
            <span className="text-lg sm:text-xl font-black text-slate-900">${route.priceUSD} <span className="text-xs font-normal text-slate-500">{t.routeDetail.perClimber}</span></span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookRoute(route.id);
            }}
            id="book-this-route-btn"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-extrabold text-xs uppercase rounded-xl shadow-md flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>{t.routeDetail.bookThisRoute}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
