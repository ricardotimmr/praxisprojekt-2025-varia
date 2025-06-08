import React, { useState, useEffect } from 'react'
import {
  getShadowStyle,
  getBorderStyle,
  getPaddingStyle,
  getVerticalAlignmentStyle,
  getContentAlignmentStyle,
} from '../utils/styleHelpers'

const FeatureSliderPreview = ({ config, setModuleConfig }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!config.images || config.images.length === 0) {
      setCurrentSlideIndex(0)
    } else if (currentSlideIndex >= config.images.length) {
      setCurrentSlideIndex(config.images.length - 1)
    }
  }, [config.images, currentSlideIndex])

  useEffect(() => {
    let intervalId
    if (config.autoplayEnabled && config.images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentSlideIndex(
          (prevIndex) => (prevIndex + 1) % config.images.length,
        )
      }, config.autoplayInterval)
    }
    return () => clearInterval(intervalId)
  }, [config.autoplayEnabled, config.autoplayInterval, config.images.length])

  const goToNextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % config.images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToPrevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlideIndex(
      (prevIndex) =>
        (prevIndex - 1 + config.images.length) % config.images.length,
    )
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlideIndex) return
    setIsTransitioning(true)
    setCurrentSlideIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const shadowStyle = { boxShadow: getShadowStyle(config.shadowEffect) }
  const borderStyle = {
    border: getBorderStyle(config.borderStyle, config.borderColor),
  }
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment)
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment)
  const padding = getPaddingStyle(config.paddingSize)

  if (!config.images || config.images.length === 0) {
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
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: config.backgroundColor,
          color: config.textColor,
          ...shadowStyle,
          ...borderStyle,
        }}
      >
        <p style={{ color: '#8E8D8A', opacity: 0.7 }}>
          Keine Bilder für den Slider konfiguriert.
        </p>
      </div>
    )
  }

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
        padding: padding,
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
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <img
          key={currentSlideIndex}
          src={config.images[currentSlideIndex]}
          alt={`Produktbild ${currentSlideIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '0.375rem',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            transition: 'opacity 0.5s ease-in-out',
            opacity: 1,
            animation: 'fadeIn 0.5s ease-in-out forwards',
          }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/400x300/D8C3A5/8E8D8A?text=Bild+${currentSlideIndex + 1}`
          }}
        />


        {/* Navigation Arrows */}
        {config.images.length > 1 && (
          <>
            {/* Prev Arrow */}
            <button
              style={{
                position: 'absolute',
                left: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2.5rem',
                height: '2.5rem',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                zIndex: 20,
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
              onClick={goToPrevSlide}
              disabled={isTransitioning}
              aria-label="Vorheriges Bild"
            >
              <svg
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'block',
                  transform: 'translateX(-0.1rem)',
                }}
                viewBox="0 0 20 20" // Quadratisches ViewBox!
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 15l-5-5 5-5"
                />
              </svg>
            </button>
            {/* Next Arrow */}
            <button
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2.5rem',
                height: '2.5rem',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                zIndex: 20,
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
              onClick={goToNextSlide}
              disabled={isTransitioning}
              aria-label="Nächstes Bild"
            >
              <svg
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'block',
                  transform: 'translateX(0.1rem)',
                }}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 5l5 5-5 5"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      {config.images.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {config.images.map((_, index) => (
            <button
              key={index}
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                backgroundColor:
                  index === currentSlideIndex ? config.accentColor : '#9ca3af',
                transform:
                  index === currentSlideIndex ? 'scale(1.25)' : 'scale(1)',
                border: 'none',
                cursor: 'pointer',
                margin: '0 0.25rem',
              }}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Gehe zu Slide ${index + 1}`}
            ></button>
          ))}
          {/* Autoplay Controls */}
          {typeof setModuleConfig === 'function' && (
            <button
              style={{
                marginLeft: '1rem',
                backgroundColor: 'transparent',
                color: '#6b7280',
                padding: '0.25rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() =>
                setModuleConfig((prev) => ({
                  ...prev,
                  autoplayEnabled: !prev.autoplayEnabled,
                }))
              }
              aria-label={
                config.autoplayEnabled
                  ? 'Autoplay pausieren'
                  : 'Autoplay starten'
              }
            >
              {config.autoplayEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: '1rem', width: '1rem' }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: '1rem', width: '1rem' }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      )}

      <button
        style={{
          marginTop: 'auto',
          padding: '0.5rem 1.5rem',
          borderRadius: '9999px',
          color: 'white',
          fontWeight: 'semibold',
          boxShadow:
            '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          alignSelf: 'center',
          backgroundColor: config.accentColor,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Mehr erfahren
      </button>
    </div>
  )
}

export default FeatureSliderPreview
