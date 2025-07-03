import { useState, useEffect } from 'react'

export const useModuleConfig = () => {
  const [selectedModule, setSelectedModule] = useState(null)
  const [moduleConfig, setModuleConfig] = useState({
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
    hotspotGraphic: {
      backgroundImage:
        'https://placehold.co/600x400/D8C3A5/8E8D8A?text=Produktbild',
      hotspots: [
        {
          id: 'hotspot1',
          x: 30,
          y: 40,
          title: 'Erster Hotspot',
          description: 'Dies ist eine Beschreibung für den ersten Hotspot.',
          svgCode: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        },
        {
          id: 'hotspot2',
          x: 70,
          y: 20,
          title: 'Zweiter Hotspot',
          description: 'Hier ist eine weitere interessante Information.',
          svgCode: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        },
      ],
    },
    viewer360: {
      images: [
        'https://via.placeholder.com/600x400/FF5733/ffffff?text=Image1',
        'https://via.placeholder.com/600x400/33FF57/ffffff?text=Image2',
        'https://via.placeholder.com/600x400/3357FF/ffffff?text=Image3',
        'https://via.placeholder.com/600x400/FF33A1/ffffff?text=Image4',
        'https://via.placeholder.com/600x400/33FFF6/ffffff?text=Image5',
      ],
      initialImageIndex: 0,
      rotationSpeed: 10,
    },
    testimonialCarousel: {
      testimonials: [
        {
          id: 1,
          quote:
            'Absolut begeistert von diesem Produkt! Es hat meine Erwartungen übertroffen.',
          author: 'Max Mustermann',
          rating: 5,
          image: 'https://placehold.co/150x150/A5D8C3/4A4A4A?text=MM',
          source: 'Google Reviews',
        },
        {
          id: 2,
          quote:
            'Ein Game-Changer für mein Business. Ich kann es nur wärmstens empfehlen.',
          author: 'Erika Musterfrau',
          rating: 4,
          image: 'https://placehold.co/150x150/C3A5D8/4A4A4A?text=EM',
          source: 'Trustpilot',
        },
        {
          id: 3,
          quote:
            'Hervorragender Kundenservice und ein fantastisches Produkt. Fünf Sterne!',
          author: 'John Doe',
          rating: 5,
          image: 'https://placehold.co/150x150/D8A5C3/4A4A4A?text=JD',
          source: 'Eigene Website',
        },
      ],
      autoplayEnabled: true,
      autoplayInterval: 5000,
      backgroundColor: '#F8F8F8',
      textColor: '#333333',
      accentColor: '#E43D12',
    },
  })

  const [savedPresets, setSavedPresets] = useState(() => {
    try {
      const storedPresets = localStorage.getItem('variaStudioPresets')
      return storedPresets ? JSON.parse(storedPresets) : {}
    } catch (error) {
      console.error('Failed to parse saved presets from localStorage', error)
      return {}
    }
  })
  const [newPresetName, setNewPresetName] = useState('')
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [presetToDelete, setPresetToDelete] = useState(null)

  useEffect(() => {
    if (!selectedModule) {
      setSelectedModule('feature-slider')
    }
  }, [selectedModule])

  const saveCurrentModuleAsPreset = () => {
    if (!newPresetName.trim() || !selectedModule) return

    const currentModuleType = selectedModule
    const currentModuleConfig = moduleConfig

    setSavedPresets((prevPresets) => {
      const updatedPresets = {
        ...prevPresets,
        [newPresetName]: {
          type: currentModuleType,
          config: currentModuleConfig,
        },
      }
      localStorage.setItem('variaStudioPresets', JSON.stringify(updatedPresets))
      setNewPresetName('')
      return updatedPresets
    })
  }

  const loadPreset = (presetName) => {
    const preset = savedPresets[presetName]
    if (preset) {
      setSelectedModule(preset.type)
      setModuleConfig(preset.config)
    }
  }

  const openDeleteConfirmModal = (presetName) => {
    setPresetToDelete(presetName)
    setShowDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModal = () => {
    setPresetToDelete(null)
    setShowDeleteConfirmModal(false)
  }

  const confirmDeletePreset = () => {
    if (presetToDelete) {
      setSavedPresets((prevPresets) => {
        const updatedPresets = { ...prevPresets }
        delete updatedPresets[presetToDelete]
        localStorage.setItem(
          'variaStudioPresets',
          JSON.stringify(updatedPresets),
        )
        return updatedPresets
      })
      closeDeleteConfirmModal()
    }
  }

  return {
    selectedModule,
    setSelectedModule,
    moduleConfig,
    setModuleConfig,
    savedPresets,
    newPresetName,
    setNewPresetName,
    saveCurrentModuleAsPreset,
    loadPreset,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    confirmDeletePreset,
    showDeleteConfirmModal,
    presetToDelete,
  }
}