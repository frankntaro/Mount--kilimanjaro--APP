import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { saveNewInquiry } from '../services/inquiryStorage';

export const ContactView: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Expedition Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewInquiry({
      type: 'contact',
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });
    setSubmitted(true);
  };

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10 text-left">
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
            {t.contact.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit uppercase leading-tight">
            {t.contact.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.contact.pageSubtitle}
          </p>
        </div>

        {/* Form & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-xl border border-slate-800">
            <h2 className="text-xl sm:text-2xl font-black font-outfit uppercase tracking-tight leading-snug">
              {t.contact.hqTitle}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.contact.hqDesc}
            </p>

            <div className="space-y-3.5 sm:space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 bg-emerald-800 rounded-xl text-white shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-400 block uppercase text-[9px] sm:text-[10px]">{t.contact.physicalAddress}</span>
                  <span className="font-bold text-white text-xs sm:text-sm">{t.contact.addressValue}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 bg-emerald-800 rounded-xl text-white shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-400 block uppercase text-[9px] sm:text-[10px]">{t.contact.phoneWhatsapp}</span>
                  <span className="font-bold text-white text-xs sm:text-sm">+255 754 123 456</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 bg-emerald-800 rounded-xl text-white shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-400 block uppercase text-[9px] sm:text-[10px]">{t.contact.directEmail}</span>
                  <span className="font-bold text-white text-xs sm:text-sm truncate block">info@vamoskilimanjaro.com</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <div className="pt-3 sm:pt-4 border-t border-slate-800">
              <a
                href="https://wa.me/255754123456"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 sm:py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.contact.chatWhatsapp}</span>
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase mb-3 sm:mb-4">
                  {t.contact.sendMessageTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.contact.yourName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.contact.emailAddress}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    placeholder={t.contact.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.contact.messageLabel}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-medium focus:ring-2 focus:ring-emerald-600 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-black text-xs uppercase rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.sendMessage}</span>
                </button>
              </form>
            ) : (
              <div className="py-8 sm:py-12 text-center space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit uppercase">
                  {t.contact.messageSent}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.contact.thankYouPrefix} <strong>{formData.name}</strong>, {t.contact.thankYouMiddle} <strong>{formData.email}</strong>. {t.contact.thankYouSuffix}
                </p>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold max-w-md mx-auto">
                  ✓ An instant notification with your inquiry details has been dispatched to our operations desk (<strong>biosfix14@gmail.com</strong>).
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase rounded-xl transition-colors min-h-[38px]"
                  >
                    {t.contact.sendAnother}
                  </button>
                  <a
                    href="https://wa.me/255754123456"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase rounded-xl transition-colors min-h-[38px] inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Us Directly</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
