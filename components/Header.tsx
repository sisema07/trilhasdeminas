import React from 'react';
import type { Page } from '../types';
import { HomeIcon, UserCircleIcon, ChevronLeftIcon } from './Icons';

interface HeaderProps {
  onNav: (page: Page) => void;
  onBack: () => void;
  showBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNav, onBack, showBack }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-4 z-50">
      <div className="w-1/4 flex justify-start">
        {showBack ? (
          <button onClick={onBack} className="p-2 -ml-2 text-gray-700 hover:text-emerald-600" aria-label="Voltar">
            <ChevronLeftIcon className="h-7 w-7" />
          </button>
        ) : (
          <button onClick={() => onNav('parks')} className="p-2 -ml-2 text-emerald-600" aria-label="Início">
            <HomeIcon className="h-7 w-7" />
          </button>
        )}
      </div>

      <div className="w-1/2 flex justify-center text-center">
         <h1 className="text-3xl font-bold text-gray-800 font-display whitespace-nowrap">
            Trilhas de Minas
          </h1>
      </div>

      <div className="w-1/4 flex justify-end">
        <button onClick={() => onNav('profile')} className="p-2 text-gray-700 hover:text-emerald-600" aria-label="Perfil">
          <UserCircleIcon className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
};

export default Header;