/**
 * Vista para la página de inicio
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class HomeView extends BaseView {
    constructor() {
        super('main-content');
    }

    /**
     * Renderiza la página de inicio
     */
    renderHome() {
        const homeHtml = `
            <section class="hero">
                <div class="hero-content">
                    <h1>Bienvenidos a DevTeam</h1>
                    <p>Somos un equipo de desarrollo especializado en crear soluciones tecnológicas innovadoras</p>
                    <button class="btn-primary" data-action="contact">Contáctanos</button>
                </div>
            </section>

            <section class="about">
                <div class="container">
                    <h2>Acerca de Nosotros</h2>
                    <p>DevTeam es un equipo multidisciplinario de desarrolladores apasionados por la tecnología. Nos especializamos en desarrollo web, aplicaciones móviles, y soluciones de software personalizadas.</p>
                    
                    <div class="features">
                        <div class="feature-card">
                            <div class="feature-icon">🎯</div>
                            <h3>Experiencia</h3>
                            <p>Más de 5 años desarrollando soluciones tecnológicas innovadoras para empresas de todos los tamaños.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💡</div>
                            <h3>Innovación</h3>
                            <p>Utilizamos las últimas tecnologías y mejores prácticas para crear productos de vanguardia.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">✨</div>
                            <h3>Calidad</h3>
                            <p>Código limpio, documentado y siguiendo estándares internacionales de desarrollo.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🤝</div>
                            <h3>Colaboración</h3>
                            <p>Trabajamos estrechamente con nuestros clientes para entender sus necesidades específicas.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="services-preview">
                <div class="container">
                    <h2>Nuestros Servicios</h2>
                    <p>Ofrecemos una amplia gama de servicios de desarrollo tecnológico</p>
                    
                    <div class="services-grid">
                        <div class="service-preview-card">
                            <div class="service-icon">🎨</div>
                            <h3>Desarrollo Frontend</h3>
                            <p>Interfaces modernas y responsivas</p>
                        </div>
                        
                        <div class="service-preview-card">
                            <div class="service-icon">⚙️</div>
                            <h3>Desarrollo Backend</h3>
                            <p>APIs robustas y escalables</p>
                        </div>
                        
                        <div class="service-preview-card">
                            <div class="service-icon">📱</div>
                            <h3>Apps Móviles</h3>
                            <p>Aplicaciones nativas y multiplataforma</p>
                        </div>
                        
                        <div class="service-preview-card">
                            <div class="service-icon">☁️</div>
                            <h3>DevOps & Cloud</h3>
                            <p>Infraestructura y despliegue automatizado</p>
                        </div>
                    </div>
                    
                    <div class="cta-section">
                        <button class="btn-secondary" data-page="servicios">Ver Todos los Servicios</button>
                    </div>
                </div>
            </section>

            <section class="projects-preview">
                <div class="container">
                    <h2>Proyectos Destacados</h2>
                    <p>Algunos de nuestros trabajos más recientes</p>
                    
                    <div class="projects-showcase" id="projects-showcase">
                        <!-- Los proyectos se cargarán dinámicamente -->
                    </div>
                    
                    <div class="cta-section">
                        <button class="btn-secondary" data-page="proyectos">Ver Todos los Proyectos</button>
                    </div>
                </div>
            </section>

            <section class="team-preview">
                <div class="container">
                    <h2>Conoce Nuestro Equipo</h2>
                    <p>Profesionales apasionados por la tecnología</p>
                    
                    <div class="team-showcase" id="team-showcase">
                        <!-- El equipo se cargará dinámicamente -->
                    </div>
                    
                    <div class="cta-section">
                        <button class="btn-secondary" data-page="equipo">Conocer al Equipo Completo</button>
                    </div>
                </div>
            </section>

            <section class="blog-preview">
                <div class="container">
                    <h2>Últimas Ideas del Blog</h2>
                    <p>Mantente al día con nuestras reflexiones y conocimientos</p>
                    
                    <div class="blog-showcase" id="blog-showcase">
                        <!-- Los posts del blog se cargarán dinámicamente -->
                    </div>
                    
                    <div class="cta-section">
                        <button class="btn-secondary" data-page="blog">Leer Más Artículos</button>
                    </div>
                </div>
            </section>

            <section class="contact-cta">
                <div class="container">
                    <div class="contact-cta-content">
                        <h2>¿Listo para Comenzar tu Proyecto?</h2>
                        <p>Contáctanos hoy y let's build something amazing together</p>
                        <div class="contact-actions">
                            <button class="btn-primary" data-page="contacto">Contáctanos</button>
                            <button class="btn-outline" data-page="servicios">Ver Servicios</button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.render(homeHtml);
        this.loadDynamicContent();
    }

    /**
     * Carga contenido dinámico para las secciones de preview
     */
    loadDynamicContent() {
        this.loadProjectsPreview();
        this.loadTeamPreview();
        this.loadBlogPreview();
    }

    /**
     * Carga y muestra proyectos destacados
     */
    loadProjectsPreview() {
        try {
            const projects = Project.createSampleProjects().slice(0, 2); // Solo mostrar 2 proyectos
            const projectsContainer = document.getElementById('projects-showcase');
            
            if (projectsContainer) {
                const projectsHtml = projects.map(project => `
                    <div class="project-preview-card">
                        <div class="project-image">
                            <img src="${project.images[0] || 'assets/images/placeholder-project.jpg'}" 
                                 alt="${this.escapeHtml(project.title)}" 
                                 onerror="this.src='assets/images/placeholder-project.jpg'">
                        </div>
                        <div class="project-info">
                            <h3>${this.escapeHtml(project.title)}</h3>
                            <p>${this.truncateText(project.description, 120)}</p>
                            <div class="project-tech">
                                ${project.technologies.slice(0, 3).map(tech => 
                                    `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                                ).join('')}
                            </div>
                            <div class="project-status status-${project.status}">
                                ${this.getStatusText(project.status)}
                            </div>
                        </div>
                    </div>
                `).join('');
                
                projectsContainer.innerHTML = projectsHtml;
            }
        } catch (error) {
            console.error('Error loading projects preview:', error);
        }
    }

    /**
     * Carga y muestra miembros del equipo destacados
     */
    loadTeamPreview() {
        try {
            const team = TeamMember.createTeam().slice(0, 3); // Solo mostrar 3 miembros
            const teamContainer = document.getElementById('team-showcase');
            
            if (teamContainer) {
                const teamHtml = team.map(member => `
                    <div class="team-preview-card">
                        <div class="member-image">
                            <img src="${member.image}" 
                                 alt="${this.escapeHtml(member.name)}"
                                 onerror="this.src='assets/images/placeholder-avatar.jpg'">
                        </div>
                        <div class="member-info">
                            <h3>${this.escapeHtml(member.name)}</h3>
                            <p class="member-position">${this.escapeHtml(member.position)}</p>
                            <p class="member-bio">${this.truncateText(member.bio, 80)}</p>
                            <div class="member-skills">
                                ${member.skills.slice(0, 2).map(skill => 
                                    `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
                
                teamContainer.innerHTML = teamHtml;
            }
        } catch (error) {
            console.error('Error loading team preview:', error);
        }
    }

    /**
     * Carga y muestra posts del blog recientes
     */
    loadBlogPreview() {
        try {
            const posts = BlogPost.createSamplePosts().slice(0, 2); // Solo mostrar 2 posts
            const blogContainer = document.getElementById('blog-showcase');
            
            if (blogContainer) {
                const blogHtml = posts.map(post => `
                    <div class="blog-preview-card">
                        <div class="blog-image">
                            <img src="${post.image || 'assets/images/placeholder-blog.jpg'}" 
                                 alt="${this.escapeHtml(post.title)}"
                                 onerror="this.src='assets/images/placeholder-blog.jpg'">
                        </div>
                        <div class="blog-info">
                            <h3>${this.escapeHtml(post.title)}</h3>
                            <p class="blog-meta">
                                <span class="blog-date">${this.formatDate(post.publishDate)}</span>
                                <span class="blog-reading-time">${post.getReadingTime()}</span>
                            </p>
                            <p>${this.truncateText(post.content, 100)}</p>
                            <div class="blog-tags">
                                ${post.tags.slice(0, 2).map(tag => 
                                    `<span class="blog-tag">${this.escapeHtml(tag)}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
                
                blogContainer.innerHTML = blogHtml;
            }
        } catch (error) {
            console.error('Error loading blog preview:', error);
        }
    }

    /**
     * Convierte el estado del proyecto a texto legible
     * @param {string} status - Estado del proyecto
     */
    getStatusText(status) {
        const statusMap = {
            'completed': 'Completado',
            'in-progress': 'En Progreso',
            'planning': 'Planificación'
        };
        return statusMap[status] || status;
    }

    /**
     * Hook después de renderizar - configura event listeners
     */
    afterRender() {
        // Configurar botones de navegación
        this.addEventListeners('[data-page]', 'click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page && window.navigationController) {
                window.navigationController.navigateTo(page);
            }
        });

        // Configurar botón de contacto
        this.addEventListeners('[data-action="contact"]', 'click', (e) => {
            e.preventDefault();
            if (window.navigationController) {
                window.navigationController.navigateTo('contacto');
            }
        });
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Inicio';
    }
}