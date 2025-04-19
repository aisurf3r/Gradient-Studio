import React from 'react';
import { useGradient } from '../context/GradientContext';
import { Palette } from 'lucide-react';

const GradientHeader: React.FC = () => {
  const { themeMode } = useGradient();
  
  return (
    <header className={`py-4 px-6 ${themeMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md transition-colors duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Palette size={28} className="text-blue-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Gradient Studio
          </h1>
        </div>
        <div className="text-sm">
          <span className={themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Create beautiful gradients with ease</span>
        </div>
      </div>
    </header>
  );
};

export default GradientHeader;