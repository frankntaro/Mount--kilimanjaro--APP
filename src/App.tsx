import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ActiveTab, Route, SafariPackage } from './types';
import { KILIMANJARO_ROUTES, SAFARI_PACKAGES } from './data/kilimanjaroData';
import { IMAGES, DEFAULT_IMAGES } from './data/images';
import { 
  PriceOverrides, 
  getStoredPriceOverrides, 
  savePriceOverrides, 
  applyPricesToData 
} from './services/pricingStorage';
import { 
  getStoredSafariPackages, 
  saveSafariPackages, 
  applySafarisToData 
} from './services/safariStorage';
import { Language, AVAILABLE_LANGUAGES, getTranslations } from './i18n/translations';
import { TranslationContext, createTranslationContext } from './i18n/useTranslation';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularRoutes } from './components/PopularRoutes';
import { SafariAndSeason } from './components/SafariAndSeason';
import { ImpactStatsBanner } from './components/ImpactStatsBanner';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { RouteDetailModal } from './components/RouteDetailModal';
import { PwaInstallBanner } from './components/PwaInstallBanner';

// Lazy-loaded views for instant initial page loading and maximum performance
const AboutView = lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const RoutesView = lazy(() => import('./views/RoutesView').then(m => ({ default: m.RoutesView })));
const SafariView = lazy(() => import('./views/SafariView').then(m => ({ default: m.SafariView })));
const PlanView = lazy(() => import('./views/PlanView').then(m => ({ default: m.PlanView })));
const ConservationView = lazy(() => import('./views/ConservationView').then(m => ({ default: m.ConservationView })));
const BlogView = lazy(() => import('./views/BlogView').then(m => ({ default: m.BlogView })));
const ContactView = lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const AdminView = lazy(() => import('./views/AdminView').then(m => ({ default: m.AdminView })));

import { X } from 'lucide-react';

const ViewLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
    <span className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Loading...</span>
  </div>
);

const VALID_LANGUAGES = new Set<Language>(AVAILABLE_LANGUAGES.map((l) => l.code));

function resolveInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('vamos_language');
    if (saved && VALID_LANGUAGES.has(saved as Language)) {
      return saved as Language;
    }
  } catch {
    // ignore storage errors
  }

  // Automatically detect user's browser/system language
  try {
    const browserLangs: readonly string[] =
      typeof navigator !== 'undefined'
        ? navigator.languages && navigator.languages.length
          ? navigator.languages
          : [navigator.language || '']
        : [];

    for (const lang of browserLangs) {
      if (!lang) continue;
      const code = lang.toLowerCase().split('-')[0];
      if (code === 'de') return 'DE';
      if (code === 'fr') return 'FR';
      if (code === 'es') return 'ES';
      if (code === 'sw') return 'SW';
      if (code === 'en') return 'EN';
    }
  } catch {
    // ignore detection errors
  }

  return 'EN';
}

const ROUTE_IMAGE_KEYS: Record<string, keyof typeof DEFAULT_IMAGES> = {
  machame: 'machame',
  lemosho: 'lemosho',
  'northern-circuit': 'northernCircuit',
  marangu: 'marangu',
  rongai: 'rongai',
  umbwe: 'umbwe',
};

const VALID_TABS: readonly ActiveTab[] = ['home', 'about', 'routes', 'safaris', 'plan', 'conservation', 'blog', 'contact', 'admin'];

function resolveInitialTab(): ActiveTab {
  try {
    const rawHash = (window.location.hash.replace(/^#/, '') || '').toLowerCase();
    if (rawHash === 'settings' || rawHash === 'password' || rawHash === 'security' || rawHash === 'admin-settings') return 'admin';
    if (VALID_TABS.includes(rawHash as ActiveTab)) return rawHash as ActiveTab;
    if (rawHash.startsWith('route-')) return 'routes';
    if (rawHash === 'book' || rawHash === 'booking') return 'home';
    const saved = (localStorage.getItem('vamos_active_tab') || '').toLowerCase() as ActiveTab;
    if (VALID_TABS.includes(saved)) return saved;
  } catch {
    // ignore
  }
  return 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(resolveInitialTab);

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = (window.location.hash.replace(/^#/, '') || '').toLowerCase();
      if (rawHash === 'settings' || rawHash === 'password' || rawHash === 'security' || rawHash === 'admin-settings') {
        setActiveTab('admin');
      } else if (VALID_TABS.includes(rawHash as ActiveTab)) {
        setActiveTab(rawHash as ActiveTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [selectedRouteForModal, setSelectedRouteForModal] = useState<Route | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingRouteId, setSelectedBookingRouteId] = useState<string | undefined>(undefined);
  const [selectedBookingSafariId, setSelectedBookingSafariId] = useState<string | undefined>(undefined);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | undefined>(undefined);
  const [selectedBookingClimbers, setSelectedBookingClimbers] = useState<number | undefined>(undefined);

  const [currentLang, setCurrentLang] = useState<Language>(resolveInitialLanguage);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Summit' | 'Trek' | 'Camp' | 'Safari'>('All');

  const [customImageOverrides, setCustomImageOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('vamos_custom_local_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [galleryImages, setGalleryImages] = useState<Array<{ url: string; caption: string; category: 'Summit' | 'Trek' | 'Camp' | 'Safari' }>>(() => {
    try {
      const saved = localStorage.getItem('vamos_custom_gallery');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return IMAGES.gallery;
  });

  const [customPrices, setCustomPrices] = useState<PriceOverrides>(getStoredPriceOverrides);
  const [safariPackages, setSafariPackages] = useState<SafariPackage[]>(getStoredSafariPackages);

  // Apply custom prices to in-memory datasets on boot or when updated
  useEffect(() => {
    try {
      savePriceOverrides(customPrices);
      applyPricesToData(customPrices, KILIMANJARO_ROUTES, SAFARI_PACKAGES);
    } catch {
      // ignore
    }
  }, [customPrices]);

  // Apply custom safari packages to in-memory datasets on boot or when updated
  useEffect(() => {
    try {
      saveSafariPackages(safariPackages);
      applySafarisToData(safariPackages);
    } catch {
      // ignore
    }
  }, [safariPackages]);

  useEffect(() => {
    try {
      localStorage.setItem('vamos_custom_gallery', JSON.stringify(galleryImages));
      IMAGES.gallery = galleryImages;
    } catch {
      // ignore
    }
  }, [galleryImages]);

  useEffect(() => {
    if (Object.keys(customImageOverrides).length > 0) {
      Object.entries(customImageOverrides).forEach(([key, url]) => {
        if (key in IMAGES) {
          (IMAGES as Record<string, unknown>)[key] = url;
        }
      });

      KILIMANJARO_ROUTES.forEach((route) => {
        const imageKey = ROUTE_IMAGE_KEYS[route.id];
        if (imageKey && customImageOverrides[imageKey]) {
          route.heroImage = customImageOverrides[imageKey];
        }
      });

      if (customImageOverrides.safariElephants) {
        SAFARI_PACKAGES[0].image = customImageOverrides.safariElephants;
      }
    } else {
      // Revert to defaults if overrides cleared
      Object.entries(DEFAULT_IMAGES).forEach(([key, url]) => {
        if (key !== 'gallery' && key in IMAGES) {
          (IMAGES as Record<string, unknown>)[key] = url;
        }
      });
      KILIMANJARO_ROUTES.forEach((route) => {
        const imageKey = ROUTE_IMAGE_KEYS[route.id];
        if (imageKey && DEFAULT_IMAGES[imageKey]) {
          route.heroImage = DEFAULT_IMAGES[imageKey] as string;
        }
      });
    }
  }, [customImageOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem('vamos_language', currentLang);
      document.documentElement.lang = currentLang.toLowerCase();
    } catch {
      // ignore
    }
  }, [currentLang]);

  // Ensure initial base hash exists in browser history so Back button is always functional
  useEffect(() => {
    try {
      const currentHash = window.location.hash;
      if (!currentHash) {
        window.history.replaceState({ tab: activeTab }, '', `#${activeTab}`);
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen to browser Back/Forward navigation buttons (popstate & hashchange)
  useEffect(() => {
    const syncFromLocation = () => {
      try {
        const rawHash = (window.location.hash || '').replace(/^#/, '');

        // 1. Root or Home
        if (!rawHash || rawHash === 'home') {
          setActiveTab('home');
          setSelectedRouteForModal(null);
          setBookingModalOpen(false);
          setLightboxImage(null);
          return;
        }

        // 2. Booking Modal
        if (rawHash === 'book' || rawHash === 'booking') {
          setBookingModalOpen(true);
          return;
        }

        // 3. Route Detail Modal (#route-machame, #route-lemosho, etc.)
        if (rawHash.startsWith('route-')) {
          const routeId = rawHash.replace(/^route-/, '');
          const matched = KILIMANJARO_ROUTES.find((r) => r.id === routeId);
          if (matched) {
            setActiveTab('routes');
            setSelectedRouteForModal(matched);
            setBookingModalOpen(false);
            return;
          }
        }

        // 4. Standard Tabs (about, routes, safaris, plan, conservation, blog, contact, admin)
        const matchedTab = rawHash.toLowerCase() as ActiveTab;
        if (VALID_TABS.includes(matchedTab)) {
          setActiveTab(matchedTab);
          setSelectedRouteForModal(null);
          setBookingModalOpen(false);
          setLightboxImage(null);
          try {
            localStorage.setItem('vamos_active_tab', matchedTab);
          } catch {
            // ignore
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);

    // Initial sync
    syncFromLocation();

    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  // Programmatic tab navigation that pushes to browser history
  const handleNavigateTab = (tab: ActiveTab, pushHistory = true) => {
    setActiveTab(tab);
    setSelectedRouteForModal(null);
    setBookingModalOpen(false);
    setLightboxImage(null);

    try {
      localStorage.setItem('vamos_active_tab', tab);
      const targetHash = `#${tab}`;
      if (pushHistory && window.location.hash !== targetHash) {
        window.history.pushState({ tab }, '', targetHash);
      }
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSelectRoute = (route: Route) => {
    setSelectedRouteForModal(route);
    try {
      const targetHash = `#route-${route.id}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState({ tab: 'routes', routeId: route.id, modal: 'route' }, '', targetHash);
      }
    } catch {
      // ignore
    }
  };

  const handleCloseRouteModal = () => {
    setSelectedRouteForModal(null);
    try {
      if (window.location.hash.startsWith('#route-')) {
        window.history.pushState({ tab: activeTab }, '', `#${activeTab}`);
      }
    } catch {
      // ignore
    }
  };

  const handleOpenBooking = (routeId?: string, safariId?: string, date?: string, climbers?: number) => {
    setSelectedBookingRouteId(routeId);
    setSelectedBookingSafariId(safariId);
    setSelectedBookingDate(date);
    setSelectedBookingClimbers(climbers);
    setBookingModalOpen(true);
    try {
      const targetHash = '#book';
      if (window.location.hash !== targetHash) {
        window.history.pushState({ tab: activeTab, modal: 'booking' }, '', targetHash);
      }
    } catch {
      // ignore
    }
  };

  const handleCloseBookingModal = () => {
    setBookingModalOpen(false);
    try {
      if (window.location.hash === '#book' || window.location.hash === '#booking') {
        window.history.pushState({ tab: activeTab }, '', `#${activeTab}`);
      }
    } catch {
      // ignore
    }
  };

  const handleCheckAvailability = (routeId: string, date: string, climbersCount: number) => {
    handleOpenBooking(routeId, undefined, date, climbersCount);
  };

  const t = getTranslations(currentLang);

  const filteredGallery = galleryFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === galleryFilter);

  const galleryCategories: { key: 'All' | 'Summit' | 'Trek' | 'Camp' | 'Safari'; label: string }[] = [
    { key: 'All', label: t.gallery.filterAll },
    { key: 'Summit', label: t.gallery.filterSummit },
    { key: 'Trek', label: t.gallery.filterTrek },
    { key: 'Camp', label: t.gallery.filterCamp },
    { key: 'Safari', label: t.gallery.filterSafari },
  ];

  // If viewing Admin portal, render full screen dedicated admin console
  if (activeTab === 'admin') {
    return (
      <TranslationContext.Provider value={createTranslationContext(currentLang)}>
        <Suspense fallback={<ViewLoadingFallback />}>
          <AdminView
            onBackToSite={() => handleNavigateTab('home')}
            currentOverrides={customImageOverrides}
            onUpdateImages={(overrides) => setCustomImageOverrides(overrides)}
            galleryImages={galleryImages}
            onUpdateGallery={(updatedGallery) => setGalleryImages(updatedGallery)}
            customPrices={customPrices}
            onUpdatePrices={(newPrices) => setCustomPrices(newPrices)}
            safariPackages={safariPackages}
            onUpdateSafaris={(updatedSafaris) => setSafariPackages(updatedSafaris)}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        </Suspense>
      </TranslationContext.Provider>
    );
  }

  return (
    <TranslationContext.Provider value={createTranslationContext(currentLang)}>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={() => handleNavigateTab('admin')}
          isOffline={isOffline}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />

        <main className="flex-1">
          {activeTab === 'home' && (
            <div>
              <HeroSection
                onExploreRoutes={() => handleNavigateTab('routes')}
                onCheckAvailability={handleCheckAvailability}
              />

              <PopularRoutes
                onSelectRoute={handleSelectRoute}
                onViewAllRoutes={() => handleNavigateTab('routes')}
              />

              <SafariAndSeason
                onExploreSafaris={() => handleNavigateTab('safaris')}
                onClimbingSeasonInfo={() => handleNavigateTab('about')}
                onViewAllReviews={() => handleNavigateTab('contact')}
              />

              <ImpactStatsBanner onLearnImpact={() => handleNavigateTab('conservation')} />

              <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                    <div className="text-left">
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-widest uppercase block mb-1">
                        {t.gallery.eyebrow}
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit uppercase">
                        {t.gallery.title}
                      </h2>
                    </div>

                    <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-1.5 no-scrollbar">
                      {galleryCategories.map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => setGalleryFilter(cat.key)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl uppercase transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                            galleryFilter === cat.key
                              ? 'bg-emerald-800 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredGallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img.url)}
                        className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white text-xs font-bold">{img.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          <Suspense fallback={<ViewLoadingFallback />}>
            {activeTab === 'about' && <AboutView onPlanClimb={() => handleNavigateTab('plan')} />}

            {activeTab === 'routes' && (
              <RoutesView
                onSelectRoute={handleSelectRoute}
                onBookRoute={(routeId) => handleOpenBooking(routeId)}
              />
            )}

            {activeTab === 'safaris' && (
              <SafariView 
                packages={safariPackages}
                onBookSafari={(safariId) => handleOpenBooking(undefined, safariId)} 
              />
            )}

            {activeTab === 'plan' && <PlanView />}

            {activeTab === 'conservation' && <ConservationView />}

            {activeTab === 'blog' && <BlogView />}

            {activeTab === 'contact' && <ContactView />}
          </Suspense>
        </main>

        <Footer
          onNavigateTab={handleNavigateTab}
          onSelectRoute={handleSelectRoute}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={() => handleNavigateTab('admin')}
        />

        {bookingModalOpen && (
          <BookingModal
            key={`booking-${selectedBookingRouteId || 'none'}-${selectedBookingSafariId || 'none'}-${Date.now()}`}
            initialRouteId={selectedBookingRouteId}
            initialSafariId={selectedBookingSafariId}
            initialDate={selectedBookingDate}
            initialClimbers={selectedBookingClimbers}
            gearRentalPrice={customPrices.gearRental ?? 150}
            onClose={handleCloseBookingModal}
          />
        )}

        {selectedRouteForModal && (
          <RouteDetailModal
            route={selectedRouteForModal}
            onClose={handleCloseRouteModal}
            onBookRoute={(routeId) => handleOpenBooking(routeId)}
          />
        )}

        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 cursor-pointer"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2.5 text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors z-20 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Enlarged view"
              className="max-w-[95vw] max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        )}

        <PwaInstallBanner />
      </div>
    </TranslationContext.Provider>
  );
}
