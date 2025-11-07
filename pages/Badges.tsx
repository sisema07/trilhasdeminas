
import React, { useState } from 'react';
import type { Badge } from '../types';
import PhotoStamper from '../components/PhotoStamper';

interface BadgesPageProps {
  allBadges: Badge[];
  collectedBadgeIds: string[];
}

type Filter = 'all' | 'collected' | 'not_collected';

const BadgeItem: React.FC<{ badge: Badge, isCollected: boolean, onSelect: () => void }> = ({ badge, isCollected, onSelect }) => (
    <div 
        className={`text-center p-4 rounded-lg transition-all duration-300 ${isCollected ? 'bg-white shadow-md cursor-pointer' : 'bg-gray-200'}`}
        onClick={isCollected ? onSelect : undefined}
    >
        <img 
            src={badge.icon} 
            alt={badge.name} 
            className={`w-24 h-24 rounded-full mx-auto border-4 ${isCollected ? 'border-emerald-400' : 'border-gray-300'} ${!isCollected && 'grayscale'}`}
        />
        <h3 className={`mt-2 font-semibold ${isCollected ? 'text-gray-800' : 'text-gray-500'}`}>{badge.name}</h3>
        {isCollected && <p className="text-xs text-emerald-600">Conquistado!</p>}
    </div>
);

const BadgesPage: React.FC<BadgesPageProps> = ({ allBadges, collectedBadgeIds }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const filteredBadges = allBadges.filter(badge => {
    if (filter === 'collected') return collectedBadgeIds.includes(badge.id);
    if (filter === 'not_collected') return !collectedBadgeIds.includes(badge.id);
    return true;
  });

  if (selectedBadge) {
    return (
        <div className="p-4">
             <button onClick={() => setSelectedBadge(null)} className="mb-4 text-emerald-600 font-semibold">&larr; Voltar para Badges</button>
             <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                    <img src={selectedBadge.icon} alt={selectedBadge.name} className="w-20 h-20 rounded-full border-4 border-emerald-400" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedBadge.name}</h2>
                        <p className="text-gray-600">{selectedBadge.description}</p>
                    </div>
                </div>
                <PhotoStamper badge={selectedBadge} />
             </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">Meus Badges</h1>
      <p className="text-center text-gray-600 mb-6 -mt-4">Escaneie o QR e libere a conquista!</p>
      
      <div className="flex justify-center space-x-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>Todos</button>
        <button onClick={() => setFilter('collected')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'collected' ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>Conquistados</button>
        <button onClick={() => setFilter('not_collected')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'not_collected' ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>Não Conquistados</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map(badge => (
          <BadgeItem 
            key={badge.id} 
            badge={badge} 
            isCollected={collectedBadgeIds.includes(badge.id)}
            onSelect={() => setSelectedBadge(badge)}
          />
        ))}
      </div>
    </div>
  );
};

export default BadgesPage;