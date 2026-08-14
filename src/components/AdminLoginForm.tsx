import React, { useState } from 'react';
import { Logo } from './Logo';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle, Globe } from 'lucide-react';
import { verifyAdminLogin, setAdminAuthenticatedSession } from '../services/adminAuth';
import { Language, AVAILABLE_LANGUAGES, getTranslations } from '../i18n/translations';

interface AdminLoginFormProps {
  onLoginSuccess: (email: string) => void;
  onBackToSite: () => void;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  onLoginSuccess,
  onBackToSite,
  currentLang = 'EN' as Language,
  onLanguageChange,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = getTranslations(currentLang);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const isValid = verifyAdminLogin(email, password);
      if (isValid) {
        setAdminAuthenticatedSession(rememberMe, email.trim().toLowerCase());
        onLoginSuccess(email.trim().toLowerCase());
      } else {
        setErrorMsg(t.admin.invalidCredentials);
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-slate-200/50 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Bar with Back Link & Language Switcher */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 flex items-center justify-between gap-2">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-2.5 sm:px-3.5 py-2 rounded-xl transition-all border border-slate-200 shadow-xs shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline sm:inline">{t.admin.backToSite}</span>
          <span className="inline xs:hidden sm:hidden">{t.common.close}</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-xs transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-extrabold">{currentLang}</span>
              <span className="text-[9px] text-slate-400">▼</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in">
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (onLanguageChange) onLanguageChange(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                      currentLang === lang.code ? 'text-emerald-700 bg-emerald-50/70 font-black' : 'text-slate-700'
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

          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 sm:px-3 py-1.5 rounded-xl shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{t.admin.restrictedAccess}</span>
            <span className="inline sm:hidden">Admin</span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit uppercase">
              {t.admin.signInTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.admin.signInSubtitle}
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.admin.adminEmailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vamoskilimanjaro.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-sm text-slate-900 placeholder-slate-400 transition-all outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.admin.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-sm text-slate-900 placeholder-slate-400 transition-all outline-hidden font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-md border-slate-300 bg-white text-emerald-600 focus:ring-emerald-500 focus:ring-offset-white w-4 h-4"
                />
                <span>{t.admin.rememberDevice}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-emerald-700/20 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>{t.admin.signInButton}</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 text-xs text-slate-500 border-t border-slate-200">
        &copy; {new Date().getFullYear()} Vamos Kilimanjaro. Executive Administrative Security Gateway.
      </div>
    </div>
  );
};


