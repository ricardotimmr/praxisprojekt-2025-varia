import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sliders, RotateCcw, Target } from "lucide-react";
import { ModuleSettings } from "./ModuleSettings";

interface ModuleSelectorProps {
  selectedModule: 'feature-slider' | '360-viewer' | 'hotspot-graphics';
  onModuleSelect: (module: 'feature-slider' | '360-viewer' | 'hotspot-graphics') => void;
  moduleSettings: Record<string, any>;
  onSettingsChange: (settings: Record<string, any>) => void;
}

const modules = [
  {
    id: 'feature-slider' as const,
    name: 'Feature Slider',
    description: 'Interaktive Slider für Produktpräsentationen',
    icon: Sliders
  },
  {
    id: '360-viewer' as const,
    name: '360° Viewer',
    description: 'Immersive 360-Grad-Produktansichten',
    icon: RotateCcw
  },
  {
    id: 'hotspot-graphics' as const,
    name: 'Hotspot Graphics',
    description: 'Interaktive Grafiken mit klickbaren Hotspots',
    icon: Target
  }
];

export const ModuleSelector = ({ selectedModule, onModuleSelect, moduleSettings, onSettingsChange }: ModuleSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Module Selection */}
      <div>
        <h3 className="text-lg font-semibold text-site-text mb-4">Modul auswählen</h3>
        <div className="grid gap-4">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className={`cursor-pointer transition-all ${
                selectedModule === module.id 
                  ? 'border-site-accent bg-site-accent/5' 
                  : 'border-site-neutral/20 hover:border-site-neutral'
              }`}
              onClick={() => onModuleSelect(module.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedModule === module.id ? 'bg-site-accent text-white' : 'bg-site-neutral/20 text-site-text-light'
                  }`}>
                    <module.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-site-text">{module.name}</h4>
                    <p className="text-sm text-site-text-light">{module.description}</p>
                  </div>
                  {selectedModule === module.id && (
                    <Badge className="bg-site-accent text-white">Aktiv</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Module-specific Settings */}
      <div>
        <h3 className="text-lg font-semibold text-site-text mb-4">Modul Einstellungen</h3>
        <ModuleSettings 
          moduleType={selectedModule}
          moduleSettings={moduleSettings}
          onSettingsChange={onSettingsChange}
        />
      </div>
    </div>
  );
};