import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  getShadowStyle,
  getBorderStyle,
  getPaddingStyle,
  getVerticalAlignmentStyle,
  getContentAlignmentStyle,
} from '../utils/styleHelpers'

const Viewer360Preview = ({ config }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    config.viewer360.initialImageIndex,
  )
  const viewerRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentImageIndexRef = useRef(currentImageIndex) // Ref to hold currentImageIndex
  const [isFullscreen, setIsFullscreen] = useState(false) // State for fullscreen mode
  const [isLoadingImages, setIsLoadingImages] = useState(true) // State for image loading

  const wheelAccumulator = useRef(0);

  const images = config.viewer360.images

  const shadowStyle = { boxShadow: getShadowStyle(config.shadowEffect) }
  const borderStyle = {
    border: getBorderStyle(config.borderStyle, config.borderColor),
  }
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment)
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment)
  const padding = getPaddingStyle(config.paddingSize)

  // Preload images and manage loading state
  useEffect(() => {
    if (!images || images.length === 0) {
      setIsLoadingImages(false) // No images to load
      return
    }

    setIsLoadingImages(true)
    const imagePromises = images.map((imageSrc) => {
      return new Promise((resolve) => {
        // Resolve even on error to not block other images
        const img = new Image()
        img.src = imageSrc
        img.onload = resolve
        img.onerror = () => {
          console.warn(`Failed to load image: ${imageSrc}`)
          resolve()
        }
      })
    })

    Promise.all(imagePromises).then(() => {
      setIsLoadingImages(false)
    })
  }, [images])

  // Update ref when currentImageIndex changes
  useEffect(() => {
    currentImageIndexRef.current = currentImageIndex
  }, [currentImageIndex])

  // Reset currentImageIndex when initialImageIndex changes in config
  useEffect(() => {
    setCurrentImageIndex(config.viewer360.initialImageIndex)
  }, [config.viewer360.initialImageIndex])

  // Fullscreen logic
  const toggleFullscreen = () => {
    if (!viewerRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      viewerRef.current.requestFullscreen().catch((err) => {
        // This error is expected in environments like Canvas (iframes) without 'allowfullscreen'
        console.error(
          `Error attempting to enable fullscreen: ${err.message} (${err.name}). This might be due to browser security policies in an embedded environment (iframe).`,
        )
      })
    }
  }

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true
    startX.current = e.clientX || e.touches[0].clientX
    if (viewerRef.current) {
      viewerRef.current.style.cursor = 'grabbing'
    }
  }, [])

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return

      const currentX = e.clientX || e.touches[0].clientX
      const deltaX = currentX - startX.current
      const viewerWidth = viewerRef.current ? viewerRef.current.offsetWidth : 1
      const totalImages = images.length

      if (totalImages === 0) return

      // Calculate image change based on drag distance relative to viewer width
      // A full drag across the viewer width should cycle through all images once
      const imageChange = Math.round((deltaX / viewerWidth) * totalImages)

      let newIndex = currentImageIndexRef.current + imageChange

      // Wrap around for seamless 360 effect
      newIndex = ((newIndex % totalImages) + totalImages) % totalImages

      if (newIndex !== currentImageIndexRef.current) {
        setCurrentImageIndex(newIndex)
        startX.current = currentX // Reset startX to prevent accumulated delta and jumping
      }
    },
    [images.length],
  ) // Only depend on images.length, not currentImageIndex

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    if (viewerRef.current) {
      viewerRef.current.style.cursor = 'grab'
    }
  }, [])

  // Handle slider change
  const handleSliderChange = useCallback((e) => {
    setCurrentImageIndex(parseInt(e.target.value, 10))
  }, [])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    viewer.addEventListener('mousedown', handleMouseDown)
    viewer.addEventListener('mousemove', handleMouseMove)
    viewer.addEventListener('mouseup', handleMouseUp)
    viewer.addEventListener('mouseleave', handleMouseUp) // End drag if mouse leaves

    // Touch events for mobile
    viewer.addEventListener('touchstart', handleMouseDown)
    viewer.addEventListener('touchmove', handleMouseMove)
    viewer.addEventListener('touchend', handleMouseUp)
    viewer.addEventListener('touchcancel', handleMouseUp)

    return () => {
      viewer.removeEventListener('mousedown', handleMouseDown)
      viewer.removeEventListener('mousemove', handleMouseMove)
      viewer.removeEventListener('mouseup', handleMouseUp)
      viewer.removeEventListener('mouseleave', handleMouseUp)

      viewer.removeEventListener('touchstart', handleMouseDown)
      viewer.removeEventListener('touchmove', handleMouseMove)
      viewer.removeEventListener('touchend', handleMouseUp)
      viewer.removeEventListener('touchcancel', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp]) // Depend on memoized callbacks

  useEffect(() => {
  const viewer = viewerRef.current;
  if (!viewer) return;

  const THRESHOLD = 10; // Je höher, desto träger (20-50 ist meist gut, ggf. anpassen)

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      wheelAccumulator.current += e.deltaX;

      // Vorwärts
      if (wheelAccumulator.current > THRESHOLD) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        wheelAccumulator.current = 0;
      }
      // Rückwärts
      if (wheelAccumulator.current < -THRESHOLD) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        wheelAccumulator.current = 0;
      }
    }
  };

  viewer.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    viewer.removeEventListener('wheel', handleWheel);
  };
}, [images.length]);

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
        cursor: 'grab',
        ...contentAlignment,
        justifyContent: verticalAlignment,
        ...shadowStyle,
        ...borderStyle,
        ...(isFullscreen
          ? { position: 'fixed', inset: 0, zIndex: 50, borderRadius: 0 }
          : {}), // Fullscreen styles
      }}
      ref={viewerRef}
    >
      {/* Loading Indicator */}
      {isLoadingImages && images.length > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 30,
            borderRadius: '0.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                animation: 'spin 1s linear infinite',
                borderRadius: '9999px',
                height: '3rem',
                width: '3rem',
                borderBottom: `2px solid ${config.accentColor}`,
              }}
            ></div>
            <p style={{ marginTop: '1rem', color: '#8E8D8A' }}>
              Bilder werden geladen...
            </p>
          </div>
        </div>
      )}

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
      >
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={`360° Produktansicht ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '0.375rem',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            // Fallback for individual images if they fail to load
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://placehold.co/400x400/D8C3A5/8E8D8A?text=Bild+${currentImageIndex + 1}`
            }}
          />
        ) : (
          <p style={{ color: '#8E8D8A', opacity: 0.7, textAlign: 'center' }}>
            Keine Bilder für 360° Viewer konfiguriert.
          </p>
        )}
      </div>

      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75%',
            maxWidth: '24rem', // max-w-sm
            '--accent-color': config.accentColor, // Pass accentColor as CSS variable
          }}
        >
          <input
            type="range"
            min="0"
            max={images.length - 1}
            value={currentImageIndex}
            onChange={handleSliderChange}
            className="slider-thumb-sleek" // Added custom class
            style={{
              width: '100%',
              height: '0.5rem',
              backgroundColor: '#e2e8f0', // gray-200
              borderRadius: '0.5rem',
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              marginTop: '0.25rem',
              color: '#8E8D8A',
            }}
          >
            Bild {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Fullscreen Button */}
      {images.length > 0 && (
        <button
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '9999px',
            zIndex: 20,
            transition: 'background-color 0.3s',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen ? 'Vollbild verlassen' : 'Vollbild aktivieren'
          }
        >
          {isFullscreen ? (
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}

export default Viewer360Preview
