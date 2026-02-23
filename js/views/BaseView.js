/**
 * Vista base que implementa comportamientos comunes
 * Principios SOLID aplicados:
 * - Single Responsibility: Maneja solo la lógica de presentación común
 * - Open/Closed: Cerrada para modificación, abierta para extensión
 * - Liskov Substitution: Las vistas derivadas pueden sustituir esta clase base
 */
class BaseView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
        this.isVisible = false;
    }

    /**
     * Método para mostrar la vista
     */
    show() {
        if (this.container) {
            this.container.style.display = 'block';
            this.isVisible = true;
            this.onShow();
        }
    }

    /**
     * Método para ocultar la vista
     */
    hide() {
        if (this.container) {
            this.container.style.display = 'none';
            this.isVisible = false;
            this.onHide();
        }
    }

    /**
     * Método para renderizar contenido HTML
     * @param {string} html - Contenido HTML a renderizar
     */
    render(html) {
        if (this.container) {
            this.container.innerHTML = html;
            this.afterRender();
        }
    }

    /**
     * Método para crear elemento HTML de manera segura
     * @param {string} tag - Tag del elemento
     * @param {object} attributes - Atributos del elemento
     * @param {string} content - Contenido del elemento
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'dataset') {
                Object.keys(attributes[key]).forEach(dataKey => {
                    element.dataset[dataKey] = attributes[key][dataKey];
                });
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });

        if (content) {
            element.innerHTML = content;
        }

        return element;
    }

    /**
     * Método para agregar event listeners de manera segura
     * @param {string} selector - Selector del elemento
     * @param {string} event - Tipo de evento
     * @param {function} handler - Función manejadora
     */
    addEventListeners(selector, event, handler) {
        const elements = this.container.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener(event, handler);
        });
    }

    /**
     * Método para limpiar recursos (remover event listeners, etc.)
     */
    cleanup() {
        if (this.container) {
            // Remover todos los event listeners clonando el elemento
            const newContainer = this.container.cloneNode(true);
            this.container.parentNode.replaceChild(newContainer, this.container);
            this.container = newContainer;
        }
        this.onCleanup();
    }

    /**
     * Método para mostrar loading state
     */
    showLoading() {
        const loadingHtml = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Cargando...</p>
            </div>
        `;
        this.render(loadingHtml);
    }

    /**
     * Método para mostrar error state
     * @param {string} message - Mensaje de error
     */
    showError(message = 'Ha ocurrido un error') {
        const errorHtml = `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
                <button class="btn-retry" onclick="window.location.reload()">
                    Reintentar
                </button>
            </div>
        `;
        this.render(errorHtml);
    }

    /**
     * Método para mostrar estado vacío
     * @param {string} message - Mensaje a mostrar
     */
    showEmpty(message = 'No hay datos disponibles') {
        const emptyHtml = `
            <div class="empty-container">
                <div class="empty-icon">📭</div>
                <p>${message}</p>
            </div>
        `;
        this.render(emptyHtml);
    }

    // Métodos de ciclo de vida que pueden ser sobrescritos por las clases hijas
    onShow() {
        // Hook para cuando se muestra la vista
    }

    onHide() {
        // Hook para cuando se oculta la vista
    }

    afterRender() {
        // Hook después de renderizar
    }

    onCleanup() {
        // Hook para limpieza personalizada
    }

    // Método utilitario para escapar HTML y prevenir XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Método utilitario para formatear fechas
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Método utilitario para truncar texto
    truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}