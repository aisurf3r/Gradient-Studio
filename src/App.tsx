import React, { useEffect } from 'react';
import { GradientProvider, useGradient } from './context/GradientContext';
import GradientPreview from './components/GradientPreview';
import ColorPicker from './components/ColorPicker';
import ColorStopSlider from './components/ColorStopSlider';
import GradientControls from './components/GradientControls';
import CodeExport from './components/CodeExport';
import PresetLibrary from './components/PresetLibrary';
import ThemeToggle from './components/ThemeToggle';
import GradientHeader from './components/GradientHeader';
import { generateGradientCSS } from './utils/gradientUtils';
import { Github } from 'lucide-react';

const GradientApp: React.FC = () => {
  const { gradient, themeMode } = useGradient();

  // Update document title
  useEffect(() => {
    document.title = 'Gradient Studio';
  }, []);

  // Update body background based on theme
  useEffect(() => {
    document.body.className = themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  }, [themeMode]);

  // Generate gradient CSS
  const gradientCSS = generateGradientCSS(gradient);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <ThemeToggle />
      <GradientHeader />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <GradientPreview />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ColorStopSlider />
              <GradientControls />
            </div>
            
            <CodeExport />
          </div>
          
          {/* Right column */}
          <div className="lg:col-span-1 space-y-6">
            <ColorPicker />
            <PresetLibrary />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`py-4 mt-8 text-center text-sm ${themeMode === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'} shadow-inner`}>
        <p className="flex items-center justify-center gap-2">
          Gradient Studio - Create and customize beautiful gradients
          <a 
            href="https://github.com/aisurf3r/Gradient-Studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-blue-500 transition-colors"
          >
            <Github size={18} />
          </a>
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GradientProvider>
      <GradientApp />
    </GradientProvider>
  );
};

export default App;