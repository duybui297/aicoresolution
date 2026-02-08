import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import InsightsPage from './pages/InsightsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactPage from './pages/Contact';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { ROUTE_PATHS } from './utils/routeConstants';

function App() {
  const location = useLocation();

  // Update document title and meta tags when language changes
  useDocumentMeta();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Routes>
          {/* Home Route */}
          <Route path={ROUTE_PATHS.home.vi} element={<Home />} />
          <Route path={ROUTE_PATHS.home.en} element={<Home />} />

          {/* Services Routes */}
          <Route path={ROUTE_PATHS.services.vi} element={<ServicesPage />} />
          <Route path={ROUTE_PATHS.services.en} element={<ServicesPage />} />

          {/* Case Studies Routes */}
          <Route path={ROUTE_PATHS.caseStudies.vi} element={<CaseStudiesPage />} />
          <Route path={ROUTE_PATHS.caseStudies.en} element={<CaseStudiesPage />} />

          {/* Insights/News Routes */}
          <Route path={ROUTE_PATHS.news.vi} element={<InsightsPage />} />
          <Route path={ROUTE_PATHS.news.en} element={<InsightsPage />} />
          <Route path={ROUTE_PATHS.newsDetail.vi} element={<NewsDetailPage />} />
          <Route path={ROUTE_PATHS.newsDetail.en} element={<NewsDetailPage />} />

          {/* Contact Routes */}
          <Route path={ROUTE_PATHS.contact.vi} element={<ContactPage />} />
          <Route path={ROUTE_PATHS.contact.en} element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
