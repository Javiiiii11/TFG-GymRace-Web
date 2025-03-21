// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Cerrar todas las demás preguntas
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar la clase active en el elemento actual
                item.classList.toggle('active');
            });
        });
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial, .feature-detailed, .spec-item, .gallery-item, .info-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si el elemento está en el viewport
            if (position.top < window.innerHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar elementos con opacidad reducida
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial, .feature-detailed, .spec-item, .gallery-item, .info-item');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // Carousel automático para testimonios
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const testimonialWidth = testimonials[0].offsetWidth + 32; // Ancho + margen
        
        // Función para mover el slider
        const moveSlider = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonialSlider.scrollTo({
                left: currentIndex * testimonialWidth,
                behavior: 'smooth'
            });
        };
        
        // Iniciar el carousel automático
        setInterval(moveSlider, 5000);
    }
    
    // Contador animado para las descargas
    const downloadCount = document.querySelector('.download-count span');
    
    if (downloadCount) {
        const finalCount = parseInt(downloadCount.textContent);
        let currentCount = 0;
        const duration = 2000; // 2 segundos
        const increment = Math.ceil(finalCount / (duration / 20)); // Incremento cada 20ms
        
        const animateCount = () => {
            currentCount += increment;
            
            if (currentCount >= finalCount) {
                currentCount = finalCount;
                clearInterval(countInterval);
            }
            
            // Actualizar el texto con el formato adecuado
            const formattedCount = currentCount.toLocaleString();
            downloadCount.textContent = `${formattedCount}+ descargas`;
        };
        
        const countInterval = setInterval(animateCount, 20);
    }
    
    // Validación de formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Obtener los campos del formulario
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Validar el nombre (no vacío)
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'red';
                isValid = false;
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            // Validar el email (formato correcto)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            // Validar el mensaje (no vacío)
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'red';
                isValid = false;
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            // Si hay errores, prevenir el envío del formulario
            if (!isValid) {
                event.preventDefault();
                
                // Crear mensaje de error si no existe
                const errorDiv = document.querySelector('.error-message') || document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.backgroundColor = '#ea4335';
                errorDiv.style.color = 'white';
                errorDiv.style.padding = '1rem';
                errorDiv.style.borderRadius = '4px';
                errorDiv.style.marginBottom = '1.5rem';
                errorDiv.textContent = 'Por favor, completa correctamente todos los campos.';
                
                // Añadir el mensaje de error al principio del formulario
                if (!document.querySelector('.error-message')) {
                    contactForm.insertBefore(errorDiv, contactForm.firstChild);
                }
            }
        });
    }
    
    // Efecto hover para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    // Detectar la ruta actual para resaltar el enlace de navegación activo
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
            link.style.color = '#4285f4';
            link.style.fontWeight = '700';
        }
    });

    // Modal de cookies (opcional)
    const createCookieConsent = () => {
        // Verificar si ya se aceptaron las cookies
        if (localStorage.getItem('cookiesAccepted') !== 'true') {
            // Crear el elemento del modal
            const cookieModal = document.createElement('div');
            cookieModal.className = 'cookie-consent';
            cookieModal.style.position = 'fixed';
            cookieModal.style.bottom = '0';
            cookieModal.style.left = '0';
            cookieModal.style.right = '0';
            cookieModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            cookieModal.style.color = 'white';
            cookieModal.style.padding = '1rem 2rem';
            cookieModal.style.display = 'flex';
            cookieModal.style.justifyContent = 'space-between';
            cookieModal.style.alignItems = 'center';
            cookieModal.style.zIndex = '1000';
            
            // Añadir el contenido del modal
            cookieModal.innerHTML = `
                <p>Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas su uso.</p>
                <button id="accept-cookies" style="background-color: #4285f4; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Aceptar</button>
            `;
            
            // Añadir el modal al body
            document.body.appendChild(cookieModal);
            
            // Manejar el evento de clic en el botón de aceptar
            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieModal.style.display = 'none';
            });
        }
    };
    
    // Mostrar el modal de cookies después de 2 segundos
    setTimeout(createCookieConsent, 2000);
});