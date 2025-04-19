import { GradientPreset } from '../types';
import { getDefaultGradient, createNewColorStop } from './gradientUtils';

export const gradientPresets: GradientPreset[] = [
  // Nature Presets
  {
    id: 'forest',
    name: 'Forest',
    category: 'Nature',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#2D3F43'),
        createNewColorStop(50, '#1C6047'),
        createNewColorStop(100, '#7EB58D')
      ]
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    category: 'Nature',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF512F'),
        createNewColorStop(50, '#F09819'),
        createNewColorStop(100, '#FFC371')
      ]
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    category: 'Nature',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#1A2980'),
        createNewColorStop(100, '#26D0CE')
      ]
    }
  },
  {
    id: 'aurora',
    name: 'Aurora',
    category: 'Nature',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#009FFF'),
        createNewColorStop(50, '#00FF87'),
        createNewColorStop(100, '#98FF98')
      ]
    }
  },
  {
    id: 'desert',
    name: 'Desert',
    category: 'Nature',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FFB75E'),
        createNewColorStop(50, '#ED8F03'),
        createNewColorStop(100, '#B83C0C')
      ]
    }
  },
  
  // Neon Presets
  {
    id: 'cyber',
    name: 'Cyber',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF00E4'),
        createNewColorStop(50, '#8900FF'),
        createNewColorStop(100, '#00FFD1')
      ]
    }
  },
  {
    id: 'electric',
    name: 'Electric',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#0500FF'),
        createNewColorStop(100, '#FF00E4')
      ],
      type: 'linear',
      angle: 45
    }
  },
  {
    id: 'toxic',
    name: 'Toxic',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#D3FF00'),
        createNewColorStop(100, '#00FFD1')
      ]
    }
  },
  {
    id: 'plasma',
    name: 'Plasma',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF0099'),
        createNewColorStop(50, '#00FF00'),
        createNewColorStop(100, '#00FFFF')
      ]
    }
  },
  {
    id: 'laser',
    name: 'Laser',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF0000'),
        createNewColorStop(50, '#FF00FF'),
        createNewColorStop(100, '#0000FF')
      ]
    }
  },
  
  // Pastel Presets
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FFAFBD'),
        createNewColorStop(100, '#ffc3a0')
      ]
    }
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#F6D365'),
        createNewColorStop(100, '#FDA085')
      ]
    }
  },
  {
    id: 'bubble-gum',
    name: 'Bubble Gum',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#CCABD8'),
        createNewColorStop(100, '#A0E9FF')
      ]
    }
  },
  {
    id: 'mint-cream',
    name: 'Mint Cream',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#98FF98'),
        createNewColorStop(50, '#B4F8C8'),
        createNewColorStop(100, '#D0FFF0')
      ]
    }
  },
  {
    id: 'peach-sorbet',
    name: 'Peach Sorbet',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FFB6C1'),
        createNewColorStop(50, '#FFD7BA'),
        createNewColorStop(100, '#FFF0DB')
      ]
    }
  },
  
  // Retro Presets
  {
    id: 'eighties',
    name: '80s Vibes',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FC5C7D'),
        createNewColorStop(50, '#BB4E75'),
        createNewColorStop(100, '#6A82FB')
      ]
    }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#C9CCD3'),
        createNewColorStop(100, '#93A5CF')
      ],
      saturationAdjustment: -30
    }
  },
  {
    id: 'sepia',
    name: 'Sepia',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#704214'),
        createNewColorStop(50, '#A67C52'),
        createNewColorStop(100, '#DCD0C0')
      ],
      saturationAdjustment: -20
    }
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF9E80'),
        createNewColorStop(50, '#FF6B6B'),
        createNewColorStop(100, '#4A90E2')
      ]
    }
  },
  {
    id: 'vhs',
    name: 'VHS',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#E40203'),
        createNewColorStop(50, '#5D2C91'),
        createNewColorStop(100, '#0B7189')
      ]
    }
  },
  
  // Modern Presets
  {
    id: 'midnight',
    name: 'Midnight',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#0F2027'),
        createNewColorStop(50, '#203A43'),
        createNewColorStop(100, '#2C5364')
      ]
    }
  },
  {
    id: 'royal',
    name: 'Royal',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#141E30'),
        createNewColorStop(100, '#243B55')
      ]
    }
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF3CAC'),
        createNewColorStop(50, '#784BA0'),
        createNewColorStop(100, '#2B86C5')
      ]
    }
  },
  {
    id: 'tech-noir',
    name: 'Tech Noir',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#000428'),
        createNewColorStop(100, '#004e92')
      ]
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#E0E0E0'),
        createNewColorStop(100, '#FFFFFF')
      ]
    }
  },
  {
    id: 'slate',
    name: 'Slate',
    category: 'Modern',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#1F1C2C'),
        createNewColorStop(100, '#928DAB')
      ]
    }
  },
  
  // Additional Neon Presets
  {
    id: 'synthwave',
    name: 'Synthwave',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF00FF'),
        createNewColorStop(50, '#00FFFF'),
        createNewColorStop(100, '#FF00FF')
      ]
    }
  },
  {
    id: 'matrix',
    name: 'Matrix',
    category: 'Neon',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#000000'),
        createNewColorStop(50, '#003B00'),
        createNewColorStop(100, '#00FF00')
      ]
    }
  },
  
  // Additional Pastel Presets
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#E6E6FA'),
        createNewColorStop(100, '#FFF0F5')
      ]
    }
  },
  {
    id: 'soft-coral',
    name: 'Soft Coral',
    category: 'Pastel',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FFE5E5'),
        createNewColorStop(100, '#FFB6C1')
      ]
    }
  },
  
  // Additional Retro Presets
  {
    id: 'nintendo',
    name: 'Nintendo',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#8B0000'),
        createNewColorStop(100, '#FF0000')
      ]
    }
  },
  {
    id: 'commodore',
    name: 'Commodore',
    category: 'Retro',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#352879'),
        createNewColorStop(100, '#7B68EE')
      ]
    }
  },
  
  // Warm Presets
  {
    id: 'sunrise',
    name: 'Sunrise',
    category: 'Warm',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF512F'),
        createNewColorStop(100, '#DD2476')
      ]
    }
  },
  {
    id: 'autumn',
    name: 'Autumn',
    category: 'Warm',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#DAA520'),
        createNewColorStop(50, '#D2691E'),
        createNewColorStop(100, '#8B4513')
      ]
    }
  },
  {
    id: 'desert-sun',
    name: 'Desert Sun',
    category: 'Warm',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF8C00'),
        createNewColorStop(100, '#FFD700')
      ]
    }
  },
  {
    id: 'spicy',
    name: 'Spicy',
    category: 'Warm',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FF4500'),
        createNewColorStop(100, '#FF8C00')
      ]
    }
  },
  
  // Cool Presets
  {
    id: 'arctic',
    name: 'Arctic',
    category: 'Cool',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#2980B9'),
        createNewColorStop(100, '#6DD5FA')
      ]
    }
  },
  {
    id: 'frost',
    name: 'Frost',
    category: 'Cool',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#E0EAFC'),
        createNewColorStop(100, '#CFDEF3')
      ]
    }
  },
  {
    id: 'deep-sea',
    name: 'Deep Sea',
    category: 'Cool',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#000080'),
        createNewColorStop(100, '#0000CD')
      ]
    }
  },
  {
    id: 'glacier',
    name: 'Glacier',
    category: 'Cool',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#B0E0E6'),
        createNewColorStop(100, '#87CEEB')
      ]
    }
  },
  
  // New Category: Metallic
  {
    id: 'gold',
    name: 'Gold',
    category: 'Metallic',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#FFD700'),
        createNewColorStop(50, '#FFA500'),
        createNewColorStop(100, '#FF8C00')
      ]
    }
  },
  {
    id: 'silver',
    name: 'Silver',
    category: 'Metallic',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#C0C0C0'),
        createNewColorStop(50, '#D3D3D3'),
        createNewColorStop(100, '#E8E8E8')
      ]
    }
  },
  {
    id: 'bronze',
    name: 'Bronze',
    category: 'Metallic',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#CD7F32'),
        createNewColorStop(50, '#B8860B'),
        createNewColorStop(100, '#DAA520')
      ]
    }
  },
  
  // New Category: Abstract
  {
    id: 'nebula',
    name: 'Nebula',
    category: 'Abstract',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#663399'),
        createNewColorStop(50, '#FF1493'),
        createNewColorStop(100, '#9400D3')
      ]
    }
  },
  {
    id: 'quantum',
    name: 'Quantum',
    category: 'Abstract',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#4B0082'),
        createNewColorStop(50, '#8A2BE2'),
        createNewColorStop(100, '#9400D3')
      ]
    }
  },
  {
    id: 'void',
    name: 'Void',
    category: 'Abstract',
    gradient: {
      ...getDefaultGradient(),
      colorStops: [
        createNewColorStop(0, '#000000'),
        createNewColorStop(50, '#1A1A1A'),
        createNewColorStop(100, '#333333')
      ]
    }
  }
];

export const getPresetsByCategory = (category: string) => {
  return gradientPresets.filter(preset => preset.category === category);
};

export const getPresetById = (id: string) => {
  return gradientPresets.find(preset => preset.id === id);
};

export const getAllCategories = () => {
  return [...new Set(gradientPresets.map(preset => preset.category))];
};