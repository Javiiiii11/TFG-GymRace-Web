document.addEventListener('DOMContentLoaded', function() {
    // Configuración de tipos de cookies
    const cookieTypes = {
        essential: {
            name: 'Cookies Esenciales',
            description: 'Cookies necesarias para el funcionamiento básico del sitio web.',
            required: true
        },
        analytics: {
            name: 'Cookies de Análisis',
            description: 'Cookies que nos ayudan a entender cómo interactúas con el sitio web.',
            required: false
        },
        marketing: {
            name: 'Cookies de Marketing',
            description: 'Cookies utilizadas para personalizar publicidad y contenido.',
            required: false
        }
    };

    // Función para crear estilos CSS dinámicos
    const createStyles = () => {
        if (!document.getElementById('cookie-consent-styles')) {
            const style = document.createElement('style');
            style.id = 'cookie-consent-styles';
            style.textContent = `
                /* Modal overlay styles */
                .cookie-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .cookie-modal-overlay.show {
                    opacity: 1;
                }

                /* Modal content styles */
                .cookie-modal-content {
                    background-color: white;
                    width: 100%;
                    max-width: 600px;
                    border-radius: 12px;
                    padding: 25px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 15px 50px rgba(0,0,0,0.2);
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }

                .cookie-modal-overlay.show .cookie-modal-content {
                    transform: scale(1);
                }

                /* Cookie consent banner styles */
                .cookie-consent-banner {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 40px);
                    max-width: 600px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    padding: 20px;
                    z-index: 1000;
                    border: 1px solid #e0e0e0;
                    opacity: 0;
                    transform: translateX(-50%) translateY(100px);
                    transition: all 0.3s ease;
                }

                .cookie-consent-banner.show {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }

                /* Cookie type item styles */
                .cookie-type-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 15px 0;
                    border-bottom: 1px solid #f0f0f0;
                    gap: 15px;
                }

                .cookie-type-item:last-child {
                    border-bottom: none;
                }

                .cookie-info {
                    flex: 1;
                }

                .cookie-info h4 {
                    margin: 0 0 5px 0;
                    color: #333;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .cookie-info p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                /* Toggle switch styles */
                .cookie-toggle {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 25px;
                    flex-shrink: 0;
                }

                .cookie-toggle input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #e0e0e0;
                    transition: 0.3s;
                    border-radius: 25px;
                }

                .toggle-slider:before {
                    position: absolute;
                    content: "";
                    height: 21px;
                    width: 21px;
                    left: 2px;
                    top: 2px;
                    background-color: white;
                    transition: 0.3s;
                    border-radius: 50%;
                }

                input:checked + .toggle-slider {
                    background-color: #4285f4;
                }

                input:disabled + .toggle-slider {
                    background-color: #e0e0e0;
                    cursor: not-allowed;
                }

                input:checked + .toggle-slider:before {
                    transform: translateX(25px);
                }

                /* Button styles */
                .cookie-btn {
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                }

                .cookie-btn-primary {
                    background-color: #4285f4;
                    color: white;
                }

                .cookie-btn-primary:hover {
                    background-color: #3367d6;
                    transform: translateY(-1px);
                }

                .cookie-btn-secondary {
                    background-color: #f1f3f4;
                    color: #4285f4;
                }

                .cookie-btn-secondary:hover {
                    background-color: #e8eaed;
                }

                /* Action buttons container */
                .action-buttons {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }

                .consent-buttons {
                    display: flex;
                    gap: 15px;
                    width: 100%;
                    flex-wrap: wrap;
                }

                /* Responsive styles */
                @media (max-width: 768px) {
                    .cookie-modal-content {
                        padding: 20px;
                        margin: 10px;
                        max-height: 90vh;
                    }

                    .cookie-consent-banner {
                        bottom: 10px;
                        width: calc(100% - 20px);
                        padding: 15px;
                        border-radius: 8px;
                    }

                    .cookie-type-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }

                    .cookie-toggle {
                        align-self: flex-end;
                    }

                    .consent-buttons {
                        flex-direction: column;
                    }

                    .action-buttons {
                        flex-direction: column;
                    }

                    .cookie-btn {
                        width: 100%;
                        padding: 15px 20px;
                    }
                }

                @media (max-width: 480px) {
                    .cookie-modal-overlay {
                        padding: 10px;
                    }

                    .cookie-modal-content {
                        padding: 15px;
                    }

                    .cookie-consent-banner {
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        max-width: none;
                        transform: none;
                        border-radius: 0;
                        border-left: none;
                        border-right: none;
                        border-bottom: none;
                    }

                    .cookie-consent-banner.show {
                        transform: none;
                    }
                }

                /* Header styles */
                .modal-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }

                .modal-header h2 {
                    color: #333;
                    margin: 0;
                    font-size: 1.3rem;
                    font-weight: 600;
                }

                .consent-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .consent-header h3 {
                    color: #333;
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                .consent-text {
                    color: #666;
                    line-height: 1.5;
                    margin: 0 0 20px 0;
                }

                /* Icon styles */
                .cookie-icon {
                    width: 40px;
                    height: 40px;
                    color: #4285f4;
                    flex-shrink: 0;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Función para crear el modal de gestión de cookies
    const createCookieManagementModal = () => {
        // Crear estilos si no existen
        createStyles();

        // Crear el contenedor del modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'cookie-modal-overlay';
        modalOverlay.id = 'cookie-management-overlay';

        // Contenido del modal
        const modalContent = document.createElement('div');
        modalContent.className = 'cookie-modal-content';

        // Header del modal
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <svg class="cookie-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h2>Administración de Cookies</h2>
        `;

        // Contenedor de los tipos de cookies
        const cookieTypesContainer = document.createElement('div');

        // Crear opciones para cada tipo de cookie
        Object.keys(cookieTypes).forEach(type => {
            const cookieTypeItem = document.createElement('div');
            cookieTypeItem.className = 'cookie-type-item';

            // Información de la cookie
            const cookieInfo = document.createElement('div');
            cookieInfo.className = 'cookie-info';
            cookieInfo.innerHTML = `
                <h4>${cookieTypes[type].name}</h4>
                <p>${cookieTypes[type].description}</p>
            `;

            // Toggle para cookies
            const toggleContainer = document.createElement('label');
            toggleContainer.className = 'cookie-toggle';

            const cookieToggle = document.createElement('input');
            cookieToggle.type = 'checkbox';
            cookieToggle.id = `${type}-cookies`;

            const toggleSlider = document.createElement('span');
            toggleSlider.className = 'toggle-slider';

            // Configuración inicial de los toggles
            if (cookieTypes[type].required) {
                cookieToggle.checked = true;
                cookieToggle.disabled = true;
            } else {
                // Restaurar preferencias guardadas
                cookieToggle.checked = localStorage.getItem(`${type}Cookies`) === 'true';
            }

            toggleContainer.appendChild(cookieToggle);
            toggleContainer.appendChild(toggleSlider);

            cookieTypeItem.appendChild(cookieInfo);
            cookieTypeItem.appendChild(toggleContainer);
            cookieTypesContainer.appendChild(cookieTypeItem);
        });

        // Botones de acción
        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar todas';
        cancelButton.className = 'cookie-btn cookie-btn-secondary';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar Preferencias';
        saveButton.className = 'cookie-btn cookie-btn-primary';

        // Eventos de los botones
        cancelButton.addEventListener('click', () => {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(modalOverlay)) {
                    document.body.removeChild(modalOverlay);
                }
            }, 300);
        });

        saveButton.addEventListener('click', () => {
            // Guardar configuración de cookies
            Object.keys(cookieTypes).forEach(type => {
                if (!cookieTypes[type].required) {
                    const checkbox = document.getElementById(`${type}-cookies`);
                    localStorage.setItem(`${type}Cookies`, checkbox.checked);
                }
            });

            // Marcar cookies como configuradas
            localStorage.setItem('cookiesConfigured', 'true');

            // Cerrar modal
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(modalOverlay)) {
                    document.body.removeChild(modalOverlay);
                }
            }, 300);
        });

        actionButtons.appendChild(cancelButton);
        actionButtons.appendChild(saveButton);

        // Ensamblar modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(cookieTypesContainer);
        modalContent.appendChild(actionButtons);
        modalOverlay.appendChild(modalContent);

        // Cerrar modal al hacer clic fuera
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(modalOverlay)) {
                        document.body.removeChild(modalOverlay);
                    }
                }, 300);
            }
        });

        // Añadir al body y mostrar
        document.body.appendChild(modalOverlay);
        
        // Mostrar con animación
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 50);
    };

    // Función para crear el banner de consentimiento de cookies
    const createCookieConsent = () => {
        if (localStorage.getItem('cookiesAccepted') !== 'true' && 
            localStorage.getItem('cookiesConfigured') !== 'true') {
            
            // Crear estilos si no existen
            createStyles();

            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'cookie-consent-banner';
            cookieBanner.id = 'cookie-consent-banner';

            cookieBanner.innerHTML = `
                <div class="consent-header">
                    <svg class="cookie-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <h3>Consentimiento de Cookies</h3>
                </div>
                <p class="consent-text">
                    Este sitio web utiliza cookies para mejorar tu experiencia de navegación y ofrecerte contenido personalizado.
                </p>
                <div class="consent-buttons">
                    <button id="manage-cookies" class="cookie-btn cookie-btn-secondary">
                        Administrar
                    </button>
                    <button id="accept-cookies" class="cookie-btn cookie-btn-primary">
                        Aceptar Todas
                    </button>
                </div>
            `;

            document.body.appendChild(cookieBanner);

            // Mostrar banner con animación
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 100);

            // Manejar botón de aceptar
            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                // Aceptar todas las cookies por defecto
                Object.keys(cookieTypes).forEach(type => {
                    localStorage.setItem(`${type}Cookies`, 'true');
                });
                
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(cookieBanner)) {
                        document.body.removeChild(cookieBanner);
                    }
                }, 300);
            });

            // Manejar botón de administrar
            document.getElementById('manage-cookies').addEventListener('click', () => {
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(cookieBanner)) {
                        document.body.removeChild(cookieBanner);
                    }
                    createCookieManagementModal();
                }, 300);
            });
        }
    };

    // Función pública para abrir la configuración de cookies
    window.openCookieSettings = createCookieManagementModal;
    
    // Mostrar el modal de cookies después de 2 segundos
    setTimeout(createCookieConsent, 2000);
});

// Función para cambiar pestañas (mantener la funcionalidad existente)
function switchTab(tab) {
    // Remove active class from all tabs and content
    const mobileTab = document.querySelector('.mobile-tab');
    const desktopTab = document.querySelector('.desktop-tab');
    const mobileContent = document.getElementById('mobile-content');
    const desktopContent = document.getElementById('desktop-content');
    
    if (mobileTab) mobileTab.classList.remove('active');
    if (desktopTab) desktopTab.classList.remove('active');
    if (mobileContent) mobileContent.classList.remove('active');
    if (desktopContent) desktopContent.classList.remove('active');
    
    // Add active class to selected tab and content
    if (tab === 'mobile') {
        if (mobileTab) mobileTab.classList.add('active');
        if (mobileContent) mobileContent.classList.add('active');
    } else {
        if (desktopTab) desktopTab.classList.add('active');
        if (desktopContent) desktopContent.classList.add('active');
    }
}