/**
 * Vista para la página de servicios
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class ServicesView extends BaseView {
    constructor() {
        super('main-content');
        this.services = [];
    }

    /**
     * Renderiza la página de servicios
     */
    renderServices() {
        this.showLoading();
        
        try {
            this.services = Service.createServices();
            
            const servicesHtml = `
                <section class="page-header">
                    <div class="container">
                        <h1>Nuestros Servicios</h1>
                        <p>Ofrecemos soluciones tecnológicas completas para impulsar tu negocio</p>
                    </div>
                </section>

                <section class="services-content">
                    <div class="container">
                        <div class="services-intro">
                            <h2>¿Qué Ofrecemos?</h2>
                            <p>En DevTeam, combinamos experiencia técnica con enfoque en resultados para ofrecer servicios que realmente marquen la diferencia en tu proyecto. Desde la conceptualización hasta el despliegue y mantenimiento.</p>
                        </div>

                        <div class="services-grid">
                            ${this.renderServicesGrid()}
                        </div>

                        <div class="services-process">
                            <h2>Nuestro Proceso</h2>
                            <div class="process-steps">
                                <div class="process-step">
                                    <div class="step-number">1</div>
                                    <h3>Análisis</h3>
                                    <p>Entendemos tus necesidades y objetivos específicos</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">2</div>
                                    <h3>Planificación</h3>
                                    <p>Diseñamos la arquitectura y estrategia del proyecto</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">3</div>
                                    <h3>Desarrollo</h3>
                                    <p>Implementamos la solución con las mejores prácticas</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">4</div>
                                    <h3>Entrega</h3>
                                    <p>Desplegamos y aseguramos el funcionamiento óptimo</p>
                                </div>
                            </div>
                        </div>

                        <div class="contact-cta">
                            <h2>¿Interesado en Nuestros Servicios?</h2>
                            <p>Contáctanos para discutir tu proyecto y obtener una cotización personalizada</p>
                            <button class="btn-primary" data-page="contacto">Contactar Ahora</button>
                        </div>
                    </div>
                </section>
            `;

            this.render(servicesHtml);
        } catch (error) {
            console.error('Error loading services:', error);
            this.showError('Error al cargar los servicios');
        }
    }

    /**
     * Renderiza la grilla de servicios
     */
    renderServicesGrid() {
        return this.services.map(service => `
            <div class="service-card">
                <div class="service-header">
                    <div class="service-icon">${service.icon}</div>
                    <h3>${this.escapeHtml(service.title)}</h3>
                    <div class="service-price">${service.getFormattedPrice()}</div>
                </div>
                
                <div class="service-content">
                    <p class="service-description">${this.escapeHtml(service.description)}</p>
                    
                    <div class="service-features">
                        <h4>Características:</h4>
                        <ul>
                            ${service.features.map(feature => 
                                `<li>${this.escapeHtml(feature)}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-technologies">
                        <h4>Tecnologías:</h4>
                        <div class="tech-tags">
                            ${service.technologies.map(tech => 
                                `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="service-meta">
                        <span class="service-duration">
                            <strong>Duración:</strong> ${service.duration || 'A definir'}
                        </span>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button class="btn-secondary" data-action="request-quote" data-service-id="${service.id}">
                        Solicitar Cotización
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Hook después de renderizar
     */
    afterRender() {
        // Configurar navegación
        this.addEventListeners('[data-page]', 'click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page && window.navigationController) {
                window.navigationController.navigateTo(page);
            }
        });

        // Configurar botones de cotización
        this.addEventListeners('[data-action="request-quote"]', 'click', (e) => {
            const serviceId = e.target.getAttribute('data-service-id');
            this.requestQuote(serviceId);
        });
    }

    /**
     * Maneja la solicitud de cotización
     */
    requestQuote(serviceId) {
        const service = this.services.find(s => s.id == serviceId);
        if (service && window.navigationController) {
            // Navegar a contacto con información del servicio
            window.navigationController.navigateTo('contacto', { service: service.title });
        }
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Servicios';
    }
}