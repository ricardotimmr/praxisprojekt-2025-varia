import React, { useState, useEffect, useCallback } from 'react';
import './featureslider.css'; // Importiere die spezifischen Styles für den Slider

export default function FeatureSlider({ config }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Stelle sicher, dass der aktuelle Slide-Index gültig ist
  useEffect(() => {
    if (!config.images || config.images.length === 0) {
      setCurrentSlideIndex(0);
    } else if (currentSlideIndex >= config.images.length) {
      setCurrentSlideIndex(config.images.length - 1);
    }
  }, [config.images, currentSlideIndex]);

  // Autoplay-Logik
  useEffect(() => {
    let intervalId;
    if (config.autoplayEnabled && config.images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % config.images.length);
      }, config.autoplayInterval);
    }
    return () => clearInterval(intervalId);
  }, [config.autoplayEnabled, config.autoplayInterval, config.images.length]);

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % config.images.length);
    setTimeout(() => setIsTransitioning(false), 500); // Dauer der CSS-Transition
  }, [isTransitioning, config.images.length]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlideIndex((prevIndex) =>
      (prevIndex - 1 + config.images.length) % config.images.length
    );
    setTimeout(() => setIsTransitioning(false), 500); // Dauer der CSS-Transition
  }, [isTransitioning, config.images.length]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlideIndex) return;
    setIsTransitioning(true);
    setCurrentSlideIndex(index);
    setTimeout(() => setIsTransitioning(false), 500); // Dauer der CSS-Transition
  }, [isTransitioning, currentSlideIndex]);

  // Hilfsfunktionen für CSS-Klassen basierend auf der Konfiguration
  const contentAlignmentClass = `align-${config.contentAlignment}`;
  const paddingSizeClass = `padding-${config.paddingSize}`;
  const shadowEffectClass = `shadow-${config.shadowEffect || 'none'}`;
  const borderStyleClass = `border-${config.borderStyle || 'none'}`;
  const verticalAlignmentClass = `vertical-${config.verticalAlignment || 'middle'}`;


  // Wenn keine Bilder konfiguriert sind, zeige eine Fallback-Nachricht
  if (!config.images || config.images.length === 0) {
    return (
      <div
        className={`feature-slider-container ${paddingSizeClass} ${shadowEffectClass} ${borderStyleClass} ${contentAlignmentClass} ${verticalAlignmentClass}`}
        style={{
          backgroundColor: config.backgroundColor,
          color: config.textColor,
          borderColor: config.borderColor,
          justifyContent: 'center', /* Stellt sicher, dass der Text zentriert ist */
          alignItems: 'center', /* Stellt sicher, dass der Text zentriert ist */
        }}
      >
        <p className="fallback-message">Keine Bilder für den Slider konfiguriert.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        feature-slider-container
        ${contentAlignmentClass}
        ${verticalAlignmentClass}
        ${paddingSizeClass}
        ${shadowEffectClass}
        ${borderStyleClass}
      `}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        borderColor: config.borderColor,
      }}
    >
      {config.companyLogoUrl && (
        <img
          src={config.companyLogoUrl}
          alt="Company Logo"
          className="company-logo"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x40/EBE9E1/8E8D8A?text=Logo' }}
        />
      )}
      <h3 className="feature-slider-title" style={{ color: config.titleColor }}>{config.title}</h3>
      <p className="feature-slider-description">{config.description}</p>

      <div className="feature-slider-image-wrapper">
        <img
          key={currentSlideIndex}
          src={config.images[currentSlideIndex]}
          alt={`Produktbild ${currentSlideIndex + 1}`}
          className="feature-slider-image animate-fadeIn"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/D8C3A5/8E8D8A?text=Bild+${currentSlideIndex + 1}` }}
        />

        {config.images.length > 1 && (
          <>
            <button
              className="nav-button prev-button"
              onClick={goToPrevSlide}
              disabled={isTransitioning}
              aria-label="Previous Slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="nav-button next-button"
              onClick={goToNextSlide}
              disabled={isTransitioning}
              aria-label="Next Slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {config.images.length > 1 && (
        <div className="dot-navigation">
          {config.images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlideIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to Slide ${index + 1}`}
            ></button>
          ))}
          <button
            className="autoplay-toggle-button"
            onClick={config.onToggleAutoplay}
            aria-label={config.autoplayEnabled ? 'Autoplay pausieren' : 'Autoplay starten'}
          >
            {config.autoplayEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}

      <button
        className="more-info-button"
        style={{ backgroundColor: config.accentColor }}
      >
        Mehr erfahren
      </button>
    </div>
  );
}