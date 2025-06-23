import { useState } from 'react'

export const usePresets = (defaultConfig) => {
  const [config, setConfig] = useState(defaultConfig)
  const [savedPresets, setSavedPresets] = useState(() => {
    try {
      const stored = localStorage.getItem('featureSliderPresets')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })
  const [presetName, setPresetName] = useState('')

  const savePreset = () => {
    if (!presetName.trim()) return
    const updated = { ...savedPresets, [presetName]: config }
    localStorage.setItem('featureSliderPresets', JSON.stringify(updated))
    setSavedPresets(updated)
    setPresetName('')
  }

  const loadPreset = (name) => {
    const p = savedPresets[name]
    if (p) setConfig(p)
  }

  const deletePreset = (name) => {
    const updated = { ...savedPresets }
    delete updated[name]
    localStorage.setItem('featureSliderPresets', JSON.stringify(updated))
    setSavedPresets(updated)
  }

  return {
    config,
    setConfig,
    savedPresets,
    presetName,
    setPresetName,
    savePreset,
    loadPreset,
    deletePreset,
  }
}

export default usePresets
