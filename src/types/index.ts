export type ColorStop = {
  id: string;
  color: string;
  position: number;
  opacity: number;
};

export type GradientType = 'linear' | 'radial' | 'conic';

export type EasingType = 'none' | 'ease-in' | 'ease-out' | 'ease-in-out';

export type GradientDirection = 'to top' | 'to right' | 'to bottom' | 'to left' | 'to top right' | 'to bottom right' | 'to bottom left' | 'to top left' | 'custom';

export type GradientState = {
  type: GradientType;
  colorStops: ColorStop[];
  direction: GradientDirection;
  angle: number;
  easing: EasingType;
  saturationAdjustment: number;
};

export type PresetCategory = 'Nature' | 'Neon' | 'Pastel' | 'Retro';

export type GradientPreset = {
  id: string;
  name: string;
  category: PresetCategory;
  gradient: GradientState;
};

export type CodeExportFormat = 'css' | 'react' | 'svg';

export type ThemeMode = 'light' | 'dark';