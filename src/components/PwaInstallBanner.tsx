import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const PwaInstallBanner: React.FC = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Manual guidance fallback
      alert(t.pwa.manualInstallAlert);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md animate-bounce-short">
      <div className="flex items-start justify-between gap-3">
        <div className="p-2 sm:p-2.5 bg-emerald-800 text-white rounded-xl shrink-0 mt-0.5">
          <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        
        <div className="space-y-1 text-left flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-sm text-white truncate">{t.pwa.title}</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
              {t.pwa.badge}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">
            {t.pwa.description}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              id="pwa-install-app-btn"
              className="px-3.5 sm:px-4 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.pwa.installApp}</span>
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="px-3 py-2 text-slate-400 hover:text-white text-xs font-semibold min-h-[36px]"
            >
              {t.pwa.notNow}
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowBanner(false)}
          className="text-slate-400 hover:text-white p-1.5 -mr-1 -mt-1 rounded-lg"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
