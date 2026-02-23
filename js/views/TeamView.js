/**
 * Vista para la página del equipo
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class TeamView extends BaseView {
    constructor() {
        super('main-content');
        this.teamMembers = [];
    }

    /**
     * Renderiza la página del equipo
     */
    renderTeam() {
        this.showLoading();
        
        try {
            this.teamMembers = TeamMember.createTeam();
            
            const teamHtml = `
                <section class="page-header">
                    <div class="container">
                        <h1>Nuestro Equipo</h1>
                        <p>Conoce a los profesionales que hacen posible cada proyecto</p>
                    </div>
                </section>

                <section class="team-content">
                    <div class="container">
                        <div class="team-intro">
                            <h2>Quiénes Somos</h2>
                            <p>Somos un equipo multidisciplinario de desarrolladores apasionados por la tecnología. Cada miembro aporta experiencia única y conocimientos especializados para crear soluciones innovadoras.</p>
                        </div>

                        <div class="team-grid">
                            ${this.renderTeamMembers()}
                        </div>

                        <div class="team-values">
                            <h2>Nuestros Valores</h2>
                            <div class="values-grid">
                                <div class="value-card">
                                    <div class="value-icon">🤝</div>
                                    <h3>Colaboración</h3>
                                    <p>Trabajamos en equipo, compartiendo conocimientos y aprendiendo unos de otros.</p>
                                </div>
                                <div class="value-card">
                                    <div class="value-icon">🎯</div>
                                    <h3>Excelencia</h3>
                                    <p>Nos esforzamos por la calidad en cada línea de código y cada proyecto entregado.</p>
                                </div>
                                <div class="value-card">
                                    <div class="value-icon">💡</div>
                                    <h3>Innovación</h3>
                                    <p>Buscamos constantemente nuevas formas de resolver problemas y mejorar procesos.</p>
                                </div>
                                <div class="value-card">
                                    <div class="value-icon">📚</div>
                                    <h3>Aprendizaje</h3>
                                    <p>Nos mantenemos actualizados con las últimas tecnologías y mejores prácticas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            this.render(teamHtml);
        } catch (error) {
            console.error('Error loading team:', error);
            this.showError('Error al cargar el equipo');
        }
    }

    /**
     * Renderiza los miembros del equipo
     */
    renderTeamMembers() {
        return this.teamMembers.map(member => `
            <div class="team-member-card" data-member-id="${member.id}">
                <div class="member-image">
                    <img src="${member.image}" 
                         alt="${this.escapeHtml(member.name)}"
                         onerror="this.src='assets/images/placeholder-avatar.jpg'">
                    <div class="member-overlay">
                        <button class="btn-view-profile" data-member-id="${member.id}">
                            Ver Perfil
                        </button>
                    </div>
                </div>
                
                <div class="member-info">
                    <h3 class="member-name">${this.escapeHtml(member.name)}</h3>
                    <p class="member-position">${this.escapeHtml(member.position)}</p>
                    <p class="member-bio">${this.truncateText(member.bio, 100)}</p>
                    
                    <div class="member-skills">
                        <h4>Especialidades:</h4>
                        <div class="skills-tags">
                            ${member.skills.slice(0, 4).map(skill => 
                                `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
                            ).join('')}
                            ${member.skills.length > 4 ? 
                                `<span class="skill-tag more">+${member.skills.length - 4} más</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="member-contact">
                        <a href="mailto:${member.email}" class="contact-link">
                            <span class="contact-icon">📧</span> Contactar
                        </a>
                        ${member.socialLinks.github ? 
                            `<a href="${member.socialLinks.github}" target="_blank" class="social-link">
                                <span class="social-icon">📂</span> GitHub
                            </a>` : ''}
                        ${member.socialLinks.linkedin ? 
                            `<a href="${member.socialLinks.linkedin}" target="_blank" class="social-link">
                                <span class="social-icon">💼</span> LinkedIn
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Muestra el perfil completo del miembro
     */
    showMemberProfile(memberId) {
        const member = this.teamMembers.find(m => m.id == memberId);
        if (!member) return;

        // Obtener proyectos del miembro
        const projects = Project.createSampleProjects().filter(p => 
            p.teamMembers.includes(member.id)
        );

        // Obtener posts del blog del miembro
        const blogPosts = BlogPost.createSamplePosts().filter(p => 
            p.authorId === member.id
        );

        const modalHtml = `
            <div class="modal-overlay" id="member-modal">
                <div class="modal-content member-modal">
                    <div class="modal-header">
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="member-profile">
                            <header class="profile-header">
                                <div class="profile-image">
                                    <img src="${member.image}" 
                                         alt="${this.escapeHtml(member.name)}"
                                         onerror="this.src='assets/images/placeholder-avatar.jpg'">
                                </div>
                                
                                <div class="profile-info">
                                    <h1>${this.escapeHtml(member.name)}</h1>
                                    <h2>${this.escapeHtml(member.position)}</h2>
                                    <p class="profile-bio">${this.escapeHtml(member.bio)}</p>
                                    
                                    <div class="profile-contact">
                                        <a href="mailto:${member.email}" class="btn-primary">
                                            <span class="btn-icon">📧</span> ${member.email}
                                        </a>
                                        ${member.socialLinks.github ? 
                                            `<a href="${member.socialLinks.github}" target="_blank" class="btn-secondary">
                                                <span class="btn-icon">📂</span> GitHub
                                            </a>` : ''}
                                        ${member.socialLinks.linkedin ? 
                                            `<a href="${member.socialLinks.linkedin}" target="_blank" class="btn-secondary">
                                                <span class="btn-icon">💼</span> LinkedIn
                                            </a>` : ''}
                                    </div>
                                </div>
                            </header>
                            
                            <div class="profile-content">
                                <section class="profile-section">
                                    <h3>Habilidades Técnicas</h3>
                                    <div class="skills-grid">
                                        ${member.skills.map(skill => 
                                            `<div class="skill-item">
                                                <span class="skill-name">${this.escapeHtml(skill)}</span>
                                            </div>`
                                        ).join('')}
                                    </div>
                                </section>
                                
                                ${projects.length > 0 ? `
                                    <section class="profile-section">
                                        <h3>Proyectos Participados (${projects.length})</h3>
                                        <div class="member-projects">
                                            ${projects.map(project => `
                                                <div class="member-project">
                                                    <h4>${this.escapeHtml(project.title)}</h4>
                                                    <p>${this.truncateText(project.description, 100)}</p>
                                                    <div class="project-technologies">
                                                        ${project.technologies.slice(0, 3).map(tech => 
                                                            `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                                                        ).join('')}
                                                    </div>
                                                    <span class="project-status status-${project.status}">
                                                        ${this.getProjectStatusText(project.status)}
                                                    </span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </section>
                                ` : ''}
                                
                                ${blogPosts.length > 0 ? `
                                    <section class="profile-section">
                                        <h3>Artículos del Blog (${blogPosts.length})</h3>
                                        <div class="member-posts">
                                            ${blogPosts.map(post => `
                                                <div class="member-post">
                                                    <h4>${this.escapeHtml(post.title)}</h4>
                                                    <p class="post-meta">${post.getFormattedDate()} • ${post.getReadingTime()}</p>
                                                    <p>${this.truncateText(post.content, 100)}</p>
                                                    <div class="post-tags">
                                                        ${post.tags.slice(0, 3).map(tag => 
                                                            `<span class="post-tag">${this.escapeHtml(tag)}</span>`
                                                        ).join('')}
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </section>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Agregar event listeners para cerrar modal
        const modal = document.getElementById('member-modal');
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
     * Convierte estado de proyecto a texto
     */
    getProjectStatusText(status) {
        const statusMap = {
            'completed': 'Completado',
            'in-progress': 'En Progreso',
            'planning': 'Planificación'
        };
        return statusMap[status] || status;
    }

    /**
     * Hook después de renderizar
     */
    afterRender() {
        // Configurar botones "Ver Perfil"
        this.addEventListeners('.btn-view-profile', 'click', (e) => {
            e.stopPropagation();
            const memberId = e.target.getAttribute('data-member-id');
            if (memberId) {
                this.showMemberProfile(memberId);
            }
        });

        // Configurar click en cards para abrir perfil
        this.addEventListeners('.team-member-card', 'click', (e) => {
            // Prevenir click si se hace en el botón o enlaces
            if (e.target.matches('button, a, .contact-link, .social-link')) return;
            
            const memberId = e.currentTarget.getAttribute('data-member-id');
            if (memberId) {
                this.showMemberProfile(memberId);
            }
        });
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Equipo';
    }
}