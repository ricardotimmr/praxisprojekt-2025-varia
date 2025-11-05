import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone, Pin, PinOff, Maximize2, Minimize2 } from "lucide-react";
import type { ViewportSize } from "@/pages/Werkstatt";

interface PreviewControlsProps {
  viewportSize: ViewportSize;
  onViewportChange: (size: ViewportSize) => void;
  isPreviewPinned: boolean;
  onTogglePin: (pinned: boolean) => void;
  isFullscreen: boolean;
  onToggleFullscreen: (fullscreen: boolean) => void;
}

export const PreviewControls = ({ 
  viewportSize, 
  onViewportChange, 
  isPreviewPinned, 
  onTogglePin,
  isFullscreen,
  onToggleFullscreen
}: PreviewControlsProps) => {
  const viewports = [
    { id: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { id: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { id: 'mobile' as const, icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Viewport Controls */}
      <div className="flex border border-site-neutral/20 rounded-lg overflow-hidden">
        {viewports.map((viewport) => (
          <Button
            key={viewport.id}
            variant={viewportSize === viewport.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewportChange(viewport.id)}
            className={`rounded-none ${
              viewportSize === viewport.id 
                ? 'bg-site-accent text-white' 
                : 'text-site-text-light hover:text-site-accent'
            }`}
          >
            <viewport.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Pin Toggle */}
      {!isFullscreen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTogglePin(!isPreviewPinned)}
          className={`${
            isPreviewPinned 
              ? 'text-site-accent bg-site-accent/10' 
              : 'text-site-text-light hover:text-site-accent'
          }`}
          title={isPreviewPinned ? 'Vorschau lösen' : 'Vorschau anheften'}
        >
          {isPreviewPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
        </Button>
      )}

      {/* Fullscreen Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleFullscreen(!isFullscreen)}
        className={`${
          isFullscreen 
            ? 'text-white bg-white/10' 
            : 'text-site-text-light hover:text-site-accent'
        }`}
        title={isFullscreen ? 'Vollbild verlassen' : 'Vollbild-Vorschau'}
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </Button>
    </div>
  );
};