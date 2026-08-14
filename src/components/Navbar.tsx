import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveTab } from '../types';
import { Language, getTranslations, AVAILABLE_LANGUAGES } from '../i18n/translations';
import { Calendar, Globe, Menu, X, WifiOff, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBooking: (routeId?: string) => void;
  onOpenAdmin?: () => void;
  isOffline?: boolean;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenAdmin,
  isOffline = false,
  currentLang,
  setCurrentLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = getTranslations(currentLang);

  const navItems: { id: ActiveTab; labelKey: keyof typeof t.nav }[] = [
    { id: 'home', labelKey: 'home' },
    { id: 'about', labelKey: 'about' },
    { id: 'routes', labelKey: 'routes' },
    { id: 'safaris', labelKey: 'safaris' },
    { id: 'plan', labelKey: 'plan' },
    { id: 'conservation', labelKey: 'conservation' },
    { id: 'blog', labelKey: 'blog' },
    { id: 'contact', labelKey: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Offline PWA Bar */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offline.banner}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-2 xl:px-4 2xl:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18 xl:h-20 gap-1 lg:gap-1.5 xl:gap-3">

          {/* Logo Brand: Words BELOW the Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center justify-center text-center group focus:outline-hidden shrink-0 py-0.5 min-w-[55px] lg:min-w-[65px] xl:min-w-[75px]"
            id="nav-logo-btn"
          >
            <Logo size="sm" />
            <div className="flex flex-col items-center leading-none mt-0.5">
              <span className="text-[10px] sm:text-xs font-black tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors uppercase font-outfit whitespace-nowrap">
                {t.nav.brandName} <span className="text-emerald-700">{t.nav.brandAccent}</span>
              </span>
              <span className="hidden 2xl:block text-[7.5px] tracking-widest text-slate-500 font-bold uppercase whitespace-nowrap mt-0.5">
                {t.nav.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-0 lg:gap-0.5 xl:gap-1 2xl:gap-1.5 flex-1 mx-0.5 min-w-0">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`px-1 lg:px-1 xl:px-2 2xl:px-2.5 py-1.5 text-[10px] lg:text-[9.5px] xl:text-[11px] 2xl:text-xs font-black tracking-tight lg:tracking-tighter xl:tracking-wide transition-all duration-150 border-b-2 rounded-t-md whitespace-nowrap uppercase ${
                    isActive
                      ? 'text-emerald-800 border-emerald-600 bg-emerald-50/70 font-black'
                      : 'text-slate-700 border-transparent hover:text-emerald-700 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  {t.nav[item.labelKey]}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Selector + Book Your Climb Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2.5 shrink-0">
            {/* Header Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="lang-selector-btn"
                className="flex items-center gap-1 px-1.5 lg:px-2 xl:px-2.5 py-1.5 text-xs font-extrabold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 shadow-2xs min-h-[34px] xl:min-h-[36px]"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-extrabold tracking-wider">{currentLang}</span>
                <span className="text-[8px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                    {t.nav.language}
                  </div>
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        currentLang === lang.code ? 'text-emerald-700 font-extrabold bg-emerald-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 uppercase">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Your Climb Button */}
            <button
              onClick={() => onOpenBooking()}
              id="book-your-climb-nav-btn"
              className="flex items-center gap-1 lg:gap-1.5 px-2.5 lg:px-2.5 xl:px-3.5 py-1.5 lg:py-1.5 xl:py-2 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95 min-h-[34px] xl:min-h-[36px] whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookYourClimb}</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions (< lg): Language Selector + Quick Book + Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Header Language Selector for Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="mobile-header-lang-btn"
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-extrabold text-slate-700 bg-slate-100 active:bg-slate-200 rounded-xl border border-slate-200 min-h-[36px]"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50">
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${currentLang === lang.code ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {lang.name} ({lang.code})
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs min-h-[36px]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookShort}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-xl focus:outline-hidden min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-700 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                }`}
            >
              {t.nav[item.labelKey]}
            </button>
          ))}

          {/* Mobile Language Selector Grid */}
          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.nav.language}:</span>
            <div className="grid grid-cols-5 gap-1.5 w-full sm:w-auto">
              {AVAILABLE_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 text-xs rounded-lg font-bold text-center transition-all ${currentLang === lang.code
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>

          {onOpenAdmin && (
            <div className="pt-3 border-t border-slate-100 flex justify-center">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Executive Admin Portal</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
