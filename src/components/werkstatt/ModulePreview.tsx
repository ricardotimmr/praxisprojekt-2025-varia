import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import type { LayoutConfig, DesignConfig, ViewportSize } from "@/pages/Werkstatt";

interface ModulePreviewProps {
  moduleType: 'feature-slider' | '360-viewer' | 'hotspot-graphics';
  moduleSettings: Record<string, any>;
  layoutConfig: LayoutConfig;
  designConfig: DesignConfig;
  viewportSize: ViewportSize;
  onModuleSettingsChange: (settings: Record<string, any>) => void;
}

export const ModulePreview = ({ 
  moduleType, 
  moduleSettings, 
  layoutConfig, 
  designConfig, 
  viewportSize,
  onModuleSettingsChange
}: ModulePreviewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [current360Index, setCurrent360Index] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [is360AutoPlaying, setIs360AutoPlaying] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedHotspotIndex, setDraggedHotspotIndex] = useState<number | null>(null);
  const hotspotContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoPlaying && moduleType === 'feature-slider') {
      const slides = moduleSettings.slides || [];
      if (slides.length > 0) {
        const duration = (moduleSettings.slideDuration || 3) * 1000; // Convert to milliseconds
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, duration);
        return () => clearInterval(interval);
      }
    }
  }, [isAutoPlaying, moduleSettings.slides, moduleSettings.slideDuration, moduleType]);

  useEffect(() => {
    if ((is360AutoPlaying || moduleSettings.autoRotate) && moduleType === '360-viewer') {
      const images = moduleSettings.images || [];
      if (images.length > 0) {
        const speed = moduleSettings.rotationSpeed || 3;
        const intervalTime = Math.max(50, 500 - (speed * 40));
        const interval = setInterval(() => {
          setCurrent360Index((prev) => (prev + 1) % images.length);
        }, intervalTime);
        return () => clearInterval(interval);
      }
    }
  }, [is360AutoPlaying, moduleSettings.autoRotate, moduleSettings.rotationSpeed, moduleSettings.images, moduleType]);

  useEffect(() => {
    setIsAutoPlaying(moduleSettings.autoplay || false);
  }, [moduleSettings.autoplay]);

  useEffect(() => {
    setIs360AutoPlaying(moduleSettings.autoRotate || false);
  }, [moduleSettings.autoRotate]);

  const getViewportClasses = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-md mx-auto';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  const getWidthClasses = () => {
    switch (layoutConfig.width) {
      case 'voll':
        return 'w-full';
      case 'breit':
        return 'w-11/12';
      case 'schmal':
        return 'w-8/12';
      case 'standard':
      default:
        return 'w-10/12';
    }
  };

  const getHeightClasses = () => {
    switch (layoutConfig.height) {
      case 'niedrig':
        return 'h-48';
      case 'hoch':
        return 'h-80';
      case 'sehr-hoch':
        return 'h-96';
      case 'standard':
      default:
        return 'h-64';
    }
  };

  const getAlignmentClasses = () => {
    const horizontal = layoutConfig.horizontalAlign === 'links' ? 'justify-start' : 
                     layoutConfig.horizontalAlign === 'rechts' ? 'justify-end' : 'justify-center';
    const vertical = layoutConfig.verticalAlign === 'oben' ? 'items-start' :
                    layoutConfig.verticalAlign === 'unten' ? 'items-end' : 'items-center';
    return `${horizontal} ${vertical}`;
  };

  const getShadowClasses = () => {
    switch (layoutConfig.shadow) {
      case 'leicht':
        return 'shadow-sm';
      case 'stark':
        return 'shadow-xl';
      case 'standard':
        return 'shadow-lg';
      case 'kein':
      default:
        return '';
    }
  };

  const getBorderClasses = () => {
    switch (layoutConfig.border) {
      case 'dünn':
        return 'border';
      case 'standard':
        return 'border-2';
      case 'kein':
      default:
        return '';
    }
  };

  const getPaddingClasses = () => {
    switch (layoutConfig.padding) {
      case 'kompakt':
        return 'p-4';
      case 'großzügig':
        return 'p-8';
      case 'standard':
      default:
        return 'p-6';
    }
  };

  const handleHotspotDragStart = (e: React.MouseEvent, index: number) => {
    setIsDragging(true);
    setDraggedHotspotIndex(index);
    e.preventDefault();
  };

  const handleHotspotDrag = (e: React.MouseEvent) => {
    if (!isDragging || draggedHotspotIndex === null || !hotspotContainerRef.current) return;
    
    const rect = hotspotContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    const updatedHotspots = [...(moduleSettings.hotspots || [])];
    updatedHotspots[draggedHotspotIndex] = {
      ...updatedHotspots[draggedHotspotIndex],
      x: clampedX,
      y: clampedY
    };
    
    onModuleSettingsChange({ ...moduleSettings, hotspots: updatedHotspots });
  };

  const handleHotspotDragEnd = () => {
    setIsDragging(false);
    setDraggedHotspotIndex(null);
  };

  const renderFeatureSlider = () => {
    const slides = moduleSettings.slides || [];
    
    if (slides.length === 0) {
      return (
        <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${getHeightClasses()}`}>
          <p className="text-gray-500">Keine Slides konfiguriert</p>
        </div>
      );
    }

    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className={`relative ${getHeightClasses()}`}>
          {slides.map((slide: any, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ${
                moduleSettings.transition === 'fade' ? 
                  (index === currentSlide ? 'opacity-100' : 'opacity-0') :
                moduleSettings.transition === 'slide' ? 
                  `transform ${index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'}` :
                moduleSettings.transition === 'zoom' ?
                  `transform scale-${index === currentSlide ? '100' : '95'} ${index === currentSlide ? 'opacity-100' : 'opacity-0'}` :
                  (index === currentSlide ? 'opacity-100' : 'opacity-0')
              }`}
            >
              {slide.image ? (
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Slide {index + 1}</span>
                </div>
              )}
              
              {(slide.title || slide.description) && (
                <div className="absolute bottom-6 left-6">
                  {slide.title && (
                    <h3 
                      className="text-lg font-bold mb-2 text-white"
                      style={{ 
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        color: designConfig.headingColor === '#E43D12' ? 'white' : designConfig.headingColor,
                        fontFamily: designConfig.fontFamily || 'inherit'
                      }}
                    >
                      {slide.title}
                    </h3>
                  )}
                  {slide.description && (
                    <p 
                      className="text-white/90"
                      style={{ 
                        textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                        color: designConfig.textColor === '#8E8D8A' ? 'rgba(255,255,255,0.9)' : designConfig.textColor,
                        fontFamily: designConfig.fontFamily || 'inherit'
                      }}
                    >
                      {slide.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
        
        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          {/* Dots Navigation */}
          <div className="flex space-x-2">
            {slides.map((_: any, index: number) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'scale-125' : ''
                }`}
                style={{
                  backgroundColor: index === currentSlide ? designConfig.accentColor : 'rgba(255,255,255,0.6)'
                }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ml-3 backdrop-blur-sm border border-white/10`}
            style={{
              backgroundColor: isAutoPlaying ? designConfig.accentColor : 'rgba(255,255,255,0.2)'
            }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? <Pause className="w-2.5 h-2.5 text-white" /> : <Play className="w-2.5 h-2.5 text-white ml-0.5" />}
          </button>
        </div>
      </div>
    );
  };

  const render360Viewer = () => {
    const images = moduleSettings.images || [];
    if (images.length === 0) {
      return (
        <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${getHeightClasses()}`}>
          <p className="text-gray-500">Keine 360° Bilder hochgeladen</p>
        </div>
      );
    }

    const handleSliderChange = (value: number[]) => {
      setCurrent360Index(value[0]);
    };

    return (
      <div className="relative rounded-lg">
        <div 
          className={`bg-gray-200 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing ${getHeightClasses()}`}
          onWheel={(e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? 1 : -1;
            setCurrent360Index((prev) => {
              const newIndex = prev + direction;
              return Math.max(0, Math.min(newIndex, images.length - 1));
            });
          }}
        >
          <img 
            src={images[current360Index]} 
            alt={`360° View ${current360Index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4 space-y-4">
          {/* Custom Slider wie im Bild */}
          <div className="relative">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div 
                className="absolute h-6 w-6 rounded-full -top-2 transform -translate-x-1/2 transition-all duration-200 shadow-md"
                style={{ 
                  backgroundColor: designConfig.accentColor,
                  left: `${(current360Index / Math.max(images.length - 1, 1)) * 100}%`
                }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={Math.max(images.length - 1, 0)}
              step={1}
              value={current360Index}
              onChange={(e) => setCurrent360Index(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-6 opacity-0 cursor-pointer"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Bild 1</span>
            <div className="flex items-center space-x-2">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2`}
                style={{
                  backgroundColor: is360AutoPlaying ? designConfig.accentColor : 'transparent',
                  borderColor: designConfig.accentColor,
                  color: is360AutoPlaying ? 'white' : designConfig.accentColor
                }}
                onClick={() => setIs360AutoPlaying(!is360AutoPlaying)}
              >
                {is360AutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
              </button>
            </div>
            <span>Bild {images.length}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHotspotGraphics = () => {
    const hotspots = moduleSettings.hotspots || [];
    const backgroundImage = moduleSettings.backgroundImage;
    const animationType = moduleSettings.animationType || 'pulse';

    return (
      <div className="relative rounded-lg">
        <div 
          ref={hotspotContainerRef}
          className={`bg-gray-200 rounded-lg relative overflow-hidden cursor-crosshair ${getHeightClasses()}`}
          onMouseMove={handleHotspotDrag}
          onMouseUp={handleHotspotDragEnd}
          onMouseLeave={handleHotspotDragEnd}
        >
          {backgroundImage ? (
            <img 
              src={backgroundImage}
              alt="Hotspot Background"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Kein Hintergrundbild</span>
            </div>
          )}
          
          {hotspots.map((hotspot: any, index: number) => (
            <div
              key={index}
              className={`absolute w-4 h-4 rounded-full cursor-move transform -translate-x-1/2 -translate-y-1/2 ${
                animationType === 'pulse' ? 'animate-pulse' : 
                animationType === 'bounce' ? 'animate-bounce' :
                animationType === 'ping' ? 'relative' : ''
              }`}
              style={{
                backgroundColor: designConfig.accentColor,
                left: `${hotspot.x || 50}%`,
                top: `${hotspot.y || 50}%`,
              }}
              onMouseDown={(e) => handleHotspotDragStart(e, index)}
              onMouseEnter={() => setHoveredHotspot(index)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {animationType === 'ping' && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: designConfig.accentColor }} />
              )}
              
              {hoveredHotspot === index && hotspot.text && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {hotspot.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModule = () => {
    return (
      <div className="relative" style={{ fontFamily: designConfig.fontFamily || 'inherit' }}>
        {moduleType === 'feature-slider' && renderFeatureSlider()}
        {moduleType === '360-viewer' && render360Viewer()}
        {moduleType === 'hotspot-graphics' && renderHotspotGraphics()}
      </div>
    );
  };

  const moduleContainerStyle = {
    backgroundColor: designConfig.backgroundColor,
    borderColor: layoutConfig.border !== 'kein' ? layoutConfig.borderColor : undefined,
  };

  return (
    <div className={`${viewportSize === 'mobile' ? 'max-w-sm mx-auto' : viewportSize === 'tablet' ? 'max-w-md mx-auto' : 'max-w-full'} transition-all duration-300`}>
      <div className={`flex ${layoutConfig.horizontalAlign === 'links' ? 'justify-start' : layoutConfig.horizontalAlign === 'rechts' ? 'justify-end' : 'justify-center'} ${layoutConfig.verticalAlign === 'oben' ? 'items-start' : layoutConfig.verticalAlign === 'unten' ? 'items-end' : 'items-center'} min-h-96 p-4`} style={{ backgroundColor: '#f8f9fa' }}>
        <div 
          className={`${getWidthClasses()} ${getShadowClasses()} ${getBorderClasses()} ${getPaddingClasses()} rounded-lg`}
          style={moduleContainerStyle}
        >
          {renderModule()}
        </div>
      </div>
      
      {/* Viewport Size Indicator */}
      <div className="text-center mt-4">
        <span className="text-sm text-site-text-light bg-white px-3 py-1 rounded-full border">
          {viewportSize === 'desktop' ? 'Desktop' : viewportSize === 'tablet' ? 'Tablet' : 'Mobile'} Ansicht
        </span>
      </div>
    </div>
  );
};