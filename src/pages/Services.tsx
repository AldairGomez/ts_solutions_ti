import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t, language } = useLanguage();

  const pageVariants: any = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <motion.main 
      className="flex-1 flex flex-col items-center w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="flex flex-col max-w-[960px] w-full px-4 md:px-10 py-5">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-6 py-10 md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-2xl shadow-primary/10" data-alt="Abstract 3D blue geometric shapes representing technology and data structure" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7xzFltBZ4R0aX-g3uYTufrad0y5vq7FNtY6arhdamVARc-7BVBAEzx_yZac51dHmyKl8NFw8bgQmZkj-dAp5grPLcr11htwPTkx1eLegOAQ-s6oQlH9W4J1WEGeMQ5Hx-dVGlhEAECihFNeKi8pl9MD2jWJSXR-FmB3yWRXChoRolizyy6G0Rl1xEj1Fox1gLOKnDtveEVisIZdGFd0IGIHiP_usOKQZpFaTLyMVl2LUsaLWTUJkttbbBeBmIIs-jqgJcCdsXcbhC")' }}>
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col gap-6 w-full md:w-1/2 md:pl-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col gap-3 text-left">
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  {t.services.heroTitle}
                </h1>
                <h2 className="text-[#9ca6ba] text-base md:text-lg font-normal leading-relaxed">
                  {t.services.heroSubtitle}
                </h2>
              </div>
              <div className="flex gap-4">
                <Link to={`/${language}/contacto`} className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-[0_0_20px_rgba(13,89,242,0.3)]">
                  <span className="truncate">{t.services.heroBtn}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 border-l-4 border-primary pl-4">{t.services.header}</h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: 'code',
              title: t.services.srvWeb,
              desc: t.services.srvWebDesc,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtCI-oKkmaWHHIZjmzgc1BAnDfAhZPm9_Vh_gUH-my49SrRIUCdSu-o1bFvz33OWVDcx4m9eTi38G_DtTMTlQZJgdNXakJTs1vep5qMM3Jgjg_ARN26Gg-GZ21YJBkn4Yvod1L-Ug4RaGcqcoFrJ-W8MJpDE0eEx5T9OvRxqTn5ef-Zcan3vVW-0M7khMXDn6SFjdP1sPaQRw19ij6awrn3VL94YgtuTdeaT31nGBTdfXRQ0RIql5MwWrfzneSWtYgYulkuFsJuELg'
            },
            {
              icon: 'memory',
              title: t.services.srvPc,
              desc: t.services.srvPcDesc,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjaWhuACUSg6FZpSMLjpkmrVB59cDi2wGv1F8VbrojR0k2VB05Jrs74dZHx8uygONnKhBTG6cs60CgFi5rd8pv-ZV5opv2Gn3VZLH8Ux5HvsKQODr8UyRYfqPj4HdNf8QgoZ9_W-GmD5ABmyS6iw6ZAkvQMVIiYFT-tehaST6p2y7qbePqh9Y0PlEy-EHnT5u6-ASivyuQ1KAXULBLz_kW3E-bukhvRNvYh46rJtlKWBW9_9LPnVfKW_Sb4DanvpudsTaB8m6jpTIi'
            },
            {
              icon: 'videocam',
              title: t.services.srvCctv,
              desc: t.services.srvCctvDesc,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkg7t2L9ly36EPwDrRFMs6ydo17eTrGaL0jvwxEJgWQJPtBSObX-KqpdLrRyCWgEqmAZlxmslTII68TDkb8TgGF_uxI-3FCpKb4LzIuF59QDPecfpB293cfI-QAW1O2AzmHlocn53L-d1pmv1nqRJoTwcC4NnrLKjcCcaPs6bFLGijajVovwG8bOFcMbt8zqMyPz9nws_ZcTVLO0gnEiT9KU3c2jkhov7BrkKxsdA3BUCGMYfJX2uUIhwgRG1VFxd7gd9RiRiB7Lg1'
            }
          ].map((srv, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col rounded-xl bg-[#1b1f27] border border-[#282e39] overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="w-full aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url("${srv.img}")` }}></div>
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined">{srv.icon}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold leading-tight">{srv.title}</h3>
                  <p className="text-[#9ca6ba] text-sm font-normal leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-auto pt-4">
                  <button className="flex items-center gap-2 text-primary text-sm font-bold group">
                    {t.services.learnMore}
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Strip */}
        <motion.div 
          className="w-full rounded-2xl bg-gradient-to-r from-background-dark to-[#1b1f27] border border-[#282e39] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">{t.services.ctaHeader}</h3>
            <p className="text-[#9ca6ba]">{t.services.ctaSub}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to={`/${language}/contacto`} className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-white text-background-dark hover:bg-gray-100 transition-colors text-sm font-bold leading-normal">
              <span className="truncate">{t.services.ctaBtn}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
