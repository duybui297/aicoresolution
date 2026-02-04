import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import { useDocumentMeta } from './hooks/useDocumentMeta';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'case-studies' | 'insights' | 'about'>('home');

  // Update document title and meta tags when language changes
  useDocumentMeta();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'services':
        return <ServicesPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'insights':
        return <InsightsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>{renderContent()}</main>
      <Footer />
    </div>
  );
}

export default App;
