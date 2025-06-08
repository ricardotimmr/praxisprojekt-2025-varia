import React, { useRef, useEffect } from 'react'
import {
  getShadowStyle,
  getBorderStyle,
  getPaddingStyle,
  getVerticalAlignmentStyle,
  getContentAlignmentStyle,
} from '../utils/styleHelpers'

const HotspotGraphicPreview = ({ config, setModuleConfig }) => {
  const imageContainerRef = useRef(null)

  const shadowStyle = { boxShadow: getShadowStyle(config.shadowEffect) }
  const borderStyle = {
    border: getBorderStyle(config.borderStyle, config.borderColor),
  }
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment)
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment)
  const padding = getPaddingStyle(config.paddingSize)

  // SVG Icons for Hotspots
  const svgIcons = {
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '1rem', width: '1rem' }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '1rem', width: '1rem' }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9.293 9.293a1 1 0 000 1.414L10.586 12l-1.293 1.293a1 1 0 101.414 1.414L12 13.414l1.293 1.293a1 1 0 001.414-1.414L13.414 12l1.293-1.293a1 1 0 00-1.414-1.414L12 10.586l-1.293-1.293a1 1 0 00-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        ...contentAlignment,
        justifyContent: verticalAlignment,
        ...shadowStyle,
        ...borderStyle,
      }}
    >
      {config.companyLogoUrl && (
        <img
          src={config.companyLogoUrl}
          alt="Company Logo"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            height: '2.5rem',
            width: 'auto',
            objectFit: 'contain',
            borderRadius: '0.375rem',
            zIndex: 10,
          }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/100x40/EBE9E1/8E8D8A?text=Logo'
          }}
        />
      )}
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: config.titleColor,
        }}
      >
        {config.title}
      </h3>
      <p style={{ marginBottom: '1.5rem' }}>{config.description}</p>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={imageContainerRef}
      >
        <img
          src={config.hotspotGraphic.backgroundImage}
          alt="Hotspot Hintergrund"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '0.375rem',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://placehold.co/600x400/D8C3A5/8E8D8A?text=Hintergrund'
          }}
        />
        {config.hotspotGraphic.hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="hotspot-item" // Add a class for CSS styling
            tabIndex={0}
            style={{
              position: 'absolute',
              width: '2rem',
              height: '2rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              cursor: 'pointer',
              outline: 'none',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              backgroundColor: config.accentColor,
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)', // Center the hotspot
            }}
          >
            {hotspot.iconType === 'number' && hotspot.id}
            {hotspot.iconType === 'star' && svgIcons.star}
            {hotspot.iconType === 'info' && svgIcons.info}
            {hotspot.iconType === 'custom' && hotspot.svgCode && (
              <div
                dangerouslySetInnerHTML={{ __html: hotspot.svgCode }}
                style={{ width: '1rem', height: '1rem' }}
              />
            )}
            {/* Hotspot Info Box - hidden by default, shown on hover */}
            <div
              className="hotspot-info-box"
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '0.5rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: '#374151',
                color: 'white',
                fontSize: '0.875rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(44,44,44,0.22)',
                whiteSpace: 'nowrap',
                zIndex: 20,
              }}
            >
              <span style={{ fontWeight: 'semibold' }}>{hotspot.title}:</span>{' '}
              {hotspot.description}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '100%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #374151',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotspotGraphicPreview
