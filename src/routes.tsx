import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';

import { Navigate } from 'react-router-dom';

function LanguageRedirect() {
  if (typeof window !== 'undefined') {
    const userLang = navigator.language || (navigator as any).userLanguage;
    if (userLang && userLang.toLowerCase().startsWith('en')) {
      return <Navigate to="/en" replace />;
    }
  }
  return <Navigate to="/es" replace />;
}

export const routes: RouteRecord[] = [
  {
    path: '/:lang',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <Services /> },
      { path: 'contacto', element: <Contact /> },
    ],
  },
  {
    path: '/',
    element: <LanguageRedirect />
  }
];
