document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('form-message');
    form.appendChild(messageContainer);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form fields
        if (!name || !email || !subject || !message) {
            showMessage('Por favor, complete todos los campos.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingrese un email válido.', 'error');
            return;
        }

        // If all validations pass, show success message
        showMessage('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.', 'success');

        // Optional: You could add actual form submission logic here
        // For example, using fetch to send data to a server
        form.reset(); // Clear form fields
    });

    function showMessage(text, type) {
        messageContainer.textContent = text;
        messageContainer.className = `form-message ${type}`;
        
        // Automatically remove message after 5 seconds
        setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = 'form-message';
        }, 5000);
    }
});