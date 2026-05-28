import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative px-4 md:px-10 lg:px-40 py-12 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4"></div>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-6 lg:gap-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t.home.heroTag}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                {t.home.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t.home.heroTitleHighlight}</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-lg">
                {t.home.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button className="h-12 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                  <span>{t.home.heroBtnStart}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button className="h-12 px-8 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-base font-bold transition-all flex items-center justify-center">
                  {t.home.heroBtnPortfolio}
                </button>
              </div>
              {/* Trust indicators */}
              <div className="pt-8 flex flex-col gap-3">
                <p className="text-sm text-slate-500 font-medium">{t.home.trustText}</p>
                <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="flex items-center gap-1 font-bold text-xl"><span className="material-symbols-outlined">html</span> HTML5</div>
                  <div className="flex items-center gap-1 font-bold text-xl"><span className="material-symbols-outlined">css</span> CSS3</div>
                  <div className="flex items-center gap-1 font-bold text-xl"><span className="material-symbols-outlined">javascript</span> JS</div>
                  <div className="flex items-center gap-1 font-bold text-xl"><span className="material-symbols-outlined">database</span> SQL</div>
                </div>
              </div>
            </div>
            {/* Image Content */}
            <div className="flex-1 w-full lg:w-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-center bg-cover bg-no-repeat shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" data-alt="Modern server room with blue neon lights and technology equipment" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIFKzLqZUS6jXA8_NhA8rZmfX1E5KfUvY2d_mguB2Z2fRYQa7uQlsnCVrivgl7VU7oCtmRcJaxStXSpx3_juj-8RH_tuY-MgAxZ9g-XIfyItiR40osRA93yUWGiQwXIw8MUy3Xelhz_WCrLBnWAYzERVS87l-FakIU7n-Q26W7FMgItzV89SPgPc-TSUwtORRhReKo2uy4ILcaxhOjeAOxtt3udREO_QxDim6SPr9r_sVfwQHIUC0RKol80w_NNn75CqDo58nRIaU3")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                {/* Floating Card 1 */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.home.card1Title}</p>
                    <p className="text-slate-300 text-xs">{t.home.card1Sub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="px-4 md:px-10 lg:px-40 py-20 bg-white dark:bg-[#161b24] border-y border-slate-200 dark:border-[#282e39]" id="servicios">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">{t.home.servicesHeader}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{t.home.servicesSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-[#282e39] hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">code</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{t.home.srvWeb}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {t.home.srvWebDesc}
              </p>
              <Link className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all" to="/servicios">
                {t.home.learnMore} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-[#282e39] hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">build</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{t.home.srvPc}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {t.home.srvPcDesc}
              </p>
              <Link className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all" to="/servicios">
                {t.home.learnMore} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-[#282e39] hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">videocam</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{t.home.srvCctv}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {t.home.srvCctvDesc}
              </p>
              <Link className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all" to="/servicios">
                {t.home.learnMore} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects/Portfolio Teaser */}
      <section className="px-4 md:px-10 lg:px-40 py-20 relative overflow-hidden" id="portafolio">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">{t.home.portfolioHeader}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">{t.home.portfolioSub}</p>
            </div>
            <a className="hidden md:flex items-center justify-center px-6 h-10 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
              {t.home.portfolioBtnAll}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10"></div>
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Dashboard interface design on a laptop screen" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrZEl1BUh-r4akelUH_WxeTxokDnWPQcFDMifVULBO4QvRIzg7wEuHboRhl_4UaZoHgBSBmCXsN5Wcc3L6G4RxLA_AxKFp9ZD9acQL1lft_okkN2QQA23i1EWZfQx7_obd2HP-Tiq93wz-wQl2iYYoDf0VB6I7uJIIboMoelBToupS6Z7RbXxXh-AgEc57LN4C4AAPIRIQhIawX0a4CA6uaZP5rfHAiOtGrzRimCQGTRieXtAva17e6bbnIzx-bysRbw89tiNAJw4O")' }}></div>
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-slate-900 to-transparent">
                <p className="text-primary font-bold text-sm mb-1">{t.home.port1Cat}</p>
                <h3 className="text-white text-xl font-bold font-display">{t.home.port1Title}</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10"></div>
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Technician installing security cameras on a wall" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC18jUpkboe4FAbFVyfJecWZGdZcsiINJB_9WdTi0hvCKba68RNqqj60wJDYc4Sq6PmEGn0AG4TpGgqk5aoSkNpsjh1NVMn5Fi3y_qMAnxK0A49lOBsigLDYWxUiVReeFRRH6NyfH-D5ZeB32KaszJkWycq_JcJCn2pii6BC0pcjYsvpQQHCv8Vpor6Aeh23fe3SJeN1ZNu_8Ok5dpKUNPTcsXb7DakvFc9PRcDagBHw6N6jy4JP2mIQ28iM9EIH2oPmAItxLQtyTX4")' }}></div>
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-slate-900 to-transparent">
                <p className="text-primary font-bold text-sm mb-1">{t.home.port2Cat}</p>
                <h3 className="text-white text-xl font-bold font-display">{t.home.port2Title}</h3>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <a className="flex items-center justify-center px-6 h-10 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full" href="#">
              {t.home.portfolioBtnAll}
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="px-4 md:px-10 lg:px-40 py-16">
        <div className="max-w-[1440px] mx-auto rounded-3xl bg-primary relative overflow-hidden px-8 py-16 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-white text-3xl md:text-4xl font-bold font-display mb-4">{t.home.ctaHeader}</h2>
            <p className="text-blue-100 text-lg">{t.home.ctaSub}</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/contacto" className="h-12 px-8 rounded-lg bg-white flex items-center text-primary text-base font-bold hover:bg-blue-50 transition-colors shadow-lg">
              {t.home.ctaBtn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
