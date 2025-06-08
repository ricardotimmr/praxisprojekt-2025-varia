import React, { useState } from 'react';
import { CIProvider } from './CIContext';
import FeatureSliderPreview from './components/FeatureSliderPreview';
import Viewer360Preview from './components/Viewer360Preview';
import HotspotGraphicPreview from './components/HotspotGraphicPreview';
import LivePreviewBox from './components/LivePreviewBox';
import ColorPicker from './components/ColorPicker';

// CI-Defaults
const defaultCI = {
  accentColor: '#E43D12',
  backgroundColor: '#FFFFFF',
  textColor: '#383838',
  titleColor: '#E43D12',
  fontFamily: 'Sora, Arial, sans-serif',
};

// Modul-Konfigs
const defaultConfigs = {
  featureSlider: {
    title: 'Ihr Produkthighlight',
    description: 'Eine kurze, ansprechende Beschreibung Ihres Produkts.',
    images: [
      'https://placehold.co/800x600/D8C3A5/8E8D8A?text=Produkt+1',
      'https://placehold.co/800x600/C2B09A/8E8D8A?text=Produkt+2',
      'https://placehold.co/800x600/B09D8A/8E8D8A?text=Produkt+3',
    ],
    accentColor: '#E43D12',
    backgroundColor: '#FFFFFF',
    textColor: '#8E8D8A',
    titleColor: '#E43D12',
    companyLogoUrl: '',
    contentAlignment: 'center',
    paddingSize: 'standard',
    moduleWidth: 'full',
    verticalAlignment: 'middle',
    shadowEffect: 'none',
    borderStyle: 'none',
    borderColor: '#E43D12',
    autoplayEnabled: true,
    autoplayInterval: 3000,
  },
  viewer360: {
    title: '360° Produktansicht',
    description: 'Drehen Sie das Produkt, um alle Seiten zu entdecken.',
    accentColor: '#E43D12',
    backgroundColor: '#FFFFFF',
    textColor: '#8E8D8A',
    titleColor: '#E43D12',
    companyLogoUrl: '',
    moduleWidth: 'full',
    contentAlignment: 'center',
    paddingSize: 'standard',
    verticalAlignment: 'middle',
    shadowEffect: 'none',
    borderStyle: 'none',
    borderColor: '#E43D12',
    viewer360: {
      images: [
        'https://placehold.co/400x400/F0F0F0/000000?text=360+Bild+1',
        'https://placehold.co/400x400/E0E0E0/000000?text=360+Bild+2',
        'https://placehold.co/400x400/D0D0D0/000000?text=360+Bild+3',
        'https://placehold.co/400x400/C0C0C0/000000?text=360+Bild+4',
        'https://placehold.co/400x400/B0B0B0/000000?text=360+Bild+5',
        'https://placehold.co/400x400/A0A0A0/000000?text=360+Bild+6',
      ],
      initialImageIndex: 0,
    },
  },
  hotspotGraphic: {
    title: 'Interaktive Bild-Details',
    description: 'Fügen Sie Hotspots hinzu, um Ihr Produkt zu erklären.',
    accentColor: '#E43D12',
    backgroundColor: '#FFFFFF',
    textColor: '#8E8D8A',
    titleColor: '#E43D12',
    companyLogoUrl: '',
    moduleWidth: 'full',
    contentAlignment: 'center',
    paddingSize: 'standard',
    verticalAlignment: 'middle',
    shadowEffect: 'none',
    borderStyle: 'none',
    borderColor: '#E43D12',
    hotspotGraphic: {
      backgroundImage: 'https://placehold.co/600x400/D8C3A5/8E8D8A?text=Produktbild',
      hotspots: [
        {
          id: 1,
          x: 20,
          y: 30,
          title: 'Detail 1',
          description: 'Beschreibung Detail 1',
          iconType: 'number',
          svgCode: '',
        },
        {
          id: 2,
          x: 70,
          y: 50,
          title: 'Detail 2',
          description: 'Beschreibung Detail 2',
          iconType: 'star',
          svgCode: '',
        },
      ],
    },
  },
  livePreview: {
    title: 'Live Preview Demo',
    description: 'Ändere unten die Einstellungen und sieh die Vorschau sofort!',
    accentColor: '#E43D12',
    backgroundColor: '#FFFFFF',
    textColor: '#222222'
  }
};

const moduleLabels = {
  featureSlider: 'Feature Slider',
  viewer360: '360° Viewer',
  hotspotGraphic: 'Hotspot-Grafik',
  livePreview: 'Live Preview'
};

// Device-Simulation-Styles
const deviceStyles = {
  desktop: { width: '100%', maxWidth: '1200px', minHeight: '320px', height: 'auto' },
  tablet:  { width: '768px', minHeight: '400px', height: 'auto' },
  mobile:  { width: '375px', minHeight: '500px', height: 'auto' }
};

function App() {
  const [selectedModule, setSelectedModule] = useState('featureSlider');
  const [ciConfig, setCIConfig] = useState(defaultCI);
  const [moduleConfigs, setModuleConfigs] = useState(defaultConfigs);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  // Aktualisiere CI und setze sie optional in alle Module durch
  const propagateCIToModules = (ci) => {
    setModuleConfigs((prev) => {
      const updateColors = (conf) => ({
        ...conf,
        accentColor: ci.accentColor,
        backgroundColor: ci.backgroundColor,
        textColor: ci.textColor,
        titleColor: ci.titleColor,
        fontFamily: ci.fontFamily
      });
      return Object.fromEntries(
        Object.entries(prev).map(([k, conf]) => [k, updateColors(conf)])
      );
    });
  };

  const handleCIChange = (field, value) => {
    const newCI = { ...ciConfig, [field]: value };
    setCIConfig(newCI);
    propagateCIToModules(newCI);
  };

  // Vorschau je Modul
  const renderPreview = () => {
    switch (selectedModule) {
      case 'featureSlider':
        return <FeatureSliderPreview config={moduleConfigs.featureSlider} />;
      case 'viewer360':
        return <Viewer360Preview config={moduleConfigs.viewer360} />;
      case 'hotspotGraphic':
        return <HotspotGraphicPreview config={moduleConfigs.hotspotGraphic} />;
      case 'livePreview':
        return <LivePreviewBox config={moduleConfigs.livePreview} />;
      default:
        return null;
    }
  };

  return (
    <CIProvider value={ciConfig}>
      <div style={{ minHeight: '100vh', background: '#F2F2F2', fontFamily: ciConfig.fontFamily, color: ciConfig.textColor }}>
        <header style={{ padding: '1.2rem', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: ciConfig.accentColor }}>
            Responsives Verhalten PoC
          </div>
        </header>

        {/* --- Globales CI-Panel --- */}
        <section style={{
          width: '100%', maxWidth: 800, background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(44,44,44,0.08)', margin: '2rem auto 2rem auto', padding: '2rem'
        }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Corporate Design anpassen</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <ColorPicker label="Akzentfarbe" value={ciConfig.accentColor} onChange={e => handleCIChange('accentColor', e.target.value)} />
            <ColorPicker label="Hintergrundfarbe" value={ciConfig.backgroundColor} onChange={e => handleCIChange('backgroundColor', e.target.value)} />
            <ColorPicker label="Textfarbe" value={ciConfig.textColor} onChange={e => handleCIChange('textColor', e.target.value)} />
            <ColorPicker label="Überschrift" value={ciConfig.titleColor} onChange={e => handleCIChange('titleColor', e.target.value)} />
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>Font:</label>
              <select value={ciConfig.fontFamily} onChange={e => handleCIChange('fontFamily', e.target.value)} style={{ padding: 6, borderRadius: 6 }}>
                <option value="Sora, Arial, sans-serif">Sora</option>
                <option value="Comfortaa, Arial, sans-serif">Comfortaa</option>
                <option value="Inter, Arial, sans-serif">Inter</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="inherit">System</option>
              </select>
            </div>
          </div>
        </section>

        {/* Modul-Auswahl */}
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {Object.entries(moduleLabels).map(([key, label]) => (
              <button
                key={key}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: selectedModule === key ? ciConfig.accentColor : '#EBE9E1',
                  color: selectedModule === key ? 'white' : '#8E8D8A',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedModule(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Device Switcher */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {['desktop', 'tablet', 'mobile'].map(device => (
              <button
                key={device}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: previewDevice === device ? ciConfig.accentColor : '#EBE9E1',
                  color: previewDevice === device ? 'white' : '#8E8D8A',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setPreviewDevice(device)}
              >
                {device === 'desktop' ? 'Desktop' : device === 'tablet' ? 'Tablet' : 'Mobile'}
              </button>
            ))}
          </div>

          {/* Responsive Preview */}
          <section style={{
            ...deviceStyles[previewDevice],
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(44,44,44,0.08)',
            marginBottom: 30,
            padding: '2rem',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s, min-width 0.3s'
          }}>
            <div style={{ width: '100%' }}>
              <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Live-Vorschau ({previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)})</h2>
              {renderPreview()}
            </div>
          </section>
        </main>
      </div>
    </CIProvider>
  );
}

export default App;