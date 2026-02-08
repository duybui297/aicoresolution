import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/Contact';
import { useDocumentMeta } from './hooks/useDocumentMeta';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'case-studies' | 'news' | 'contact'>('home');

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
      case 'news':
        return <InsightsPage />;
      case 'contact':
        // Since we replaced About with Contact in Home, maybe we should also have a ContactPage?
        // But the user just said "change About section to Contact".
        // However, the navigation now has 'contact' tab.
        // If I click 'contact', it should probably scroll to contact section or show a Contact Page.
        // Given the Home page has <Contact /> now, maybe I should just create a ContactPage wrapper or use Home?
        // Wait, the user has a `pages/Contact.tsx`. Let's check if I should use that.
        return <ContactPage />;
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
