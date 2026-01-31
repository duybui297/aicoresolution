import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudiesPage from './pages/CaseStudiesPage';
import Contact from './pages/Contact';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'case-studies' | 'contact'>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'contact':
        return <Contact />;
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
