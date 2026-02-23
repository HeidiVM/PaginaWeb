/**
 * Punto de entrada principal de la aplicación DevTeam
 * Inicializa todos los componentes y controladores
 */

// Variables globales para la aplicación
let appController;
let navigationController;

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM loaded, initializing DevTeam application...');
        
        // Crear e inicializar el controlador principal
        appController = new AppController();
        await appController.initialize();
        
        // Exponer controladores globalmente para debugging y acceso desde consola
        window.appController = appController;
        window.navigationController = appController.navigationController;
        
        // Configurar eventos personalizados de la aplicación
        setupApplicationEvents();
        
        console.log('DevTeam application ready!');
        
    } catch (error) {
        console.error('Failed to initialize DevTeam application:', error);
        showFallbackUI(error);
    }
});

/**
 * Configura eventos personalizados de la aplicación
 */
function setupApplicationEvents() {
    // Evento cuando la aplicación se inicializa completamente
    document.addEventListener('app:initialized', (e) => {
        console.log('Application initialized at:', new Date(e.detail.timestamp));
        
        // Mostrar mensaje de bienvenida (opcional)
        if (window.location.search.includes('debug=true')) {
            const notifications = appController.getService('notifications');
            notifications.show('DevTeam application loaded successfully!', 'success');
        }
    });

    // Evento de cambio de tema
    document.addEventListener('app:themeChanged', (e) => {
        console.log('Theme changed to:', e.detail.theme);
    });

    // Evento de redimensionado de ventana
    document.addEventListener('app:windowResized', (e) => {
        console.log('Window resized to:', e.detail.width + 'x' + e.detail.height);
    });

    // Evento de navegación personalizado con analytics
    document.addEventListener('navigation', (e) => {
        const { page, previousPage, options } = e.detail;
        
        console.log(`Navigation: ${previousPage || 'unknown'} → ${page}`, options);
        
        // Actualizar meta tags dinámicamente
        updateMetaTags(page);
        
        // Guardar estado de navegación para restauración
        saveNavigationState(page, options);
    });
}

/**
 * Actualiza meta tags basado en la página actual
 */
function updateMetaTags(page) {
    const metaInfo = {
        inicio: {
            title: 'DevTeam - Equipo de Desarrollo Profesional',
            description: 'Somos un equipo de desarrolladores especializados en crear soluciones tecnológicas innovadoras. Desarrollo web, móvil y consultoría técnica.'
        },
        servicios: {
            title: 'Servicios - DevTeam',
            description: 'Conoce nuestros servicios de desarrollo web, aplicaciones móviles, DevOps y consultoría técnica. Soluciones personalizadas para tu proyecto.'
        },
        proyectos: {
            title: 'Proyectos - DevTeam',
            description: 'Descubre los proyectos que hemos desarrollado con pasión y dedicación. Casos de éxito en desarrollo web y móvil.'
        },
        blog: {
            title: 'Blog - DevTeam',
            description: 'Ideas, reflexiones y conocimientos de nuestro equipo de desarrollo. Artículos sobre tecnología, desarrollo y mejores prácticas.'
        },
        equipo: {
            title: 'Nuestro Equipo - DevTeam',
            description: 'Conoce a los profesionales que hacen posible cada proyecto. Desarrolladores experimentados y apasionados por la tecnología.'
        },
        contacto: {
            title: 'Contacto - DevTeam',
            description: '¿Tienes un proyecto en mente? Contáctanos y hagamos realidad tus ideas. Presupuesto gratuito y sin compromiso.'
        }
    };

    const info = metaInfo[page] || metaInfo.inicio;
    
    // Actualizar título
    document.title = info.title;
    
    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = info.description;

    // Actualizar Open Graph tags si existen
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = info.title;
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = info.description;
}

/**
 * Guarda el estado de navegación en localStorage
 */
function saveNavigationState(page, options) {
    const storage = appController.getService('storage');
    const navigationState = {
        currentPage: page,
        options: options,
        timestamp: Date.now()
    };
    
    storage.set('navigationState', navigationState);
}

/**
 * Restaura el estado de navegación si es apropiado
 */
function restoreNavigationState() {
    const storage = appController.getService('storage');
    const state = storage.get('navigationState');
    
    if (state) {
        const timeDifference = Date.now() - state.timestamp;
        const maxAge = 30 * 60 * 1000; // 30 minutos
        
        // Solo restaurar si el estado no es muy antiguo y no es la página actual
        if (timeDifference < maxAge && window.location.pathname === '/') {
            setTimeout(() => {
                navigationController.navigateTo(state.currentPage, state.options);
            }, 100);
        }
    }
}

/**
 * Muestra UI de respaldo en caso de error crítico
 */
function showFallbackUI(error) {
    document.body.innerHTML = `
        <div class="fallback-ui">
            <div class="fallback-content">
                <div class="fallback-header">
                    <h1>🚨 DevTeam</h1>
                    <p>Lo sentimos, hubo un problema al cargar la aplicación.</p>
                </div>
                
                <div class="fallback-actions">
                    <button onclick="window.location.reload()" class="fallback-btn primary">
                        🔄 Recargar Página
                    </button>
                    
                    <button onclick="window.location.href='mailto:info@devteam.com'" class="fallback-btn secondary">
                        📧 Reportar Problema
                    </button>
                </div>
                
                <div class="fallback-info">
                    <details>
                        <summary>Información técnica</summary>
                        <pre>${error.stack || error.message}</pre>
                    </details>
                </div>
            </div>
        </div>
        
        <style>
            .fallback-ui {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: white;
            }
            
            .fallback-content {
                text-align: center;
                padding: 2rem;
                max-width: 500px;
            }
            
            .fallback-header h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .fallback-header p {
                font-size: 1.1rem;
                opacity: 0.9;
                margin-bottom: 2rem;
            }
            
            .fallback-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            
            .fallback-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            
            .fallback-btn:hover {
                transform: translateY(-2px);
            }
            
            .fallback-btn.primary {
                background: white;
                color: #333;
            }
            
            .fallback-btn.secondary {
                background: rgba(255,255,255,0.2);
                color: white;
            }
            
            .fallback-info {
                opacity: 0.7;
            }
            
            .fallback-info details {
                text-align: left;
                margin-top: 1rem;
            }
            
            .fallback-info pre {
                background: rgba(0,0,0,0.2);
                padding: 1rem;
                border-radius: 4px;
                overflow-x: auto;
                font-size: 0.8rem;
            }
        </style>
    `;
}

/**
 * Utilidades para debugging disponibles en consola
 */
window.DevTeamUtils = {
    // Información de la aplicación
    getAppInfo: () => appController?.getAppInfo(),
    
    // Navegación programática
    goTo: (page, options) => navigationController?.navigateTo(page, options),
    
    // Obtener servicios
    getService: (name) => appController?.getService(name),
    
    // Cambiar tema
    setTheme: (theme) => appController?.setTheme(theme),
    
    // Mostrar notificación de prueba
    testNotification: (message = 'Test notification', type = 'info') => {
        const notifications = appController?.getService('notifications');
        notifications?.show(message, type);
    },
    
    // Obtener datos de muestra
    getSampleData: () => ({
        team: TeamMember.createTeam(),
        projects: Project.createSampleProjects(),
        blog: BlogPost.createSamplePosts(),
        services: Service.createServices()
    }),
    
    // Limpiar almacenamiento local
    clearStorage: () => {
        const storage = appController?.getService('storage');
        storage?.clear();
        console.log('Local storage cleared');
    }
};

// Mensaje de desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`
    🚀 DevTeam Application - Development Mode
    
    Utilidades disponibles en consola:
    - DevTeamUtils.getAppInfo() - Información de la app
    - DevTeamUtils.goTo('page') - Navegación programática
    - DevTeamUtils.setTheme('dark'|'light') - Cambiar tema
    - DevTeamUtils.testNotification() - Probar notificaciones
    - DevTeamUtils.getSampleData() - Obtener datos de muestra
    
    Controladores globales:
    - appController - Controlador principal
    - navigationController - Controlador de navegación
    `);
}