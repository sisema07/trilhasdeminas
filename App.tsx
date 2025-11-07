import React, { useState, useEffect, useCallback } from 'react';
import type { Page, Badge, Park, QuizQuestion } from './types';
import { BADGES, PARKS } from './data/mockData';
import useLocalStorage from './hooks/useLocalStorage';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import ParksPage from './pages/Parks';
import BadgesPage from './pages/Badges';
import Profile from './pages/Profile';
import BadgeUnlockModal from './components/BadgeUnlockModal';
import ParkDetail from './pages/ParkDetail';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useLocalStorage('showWelcome', true);
  const [currentPage, setCurrentPage] = useState<Page>('parks');
  const [collectedBadges, setCollectedBadges] = useLocalStorage<string[]>('collectedBadges', []);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const badgeIdToUnlock = params.get('unlock_badge');

    if (badgeIdToUnlock) {
      const badge = BADGES.find(b => b.id === badgeIdToUnlock);
      if (badge && !collectedBadges.includes(badge.id)) {
        setCollectedBadges(prev => [...prev, badge.id]);
        setUnlockedBadge(badge);
      } else if (badge) {
        // Already collected, still show modal for feedback
        setUnlockedBadge(badge);
      } else {
        alert("QR Code inválido ou não corresponde a um badge.");
      }
      
      // Clean URL to prevent re-triggering on refresh or navigation
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []); // Runs only on initial app load

  const renderPage = () => {
    if (selectedPark) {
        return <ParkDetail park={selectedPark} collectedBadgeIds={collectedBadges} onBack={() => setSelectedPark(null)} />;
    }

    switch (currentPage) {
        case 'parks':
            return <ParksPage parks={PARKS} onSelectPark={setSelectedPark} onSelectBadges={() => handleNav('badges')} />;
        case 'badges':
            return <BadgesPage allBadges={BADGES} collectedBadgeIds={collectedBadges} />;
        case 'profile':
            return <Profile collectedCount={collectedBadges.length} totalCount={BADGES.length} />;
        default:
            return <ParksPage parks={PARKS} onSelectPark={setSelectedPark} onSelectBadges={() => handleNav('badges')}/>;
    }
  };

  const handleNav = (page: Page) => {
    setSelectedPark(null);
    setCurrentPage(page);
  }
  
  const handleBack = () => {
    if (selectedPark) {
        setSelectedPark(null);
    } else if (currentPage !== 'parks') {
        setCurrentPage('parks');
    }
  }

  if (showWelcome) {
    return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;
  }
  
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header 
        onNav={handleNav}
        onBack={handleBack}
        showBack={!!selectedPark || currentPage !== 'parks'}
      />
      <main className="pt-20">
        {renderPage()}
      </main>
      {unlockedBadge && (
        <BadgeUnlockModal badge={unlockedBadge} onClose={() => setUnlockedBadge(null)} />
      )}
    </div>
  );
};

export default App;