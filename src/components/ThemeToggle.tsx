import React from 'react';
import { useGradient } from '../context/GradientContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useGradient();
  
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-2 rounded-full ${
        themeMode === 'dark'
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      } transition-all duration-300 shadow-md z-10`}
      aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;