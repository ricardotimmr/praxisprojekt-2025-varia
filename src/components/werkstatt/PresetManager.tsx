import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Save, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PresetManagerProps {
  config: any;
  onLoadPreset: (config: any) => void;
}

interface Preset {
  id: string;
  name: string;
  config: any;
  createdAt: string;
}

export const PresetManager = ({ config, onLoadPreset }: PresetManagerProps) => {
  const [presets, setPresets] = useState<Preset[]>(() => {
    const saved = localStorage.getItem('modulePresets');
    return saved ? JSON.parse(saved) : [];
  });
  const [presetName, setPresetName] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  const savePreset = () => {
    if (!presetName.trim()) {
      toast.error('Bitte geben Sie einen Namen für das Preset ein');
      return;
    }

    const newPreset: Preset = {
      id: Date.now().toString(),
      name: presetName,
      config,
      createdAt: new Date().toISOString()
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('modulePresets', JSON.stringify(updatedPresets));
    
    toast.success(`Preset "${presetName}" wurde gespeichert`);
    setPresetName('');
    setShowSaveDialog(false);
  };

  const loadPreset = () => {
    const preset = presets.find(p => p.id === selectedPresetId);
    if (preset) {
      onLoadPreset(preset.config);
      toast.success(`Preset "${preset.name}" wurde geladen`);
      setShowLoadDialog(false);
    }
  };

  const deletePreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    const updatedPresets = presets.filter(p => p.id !== presetId);
    setPresets(updatedPresets);
    localStorage.setItem('modulePresets', JSON.stringify(updatedPresets));
    
    if (preset) {
      toast.success(`Preset "${preset.name}" wurde gelöscht`);
    }
  };

  return (
    <>
      {/* Save Preset */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preset speichern</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="presetName">Preset Name</Label>
              <Input
                id="presetName"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Mein Preset"
                className="mt-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={savePreset} className="bg-site-accent text-white">
                Speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load Preset */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={presets.length === 0}>
            <Upload className="w-4 h-4 mr-2" />
            Laden
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preset laden</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {presets.length === 0 ? (
              <p className="text-site-text-light">Keine Presets verfügbar</p>
            ) : (
              <>
                <div>
                  <Label htmlFor="presetSelect">Preset auswählen</Label>
                  <Select value={selectedPresetId} onValueChange={setSelectedPresetId}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Preset auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      {presets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{preset.name}</span>
                            <span className="text-xs text-site-text-light ml-2">
                              {new Date(preset.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedPresetId && (
                  <div className="flex items-center justify-between p-3 bg-site-background rounded-lg">
                    <span className="text-sm text-site-text-light">
                      Preset löschen
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePreset(selectedPresetId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
                    Abbrechen
                  </Button>
                  <Button 
                    onClick={loadPreset} 
                    disabled={!selectedPresetId}
                    className="bg-site-accent text-white"
                  >
                    Laden
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};