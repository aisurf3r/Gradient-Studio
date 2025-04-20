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

  useEffect(() => {
    document.title = 'Gradient Studio';
  }, []);

  useEffect(() => {
    document.body.className = themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  }, [themeMode]);

  const gradientCSS = generateGradientCSS(gradient);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <ThemeToggle />
      <GradientHeader />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6 lg:col-span-2 order-1">
            <div className="order-1 lg:order-1">
              <GradientPreview />
            </div>
            
            <div className="order-2 lg:order-2">
              <ColorStopSlider />
            </div>
            
            <div className="order-3 lg:hidden">
              <ColorPicker />
            </div>
            
            <div className="order-4 lg:order-3">
              <GradientControls />
            </div>
            
            <div className="order-5 lg:hidden">
              <PresetLibrary />
            </div>
            
            <div className="order-6 lg:order-4">
              <CodeExport />
            </div>
          </div>
          
          <div className="hidden lg:flex lg:flex-col gap-6 lg:col-span-1 order-2">
            <ColorPicker />
            <PresetLibrary />
          </div>
        </div>
      </main>
      
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
