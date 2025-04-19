import React, { useState, useEffect } from 'react';
import { useGradient } from '../context/GradientContext';
import { hexToRgba, rgbToHex } from '../utils/colorUtils';
import { PlusCircle, X } from 'lucide-react';

const ColorPicker: React.FC = () => {
  const { 
    gradient, 
    activeColorStop, 
    updateColorStop, 
    removeColorStop,
    themeMode
  } = useGradient();
  
  const [hexValue, setHexValue] = useState(activeColorStop?.color || '#ff5f6d');
  const [opacity, setOpacity] = useState(activeColorStop?.opacity || 1);
  
  // RGB state
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  
  // HSL state
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  
  // Update local state when active color stop changes
  useEffect(() => {
    if (activeColorStop) {
      setHexValue(activeColorStop.color);
      setOpacity(activeColorStop.opacity);
      
      // Parse RGB from hex
      const hex = activeColorStop.color.replace('#', '');
      const red = parseInt(hex.substring(0, 2), 16);
      const green = parseInt(hex.substring(2, 4), 16);
      const blue = parseInt(hex.substring(4, 6), 16);
      
      setR(red);
      setG(green);
      setB(blue);
      
      // Convert RGB to HSL
      const r1 = red / 255;
      const g1 = green / 255;
      const b1 = blue / 255;
      
      const max = Math.max(r1, g1, b1);
      const min = Math.min(r1, g1, b1);
      let hue = 0;
      let sat = 0;
      const light = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        sat = light > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r1:
            hue = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
            break;
          case g1:
            hue = (b1 - r1) / d + 2;
            break;
          case b1:
            hue = (r1 - g1) / d + 4;
            break;
        }
        
        hue = Math.round(hue * 60);
      }
      
      setH(hue);
      setS(Math.round(sat * 100));
      setL(Math.round(light * 100));
    }
  }, [activeColorStop]);
  
  // Update the color stop when hex value changes
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexValue(newHex);
    
    if (newHex.length === 7 && activeColorStop) {
      updateColorStop(activeColorStop.id, { color: newHex });
    }
  };
  
  // Update color when RGB values change
  const handleRGBChange = (
    type: 'r' | 'g' | 'b',
    value: number
  ) => {
    let newR = r;
    let newG = g;
    let newB = b;

    if (type === 'r') newR = value;
    if (type === 'g') newG = value;
    if (type === 'b') newB = value;

    setR(newR);
    setG(newG);
    setB(newB);

    const newHex = rgbToHex(newR, newG, newB);
    setHexValue(newHex);

    if (activeColorStop) {
      updateColorStop(activeColorStop.id, { color: newHex });
    }
  };
  
  // Handle HSL change
  const handleHSLChange = (
    type: 'h' | 's' | 'l',
    value: number
  ) => {
    let newH = h;
    let newS = s;
    let newL = l;

    if (type === 'h') newH = value;
    if (type === 's') newS = value;
    if (type === 'l') newL = value;

    setH(newH);
    setS(newS);
    setL(newL);
    
    // Convert HSL to RGB
    const h1 = newH / 360;
    const s1 = newS / 100;
    const l1 = newL / 100;
    
    let r1, g1, b1;
    
    if (s1 === 0) {
      r1 = g1 = b1 = l1;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l1 < 0.5 ? l1 * (1 + s1) : l1 + s1 - l1 * s1;
      const p = 2 * l1 - q;
      
      r1 = hue2rgb(p, q, h1 + 1/3);
      g1 = hue2rgb(p, q, h1);
      b1 = hue2rgb(p, q, h1 - 1/3);
    }
    
    const red = Math.round(r1 * 255);
    const green = Math.round(g1 * 255);
    const blue = Math.round(b1 * 255);
    
    setR(red);
    setG(green);
    setB(blue);
    
    const newHex = rgbToHex(red, green, blue);
    setHexValue(newHex);
    
    if (activeColorStop) {
      updateColorStop(activeColorStop.id, { color: newHex });
    }
  };
  
  // Handle opacity change
  const handleOpacityChange = (value: number) => {
    setOpacity(value);
    
    if (activeColorStop) {
      updateColorStop(activeColorStop.id, { opacity: value });
    }
  };
  
  return (
    <div className={`p-4 ${themeMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Color Picker</h2>
        {activeColorStop && gradient.colorStops.length > 2 && (
          <button
            onClick={() => removeColorStop(activeColorStop.id)}
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label="Remove color stop"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {activeColorStop ? (
        <div className="space-y-4">
          {/* Color Preview */}
          <div 
            className="w-full h-16 rounded-md shadow-inner transition-all duration-300"
            style={{ 
              background: hexToRgba(hexValue, opacity),
              borderRadius: '0.375rem'
            }}
          />
          
          {/* HEX Input */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              HEX
            </label>
            <input
              type="text"
              value={hexValue}
              onChange={handleHexChange}
              className={`w-full px-3 py-2 rounded-md border ${themeMode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              maxLength={7}
            />
          </div>
          
          {/* RGB Sliders */}
          <div className="space-y-3">
            <h3 className={`text-sm font-medium ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>RGB</h3>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>R</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{r}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={r}
                onChange={(e) => handleRGBChange('r', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>G</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{g}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={g}
                onChange={(e) => handleRGBChange('g', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>B</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{b}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={b}
                onChange={(e) => handleRGBChange('b', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
          
          {/* HSL Sliders */}
          <div className="space-y-3">
            <h3 className={`text-sm font-medium ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>HSL</h3>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>H</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{h}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={h}
                onChange={(e) => handleHSLChange('h', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(0, ${s}%, ${l}%), 
                    hsl(60, ${s}%, ${l}%), 
                    hsl(120, ${s}%, ${l}%), 
                    hsl(180, ${s}%, ${l}%), 
                    hsl(240, ${s}%, ${l}%), 
                    hsl(300, ${s}%, ${l}%), 
                    hsl(360, ${s}%, ${l}%))`
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>S</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{s}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={s}
                onChange={(e) => handleHSLChange('s', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${h}, 0%, ${l}%), 
                    hsl(${h}, 100%, ${l}%))`
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>L</label>
                <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{l}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={l}
                onChange={(e) => handleHSLChange('l', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${h}, ${s}%, 0%), 
                    hsl(${h}, ${s}%, 50%), 
                    hsl(${h}, ${s}%, 100%))`
                }}
              />
            </div>
          </div>
          
          {/* Opacity Slider */}
          <div>
            <div className="flex justify-between items-center">
              <label className={`text-sm font-medium ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Opacity</label>
              <span className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <PlusCircle size={48} className="text-gray-400 mb-2" />
          <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Select a color stop to edit</p>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;