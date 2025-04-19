import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GradientState, ColorStop, GradientType, EasingType, GradientDirection, ThemeMode } from '../types';
import { getDefaultGradient, createNewColorStop } from '../utils/gradientUtils';

type GradientContextType = {
  gradient: GradientState;
  setGradient: React.Dispatch<React.SetStateAction<GradientState>>;
  activeColorStop: ColorStop | null;
  setActiveColorStop: React.Dispatch<React.SetStateAction<ColorStop | null>>;
  addColorStop: (position: number, color: string) => void;
  updateColorStop: (id: string, updates: Partial<ColorStop>) => void;
  removeColorStop: (id: string) => void;
  themeMode: ThemeMode;
  toggleTheme: () => void;
};

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const GradientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gradient, setGradient] = useState<GradientState>(getDefaultGradient());
  const [activeColorStop, setActiveColorStop] = useState<ColorStop | null>(gradient.colorStops[0]);
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Set default theme to dark

  useEffect(() => {
    // Initialize active color stop when gradient changes
    if (gradient.colorStops.length > 0 && !activeColorStop) {
      setActiveColorStop(gradient.colorStops[0]);
    }
  }, [gradient, activeColorStop]);

  // Add a new color stop to the gradient
  const addColorStop = (position: number, color: string) => {
    if (gradient.colorStops.length >= 10) return; // Maximum 10 color stops
    
    const newStop = createNewColorStop(position, color);
    
    setGradient(prev => ({
      ...prev,
      colorStops: [...prev.colorStops, newStop].sort((a, b) => a.position - b.position)
    }));
    
    setActiveColorStop(newStop);
  };

  // Update a color stop
  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setGradient(prev => {
      const updatedStops = prev.colorStops.map(stop => 
        stop.id === id ? { ...stop, ...updates } : stop
      ).sort((a, b) => a.position - b.position);
      
      return {
        ...prev,
        colorStops: updatedStops
      };
    });
    
    // Update active color stop if it's the one being modified
    if (activeColorStop?.id === id) {
      setActiveColorStop(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  // Remove a color stop
  const removeColorStop = (id: string) => {
    // Don't remove if we would have less than 2 stops
    if (gradient.colorStops.length <= 2) return;
    
    setGradient(prev => ({
      ...prev,
      colorStops: prev.colorStops.filter(stop => stop.id !== id)
    }));
    
    // If we're removing the active color stop, set the first one as active
    if (activeColorStop?.id === id) {
      setActiveColorStop(gradient.colorStops.find(stop => stop.id !== id) || null);
    }
  };

  // Toggle theme mode
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <GradientContext.Provider
      value={{
        gradient,
        setGradient,
        activeColorStop,
        setActiveColorStop,
        addColorStop,
        updateColorStop,
        removeColorStop,
        themeMode,
        toggleTheme
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};

export const useGradient = (): GradientContextType => {
  const context = useContext(GradientContext);
  if (context === undefined) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
};