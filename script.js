// Archivo JavaScript para funcionalidades adicionales

document.addEventListener("DOMContentLoaded", () => {
  // Animación para el botón de WhatsApp después de 3 segundos
  setTimeout(() => {
    const whatsappFloat = document.querySelector(".whatsapp-float")
    if (whatsappFloat) {
      whatsappFloat.classList.add("animated")
    }
  }, 3000)

  // Mejora para las animaciones de scroll
  const scrollElements = document.querySelectorAll(".scroll-animation")

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
  }

  const displayScrollElement = (element) => {
    element.classList.add("active")
  }

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el)
      }
    })
  }

  window.addEventListener("scroll", () => {
    handleScrollAnimation()
  })

  // Trigger on page load
  handleScrollAnimation()

  // Header scroll effect
  const header = document.getElementById("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Script para el menú móvil
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll("nav ul li a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
    })
  })
})

