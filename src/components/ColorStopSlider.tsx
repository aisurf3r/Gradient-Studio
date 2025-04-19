import React, { useRef, useState, useEffect } from 'react';
import { useGradient } from '../context/GradientContext';
import { getRandomColor } from '../utils/colorUtils';
import { Plus } from 'lucide-react';

const ColorStopSlider: React.FC = () => {
  const { 
    gradient, 
    activeColorStop, 
    setActiveColorStop, 
    addColorStop, 
    updateColorStop,
    themeMode
  } = useGradient();
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  
  // Handle click on the slider to add a new color stop
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    // Don't add color if clicking on an existing stop
    if ((e.target as HTMLElement).closest('.color-stop')) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    
    // Generate a color that's a blend of the surrounding colors
    const stops = gradient.colorStops;
    let color;
    
    if (stops.length === 0) {
      color = getRandomColor();
    } else if (stops.length === 1) {
      color = stops[0].color;
    } else {
      // Find the stops to blend between
      let leftStop = stops[0];
      let rightStop = stops[stops.length - 1];
      
      for (let i = 0; i < stops.length - 1; i++) {
        if (stops[i].position <= position && stops[i + 1].position >= position) {
          leftStop = stops[i];
          rightStop = stops[i + 1];
          break;
        }
      }
      
      // For now, just choose the stop that's closer to the click
      color = Math.abs(leftStop.position - position) < Math.abs(rightStop.position - position)
        ? leftStop.color
        : rightStop.color;
    }
    
    addColorStop(position, color);
  };
  
  // Handle start of dragging a color stop
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    if (!sliderRef.current) return;
    
    const stop = gradient.colorStops.find(s => s.id === id);
    if (!stop) return;
    
    setIsDragging(true);
    setStartX(e.clientX);
    setStartPosition(stop.position);
    
    // Set the active color stop
    setActiveColorStop(stop);
    
    // Add listeners for mouse movement and release
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
  };
  
  // Handle color stop dragging
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || !activeColorStop) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const deltaX = e.clientX - startX;
    const deltaPosition = Math.round((deltaX / rect.width) * 100);
    let newPosition = Math.max(0, Math.min(100, startPosition + deltaPosition));
    
    // Ensure we don't go past adjacent stops
    const stops = gradient.colorStops;
    const currentIndex = stops.findIndex(s => s.id === activeColorStop.id);
    
    if (currentIndex > 0) {
      newPosition = Math.max(stops[currentIndex - 1].position, newPosition);
    }
    
    if (currentIndex < stops.length - 1) {
      newPosition = Math.min(stops[currentIndex + 1].position, newPosition);
    }
    
    updateColorStop(activeColorStop.id, { position: newPosition });
  };
  
  // Handle end of dragging
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Remove listeners
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  };
  
  // Clean up event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, []);
  
  // Generate CSS for the gradient background
  const gradientBackground = gradient.colorStops
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ');
  
  return (
    <div className={`p-4 ${themeMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Color Stops</h2>
        {gradient.colorStops.length < 10 && (
          <button
            onClick={() => {
              const middlePosition = 50;
              // Find the middle value between color stops
              if (gradient.colorStops.length >= 2) {
                const positions = gradient.colorStops.map(s => s.position).sort((a, b) => a - b);
                for (let i = 0; i < positions.length - 1; i++) {
                  if (positions[i + 1] - positions[i] > 10) {
                    // Found a gap, place the new stop in the middle
                    const middle = Math.round((positions[i] + positions[i + 1]) / 2);
                    addColorStop(middle, getRandomColor());
                    return;
                  }
                }
              }
              // Default to middle if no good gap is found
              addColorStop(middlePosition, getRandomColor());
            }}
            className={`flex items-center text-sm font-medium ${themeMode === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
            aria-label="Add color stop"
          >
            <Plus size={16} className="mr-1" />
            Add Stop
          </button>
        )}
      </div>
      
      <div className="relative mb-2">
        <div
          ref={sliderRef}
          className={`w-full h-8 rounded-lg cursor-pointer ${themeMode === 'dark' ? 'shadow-dark' : 'shadow-md'}`}
          style={{ background: `linear-gradient(to right, ${gradientBackground})` }}
          onClick={handleSliderClick}
        >
          {gradient.colorStops.map((stop) => (
            <div
              key={stop.id}
              className={`color-stop absolute top-1/2 -mt-3 w-6 h-6 rounded-full shadow-md border-2 ${activeColorStop?.id === stop.id ? 'border-blue-500 scale-110' : 'border-white'} cursor-move transition-all duration-200`}
              style={{
                backgroundColor: stop.color,
                left: `calc(${stop.position}% - 0.75rem)`,
                zIndex: activeColorStop?.id === stop.id ? 10 : 5
              }}
              onMouseDown={(e) => handleDragStart(e, stop.id)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveColorStop(stop);
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-xs mt-1 px-2 text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {gradient.colorStops.map((stop) => (
            <div 
              key={stop.id}
              className={`px-3 py-1 rounded-full text-xs flex items-center ${activeColorStop?.id === stop.id ? 'ring-2 ring-blue-500' : ''} ${themeMode === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} cursor-pointer transition-all duration-200`}
              onClick={() => setActiveColorStop(stop)}
            >
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: stop.color }}
              />
              {stop.position}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorStopSlider;