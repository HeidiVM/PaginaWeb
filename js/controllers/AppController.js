/**
 * Controlador principal de la aplicación
 * Principios SOLID aplicados:
 * - Single Responsibility: Orquesta la aplicación y maneja el estado global
 * - Dependency Inversion: Depende de abstracciones, no implementaciones concretas
 * - Open/Closed: Abierto para extensión, cerrado para modificación
 */
class AppController {
    constructor() {
        this.isInitialized = false;
        this.config = {
            version: '1.0.0',
            environment: 'production',
            enableAnalytics: false,
            enableServiceWorker: false
        };
        this.services = new Map();
        this.eventListeners = new Map();
    }

    /**
     * Inicializa la aplicación
     */
    async initialize() {
        if (this.isInitialized) {
            console.warn('Application already initialized');
            return;
        }

        try {
            console.log('Initializing DevTeam Application v' + this.config.version);
            
            // 1. Inicializar servicios core
            await this.initializeServices();
            
            // 2. Configurar manejo global de errores
            this.setupErrorHandling();
            
            // 3. Inicializar controlador de navegación
            await this.initializeNavigation();
            
            // 4. Configurar event listeners globales
            this.setupGlobalEventListeners();
            
            // 5. Inicializar características opcionales
            await this.initializeOptionalFeatures();
            
            // 6. Marcar como inicializado
            this.isInitialized = true;
            
            // 7. Disparar evento de inicialización completa
            this.dispatchAppEvent('initialized');
            
            console.log('DevTeam Application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Inicializa servicios core de la aplicación
     */
    async initializeServices() {
        // Servicio de configuración
        this.services.set('config', {
            get: (key) => this.config[key],
            set: (key, value) => { this.config[key] = value; },
            getAll: () => ({ ...this.config })
        });

        // Servicio de storage local
        this.services.set('storage', {
            get: (key) => {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                } catch (error) {
                    console.error('Error reading from storage:', error);
                    return null;
                }
            },
            set: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (error) {
                    console.error('Error writing to storage:', error);
                    return false;
                }
            },
            remove: (key) => localStorage.removeItem(key),
            clear: () => localStorage.clear()
        });

        // Servicio de analytics (mock)
        this.services.set('analytics', {
            track: (event, data = {}) => {
                if (this.config.enableAnalytics) {
                    console.log('Analytics event:', event, data);
                }
            },
            trackPageView: (page) => {
                if (this.config.enableAnalytics) {
                    console.log('Page view:', page);
                }
            }
        });

        // Servicio de notificaciones
        this.services.set('notifications', {
            show: (message, type = 'info', duration = 5000) => {
                this.showNotification(message, type, duration);
            },
            showError: (message) => {
                this.showNotification(message, 'error', 8000);
            },
            showSuccess: (message) => {
                this.showNotification(message, 'success', 4000);
            }
        });
    }

    /**
     * Inicializa el controlador de navegación
     */
    async initializeNavigation() {
        this.navigationController = new NavigationController();
        
        // Exponer globalmente para acceso desde vistas
        window.navigationController = this.navigationController;
        
        // Configurar tracking de navegación
        document.addEventListener('navigation', (e) => {
            const analytics = this.services.get('analytics');
            analytics.trackPageView(e.detail.page);
        });
        
        // Inicializar navegación
        this.navigationController.initialize();
    }

    /**
     * Configura manejo global de errores
     */
    setupErrorHandling() {
        // Errores de JavaScript no capturados
        window.addEventListener('error', (e) => {
            console.error('Global JavaScript error:', e.error);
            this.handleGlobalError(e.error);
        });

        // Promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleGlobalError(e.reason);
        });

        // Errores de recursos (imágenes, scripts, etc.)
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                console.warn('Resource loading error:', e.target.src || e.target.href);
                this.handleResourceError(e.target);
            }
        }, true);
    }

    /**
     * Configura event listeners globales
     */
    setupGlobalEventListeners() {
        // Manejar cambio de visibilidad de la página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });

        // Manejar redimensionado de ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleWindowResize();
            }, 250);
        });

        // Manejar scroll para efectos
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });

        // Atajos de teclado globales
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeydown(e);
        });
    }

    /**
     * Inicializa características opcionales
     */
    async initializeOptionalFeatures() {
        // Service Worker (si está habilitado)
        if (this.config.enableServiceWorker && 'serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered');
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }

        // Configurar tema basado en preferencias del usuario
        this.initializeTheme();

        // Configurar preferencias de accesibilidad
        this.initializeAccessibility();
    }

    /**
     * Inicializa el sistema de temas
     */
    initializeTheme() {
        const storage = this.services.get('storage');
        const savedTheme = storage.get('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);

        // Escuchar cambios en preferencias del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            if (!storage.get('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Inicializa características de accesibilidad
     */
    initializeAccessibility() {
        // Configurar navegación por teclado mejorada
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.body.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Configurar anuncios para lectores de pantalla
        this.setupScreenReaderAnnouncements();
    }

    /**
     * Configura anuncios para lectores de pantalla
     */
    setupScreenReaderAnnouncements() {
        // Crear región ARIA para anuncios
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-label', 'Announcements');
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.overflow = 'hidden';
        document.body.appendChild(announcer);

        this.screenReaderAnnouncer = announcer;

        // Anunciar cambios de página
        document.addEventListener('navigation', (e) => {
            const pageNames = {
                'inicio': 'Página de inicio',
                'servicios': 'Página de servicios',
                'proyectos': 'Página de proyectos',
                'blog': 'Blog',
                'equipo': 'Página del equipo',
                'contacto': 'Página de contacto'
            };
            
            const pageName = pageNames[e.detail.page] || e.detail.page;
            this.announceToScreenReader(`Navegaste a ${pageName}`);
        });
    }

    /**
     * Anuncia mensaje a lectores de pantalla
     */
    announceToScreenReader(message) {
        if (this.screenReaderAnnouncer) {
            this.screenReaderAnnouncer.textContent = message;
            setTimeout(() => {
                this.screenReaderAnnouncer.textContent = '';
            }, 1000);
        }
    }

    /**
     * Establece el tema de la aplicación
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const storage = this.services.get('storage');
        storage.set('theme', theme);
        
        this.dispatchAppEvent('themeChanged', { theme });
    }

    /**
     * Maneja errores globales
     */
    handleGlobalError(error) {
        const notifications = this.services.get('notifications');
        
        // No mostrar notificación para todos los errores, solo los críticos
        if (this.isCriticalError(error)) {
            notifications.showError('Ha ocurrido un error inesperado. Por favor recarga la página.');
        }
        
        // Log del error para debugging
        console.error('Application error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            page: this.navigationController?.getCurrentPage(),
            userAgent: navigator.userAgent
        });
    }

    /**
     * Maneja errores de recursos
     */
    handleResourceError(element) {
        if (element.tagName === 'IMG') {
            // Reemplazar imágenes rotas con placeholder
            element.src = 'assets/images/placeholder.jpg';
            element.onerror = null;
        }
    }

    /**
     * Determina si un error es crítico
     */
    isCriticalError(error) {
        const criticalPatterns = [
            /network/i,
            /fetch/i,
            /cannot read property/i,
            /is not defined/i
        ];
        
        return criticalPatterns.some(pattern => 
            pattern.test(error.message || error.toString())
        );
    }

    /**
     * Maneja inicialización fallida
     */
    handleInitializationError(error) {
        document.body.innerHTML = `
            <div class="initialization-error">
                <h1>🚨 Error de Inicialización</h1>
                <p>La aplicación no pudo inicializarse correctamente.</p>
                <button onclick="window.location.reload()" class="btn-primary">
                    Recargar Página
                </button>
                <details style="margin-top: 20px;">
                    <summary>Detalles técnicos</summary>
                    <pre>${error.stack || error.message}</pre>
                </details>
            </div>
        `;
    }

    /**
     * Maneja eventos de teclado globales
     */
    handleGlobalKeydown(e) {
        // Atajos de teclado
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    // Abrir búsqueda rápida (futuro feature)
                    console.log('Quick search shortcut');
                    break;
                case '/':
                    e.preventDefault();
                    // Ir a contacto
                    this.navigationController?.navigateTo('contacto');
                    break;
            }
        }

        // Escape para cerrar modales
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => modal.remove());
        }
    }

    /**
     * Maneja cuando la página se oculta
     */
    handlePageHidden() {
        // Pausar animaciones, videos, etc.
        console.log('Page hidden');
    }

    /**
     * Maneja cuando la página se vuelve visible
     */
    handlePageVisible() {
        // Reanudar animaciones, sincronizar datos, etc.
        console.log('Page visible');
    }

    /**
     * Maneja redimensionado de ventana
     */
    handleWindowResize() {
        // Actualizar layouts, recalcular dimensiones, etc.
        this.dispatchAppEvent('windowResized', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    /**
     * Maneja scroll de la página
     */
    handleScroll() {
        const scrollY = window.scrollY;
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    /**
     * Muestra notificación
     */
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Agregar al DOM
        let container = document.querySelector('.notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);

        // Auto-remover después del tiempo especificado
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        // Remover al hacer click en cerrar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }

    /**
     * Remueve notificación
     */
    removeNotification(notification) {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    /**
     * Dispara evento personalizado de aplicación
     */
    dispatchAppEvent(eventName, data = {}) {
        const event = new CustomEvent(`app:${eventName}`, {
            detail: {
                ...data,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Obtiene servicio por nombre
     */
    getService(name) {
        return this.services.get(name);
    }

    /**
     * Obtiene información de la aplicación
     */
    getAppInfo() {
        return {
            version: this.config.version,
            initialized: this.isInitialized,
            currentPage: this.navigationController?.getCurrentPage(),
            services: Array.from(this.services.keys())
        };
    }
}