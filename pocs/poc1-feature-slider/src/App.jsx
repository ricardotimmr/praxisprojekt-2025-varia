import React, { useState } from 'react';
import FeatureSlider from './FeatureSlider.jsx'; // Importiere den Feature Slider
// Keine direkte Importierung von CSS mehr hier, da index.css alles abdeckt

function App() {
  const [config, setConfig] = useState({
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
    companyLogoUrl: 'https://placehold.co/100x40/EBE9E1/8E8D8A?text=Ihr+Logo',
    contentAlignment: 'center',
    paddingSize: 'standard',
    shadowEffect: 'standard',
    borderStyle: 'standard',
    borderColor: '#E43D12',
    autoplayEnabled: true,
    autoplayInterval: 3000,
    verticalAlignment: 'middle',
  });

  const handleToggleAutoplay = () => {
    setConfig(prev => ({ ...prev, autoplayEnabled: !prev.autoplayEnabled }));
  };

  return (
    <div className="app-container"> {/* Ersetzt min-h-screen bg-[#EBE9E1] font-sans text-[#8E8D8A] antialiased flex flex-col items-center justify-center p-6 */}
      <h1 className="app-title">Feature Slider PoC</h1> {/* Ersetzt text-3xl font-bold text-[#E43D12] mb-8 */}
      <div className="feature-slider-wrapper"> {/* Ersetzt w-full max-w-2xl h-[500px] bg-white rounded-xl shadow-lg p-6 */}
        <FeatureSlider
          config={{ ...config, onToggleAutoplay: handleToggleAutoplay }}
        />
      </div>

      {/* Einfache Konfigurations-UI für diesen PoC */}
      <div className="config-panel"> {/* Ersetzt mt-8 w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg */}
        <h2 className="config-panel-title">Konfiguration</h2> {/* Ersetzt text-2xl font-bold text-[#8E8D8A] mb-4 */}
        <div className="config-input-group"> {/* Ersetzt space-y-4 */}
          <div>
            <label htmlFor="title-input" className="config-label">Titel</label> {/* Ersetzt block text-sm font-medium text-[#8E8D8A] mb-1 */}
            <input
              id="title-input"
              type="text"
              className="config-input-text" /* Ersetzt w-full p-2 rounded-lg border border-gray-300 */
              value={config.title}
              onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="description-textarea" className="config-label">Beschreibung</label>
            <textarea
              id="description-textarea"
              className="config-textarea" /* Ersetzt w-full p-2 rounded-lg border border-gray-300 h-20 */
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="accent-color-input" className="config-label">Akzentfarbe</label>
            <input
              id="accent-color-input"
              type="color"
              className="config-color-input" /* Ersetzt w-full h-10 rounded-lg border border-gray-300 */
              value={config.accentColor}
              onChange={(e) => setConfig(prev => ({ ...prev, accentColor: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="background-color-input" className="config-label">Hintergrundfarbe</label>
            <input
              id="background-color-input"
              type="color"
              className="config-color-input"
              value={config.backgroundColor}
              onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="autoplay-checkbox" className="config-label">Autoplay aktiviert</label>
            <input
              id="autoplay-checkbox"
              type="checkbox"
              className="config-checkbox" /* Ersetzt form-checkbox h-5 w-5 text-[#E43D12] rounded */
              checked={config.autoplayEnabled}
              onChange={(e) => setConfig(prev => ({ ...prev, autoplayEnabled: e.target.checked }))}
            />
          </div>
          {config.autoplayEnabled && (
            <div>
              <label htmlFor="autoplay-interval-input" className="config-label">Autoplay Intervall (ms)</label>
              <input
                id="autoplay-interval-input"
                type="number"
                className="config-input-text"
                value={config.autoplayInterval}
                onChange={(e) => setConfig(prev => ({ ...prev, autoplayInterval: parseInt(e.target.value) || 0 }))}
                min="500"
              />
            </div>
          )}
          <div>
            <label htmlFor="content-alignment-select" className="config-label">Inhaltsausrichtung</label>
            <select
              id="content-alignment-select"
              className="config-select"
              value={config.contentAlignment}
              onChange={(e) => setConfig(prev => ({ ...prev, contentAlignment: e.target.value }))}
            >
              <option value="left">Links</option>
              <option value="center">Mitte</option>
              <option value="right">Rechts</option>
            </select>
          </div>
          <div>
            <label htmlFor="padding-size-select" className="config-label">Padding-Größe</label>
            <select
              id="padding-size-select"
              className="config-select"
              value={config.paddingSize}
              onChange={(e) => setConfig(prev => ({ ...prev, paddingSize: e.target.value }))}
            >
              <option value="compact">Kompakt</option>
              <option value="standard">Standard</option>
              <option value="spacious">Geräumig</option>
            </select>
          </div>
          <div>
            <label htmlFor="shadow-effect-select" className="config-label">Schatten-Effekt</label>
            <select
              id="shadow-effect-select"
              className="config-select"
              value={config.shadowEffect}
              onChange={(e) => setConfig(prev => ({ ...prev, shadowEffect: e.target.value }))}
            >
              <option value="none">Keiner</option>
              <option value="light">Leicht</option>
              <option value="standard">Standard</option>
              <option value="strong">Stark</option>
            </select>
          </div>
          <div>
            <label htmlFor="border-style-select" className="config-label">Rahmen-Stil</label>
            <select
              id="border-style-select"
              className="config-select"
              value={config.borderStyle}
              onChange={(e) => setConfig(prev => ({ ...prev, borderStyle: e.target.value }))}
            >
              <option value="none">Keiner</option>
              <option value="thin">Dünn</option>
              <option value="standard">Standard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;