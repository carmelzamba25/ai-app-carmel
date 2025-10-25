
import React, { useState } from 'react';
import { SERVICES } from './constants';
import { Header } from './components/Header';
import { ServiceContainer } from './components/ServiceContainer';
import { Service } from './types';

interface ServiceTabsProps {
  services: Service[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ services, activeIndex, onSelect }) => {
  return (
    <div className="flex justify-center border-b border-gray-800">
      <div className="flex space-x-4 sm:space-x-8" role="tablist">
        {services.map((service, index) => (
          <button
            key={service.nomService}
            onClick={() => onSelect(index)}
            role="tab"
            aria-selected={activeIndex === index}
            className={`py-3 px-2 sm:px-4 text-sm sm:text-base font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#FFD700] rounded-t-lg
              ${
                activeIndex === index
                  ? 'border-b-2 border-[#FFD700] text-[#FFD700]'
                  : 'text-gray-400 hover:text-white'
              }
            `}
          >
            {service.nomService}
          </button>
        ))}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = SERVICES[activeServiceIndex];

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ServiceTabs
          services={SERVICES}
          activeIndex={activeServiceIndex}
          onSelect={setActiveServiceIndex}
        />
        <div className="mt-8">
            <ServiceContainer key={activeService.nomService} service={activeService} />
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LUXIA Studio. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
