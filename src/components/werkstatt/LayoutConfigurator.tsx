import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { LayoutConfig } from "@/pages/Werkstatt";

interface LayoutConfiguratorProps {
  config: LayoutConfig;
  onChange: (key: keyof LayoutConfig, value: string) => void;
}

export const LayoutConfigurator = ({ config, onChange }: LayoutConfiguratorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-site-text">Layout</h3>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label htmlFor="width">Modulbreite</Label>
            <Select value={config.width} onValueChange={(value) => onChange('width', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voll">Voll</SelectItem>
                <SelectItem value="breit">Breit</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="schmal">Schmal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="height">Modulhöhe</Label>
            <Select value={config.height} onValueChange={(value) => onChange('height', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="niedrig">Niedrig</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="hoch">Hoch</SelectItem>
                <SelectItem value="sehr-hoch">Sehr Hoch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="verticalAlign">Vertikale Ausrichtung des Inhalts</Label>
            <Select value={config.verticalAlign} onValueChange={(value) => onChange('verticalAlign', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oben">Oben</SelectItem>
                <SelectItem value="mitte">Mitte</SelectItem>
                <SelectItem value="unten">Unten</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="horizontalAlign">Horizontale Ausrichtung des Inhalts</Label>
            <Select value={config.horizontalAlign} onValueChange={(value) => onChange('horizontalAlign', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="links">Links</SelectItem>
                <SelectItem value="zentriert">Zentriert</SelectItem>
                <SelectItem value="rechts">Rechts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="shadow">Schatten-Effekt</Label>
            <Select value={config.shadow} onValueChange={(value) => onChange('shadow', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kein">Kein Schatten</SelectItem>
                <SelectItem value="leicht">Leicht</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="stark">Stark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="border">Rahmenstil</Label>
            <Select value={config.border} onValueChange={(value) => onChange('border', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kein">Kein Rahmen</SelectItem>
                <SelectItem value="dünn">Dünn</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {config.border !== 'kein' && (
            <div>
              <Label htmlFor="borderColor">Rahmenfarbe</Label>
              <div className="flex space-x-3 mt-2 items-center">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer relative overflow-hidden"
                  style={{ backgroundColor: config.borderColor }}
                >
                  <Input
                    id="borderColor"
                    type="color"
                    value={config.borderColor}
                    onChange={(e) => onChange('borderColor', e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <Input
                  type="text"
                  value={config.borderColor}
                  onChange={(e) => onChange('borderColor', e.target.value)}
                  className="flex-1"
                  placeholder="#E43D12"
                />
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor="padding">Innenabstand</Label>
            <Select value={config.padding} onValueChange={(value) => onChange('padding', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kompakt">Kompakt</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="großzügig">Großzügig</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};