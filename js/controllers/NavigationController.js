/**
 * Controlador de navegación
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la navegación y routing
 * - Dependency Inversion: Depende de abstracciones (interfaces) no implementaciones
 */
class NavigationController {
    constructor() {
        this.currentPage = 'inicio';
        this.views = new Map();
        this.history = [];
        this.initializeViews();
        this.setupEventListeners();
    }

    /**
     * Inicializa todas las vistas
     * Principio Dependency Injection: Inyecta las dependencias necesarias
     */
    initializeViews() {
        try {
            this.views.set('inicio', new HomeView());
            this.views.set('servicios', new ServicesView());
            this.views.set('proyectos', new ProjectsView());
            this.views.set('blog', new BlogView());
            this.views.set('equipo', new TeamView());
            this.views.set('contacto', new ContactView());
        } catch (error) {
            console.error('Error initializing views:', error);
        }
    }

    /**
     * Configura los event listeners para la navegación
     */
    setupEventListeners() {
        // Manejar clicks en enlaces de navegación
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-page]');
            if (target) {
                e.preventDefault();
                const page = target.getAttribute('data-page');
                const options = this.extractOptionsFromTarget(target);
                this.navigateTo(page, options);
            }
        });

        // Manejar el botón atrás del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page, e.state.options, false);
            }
        });

        // Manejar navegación por teclado
        document.addEventListener('keydown', (e) => {
            // Alt + número para navegación rápida
            if (e.altKey && e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const pages = ['inicio', 'servicios', 'proyectos', 'blog', 'equipo', 'contacto'];
                const pageIndex = parseInt(e.key) - 1;
                if (pages[pageIndex]) {
                    this.navigateTo(pages[pageIndex]);
                }
            }
        });

        // Configurar hamburger menu para móviles
        this.setupMobileMenu();
    }

    /**
     * Configura el menú móvil
     */
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Cerrar menú al hacer click en un enlace
            document.addEventListener('click', (e) => {
                if (e.target.closest('.nav-link')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    /**
     * Extrae opciones adicionales del elemento target
     */
    extractOptionsFromTarget(target) {
        const options = {};
        
        // Extraer atributos data-*
        Object.keys(target.dataset).forEach(key => {
            if (key !== 'page') {
                options[key] = target.dataset[key];
            }
        });

        return Object.keys(options).length > 0 ? options : null;
    }

    /**
     * Navega a una página específica
     * @param {string} page - Nombre de la página
     * @param {object} options - Opciones adicionales
     * @param {boolean} addToHistory - Si agregar a la historia del navegador
     */
    navigateTo(page, options = null, addToHistory = true) {
        if (!this.isValidPage(page)) {
            console.error(`Page '${page}' is not valid`);
            return;
        }

        try {
            // Ocultar página actual
            const currentView = this.views.get(this.currentPage);
            if (currentView) {
                currentView.hide();
            }

            // Actualizar navegación activa
            this.updateActiveNavigation(page);

            // Mostrar nueva página
            const newView = this.views.get(page);
            if (newView) {
                newView.show();
                this.renderPage(page, options);
            }

            // Agregar al historial si es necesario
            if (addToHistory) {
                this.addToHistory(page, options);
            }

            // Actualizar página actual
            this.previousPage = this.currentPage;
            this.currentPage = page;

            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Trigger evento personalizado
            this.dispatchNavigationEvent(page, options);

        } catch (error) {
            console.error('Navigation error:', error);
            this.showErrorPage();
        }
    }

    /**
     * Renderiza la página específica
     */
    renderPage(page, options = null) {
        const view = this.views.get(page);
        if (!view) return;

        switch (page) {
            case 'inicio':
                view.renderHome();
                break;
            case 'servicios':
                view.renderServices();
                break;
            case 'proyectos':
                view.renderProjects();
                break;
            case 'blog':
                view.renderBlog();
                break;
            case 'equipo':
                view.renderTeam();
                break;
            case 'contacto':
                view.renderContact(options);
                break;
            default:
                console.warn(`No render method defined for page: ${page}`);
        }
    }

    /**
     * Valida si la página es válida
     */
    isValidPage(page) {
        return this.views.has(page);
    }

    /**
     * Actualiza la navegación activa
     */
    updateActiveNavigation(page) {
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    /**
     * Agrega la navegación al historial del navegador
     */
    addToHistory(page, options) {
        const state = { page, options };
        const url = page === 'inicio' ? '/' : `/${page}`;
        
        // Solo agregar si es diferente del estado actual
        if (history.state?.page !== page) {
            history.pushState(state, '', url);
        }

        // Mantener historial interno limitado
        this.history.push({ page, options, timestamp: Date.now() });
        if (this.history.length > 50) {
            this.history = this.history.slice(-25);
        }
    }

    /**
     * Dispara evento personalizado de navegación
     */
    dispatchNavigationEvent(page, options) {
        const event = new CustomEvent('navigation', {
            detail: {
                page,
                previousPage: this.previousPage,
                options,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Muestra página de error
     */
    showErrorPage() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-page">
                    <div class="error-content">
                        <h1>🚨 Error de Navegación</h1>
                        <p>Ha ocurrido un error al cargar la página.</p>
                        <button class="btn-primary" onclick="window.location.reload()">
                            Recargar Página
                        </button>
                        <button class="btn-secondary" onclick="window.navigationController.navigateTo('inicio')">
                            Ir a Inicio
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Navega hacia atrás en el historial
     */
    goBack() {
        if (this.history.length > 1) {
            // Remover página actual del historial
            this.history.pop();
            
            // Obtener página anterior
            const previousEntry = this.history[this.history.length - 1];
            if (previousEntry) {
                this.navigateTo(previousEntry.page, previousEntry.options, false);
            }
        } else {
            // Si no hay historial, ir a inicio
            this.navigateTo('inicio');
        }
    }

    /**
     * Obtiene la página actual
     */
    getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Obtiene el historial de navegación
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * Limpia el historial
     */
    clearHistory() {
        this.history = [];
    }

    /**
     * Preload de vistas para mejorar performance
     */
    preloadViews() {
        // Precargar datos de páginas que podrían ser visitadas pronto
        const criticalPages = ['servicios', 'proyectos', 'contacto'];
        
        criticalPages.forEach(page => {
            if (page !== this.currentPage) {
                // Simular precarga de datos
                setTimeout(() => {
                    console.log(`Preloading data for ${page}`);
                }, 100);
            }
        });
    }

    /**
     * Inicializa la aplicación con la página correcta
     */
    initialize() {
        // Determinar página inicial basada en URL
        const path = window.location.pathname;
        let initialPage = 'inicio';

        if (path && path !== '/') {
            const page = path.replace('/', '');
            if (this.isValidPage(page)) {
                initialPage = page;
            }
        }

        // Navegar a página inicial
        this.navigateTo(initialPage, null, false);
        
        // Configurar estado inicial del navegador
        const state = { page: initialPage, options: null };
        history.replaceState(state, '', path);

        // Precargar vistas críticas
        this.preloadViews();
    }
}