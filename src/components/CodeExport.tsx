import React, { useState } from 'react';
import { useGradient } from '../context/GradientContext';
import { CodeExportFormat } from '../types';
import { generateGradientCSSCode, generateReactCode, generateSVGCode } from '../utils/gradientUtils';
import { Code, Copy, Check } from 'lucide-react';

const CodeExport: React.FC = () => {
  const { gradient, themeMode } = useGradient();
  const [format, setFormat] = useState<CodeExportFormat>('css');
  const [copied, setCopied] = useState(false);
  
  // Get code based on selected format
  const getCodeForFormat = () => {
    switch (format) {
      case 'css':
        return generateGradientCSSCode(gradient);
      case 'react':
        return generateReactCode(gradient);
      case 'svg':
        return generateSVGCode(gradient);
      default:
        return '';
    }
  };
  
  const code = getCodeForFormat();
  
  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className={`p-4 ${themeMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Code size={20} className="mr-2" />
          Export Code
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFormat('css')}
            className={`px-3 py-1 text-sm rounded-md ${
              format === 'css'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            CSS
          </button>
          <button
            onClick={() => setFormat('react')}
            className={`px-3 py-1 text-sm rounded-md ${
              format === 'react'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            React
          </button>
          <button
            onClick={() => setFormat('svg')}
            className={`px-3 py-1 text-sm rounded-md ${
              format === 'svg'
                ? 'bg-blue-500 text-white'
                : themeMode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            SVG
          </button>
        </div>
      </div>
      
      <div className="relative">
        <pre className={`p-4 rounded-md overflow-auto max-h-64 text-sm font-mono ${
          themeMode === 'dark' 
            ? 'bg-gray-900 text-gray-300' 
            : 'bg-gray-50 text-gray-800'
        }`}>
          <code>{code}</code>
        </pre>
        
        <button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 p-2 rounded-md ${
            copied 
              ? 'bg-green-500 text-white' 
              : themeMode === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      
      <div className="mt-4 text-sm">
        {format === 'css' && (
          <p className={themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            CSS code includes vendor prefixes for better browser compatibility.
          </p>
        )}
        {format === 'react' && (
          <p className={themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            React code uses styled-components. You can easily adapt it to other CSS-in-JS libraries.
          </p>
        )}
        {format === 'svg' && (
          <p className={themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            SVG code can be used directly in your HTML or saved as a separate file.
          </p>
        )}
      </div>
    </div>
  );
};

export default CodeExport;