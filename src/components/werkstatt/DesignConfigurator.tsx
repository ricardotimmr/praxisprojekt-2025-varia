import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DesignConfig } from "@/pages/Werkstatt";

interface DesignConfiguratorProps {
  config: DesignConfig;
  onChange: (key: keyof DesignConfig, value: string) => void;
}

export const DesignConfigurator = ({ config, onChange }: DesignConfiguratorProps) => {
  const fonts = [
    { value: 'system-ui, -apple-system, sans-serif', label: 'System Sans-Serif' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Palatino, serif', label: 'Palatino' },
    { value: 'Impact, sans-serif', label: 'Impact' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-site-text">Design & CI</h3>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label htmlFor="fontFamily">Schriftart</Label>
            <Select
              value={config.fontFamily || fonts[0].value}
              onValueChange={(value) => onChange('fontFamily', value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="accentColor">Akzentfarbe</Label>
            <div className="flex space-x-3 mt-2 items-center">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: config.accentColor }}
              >
                <Input
                  id="accentColor"
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => onChange('accentColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                type="text"
                value={config.accentColor}
                onChange={(e) => onChange('accentColor', e.target.value)}
                className="flex-1"
                placeholder="#E43D12"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="backgroundColor">Hintergrundfarbe</Label>
            <div className="flex space-x-3 mt-2 items-center">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: config.backgroundColor }}
              >
                <Input
                  id="backgroundColor"
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onChange('backgroundColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => onChange('backgroundColor', e.target.value)}
                className="flex-1"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="textColor">Textfarbe</Label>
            <div className="flex space-x-3 mt-2 items-center">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: config.textColor }}
              >
                <Input
                  id="textColor"
                  type="color"
                  value={config.textColor}
                  onChange={(e) => onChange('textColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                type="text"
                value={config.textColor}
                onChange={(e) => onChange('textColor', e.target.value)}
                className="flex-1"
                placeholder="#8E8D8A"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="headingColor">Überschrift Farbe</Label>
            <div className="flex space-x-3 mt-2 items-center">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: config.headingColor }}
              >
                <Input
                  id="headingColor"
                  type="color"
                  value={config.headingColor}
                  onChange={(e) => onChange('headingColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                type="text"
                value={config.headingColor}
                onChange={(e) => onChange('headingColor', e.target.value)}
                className="flex-1"
                placeholder="#E43D12"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="logoUrl">Logo URL (Kunde)</Label>
            <Input
              id="logoUrl"
              type="url"
              value={config.logoUrl}
              onChange={(e) => onChange('logoUrl', e.target.value)}
              className="mt-2"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};