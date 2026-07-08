import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import CustomChatbot from './components/CustomChatbot';
import ScrollToTop from './components/ScrollToTop';
import AnimatedRoutes from './components/AnimatedRoutes';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-1000 min-h-screen flex flex-col font-body selection:bg-primary selection:text-white relative">
          <ParticleBackground />
          <div className="relative z-10 flex flex-col flex-grow w-full">
            <Header />
            <FloatingSocials />
            <CustomChatbot />
            <AnimatedRoutes />
            <Footer />
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
