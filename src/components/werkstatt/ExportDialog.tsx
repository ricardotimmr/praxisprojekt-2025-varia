import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Code, Component } from "lucide-react";
import { toast } from "sonner";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: any;
}

export const ExportDialog = ({ isOpen, onClose, config }: ExportDialogProps) => {
  const [exportFormat, setExportFormat] = useState<'html' | 'react' | 'webcomponent'>('html');

  const shortenImageUrl = (url: string, index: number, type: 'slide' | 'background' | 'hotspot' = 'slide') => {
    if (!url || url.includes('placeholder')) return url;
    
    if (url.startsWith('blob:') || url.length > 100) {
      const examples = {
        slide: [
          'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'
        ],
        background: [
          'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
        ],
        hotspot: [
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop'
        ]
      };
      
      return examples[type][index % examples[type].length];
    }
    return url;
  };

  const generateFeatureSliderCode = (format: string) => {
    const { module, layout, design } = config;
    const slides = (module.settings.slides || []).map((slide: any, index: number) => ({
      ...slide,
      image: slide.imageUrl || (slide.image ? shortenImageUrl(slide.image, index, 'slide') : '')
    }));
    const transition = module.settings.transition === 'zoom' ? 'fade' : (module.settings.transition || 'fade');
    const autoplay = module.settings.autoplay || false;
    
    if (format === 'html') {
      return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feature Slider</title>
    <style>
        * {
            font-family: ${design.fontFamily || 'system-ui, -apple-system, sans-serif'};
        }
        .slider-container {
            position: relative;
            width: ${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'};
            max-width: 800px;
            margin: 0 auto;
            background-color: ${design.backgroundColor};
            border-radius: 8px;
            overflow: hidden;
            padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
            ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
            ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .slider-inner {
            position: relative;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
        }
        .slide {
            position: relative;
            height: 300px;
            background-size: cover;
            background-position: center;
            display: none;
            transition: opacity 0.5s ease-in-out;
        }
        .slide.active {
            display: block;
        }
        .slide-content {
            position: absolute;
            bottom: 24px;
            left: 24px;
            color: white;
            text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }
        .slide-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 8px;
            color: ${design.headingColor === '#E43D12' ? 'white' : design.headingColor};
        }
        .slide-description {
            color: ${design.textColor === '#8E8D8A' ? 'rgba(255,255,255,0.9)' : design.textColor};
        }
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
            transition: all 0.2s ease;
        }
        .nav-button:hover {
            background: rgba(255,255,255,0.4);
        }
        .nav-prev {
            left: 8px;
        }
        .nav-next {
            right: 8px;
        }
        .dots-container {
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .dot.active {
            background: ${design.accentColor};
            transform: scale(1.25);
        }
        .play-button {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${design.accentColor};
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 12px;
            backdrop-filter: blur(4px);
            transition: all 0.2s ease;
        }
    </style>
</head>
<body>
    <div class="slider-container">
        <div class="slider-inner">
            ${slides.map((slide: any, index: number) => `
            <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image || ''}')">
                ${!slide.image ? `<div style="background: linear-gradient(to right, #e5e7eb, #d1d5db); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #6b7280;">Slide ${index + 1}</div>` : ''}
                ${(slide.title || slide.description) ? `
                <div class="slide-content">
                    ${slide.title ? `<h3 class="slide-title">${slide.title}</h3>` : ''}
                    ${slide.description ? `<p class="slide-description">${slide.description}</p>` : ''}
                </div>` : ''}
            </div>`).join('')}
            
            <button class="nav-button nav-prev" onclick="previousSlide()">‹</button>
            <button class="nav-button nav-next" onclick="nextSlide()">›</button>
            
            <div class="dots-container">
                ${slides.map((_: any, index: number) => `
                <div class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>`).join('')}
                <button class="play-button" onclick="toggleAutoplay()">
                    <span id="play-icon">${autoplay ? '⏸' : '▶'}</span>
                </button>
            </div>
        </div>
    </div>

    <script>
        let currentSlide = 0;
        let isAutoPlaying = ${autoplay};
        let autoplayInterval;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % totalSlides);
        }

        function previousSlide() {
            showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }

        function goToSlide(index) {
            showSlide(index);
        }

        function toggleAutoplay() {
            isAutoPlaying = !isAutoPlaying;
            const playIcon = document.getElementById('play-icon');
            
            if (isAutoPlaying) {
                playIcon.textContent = '⏸';
                startAutoplay();
            } else {
                playIcon.textContent = '▶';
                stopAutoplay();
            }
        }

        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 3000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        if (isAutoPlaying) {
            startAutoplay();
        }
    </script>
</body>
</html>`;
    }

    if (format === 'react') {
      return `import React, { useState, useEffect } from 'react';

const FeatureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(${autoplay});

  const slides = ${JSON.stringify(slides, null, 2)};

  useEffect(() => {
    if (isAutoPlaying && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const containerStyle = {
    position: 'relative',
    width: '${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'}',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '${design.backgroundColor}',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'}',
    fontFamily: '${design.fontFamily || 'system-ui, -apple-system, sans-serif'}',
    ${layout.shadow !== 'kein' ? `boxShadow: '${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'}',` : ''}
    ${layout.border !== 'kein' ? `border: '${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor}',` : ''}
  };

  const sliderInnerStyle = {
    position: 'relative',
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const slideStyle = {
    position: 'relative',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.5s ease-in-out',
  };

  const slideContentStyle = {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    color: 'white',
    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '${design.headingColor === '#E43D12' ? 'white' : design.headingColor}',
  };

  const descriptionStyle = {
    color: '${design.textColor === '#8E8D8A' ? 'rgba(255,255,255,0.9)' : design.textColor}',
  };

  return (
    <div style={containerStyle}>
      <div style={sliderInnerStyle}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...slideStyle,
              backgroundImage: slide.image ? \`url('\${slide.image}')\` : 'linear-gradient(to right, #e5e7eb, #d1d5db)',
              display: index === currentSlide ? 'block' : 'none',
            }}
          >
            {!slide.image && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>
                Slide {index + 1}
              </div>
            )}
            {(slide.title || slide.description) && (
              <div style={slideContentStyle}>
                {slide.title && <h3 style={titleStyle}>{slide.title}</h3>}
                {slide.description && <p style={descriptionStyle}>{slide.description}</p>}
              </div>
            )}
          </div>
        ))}
        
        <button className="nav-button nav-prev" onClick={previousSlide}>‹</button>
        <button className="nav-button nav-next" onClick={nextSlide}>›</button>
        
        <div className="dots-container">
          {slides.map((_, index) => (
            <div key={index} className={\`dot \${index === currentSlide ? 'active' : ''}\`} onClick={() => goToSlide(index)}></div>
          ))}
          <button className="play-button" onClick={toggleAutoplay}>
            <span id="play-icon">{isAutoPlaying ? '⏸' : '▶'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;`;
    }

    return `class FeatureSliderElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentSlide = 0;
    this.isAutoPlaying = ${autoplay};
    this.autoplayInterval = null;
    this.slides = ${JSON.stringify(slides, null, 2)};
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    if (this.isAutoPlaying) {
      this.startAutoplay();
    }
  }

  disconnectedCallback() {
    this.stopAutoplay();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background-color: ${design.backgroundColor};
          border-radius: 8px;
          overflow: hidden;
          padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
          ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
          ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .slider-inner {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        }
        .slide {
          position: relative;
          height: 300px;
          background-size: cover;
          background-position: center;
          display: none;
          transition: opacity 0.5s ease-in-out;
        }
        .slide.active {
          display: block;
        }
        .slide-content {
          position: absolute;
          bottom: 24px;
          left: 24px;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }
        .slide-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 8px;
          color: ${design.headingColor === '#E43D12' ? 'white' : design.headingColor};
        }
        .slide-description {
          color: ${design.textColor === '#8E8D8A' ? 'rgba(255,255,255,0.9)' : design.textColor};
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-button:hover {
          background: rgba(255,255,255,0.4);
        }
        .nav-prev {
          left: 8px;
        }
        .nav-next {
          right: 8px;
        }
        .dots-container {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          cursor: pointer;
        }
        .dot.active {
          background: ${design.accentColor};
          transform: scale(1.25);
        }
        .play-button {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${design.accentColor};
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
        }
      </style>
      
      <div class="slider-container">
        <div class="slider-inner">
          \${this.slides.map((slide, index) => \`
            <div class="slide \${index === 0 ? 'active' : ''}" style="background-image: url('\${slide.image || ''}')">
              \${!slide.image ? \`<div style="background: linear-gradient(to right, #e5e7eb, #d1d5db); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #6b7280;">Slide \${index + 1}</div>\` : ''}
              \${(slide.title || slide.description) ? \`
              <div class="slide-content">
                \${slide.title ? \`<h3 class="slide-title">\${slide.title}</h3>\` : ''}
                \${slide.description ? \`<p class="slide-description">\${slide.description}</p>\` : ''}
              </div>\` : ''}
            </div>
          \`).join('')}
          
          <button class="nav-button nav-prev">‹</button>
          <button class="nav-button nav-next">›</button>
          
          <div class="dots-container">
            \${this.slides.map((_, index) => \`
              <div class="dot \${index === 0 ? 'active' : ''}"></div>
            \`).join('')}
            <button class="play-button">
              <span id="play-icon">\${this.isAutoPlaying ? '⏸' : '▶'}</span>
            </button>
          </div>
        </div>
      </div>
    \`;
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector('.nav-prev');
    const nextBtn = this.shadowRoot.querySelector('.nav-next');
    const playBtn = this.shadowRoot.querySelector('.play-button');
    const dots = this.shadowRoot.querySelectorAll('.dot');

    prevBtn.addEventListener('click', () => this.previousSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());
    playBtn.addEventListener('click', () => this.toggleAutoplay());

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }

  showSlide(index) {
    const slides = this.shadowRoot.querySelectorAll('.slide');
    const dots = this.shadowRoot.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    this.currentSlide = index;
  }

  nextSlide() {
    this.showSlide((this.currentSlide + 1) % this.slides.length);
  }

  previousSlide() {
    this.showSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  toggleAutoplay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    const playIcon = this.shadowRoot.querySelector('#play-icon');
    playIcon.textContent = this.isAutoPlaying ? '⏸' : '▶';

    if (this.isAutoPlaying) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.nextSlide(), 3000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

customElements.define('feature-slider', FeatureSliderElement);`;
  };

  const generate360ViewerCode = (format: string) => {
    const { module, layout, design } = config;
    const imageUrls = module.settings.imageUrls || [];
    const images = (module.settings.images || []).map((image: any, index: number) => {
      if (imageUrls[index]) return imageUrls[index];
      return image ? shortenImageUrl(image, index, 'slide') : '';
    });
    const autoRotate = module.settings.autoRotate || false;
    const rotationSpeed = module.settings.rotationSpeed || 3;

    if (format === 'html') {
      return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>360° Viewer</title>
    <style>
        * {
            font-family: ${design.fontFamily || 'system-ui, -apple-system, sans-serif'};
        }
        .viewer-container {
            position: relative;
            width: ${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'};
            max-width: 800px;
            margin: 0 auto;
            background-color: ${design.backgroundColor};
            border-radius: 8px;
            overflow: hidden;
            padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
            ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
            ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .viewer-inner {
            position: relative;
            width: 100%;
            height: 400px;
            background: #f0f0f0;
            border-radius: 8px;
            overflow: hidden;
            cursor: grab;
        }
        .viewer-inner:active {
            cursor: grabbing;
        }
        .viewer-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            user-select: none;
            transition: opacity 0.1s ease;
        }
        .controls {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .slider-container {
            position: relative;
        }
        .slider-track {
            width: 100%;
            height: 8px;
            background-color: #e5e7eb;
            border-radius: 4px;
            position: relative;
        }
        .slider-thumb {
            position: absolute;
            width: 24px;
            height: 24px;
            background-color: ${design.accentColor};
            border-radius: 50%;
            top: -8px;
            transform: translateX(-50%);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #6b7280;
            font-size: 14px;
        }
        .play-button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${design.accentColor};
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .play-button:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body>
    <div class="viewer-container">
        <div class="viewer-inner" id="viewer">
            <img class="viewer-image" id="viewerImage" src="${images[0] || ''}" alt="360° View">
        </div>
        <div class="controls">
            <div class="slider-container">
                <div class="slider-track">
                    <div class="slider-thumb" id="sliderThumb"></div>
                </div>
                <input type="range" id="imageSlider" min="0" max="${Math.max(images.length - 1, 0)}" value="0" style="position: absolute; inset: 0; opacity: 0; cursor: pointer;">
            </div>
            <div class="control-bar">
                <span>Bild 1</span>
                <button class="play-button" id="playButton">
                    <span id="playIcon">${autoRotate ? '⏸' : '▶'}</span>
                </button>
                <span>Bild ${images.length}</span>
            </div>
        </div>
    </div>

    <script>
        const images = ${JSON.stringify(images)};
        let currentIndex = 0;
        let isAutoRotating = ${autoRotate};
        let rotationInterval;
        let isDragging = false;

        const viewerImage = document.getElementById('viewerImage');
        const imageSlider = document.getElementById('imageSlider');
        const sliderThumb = document.getElementById('sliderThumb');
        const playButton = document.getElementById('playButton');
        const playIcon = document.getElementById('playIcon');
        const viewer = document.getElementById('viewer');

        function updateImage(index) {
            if (images.length === 0) return;
            currentIndex = Math.max(0, Math.min(index, images.length - 1));
            viewerImage.src = images[currentIndex];
            imageSlider.value = currentIndex;
            updateSliderThumb();
        }

        function updateSliderThumb() {
            const percentage = images.length > 1 ? (currentIndex / (images.length - 1)) * 100 : 0;
            sliderThumb.style.left = percentage + '%';
        }

        function startAutoRotation() {
            if (rotationInterval) clearInterval(rotationInterval);
            const speed = ${rotationSpeed};
            const intervalTime = Math.max(50, 500 - (speed * 40));
            rotationInterval = setInterval(() => {
                updateImage((currentIndex + 1) % images.length);
            }, intervalTime);
        }

        function stopAutoRotation() {
            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
            }
        }

        function toggleAutoRotation() {
            isAutoRotating = !isAutoRotating;
            playIcon.textContent = isAutoRotating ? '⏸' : '▶';
            
            if (isAutoRotating) {
                startAutoRotation();
            } else {
                stopAutoRotation();
            }
        }

        // Event listeners
        imageSlider.addEventListener('input', (e) => {
            updateImage(parseInt(e.target.value));
        });

        playButton.addEventListener('click', toggleAutoRotation);

        // Mouse wheel support
        viewer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? 1 : -1;
            updateImage(currentIndex + direction);
        });

        // Touch/mouse drag support
        let startX = 0;
        let startIndex = 0;

        viewer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startIndex = currentIndex;
            e.preventDefault();
        });

        viewer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startIndex = currentIndex;
            e.preventDefault();
        });

        function handleMove(clientX) {
            if (!isDragging) return;
            const deltaX = clientX - startX;
            const sensitivity = 2;
            const newIndex = startIndex + Math.floor(deltaX / sensitivity);
            updateImage(newIndex);
        }

        document.addEventListener('mousemove', (e) => handleMove(e.clientX));
        document.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));

        document.addEventListener('mouseup', () => { isDragging = false; });
        document.addEventListener('touchend', () => { isDragging = false; });

        // Initialize
        updateImage(0);
        if (isAutoRotating) {
            startAutoRotation();
        }
    </script>
</body>
</html>`;
    }

    if (format === 'react') {
      return `import React, { useState, useEffect, useRef } from 'react';

const Viewer360 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(${autoRotate});
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startIndex = useRef(0);
  const rotationInterval = useRef(null);

  const images = ${JSON.stringify(images, null, 2)};

  useEffect(() => {
    if (isAutoRotating && images.length > 0) {
      const speed = ${rotationSpeed};
      const intervalTime = Math.max(50, 500 - (speed * 40));
      rotationInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, intervalTime);
      return () => clearInterval(rotationInterval.current);
    }
  }, [isAutoRotating, images.length]);

  const handleSliderChange = (e) => {
    setCurrentIndex(parseInt(e.target.value));
  };

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex((prev) => Math.max(0, Math.min(prev + direction, images.length - 1)));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startIndex.current = currentIndex;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    const sensitivity = 2;
    const newIndex = startIndex.current + Math.floor(deltaX / sensitivity);
    setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const containerStyle = {
    position: 'relative',
    width: '${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'}',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '${design.backgroundColor}',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '${layout.padding === "kompakt" ? "16px" : layout.padding === "großzügig" ? "32px" : "24px"}',
    fontFamily: '${design.fontFamily || 'system-ui, -apple-system, sans-serif'}',
    ${layout.shadow !== 'kein' ? `boxShadow: '${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'}',` : ''}
    ${layout.border !== 'kein' ? `border: '${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor}',` : ''}
  };

  const viewerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    background: '#f0f0f0',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const sliderThumbStyle = {
    position: 'absolute',
    width: '24px',
    height: '24px',
    backgroundColor: '${design.accentColor}',
    borderRadius: '50%',
    top: '-8px',
    left: \`\${images.length > 1 ? (currentIndex / (images.length - 1)) * 100 : 0}%\`,
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, currentIndex]);

  return (
    <div style={containerStyle}>
      <div 
        style={viewerStyle}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <img 
          src={images[currentIndex] || ''}
          alt="360° View"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            userSelect: 'none',
            transition: 'opacity 0.1s ease'
          }}
        />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            position: 'relative'
          }}>
            <div style={sliderThumbStyle} />
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(images.length - 1, 0)}
            value={currentIndex}
            onChange={handleSliderChange}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          <span>Bild 1</span>
          <button
            onClick={toggleAutoRotation}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '${design.accentColor}',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isAutoRotating ? '⏸' : '▶'}
          </button>
          <span>Bild {images.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Viewer360;`;
    }

    return `class Viewer360Element extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.isAutoRotating = ${autoRotate};
    this.rotationInterval = null;
    this.isDragging = false;
    this.startX = 0;
    this.startIndex = 0;
    this.images = ${JSON.stringify(images, null, 2)};
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    if (this.isAutoRotating) {
      this.startAutoRotation();
    }
  }

  disconnectedCallback() {
    this.stopAutoRotation();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background-color: ${design.backgroundColor};
          border-radius: 8px;
          overflow: hidden;
          padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
          ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
          ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .viewer-inner {
          position: relative;
          width: 100%;
          height: 400px;
          background: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
          cursor: grab;
        }
        .viewer-inner:active {
          cursor: grabbing;
        }
        .viewer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          transition: opacity 0.1s ease;
        }
        .controls {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .slider-container {
          position: relative;
        }
        .slider-track {
          width: 100%;
          height: 8px;
          background-color: #e5e7eb;
          border-radius: 4px;
          position: relative;
        }
        .slider-thumb {
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: ${design.accentColor};
          border-radius: 50%;
          top: -8px;
          transform: translateX(-50%);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #6b7280;
          font-size: 14px;
        }
        .play-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: ${design.accentColor};
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .play-button:hover {
          transform: scale(1.1);
        }
      </style>
      
      <div class="viewer-inner" id="viewer">
        <img class="viewer-image" id="viewerImage" src="\${this.images[0] || ''}" alt="360° View">
      </div>
      <div class="controls">
        <div class="slider-container">
          <div class="slider-track">
            <div class="slider-thumb" id="sliderThumb"></div>
          </div>
          <input type="range" id="imageSlider" min="0" max="\${Math.max(this.images.length - 1, 0)}" value="0" style="position: absolute; inset: 0; opacity: 0; cursor: pointer;">
        </div>
        <div class="control-bar">
          <span>Bild 1</span>
          <button class="play-button" id="playButton">
            <span id="playIcon">\${this.isAutoRotating ? '⏸' : '▶'}</span>
          </button>
          <span>Bild \${this.images.length}</span>
        </div>
      </div>
    \`;
  }

  setupEventListeners() {
    const imageSlider = this.shadowRoot.querySelector('#imageSlider');
    const playButton = this.shadowRoot.querySelector('#playButton');
    const viewer = this.shadowRoot.querySelector('#viewer');

    imageSlider.addEventListener('input', (e) => {
      this.updateImage(parseInt(e.target.value));
    });

    playButton.addEventListener('click', () => this.toggleAutoRotation());

    viewer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      this.updateImage(this.currentIndex + direction);
    });

    viewer.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startX = e.clientX;
      this.startIndex = this.currentIndex;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => this.handleMove(e.clientX));
    document.addEventListener('mouseup', () => { this.isDragging = false; });
  }

  handleMove(clientX) {
    if (!this.isDragging) return;
    const deltaX = clientX - this.startX;
    const sensitivity = 2;
    const newIndex = this.startIndex + Math.floor(deltaX / sensitivity);
    this.updateImage(newIndex);
  }

  updateImage(index) {
    if (this.images.length === 0) return;
    this.currentIndex = Math.max(0, Math.min(index, this.images.length - 1));
    const viewerImage = this.shadowRoot.querySelector('#viewerImage');
    const imageSlider = this.shadowRoot.querySelector('#imageSlider');
    const sliderThumb = this.shadowRoot.querySelector('#sliderThumb');
    
    viewerImage.src = this.images[this.currentIndex];
    imageSlider.value = this.currentIndex;
    
    const percentage = this.images.length > 1 ? (this.currentIndex / (this.images.length - 1)) * 100 : 0;
    sliderThumb.style.left = percentage + '%';
  }

  toggleAutoRotation() {
    this.isAutoRotating = !this.isAutoRotating;
    const playIcon = this.shadowRoot.querySelector('#playIcon');
    playIcon.textContent = this.isAutoRotating ? '⏸' : '▶';
    
    if (this.isAutoRotating) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  startAutoRotation() {
    this.stopAutoRotation();
    const speed = ${rotationSpeed};
    const intervalTime = Math.max(50, 500 - (speed * 40));
    this.rotationInterval = setInterval(() => {
      this.updateImage((this.currentIndex + 1) % this.images.length);
    }, intervalTime);
  }

  stopAutoRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }
}

customElements.define('viewer-360', Viewer360Element);`;
  };

  const generateHotspotGraphicsCode = (format: string) => {
    const { module, layout, design } = config;
    const hotspots = module.settings.hotspots || [];
    const backgroundImageUrl = module.settings.backgroundImageUrl;
    const backgroundImage = backgroundImageUrl || (module.settings.backgroundImage ? shortenImageUrl(module.settings.backgroundImage, 0, 'background') : '');
    const animationType = module.settings.animationType || 'pulse';

    if (format === 'html') {
      return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotspot Graphics</title>
    <style>
        * {
            font-family: ${design.fontFamily || 'system-ui, -apple-system, sans-serif'};
        }
        .hotspot-container {
            position: relative;
            width: ${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'};
            max-width: 800px;
            margin: 0 auto;
            background-color: ${design.backgroundColor};
            border-radius: 8px;
            overflow: hidden;
            padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
            ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
            ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .hotspot-inner {
            position: relative;
            width: 100%;
            height: 400px;
            background: ${backgroundImage ? `url('${backgroundImage}')` : 'linear-gradient(to right, #e5e7eb, #d1d5db)'};
            background-size: cover;
            background-position: center;
            border-radius: 8px;
            overflow: hidden;
        }
        .hotspot-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 18px;
        }
        .hotspot {
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: ${design.accentColor};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            ${animationType === 'pulse' ? 'animation: pulse 2s infinite;' : ''}
            ${animationType === 'bounce' ? 'animation: bounce 1s infinite;' : ''}
            ${animationType === 'ping' ? 'animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}
        }
        .hotspot-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
            z-index: 10;
        }
        .hotspot:hover .hotspot-tooltip {
            opacity: 1;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes ping {
            75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .hotspot.ping::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: ${design.accentColor};
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
    </style>
</head>
<body>
    <div class="hotspot-container">
        <div class="hotspot-inner">
            ${!backgroundImage ? '<div class="hotspot-fallback">Kein Hintergrundbild</div>' : ''}
            ${hotspots.map((hotspot: any) => `
            <div class="hotspot ${animationType === 'ping' ? 'ping' : ''}" 
                 style="left: ${hotspot.x || 50}%; top: ${hotspot.y || 50}%;">
                ${hotspot.text ? `<div class="hotspot-tooltip">${hotspot.text}</div>` : ''}
            </div>`).join('')}
        </div>
    </div>
</body>
</html>`;
    }

    if (format === 'react') {
      return `import React, { useState } from 'react';

const HotspotGraphics = () => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const hotspots = ${JSON.stringify(hotspots, null, 2)};
  const backgroundImage = '${backgroundImage}';

  const containerStyle = {
    position: 'relative',
    width: '${layout.width === 'voll' ? '100%' : layout.width === 'breit' ? '90%' : layout.width === 'schmal' ? '60%' : '80%'}',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '${design.backgroundColor}',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '${layout.padding === "kompakt" ? "16px" : layout.padding === "großzügig" ? "32px" : "24px"}',
    fontFamily: '${design.fontFamily || "system-ui, -apple-system, sans-serif"}',
    ${layout.shadow !== "kein" ? `boxShadow: '${layout.shadow === "leicht" ? "0 1px 3px rgba(0,0,0,0.1)" : layout.shadow === "stark" ? "0 10px 25px rgba(0,0,0,0.2)" : "0 4px 6px rgba(0,0,0,0.1)"}',` : ""}
    ${layout.border !== "kein" ? `border: '${layout.border === "dünn" ? "1px" : "2px"} solid ${layout.borderColor}',` : ""}
  };

  const hotspotInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    background: backgroundImage ? \`url('\${backgroundImage}')\` : 'linear-gradient(to right, #e5e7eb, #d1d5db)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const hotspotStyle = (hotspot, index) => ({
    position: 'absolute',
    width: '16px',
    height: '16px',
    backgroundColor: '${design.accentColor}',
    borderRadius: '50%',
    left: \`\${hotspot.x || 50}%\`,
    top: \`\${hotspot.y || 50}%\`,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    animation: '${animationType}' === 'pulse' ? 'pulse 2s infinite' : 
               '${animationType}' === 'bounce' ? 'bounce 1s infinite' : 
               '${animationType}' === 'ping' ? 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
  });

  const tooltipStyle = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    opacity: 1,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
    zIndex: 10,
  };

  return (
    <>
      <style>{\`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      \`}</style>
      <div style={containerStyle}>
        <div style={hotspotInnerStyle}>
          {!backgroundImage && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '18px'
            }}>
              Kein Hintergrundbild
            </div>
          )}
          {hotspots.map((hotspot, index) => (
            <div
              key={index}
              style={hotspotStyle(hotspot, index)}
              onMouseEnter={() => setHoveredHotspot(index)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {'${animationType}' === 'ping' && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '${design.accentColor}',
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                }} />
              )}
              {hoveredHotspot === index && hotspot.text && (
                <div style={tooltipStyle}>
                  {hotspot.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotspotGraphics;`;
    }

    return `class HotspotGraphicsElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hotspots = ${JSON.stringify(hotspots, null, 2)};
    this.backgroundImage = '${backgroundImage}';
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background-color: ${design.backgroundColor};
          border-radius: 8px;
          overflow: hidden;
          padding: ${layout.padding === 'kompakt' ? '16px' : layout.padding === 'großzügig' ? '32px' : '24px'};
          ${layout.shadow !== 'kein' ? `box-shadow: ${layout.shadow === 'leicht' ? '0 1px 3px rgba(0,0,0,0.1)' : layout.shadow === 'stark' ? '0 10px 25px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'};` : ''}
          ${layout.border !== 'kein' ? `border: ${layout.border === 'dünn' ? '1px' : '2px'} solid ${layout.borderColor};` : ''}
        }
        .hotspot-inner {
          position: relative;
          width: 100%;
          height: 400px;
          background: \${this.backgroundImage ? \`url('\${this.backgroundImage}')\` : 'linear-gradient(to right, #e5e7eb, #d1d5db)'};
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          overflow: hidden;
        }
        .hotspot-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 18px;
        }
        .hotspot {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: ${design.accentColor};
          border-radius: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          ${animationType === 'pulse' ? 'animation: pulse 2s infinite;' : ''}
          ${animationType === 'bounce' ? 'animation: bounce 1s infinite;' : ''}
          ${animationType === 'ping' ? 'animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}
        }
        .hotspot-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 10;
        }
        .hotspot:hover .hotspot-tooltip {
          opacity: 1;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .hotspot.ping::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: ${design.accentColor};
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      </style>
      
      <div class="hotspot-inner">
        \${!this.backgroundImage ? '<div class="hotspot-fallback">Kein Hintergrundbild</div>' : ''}
        \${this.hotspots.map((hotspot) => \`
          <div class="hotspot \${'${animationType}' === 'ping' ? 'ping' : ''}" 
               style="left: \${hotspot.x || 50}%; top: \${hotspot.y || 50}%;">
            \${hotspot.text ? \`<div class="hotspot-tooltip">\${hotspot.text}</div>\` : ''}
          </div>
        \`).join('')}
      </div>
    \`;
  }

  setupEventListeners() {
    // Event listeners for hotspot interactions can be added here
  }
}

customElements.define('hotspot-graphics', HotspotGraphicsElement);`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Code in die Zwischenablage kopiert');
    } catch (err) {
      toast.error('Fehler beim Kopieren');
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Datei ${filename} heruntergeladen`);
  };

  const getExportCode = () => {
    if (config.module.type === 'feature-slider') {
      return generateFeatureSliderCode(exportFormat);
    }
    if (config.module.type === '360-viewer') {
      return generate360ViewerCode(exportFormat);
    }
    if (config.module.type === 'hotspot-graphics') {
      return generateHotspotGraphicsCode(exportFormat);
    }
    return '// Code generation for this module is not yet implemented';
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'html': return 'html';
      case 'react': return 'jsx';
      case 'webcomponent': return 'js';
      default: return 'txt';
    }
  };

  const getFileName = () => {
    const moduleName = config.module.type.replace('-', '_');
    return `${moduleName}.${getFileExtension()}`;
  };

  const exportCode = getExportCode();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Code exportieren</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Tabs value={exportFormat} onValueChange={(value) => setExportFormat(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">
                <Code className="w-4 h-4 mr-2" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="react">
                <Component className="w-4 h-4 mr-2" />
                React
              </TabsTrigger>
              <TabsTrigger value="webcomponent">
                <Badge className="w-4 h-4 mr-2" />
                Web Component
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={exportFormat} className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {exportFormat === 'html' && 'Vollständige HTML-Datei mit eingebetteten Styles und Scripts'}
                    {exportFormat === 'react' && 'React-Komponente für moderne React-Anwendungen'}
                    {exportFormat === 'webcomponent' && 'Nativer Web Component für jede Website'}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(exportCode)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Kopieren
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(exportCode, getFileName())}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <Textarea
                  value={exportCode}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Der generierte Code wird hier angezeigt..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};