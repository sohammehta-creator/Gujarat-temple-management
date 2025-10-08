
import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

type View = 'landing' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'landing':
      default:
        return <LandingPage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-cream-100 min-h-screen text-gray-800 bg-[#FFF8F0]">
      <Header setCurrentView={setCurrentView} />
      <main>
        {renderView()}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
