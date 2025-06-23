import React from 'react'
import FeatureSliderPreview from './components/FeatureSliderPreview'
import ColorPicker from './components/ColorPicker'
import { usePresets } from './utils/usePresets'
import { getWidthStyle } from './utils/styleHelpers'

const defaultConfig = {
  title: 'Ihr Produkthighlight',
  description: 'Eine kurze Beschreibung Ihres Produkts.',
  images: ['https://placehold.co/800x600'],
  accentColor: '#E43D12',
  backgroundColor: '#FFFFFF',
  textColor: '#383838',
  titleColor: '#E43D12',
  autoplayEnabled: true,
  autoplayInterval: 3000,
  moduleWidth: 'full',
  verticalAlignment: 'middle',
  contentAlignment: 'center',
  shadowEffect: 'standard',
  borderStyle: 'thin',
  borderColor: '#E43D12',
  paddingSize: 'standard',
  companyLogoUrl: ''
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

  const upd = (k,v) => setConfig(prev => ({...prev,[k]:v}))

  return (
    <div style={{ padding:'2rem', fontFamily:'sans-serif', backgroundColor:'#F3F3F3' }}>
      <h1>PoC – FeatureSlider mit Modul-Presets</h1>

      {/* Konfigurations-Form */}
      <div style={{ margin:'1.5rem 0' }}>
        <label>Titel</label>
        <input type="text" value={config.title}
          onChange={e=>upd('title',e.target.value)}
          style={{width:'100%',padding:'.5rem',marginBottom:'.5rem'}} />

        <label>Beschreibung</label>
        <textarea value={config.description}
          onChange={e=>upd('description',e.target.value)}
          style={{width:'100%',padding:'.5rem',marginBottom:'.5rem'}} />

        <label>Logo URL</label>
        <input type="text" value={config.companyLogoUrl}
          onChange={e=>upd('companyLogoUrl',e.target.value)}
          style={{width:'100%',padding:'.5rem',marginBottom:'.5rem'}} />

        <label>Bild-URLs</label>
        {config.images.map((url,i)=>(
          <div key={i} style={{display:'flex',gap:'.5rem',marginBottom:'.5rem'}}>
            <input type="text" value={url}
              onChange={e=>{
                const imgs=[...config.images]; imgs[i]=e.target.value; upd('images',imgs)
              }}
              style={{flex:1}} />
            <button onClick={()=>upd('images',config.images.filter((_,j)=>j!==i))}>×</button>
          </div>
        ))}
        <button onClick={()=>upd('images',[...config.images,''])}>Bild hinzufügen</button>
      </div>

      {/* Live-Vorschau */}
      <div style={{
        ...getWidthStyle(config.moduleWidth),
        margin:'0 auto 2rem',
        border:'1px solid #e5e7eb',borderRadius:'.5rem',padding:'1rem',background:'#fff'
      }}>
        <FeatureSliderPreview config={config} />
      </div>

      {/* CI-Farben */}
      <div style={{ marginBottom:'2rem' }}>
        <h2>CI-Farben</h2>
        <ColorPicker label="Akzentfarbe"      value={config.accentColor}      onChange={e=>upd('accentColor',e.target.value)} />
        <ColorPicker label="Hintergrundfarbe" value={config.backgroundColor} onChange={e=>upd('backgroundColor',e.target.value)} />
        <ColorPicker label="Textfarbe"        value={config.textColor}       onChange={e=>upd('textColor',e.target.value)} />
        <ColorPicker label="Titel-Farbe"      value={config.titleColor}      onChange={e=>upd('titleColor',e.target.value)} />
        <ColorPicker label="Rahmenfarbe"      value={config.borderColor}     onChange={e=>upd('borderColor',e.target.value)} />
      </div>

      {/* Layout & Verhalten */}
      <div style={{ marginBottom:'2rem' }}>
        <h2>Layout & Verhalten</h2>
        <label>
          <input type="checkbox" checked={config.autoplayEnabled}
            onChange={e=>upd('autoplayEnabled',e.target.checked)} />
          Autoplay
        </label>
        <br/>
        <label>
          Intervall (ms):
          <input type="number" value={config.autoplayInterval}
            onChange={e=>upd('autoplayInterval',parseInt(e.target.value)||0)} style={{width:'6rem'}} />
        </label>
        <br/>
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
      <div style={{ marginBottom:'2rem' }}>
        <h2>Preset speichern</h2>
        <input type="text" value={presetName}
          onChange={e=>setPresetName(e.target.value)}
          placeholder="Preset-Name" style={{padding:'.5rem',marginRight:'.5rem'}} />
        <button onClick={savePreset} style={{padding:'.5rem 1rem'}}>Speichern</button>
      </div>

      <div>
        <h2>Gespeicherte Presets</h2>
        {Object.keys(savedPresets).length===0
          ? <p>keine Presets</p>
          : Object.entries(savedPresets).map(([name])=>(
            <div key={name} style={{marginBottom:'.5rem'}}>
              <strong>{name}</strong>
              <button onClick={()=>loadPreset(name)} style={{marginLeft:'.5rem'}}>Laden</button>
              <button onClick={()=>deletePreset(name)} style={{marginLeft:'.5rem',color:'red'}}>Löschen</button>
            </div>
          ))}
      </div>
    </div>
  )
}
