
import React from 'react';
import { LogoIcon } from './ui/Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-[#FFD700]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase">
              LUXIA<span className="text-[#FFD700]">Studio</span>
            </h1>
        </div>
      </div>
    </header>
  );
};
