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

    // Función para crear el modal de gestión de cookies
    const createCookieManagementModal = () => {
        // Crear el contenedor del modal
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'cookie-management-overlay';
        modalOverlay.style.cssText = `
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
        `;

        // Contenido del modal
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: white;
            width: 90%;
            max-width: 600px;
            border-radius: 12px;
            padding: 25px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        `;

        // Título del modal
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Administración de Cookies';
        modalTitle.style.cssText = `
            color: #333;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 15px;
            margin-bottom: 20px;
        `;

        // Contenedor de los tipos de cookies
        const cookieTypesContainer = document.createElement('div');
        cookieTypesContainer.style.marginBottom = '20px';

        // Crear opciones para cada tipo de cookie
        Object.keys(cookieTypes).forEach(type => {
            const cookieTypeWrapper = document.createElement('div');
            cookieTypeWrapper.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid #f0f0f0;
            `;

            // Información de la cookie
            const cookieInfo = document.createElement('div');
            cookieInfo.innerHTML = `
                <strong>${cookieTypes[type].name}</strong>
                <p style="color: #666; margin-top: 5px; font-size: 0.9rem;">${cookieTypes[type].description}</p>
            `;

            // Toggle para cookies
            const cookieToggle = document.createElement('input');
            cookieToggle.type = 'checkbox';
            cookieToggle.id = `${type}-cookies`;
            cookieToggle.style.cssText = `
                appearance: none;
                width: 50px;
                height: 25px;
                background-color: ${cookieTypes[type].required ? '#e0e0e0' : '#e0e0e0'};
                border-radius: 25px;
                position: relative;
                cursor: ${cookieTypes[type].required ? 'not-allowed' : 'pointer'};
                transition: background-color 0.3s;
            `;

            // Configuración inicial de los toggles
            if (cookieTypes[type].required) {
                cookieToggle.checked = true;
                cookieToggle.disabled = true;
            } else {
                // Restaurar preferencias guardadas
                cookieToggle.checked = localStorage.getItem(`${type}Cookies`) === 'true';
            }

            // Crear efecto de toggle
            const toggleEffect = document.createElement('span');
            toggleEffect.style.cssText = `
                position: absolute;
                top: 2px;
                left: 2px;
                width: 21px;
                height: 21px;
                background-color: white;
                border-radius: 50%;
                transition: transform 0.3s;
                transform: ${cookieToggle.checked ? 'translateX(25px)' : 'translateX(0)'};
            `;

            cookieToggle.addEventListener('change', () => {
                toggleEffect.style.transform = cookieToggle.checked ? 'translateX(25px)' : 'translateX(0)';
                cookieToggle.style.backgroundColor = cookieToggle.checked ? '#4285f4' : '#e0e0e0';
                
                // Guardar preferencias
                if (!cookieTypes[type].required) {
                    localStorage.setItem(`${type}Cookies`, cookieToggle.checked);
                }
            });

            cookieTypeWrapper.appendChild(cookieInfo);
            cookieTypeWrapper.appendChild(cookieToggle);
            cookieToggle.appendChild(toggleEffect);
            cookieTypesContainer.appendChild(cookieTypeWrapper);
        });

        // Botones de acción
        const actionButtons = document.createElement('div');
        actionButtons.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        `;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.style.cssText = `
            background-color: #f1f3f4;
            color: #4285f4;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
        `;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar Preferencias';
        saveButton.style.cssText = `
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
        `;

        // Eventos de los botones
        cancelButton.addEventListener('click', () => {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
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

            // Cerrar modal
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        });

        actionButtons.appendChild(cancelButton);
        actionButtons.appendChild(saveButton);

        // Ensamblar modal
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(cookieTypesContainer);
        modalContent.appendChild(actionButtons);
        modalOverlay.appendChild(modalContent);

        // Añadir al body y mostrar
        document.body.appendChild(modalOverlay);
        
        // Mostrar con animación
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
        }, 50);
    };

    // Modificar la función de crear consentimiento de cookies
    const createCookieConsent = () => {
        if (localStorage.getItem('cookiesAccepted') !== 'true') {
            const cookieModal = document.createElement('div');
            cookieModal.id = 'cookie-consent-modal';
            cookieModal.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 600px;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                padding: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 15px;
                border: 1px solid #e0e0e0;
            `;

            cookieModal.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <h2 style="color: #333; margin: 0; font-size: 1.2rem;">Consentimiento de Cookies</h2>
                </div>
                <p style="color: #666; line-height: 1.5; margin: 0;">
                    Este sitio web utiliza cookies para mejorar tu experiencia de navegación.
                </p>
                <div style="display: flex; gap: 15px; width: 100%;">
                    <button id="manage-cookies" style="
                        flex: 1;
                        background-color: #f1f3f4;
                        color: #4285f4;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: background-color 0.3s ease;
                    ">
                        Administrar
                    </button>
                    <button id="accept-cookies" style="
                        flex: 1;
                        background-color: #4285f4;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: background-color 0.3s ease;
                    ">
                        Aceptar
                    </button>
                </div>
            `;

            document.body.appendChild(cookieModal);

            // Manejar botón de aceptar
            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                // Aceptar todas las cookies por defecto
                Object.keys(cookieTypes).forEach(type => {
                    localStorage.setItem(`${type}Cookies`, 'true');
                });
                cookieModal.style.display = 'none';
            });

            // Manejar botón de administrar
            document.getElementById('manage-cookies').addEventListener('click', createCookieManagementModal);
        }
    };
    
    // Mostrar el modal de cookies después de 2 segundos
    setTimeout(createCookieConsent, 2000);
});

function switchTab(tab) {
    // Remove active class from all tabs and content
    document.querySelector('.mobile-tab').classList.remove('active');
    document.querySelector('.desktop-tab').classList.remove('active');
    document.getElementById('mobile-content').classList.remove('active');
    document.getElementById('desktop-content').classList.remove('active');
    
    // Add active class to selected tab and content
    if (tab === 'mobile') {
        document.querySelector('.mobile-tab').classList.add('active');
        document.getElementById('mobile-content').classList.add('active');
    } else {
        document.querySelector('.desktop-tab').classList.add('active');
        document.getElementById('desktop-content').classList.add('active');
    }
}