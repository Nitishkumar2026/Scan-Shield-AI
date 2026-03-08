import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import BrandTrust from './sections/BrandTrust';
import Features from './sections/Features';
import SplitContentProtection from './sections/SplitContentProtection';
import SplitContentMonitoring from './sections/SplitContentMonitoring';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import Dashboard from './sections/Dashboard';

import CallAnalysis from './sections/CallAnalysis';
import SMSScanner from './sections/SMSScanner';
import UPIAnalyzer from './sections/UPIAnalyzer';
import FraudNetwork from './sections/FraudNetwork';
import ThreatHeatmap from './sections/ThreatHeatmap';
import Analytics from './sections/Analytics';
import FamilyGuardian from './sections/FamilyGuardian';
import CommunityReports from './sections/CommunityReports';
import AdminPortal from './sections/AdminPortal';
import './App.css';

export type Page =
  | 'home'
  | 'dashboard'
  | 'call-analysis'
  | 'sms-scanner'
  | 'upi-analyzer'
  | 'fraud-network'
  | 'threat-heatmap'
  | 'analytics'
  | 'family-guardian'
  | 'community-reports'
  | 'admin-portal';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <div id="home"><Hero onGetStarted={() => setCurrentPage('dashboard')} /></div>
            <BrandTrust />
            <div id="features"><Features onNavigate={setCurrentPage} /></div>
            <SplitContentProtection />
            <SplitContentMonitoring />
            <div id="pricing"><Pricing onNavigate={setCurrentPage} /></div>
            <div id="faq"><FAQ onNavigate={setCurrentPage} /></div>
            <div id="contact"><CTA onGetStarted={() => setCurrentPage('dashboard')} /></div>
          </>
        );
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'call-analysis':
        return <CallAnalysis />;
      case 'sms-scanner':
        return <SMSScanner />;
      case 'upi-analyzer':
        return <UPIAnalyzer />;
      case 'fraud-network':
        return <FraudNetwork />;
      case 'threat-heatmap':
        return <ThreatHeatmap />;
      case 'analytics':
        return <Analytics />;
      case 'family-guardian':
        return <FamilyGuardian />;
      case 'community-reports':
        return <CommunityReports />;
      case 'admin-portal':
        return <AdminPortal />;
      default:
        return <Hero onGetStarted={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">

      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1f36',
            border: '1px solid rgba(36, 103, 236, 0.3)',
            color: '#fff',
          },
        }}
      />

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 cyber-grid opacity-50 pointer-events-none" />

      {/* Scan Line Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50 opacity-30">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent animate-scan-line" />
      </div>

      {/* Navigation */}
      <Navigation
        isScrolled={isScrolled}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Footer - Only show on home page */}
      {currentPage === 'home' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
