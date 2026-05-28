import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <div className="flex flex-col max-w-[960px] w-full px-4 md:px-10 py-5">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-6 py-10 md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-2xl shadow-primary/10" data-alt="Abstract 3D blue geometric shapes representing technology and data structure" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7xzFltBZ4R0aX-g3uYTufrad0y5vq7FNtY6arhdamVARc-7BVBAEzx_yZac51dHmyKl8NFw8bgQmZkj-dAp5grPLcr11htwPTkx1eLegOAQ-s6oQlH9W4J1WEGeMQ5Hx-dVGlhEAECihFNeKi8pl9MD2jWJSXR-FmB3yWRXChoRolizyy6G0Rl1xEj1Fox1gLOKnDtveEVisIZdGFd0IGIHiP_usOKQZpFaTLyMVl2LUsaLWTUJkttbbBeBmIIs-jqgJcCdsXcbhC")' }}>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full md:w-1/2 md:pl-8">
              <div className="flex flex-col gap-3 text-left">
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  {t.services.heroTitle}
                </h1>
                <h2 className="text-[#9ca6ba] text-base md:text-lg font-normal leading-relaxed">
                  {t.services.heroSubtitle}
                </h2>
              </div>
              <Link to="/contacto" className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-[0_0_20px_rgba(13,89,242,0.3)]">
                <span className="truncate">{t.services.heroBtn}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Services Header */}
        <div className="mb-6">
          <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 border-l-4 border-primary pl-4">{t.services.header}</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {/* Card 1: Web Development */}
          <div className="flex flex-col rounded-xl bg-[#1b1f27] border border-[#282e39] overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <div className="w-full aspect-[4/3] bg-cover bg-center" data-alt="Close up of computer code on a dark screen with blue syntax highlighting" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtCI-oKkmaWHHIZjmzgc1BAnDfAhZPm9_Vh_gUH-my49SrRIUCdSu-o1bFvz33OWVDcx4m9eTi38G_DtTMTlQZJgdNXakJTs1vep5qMM3Jgjg_ARN26Gg-GZ21YJBkn4Yvod1L-Ug4RaGcqcoFrJ-W8MJpDE0eEx5T9OvRxqTn5ef-Zcan3vVW-0M7khMXDn6SFjdP1sPaQRw19ij6awrn3VL94YgtuTdeaT31nGBTdfXRQ0RIql5MwWrfzneSWtYgYulkuFsJuELg")' }}></div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{t.services.srvWeb}</h3>
                <p className="text-[#9ca6ba] text-sm font-normal leading-relaxed">{t.services.srvWebDesc}</p>
              </div>
              <div className="mt-auto pt-4">
                <button className="flex items-center gap-2 text-primary text-sm font-bold group">
                  {t.services.learnMore}
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: PC Maintenance */}
          <div className="flex flex-col rounded-xl bg-[#1b1f27] border border-[#282e39] overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <div className="w-full aspect-[4/3] bg-cover bg-center" data-alt="Technician hands working on a computer motherboard with tools" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjaWhuACUSg6FZpSMLjpkmrVB59cDi2wGv1F8VbrojR0k2VB05Jrs74dZHx8uygONnKhBTG6cs60CgFi5rd8pv-ZV5opv2Gn3VZLH8Ux5HvsKQODr8UyRYfqPj4HdNf8QgoZ9_W-GmD5ABmyS6iw6ZAkvQMVIiYFT-tehaST6p2y7qbePqh9Y0PlEy-EHnT5u6-ASivyuQ1KAXULBLz_kW3E-bukhvRNvYh46rJtlKWBW9_9LPnVfKW_Sb4DanvpudsTaB8m6jpTIi")' }}></div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">memory</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{t.services.srvPc}</h3>
                <p className="text-[#9ca6ba] text-sm font-normal leading-relaxed">{t.services.srvPcDesc}</p>
              </div>
              <div className="mt-auto pt-4">
                <button className="flex items-center gap-2 text-primary text-sm font-bold group">
                  {t.services.learnMore}
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Security Cameras */}
          <div className="flex flex-col rounded-xl bg-[#1b1f27] border border-[#282e39] overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <div className="w-full aspect-[4/3] bg-cover bg-center" data-alt="Modern security camera mounted on a wall with blue light" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkg7t2L9ly36EPwDrRFMs6ydo17eTrGaL0jvwxEJgWQJPtBSObX-KqpdLrRyCWgEqmAZlxmslTII68TDkb8TgGF_uxI-3FCpKb4LzIuF59QDPecfpB293cfI-QAW1O2AzmHlocn53L-d1pmv1nqRJoTwcC4NnrLKjcCcaPs6bFLGijajVovwG8bOFcMbt8zqMyPz9nws_ZcTVLO0gnEiT9KU3c2jkhov7BrkKxsdA3BUCGMYfJX2uUIhwgRG1VFxd7gd9RiRiB7Lg1")' }}></div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">videocam</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{t.services.srvCctv}</h3>
                <p className="text-[#9ca6ba] text-sm font-normal leading-relaxed">{t.services.srvCctvDesc}</p>
              </div>
              <div className="mt-auto pt-4">
                <button className="flex items-center gap-2 text-primary text-sm font-bold group">
                  {t.services.learnMore}
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Strip */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-background-dark to-[#1b1f27] border border-[#282e39] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">{t.services.ctaHeader}</h3>
            <p className="text-[#9ca6ba]">{t.services.ctaSub}</p>
          </div>
          <div className="relative z-10">
            <Link to="/contacto" className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-white text-background-dark hover:bg-gray-100 transition-colors text-sm font-bold leading-normal">
              {t.services.ctaBtn}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
