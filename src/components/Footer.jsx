import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo-icon.png';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-[#0b0e14] border-t border-slate-200 dark:border-[#1f242e] pt-16 pb-8 px-4 md:px-10 lg:px-40 mt-auto">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 group">
              <img src={logo} alt="TS Logo" className="h-8 md:h-10 w-auto object-contain" />
              <span className="text-lg md:text-xl font-black font-display tracking-widest uppercase bg-gradient-to-r from-[#44449b] via-[#3381e9] to-[#44449b] bg-clip-text text-transparent drop-shadow-sm">
                Solutions TI
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-bold font-display">{t.footer.company}</h4>
            <div className="flex flex-col gap-2">
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.about}</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.careers}</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.news}</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-bold font-display">{t.footer.resources}</h4>
            <div className="flex flex-col gap-2">
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.support}</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.terms}</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">{t.footer.privacy}</a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-[#1f242e] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <a className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
