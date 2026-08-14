import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle, RefreshCw, Info } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface LocalImageManagerModalProps {
  onClose: () => void;
  onUpdateImages: (overrides: Record<string, string>) => void;
  currentOverrides: Record<string, string>;
}

function persistOverrides(updated: Record<string, string>, storageFullMsg: string): string | null {
  try {
    localStorage.setItem('vamos_custom_local_images', JSON.stringify(updated));
    return null;
  } catch {
    return storageFullMsg;
  }
}

export const LocalImageManagerModal: React.FC<LocalImageManagerModalProps> = ({
  onClose,
  onUpdateImages,
  currentOverrides
}) => {
  const { t } = useTranslation();
  const [overrides, setOverrides] = useState<Record<string, string>>(currentOverrides);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultImageKeys = [
    { key: 'heroBg', label: t.imageManager.heroBg, category: t.imageManager.catHero },
    { key: 'machame', label: t.imageManager.machame, category: t.imageManager.catRoutes },
    { key: 'lemosho', label: t.imageManager.lemosho, category: t.imageManager.catRoutes },
    { key: 'northernCircuit', label: t.imageManager.northernCircuit, category: t.imageManager.catRoutes },
    { key: 'marangu', label: t.imageManager.marangu, category: t.imageManager.catRoutes },
    { key: 'safariElephants', label: t.imageManager.safariElephants, category: t.imageManager.catSafari },
    { key: 'conservationGroup', label: t.imageManager.conservationGroup, category: t.imageManager.catConservation },
    { key: 'logoSvg', label: t.imageManager.logoSvg, category: t.imageManager.catBranding }
  ];

  const handleFileUpload = (key: string, file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      const updated = { ...overrides, [key]: result };
      const persistError = persistOverrides(updated, t.imageManager.storageFull);
      if (persistError) {
        setErrorMessage(persistError);
        setTimeout(() => setErrorMessage(null), 4000);
        return;
      }

      setOverrides(updated);
      onUpdateImages(updated);
      setErrorMessage(null);
      setSuccessMessage(`${t.imageManager.updatedFor} ${key}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setOverrides({});
    onUpdateImages({});
    localStorage.removeItem('vamos_custom_local_images');
    setErrorMessage(null);
    setSuccessMessage(t.imageManager.resetSuccess);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 text-left max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-4 sm:p-6 md:p-8 flex items-center justify-between shrink-0">
          <div className="space-y-0.5 sm:space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-black font-outfit uppercase tracking-tight leading-tight">
                {t.imageManager.title}
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-200 line-clamp-1 sm:line-clamp-none">
              {t.imageManager.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-900 rounded-full transition-colors shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close image manager"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 sm:p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-300 text-rose-900 p-3 sm:p-3.5 rounded-2xl text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Guidelines Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 sm:p-4 text-xs space-y-1.5 sm:space-y-2 text-amber-900">
            <div className="flex items-center gap-2 font-black uppercase text-amber-950">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t.imageManager.waysTitle}</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 font-medium leading-relaxed text-[11px] sm:text-xs">
              <li>
                {t.imageManager.method1}
              </li>
              <li>
                {t.imageManager.method2}
              </li>
            </ul>
          </div>

          {/* List of Layout Image Targets */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              {t.imageManager.layoutTargets} ({defaultImageKeys.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {defaultImageKeys.map((item) => {
                const currentSrc = overrides[item.key];
                return (
                  <div
                    key={item.key}
                    className="p-3 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                        {currentSrc ? (
                          <img
                            src={currentSrc}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                        )}
                      </div>
                      
                      <div className="overflow-hidden space-y-0.5 text-left flex-1 min-w-0">
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 truncate">
                          {item.label}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-slate-500">
                          {currentSrc ? t.imageManager.customLoaded : t.imageManager.defaultStock}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-center">
                      <label className="cursor-pointer bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-extrabold text-[11px] uppercase px-3 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-xs min-h-[36px]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t.imageManager.select}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(item.key, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 p-3.5 sm:p-5 flex items-center justify-between border-t border-slate-200 shrink-0">
          <button
            onClick={handleReset}
            className="text-[11px] sm:text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 uppercase min-h-[36px]"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t.imageManager.resetDefaults}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase rounded-xl transition-colors shadow-md min-h-[36px]"
          >
            {t.imageManager.done}
          </button>
        </div>

      </div>
    </div>
  );
};
