// Archivo JavaScript para el slider de proyectos

document.addEventListener("DOMContentLoaded", function() {
  // Inicializar el slider de proyectos
  initProjectSlider();
});

function initProjectSlider() {
  // Verificar si existe el contenedor del slider
  const sliderContainer = document.querySelector('.project-slider-container');
  if (!sliderContainer) return;

  const slider = sliderContainer.querySelector('.project-slider');
  const slides = slider.querySelectorAll('.project-slide');
  const totalSlides = slides.length;
  
  if (totalSlides <= 1) return; // No inicializar si solo hay una o ninguna diapositiva
  
  // Variables para controlar el slider
  let currentSlide = 0;
  let isAnimating = false;
  const animationDuration = 600; // Duración de la animación en ms
  const autoplayInterval = 5000; // Intervalo de cambio automático en ms
  let autoplayTimer;
  
  // Crear indicadores de navegación
  createSliderNavigation(sliderContainer, totalSlides);
  const indicators = sliderContainer.querySelectorAll('.slider-indicator');
  
  // Crear botones de navegación
  createSliderControls(sliderContainer);
  const prevButton = sliderContainer.querySelector('.slider-prev');
  const nextButton = sliderContainer.querySelector('.slider-next');
  
  // Configurar el slider inicialmente
  updateSlider();
  startAutoplay();
  
  // Event listeners para los controles
  prevButton.addEventListener('click', () => {
    if (isAnimating) return;
    stopAutoplay();
    goToPrevSlide();
    startAutoplay();
  });
  
  nextButton.addEventListener('click', () => {
    if (isAnimating) return;
    stopAutoplay();
    goToNextSlide();
    startAutoplay();
  });
  
  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      if (isAnimating || currentSlide === index) return;
      stopAutoplay();
      goToSlide(index);
      startAutoplay();
    });
  });
  
  // Pausar autoplay al pasar el mouse por encima
  sliderContainer.addEventListener('mouseenter', stopAutoplay);
  sliderContainer.addEventListener('mouseleave', startAutoplay);
  
  // Soporte para gestos táctiles
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Deslizar a la izquierda (siguiente)
      if (!isAnimating) {
        stopAutoplay();
        goToNextSlide();
        startAutoplay();
      }
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Deslizar a la derecha (anterior)
      if (!isAnimating) {
        stopAutoplay();
        goToPrevSlide();
        startAutoplay();
      }
    }
  }
  
  // Funciones para controlar el slider
  function goToNextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }
  
  function goToPrevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }
  
  function goToSlide(index) {
    if (index === currentSlide || isAnimating) return;
    
    isAnimating = true;
    
    // Ocultar slide actual
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('leaving');
    
    // Mostrar nuevo slide
    slides[index].classList.add('entering');
    
    // Actualizar indicadores
    indicators[currentSlide].classList.remove('active');
    indicators[index].classList.add('active');
    
    // Esperar a que termine la animación
    setTimeout(() => {
      slides[currentSlide].classList.remove('leaving');
      slides[index].classList.remove('entering');
      slides[index].classList.add('active');
      
      currentSlide = index;
      isAnimating = false;
    }, animationDuration);
  }
  
  function updateSlider() {
    // Configurar el primer slide como activo
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  function startAutoplay() {
    stopAutoplay(); // Evitar múltiples intervalos
    autoplayTimer = setInterval(goToNextSlide, autoplayInterval);
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  function createSliderNavigation(container, count) {
    const navContainer = document.createElement('div');
    navContainer.className = 'slider-indicators';
    
    for (let i = 0; i < count; i++) {
      const indicator = document.createElement('button');
      indicator.className = 'slider-indicator';
      indicator.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
      navContainer.appendChild(indicator);
    }
    
    container.appendChild(navContainer);
  }
  
  function createSliderControls(container) {
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-control slider-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Proyecto anterior');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-control slider-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Proyecto siguiente');
    
    container.appendChild(prevButton);
    container.appendChild(nextButton);
  }
}
