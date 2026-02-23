/**
 * Vista para la página de proyectos
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class ProjectsView extends BaseView {
    constructor() {
        super('main-content');
        this.projects = [];
        this.currentFilter = 'all';
    }

    /**
     * Renderiza la página de proyectos
     */
    renderProjects() {
        this.showLoading();
        
        try {
            this.projects = Project.createSampleProjects();
            
            const projectsHtml = `
                <section class="page-header">
                    <div class="container">
                        <h1>Nuestros Proyectos</h1>
                        <p>Descubre los proyectos que hemos desarrollado con pasión y dedicación</p>
                    </div>
                </section>

                <section class="projects-content">
                    <div class="container">
                        <div class="projects-filters">
                            <h2>Filtrar Proyectos</h2>
                            <div class="filter-buttons">
                                <button class="filter-btn active" data-filter="all">Todos</button>
                                <button class="filter-btn" data-filter="completed">Completados</button>
                                <button class="filter-btn" data-filter="in-progress">En Progreso</button>
                                <button class="filter-btn" data-filter="planning">Planificación</button>
                            </div>
                        </div>

                        <div class="projects-grid" id="projects-grid">
                            ${this.renderProjectsGrid()}
                        </div>
                    </div>
                </section>
            `;

            this.render(projectsHtml);
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError('Error al cargar los proyectos');
        }
    }

    /**
     * Renderiza la grilla de proyectos
     */
    renderProjectsGrid(filter = 'all') {
        const filteredProjects = this.filterProjects(filter);
        
        if (filteredProjects.length === 0) {
            return '<div class="no-projects">No hay proyectos que coincidan con el filtro seleccionado.</div>';
        }

        return filteredProjects.map(project => `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    <img src="${project.images[0] || 'assets/images/placeholder-project.jpg'}" 
                         alt="${this.escapeHtml(project.title)}"
                         onerror="this.src='assets/images/placeholder-project.jpg'">
                    <div class="project-overlay">
                        <button class="btn-view-details" data-project-id="${project.id}">
                            Ver Detalles
                        </button>
                    </div>
                </div>
                
                <div class="project-info">
                    <div class="project-header">
                        <h3>${this.escapeHtml(project.title)}</h3>
                        <div class="project-status status-${project.status}">
                            ${this.getStatusText(project.status)}
                        </div>
                    </div>
                    
                    <p class="project-description">${this.truncateText(project.description, 120)}</p>
                    
                    <div class="project-technologies">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="project-meta">
                        <div class="project-duration">
                            <strong>Duración:</strong> ${project.getDuration()}
                        </div>
                        <div class="project-team">
                            <strong>Equipo:</strong> ${project.teamMembers.length} miembros
                        </div>
                    </div>
                    
                    <div class="project-links">
                        ${project.githubUrl ? 
                            `<a href="${project.githubUrl}" target="_blank" class="project-link">
                                <span class="link-icon">📂</span> GitHub
                            </a>` : ''}
                        ${project.liveUrl ? 
                            `<a href="${project.liveUrl}" target="_blank" class="project-link">
                                <span class="link-icon">🌐</span> Ver Proyecto
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Filtra proyectos por estado
     */
    filterProjects(filter) {
        if (filter === 'all') {
            return this.projects;
        }
        return this.projects.filter(project => project.status === filter);
    }

    /**
     * Convierte el estado del proyecto a texto legible
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
     * Muestra detalles del proyecto en modal
     */
    showProjectDetails(projectId) {
        const project = this.projects.find(p => p.id == projectId);
        if (!project) return;

        const team = TeamMember.createTeam();
        const projectTeam = team.filter(member => project.teamMembers.includes(member.id));

        const modalHtml = `
            <div class="modal-overlay" id="project-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${this.escapeHtml(project.title)}</h2>
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="project-images">
                            ${project.images.map(img => 
                                `<img src="${img}" alt="${this.escapeHtml(project.title)}"
                                      onerror="this.src='assets/images/placeholder-project.jpg'">`
                            ).join('')}
                        </div>
                        
                        <div class="project-details">
                            <div class="project-status status-${project.status}">
                                ${this.getStatusText(project.status)}
                            </div>
                            
                            <p class="project-full-description">${this.escapeHtml(project.description)}</p>
                            
                            <div class="project-info-section">
                                <h3>Tecnologías Utilizadas</h3>
                                <div class="tech-tags">
                                    ${project.technologies.map(tech => 
                                        `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div class="project-info-section">
                                <h3>Equipo del Proyecto</h3>
                                <div class="project-team-grid">
                                    ${projectTeam.map(member => `
                                        <div class="team-member-mini">
                                            <img src="${member.image}" alt="${this.escapeHtml(member.name)}"
                                                 onerror="this.src='assets/images/placeholder-avatar.jpg'">
                                            <div>
                                                <strong>${this.escapeHtml(member.name)}</strong>
                                                <span>${this.escapeHtml(member.position)}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="project-info-section">
                                <h3>Información del Proyecto</h3>
                                <div class="project-meta-detailed">
                                    <div class="meta-item">
                                        <strong>Fecha de Inicio:</strong> ${this.formatDate(project.startDate)}
                                    </div>
                                    ${project.endDate ? 
                                        `<div class="meta-item">
                                            <strong>Fecha de Finalización:</strong> ${this.formatDate(project.endDate)}
                                        </div>` : ''}
                                    <div class="meta-item">
                                        <strong>Duración:</strong> ${project.getDuration()}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-actions">
                                ${project.githubUrl ? 
                                    `<a href="${project.githubUrl}" target="_blank" class="btn-secondary">
                                        Ver en GitHub
                                    </a>` : ''}
                                ${project.liveUrl ? 
                                    `<a href="${project.liveUrl}" target="_blank" class="btn-primary">
                                        Ver Proyecto Live
                                    </a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Agregar event listeners para cerrar modal
        const modal = document.getElementById('project-modal');
        modal.querySelector('[data-action="close-modal"]').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    /**
     * Hook después de renderizar
     */
    afterRender() {
        // Configurar filtros
        this.addEventListeners('.filter-btn', 'click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            // Aplicar filtro
            const filter = e.target.getAttribute('data-filter');
            this.currentFilter = filter;
            
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = this.renderProjectsGrid(filter);
            
            // Reconfigurar event listeners para los nuevos elementos
            this.configureProjectListeners();
        });

        this.configureProjectListeners();
    }

    /**
     * Configura event listeners para los proyectos
     */
    configureProjectListeners() {
        // Configurar botones de ver detalles
        this.addEventListeners('[data-project-id]', 'click', (e) => {
            const projectId = e.target.getAttribute('data-project-id');
            if (projectId) {
                this.showProjectDetails(projectId);
            }
        });

        this.addEventListeners('.btn-view-details', 'click', (e) => {
            e.stopPropagation();
            const projectId = e.target.getAttribute('data-project-id');
            if (projectId) {
                this.showProjectDetails(projectId);
            }
        });
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Proyectos';
    }
}