import React, { useState } from 'react';
import { Logo } from './Logo';
import { Route, ActiveTab } from '../types';
import { KILIMANJARO_ROUTES } from '../data/kilimanjaroData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Lock } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { saveNewInquiry } from '../services/inquiryStorage';

interface FooterProps {
  onNavigateTab?: (tab: ActiveTab) => void;
  onSelectRoute?: (route: Route) => void;
  onOpenBooking?: (routeId?: string, safariId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onSelectRoute,
  onOpenBooking,
  onOpenAdmin
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      saveNewInquiry({
        type: 'contact',
        fullName: 'Website Newsletter Subscriber',
        email: email.trim(),
        phone: 'N/A',
        subject: 'Newsletter Subscription Request',
        message: `Visitor requested to subscribe to Vamos Kilimanjaro climbing intelligence, seasonal briefings, and safari announcements with email: ${email.trim()}`
      });
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const handleRouteClick = (routeId: string) => {
    const foundRoute = KILIMANJARO_ROUTES.find(r => r.id === routeId);
    if (foundRoute && onSelectRoute) {
      onSelectRoute(foundRoute);
    } else if (onNavigateTab) {
      onNavigateTab('routes');
    }
  };

  const handleSafariClick = (safariId: string) => {
    if (onOpenBooking) {
      onOpenBooking(undefined, safariId);
    } else if (onNavigateTab) {
      onNavigateTab('safaris');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-8 sm:pt-12 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Top Newsletter & Social Bar */}
        <div className="bg-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          <div className="text-left max-w-lg space-y-1">
            <h3 className="text-base sm:text-lg md:text-xl font-black text-white font-outfit uppercase tracking-wide">
              {t.footer.follow.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-400">
              {t.footer.newsletterDesc}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-950/80 px-4 py-3 rounded-xl border border-emerald-800 justify-center">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.footer.subscribedThanks}</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-80">
                <input
                  type="email"
                  required
                  placeholder={t.footer.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="newsletter-email-input"
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-xs uppercase rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5 min-h-[42px]"
                >
                  <span>{t.footer.subscribe}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 text-left text-xs">
          
          {/* Col 1: Brand Info & Social Icons */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3.5 sm:space-y-4">
            <button
              onClick={() => onNavigateTab?.('home')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
            >
              <Logo size="sm" />
              <div>
                <span className="block text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {t.nav.brandName} <span className="text-emerald-400">{t.nav.brandAccent}</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-widest block">
                  {t.footer.brandTagline}
                </span>
              </div>
            </button>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              {t.footer.aboutText}
            </p>

            {/* Social Media Logos / Icons */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider block">
                {t.footer.followUs}
              </span>
              
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com/vamoskilimanjaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 shadow-xs flex items-center justify-center group"
                  title="Follow us on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/vamoskilimanjaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-[#dc2743] transition-all duration-200 shadow-xs flex items-center justify-center group"
                  title="Follow us on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@FRANKJOSEHAT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200 shadow-xs flex items-center justify-center group"
                  title="Subscribe to YouTube channel (@FRANKJOSEHAT)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/255754123456?text=Hello%20Vamos%20Kilimanjaro,%20I%20would%20like%20more%20information%20about%20climbing%20Kilimanjaro."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-200 shadow-xs flex items-center justify-center group"
                  title="Chat with us on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-1.5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab?.('home')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('about')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('routes')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.routes}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('safaris')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.safaris}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('plan')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.plan}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('conservation')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.conservation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('blog')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('contact')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kilimanjaro Routes */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-1.5">
              {t.footer.climbingRoutes}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => handleRouteClick('machame')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.machameLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteClick('lemosho')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.lemoshoLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteClick('northern-circuit')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.northernLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteClick('marangu')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.maranguLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteClick('rongai')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.rongaiLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteClick('umbwe')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.umbweLink}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Safaris & Tours */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-1.5">
              {t.footer.safarisAddOns}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => handleSafariClick('serengeti-ngorongoro')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.serengetiLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSafariClick('tarangire-manyara')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.tarangireLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSafariClick('zanzibar-beach')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.zanzibarLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('safaris')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.ngorongoroLink}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab?.('safaris')}
                  className="hover:text-emerald-400 transition-colors text-left block py-0.5"
                >
                  {t.footer.maasaiLink}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & 24/7 Support */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-1.5">
              {t.footer.contactSupport}
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a
                  href="tel:+255754123456"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">+255 754 123 456</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vamoskilimanjaro.com"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">info@vamoskilimanjaro.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{t.footer.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Partners & Accreditations */}
        <div className="pt-5 sm:pt-6 border-t border-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="font-bold text-slate-400">{t.footer.proudPartnerOf}</span>
            <span className="font-extrabold text-slate-300">{t.footer.tanapa}</span>
            <span className="font-extrabold text-emerald-400">{t.footer.kpapCertified}</span>
            <span className="font-extrabold text-slate-300">{t.footer.tatoMember}</span>
            <span className="font-extrabold text-slate-300">{t.footer.leaveNoTrace}</span>
          </div>
          <div>
            <span className="text-[11px]">{t.footer.license}</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-4 sm:pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-semibold text-[11px]">
            <button
              onClick={() => onNavigateTab?.('contact')}
              className="hover:text-slate-300 transition-colors py-0.5"
            >
              {t.footer.privacyPolicy}
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateTab?.('contact')}
              className="hover:text-slate-300 transition-colors py-0.5"
            >
              {t.footer.termsConditions}
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateTab?.('about')}
              className="hover:text-slate-300 transition-colors py-0.5"
            >
              {t.footer.faq}
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateTab?.('routes')}
              className="hover:text-slate-300 transition-colors py-0.5"
            >
              {t.footer.sitemap}
            </button>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  id="footer-admin-portal-btn"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold hover:underline py-0.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
