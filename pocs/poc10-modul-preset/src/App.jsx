import React, { useState } from 'react'
import FeatureSliderPreview from './components/FeatureSliderPreview'
import Viewer360Preview from './components/Viewer360Preview'
import HotspotGraphicPreview from './components/HotspotGraphicPreview'
import ColorPicker from './components/ColorPicker'
import { usePresets } from './utils/usePresets'
import { getWidthStyle } from './utils/styleHelpers'

const defaultConfig = {
  selectedModule: 'feature-slider',

  // Gemeinsame Felder
  title: 'Ihr Produkthighlight',
  description: 'Eine kurze Beschreibung Ihres Produkts.',
  companyLogoUrl: '',

  // CI-Farben
  accentColor: '#E43D12',
  backgroundColor: '#FFFFFF',
  textColor: '#383838',
  titleColor: '#E43D12',
  borderColor: '#E43D12',

  // Layout
  moduleWidth: 'full',
  verticalAlignment: 'middle',
  contentAlignment: 'center',
  shadowEffect: 'standard',
  borderStyle: 'thin',
  paddingSize: 'standard',

  // Feature Slider
  images: ['https://placehold.co/800x600'],
  autoplayEnabled: true,
  autoplayInterval: 3000,

  // 360° Viewer
  viewer360: {
    images: ['https://placehold.co/800x600'],
    initialImageIndex: 0,
  },

  // Hotspot Grafik
  hotspotGraphic: {
    backgroundImage: 'https://placehold.co/800x600',
    hotspots: [],
  },
}

export default function App() {
  const {
    config,
    setConfig,
    savedPresets,
    presetName,
    setPresetName,
    savePreset,
    loadPreset,
    deletePreset,
  } = usePresets(defaultConfig)

  const upd = (key, value) =>
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }))

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#F3F3F3' }}>
      <h1>PoC 10 – Modularer Preview-Editor</h1>

      {/* Live-Vorschau oben */}
      <div
        style={{
          ...getWidthStyle(config.moduleWidth),
          margin: '1rem auto',
          border: '1px solid #e5e7eb',
          borderRadius: '.5rem',
          padding: '1rem',
          background: 'white',
        }}
      >
        {config.selectedModule === 'feature-slider' && (
          <FeatureSliderPreview config={config} />
        )}
        {config.selectedModule === '360-viewer' && (
          <Viewer360Preview config={config} />
        )}
        {config.selectedModule === 'hotspot-graphic' && (
          <HotspotGraphicPreview config={config} />
        )}
      </div>

      {/* Modul-Auswahl */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Modul:</label>
        {[
          ['feature-slider', 'Feature Slider'],
          ['360-viewer', '360° Viewer'],
          ['hotspot-graphic', 'Hotspot Grafik'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => upd('selectedModule', value)}
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor:
                config.selectedModule === value ? '#E43D12' : '#EBE9E1',
              color: config.selectedModule === value ? 'white' : '#8E8D8A',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Konfigurations-Form */}
      <div
        style={{
          marginBottom: '2rem',
          background: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        {/* Gemeinsame Felder */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Titel</label>
          <input
            type="text"
            value={config.title}
            onChange={e => upd('title', e.target.value)}
            style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }}
          />
          <label>Beschreibung</label>
          <textarea
            value={config.description}
            onChange={e => upd('description', e.target.value)}
            style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }}
          />
          <label>Logo URL</label>
          <input
            type="text"
            value={config.companyLogoUrl}
            onChange={e => upd('companyLogoUrl', e.target.value)}
            style={{ width: '100%', padding: '.5rem' }}
          />
        </div>

        {/* Modul-spezifische Felder */}
        {config.selectedModule === 'feature-slider' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Bilder für Slider</label>
            {config.images.map((url, i) => (
              <div
                key={i}
                style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}
              >
                <input
                  type="text"
                  value={url}
                  onChange={e => {
                    const imgs = [...config.images]
                    imgs[i] = e.target.value
                    upd('images', imgs)
                  }}
                  style={{ flex: 1, padding: '.5rem' }}
                />
                <button onClick={() => upd('images', config.images.filter((_, j) => j !== i))}>
                  ×
                </button>
              </div>
            ))}
            <button onClick={() => upd('images', [...config.images, ''])}>
              Bild hinzufügen
            </button>
            <div style={{ marginTop: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={config.autoplayEnabled}
                  onChange={e => upd('autoplayEnabled', e.target.checked)}
                />
                Autoplay
              </label>
              <br />
              <label style={{ marginTop: '.5rem' }}>
                Intervall (ms):
                <input
                  type="number"
                  value={config.autoplayInterval}
                  onChange={e => upd('autoplayInterval', parseInt(e.target.value) || 0)}
                  style={{ width: '6rem', marginLeft: '.5rem' }}
                />
              </label>
            </div>
          </div>
        )}

        {config.selectedModule === '360-viewer' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Bilder für Viewer</label>
            {config.viewer360.images.map((url, i) => (
              <div
                key={i}
                style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}
              >
                <input
                  type="text"
                  value={url}
                  onChange={e => {
                    const imgs = [...config.viewer360.images]
                    imgs[i] = e.target.value
                    upd('viewer360', { ...config.viewer360, images: imgs })
                  }}
                  style={{ flex: 1, padding: '.5rem' }}
                />
                <button
                  onClick={() => {
                    const imgs = config.viewer360.images.filter((_, j) => j !== i)
                    upd('viewer360', { ...config.viewer360, images: imgs })
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                upd('viewer360', {
                  ...config.viewer360,
                  images: [...config.viewer360.images, ''],
                })
              }
            >
              Bild hinzufügen
            </button>
            <div style={{ marginTop: '1rem' }}>
              <label>
                Start-Index:
                <input
                  type="number"
                  value={config.viewer360.initialImageIndex}
                  min={0}
                  max={config.viewer360.images.length - 1}
                  onChange={e => {
                    let idx = parseInt(e.target.value, 10)
                    if (isNaN(idx)) idx = 0
                    idx = Math.max(0, Math.min(idx, config.viewer360.images.length - 1))
                    upd('viewer360', { ...config.viewer360, initialImageIndex: idx })
                  }}
                  style={{ width: '4rem', marginLeft: '.5rem' }}
                />
              </label>
            </div>
          </div>
        )}

        {config.selectedModule === 'hotspot-graphic' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Hintergrundbild URL</label>
            <input
              type="text"
              value={config.hotspotGraphic.backgroundImage}
              onChange={e =>
                upd('hotspotGraphic', {
                  ...config.hotspotGraphic,
                  backgroundImage: e.target.value,
                })
              }
              style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }}
            />
            <h4>Hotspots</h4>
            {config.hotspotGraphic.hotspots.map((hp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '1rem',
                  padding: '.5rem',
                  background: '#EBE9E1',
                  borderRadius: '.5rem',
                }}
              >
                <label>Titel</label>
                <input
                  type="text"
                  value={hp.title}
                  onChange={e => {
                    const hps = [...config.hotspotGraphic.hotspots]
                    hps[i] = { ...hp, title: e.target.value }
                    upd('hotspotGraphic', { ...config.hotspotGraphic, hotspots: hps })
                  }}
                  style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }}
                />
                <label>Beschreibung</label>
                <textarea
                  value={hp.description}
                  onChange={e => {
                    const hps = [...config.hotspotGraphic.hotspots]
                    hps[i] = { ...hp, description: e.target.value }
                    upd('hotspotGraphic', { ...config.hotspotGraphic, hotspots: hps })
                  }}
                  style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }}
                />
                <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
                  <label>
                    X (%)<br />
                    <input
                      type="number"
                      value={hp.x || 0}
                      min={0}
                      max={100}
                      onChange={e => {
                        const hps = [...config.hotspotGraphic.hotspots]
                        hps[i] = { ...hp, x: parseFloat(e.target.value) || 0 }
                        upd('hotspotGraphic', { ...config.hotspotGraphic, hotspots: hps })
                      }}
                      style={{ width: '4rem', padding: '.25rem' }}
                    />
                  </label>
                  <label>
                    Y (%)<br />
                    <input
                      type="number"
                      value={hp.y || 0}
                      min={0}
                      max={100}
                      onChange={e => {
                        const hps = [...config.hotspotGraphic.hotspots]
                        hps[i] = { ...hp, y: parseFloat(e.target.value) || 0 }
                        upd('hotspotGraphic', { ...config.hotspotGraphic, hotspots: hps })
                      }}
                      style={{ width: '4rem', padding: '.25rem' }}
                    />
                  </label>
                </div>
                <button
                  onClick={() => {
                    const hps = config.hotspotGraphic.hotspots.filter((_, j) => j !== i)
                    upd('hotspotGraphic', { ...config.hotspotGraphic, hotspots: hps })
                  }}
                >
                  Hotspot entfernen
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const nextId = config.hotspotGraphic.hotspots.length + 1
                upd('hotspotGraphic', {
                  ...config.hotspotGraphic,
                  hotspots: [
                    ...config.hotspotGraphic.hotspots,
                    {
                      id: nextId,
                      x: 50,
                      y: 50,
                      title: 'Neuer Hotspot',
                      description: 'Details...',
                      iconType: 'number',
                      svgCode: '',
                    },
                  ],
                })
              }}
            >
              Hotspot hinzufügen
            </button>
          </div>
        )}

        {/* CI-Farben */}
        <h2>CI-Farben</h2>
        <ColorPicker label="Akzentfarbe"      value={config.accentColor}      onChange={e=>upd('accentColor',e.target.value)} />
        <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e=>upd('backgroundColor',e.target.value)} />
        <ColorPicker label="Textfarbe"        value={config.textColor}       onChange={e=>upd('textColor',e.target.value)} />
        <ColorPicker label="Titel-Farbe"      value={config.titleColor}      onChange={e=>upd('titleColor',e.target.value)} />
        <ColorPicker label="Rahmenfarbe"      value={config.borderColor}     onChange={e=>upd('borderColor',e.target.value)} />

        {/* Layout & Verhalten */}
        <h2>Layout & Verhalten</h2>
        <label>
          Modulbreite:
          <select value={config.moduleWidth} onChange={e=>upd('moduleWidth',e.target.value)}>
            <option value="full">Voll</option>
            <option value="wide">Breit</option>
            <option value="standard">Standard</option>
            <option value="narrow">Schmal</option>
          </select>
        </label>
        <br/>
        <label>
          Vertikale Ausrichtung:
          <select value={config.verticalAlignment} onChange={e=>upd('verticalAlignment',e.target.value)}>
            <option value="top">Oben</option>
            <option value="middle">Mitte</option>
            <option value="bottom">Unten</option>
          </select>
        </label>
        <br/>
        <label>
          Horizontale Ausrichtung:
          <select value={config.contentAlignment} onChange={e=>upd('contentAlignment',e.target.value)}>
            <option value="left">Links</option>
            <option value="center">Zentriert</option>
            <option value="right">Rechts</option>
          </select>
        </label>
        <br/>
        <label>
          Schatten:
          <select value={config.shadowEffect} onChange={e=>upd('shadowEffect',e.target.value)}>
            <option value="none">Keiner</option>
            <option value="light">Leicht</option>
            <option value="standard">Standard</option>
            <option value="strong">Stark</option>
          </select>
        </label>
        <br/>
        <label>
          Rahmenstil:
          <select value={config.borderStyle} onChange={e=>upd('borderStyle',e.target.value)}>
            <option value="none">Keiner</option>
            <option value="thin">Dünn</option>
            <option value="standard">Standard</option>
          </select>
        </label>
        <br/>
        <label>
          Innenabstand:
          <select value={config.paddingSize} onChange={e=>upd('paddingSize',e.target.value)}>
            <option value="compact">Kompakt</option>
            <option value="standard">Standard</option>
            <option value="spacious">Großzügig</option>
          </select>
        </label>
      </div>

      {/* Preset-Manager */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Preset speichern</h2>
        <input
          type="text"
          value={presetName}
          onChange={e => setPresetName(e.target.value)}
          placeholder="Preset-Name"
          style={{ padding: '.5rem', marginRight: '.5rem' }}
        />
        <button onClick={savePreset} style={{ padding: '.5rem 1rem' }}>Speichern</button>
      </div>

      <div>
        <h2>Gespeicherte Presets</h2>
        {Object.keys(savedPresets).length === 0
          ? <p>Keine Presets</p>
          : Object.entries(savedPresets).map(([name]) => (
            <div key={name} style={{ marginBottom: '.5rem' }}>
              <strong>{name}</strong>
              <button onClick={() => loadPreset(name)} style={{ marginLeft: '.5rem' }}>Laden</button>
              <button onClick={() => deletePreset(name)} style={{ marginLeft: '.5rem', color: 'red' }}>Löschen</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
