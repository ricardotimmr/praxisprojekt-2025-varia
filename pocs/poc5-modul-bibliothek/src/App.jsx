import React, { useState } from 'react';
import FeatureSliderPreview from './components/FeatureSliderPreview';
import Viewer360Preview from './components/Viewer360Preview';
import HotspotGraphicPreview from './components/HotspotGraphicPreview';
import LivePreviewBox from './components/LivePreviewBox';
import ColorPicker from './components/ColorPicker';
import { getWidthStyle } from './utils/styleHelpers';

// Start-Konfigurationen für jedes Modul
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

function App() {
  const [selectedModule, setSelectedModule] = useState('featureSlider');
  const [moduleConfigs, setModuleConfigs] = useState(defaultConfigs);

  const setModuleConfig = (module, newConfig) => {
    setModuleConfigs((prev) => ({
      ...prev,
      [module]: newConfig
    }));
  };

  // Vorschau- und Konfigurationspanel dynamisch je nach Modultyp:
  const renderPreview = () => {
    switch (selectedModule) {
      case 'featureSlider':
        return <FeatureSliderPreview config={moduleConfigs.featureSlider} setModuleConfig={(c) => setModuleConfig('featureSlider', c)} />;
      case 'viewer360':
        return <Viewer360Preview config={moduleConfigs.viewer360} />;
      case 'hotspotGraphic':
        return <HotspotGraphicPreview config={moduleConfigs.hotspotGraphic} setModuleConfig={(c) => setModuleConfig('hotspotGraphic', c)} />;
      case 'livePreview':
        return <LivePreviewBox config={moduleConfigs.livePreview} />;
      default:
        return null;
    }
  };

  const renderConfigPanel = () => {
    switch (selectedModule) {
      case 'featureSlider':
        return (
          <FeatureSliderConfig config={moduleConfigs.featureSlider} setConfig={(c) => setModuleConfig('featureSlider', c)} />
        );
      case 'viewer360':
        return (
          <Viewer360Config config={moduleConfigs.viewer360} setConfig={(c) => setModuleConfig('viewer360', c)} />
        );
      case 'hotspotGraphic':
        return (
          <HotspotGraphicConfig config={moduleConfigs.hotspotGraphic} setConfig={(c) => setModuleConfig('hotspotGraphic', c)} />
        );
      case 'livePreview':
        return (
          <LivePreviewConfig config={moduleConfigs.livePreview} setConfig={(c) => setModuleConfig('livePreview', c)} />
        );
      default:
        return null;
    }
  };

  // --- Konfigurationspanels (je Modul) ---

  function FeatureSliderConfig({ config, setConfig }) {
    return (
      <section style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label>Titel:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />

        <label>Beschreibung:</label>
        <textarea style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />

        <label>Bilder für Slider:</label>
        {config.images.map((img, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              value={img}
              style={{ flex: 1, padding: 8 }}
              onChange={e => {
                const newImages = [...config.images];
                newImages[idx] = e.target.value;
                setConfig({ ...config, images: newImages });
              }}
              placeholder={`Bild URL ${idx + 1}`}
            />
            <button
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '9999px', padding: '0.5rem', cursor: 'pointer' }}
              onClick={() => setConfig({ ...config, images: config.images.filter((_, i) => i !== idx) })}
            >✕</button>
          </div>
        ))}
        <button style={{ width: '100%', background: '#D8C3A5', color: '#8E8D8A', padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer' }}
          onClick={() => setConfig({ ...config, images: [...config.images, ''] })}>Bild hinzufügen</button>

        <div>
          <label>Autoplay aktivieren:</label>
          <input type="checkbox" checked={config.autoplayEnabled} onChange={e => setConfig({ ...config, autoplayEnabled: e.target.checked })} style={{ marginLeft: 8 }} />
          <label style={{ marginLeft: 16 }}>Intervall (ms):</label>
          <input type="number" min={500} step={100} value={config.autoplayInterval} onChange={e => setConfig({ ...config, autoplayInterval: parseInt(e.target.value) || 0 })} style={{ width: 80, marginLeft: 8 }} />
        </div>

        <ColorPicker label="Akzentfarbe" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} />
        <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
        <ColorPicker label="Textfarbe" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} />
        <ColorPicker label="Überschrift Farbe" value={config.titleColor} onChange={e => setConfig({ ...config, titleColor: e.target.value })} />
      </section>
    );
  }

  function Viewer360Config({ config, setConfig }) {
    return (
      <section style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label>Titel:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />

        <label>Beschreibung:</label>
        <textarea style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />

        <label>Bilder für 360° Viewer:</label>
        {config.viewer360.images.map((img, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              value={img}
              style={{ flex: 1, padding: 8 }}
              onChange={e => {
                const newImages = [...config.viewer360.images];
                newImages[idx] = e.target.value;
                setConfig({ ...config, viewer360: { ...config.viewer360, images: newImages } });
              }}
              placeholder={`Bild URL ${idx + 1}`}
            />
            <button
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '9999px', padding: '0.5rem', cursor: 'pointer' }}
              onClick={() => setConfig({ ...config, viewer360: { ...config.viewer360, images: config.viewer360.images.filter((_, i) => i !== idx) } })}
            >✕</button>
          </div>
        ))}
        <button style={{ width: '100%', background: '#D8C3A5', color: '#8E8D8A', padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer' }}
          onClick={() => setConfig({ ...config, viewer360: { ...config.viewer360, images: [...config.viewer360.images, ''] } })}>Bild hinzufügen</button>

        <label>Startbild-Index (0-{config.viewer360.images.length - 1}):</label>
        <input
          type="number"
          min="0"
          max={config.viewer360.images.length - 1}
          value={config.viewer360.initialImageIndex}
          onChange={e => setConfig({ ...config, viewer360: { ...config.viewer360, initialImageIndex: Number(e.target.value) } })}
          style={{ width: 80, marginBottom: 8, padding: 8 }}
        />

        <ColorPicker label="Akzentfarbe" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} />
        <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
        <ColorPicker label="Textfarbe" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} />
        <ColorPicker label="Überschrift Farbe" value={config.titleColor} onChange={e => setConfig({ ...config, titleColor: e.target.value })} />
      </section>
    );
  }

  function HotspotGraphicConfig({ config, setConfig }) {
    return (
      <section style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label>Titel:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />

        <label>Beschreibung:</label>
        <textarea style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />

        <label>Hintergrundbild URL:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.hotspotGraphic.backgroundImage} onChange={e => setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, backgroundImage: e.target.value } })} />
        <h4 style={{ marginBottom: '0.5rem' }}>Hotspots</h4>
        {config.hotspotGraphic.hotspots.map((hotspot, idx) => (
          <div key={hotspot.id} style={{ background: '#F5F5F5', borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <label>Titel:</label>
            <input type="text" style={{ width: '100%', marginBottom: 4, padding: 6 }} value={hotspot.title} onChange={e => {
              const newHotspots = [...config.hotspotGraphic.hotspots];
              newHotspots[idx] = { ...hotspot, title: e.target.value };
              setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
            }} />

            <label>Beschreibung:</label>
            <textarea style={{ width: '100%', marginBottom: 4, padding: 6 }} value={hotspot.description} onChange={e => {
              const newHotspots = [...config.hotspotGraphic.hotspots];
              newHotspots[idx] = { ...hotspot, description: e.target.value };
              setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
            }} />

            <label>Symbol:</label>
            <select value={hotspot.iconType} onChange={e => {
              const newHotspots = [...config.hotspotGraphic.hotspots];
              newHotspots[idx] = { ...hotspot, iconType: e.target.value };
              setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
            }} style={{ marginLeft: 8, marginBottom: 4 }}>
              <option value="number">Nummer</option>
              <option value="star">Stern</option>
              <option value="info">Info</option>
              <option value="custom">Custom SVG</option>
            </select>

            {hotspot.iconType === 'custom' && (
              <>
                <label>SVG Code:</label>
                <textarea style={{ width: '100%', marginBottom: 4, padding: 6 }} value={hotspot.svgCode} onChange={e => {
                  const newHotspots = [...config.hotspotGraphic.hotspots];
                  newHotspots[idx] = { ...hotspot, svgCode: e.target.value };
                  setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
                }} />
              </>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label>X (%):</label>
                <input type="number" min={0} max={100} value={hotspot.x} onChange={e => {
                  const newHotspots = [...config.hotspotGraphic.hotspots];
                  newHotspots[idx] = { ...hotspot, x: parseFloat(e.target.value) };
                  setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
                }} style={{ width: '100%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Y (%):</label>
                <input type="number" min={0} max={100} value={hotspot.y} onChange={e => {
                  const newHotspots = [...config.hotspotGraphic.hotspots];
                  newHotspots[idx] = { ...hotspot, y: parseFloat(e.target.value) };
                  setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: newHotspots } });
                }} style={{ width: '100%' }} />
              </div>
            </div>
            <button style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, padding: '0.25rem 1rem', marginTop: 8, cursor: 'pointer' }} onClick={() => setConfig({
              ...config,
              hotspotGraphic: { ...config.hotspotGraphic, hotspots: config.hotspotGraphic.hotspots.filter((_, i) => i !== idx) }
            })}>Hotspot entfernen</button>
          </div>
        ))}
        <button style={{ width: '100%', background: '#D8C3A5', color: '#8E8D8A', padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer' }}
          onClick={() => setConfig({ ...config, hotspotGraphic: { ...config.hotspotGraphic, hotspots: [...config.hotspotGraphic.hotspots, { id: Date.now(), x: 50, y: 50, title: 'Neuer Hotspot', description: '', iconType: 'number', svgCode: '' }] } })}>
          Hotspot hinzufügen
        </button>

        <ColorPicker label="Akzentfarbe" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} />
        <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
        <ColorPicker label="Textfarbe" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} />
        <ColorPicker label="Überschrift Farbe" value={config.titleColor} onChange={e => setConfig({ ...config, titleColor: e.target.value })} />
      </section>
    );
  }

  function LivePreviewConfig({ config, setConfig }) {
    return (
      <section style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label>Titel:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />

        <label>Beschreibung:</label>
        <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />

        <ColorPicker label="Akzentfarbe" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} />
        <ColorPicker label="Textfarbe" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} />
        <ColorPicker label="Hintergrund" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
      </section>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F2', fontFamily: 'sans-serif', color: '#8E8D8A' }}>
      <header style={{ padding: '1.2rem', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E43D12' }}>Modul-Bibliothek PoC</div>
      </header>
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
                background: selectedModule === key ? '#E43D12' : '#EBE9E1',
                color: selectedModule === key ? 'white' : '#8E8D8A',
                border: 'none',
                cursor: 'pointer',
                boxShadow: selectedModule === key ? '0 2px 8px rgba(44,44,44,0.14)' : undefined,
                outline: selectedModule === key ? '2px solid #E43D12' : undefined
              }}
              onClick={() => setSelectedModule(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <section style={{ width: '100%', maxWidth: 800, background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(44,44,44,0.08)', marginBottom: 30, padding: '2rem' }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Live-Vorschau</h2>
          {renderPreview()}
        </section>
        <section style={{ width: '100%', maxWidth: 800, background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(44,44,44,0.08)', padding: '2rem' }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Konfiguration</h2>
          {renderConfigPanel()}
        </section>
      </main>
    </div>
  );
}

export default App;
