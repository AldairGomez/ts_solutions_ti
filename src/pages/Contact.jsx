import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <motion.main 
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
              <div className="flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark text-primary border border-slate-200 dark:border-border-dark">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t.contact.hqTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.hqDesc1}<br />{t.contact.hqDesc2}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark text-primary border border-slate-200 dark:border-border-dark">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t.contact.phoneTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.phoneDesc1}<br />{t.contact.phoneDesc2}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-4 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-border-dark transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark text-primary border border-slate-200 dark:border-border-dark">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t.contact.supportTitle}</h3>
                  <p className="text-slate-600 dark:text-text-muted leading-relaxed">{t.contact.supportDesc1}<br />{t.contact.supportDesc2}</p>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark group">
              <div className="absolute inset-0 bg-slate-100 dark:bg-surface-dark flex items-center justify-center">
                <img alt="Map" className="w-full h-full object-cover dark:dark-map-filter opacity-70 group-hover:opacity-60 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSAl-MHlTdzg9WTSNa1Zr1ipIRkYnZ9oMBsRStXOHpSkvmsth-1KUxa36PAslahYwVHYw3h7S_Y8XEoXzU590eBRbYl9XB0JtcULVT3VawxKNNJvKjGuPcg4dzEvRD41NFxWZ5gSax1U5hHo7qyHb63sYIZBpZwz_k7HXHXvwxVGbREZ5zvqSclrA2SbW7ZbH2ZAeXTXEH2B_crTWmx158JcsScSIB5PpZk6O45nnac3AaTZQnaxQHmYmNqLV8MC-pvOcfehMsOY74" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-4 py-2 rounded-lg border border-slate-200 dark:border-border-dark flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t.contact.mapLabel}</span>
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
    </motion.main>
  );
}
