import React, { useState } from 'react';
import { useGradient } from '../context/GradientContext';
import { gradientPresets, getPresetsByCategory, getAllCategories } from '../utils/presets';
import { generateGradientCSS } from '../utils/gradientUtils';
import { BookOpen } from 'lucide-react';

const PresetLibrary: React.FC = () => {
  const { setGradient, themeMode } = useGradient();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...getAllCategories()];
  
  // Get presets filtered by category
  const filteredPresets = activeCategory === 'All' 
    ? gradientPresets 
    : getPresetsByCategory(activeCategory);
  
  // Apply a preset
  const applyPreset = (presetId: string) => {
    const preset = gradientPresets.find(p => p.id === presetId);
    if (preset) {
      setGradient(preset.gradient);
    }
  };
  
  return (
    <div className={`p-4 ${themeMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen size={20} className="mr-2" />
          Preset Library
        </h2>
      </div>
      
      {/* Category tabs */}
      <div className="flex space-x-1 mb-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Preset grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
        {filteredPresets.map(preset => {
          const gradientCSS = generateGradientCSS(preset.gradient);
          
          return (
            <div
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="cursor-pointer transform transition-all duration-200 hover:scale-105"
            >
              <div 
                className="h-24 rounded-lg shadow-md mb-1"
                style={{ background: gradientCSS }}
              />
              <p className={`text-xs font-medium truncate ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {preset.name}
              </p>
              <p className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {preset.category}
              </p>
            </div>
          );
        })}
      </div>
      
      {filteredPresets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No presets found for this category.
        </div>
      )}
    </div>
  );
};

export default PresetLibrary;