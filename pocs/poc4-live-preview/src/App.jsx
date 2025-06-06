import React, { useState } from 'react';
import LivePreviewBox from './components/LivePreviewBox';

const defaultConfig = {
  title: 'Live Preview Demo',
  description: 'Ändere unten die Einstellungen und sieh die Vorschau sofort!',
  accentColor: '#E43D12',
  backgroundColor: '#FFFFFF',
  textColor: '#222222'
};

function App() {
  const [config, setConfig] = useState(defaultConfig);

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F2', fontFamily: 'sans-serif', color: '#8E8D8A' }}>
      <header style={{ padding: '1.2rem', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E43D12' }}>Live Preview PoC</div>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <section style={{ width: '100%', maxWidth: 700, background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(44,44,44,0.08)', marginBottom: 30, padding: '2rem' }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Live-Vorschau</h2>
          <LivePreviewBox config={config} />
        </section>
        <section style={{ width: '100%', maxWidth: 700, background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(44,44,44,0.08)', padding: '2rem' }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', color: '#8E8D8A', fontSize: '1.25rem' }}>Konfiguration</h2>
          <label>Titel:</label>
          <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />

          <label>Beschreibung:</label>
          <input type="text" style={{ width: '100%', marginBottom: 8, padding: 8 }} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} />

          <label>Akzentfarbe:</label>
          <input type="color" value={config.accentColor} onChange={e => setConfig({ ...config, accentColor: e.target.value })} style={{ marginBottom: 12, marginLeft: 8 }} />
          <label style={{ marginLeft: 16 }}>Textfarbe:</label>
          <input type="color" value={config.textColor} onChange={e => setConfig({ ...config, textColor: e.target.value })} style={{ marginBottom: 12, marginLeft: 8 }} />
          <label style={{ marginLeft: 16 }}>Hintergrund:</label>
          <input type="color" value={config.backgroundColor} onChange={e => setConfig({ ...config, backgroundColor: e.target.value })} style={{ marginBottom: 12, marginLeft: 8 }} />
        </section>
      </main>
    </div>
  );
}

export default App;
