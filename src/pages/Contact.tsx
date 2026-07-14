import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const pageVariants: any = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tssolutionsti@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LazyMotion features={domAnimation}>
    <m.main 
      className="flex-grow flex flex-col justify-center py-12 lg:py-20 px-6 lg:px-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 max-w-3xl">
            {t.contact.title} <span className="text-primary">{t.contact.titleHighlight}</span>
          </h1>
          <p className="text-slate-600 dark:text-text-muted text-lg md:text-xl max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Contact Details & Map */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            {/* Contact Info Cards */}
            <div className="grid gap-6">
              <div className="flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#8B5CF6] transition-colors">{t.contact.hqTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.hqDesc1}<br />{t.contact.hqDesc2}</p>
                </div>
              </div>
              <a href="https://wa.me/51968094072" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors group cursor-pointer">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#25D366] transition-colors">{t.contact.phoneTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.phoneDesc1}<br />{t.contact.phoneDesc2}</p>
                </div>
              </a>
              <div role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleCopyEmail(); }} onClick={handleCopyEmail} className="relative flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors group cursor-pointer">
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-1.5 px-3 rounded shadow-lg whitespace-nowrap">
                    {copied ? t.contact.emailCopied : t.contact.copyEmail}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white"></div>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{copied ? 'check' : 'mail'}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{t.contact.supportTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.supportDesc1}<br />{t.contact.supportDesc2}</p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Form */}
          <div className="order-1 lg:order-2 bg-slate-50/50 dark:bg-surface-dark/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-border-dark backdrop-blur-sm">
            <form action="#" className="flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">{t.contact.formName}</span>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 dark:text-text-muted group-focus-within:text-primary transition-colors">person</span>
                  </div>
                  <input className="w-full bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-muted/50 border border-slate-300 dark:border-border-dark rounded-lg pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" placeholder={t.contact.formNamePlaceholder} type="text" />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">{t.contact.formEmail}</span>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 dark:text-text-muted group-focus-within:text-primary transition-colors">alternate_email</span>
                  </div>
                  <input className="w-full bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-muted/50 border border-slate-300 dark:border-border-dark rounded-lg pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" placeholder={t.contact.formEmailPlaceholder} type="email" />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">{t.contact.formSubject}</span>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 dark:text-text-muted group-focus-within:text-primary transition-colors">topic</span>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 dark:text-text-muted">expand_more</span>
                  </div>
                  <select className="w-full appearance-none bg-white dark:bg-surface-dark text-slate-900 dark:text-white border border-slate-300 dark:border-border-dark rounded-lg pl-12 pr-10 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" defaultValue="">
                    <option disabled value="">{t.contact.formSubjectOption0}</option>
                    <option value="consulting">{t.contact.formSubjectOption1}</option>
                    <option value="infrastructure">{t.contact.formSubjectOption2}</option>
                    <option value="security">{t.contact.formSubjectOption3}</option>
                    <option value="other">{t.contact.formSubjectOption4}</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">{t.contact.formMessage}</span>
                <textarea className="w-full bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-muted/50 border border-slate-300 dark:border-border-dark rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-body" placeholder={t.contact.formMessagePlaceholder} rows="4"></textarea>
              </label>

              <button className="mt-2 w-full bg-primary hover:bg-primary/90 text-white dark:text-background-dark font-bold text-base py-4 rounded-lg shadow-[0_0_20px_rgba(19,236,236,0.3)] hover:shadow-[0_0_30px_rgba(19,236,236,0.5)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 group" type="button">
                <span>{t.contact.formBtn}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </m.main>
    </LazyMotion>
  );
}
