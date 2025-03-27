document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});