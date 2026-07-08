import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import CustomChatbot from './components/CustomChatbot';
import ScrollToTop from './components/ScrollToTop';
import ParticleBackground from './components/ParticleBackground';

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      {element && React.cloneElement(element as React.ReactElement, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default function Layout() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-1000 min-h-screen flex flex-col font-body selection:bg-primary selection:text-white relative">
        <ParticleBackground />
        <div className="relative z-10 flex flex-col flex-grow w-full">
          <Header />
          <FloatingSocials />
          <CustomChatbot />
          <AnimatedOutlet />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
