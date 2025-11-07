import React, { useState, useMemo } from 'react';
import type { Park } from '../types';
import { BadgeCheckIcon } from '../components/Icons';
import Info from './Info';

interface ParksProps {
  parks: Park[];
  onSelectPark: (park: Park) => void;
  onSelectBadges: () => void;
}

const ParkCard: React.FC<{ park: Park; onSelect: () => void }> = ({ park, onSelect }) => (
  <div onClick={onSelect} className="relative aspect-[4/5] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group">
    <img className="w-full h-full object-cover group-hover:brightness-110 transition-all" src={park.images[0]} alt={park.name} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <h3 className="absolute bottom-2 left-2 right-2 text-white font-bold text-xs sm:text-sm leading-tight text-center">{park.name.replace('Parque Estadual ', '').replace('Parque Estadual', '')}</h3>
  </div>
);

const BadgesCard: React.FC<{ onSelect: () => void }> = ({ onSelect }) => (
    <div onClick={onSelect} className="relative aspect-[4/5] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group flex flex-col items-center justify-center bg-emerald-600 text-white p-2">
        <BadgeCheckIcon className="h-10 w-10 sm:h-12 sm:w-12 mb-1"/>
        <h3 className="font-bold text-xs sm:text-sm text-center">Meus Badges</h3>
    </div>
);

const difficultyFilters = ['Fácil', 'Moderada', 'Difícil'];
const allFilters = ['Todos', 'Fácil', 'Moderada', 'Difícil', 'Cachoeira', 'Gruta', 'Pico', 'Trilha Histórica'];

const Parks: React.FC<ParksProps> = ({ parks, onSelectPark, onSelectBadges }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredParks = useMemo(() => {
    if (activeFilter === 'Todos') {
      return parks;
    }
    return parks.filter(park => {
        if (difficultyFilters.includes(activeFilter)) {
            return park.difficulty === activeFilter;
        }
        return park.tags?.includes(activeFilter);
    });
  }, [parks, activeFilter]);


  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {allFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm ${
                activeFilter === filter
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <BadgesCard onSelect={onSelectBadges} />
        {filteredParks.map(park => (
          <ParkCard key={park.id} park={park} onSelect={() => onSelectPark(park)} />
        ))}
      </div>
      
      <div className="mt-12">
        <Info />
      </div>
    </div>
  );
};

export default Parks;