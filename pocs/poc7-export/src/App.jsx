import React, { useState, useEffect, useCallback } from 'react'
import FeatureSliderPreview from './components/FeatureSliderPreview'
import Viewer360Preview from './components/Viewer360Preview'
import HotspotGraphicPreview from './components/HotspotGraphicPreview'
import ColorPicker from './components/ColorPicker'
import { useModuleConfig } from './utils/useModuleConfig'
import {
  getShadowStyle,
  getBorderStyle,
  getWidthStyle,
  getVerticalAlignmentStyle,
  getContentAlignmentStyle,
  getPaddingStyle,
  generateModuleHtml, // Import the new function
} from './utils/styleHelpers'

function App() {
  const {
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
  } = useModuleConfig()

  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop', 'tablet', 'mobile'
  const [isStickyPreview, setIsStickyPreview] = useState(true) // Neuer Zustand für die fixe Vorschau
  const [showExportModal, setShowExportModal] = useState(false) // State for export modal
  const [exportHtmlCode, setExportHtmlCode] = useState('') // State to store generated HTML

  // Definieren der Stil-Eigenschaften für verschiedene Geräteansichten
  const deviceStyles = {
    desktop: {
      width: '100%', // Nimmt die volle Breite des übergeordneten Containers ein
      maxWidth: '1200px', // Maximale Breite für Desktop-Vorschau
      height: 'auto', // Höhe passt sich dem Inhalt an
      minHeight: '300px', // Mindesthöhe für Desktop-Vorschau
    },
    tablet: {
      width: '768px', // Typische Tablet-Breite
      height: 'auto',
      minHeight: '400px',
    },
    mobile: {
      width: '375px', // Typische Mobile-Breite
      height: 'auto',
      minHeight: '500px',
    },
  }

  // Function to open the export modal and generate HTML
  const handleExportClick = useCallback(() => {
    if (selectedModule) {
      const html = generateModuleHtml(selectedModule, moduleConfig);
      setExportHtmlCode(html);
      setShowExportModal(true);
    }
  }, [selectedModule, moduleConfig]);

  // Function to copy HTML to clipboard
  const copyToClipboard = () => {
    // Use a temporary textarea to copy text to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = exportHtmlCode;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('HTML-Code in die Zwischenablage kopiert!'); // Use a custom modal in a real app
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Fehler beim Kopieren des HTML-Codes.'); // Use a custom modal in a real app
    }
    document.body.removeChild(textarea);
    setShowExportModal(false);
  };

  // Function to download HTML as a file
  const downloadHtmlFile = () => {
    const blob = new Blob([exportHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedModule}-export.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };


  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EBE9E1',
        fontFamily: 'sans-serif',
        color: '#8E8D8A',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header/Navigation */}
      <header
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'white',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '80rem',
            margin: '0 auto',
          }}
        >
          <div
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E43D12' }}
          >
            Varia
          </div>
          <ul style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }}>
            {' '}
            {/* hidden md:flex */}
            <li>
              <a
                href="#"
                style={{ color: '#8E8D8A', transition: 'color 0.3s' }}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{ color: '#8E8D8A', transition: 'color 0.3s' }}
              >
                So funktioniert's
              </a>
            </li>
            <li>
              <a href="#" style={{ color: '#E43D12', fontWeight: 'semibold' }}>
                Varia Studio
              </a>
            </li>{' '}
            {/* Aktiver Link */}
            <li>
              <a
                href="https://github.com/ricardotimmr/praxisprojekt-2025/wiki"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8E8D8A', transition: 'color 0.3s' }}
              >
                Dokumentation
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{ color: '#8E8D8A', transition: 'color 0.3s' }}
              >
                Kontakt
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  backgroundColor: '#E43D12',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  boxShadow:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'background-color 0.3s',
                }}
              >
                Jetzt loslegen
              </a>
            </li>
          </ul>
          {/* Mobile Navigation (Hamburger-Menü könnte hier hinzugefügt werden) */}
          <div style={{ display: 'block' }}>
            {' '}
            {/* md:hidden */}
            {/* Hamburger Icon */}
            <button
              style={{
                color: '#8E8D8A',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: '1.5rem', width: '1.5rem' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area - Now uses flex-row on large screens for side-by-side layout */}
      <main
        className="main-content"
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column', // Default to column, responsive override in index.css for lg:flex-row
          padding: '1.5rem',
          gap: '1.5rem',
        }}
      >
        {/* Live Preview */}
        <aside
          className="preview-aside"
          style={{
            width: '100%',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            order: 0, // order-first
            // Conditional sticky styles
            position: isStickyPreview ? 'sticky' : 'static',
            top: isStickyPreview ? '1.5rem' : 'auto',
            zIndex: isStickyPreview ? 10 : 'auto',
            maxHeight: isStickyPreview ? '60vh' : 'none', // Max height for sticky, none for scrollable
            height: isStickyPreview ? 'auto' : 'auto', // Let content define height when not sticky
            overflowY: isStickyPreview ? 'auto' : 'auto', // Always allow scroll if content overflows
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#8E8D8A',
              marginBottom: '1.5rem',
            }}
          >
            Live-Vorschau
          </h2>

          {/* Toggle Button for Sticky Preview */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '1rem',
            }}
          >
            <button
              onClick={() => setIsStickyPreview(!isStickyPreview)}
              style={{
                backgroundColor: isStickyPreview ? '#E43D12' : '#EBE9E1',
                color: isStickyPreview ? 'white' : '#8E8D8A',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'semibold',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            >
              {isStickyPreview
                ? 'Vorschau scrollbar machen'
                : 'Vorschau fixieren'}
            </button>
          </div>

          {/* Device Preview Selector */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'semibold',
                transition: 'all 0.3s',
                backgroundColor:
                  previewDevice === 'desktop' ? '#E43D12' : '#EBE9E1',
                color: previewDevice === 'desktop' ? 'white' : '#8E8D8A',
                boxShadow:
                  previewDevice === 'desktop'
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setPreviewDevice('desktop')}
            >
              Desktop
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'semibold',
                transition: 'all 0.3s',
                backgroundColor:
                  previewDevice === 'tablet' ? '#E43D12' : '#EBE9E1',
                color: previewDevice === 'tablet' ? 'white' : '#8E8D8A',
                boxShadow:
                  previewDevice === 'tablet'
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setPreviewDevice('tablet')}
            >
              Tablet
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'semibold',
                transition: 'all 0.3s',
                backgroundColor:
                  previewDevice === 'mobile' ? '#E43D12' : '#EBE9E1',
                color: previewDevice === 'mobile' ? 'white' : '#8E8D8A',
                boxShadow:
                  previewDevice === 'mobile'
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setPreviewDevice('mobile')}
            >
              Mobile
            </button>
          </div>

          {/* Preview Area - Adjusted to apply device-specific styles */}
          <div
            style={{
              flex: '1',
              backgroundColor: '#F5F5F5',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              transition: 'all 0.3s',
              overflowY: 'auto', // Always allow internal scrolling if content is too large
              ...deviceStyles[previewDevice], // Anwenden der gerätespezifischen Stile
              margin: '0 auto', // Zentriert die Vorschau im Container
            }}
          >
            {!selectedModule ? (
              <p
                style={{ color: '#8E8D8A', opacity: 0.7, textAlign: 'center' }}
              >
                Wählen Sie ein Modul zur Vorschau.
              </p>
            ) : (
              <div
                style={{
                  ...getWidthStyle(moduleConfig.moduleWidth),
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedModule === 'feature-slider' ? (
                  <FeatureSliderPreview config={moduleConfig} />
                ) : selectedModule === '360-viewer' ? (
                  <Viewer360Preview config={moduleConfig} />
                ) : selectedModule === 'hotspot-graphic' ? (
                  <HotspotGraphicPreview
                    config={moduleConfig}
                    setModuleConfig={setModuleConfig}
                  />
                ) : (
                  <p
                    style={{
                      color: '#8E8D8A',
                      opacity: 0.7,
                      textAlign: 'center',
                    }}
                  >
                    Vorschau für diesen Modultyp nicht verfügbar.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Export Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={handleExportClick}
              disabled={!selectedModule}
              style={{
                backgroundColor: selectedModule ? '#10B981' : '#D1D5DB', // Green-500 or Gray-300
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none',
                cursor: selectedModule ? 'pointer' : 'not-allowed',
              }}
            >
              Modul exportieren
            </button>
          </div>

        </aside>

        {/* Module Selection & Configuration Panel - order-last on small screens, order-first (or default) on lg */}
        <div
          className="config-section"
          style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            gap: '1.5rem',
            order: 1,
          }}
        >
          {' '}
          {/* flex-1 flex-col gap-6 lg:w-1/2 order-last lg:order-first */}
          {/* Module Selection */}
          <aside
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8E8D8A',
                marginBottom: '1.5rem',
              }}
            >
              Modul-Bibliothek
            </h2>
            <div
              className="module-selection-card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gap: '1rem',
              }}
            >
              {' '}
              {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 */}
              {/* Feature Slider Card */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor:
                    selectedModule === 'feature-slider' ? '#EFB11D' : '#EBE9E1',
                  color:
                    selectedModule === 'feature-slider' ? 'white' : '#8E8D8A',
                  boxShadow:
                    selectedModule === 'feature-slider'
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      : 'none',
                }}
                onClick={() => setSelectedModule('feature-slider')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: '3rem',
                    width: '3rem',
                    marginBottom: '0.75rem',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <h3 style={{ fontWeight: 'semibold', fontSize: '1.125rem' }}>
                  Feature Slider
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.8,
                    marginTop: '0.25rem',
                  }}
                >
                  Interaktive Produkt-Highlights
                </p>
              </div>
              {/* 360° Viewer Card */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor:
                    selectedModule === '360-viewer' ? '#EFB11D' : '#EBE9E1',
                  color: selectedModule === '360-viewer' ? 'white' : '#8E8D8A',
                  boxShadow:
                    selectedModule === '360-viewer'
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      : 'none',
                }}
                onClick={() => setSelectedModule('360-viewer')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: '3rem',
                    width: '3rem',
                    marginBottom: '0.75rem',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 style={{ fontWeight: 'semibold', fontSize: '1.125rem' }}>
                  360° Viewer
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.8,
                    marginTop: '0.25rem',
                  }}
                >
                  Produkte von allen Seiten
                </p>
              </div>
              {/* Hotspot Grafik Card */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor:
                    selectedModule === 'hotspot-graphic'
                      ? '#EFB11D'
                      : '#EBE9E1',
                  color:
                    selectedModule === 'hotspot-graphic' ? 'white' : '#8E8D8A',
                  boxShadow:
                    selectedModule === 'hotspot-graphic'
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      : 'none',
                }}
                onClick={() => setSelectedModule('hotspot-graphic')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: '3rem',
                    width: '3rem',
                    marginBottom: '0.75rem',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 style={{ fontWeight: 'semibold', fontSize: '1.125rem' }}>
                  Hotspot Grafik
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    opacity: 0.8,
                    marginTop: '0.25rem',
                  }}
                >
                  Interaktive Bilddetails
                </p>
              </div>
              {/* Weitere Modultypen könnten hier hinzugefügt werden */}
            </div>
          </aside>
          {/* Configuration Panel - Now flex-1 to take remaining height and has overflow-y-auto */}
          <section
            style={{
              flex: '1',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8E8D8A',
                marginBottom: '1.5rem',
              }}
            >
              Modul konfigurieren
            </h2>

            {!selectedModule ? (
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  color: '#8E8D8A',
                  opacity: 0.7,
                }}
              >
                Bitte wählen Sie zuerst einen Modultyp aus der Bibliothek.
              </div>
            ) : (
              <div
                style={{
                  gap: '2rem',
                  flex: '1',
                  overflowY: 'auto',
                  paddingRight: '1rem',
                }}
              >
                {' '}
                {/* space-y-8 flex-1 overflow-y-auto pr-4 */}
                {/* Inhaltsbearbeitung */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'semibold',
                      color: '#8E8D8A',
                      marginBottom: '1rem',
                    }}
                  >
                    Inhalte
                  </h3>
                  <label
                    htmlFor="moduleTitle"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#8E8D8A',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Titel des Moduls
                  </label>
                  <input
                    type="text"
                    id="moduleTitle"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db', // gray-300
                      outline: 'none',
                      marginBottom: '1rem',
                      color: '#8E8D8A',
                      fontSize: '1rem',
                    }}
                    value={moduleConfig.title}
                    onChange={(e) =>
                      setModuleConfig((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />

                  <label
                    htmlFor="moduleDescription"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#8E8D8A',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Beschreibung
                  </label>
                  <textarea
                    id="moduleDescription"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db', // gray-300
                      outline: 'none',
                      marginBottom: '1rem',
                      color: '#8E8D8A',
                      height: '6rem', // h-24
                      resize: 'vertical',
                      fontSize: '1rem',
                    }}
                    value={moduleConfig.description}
                    onChange={(e) =>
                      setModuleConfig((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />

                  {/* Bildverwaltung (Beispiel für Feature Slider) */}
                  {selectedModule === 'feature-slider' && (
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Bilder für Slider
                      </label>
                      <div style={{ gap: '0.5rem' }}>
                        {' '}
                        {/* space-y-2 */}
                        {moduleConfig.images.map((imgUrl, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                          >
                            {' '}
                            {/* space-x-2 */}
                            <input
                              type="text"
                              style={{
                                flex: '1',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #d1d5db', // gray-300
                                outline: 'none',
                                color: '#8E8D8A',
                                fontSize: '0.875rem',
                              }}
                              value={imgUrl}
                              onChange={(e) => {
                                const newImages = [...moduleConfig.images]
                                newImages[index] = e.target.value
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  images: newImages,
                                }))
                              }}
                              placeholder={`Bild URL ${index + 1}`}
                            />
                            <button
                              style={{
                                backgroundColor: '#ef4444', // red-500
                                color: 'white',
                                width: '2rem',
                                height: '2rem',
                                padding: 0,
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                transition: 'background-color 0.3s',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const newImages = moduleConfig.images.filter(
                                  (_, i) => i !== index,
                                )
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  images: newImages,
                                }))
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ height: '1rem', width: '1rem' }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          style={{
                            width: '100%',
                            backgroundColor: '#D8C3A5',
                            color: '#8E8D8A',
                            padding: '0.5rem 0',
                            borderRadius: '0.5rem',
                            fontWeight: 'semibold',
                            transition: 'background-color 0.3s',
                            fontSize: '0.875rem',
                            marginTop: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            setModuleConfig((prev) => ({
                              ...prev,
                              images: [...prev.images, ''],
                            }))
                          }
                        >
                          Bild hinzufügen
                        </button>
                      </div>
                      {/* Autoplay Konfiguration */}
                      <div style={{ marginTop: '1.5rem' }}>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#8E8D8A',
                            marginBottom: '0.5rem',
                          }}
                        >
                          Autoplay
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          {' '}
                          {/* space-x-4 */}
                          <label
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                height: '1.25rem',
                                width: '1.25rem',
                                color: '#E43D12',
                                borderRadius: '0.25rem',
                              }}
                              checked={moduleConfig.autoplayEnabled}
                              onChange={(e) =>
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  autoplayEnabled: e.target.checked,
                                }))
                              }
                            />
                            <span
                              style={{ marginLeft: '0.5rem', color: '#8E8D8A' }}
                            >
                              Aktiviert
                            </span>
                          </label>
                          <label
                            htmlFor="autoplayInterval"
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#8E8D8A',
                            }}
                          >
                            Intervall (ms):
                          </label>
                          <input
                            type="number"
                            id="autoplayInterval"
                            style={{
                              width: '6rem', // w-24
                              padding: '0.5rem',
                              borderRadius: '0.5rem',
                              border: '1px solid #d1d5db', // gray-300
                              outline: 'none',
                              color: '#8E8D8A',
                              fontSize: '0.875rem',
                            }}
                            value={moduleConfig.autoplayInterval}
                            onChange={(e) =>
                              setModuleConfig((prev) => ({
                                ...prev,
                                autoplayInterval: parseInt(e.target.value) || 0,
                              }))
                            }
                            min="500"
                            step="100"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hotspot Grafik spezifische Inhalte */}
                  {selectedModule === 'hotspot-graphic' && (
                    <div>
                      <label
                        htmlFor="hotspotBackgroundImage"
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Hintergrundbild URL
                      </label>
                      <input
                        type="text"
                        id="hotspotBackgroundImage"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #d1d5db', // gray-300
                          outline: 'none',
                          marginBottom: '1rem',
                          color: '#8E8D8A',
                          fontSize: '1rem',
                        }}
                        value={moduleConfig.hotspotGraphic.backgroundImage}
                        onChange={(e) =>
                          setModuleConfig((prev) => ({
                            ...prev,
                            hotspotGraphic: {
                              ...prev.hotspotGraphic,
                              backgroundImage: e.target.value,
                            },
                          }))
                        }
                        placeholder="URL des Hintergrundbildes"
                      />

                      <h4
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 'semibold',
                          color: '#8E8D8A',
                          marginBottom: '0.75rem',
                        }}
                      >
                        Hotspots
                      </h4>
                      <div style={{ gap: '1rem' }}>
                        {' '}
                        {/* space-y-4 */}
                        {moduleConfig.hotspotGraphic.hotspots.map(
                          (hotspot, index) => (
                            <div
                              key={hotspot.id}
                              style={{
                                padding: '1rem',
                                backgroundColor: '#EBE9E1',
                                borderRadius: '0.5rem',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                marginBottom: '1rem',
                              }}
                            >
                              <h5
                                style={{
                                  fontWeight: 'semibold',
                                  color: '#8E8D8A',
                                  marginBottom: '0.5rem',
                                }}
                              >
                                Hotspot {hotspot.id}
                              </h5>
                              <label
                                htmlFor={`hotspotTitle-${index}`}
                                style={{
                                  display: 'block',
                                  fontSize: '0.875rem',
                                  fontWeight: '500',
                                  color: '#8E8D8A',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                Titel
                              </label>
                              <input
                                type="text"
                                id={`hotspotTitle-${index}`}
                                style={{
                                  width: '100%',
                                  padding: '0.5rem',
                                  borderRadius: '0.5rem',
                                  border: '1px solid #d1d5db', // gray-300
                                  outline: 'none',
                                  color: '#8E8D8A',
                                  fontSize: '0.875rem',
                                  marginBottom: '0.5rem',
                                }}
                                value={hotspot.title}
                                onChange={(e) => {
                                  const newHotspots = [
                                    ...moduleConfig.hotspotGraphic.hotspots,
                                  ]
                                  newHotspots[index] = {
                                    ...hotspot,
                                    title: e.target.value,
                                  }
                                  setModuleConfig((prev) => ({
                                    ...prev,
                                    hotspotGraphic: {
                                      ...prev.hotspotGraphic,
                                      hotspots: newHotspots,
                                    },
                                  }))
                                }}
                              />
                              <label
                                htmlFor={`hotspotDescription-${index}`}
                                style={{
                                  display: 'block',
                                  fontSize: '0.875rem',
                                  fontWeight: '500',
                                  color: '#8E8D8A',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                Beschreibung
                              </label>
                              <textarea
                                id={`hotspotDescription-${index}`}
                                style={{
                                  width: '100%',
                                  padding: '0.5rem',
                                  borderRadius: '0.5rem',
                                  border: '1px solid #d1d5db', // gray-300
                                  outline: 'none',
                                  marginBottom: '0.5rem',
                                  color: '#8E8D8A',
                                  fontSize: '0.875rem',
                                  resize: 'vertical',
                                  height: '4rem', // h-16
                                }}
                                value={hotspot.description}
                                onChange={(e) => {
                                  const newHotspots = [
                                    ...moduleConfig.hotspotGraphic.hotspots,
                                  ]
                                  newHotspots[index] = {
                                    ...hotspot,
                                    description: e.target.value,
                                  }
                                  setModuleConfig((prev) => ({
                                    ...prev,
                                    hotspotGraphic: {
                                      ...prev.hotspotGraphic,
                                      hotspots: newHotspots,
                                    },
                                  }))
                                }}
                              />

                              {/* Hotspot Icon Type */}
                              <div style={{ marginBottom: '0.5rem' }}>
                                <label
                                  htmlFor={`iconType-${index}`}
                                  style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#8E8D8A',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  Hotspot Symbol
                                </label>
                                <select
                                  id={`iconType-${index}`}
                                  style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #d1d5db', // gray-300
                                    outline: 'none',
                                    color: '#8E8D8A',
                                    fontSize: '0.875rem',
                                  }}
                                  value={hotspot.iconType}
                                  onChange={(e) => {
                                    const newHotspots = [
                                      ...moduleConfig.hotspotGraphic.hotspots,
                                    ]
                                    newHotspots[index] = {
                                      ...hotspot,
                                      iconType: e.target.value,
                                      svgCode:
                                        e.target.value === 'custom' &&
                                        !hotspot.svgCode
                                          ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>'
                                          : hotspot.svgCode,
                                    }
                                    setModuleConfig((prev) => ({
                                      ...prev,
                                      hotspotGraphic: {
                                        ...prev.hotspotGraphic,
                                        hotspots: newHotspots,
                                      },
                                    }))
                                  }}
                                >
                                  <option value="number">Nummer</option>
                                  <option value="star">Stern</option>
                                  <option value="info">Info</option>
                                  <option value="custom">
                                    Benutzerdefiniertes SVG
                                  </option>
                                </select>
                              </div>

                              {/* Custom SVG Code Input */}
                              {hotspot.iconType === 'custom' && (
                                <div style={{ marginBottom: '0.5rem' }}>
                                  <label
                                    htmlFor={`svgCode-${index}`}
                                    style={{
                                      display: 'block',
                                      fontSize: '0.875rem',
                                      fontWeight: '500',
                                      color: '#8E8D8A',
                                      marginBottom: '0.25rem',
                                    }}
                                  >
                                    SVG Code (z.B. &lt;svg ...&gt;&lt;/svg&gt;)
                                  </label>
                                  <textarea
                                    id={`svgCode-${index}`}
                                    style={{
                                      width: '100%',
                                      padding: '0.5rem',
                                      borderRadius: '0.5rem',
                                      border: '1px solid #d1d5db', // gray-300
                                      outline: 'none',
                                      color: '#8E8D8A',
                                      fontSize: '0.875rem',
                                      resize: 'vertical',
                                      height: '6rem', // h-24
                                    }}
                                    value={hotspot.svgCode}
                                    onChange={(e) => {
                                      const newHotspots = [
                                        ...moduleConfig.hotspotGraphic.hotspots,
                                      ]
                                      newHotspots[index] = {
                                        ...hotspot,
                                        svgCode: e.target.value,
                                      }
                                      setModuleConfig((prev) => ({
                                        ...prev,
                                        hotspotGraphic: {
                                          ...prev.hotspotGraphic,
                                          hotspots: newHotspots,
                                        },
                                      }))
                                    }}
                                    placeholder="<svg ...>...</svg>"
                                  />
                                </div>
                              )}

                              <div
                                style={{
                                  display: 'flex',
                                  gap: '0.5rem',
                                  marginBottom: '0.5rem',
                                }}
                              >
                                {' '}
                                {/* space-x-2 */}
                                <div>
                                  <label
                                    htmlFor={`hotspotX-${index}`}
                                    style={{
                                      display: 'block',
                                      fontSize: '0.875rem',
                                      fontWeight: '500',
                                      color: '#8E8D8A',
                                      marginBottom: '0.25rem',
                                    }}
                                  >
                                    X (%)
                                  </label>
                                  <input
                                    type="number"
                                    id={`hotspotX-${index}`}
                                    style={{
                                      width: '5rem', // w-20
                                      padding: '0.5rem',
                                      borderRadius: '0.5rem',
                                      border: '1px solid #d1d5db', // gray-300
                                      outline: 'none',
                                      color: '#8E8D8A',
                                      fontSize: '0.875rem',
                                    }}
                                    value={hotspot.x}
                                    onChange={(e) => {
                                      const newHotspots = [
                                        ...moduleConfig.hotspotGraphic.hotspots,
                                      ]
                                      newHotspots[index] = {
                                        ...hotspot,
                                        x: parseFloat(e.target.value),
                                      }
                                      setModuleConfig((prev) => ({
                                        ...prev,
                                        hotspotGraphic: {
                                          ...prev.hotspotGraphic,
                                          hotspots: newHotspots,
                                        },
                                      }))
                                    }}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={`hotspotY-${index}`}
                                    style={{
                                      display: 'block',
                                      fontSize: '0.875rem',
                                      fontWeight: '500',
                                      color: '#8E8D8A',
                                      marginBottom: '0.25rem',
                                    }}
                                  >
                                    Y (%)
                                  </label>
                                  <input
                                    type="number"
                                    id={`hotspotY-${index}`}
                                    style={{
                                      width: '5rem', // w-20
                                      padding: '0.5rem',
                                      borderRadius: '0.5rem',
                                      border: '1px solid #d1d5db', // gray-300
                                      outline: 'none',
                                      color: '#8E8D8A',
                                      fontSize: '0.875rem',
                                    }}
                                    value={hotspot.y}
                                    onChange={(e) => {
                                      const newHotspots = [
                                        ...moduleConfig.hotspotGraphic.hotspots,
                                      ]
                                      newHotspots[index] = {
                                        ...hotspot,
                                        y: parseFloat(e.target.value),
                                      }
                                      setModuleConfig((prev) => ({
                                        ...prev,
                                        hotspotGraphic: {
                                          ...prev.hotspotGraphic,
                                          hotspots: newHotspots,
                                        },
                                      }))
                                    }}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                              </div>
                              <button
                                style={{
                                  backgroundColor: '#ef4444', // red-500
                                  color: 'white',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '9999px',
                                  fontSize: '0.75rem',
                                  transition: 'background-color 0.3s',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  const newHotspots =
                                    moduleConfig.hotspotGraphic.hotspots.filter(
                                      (_, i) => i !== index,
                                    )
                                  setModuleConfig((prev) => ({
                                    ...prev,
                                    hotspotGraphic: {
                                      ...prev.hotspotGraphic,
                                      hotspots: newHotspots,
                                    },
                                  }))
                                }}
                              >
                                Hotspot entfernen
                              </button>
                            </div>
                          ),
                        )}
                        <button
                          style={{
                            width: '100%',
                            backgroundColor: '#D8C3A5',
                            color: '#8E8D8A',
                            padding: '0.5rem 0',
                            borderRadius: '0.5rem',
                            fontWeight: 'semibold',
                            transition: 'background-color 0.3s',
                            fontSize: '0.875rem',
                            marginTop: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            setModuleConfig((prev) => ({
                              ...prev,
                              hotspotGraphic: {
                                ...prev.hotspotGraphic,
                                hotspots: [
                                  ...prev.hotspotGraphic.hotspots,
                                  {
                                    id: prev.hotspotGraphic.hotspots.length + 1,
                                    x: 50,
                                    y: 50,
                                    title: 'Neuer Hotspot',
                                    description: 'Beschreibung',
                                    iconType: 'number',
                                    svgCode: '',
                                  },
                                ],
                              },
                            }))
                          }
                        >
                          Hotspot hinzufügen
                        </button>
                      </div>
                    </div>
                  )}

                  {/* NEU: 360 Viewer spezifische Inhalte */}
                  {selectedModule === '360-viewer' && (
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Bilder für 360° Viewer
                      </label>
                      <div style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                        {' '}
                        {/* space-y-2 mb-4 */}
                        {moduleConfig.viewer360.images.map((imgUrl, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            {' '}
                            {/* space-x-2 */}
                            <input
                              type="text"
                              style={{
                                flex: '1',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #d1d5db', // gray-300
                                outline: 'none',
                                color: '#8E8D8A',
                                fontSize: '0.875rem',
                              }}
                              value={imgUrl}
                              onChange={(e) => {
                                const newImages = [
                                  ...moduleConfig.viewer360.images,
                                ]
                                newImages[index] = e.target.value
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  viewer360: {
                                    ...prev.viewer360,
                                    images: newImages,
                                  },
                                }))
                              }}
                              placeholder={`Bild URL ${index + 1}`}
                            />
                            <button
                              style={{
                                backgroundColor: '#ef4444', // red-500
                                color: 'white',
                                padding: '0.5rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                transition: 'background-color 0.3s',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const newImages =
                                  moduleConfig.viewer360.images.filter(
                                    (_, i) => i !== index,
                                  )
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  viewer360: {
                                    ...prev.viewer360,
                                    images: newImages,
                                  },
                                }))
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ height: '1rem', width: '1rem' }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          style={{
                            width: '100%',
                            backgroundColor: '#D8C3A5',
                            color: '#8E8D8A',
                            padding: '0.5rem 0',
                            borderRadius: '0.5rem',
                            fontWeight: 'semibold',
                            transition: 'background-color 0.3s',
                            fontSize: '0.875rem',
                            marginTop: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            setModuleConfig((prev) => ({
                              ...prev,
                              viewer360: {
                                ...prev.viewer360,
                                images: [...prev.viewer360.images, ''],
                              },
                            }))
                          }
                        >
                          Bild hinzufügen
                        </button>
                      </div>
                      {/* Slider Konfigurationsoption */}
                      <label
                        htmlFor="initialImageIndex"
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Startbild-Index (0 -{' '}
                        {moduleConfig.viewer360.images.length > 0
                          ? moduleConfig.viewer360.images.length - 1
                          : 0}
                        )
                      </label>
                      <input
                        type="number"
                        id="initialImageIndex"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #d1d5db', // gray-300
                          outline: 'none',
                          marginBottom: '1rem',
                          color: '#8E8D8A',
                          fontSize: '1rem',
                        }}
                        value={moduleConfig.viewer360.initialImageIndex}
                        onChange={(e) => {
                          let value = parseInt(e.target.value, 10)
                          if (isNaN(value)) value = 0
                          value = Math.max(
                            0,
                            Math.min(
                              value,
                              moduleConfig.viewer360.images.length > 0
                                ? moduleConfig.viewer360.images.length - 1
                                : 0,
                            ),
                          )
                          setModuleConfig((prev) => ({
                            ...prev,
                            viewer360: {
                              ...prev.viewer360,
                              initialImageIndex: value,
                            },
                          }))
                        }}
                        min="0"
                        max={
                          moduleConfig.viewer360.images.length > 0
                            ? moduleConfig.viewer360.images.length - 1
                            : 0
                        }
                      />
                    </div>
                  )}
                </div>
                {/* Styling / CI-Anpassung */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'semibold',
                      color: '#8E8D8A',
                      marginBottom: '1rem',
                    }}
                  >
                    Design & CI
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {' '}
                    {/* grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 */}
                    <ColorPicker
                      label="Akzentfarbe"
                      value={moduleConfig.accentColor}
                      onChange={(e) =>
                        setModuleConfig((prev) => ({
                          ...prev,
                          accentColor: e.target.value,
                        }))
                      }
                    />
                    <ColorPicker
                      label="Hintergrundfarbe"
                      value={moduleConfig.backgroundColor}
                      onChange={(e) =>
                        setModuleConfig((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                        }))
                      }
                    />
                    <ColorPicker
                      label="Textfarbe"
                      value={moduleConfig.textColor}
                      onChange={(e) =>
                        setModuleConfig((prev) => ({
                          ...prev,
                          textColor: e.target.value,
                        }))
                      }
                    />
                    <ColorPicker
                      label="Überschrift Farbe"
                      value={moduleConfig.titleColor}
                      onChange={(e) =>
                        setModuleConfig((prev) => ({
                          ...prev,
                          titleColor: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Company Logo URL Input */}
                  <div>
                    <label
                      htmlFor="companyLogoUrl"
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#8E8D8A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Logo URL (Kunde)
                    </label>
                    <input
                      type="text"
                      id="companyLogoUrl"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db', // gray-300
                        outline: 'none',
                        marginBottom: '0.5rem',
                        color: '#8E8D8A',
                        fontSize: '1rem',
                      }}
                      value={moduleConfig.companyLogoUrl}
                      onChange={(e) =>
                        setModuleConfig((prev) => ({
                          ...prev,
                          companyLogoUrl: e.target.value,
                        }))
                      }
                      placeholder="https://ihre-domain.de/logo.png"
                    />
                    {moduleConfig.companyLogoUrl && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {' '}
                        {/* space-x-2 */}
                        <span
                          style={{ fontSize: '0.875rem', color: '#8E8D8A' }}
                        >
                          Vorschau:
                        </span>
                        <img
                          src={moduleConfig.companyLogoUrl}
                          alt="Company Logo Preview"
                          style={{
                            height: '2rem',
                            width: 'auto',
                            objectFit: 'contain',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem',
                          }}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                              'https://placehold.co/80x30/EBE9E1/8E8D8A?text=Logo'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Layout-Optionen */}
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'semibold',
                      color: '#8E8D8A',
                      marginBottom: '1rem',
                    }}
                  >
                    Layout
                  </h3>

                  {/* Modulbreite (Width) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#8E8D8A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Modulbreite
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      {' '}
                      {/* flex-wrap gap-2 */}
                      {['full', 'wide', 'standard', 'narrow'].map((option) => (
                        <label
                          key={option}
                          style={{
                            flex: '1',
                            minWidth: '80px',
                            textAlign: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition:
                              'background-color 0.3s, box-shadow 0.3s',
                            backgroundColor:
                              moduleConfig.moduleWidth === option
                                ? '#E43D12'
                                : '#EBE9E1',
                            color:
                              moduleConfig.moduleWidth === option
                                ? 'white'
                                : '#8E8D8A',
                            boxShadow:
                              moduleConfig.moduleWidth === option
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="moduleWidth"
                            value={option}
                            checked={moduleConfig.moduleWidth === option}
                            onChange={(e) =>
                              setModuleConfig((prev) => ({
                                ...prev,
                                moduleWidth: e.target.value,
                              }))
                            }
                            style={{ display: 'none' }} // Hide the default radio button
                          />
                          <span
                            style={{
                              fontWeight: 'semibold',
                              fontSize: '0.875rem',
                            }}
                          >
                            {option === 'full'
                              ? 'Voll'
                              : option === 'wide'
                                ? 'Breit'
                                : option === 'standard'
                                  ? 'Standard'
                                  : 'Schmal'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Vertikale und Horizontale Ausrichtung (grouped) */}
                  <div
                    style={{
                      marginBottom: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {' '}
                    {/* grid grid-cols-1 md:grid-cols-2 gap-4 */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Vertikale Ausrichtung des Inhalts
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        {['top', 'middle', 'bottom'].map((option) => (
                          <label
                            key={option}
                            style={{
                              flex: '1',
                              minWidth: '80px',
                              textAlign: 'center',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              transition:
                                'background-color 0.3s, box-shadow 0.3s',
                              backgroundColor:
                                moduleConfig.verticalAlignment === option
                                  ? '#E43D12'
                                  : '#EBE9E1',
                              color:
                                moduleConfig.verticalAlignment === option
                                  ? 'white'
                                  : '#8E8D8A',
                              boxShadow:
                                moduleConfig.verticalAlignment === option
                                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                  : 'none',
                            }}
                          >
                            <input
                              type="radio"
                              name="verticalAlignment"
                              value={option}
                              checked={
                                moduleConfig.verticalAlignment === option
                              }
                              onChange={(e) =>
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  verticalAlignment: e.target.value,
                                }))
                              }
                              style={{ display: 'none' }}
                            />
                            <span
                              style={{
                                fontWeight: 'semibold',
                                fontSize: '0.875rem',
                              }}
                            >
                              {option === 'top'
                                ? 'Oben'
                                : option === 'middle'
                                  ? 'Mitte'
                                  : 'Unten'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#8E8D8A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Horizontale Ausrichtung des Inhalts
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        {['left', 'center', 'right'].map((option) => (
                          <label
                            key={option}
                            style={{
                              flex: '1',
                              minWidth: '80px',
                              textAlign: 'center',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              transition:
                                'background-color 0.3s, box-shadow 0.3s',
                              backgroundColor:
                                moduleConfig.contentAlignment === option
                                  ? '#E43D12'
                                  : '#EBE9E1',
                              color:
                                moduleConfig.contentAlignment === option
                                  ? 'white'
                                  : '#8E8D8A',
                              boxShadow:
                                moduleConfig.contentAlignment === option
                                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                  : 'none',
                            }}
                          >
                            <input
                              type="radio"
                              name="contentAlignment"
                              value={option}
                              checked={moduleConfig.contentAlignment === option}
                              onChange={(e) =>
                                setModuleConfig((prev) => ({
                                  ...prev,
                                  contentAlignment: e.target.value,
                                }))
                              }
                              style={{ display: 'none' }}
                            />
                            <span
                              style={{
                                fontWeight: 'semibold',
                                fontSize: '0.875rem',
                              }}
                            >
                              {option === 'left'
                                ? 'Links'
                                : option === 'center'
                                  ? 'Zentriert'
                                  : 'Rechts'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Schatten-Effekt (Shadow Effect) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#8E8D8A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Schatten-Effekt
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      {' '}
                      {/* flex-wrap gap-2 */}
                      {['none', 'light', 'standard', 'strong'].map((option) => (
                        <label
                          key={option}
                          style={{
                            flex: '1',
                            minWidth: '80px',
                            textAlign: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition:
                              'background-color 0.3s, box-shadow 0.3s',
                            backgroundColor:
                              moduleConfig.shadowEffect === option
                                ? '#E43D12'
                                : '#EBE9E1',
                            color:
                              moduleConfig.shadowEffect === option
                                ? 'white'
                                : '#8E8D8A',
                            boxShadow:
                              moduleConfig.shadowEffect === option
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="shadowEffect"
                            value={option}
                            checked={moduleConfig.shadowEffect === option}
                            onChange={(e) =>
                              setModuleConfig((prev) => ({
                                ...prev,
                                shadowEffect: e.target.value,
                              }))
                            }
                            style={{ display: 'none' }} // Hide the default radio button
                          />
                          <span
                            style={{
                              fontWeight: 'semibold',
                              fontSize: '0.875rem',
                            }}
                          >
                            {option === 'none'
                              ? 'Kein Schatten'
                              : option === 'light'
                                ? 'Leicht'
                                : option === 'standard'
                                  ? 'Standard'
                                  : 'Stark'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rahmenstil (Border Style) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#8E8D8A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Rahmenstil
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {' '}
                      {/* flex-wrap gap-2 mb-4 */}
                      {['none', 'thin', 'standard'].map((option) => (
                        <label
                          key={option}
                          style={{
                            flex: '1',
                            minWidth: '80px',
                            textAlign: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition:
                              'background-color 0.3s, box-shadow 0.3s',
                            backgroundColor:
                              moduleConfig.borderStyle === option
                                ? '#E43D12'
                                : '#EBE9E1',
                            color:
                              moduleConfig.borderStyle === option
                                ? 'white'
                                : '#8E8D8A',
                            boxShadow:
                              moduleConfig.borderStyle === option
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="borderStyle"
                            value={option}
                            checked={moduleConfig.borderStyle === option}
                            onChange={(e) =>
                              setModuleConfig((prev) => ({
                                ...prev,
                                borderStyle: e.target.value,
                              }))
                            }
                            style={{ display: 'none' }} // Hide the default radio button
                          />
                          <span
                            style={{
                              fontWeight: 'semibold',
                              fontSize: '0.875rem',
                            }}
                          >
                            {option === 'none'
                              ? 'Kein Rahmen'
                              : option === 'thin'
                                ? 'Dünn'
                                : 'Standard'}
                          </span>
                        </label>
                      ))}
                    </div>
                    {moduleConfig.borderStyle !== 'none' && (
                      <ColorPicker
                        label="Rahmenfarbe"
                        value={moduleConfig.borderColor}
                        onChange={(e) =>
                          setModuleConfig((prev) => ({
                            ...prev,
                            borderColor: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>

                  {/* Innenabstand */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#8E8D8A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Innenabstand
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      {' '}
                      {/* flex-wrap gap-2 */}
                      {['compact', 'standard', 'spacious'].map((option) => (
                        <label
                          key={option}
                          style={{
                            flex: '1',
                            minWidth: '80px',
                            textAlign: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition:
                              'background-color 0.3s, box-shadow 0.3s',
                            backgroundColor:
                              moduleConfig.paddingSize === option
                                ? '#E43D12'
                                : '#EBE9E1',
                            color:
                              moduleConfig.paddingSize === option
                                ? 'white'
                                : '#8E8D8A',
                            boxShadow:
                              moduleConfig.paddingSize === option
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="paddingSize"
                            value={option}
                            checked={moduleConfig.paddingSize === option}
                            onChange={(e) =>
                              setModuleConfig((prev) => ({
                                ...prev,
                                paddingSize: e.target.value,
                              }))
                            }
                            style={{ display: 'none' }} // Hide the default radio button
                          />
                          <span
                            style={{
                              fontWeight: 'semibold',
                              fontSize: '0.875rem',
                            }}
                          >
                            {option === 'compact'
                              ? 'Kompakt'
                              : option === 'standard'
                                ? 'Standard'
                                : 'Großzügig'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Saved Modules / Presets - remains below the main flex container */}
      <section
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginTop: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8E8D8A',
            marginBottom: '1.5rem',
          }}
        >
          Gespeicherte Module / Presets
        </h2>

        {/* Eingabe und Speichern für Presets */}
        <div
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#F5F5F5',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          }}
        >
          <h4
            style={{
              fontSize: '1.125rem',
              fontWeight: 'semibold',
              color: '#8E8D8A',
              marginBottom: '0.75rem',
            }}
          >
            Neues Preset speichern
          </h4>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db', // gray-300
              outline: 'none',
              marginBottom: '1rem',
              color: '#8E8D8A',
              fontSize: '1rem',
            }}
            placeholder="Name des Presets"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
          />
          <button
            style={{
              width: '100%',
              backgroundColor: '#E43D12',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={saveCurrentModuleAsPreset}
          >
            Preset speichern
          </button>
        </div>

        {/* Liste der gespeicherten Presets */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            gap: '1rem',
          }}
        >
          {' '}
          {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 */}
          {Object.keys(savedPresets).length === 0 ? (
            <p
              style={{
                gridColumn: 'span 1 / span 1',
                textAlign: 'center',
                color: '#8E8D8A',
                opacity: 0.7,
              }}
            >
              Noch keine Presets gespeichert.
            </p> /* col-span-full */
          ) : (
            Object.keys(savedPresets).map((presetName) => (
              <div
                key={presetName}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#EBE9E1',
                  color: '#8E8D8A',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: 'semibold',
                      fontSize: '1.125rem',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={presetName}
                  >
                    {presetName}
                  </span>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {savedPresets[presetName].type === 'feature-slider' &&
                      'Feature Slider'}
                    {savedPresets[presetName].type === '360-viewer' &&
                      '360° Viewer'}
                    {savedPresets[presetName].type === 'hotspot-graphic' &&
                      'Hotspot Grafik'}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                >
                  {' '}
                  {/* gap-2 mt-2 */}
                  <button
                    style={{
                      flex: '1',
                      backgroundColor: '#D8C3A5',
                      color: '#8E8D8A',
                      padding: '0.5rem 0',
                      borderRadius: '0.5rem',
                      fontWeight: 'semibold',
                      transition: 'background-color 0.3s',
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => loadPreset(presetName)}
                  >
                    Laden
                  </button>
                  <button
                    style={{
                      backgroundColor: '#ef4444', // red-500
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      transition: 'background-color 0.3s',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => openDeleteConfirmModal(presetName)} // Ruft jetzt den Modal auf
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: '1.25rem', width: '1.25rem' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              padding: '1.5rem',
              maxWidth: '24rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#E43D12',
                marginBottom: '1rem',
              }}
            >
              Preset löschen
            </h3>
            <p style={{ color: '#8E8D8A', marginBottom: '1.5rem' }}>
              Möchten Sie das Preset "
              <span style={{ fontWeight: 'semibold' }}>{presetToDelete}</span>"
              wirklich löschen? Diese Aktion kann nicht rückgängig gemacht
              werden.
            </p>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
            >
              <button
                style={{
                  backgroundColor: '#d1d5db', // gray-300
                  color: '#374151', // gray-800
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'semibold',
                  transition: 'background-color 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={closeDeleteConfirmModal}
              >
                Abbrechen
              </button>
              <button
                style={{
                  backgroundColor: '#ef4444', // red-500
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={confirmDeletePreset}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              padding: '1.5rem',
              maxWidth: '48rem', // Increased max-width
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#E43D12',
                marginBottom: '1rem',
              }}
            >
              Modul exportieren
            </h3>
            <p style={{ color: '#8E8D8A', marginBottom: '1rem' }}>
              Hier ist der HTML-Code für Ihr konfiguriertes Modul. Sie können ihn kopieren oder als Datei herunterladen.
            </p>
            <textarea
              readOnly
              value={exportHtmlCode}
              style={{
                width: '100%',
                height: '200px',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '1.5rem',
                resize: 'vertical',
              }}
            />
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
            >
              <button
                style={{
                  backgroundColor: '#E43D12',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'semibold',
                  transition: 'background-color 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={copyToClipboard}
              >
                In Zwischenablage kopieren
              </button>
              <button
                style={{
                  backgroundColor: '#D8C3A5',
                  color: '#8E8D8A',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'semibold',
                  transition: 'background-color 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={downloadHtmlFile}
              >
                Als Datei herunterladen
              </button>
              <button
                style={{
                  backgroundColor: '#D1D5DB', // gray-300
                  color: '#374151', // gray-800
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'semibold',
                  transition: 'background-color 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setShowExportModal(false)}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <footer
        style={{
          padding: '2rem 1.5rem',
          backgroundColor: '#8E8D8A',
          color: '#D8C3A5',
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {' '}
          {/* container mx-auto */}
          <p style={{ marginBottom: '1rem' }}>
            &copy; {new Date().getFullYear()} Varia. Alle Rechte vorbehalten.
          </p>
          <p style={{ marginBottom: '1rem', color: '#D8C3A5' }}>
            Varia: Das intuitive Webtool zur Erstellung und zum Export
            interaktiver, CI-konformer Web Components für Ihre Website.
          </p>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}
          >
            {' '}
            {/* space-x-6 */}
            <a
              href="https://github.com/ricardotimmr/praxisprojekt-2025/wiki"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.3s' }}
            >
              Dokumentation
            </a>
            <a
              href="https://github.com/users/ricardotimmr/projects/5"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.3s' }}
            >
              Kanban Board
            </a>
            <a
              href="https://miro.com/app/board/uXjVLCCKknk="
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.3s' }}
            >
              Miro Board
            </a>
            {/* Weitere Links wie Impressum, Datenschutz könnten hier hinzugefügt werden */}
            <a href="#" style={{ transition: 'color 0.3s' }}>
              Impressum
            </a>
            <a href="#" style={{ transition: 'color 0.3s' }}>
              Datenschutz
            </a>
          </div>
          <p style={{ marginTop: '1rem', color: '#D8C3A5' }}>
            Ein Praxisprojekt der TH Köln.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
