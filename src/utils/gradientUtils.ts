import { GradientState, ColorStop, GradientType, EasingType, GradientDirection } from '../types';
import { hexToRgba, adjustSaturation } from './colorUtils';

// Generate CSS for a gradient based on current state
export const generateGradientCSS = (gradient: GradientState): string => {
  const { type, colorStops, direction, angle, easing, saturationAdjustment } = gradient;
  
  // Apply saturation adjustment to color stops
  const adjustedColorStops = colorStops.map(stop => ({
    ...stop,
    color: saturationAdjustment !== 0 ? adjustSaturation(stop.color, saturationAdjustment) : stop.color
  }));

  // Apply easing to color stop positions
  const easedColorStops = adjustedColorStops.map(stop => {
    let position = stop.position;
    
    switch (easing) {
      case 'ease-in':
        position = Math.pow(position / 100, 2) * 100;
        break;
      case 'ease-out':
        position = (1 - Math.pow(1 - position / 100, 2)) * 100;
        break;
      case 'ease-in-out':
        position = position <= 50
          ? Math.pow(position / 50, 2) * 50
          : (1 - Math.pow(1 - (position - 50) / 50, 2)) * 50 + 50;
        break;
      default:
        break;
    }
    
    return {
      ...stop,
      position
    };
  });
  
  // Create color stop string
  const colorStopsString = easedColorStops
    .map(stop => `${hexToRgba(stop.color, stop.opacity)} ${stop.position}%`)
    .join(', ');
  
  // Generate gradient based on type
  let gradientCSS = '';
  
  switch (type) {
    case 'linear':
      const directionValue = direction === 'custom' ? `${angle}deg` : direction;
      gradientCSS = `linear-gradient(${directionValue}, ${colorStopsString})`;
      break;
    case 'radial':
      gradientCSS = `radial-gradient(circle, ${colorStopsString})`;
      break;
    case 'conic':
      gradientCSS = `conic-gradient(from ${angle}deg, ${colorStopsString})`;
      break;
    default:
      gradientCSS = `linear-gradient(to right, ${colorStopsString})`;
  }
  
  return gradientCSS;
};

// Generate CSS code for export
export const generateGradientCSSCode = (gradient: GradientState): string => {
  const css = generateGradientCSS(gradient);
  
  return `.gradient-element {
  background: ${css};
  /* Vendor prefixes for better compatibility */
  background: -webkit-${css};
  background: -moz-${css};
}`;
};

// Generate React/TypeScript code using styled-components
export const generateReactCode = (gradient: GradientState): string => {
  const css = generateGradientCSS(gradient);
  
  return `import styled from 'styled-components';

const GradientElement = styled.div\`
  background: ${css};
  width: 100%;
  height: 100%;
\`;

export default function MyComponent() {
  return <GradientElement />;
}`;
};

// Generate SVG code
export const generateSVGCode = (gradient: GradientState): string => {
  const { type, colorStops, angle } = gradient;
  
  let svgContent = '';
  
  if (type === 'linear') {
    // Calculate x1, y1, x2, y2 based on angle
    const angleRad = (angle * Math.PI) / 180;
    const x1 = 50 - 50 * Math.cos(angleRad);
    const y1 = 50 - 50 * Math.sin(angleRad);
    const x2 = 50 + 50 * Math.cos(angleRad);
    const y2 = 50 + 50 * Math.sin(angleRad);
    
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
      ${colorStops.map(stop => `<stop offset="${stop.position}%" style="stop-color:${stop.color};stop-opacity:${stop.opacity}" />`).join('\n      ')}
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#gradient)" />
</svg>`;
  } else if (type === 'radial') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      ${colorStops.map(stop => `<stop offset="${stop.position}%" style="stop-color:${stop.color};stop-opacity:${stop.opacity}" />`).join('\n      ')}
    </radialGradient>
  </defs>
  <rect width="100" height="100" fill="url(#gradient)" />
</svg>`;
  } else if (type === 'conic') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
  <defs>
    <style>
      @property --angle {
        syntax: '<angle>';
        initial-value: ${angle}deg;
        inherits: false;
      }
      #conicGradient {
        background: conic-gradient(from var(--angle), ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')});
      }
    </style>
  </defs>
  <rect id="conicGradient" width="100" height="100" />
</svg>`;
  }
  
  return svgContent;
};

// Generate a new unique color stop
export const createNewColorStop = (position: number, color: string): ColorStop => {
  return {
    id: crypto.randomUUID(),
    color,
    position,
    opacity: 1
  };
};

// Initialize with a default gradient
export const getDefaultGradient = (): GradientState => {
  return {
    type: 'linear',
    colorStops: [
      createNewColorStop(0, '#ff5f6d'),
      createNewColorStop(100, '#ffc371')
    ],
    direction: 'to right',
    angle: 90,
    easing: 'none',
    saturationAdjustment: 0
  };
};