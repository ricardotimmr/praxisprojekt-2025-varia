import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Save, Upload, Download, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ModuleSelector } from "@/components/werkstatt/ModuleSelector";
import { LayoutConfigurator } from "@/components/werkstatt/LayoutConfigurator";
import { DesignConfigurator } from "@/components/werkstatt/DesignConfigurator";
import { ModulePreview } from "@/components/werkstatt/ModulePreview";
import { PreviewControls } from "@/components/werkstatt/PreviewControls";
import { ExportDialog } from "@/components/werkstatt/ExportDialog";
import { PresetManager } from "@/components/werkstatt/PresetManager";
import { toast } from "sonner";

export type LayoutConfig = {
  width: 'voll' | 'breit' | 'standard' | 'schmal';
  height: 'niedrig' | 'standard' | 'hoch' | 'sehr-hoch';
  verticalAlign: 'oben' | 'mitte' | 'unten';
  horizontalAlign: 'links' | 'zentriert' | 'rechts';
  shadow: 'kein' | 'leicht' | 'standard' | 'stark';
  border: 'kein' | 'dünn' | 'standard';
  borderColor: string;
  padding: 'kompakt' | 'standard' | 'großzügig';
};

export type DesignConfig = {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  logoUrl: string;
  fontFamily: string;
};

export type ModuleConfig = {
  type: 'feature-slider' | '360-viewer' | 'hotspot-graphics';
  settings: Record<string, any>;
};

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const Werkstatt = () => {
  const location = useLocation();
  const [selectedModule, setSelectedModule] = useState<ModuleConfig['type']>('feature-slider');
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    width: 'standard',
    height: 'standard',
    verticalAlign: 'mitte',
    horizontalAlign: 'zentriert',
    shadow: 'standard',
    border: 'standard',
    borderColor: '#E43D12',
    padding: 'standard'
  });
  
  const [designConfig, setDesignConfig] = useState<DesignConfig>({
    accentColor: '#E43D12',
    backgroundColor: '#FFFFFF',
    textColor: '#8E8D8A',
    headingColor: '#E43D12',
    logoUrl: '',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  });

  const [moduleSettings, setModuleSettings] = useState<Record<string, any>>({});
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [isPreviewPinned, setIsPreviewPinned] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleLayoutChange = (key: keyof LayoutConfig, value: string) => {
    setLayoutConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleDesignChange = (key: keyof DesignConfig, value: string) => {
    setDesignConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleModuleSettingsChange = (settings: Record<string, any>) => {
    setModuleSettings(settings);
  };

  const getConfig = () => ({
    module: { type: selectedModule, settings: moduleSettings },
    layout: layoutConfig,
    design: designConfig
  });

  const handleLoadPreset = (config: any) => {
    setSelectedModule(config.module.type);
    setModuleSettings(config.module.settings);
    setLayoutConfig(config.layout);
    setDesignConfig(config.design);
  };

  const handleSave = () => {
    const config = getConfig();
    localStorage.setItem('currentWorkstattConfig', JSON.stringify(config));
    toast.success('Konfiguration gespeichert');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('currentWorkstattConfig');
    if (saved) {
      const config = JSON.parse(saved);
      handleLoadPreset(config);
      toast.success('Konfiguration geladen');
    } else {
      toast.error('Keine gespeicherte Konfiguration gefunden');
    }
  };

  return (
    <div className="min-h-screen bg-site-background font-inter animate-fade-in">
      {/* Header */}
      <header className="border-b border-site-accent bg-site-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-comfortaa text-4xl font-bold text-site-accent lowercase tracking-wider">varia.</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/werkstatt" 
                  className={`${location.pathname === '/werkstatt' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
                >
                  werkstatt
                </Link>
                <Link 
                  to="/dokumentation" 
                  className={`${location.pathname === '/dokumentation' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
                >
                  dokumentation
                </Link>
                <Link 
                  to="/kontakt" 
                  className={`${location.pathname === '/kontakt' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
                >
                  kontakt
                </Link>
              </nav>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-site-accent text-site-accent hover:bg-site-accent hover:text-white">
                    Aktionen
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-site-neutral/20 z-50 w-48">
                  <PresetManager 
                    config={getConfig()}
                    onLoadPreset={handleLoadPreset}
                  />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportieren
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* Preview Panel - Sticky on small screens when pinned */}
          <div className={`${isPreviewPinned ? 'sticky top-16 z-40 mb-8' : 'mb-8'}`}>
            <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-site-text">Live Vorschau</CardTitle>
                  <PreviewControls 
                    viewportSize={viewportSize}
                    onViewportChange={setViewportSize}
                    isPreviewPinned={isPreviewPinned}
                    onTogglePin={setIsPreviewPinned}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ModulePreview 
                  moduleType={selectedModule}
                  moduleSettings={moduleSettings}
                  layoutConfig={layoutConfig}
                  designConfig={designConfig}
                  viewportSize={viewportSize}
                  onModuleSettingsChange={handleModuleSettingsChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Configuration Panel */}
          <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
            <CardHeader>
              <CardTitle className="text-site-text">Modul Konfiguration</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="module" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="module">Modul</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                </TabsList>
                
                <TabsContent value="module" className="space-y-6">
                  <ModuleSelector 
                    selectedModule={selectedModule}
                    onModuleSelect={setSelectedModule}
                    moduleSettings={moduleSettings}
                    onSettingsChange={handleModuleSettingsChange}
                  />
                </TabsContent>
                
                <TabsContent value="layout" className="space-y-6">
                  <LayoutConfigurator 
                    config={layoutConfig}
                    onChange={handleLayoutChange}
                  />
                </TabsContent>
                
                <TabsContent value="design" className="space-y-6">
                  <DesignConfigurator 
                    config={designConfig}
                    onChange={handleDesignChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Preview Panel - Desktop */}
          <div className="lg:col-span-7">
            <div className={`${isPreviewPinned ? 'sticky top-24' : ''}`}>
              <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-site-text">Live Vorschau</CardTitle>
                    <PreviewControls 
                      viewportSize={viewportSize}
                      onViewportChange={setViewportSize}
                      isPreviewPinned={isPreviewPinned}
                      onTogglePin={setIsPreviewPinned}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ModulePreview 
                    moduleType={selectedModule}
                    moduleSettings={moduleSettings}
                    layoutConfig={layoutConfig}
                    designConfig={designConfig}
                    viewportSize={viewportSize}
                    onModuleSettingsChange={handleModuleSettingsChange}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Configuration Panel - Desktop */}
          <div className="lg:col-span-5">
            <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
              <CardHeader>
                <CardTitle className="text-site-text">Modul Konfiguration</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="module" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="module">Modul</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="module" className="space-y-6">
                    <ModuleSelector 
                      selectedModule={selectedModule}
                      onModuleSelect={setSelectedModule}
                      moduleSettings={moduleSettings}
                      onSettingsChange={handleModuleSettingsChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="layout" className="space-y-6">
                    <LayoutConfigurator 
                      config={layoutConfig}
                      onChange={handleLayoutChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="design" className="space-y-6">
                    <DesignConfigurator 
                      config={designConfig}
                      onChange={handleDesignChange}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ExportDialog 
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        config={getConfig()}
      />
    </div>
  );
};

export default Werkstatt;