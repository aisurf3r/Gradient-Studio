import React from 'react';
import { useGradient } from '../context/GradientContext';
import { GradientType, GradientDirection, EasingType } from '../types';
import { SlidersHorizontal, Circle, Compass } from 'lucide-react';

const GradientControls: React.FC = () => {
  const { gradient, setGradient, themeMode } = useGradient();

  // Update gradient type
  const handleTypeChange = (type: GradientType) => {
    setGradient(prev => ({ ...prev, type }));
  };

  // Update gradient direction
  const handleDirectionChange = (direction: GradientDirection) => {
    setGradient(prev => ({ ...prev, direction }));
  };

  // Update gradient angle
  const handleAngleChange = (angle: number) => {
    setGradient(prev => ({ ...prev, angle }));
  };

  // Update easing
  const handleEasingChange = (easing: EasingType) => {
    setGradient(prev => ({ ...prev, easing }));
  };

  // Update saturation
  const handleSaturationChange = (adjustment: number) => {
    setGradient(prev => ({ ...prev, saturationAdjustment: adjustment }));
  };

  return (
    <div className={`p-4 ${themeMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg transition-all duration-300`}>
      <h2 className="text-xl font-semibold mb-4">Gradient Controls</h2>

      {/* Gradient Type */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Type
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => handleTypeChange('linear')}
            className={`flex-1 px-3 py-2 rounded-md flex items-center justify-center text-sm ${
              gradient.type === 'linear'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Linear
          </button>
          <button
            onClick={() => handleTypeChange('radial')}
            className={`flex-1 px-3 py-2 rounded-md flex items-center justify-center text-sm ${
              gradient.type === 'radial'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <Circle size={16} className="mr-2" />
            Radial
          </button>
          <button
            onClick={() => handleTypeChange('conic')}
            className={`flex-1 px-3 py-2 rounded-md flex items-center justify-center text-sm ${
              gradient.type === 'conic'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <Compass size={16} className="mr-2" />
            Conic
          </button>
        </div>
      </div>

      {/* Direction/Angle controls - only for linear gradients */}
      {gradient.type === 'linear' && (
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Direction
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: '↑', value: 'to top' },
              { label: '↗', value: 'to top right' },
              { label: '→', value: 'to right' },
              { label: '↘', value: 'to bottom right' },
              { label: '↓', value: 'to bottom' },
              { label: '↙', value: 'to bottom left' },
              { label: '←', value: 'to left' },
              { label: '↖', value: 'to top left' }
            ].map((dir) => (
              <button
                key={dir.value}
                onClick={() => handleDirectionChange(dir.value as GradientDirection)}
                className={`p-2 rounded-md ${
                  gradient.direction === dir.value
                    ? 'bg-blue-500 text-white'
                    : themeMode === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors text-xl font-bold`}
              >
                {dir.label}
              </button>
            ))}
          </div>

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="custom-angle"
              checked={gradient.direction === 'custom'}
              onChange={(e) =>
                handleDirectionChange(e.target.checked ? 'custom' : 'to right')
              }
              className="mr-2"
            />
            <label
              htmlFor="custom-angle"
              className={`text-sm ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Custom Angle
            </label>
          </div>

          {gradient.direction === 'custom' && (
            <div>
              <div className="flex justify-between">
                <label className={`text-sm ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Angle
                </label>
                <span className={`text-sm ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {gradient.angle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={gradient.angle}
                onChange={(e) => handleAngleChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Angle control for conic gradients */}
      {gradient.type === 'conic' && (
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className={`text-sm font-medium ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Angle
            </label>
            <span className={`text-sm ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {gradient.angle}°
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={gradient.angle}
            onChange={(e) => handleAngleChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      )}

      {/* Easing */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Easing
        </label>
        <select
          value={gradient.easing}
          onChange={(e) => handleEasingChange(e.target.value as EasingType)}
          className={`w-full px-3 py-2 rounded-md border ${
            themeMode === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-800'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="none">None</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In-Out</option>
        </select>
      </div>

      {/* Saturation Adjustment */}
      <div>
        <div className="flex justify-between mb-1">
          <label className={`text-sm font-medium ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Vibrancy
          </label>
          <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {gradient.saturationAdjustment > 0 ? '+' : ''}{gradient.saturationAdjustment}%
          </span>
        </div>
        <input
          type="range"
          min="-50"
          max="50"
          value={gradient.saturationAdjustment}
          onChange={(e) => handleSaturationChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span>Muted</span>
          <span>Vibrant</span>
        </div>
      </div>
    </div>
  );
};

export default GradientControls;