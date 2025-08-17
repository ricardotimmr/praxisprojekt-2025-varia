import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus } from "lucide-react";
import { useState } from "react";

interface ModuleSettingsProps {
  moduleType: 'feature-slider' | '360-viewer' | 'hotspot-graphics';
  moduleSettings: Record<string, any>;
  onSettingsChange: (settings: Record<string, any>) => void;
}

export const ModuleSettings = ({ moduleType, moduleSettings, onSettingsChange }: ModuleSettingsProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    onSettingsChange({
      ...moduleSettings,
      [key]: value
    });
  };

  const handleImageUpload = (files: FileList | null, index?: number) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      if (moduleType === 'feature-slider') {
        const slides = moduleSettings.slides || [];
        const newSlides = [...slides];
        if (typeof index === 'number') {
          newSlides[index] = { ...newSlides[index], image: imageUrl };
        } else {
          newSlides.push({ image: imageUrl, title: `Slide ${newSlides.length + 1}`, description: '' });
        }
        handleSettingChange('slides', newSlides);
      } else if (moduleType === '360-viewer') {
        const images = moduleSettings.images || [];
        handleSettingChange('images', [...images, imageUrl]);
      } else if (moduleType === 'hotspot-graphics') {
        handleSettingChange('backgroundImage', imageUrl);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleMultipleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const imagePromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(imagePromises).then((imageUrls) => {
      if (moduleType === '360-viewer') {
        const existingImages = moduleSettings.images || [];
        handleSettingChange('images', [...existingImages, ...imageUrls]);
      }
    });
  };

  const renderFeatureSliderSettings = () => (
    <div className="space-y-6">
      <div>
        <Label>Slides</Label>
        <div className="mt-2 space-y-4">
          {(moduleSettings.slides || []).map((slide: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Slide {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const newSlides = moduleSettings.slides.filter((_: any, i: number) => i !== index);
                      handleSettingChange('slides', newSlides);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <Label>Bild</Label>
                  <div className="mt-2 space-y-3">
                    {slide.image ? (
                      <div className="relative">
                        <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-32 object-cover rounded" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80"
                          onClick={() => {
                            const newSlides = [...moduleSettings.slides];
                            newSlides[index] = { ...newSlides[index], image: null, imageUrl: '' };
                            handleSettingChange('slides', newSlides);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files, index)}
                          className="hidden"
                          id={`slide-upload-${index}`}
                        />
                        <label htmlFor={`slide-upload-${index}`} className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Bild hochladen</p>
                        </label>
                      </div>
                    )}
                    
                    <div>
                      <Label className="text-sm text-gray-600">oder Bild-URL eingeben:</Label>
                      <Input
                        value={slide.imageUrl || ''}
                        onChange={(e) => {
                          const newSlides = [...moduleSettings.slides];
                          newSlides[index] = { ...newSlides[index], imageUrl: e.target.value };
                          if (e.target.value) {
                            newSlides[index].image = e.target.value;
                          }
                          handleSettingChange('slides', newSlides);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Titel</Label>
                  <Input
                    value={slide.title || ''}
                    onChange={(e) => {
                      const newSlides = [...moduleSettings.slides];
                      newSlides[index] = { ...newSlides[index], title: e.target.value };
                      handleSettingChange('slides', newSlides);
                    }}
                    placeholder="Slide Titel"
                  />
                </div>
                
                <div>
                  <Label>Beschreibung</Label>
                  <Textarea
                    value={slide.description || ''}
                    onChange={(e) => {
                      const newSlides = [...moduleSettings.slides];
                      newSlides[index] = { ...newSlides[index], description: e.target.value };
                      handleSettingChange('slides', newSlides);
                    }}
                    placeholder="Slide Beschreibung"
                  />
                </div>
              </div>
            </Card>
          ))}
          
          <Button
            variant="outline"
            onClick={() => {
              const slides = moduleSettings.slides || [];
              handleSettingChange('slides', [...slides, { title: `Slide ${slides.length + 1}`, description: '', image: null }]);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Slide hinzufügen
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="autoplay">Automatisches Abspielen</Label>
        <div className="flex items-center space-x-2 mt-2">
          <Switch
            id="autoplay"
            checked={moduleSettings.autoplay || false}
            onCheckedChange={(checked) => handleSettingChange('autoplay', checked)}
          />
          <span className="text-sm text-site-text-light">
            {moduleSettings.autoplay ? 'Ein' : 'Aus'}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="slideDuration">Slide-Dauer (Sekunden)</Label>
        <Slider
          id="slideDuration"
          min={1}
          max={10}
          step={1}
          value={[moduleSettings.slideDuration || 3]}
          onValueChange={(value) => handleSettingChange('slideDuration', value[0])}
          className="mt-2"
        />
        <span className="text-sm text-site-text-light">Dauer: {moduleSettings.slideDuration || 3} Sekunden</span>
      </div>
      
      <div>
        <Label htmlFor="transition">Übergangseffekt</Label>
        <Select
          value={moduleSettings.transition || 'fade'}
          onValueChange={(value) => handleSettingChange('transition', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const render360ViewerSettings = () => (
    <div className="space-y-6">
      <div>
        <Label>360° Bilder</Label>
        <div className="mt-2 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {(moduleSettings.images || []).map((image: string, index: number) => (
              <div key={index} className="relative">
                <img src={image} alt={`360° Frame ${index + 1}`} className="w-full h-20 object-cover rounded" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 bg-white/80 w-6 h-6 p-0"
                  onClick={() => {
                    const newImages = moduleSettings.images.filter((_: string, i: number) => i !== index);
                    const newImageUrls = (moduleSettings.imageUrls || []).filter((_: string, i: number) => i !== index);
                    handleSettingChange('images', newImages);
                    handleSettingChange('imageUrls', newImageUrls);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultipleImageUpload(e.target.files)}
              className="hidden"
              id="360-upload"
            />
            <label htmlFor="360-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">360° Bilder hochladen (mehrere auswählen)</p>
            </label>
          </div>

          <div>
            <Label className="text-sm text-gray-600">oder Bild-URLs eingeben (eine pro Zeile):</Label>
            <Textarea
              value={(moduleSettings.imageUrls || []).join('\n')}
              onChange={(e) => {
                const urls = e.target.value.split('\n').filter(url => url.trim());
                const existingImages = moduleSettings.images || [];
                const combinedImages = [...existingImages, ...urls];
                handleSettingChange('imageUrls', urls);
                handleSettingChange('images', combinedImages);
              }}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="autoRotate">Automatische Rotation</Label>
        <div className="flex items-center space-x-2 mt-2">
          <Switch
            id="autoRotate"
            checked={moduleSettings.autoRotate || false}
            onCheckedChange={(checked) => handleSettingChange('autoRotate', checked)}
          />
          <span className="text-sm text-site-text-light">
            {moduleSettings.autoRotate ? 'Ein' : 'Aus'}
          </span>
        </div>
      </div>
      
      <div>
        <Label htmlFor="rotationSpeed">Rotationsgeschwindigkeit</Label>
        <Slider
          id="rotationSpeed"
          min={1}
          max={10}
          step={1}
          value={[moduleSettings.rotationSpeed || 3]}
          onValueChange={(value) => handleSettingChange('rotationSpeed', value[0])}
          className="mt-2"
        />
        <span className="text-sm text-site-text-light">Geschwindigkeit: {moduleSettings.rotationSpeed || 3}</span>
      </div>
    </div>
  );

  const renderHotspotSettings = () => (
    <div className="space-y-6">
      <div>
        <Label>Hintergrundbild</Label>
        <div className="mt-2 space-y-3">
          {moduleSettings.backgroundImage ? (
            <div className="relative">
              <img src={moduleSettings.backgroundImage} alt="Hotspot Background" className="w-full h-48 object-cover rounded" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80"
                onClick={() => {
                  handleSettingChange('backgroundImage', null);
                  handleSettingChange('backgroundImageUrl', '');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="hotspot-bg-upload"
              />
              <label htmlFor="hotspot-bg-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Hintergrundbild hochladen</p>
              </label>
            </div>
          )}
          
          <div>
            <Label className="text-sm text-gray-600">oder Bild-URL eingeben:</Label>
            <Input
              value={moduleSettings.backgroundImageUrl || ''}
              onChange={(e) => {
                handleSettingChange('backgroundImageUrl', e.target.value);
                if (e.target.value) {
                  handleSettingChange('backgroundImage', e.target.value);
                }
              }}
              placeholder="https://example.com/background.jpg"
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label>Hotspots</Label>
        <div className="mt-2 space-y-4">
          {(moduleSettings.hotspots || []).map((hotspot: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Hotspot {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const newHotspots = moduleSettings.hotspots.filter((_: any, i: number) => i !== index);
                      handleSettingChange('hotspots', newHotspots);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Position X (%)</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hotspot.x || 50]}
                      onValueChange={(value) => {
                        const newHotspots = [...moduleSettings.hotspots];
                        newHotspots[index] = { ...newHotspots[index], x: value[0] };
                        handleSettingChange('hotspots', newHotspots);
                      }}
                      className="mt-2"
                    />
                    <span className="text-sm text-site-text-light">{hotspot.x || 50}%</span>
                  </div>
                  
                  <div>
                    <Label>Position Y (%)</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hotspot.y || 50]}
                      onValueChange={(value) => {
                        const newHotspots = [...moduleSettings.hotspots];
                        newHotspots[index] = { ...newHotspots[index], y: value[0] };
                        handleSettingChange('hotspots', newHotspots);
                      }}
                      className="mt-2"
                    />
                    <span className="text-sm text-site-text-light">{hotspot.y || 50}%</span>
                  </div>
                </div>
                
                <div>
                  <Label>Hover Text</Label>
                  <Input
                    value={hotspot.text || ''}
                    onChange={(e) => {
                      const newHotspots = [...moduleSettings.hotspots];
                      newHotspots[index] = { ...newHotspots[index], text: e.target.value };
                      handleSettingChange('hotspots', newHotspots);
                    }}
                    placeholder="Text beim Hover"
                  />
                </div>
              </div>
            </Card>
          ))}
          
          <Button
            variant="outline"
            onClick={() => {
              const hotspots = moduleSettings.hotspots || [];
              handleSettingChange('hotspots', [...hotspots, { x: 50, y: 50, text: `Hotspot ${hotspots.length + 1}` }]);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Hotspot hinzufügen
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="animationType">Animation</Label>
        <Select
          value={moduleSettings.animationType || 'pulse'}
          onValueChange={(value) => handleSettingChange('animationType', value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pulse">Pulse</SelectItem>
            <SelectItem value="bounce">Bounce</SelectItem>
            <SelectItem value="ping">Ping</SelectItem>
            <SelectItem value="none">Keine</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-4">
        {moduleType === 'feature-slider' && renderFeatureSliderSettings()}
        {moduleType === '360-viewer' && render360ViewerSettings()}
        {moduleType === 'hotspot-graphics' && renderHotspotSettings()}
      </CardContent>
    </Card>
  );
};