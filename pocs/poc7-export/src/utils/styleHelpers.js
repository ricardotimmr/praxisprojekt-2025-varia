// Helper function to get CSS for shadow effects
export const getShadowStyle = (shadowEffect) => {
  switch (shadowEffect) {
    case 'light':
      return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    case 'standard':
      return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    case 'strong':
      return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    default:
      return 'none'
  }
}

// Helper function to get CSS for border styles
export const getBorderStyle = (borderStyle, borderColor) => {
  switch (borderStyle) {
    case 'thin':
      return `1px solid ${borderColor}`
    case 'standard':
      return `2px solid ${borderColor}`
    default:
      return 'none'
  }
}

// Helper function to get CSS for module width
export const getWidthStyle = (moduleWidth) => {
  switch (moduleWidth) {
    case 'wide':
      return { width: '100%', maxWidth: 'calc(100% * 5 / 6)', margin: '0 auto' }
    case 'standard':
      return { width: '100%', maxWidth: 'calc(100% * 3 / 4)', margin: '0 auto' }
    case 'narrow':
      return { width: '100%', maxWidth: 'calc(100% * 1 / 2)', margin: '0 auto' }
    default:
      return { width: '100%' }
  }
}

// Helper function to get CSS for vertical alignment
export const getVerticalAlignmentStyle = (verticalAlignment) => {
  switch (verticalAlignment) {
    case 'top':
      return 'flex-start'
    case 'middle':
      return 'center'
    case 'bottom':
      return 'flex-end'
    default:
      return 'center'
  }
}

// Helper function to get CSS for content alignment
export const getContentAlignmentStyle = (contentAlignment) => {
  switch (contentAlignment) {
    case 'left':
      return { alignItems: 'flex-start', textAlign: 'left' }
    case 'center':
      return { alignItems: 'center', textAlign: 'center' }
    case 'right':
      return { alignItems: 'flex-end', textAlign: 'right' }
    default:
      return { alignItems: 'center', textAlign: 'center' }
  }
}

// Helper function to get padding styles
export const getPaddingStyle = (paddingSize) => {
  switch (paddingSize) {
    case 'compact':
      return '1rem'
    case 'standard':
      return '1.5rem'
    case 'spacious':
      return '2rem'
    default:
      return '1.5rem'
  }
}

export const sliderStyles = `
  /* Custom slider thumb styles for 360 Viewer */
  .slider-thumb-sleek::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px; /* Adjust width for the line */
    height: 3px; /* Thin line */
    background: var(--accent-color); /* Use CSS variable for accent color */
    border-radius: 2px; /* Slightly rounded ends */
    cursor: grab;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    margin-top: -1px; /* Adjust to center vertically on the track */
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .slider-thumb-sleek::-moz-range-thumb {
    width: 30px;
    height: 3px;
    background: var(--accent-color);
    border-radius: 2px;
    cursor: grab;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .slider-thumb-sleek::-ms-thumb {
    width: 30px;
    height: 3px;
    background: var(--accent-color);
    border-radius: 2px;
    cursor: grab;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  /* Style the track */
  .slider-thumb-sleek::-webkit-slider-runnable-track {
    background: #cbd5e1; /* gray-300 for the track */
    border-radius: 5px;
    height: 2px;
  }

  .slider-thumb-sleek::-moz-range-track {
    background: #cbd5e1;
    border-radius: 5px;
    height: 2px;
  }

  .slider-thumb-sleek::-ms-track {
    background: #cbd5e1;
    border-radius: 5px;
    height: 2px;
  }

  /* Change cursor to grabbing when dragging */
  .slider-thumb-sleek:active::-webkit-slider-thumb {
    cursor: grabbing;
  }
  .slider-thumb-sleek:active::-moz-range-thumb {
    cursor: grabbing;
  }
  .slider-thumb-sleek:active::-ms-thumb {
    cursor: grabbing;
  }
`

export const globalCss = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out forwards;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  /* Hotspot Info Box Hover */
  .hotspot-item:hover .hotspot-info-box {
    opacity: 1;
  }

  /* Responsive adjustments */
  @media (min-width: 768px) { /* md breakpoint */
    .main-content {
      flex-direction: row;
    }
    .preview-aside {
      order: initial; /* Reset order for lg */
      position: static;
      top: auto;
      max-height: none;
    }
    .config-section {
      order: initial; /* Reset order for lg */
    }
    .module-selection-card {
      grid-template-columns: repeat(1, minmax(0, 1fr)); /* lg:grid-cols-1 */
    }
  }

  @media (min-width: 1024px) { /* lg breakpoint */
    .preview-aside {
      order: 1; /* lg:order-last */
    }
    .config-section {
      order: 0; /* lg:order-first */
    }
  }

  /* Hotspot Hover Feedback */
  .hotspot-item {
    transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.2s cubic-bezier(.4,0,.2,1);
  }
  .hotspot-item:hover,
  .hotspot-item:focus {
    transform: scale(1.18);
    box-shadow: 0 8px 18px -2px rgba(44,44,44,0.25), 0 2px 6px -1px rgba(44,44,44,0.13);
    z-index: 25;
    cursor: pointer;
  }

  /* Info Box Animation */
  .hotspot-info-box {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s cubic-bezier(.4,0,.2,1);
  }
  .hotspot-item:hover .hotspot-info-box,
  .hotspot-item:focus .hotspot-info-box {
    opacity: 1;
    pointer-events: auto;
  }
`

// Helper function to sanitize string for HTML attributes
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Function to generate HTML for Feature Slider
const generateFeatureSliderHtml = (config) => {
  const shadowStyle = getShadowStyle(config.shadowEffect);
  const borderStyle = getBorderStyle(config.borderStyle, config.borderColor);
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment);
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment);
  const padding = getPaddingStyle(config.paddingSize);
  const widthStyle = getWidthStyle(config.moduleWidth);

  const imagesHtml = config.images.map((imgSrc, index) => `
    <img
      src="${escapeHtml(imgSrc)}"
      alt="Produktbild ${index + 1}"
      style="
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: opacity 0.5s ease-in-out;
        opacity: 0; /* Will be controlled by JS */
        position: absolute;
        top: 0;
        left: 0;
      "
      onerror="this.onerror=null;this.src='https://placehold.co/400x300/D8C3A5/8E8D8A?text=Bild+${index + 1}';"
      data-slide-index="${index}"
    />
  `).join('');

  const paginationDotsHtml = config.images.map((_, index) => `
    <button
      class="slider-dot"
      data-slide-to="${index}"
      style="
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 9999px;
        transition: all 0.3s;
        background-color: ${index === 0 ? config.accentColor : '#9ca3af'};
        transform: ${index === 0 ? 'scale(1.25)' : 'scale(1)'};
        border: none;
        cursor: pointer;
        margin: 0 0.25rem;
      "
      aria-label="Gehe zu Slide ${index + 1}"
    ></button>
  `).join('');

  const autoplayControlHtml = `
    <button
      class="autoplay-toggle"
      style="
        margin-left: 1rem;
        background-color: transparent;
        color: #6b7280;
        padding: 0.25rem;
        border-radius: 9999px;
        transition: color 0.3s;
        border: none;
        cursor: pointer;
      "
      aria-label="Autoplay pausieren"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="height: 1rem; width: 1rem;"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  `;

  const jsCode = `
    <script>
      (function() {
        const sliderContainer = document.querySelector('.feature-slider-container');
        if (!sliderContainer) return;

        const images = sliderContainer.querySelectorAll('img[data-slide-index]');
        const dots = sliderContainer.querySelectorAll('.slider-dot');
        const prevButton = sliderContainer.querySelector('.prev-slide');
        const nextButton = sliderContainer.querySelector('.next-slide');
        const autoplayToggleButton = sliderContainer.querySelector('.autoplay-toggle');

        let currentSlideIndex = 0;
        let intervalId;
        let isTransitioning = false;
        const autoplayEnabled = ${config.autoplayEnabled};
        const autoplayInterval = ${config.autoplayInterval};

        function showSlide(index) {
          if (isTransitioning) return;
          isTransitioning = true;

          images.forEach((img, i) => {
            img.style.opacity = (i === index) ? '1' : '0';
            img.style.position = (i === index) ? 'relative' : 'absolute'; // Ensure active is relative
          });

          dots.forEach((dot, i) => {
            dot.style.backgroundColor = (i === index) ? '${config.accentColor}' : '#9ca3af';
            dot.style.transform = (i === index) ? 'scale(1.25)' : 'scale(1)';
          });

          currentSlideIndex = index;
          setTimeout(() => { isTransitioning = false; }, 500); // Match CSS transition duration
        }

        function goToNextSlide() {
          showSlide((currentSlideIndex + 1) % images.length);
        }

        function goToPrevSlide() {
          showSlide((currentSlideIndex - 1 + images.length) % images.length);
        }

        function startAutoplay() {
          if (autoplayEnabled && images.length > 1) {
            intervalId = setInterval(goToNextSlide, autoplayInterval);
            if (autoplayToggleButton) {
              autoplayToggleButton.innerHTML = \`
                <svg xmlns="http://www.w3.org/2000/svg" style="height: 1rem; width: 1rem;" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              \`;
              autoplayToggleButton.setAttribute('aria-label', 'Autoplay pausieren');
            }
          }
        }

        function stopAutoplay() {
          clearInterval(intervalId);
          if (autoplayToggleButton) {
            autoplayToggleButton.innerHTML = \`
              <svg xmlns="http://www.w3.org/2000/svg" style="height: 1rem; width: 1rem;" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            \`;
            autoplayToggleButton.setAttribute('aria-label', 'Autoplay starten');
          }
        }

        // Initial setup
        if (images.length > 0) {
          showSlide(currentSlideIndex);
          if (autoplayEnabled) {
            startAutoplay();
          }
        }

        // Event Listeners
        if (prevButton) prevButton.addEventListener('click', goToPrevSlide);
        if (nextButton) nextButton.addEventListener('click', goToNextSlide);
        if (autoplayToggleButton) {
          autoplayToggleButton.addEventListener('click', () => {
            if (intervalId) {
              stopAutoplay();
              intervalId = null;
            } else {
              startAutoplay();
            }
          });
        }
        dots.forEach(dot => {
          dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.slideTo);
            showSlide(index);
            stopAutoplay(); // Stop autoplay when a dot is clicked
          });
        });
      })();
    </script>
  `;

  return `
    <div
      class="feature-slider-container"
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;
        padding: ${padding};
        background-color: ${config.backgroundColor};
        color: ${config.textColor};
        align-items: ${contentAlignment.alignItems};
        text-align: ${contentAlignment.textAlign};
        justify-content: ${verticalAlignment};
        box-shadow: ${shadowStyle};
        border: ${borderStyle};
        ${widthStyle.maxWidth ? `max-width: ${widthStyle.maxWidth}; margin: ${widthStyle.margin};` : ''}
      "
    >
      ${config.companyLogoUrl ? `
        <img
          src="${escapeHtml(config.companyLogoUrl)}"
          alt="Company Logo"
          style="
            position: absolute;
            top: 1rem;
            left: 1rem;
            height: 2.5rem;
            width: auto;
            object-fit: contain;
            border-radius: 0.375rem;
            z-index: 10;
          "
          onerror="this.onerror=null;this.src='https://placehold.co/100x40/EBE9E1/8E8D8A?text=Logo';"
        />
      ` : ''}
      <h3
        style="
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: ${config.titleColor};
        "
      >
        ${escapeHtml(config.title)}
      </h3>
      <p style="margin-bottom: 1.5rem;">${escapeHtml(config.description)}</p>

      <div
        style="
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        "
      >
        ${imagesHtml}

        ${config.images.length > 1 ? `
          <button
            class="prev-slide"
            style="
              position: absolute;
              left: 0.5rem;
              top: 50%;
              transform: translateY(-50%);
              width: 2.5rem;
              height: 2.5rem;
              padding: 0;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(0,0,0,0.3);
              color: white;
              border: none;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
              z-index: 20;
              transition: background 0.3s, box-shadow 0.3s;
            "
            aria-label="Vorheriges Bild"
          >
            <svg
              style="width: 1.5rem; height: 1.5rem; display: block; transform: translateX(-0.1rem);"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 15l-5-5 5-5" />
            </svg>
          </button>
          <button
            class="next-slide"
            style="
              position: absolute;
              right: 0.5rem;
              top: 50%;
              transform: translateY(-50%);
              width: 2.5rem;
              height: 2.5rem;
              padding: 0;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(0,0,0,0.3);
              color: white;
              border: none;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
              z-index: 20;
              transition: background 0.3s, box-shadow 0.3s;
            "
            aria-label="Nächstes Bild"
          >
            <svg
              style="width: 1.5rem; height: 1.5rem; display: block; transform: translateX(0.1rem);"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 5l5 5-5 5" />
            </svg>
          </button>
        ` : ''}
      </div>

      ${config.images.length > 1 ? `
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 1rem;
          "
        >
          ${paginationDotsHtml}
          ${autoplayControlHtml}
        </div>
      ` : ''}

      <button
        style="
          margin-top: auto;
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          color: white;
          font-weight: semibold;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          align-self: center;
          background-color: ${config.accentColor};
          border: none;
          cursor: pointer;
        "
      >
        Mehr erfahren
      </button>
    </div>
    ${jsCode}
  `;
};

// Function to generate HTML for 360 Viewer
const generateViewer360Html = (config) => {
  const shadowStyle = getShadowStyle(config.shadowEffect);
  const borderStyle = getBorderStyle(config.borderStyle, config.borderColor);
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment);
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment);
  const padding = getPaddingStyle(config.paddingSize);
  const widthStyle = getWidthStyle(config.moduleWidth);

  const imagesArray = JSON.stringify(config.viewer360.images);

  const jsCode = `
    <style>
      /* Custom slider thumb styles for 360 Viewer */
      .slider-thumb-sleek::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px; /* Adjust width for the line */
        height: 3px; /* Thin line */
        background: var(--accent-color); /* Use CSS variable for accent color */
        border-radius: 2px; /* Slightly rounded ends */
        cursor: grab;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
        margin-top: -1px; /* Adjust to center vertically on the track */
        transition: background 0.3s ease, box-shadow 0.3s ease;
      }

      .slider-thumb-sleek::-moz-range-thumb {
        width: 30px;
        height: 3px;
        background: var(--accent-color);
        border-radius: 2px;
        cursor: grab;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        transition: background 0.3s ease, box-shadow 0.3s ease;
      }

      .slider-thumb-sleek::-ms-thumb {
        width: 30px;
        height: 3px;
        background: var(--accent-color);
        border-radius: 2px;
        cursor: grab;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        transition: background 0.3s ease, box-shadow 0.3s ease;
      }

      /* Style the track */
      .slider-thumb-sleek::-webkit-slider-runnable-track {
        background: #cbd5e1; /* gray-300 for the track */
        border-radius: 5px;
        height: 2px;
      }

      .slider-thumb-sleek::-moz-range-track {
        background: #cbd5e1;
        border-radius: 5px;
        height: 2px;
      }

      .slider-thumb-sleek::-ms-track {
        background: #cbd5e1;
        border-radius: 5px;
        height: 2px;
      }

      /* Change cursor to grabbing when dragging */
      .slider-thumb-sleek:active::-webkit-slider-thumb {
        cursor: grabbing;
      }
      .slider-thumb-sleek:active::-moz-range-thumb {
        cursor: grabbing;
      }
      .slider-thumb-sleek:active::-ms-thumb {
        cursor: grabbing;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin {
        animation: spin 1s linear infinite;
      }
    </style>
    <script>
      (function() {
        const viewerContainer = document.querySelector('.viewer-360-container');
        if (!viewerContainer) return;

        const viewerImage = viewerContainer.querySelector('.viewer-360-image');
        const slider = viewerContainer.querySelector('.viewer-360-slider');
        const imageCounter = viewerContainer.querySelector('.image-counter');
        const fullscreenButton = viewerContainer.querySelector('.fullscreen-toggle');

        const images = ${imagesArray};
        let currentImageIndex = ${config.viewer360.initialImageIndex};
        let isDragging = false;
        let startX = 0;
        let wheelAccumulator = 0;
        const THRESHOLD = 10; // For wheel sensitivity

        if (images.length === 0) {
          if (viewerImage) viewerImage.style.display = 'none';
          if (slider) slider.style.display = 'none';
          if (imageCounter) imageCounter.style.display = 'none';
          if (fullscreenButton) fullscreenButton.style.display = 'none';
          const noImageMessage = document.createElement('p');
          noImageMessage.style.cssText = 'color: #8E8D8A; opacity: 0.7; text-align: center;';
          noImageMessage.textContent = 'Keine Bilder für 360° Viewer konfiguriert.';
          viewerContainer.querySelector('.image-display-area').appendChild(noImageMessage);
          return;
        }

        function updateImage() {
          if (viewerImage) {
            viewerImage.src = images[currentImageIndex];
            viewerImage.alt = \`360° Produktansicht \${currentImageIndex + 1}\`;
          }
          if (slider) {
            slider.value = currentImageIndex;
          }
          if (imageCounter) {
            imageCounter.textContent = \`Bild \${currentImageIndex + 1} / \${images.length}\`;
          }
        }

        function handleMouseDown(e) {
          isDragging = true;
          startX = e.clientX || e.touches[0].clientX;
          viewerContainer.style.cursor = 'grabbing';
        }

        function handleMouseMove(e) {
          if (!isDragging) return;

          const currentX = e.clientX || e.touches[0].clientX;
          const deltaX = currentX - startX;
          const viewerWidth = viewerContainer.offsetWidth;
          const totalImages = images.length;

          if (totalImages === 0) return;

          const imageChange = Math.round((deltaX / viewerWidth) * totalImages);
          let newIndex = currentImageIndex + imageChange;

          newIndex = ((newIndex % totalImages) + totalImages) % totalImages;

          if (newIndex !== currentImageIndex) {
            currentImageIndex = newIndex;
            updateImage();
            startX = currentX;
          }
        }

        function handleMouseUp() {
          isDragging = false;
          viewerContainer.style.cursor = 'grab';
        }

        function handleSliderChange(e) {
          currentImageIndex = parseInt(e.target.value, 10);
          updateImage();
        }

        function handleWheel(e) {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            wheelAccumulator += e.deltaX;

            if (wheelAccumulator > THRESHOLD) {
              currentImageIndex = (currentImageIndex + 1) % images.length;
              updateImage();
              wheelAccumulator = 0;
            }
            if (wheelAccumulator < -THRESHOLD) {
              currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
              updateImage();
              wheelAccumulator = 0;
            }
          }
        }

        function toggleFullscreen() {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            viewerContainer.requestFullscreen().catch(err => {
              console.error(\`Error attempting to enable fullscreen: \${err.message} (\${err.name}).\`);
            });
          }
        }

        // Initial image display
        updateImage();

        // Event Listeners
        viewerContainer.addEventListener('mousedown', handleMouseDown);
        viewerContainer.addEventListener('mousemove', handleMouseMove);
        viewerContainer.addEventListener('mouseup', handleMouseUp);
        viewerContainer.addEventListener('mouseleave', handleMouseUp);
        viewerContainer.addEventListener('touchstart', handleMouseDown);
        viewerContainer.addEventListener('touchmove', handleMouseMove);
        viewerContainer.addEventListener('touchend', handleMouseUp);
        viewerContainer.addEventListener('touchcancel', handleMouseUp);
        viewerContainer.addEventListener('wheel', handleWheel, { passive: false });

        if (slider) slider.addEventListener('input', handleSliderChange);
        if (fullscreenButton) fullscreenButton.addEventListener('click', toggleFullscreen);

        // Fullscreen change listener for dynamic styling
        document.addEventListener('fullscreenchange', () => {
          if (document.fullscreenElement === viewerContainer) {
            viewerContainer.style.position = 'fixed';
            viewerContainer.style.inset = '0';
            viewerContainer.style.zIndex = '50';
            viewerContainer.style.borderRadius = '0';
          } else {
            viewerContainer.style.position = 'relative';
            viewerContainer.style.inset = 'auto';
            viewerContainer.style.zIndex = 'auto';
            viewerContainer.style.borderRadius = '0.5rem';
          }
        });
      })();
    </script>
  `;

  return `
    <div
      class="viewer-360-container"
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;
        padding: ${padding};
        background-color: ${config.backgroundColor};
        color: ${config.textColor};
        cursor: grab;
        align-items: ${contentAlignment.alignItems};
        text-align: ${contentAlignment.textAlign};
        justify-content: ${verticalAlignment};
        box-shadow: ${shadowStyle};
        border: ${borderStyle};
        ${widthStyle.maxWidth ? `max-width: ${widthStyle.maxWidth}; margin: ${widthStyle.margin};` : ''}
      "
    >
      ${config.companyLogoUrl ? `
        <img
          src="${escapeHtml(config.companyLogoUrl)}"
          alt="Company Logo"
          style="
            position: absolute;
            top: 1rem;
            left: 1rem;
            height: 2.5rem;
            width: auto;
            object-fit: contain;
            border-radius: 0.375rem;
            z-index: 10;
          "
          onerror="this.onerror=null;this.src='https://placehold.co/100x40/EBE9E1/8E8D8A?text=Logo';"
        />
      ` : ''}
      <h3
        style="
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: ${config.titleColor};
        "
      >
        ${escapeHtml(config.title)}
      </h3>
      <p style="margin-bottom: 1.5rem;">${escapeHtml(config.description)}</p>

      <div
        class="image-display-area"
        style="
          position: relative;
          width: 100%;
          height: auto;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <img
          class="viewer-360-image"
          src="${config.viewer360.images[config.viewer360.initialImageIndex] || ''}"
          alt="360° Produktansicht"
          style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          "
          onerror="this.onerror=null;this.src='https://placehold.co/400x400/D8C3A5/8E8D8A?text=Bild+Fallback';"
        />
      </div>

      ${config.viewer360.images.length > 1 ? `
        <div
          style="
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 75%;
            max-width: 24rem;
            --accent-color: ${config.accentColor};
          "
        >
          <input
            type="range"
            min="0"
            max="${config.viewer360.images.length - 1}"
            value="${config.viewer360.initialImageIndex}"
            class="viewer-360-slider slider-thumb-sleek"
            style="
              width: 100%;
              height: 0.5rem;
              background-color: #e2e8f0;
              border-radius: 0.5rem;
              -webkit-appearance: none;
              appearance: none;
              cursor: pointer;
            "
          />
          <div
            class="image-counter"
            style="
              text-align: center;
              font-size: 0.875rem;
              margin-top: 0.25rem;
              color: #8E8D8A;
            "
          >
            Bild ${config.viewer360.initialImageIndex + 1} / ${config.viewer360.images.length}
          </div>
        </div>
      ` : ''}

      ${config.viewer360.images.length > 0 ? `
        <button
          class="fullscreen-toggle"
          style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
            padding: 0.5rem;
            border-radius: 9999px;
            z-index: 20;
            transition: background-color 0.3s;
            border: none;
            cursor: pointer;
          "
          aria-label="Vollbild aktivieren"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 1.5rem; width: 1.5rem;"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
            />
          </svg>
        </button>
      ` : ''}
    </div>
    ${jsCode}
  `;
};

// Function to generate HTML for Hotspot Graphic
const generateHotspotGraphicHtml = (config) => {
  const shadowStyle = getShadowStyle(config.shadowEffect);
  const borderStyle = getBorderStyle(config.borderStyle, config.borderColor);
  const verticalAlignment = getVerticalAlignmentStyle(config.verticalAlignment);
  const contentAlignment = getContentAlignmentStyle(config.contentAlignment);
  const padding = getPaddingStyle(config.paddingSize);
  const widthStyle = getWidthStyle(config.moduleWidth);

  const svgIcons = {
    star: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1rem; width: 1rem;" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" style="height: 1rem; width: 1rem;" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9.293 9.293a1 1 0 000 1.414L10.586 12l-1.293 1.293a1 1 0 101.414 1.414L12 13.414l1.293 1.293a1 1 0 001.414-1.414L13.414 12l1.293-1.293a1 1 0 00-1.414-1.414L12 10.586l-1.293-1.293a1 1 0 00-1.414 0z" clip-rule="evenodd" /></svg>`,
  };

  const hotspotsHtml = config.hotspotGraphic.hotspots.map((hotspot) => {
    let iconContent = '';
    if (hotspot.iconType === 'number') {
      iconContent = hotspot.id;
    } else if (hotspot.iconType === 'star') {
      iconContent = svgIcons.star;
    } else if (hotspot.iconType === 'info') {
      iconContent = svgIcons.info;
    } else if (hotspot.iconType === 'custom' && hotspot.svgCode) {
      iconContent = hotspot.svgCode;
    }

    return `
      <div
        class="hotspot-item"
        tabindex="0"
        style="
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
          font-weight: bold;
          transition: all 0.3s;
          cursor: pointer;
          outline: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          background-color: ${config.accentColor};
          left: ${hotspot.x}%;
          top: ${hotspot.y}%;
          transform: translate(-50%, -50%);
        "
      >
        ${iconContent}
        <div
          class="hotspot-info-box"
          style="
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 0.5rem;
            padding: 0.75rem 1.25rem;
            background-color: #374151;
            color: white;
            font-size: 0.875rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(44,44,44,0.22);
            white-space: nowrap;
            z-index: 20;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.22s cubic-bezier(.4,0,.2,1);
          "
        >
          <span style="font-weight: semibold;">${escapeHtml(hotspot.title)}:</span> ${escapeHtml(hotspot.description)}
          <div
            style="
              position: absolute;
              left: 50%;
              top: 100%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid #374151;
            "
          ></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <style>
      /* Hotspot Hover Feedback */
      .hotspot-item {
        transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.2s cubic-bezier(.4,0,.2,1);
      }
      .hotspot-item:hover,
      .hotspot-item:focus {
        transform: scale(1.18);
        box-shadow: 0 8px 18px -2px rgba(44,44,44,0.25), 0 2px 6px -1px rgba(44,44,44,0.13);
        z-index: 25;
        cursor: pointer;
      }

      /* Info Box Animation */
      .hotspot-info-box {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.22s cubic-bezier(.4,0,.2,1);
      }
      .hotspot-item:hover .hotspot-info-box,
      .hotspot-item:focus .hotspot-info-box {
        opacity: 1;
        pointer-events: auto;
      }
    </style>
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;
        padding: ${padding};
        background-color: ${config.backgroundColor};
        color: ${config.textColor};
        align-items: ${contentAlignment.alignItems};
        text-align: ${contentAlignment.textAlign};
        justify-content: ${verticalAlignment};
        box-shadow: ${shadowStyle};
        border: ${borderStyle};
        ${widthStyle.maxWidth ? `max-width: ${widthStyle.maxWidth}; margin: ${widthStyle.margin};` : ''}
      "
    >
      ${config.companyLogoUrl ? `
        <img
          src="${escapeHtml(config.companyLogoUrl)}"
          alt="Company Logo"
          style="
            position: absolute;
            top: 1rem;
            left: 1rem;
            height: 2.5rem;
            width: auto;
            object-fit: contain;
            border-radius: 0.375rem;
            z-index: 10;
          "
          onerror="this.onerror=null;this.src='https://placehold.co/100x40/EBE9E1/8E8D8A?text=Logo';"
        />
      ` : ''}
      <h3
        style="
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: ${config.titleColor};
        "
      >
        ${escapeHtml(config.title)}
      </h3>
      <p style="margin-bottom: 1.5rem;">${escapeHtml(config.description)}</p>

      <div
        style="
          position: relative;
          width: 100%;
          height: auto;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <img
          src="${escapeHtml(config.hotspotGraphic.backgroundImage)}"
          alt="Hotspot Hintergrund"
          style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          "
          onerror="this.onerror=null;this.src='https://placehold.co/600x400/D8C3A5/8E8D8A?text=Hintergrund';"
        />
        ${hotspotsHtml}
      </div>
    </div>
  `;
};

// Main function to generate HTML based on module type
export const generateModuleHtml = (moduleType, config) => {
  let htmlContent = '';
  switch (moduleType) {
    case 'feature-slider':
      htmlContent = generateFeatureSliderHtml(config);
      break;
    case '360-viewer':
      htmlContent = generateViewer360Html(config);
      break;
    case 'hotspot-graphic':
      htmlContent = generateHotspotGraphicHtml(config);
      break;
    default:
      htmlContent = '<div>Modultyp nicht gefunden.</div>';
  }

  // Wrap the generated module HTML in a basic HTML document structure
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exportiertes Varia Modul - ${moduleType}</title>
    <style>
        body {
            margin: 0;
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0; /* Neutral background for exported module */
        }
        /* Add any global styles or animations needed for the module here */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
};
