import React, { useState } from 'react';
import { KILIMANJARO_ROUTES, SAFARI_PACKAGES } from '../data/kilimanjaroData';
import { X, Calendar, CheckCircle2, Mountain, Compass, ShieldCheck, Tag, MessageSquare } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { saveNewInquiry } from '../services/inquiryStorage';

interface BookingModalProps {
  initialRouteId?: string;
  initialSafariId?: string;
  initialDate?: string;
  initialClimbers?: number;
  gearRentalPrice?: number;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialRouteId,
  initialSafariId,
  initialDate,
  initialClimbers,
  gearRentalPrice = 150,
  onClose
}) => {
  const { t } = useTranslation();

  // Mode: 'climb' vs 'safari'
  const [bookingType, setBookingType] = useState<'climb' | 'safari'>(
    initialSafariId && !initialRouteId ? 'safari' : 'climb'
  );

  // Climb state
  const [selectedRouteId, setSelectedRouteId] = useState(initialRouteId || KILIMANJARO_ROUTES[0].id);
  const [startDate, setStartDate] = useState(initialDate || '2026-09-15');
  const [climbers, setClimbers] = useState(initialClimbers || 2);
  const [includeSafari, setIncludeSafari] = useState(Boolean(initialSafariId && initialRouteId));
  const [safariId, setSafariId] = useState(initialSafariId || SAFARI_PACKAGES[0].id);
  const [gearRental, setGearRental] = useState(true);

  // Safari-specific state
  const [includeRoute, setIncludeRoute] = useState(false);

  // User contact info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const selectedRoute = KILIMANJARO_ROUTES.find(r => r.id === selectedRouteId) || KILIMANJARO_ROUTES[0];
  const selectedSafari = SAFARI_PACKAGES.find(s => s.id === safariId) || SAFARI_PACKAGES[0];

  // Calculate pricing based on current active bookingType
  let perPersonTotal = 0;
  if (bookingType === 'climb') {
    const routePrice = selectedRoute.priceUSD;
    const safariPrice = includeSafari ? selectedSafari.priceUSD : 0;
    const gearPrice = gearRental ? gearRentalPrice : 0;
    perPersonTotal = routePrice + safariPrice + gearPrice;
  } else {
    // Safari mode
    const safariPrice = selectedSafari.priceUSD;
    const routePrice = includeRoute ? selectedRoute.priceUSD : 0;
    const gearPrice = includeRoute && gearRental ? gearRentalPrice : 0;
    perPersonTotal = safariPrice + routePrice + gearPrice;
  }

  // Group discount calculation
  const travelersCount = climbers;
  const discountPercent = travelersCount >= 4 ? 0.10 : travelersCount >= 2 ? 0.05 : 0;
  const finalPerPerson = perPersonTotal * (1 - discountPercent);
  const grandTotal = Math.round(finalPerPerson * travelersCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingType === 'climb') {
      saveNewInquiry({
        type: 'booking',
        fullName: name,
        email: email,
        phone: phone,
        routeName: selectedRoute.name,
        safariAddon: includeSafari ? selectedSafari.name : undefined,
        startDate: startDate,
        climbersCount: travelersCount,
        gearRental: gearRental,
        message: notes || `Kilimanjaro booking request for ${travelersCount} climbers on ${selectedRoute.name}`,
        estimatedTotalUSD: grandTotal
      });
    } else {
      // Safari booking
      saveNewInquiry({
        type: 'booking',
        fullName: name,
        email: email,
        phone: phone,
        routeName: includeRoute ? selectedRoute.name : undefined,
        safariAddon: selectedSafari.name,
        startDate: startDate,
        climbersCount: travelersCount,
        gearRental: includeRoute ? gearRental : false,
        message: notes || `Safari booking request for ${travelersCount} travelers on ${selectedSafari.name} (${selectedSafari.days} Days)`,
        estimatedTotalUSD: grandTotal
      });
    }
    setSubmitted(true);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isSafariMode = bookingType === 'safari';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-8 relative shadow-2xl border border-slate-200 text-left my-4 sm:my-8 max-h-[92vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors z-20 min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Top Segmented Selector: Kilimanjaro Trek vs Safari Package */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-5 max-w-md">
              <button
                type="button"
                onClick={() => setBookingType('climb')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-black uppercase transition-all ${
                  !isSafariMode
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>{t.booking.tabKilimanjaro}</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('safari')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-black uppercase transition-all ${
                  isSafariMode
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.booking.tabSafari}</span>
              </button>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-slate-100 pr-8">
              <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${
                isSafariMode ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isSafariMode ? (
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 font-outfit uppercase leading-tight">
                  {isSafariMode ? t.booking.safariTitle : t.booking.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {isSafariMode ? t.booking.safariSubtitle : t.booking.subtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Primary Package & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                {/* Package Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isSafariMode ? t.booking.selectSafariPackage : t.booking.selectTrekkingRoute}
                  </label>
                  {isSafariMode ? (
                    <select
                      value={safariId}
                      onChange={(e) => setSafariId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 sm:px-4 py-2.5 font-bold focus:ring-2 focus:ring-amber-600"
                    >
                      {SAFARI_PACKAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.days} {t.common.days} - ${s.priceUSD})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={selectedRouteId}
                      onChange={(e) => setSelectedRouteId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 sm:px-4 py-2.5 font-bold focus:ring-2 focus:ring-emerald-600"
                    >
                      {KILIMANJARO_ROUTES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.days} {t.common.days} - ${r.priceUSD})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isSafariMode ? t.booking.safariStartDate : t.booking.startDate}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className={`w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 sm:px-4 py-2.5 font-bold focus:ring-2 ${
                      isSafariMode ? 'focus:ring-amber-600' : 'focus:ring-emerald-600'
                    }`}
                  />
                </div>
              </div>

              {/* Number of Travelers / Climbers */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {isSafariMode ? t.booking.numberOfTravelers : t.booking.numberOfClimbers}
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <select
                    value={climbers}
                    onChange={(e) => setClimbers(Number(e.target.value))}
                    className={`w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 sm:px-4 py-2.5 font-bold focus:ring-2 ${
                      isSafariMode ? 'focus:ring-amber-600' : 'focus:ring-emerald-600'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 
                          ? (isSafariMode ? t.booking.travelerSolo : t.booking.climberSolo) 
                          : (isSafariMode ? t.booking.travelers : t.booking.climbers)}
                      </option>
                    ))}
                  </select>
                  {discountPercent > 0 && (
                    <span className={`text-xs font-black px-3 py-2 rounded-xl shrink-0 text-center ${
                      isSafariMode ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {discountPercent * 100}{t.booking.groupSavings}
                    </span>
                  )}
                </div>
              </div>

              {/* Add-on Checkboxes */}
              <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t.booking.optionalAddOns}
                </span>

                {!isSafariMode ? (
                  /* Climb Mode Add-ons */
                  <>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gearRental}
                        onChange={(e) => setGearRental(e.target.checked)}
                        className="w-4 h-4 text-emerald-700 rounded-sm border-slate-300 focus:ring-emerald-600 mt-0.5"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">{t.booking.gearRentalTitle}</span>
                        <p className="text-slate-500 text-[11px] leading-tight">{t.booking.gearRentalDesc}</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer pt-2 border-t border-slate-200">
                      <input
                        type="checkbox"
                        checked={includeSafari}
                        onChange={(e) => setIncludeSafari(e.target.checked)}
                        className="w-4 h-4 text-emerald-700 rounded-sm border-slate-300 focus:ring-emerald-600"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">{t.booking.addSafari}</span>
                      </div>
                    </label>

                    {includeSafari && (
                      <div className="pl-7 pt-1">
                        <select
                          value={safariId}
                          onChange={(e) => setSafariId(e.target.value)}
                          className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 font-bold"
                        >
                          {SAFARI_PACKAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.days} {t.common.days} - ${s.priceUSD})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                ) : (
                  /* Safari Mode Add-ons */
                  <>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeRoute}
                        onChange={(e) => setIncludeRoute(e.target.checked)}
                        className="w-4 h-4 text-amber-700 rounded-sm border-slate-300 focus:ring-amber-600"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">{t.booking.addKilimanjaroClimb}</span>
                      </div>
                    </label>

                    {includeRoute && (
                      <div className="pl-7 space-y-2 pt-1">
                        <select
                          value={selectedRouteId}
                          onChange={(e) => setSelectedRouteId(e.target.value)}
                          className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 font-bold"
                        >
                          {KILIMANJARO_ROUTES.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} ({r.days} {t.common.days} - ${r.priceUSD})
                            </option>
                          ))}
                        </select>

                        <label className="flex items-start gap-2 cursor-pointer pt-1 text-xs text-slate-700">
                          <input
                            type="checkbox"
                            checked={gearRental}
                            onChange={(e) => setGearRental(e.target.checked)}
                            className="w-3.5 h-3.5 text-amber-700 rounded-sm border-slate-300 mt-0.5"
                          />
                          <span>{t.booking.gearRentalTitle} (+${gearRentalPrice})</span>
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-1">
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t.booking.contactInfo}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={t.booking.fullNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 sm:px-4 py-2.5 font-medium"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t.booking.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 sm:px-4 py-2.5 font-medium"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder={t.booking.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 sm:px-4 py-2.5 font-medium"
                />
                <textarea
                  placeholder={t.booking.notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 sm:px-4 py-2.5 font-medium resize-y"
                />
              </div>

              {/* Total Calculation Card */}
              <div className={`text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSafariMode ? 'bg-amber-950 border border-amber-900' : 'bg-emerald-950 border border-emerald-900'
              }`}>
                <div>
                  <span className={`block text-xs font-bold uppercase tracking-wider ${
                    isSafariMode ? 'text-amber-300' : 'text-emerald-300'
                  }`}>
                    {t.booking.totalEstimated}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {travelersCount} {isSafariMode ? t.booking.travelersCountLabel : t.booking.climbersCountLabel} {isSafariMode ? selectedSafari.name : selectedRoute.name}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-outfit">
                    ${grandTotal.toLocaleString()}
                  </span>
                  <span className={`block text-[10px] ${isSafariMode ? 'text-amber-200' : 'text-emerald-300'}`}>
                    {isSafariMode ? t.booking.safariFeesIncluded : t.booking.allFeesIncluded}
                  </span>
                </div>
              </div>

              {/* Submit / Cancel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs uppercase rounded-xl shadow transition-all min-h-[44px]"
                >
                  {t.booking.cancel}
                </button>
                <button
                  type="submit"
                  id="submit-booking-request-btn"
                  className={`w-full py-3 sm:py-3.5 text-white font-black text-xs uppercase rounded-xl shadow-lg transition-all min-h-[44px] ${
                    isSafariMode 
                      ? 'bg-amber-800 hover:bg-amber-900 active:bg-amber-950' 
                      : 'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900'
                  }`}
                >
                  {t.booking.submitRequest}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation Receipt */
          <div className="py-6 text-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              isSafariMode ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase font-outfit">
              {t.booking.requestReceived}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {t.booking.thankYouPrefix} <strong>{name}</strong>{t.booking.thankYouMiddle} <strong>{isSafariMode ? selectedSafari.name : selectedRoute.name}</strong> {t.booking.thankYouDeparting} <strong>{startDate}</strong>.
            </p>
            
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 text-left space-y-2 border border-slate-200">
              <div className="flex justify-between font-bold">
                <span>{isSafariMode ? t.booking.labelSafari : t.booking.labelRoute}</span>
                <span>{isSafariMode ? `${selectedSafari.name} (${selectedSafari.days} ${t.common.days})` : selectedRoute.name}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>{isSafariMode ? t.booking.numberOfTravelers : t.booking.labelClimbers}</span>
                <span>{travelersCount} {t.booking.persons}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>{t.booking.labelTotalQuote}</span>
                <span className="text-emerald-700 text-sm font-black">${grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200">
                <span>{t.booking.labelWellContact}</span>
                <span>{email}</span>
              </div>
              {notes.trim() && (
                <div className="pt-2 border-t border-slate-200 text-slate-500">
                  <span className="font-bold text-slate-700">{t.booking.labelNotes}</span> {notes}
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold text-left flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Your reservation inquiry has been dispatched directly to our expedition operations team at <strong>biosfix14@gmail.com</strong>. We will review your dates and reach out promptly!
              </span>
            </div>

            <p className="text-xs text-slate-500">
              {t.booking.followUp}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl uppercase transition-colors min-h-[38px]"
              >
                {t.booking.closeWindow}
              </button>
              <a
                href={`https://wa.me/255754123456?text=${encodeURIComponent(`Hello Vamos Kilimanjaro! I just booked a ${isSafariMode ? selectedSafari.name : selectedRoute.name} starting on ${startDate} for ${travelersCount} travelers.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl uppercase transition-colors min-h-[38px] inline-flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
