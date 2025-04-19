import { ColorStop } from '../types';

// Convert hex to rgba
export const hexToRgba = (hex: string, opacity: number = 1): string => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return the rgba value
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Convert rgb to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Adjust saturation of a hex color
export const adjustSaturation = (hex: string, adjustment: number): string => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  // Convert RGB to HSL
  let max = Math.max(r, g, b) / 255;
  let min = Math.min(r, g, b) / 255;
  let l = (max + min) / 2;
  let s;
  let h;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r / 255: h = (g / 255 - b / 255) / d + (g < b ? 6 : 0); break;
      case g / 255: h = (b / 255 - r / 255) / d + 2; break;
      case b / 255: h = (r / 255 - g / 255) / d + 4; break;
    }
    h /= 6;
  }
  
  // Adjust saturation
  s = Math.max(0, Math.min(1, s + adjustment / 100));
  
  // Convert back to RGB
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h * 6) % 2 - 1));
  let m = l - c / 2;
  let [r1, g1, b1] = [0, 0, 0];
  
  if (0 <= h && h < 1/6) {
    [r1, g1, b1] = [c, x, 0];
  } else if (1/6 <= h && h < 2/6) {
    [r1, g1, b1] = [x, c, 0];
  } else if (2/6 <= h && h < 3/6) {
    [r1, g1, b1] = [0, c, x];
  } else if (3/6 <= h && h < 4/6) {
    [r1, g1, b1] = [0, x, c];
  } else if (4/6 <= h && h < 5/6) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }
  
  r = Math.round((r1 + m) * 255);
  g = Math.round((g1 + m) * 255);
  b = Math.round((b1 + m) * 255);
  
  // Convert back to hex
  return rgbToHex(r, g, b);
};

// Check color contrast for accessibility
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (hex: string): number => {
    hex = hex.replace('#', '');
    const rgb = hex.match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
    
    for (let i = 0; i < rgb.length; i++) {
      rgb[i] = rgb[i] <= 0.03928 ? rgb[i] / 12.92 : Math.pow((rgb[i] + 0.055) / 1.055, 2.4);
    }
    
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Math.round(ratio * 100) / 100;
};

// Determine if text color should be light or dark based on background
export const getTextColor = (backgroundColor: string): string => {
  const contrast = getContrastRatio(backgroundColor, '#ffffff');
  return contrast >= 4.5 ? '#ffffff' : '#000000';
};

// Apply opacity to color stops for gradient display
export const applyOpacityToColorStops = (colorStops: ColorStop[]): ColorStop[] => {
  return colorStops.map(stop => ({
    ...stop,
    color: hexToRgba(stop.color, stop.opacity)
  }));
};

// Generate a random hex color
export const getRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};