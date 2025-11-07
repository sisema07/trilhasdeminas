
import React from 'react';
import type { Badge } from '../types';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-full max-w-sm transform transition-all animate-jump-in" onClick={e => e.stopPropagation()}>
        <div className="text-yellow-400 text-3xl mb-2">
          🎉
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Parabéns!</h2>
        <p className="text-gray-600 mt-1">Você desbloqueou o badge:</p>
        
        <div className="my-6 flex flex-col items-center">
            <img src={badge.icon} alt={badge.name} className="w-32 h-32 rounded-full border-4 border-emerald-400 shadow-lg"/>
            <h3 className="text-xl font-semibold text-emerald-700 mt-4">{badge.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{badge.description}</p>
        </div>

        <button 
          onClick={onClose} 
          className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Continuar Explorando
        </button>
      </div>
    </div>
  );
};

export default BadgeUnlockModal;
