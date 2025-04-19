import React from 'react';
import { useGradient } from '../context/GradientContext';
import { generateGradientCSS } from '../utils/gradientUtils';
import { getDefaultGradient } from '../utils/gradientUtils';
import { RotateCcw } from 'lucide-react';

const GradientPreview: React.FC = () => {
  const { gradient, themeMode, setGradient } = useGradient();
  
  const gradientCSS = generateGradientCSS(gradient);
  
  const handleReset = () => {
    setGradient(getDefaultGradient());
  };
  
  return (
    <div className={`w-full p-4 ${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-lg transition-all duration-300 ease-in-out`}>
      <h2 className={`text-xl font-semibold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-gray-800'}`}>Preview</h2>
      <div className="relative">
        <div 
          className="w-full h-64 rounded-lg shadow-inner transition-all duration-500 ease-in-out"
          style={{ background: gradientCSS }}
          aria-label="Gradient preview"
        />
        <button
          onClick={handleReset}
          className={`absolute bottom-2 right-2 p-1.5 rounded-md bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 ${
            themeMode === 'dark' 
              ? 'bg-gray-800 text-gray-300 hover:text-white' 
              : 'bg-white text-gray-600 hover:text-gray-800'
          }`}
          title="Reset gradient"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="mt-4">
        <p className={`text-sm ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Type: <span className="font-medium">{gradient.type}</span>
          {gradient.type === 'linear' && (
            <span> • Direction: {gradient.direction === 'custom' ? `${gradient.angle}°` : gradient.direction}</span>
          )}
          {gradient.type === 'conic' && (
            <span> • Angle: {gradient.angle}°</span>
          )}
          <span> • Colors: {gradient.colorStops.length}</span>
        </p>
      </div>
    </div>
  );
};

export default GradientPreview;