import React, { useState } from 'react';
import Viewer360Preview from './components/Viewer360Preview';
import ColorPicker from './components/ColorPicker';
import { getWidthStyle } from './utils/styleHelpers';

// Standard-Konfiguration
const defaultConfig = {
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
};

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const deviceStyles = {
    desktop: { width: '100%', maxWidth: '1200px', minHeight: '300px', height: 'auto' },
    tablet: { width: '768px', minHeight: '400px', height: 'auto' },
    mobile: { width: '375px', minHeight: '500px', height: 'auto' },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EBE9E1', fontFamily: 'sans-serif', color: '#8E8D8A' }}>
      <header style={{ padding: '1rem 1.5rem', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E43D12' }}>360° Viewer PoC</div>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '2rem' }}>
        {/* Vorschau */}
        <section
          className="preview-aside"
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2rem'
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8E8D8A', marginBottom: '1.5rem' }}>Live-Vorschau</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {['desktop', 'tablet', 'mobile'].map(device => (
              <button
                key={device}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 'semibold',
                  backgroundColor: previewDevice === device ? '#E43D12' : '#EBE9E1',
                  color: previewDevice === device ? 'white' : '#8E8D8A',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setPreviewDevice(device)}
              >
                {device.charAt(0).toUpperCase() + device.slice(1)}
              </button>
            ))}
          </div>
          <div style={{
            ...deviceStyles[previewDevice],
            backgroundColor: '#F5F5F5',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            margin: '0 auto',
          }}>
            <div style={{ ...getWidthStyle(config.moduleWidth), height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Viewer360Preview config={config} />
            </div>
          </div>
        </section>

        {/* Konfigurationspanel */}
        <section style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8E8D8A', marginBottom: '1.5rem' }}>Konfiguration</h2>
          
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

          <h3>Design & CI</h3>
          <ColorPicker label="Akzentfarbe" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} />
          <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} />
          <ColorPicker label="Textfarbe" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} />
          <ColorPicker label="Überschrift Farbe" value={config.titleColor} onChange={e => setConfig({ ...config, titleColor: e.target.value })} />
          <label>Logo-URL:</label>
          <input type="text" value={config.companyLogoUrl} style={{ width: '100%', marginBottom: 8, padding: 8 }} onChange={e => setConfig({ ...config, companyLogoUrl: e.target.value })} />
          {config.companyLogoUrl && (
            <img src={config.companyLogoUrl} alt="Logo" style={{ height: 32, objectFit: 'contain', marginBottom: 8, border: '1px solid #e5e7eb', borderRadius: 6 }} onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x30/EBE9E1/8E8D8A?text=Logo'; }} />
          )}

          <h3>Layout</h3>
          <label>Modulbreite:</label>
          <select value={config.moduleWidth} onChange={e => setConfig({ ...config, moduleWidth: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="full">Voll</option>
            <option value="wide">Breit</option>
            <option value="standard">Standard</option>
            <option value="narrow">Schmal</option>
          </select>
          <label style={{ marginLeft: 16 }}>Vertikale Ausrichtung:</label>
          <select value={config.verticalAlignment} onChange={e => setConfig({ ...config, verticalAlignment: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="top">Oben</option>
            <option value="middle">Mitte</option>
            <option value="bottom">Unten</option>
          </select>
          <label style={{ marginLeft: 16 }}>Horizontale Ausrichtung:</label>
          <select value={config.contentAlignment} onChange={e => setConfig({ ...config, contentAlignment: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="left">Links</option>
            <option value="center">Zentriert</option>
            <option value="right">Rechts</option>
          </select>
          <label style={{ marginLeft: 16 }}>Innenabstand:</label>
          <select value={config.paddingSize} onChange={e => setConfig({ ...config, paddingSize: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="compact">Kompakt</option>
            <option value="standard">Standard</option>
            <option value="spacious">Großzügig</option>
          </select>

          <label>Schatten-Effekt:</label>
          <select value={config.shadowEffect} onChange={e => setConfig({ ...config, shadowEffect: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="none">Kein Schatten</option>
            <option value="light">Leicht</option>
            <option value="standard">Standard</option>
            <option value="strong">Stark</option>
          </select>
          <label style={{ marginLeft: 16 }}>Rahmenstil:</label>
          <select value={config.borderStyle} onChange={e => setConfig({ ...config, borderStyle: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="none">Kein Rahmen</option>
            <option value="thin">Dünn</option>
            <option value="standard">Standard</option>
          </select>
          {config.borderStyle !== 'none' && (
            <ColorPicker label="Rahmenfarbe" value={config.borderColor} onChange={e => setConfig({ ...config, borderColor: e.target.value })} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
