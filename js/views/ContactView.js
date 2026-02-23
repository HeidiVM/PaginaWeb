/**
 * Vista para la página de contacto
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class ContactView extends BaseView {
    constructor() {
        super('main-content');
        this.teamMembers = [];
    }

    /**
     * Renderiza la página de contacto
     * @param {object} options - Opciones adicionales (ej: servicio preseleccionado)
     */
    renderContact(options = {}) {
        this.showLoading();
        
        try {
            this.teamMembers = TeamMember.createTeam();
            
            const contactHtml = `
                <section class="page-header">
                    <div class="container">
                        <h1>Contáctanos</h1>
                        <p>¿Tienes un proyecto en mente? Nos encantaría conocer más sobre tus ideas</p>
                    </div>
                </section>

                <section class="contact-content">
                    <div class="container">
                        <div class="contact-layout">
                            <div class="contact-form-section">
                                <h2>Envíanos un Mensaje</h2>
                                <p>Completa el formulario y te responderemos lo antes posible.</p>
                                
                                <form class="contact-form" id="contact-form">
                                    <div class="form-group">
                                        <label for="name">Nombre Completo *</label>
                                        <input type="text" id="name" name="name" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email *</label>
                                        <input type="email" id="email" name="email" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="company">Empresa</label>
                                        <input type="text" id="company" name="company">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="phone">Teléfono</label>
                                        <input type="tel" id="phone" name="phone">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="service">Servicio de Interés</label>
                                        <select id="service" name="service">
                                            <option value="">Selecciona un servicio</option>
                                            <option value="frontend" ${options.service === 'Desarrollo Web Frontend' ? 'selected' : ''}>
                                                Desarrollo Web Frontend
                                            </option>
                                            <option value="backend" ${options.service === 'Desarrollo Web Backend' ? 'selected' : ''}>
                                                Desarrollo Web Backend
                                            </option>
                                            <option value="mobile" ${options.service === 'Aplicaciones Móviles' ? 'selected' : ''}>
                                                Aplicaciones Móviles
                                            </option>
                                            <option value="devops" ${options.service === 'DevOps y Cloud' ? 'selected' : ''}>
                                                DevOps y Cloud
                                            </option>
                                            <option value="consulting" ${options.service === 'Consultoría Técnica' ? 'selected' : ''}>
                                                Consultoría Técnica
                                            </option>
                                            <option value="maintenance" ${options.service === 'Mantenimiento y Soporte' ? 'selected' : ''}>
                                                Mantenimiento y Soporte
                                            </option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="budget">Presupuesto Estimado</label>
                                        <select id="budget" name="budget">
                                            <option value="">Selecciona un rango</option>
                                            <option value="under-5k">Menos de $5,000</option>
                                            <option value="5k-10k">$5,000 - $10,000</option>
                                            <option value="10k-25k">$10,000 - $25,000</option>
                                            <option value="25k-50k">$25,000 - $50,000</option>
                                            <option value="over-50k">Más de $50,000</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="timeline">Timeline del Proyecto</label>
                                        <select id="timeline" name="timeline">
                                            <option value="">Selecciona un timeline</option>
                                            <option value="asap">Lo antes posible</option>
                                            <option value="1-month">Dentro de 1 mes</option>
                                            <option value="3-months">Dentro de 3 meses</option>
                                            <option value="6-months">Dentro de 6 meses</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="message">Descripción del Proyecto *</label>
                                        <textarea id="message" name="message" rows="5" required 
                                                  placeholder="Cuéntanos sobre tu proyecto, objetivos, requerimientos especiales, etc."></textarea>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="submit" class="btn-primary">
                                            <span class="btn-text">Enviar Mensaje</span>
                                            <span class="btn-loading" style="display: none;">Enviando...</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            <div class="contact-info-section">
                                <div class="contact-info">
                                    <h2>Información de Contacto</h2>
                                    <p>También puedes contactarnos directamente a través de estos medios:</p>
                                    
                                    <div class="contact-methods">
                                        <div class="contact-method">
                                            <div class="method-icon">📧</div>
                                            <div class="method-info">
                                                <h3>Email General</h3>
                                                <a href="mailto:info@devteam.com">info@devteam.com</a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">📞</div>
                                            <div class="method-info">
                                                <h3>Teléfono</h3>
                                                <a href="tel:+15551234567">+1 (555) 123-4567</a>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">🏢</div>
                                            <div class="method-info">
                                                <h3>Oficina</h3>
                                                <p>123 Tech Street<br>Innovation City, TC 12345</p>
                                            </div>
                                        </div>
                                        
                                        <div class="contact-method">
                                            <div class="method-icon">🕐</div>
                                            <div class="method-info">
                                                <h3>Horario</h3>
                                                <p>Lun - Vie: 9:00 AM - 6:00 PM<br>Sáb: 10:00 AM - 2:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="team-contacts">
                                    <h2>Contacto Directo del Equipo</h2>
                                    <p>Contacta directamente a nuestros especialistas:</p>
                                    
                                    <div class="team-contact-list">
                                        ${this.renderTeamContacts()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-cta">
                            <div class="cta-content">
                                <h2>¿Prefieres una Llamada?</h2>
                                <p>Agenda una videollamada gratuita de 30 minutos para discutir tu proyecto</p>
                                <button class="btn-secondary" id="schedule-call">
                                    📅 Agendar Llamada
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            this.render(contactHtml);
        } catch (error) {
            console.error('Error loading contact page:', error);
            this.showError('Error al cargar la página de contacto');
        }
    }

    /**
     * Renderiza la lista de contactos del equipo
     */
    renderTeamContacts() {
        return this.teamMembers.map(member => `
            <div class="team-contact-card">
                <div class="contact-avatar">
                    <img src="${member.image}" 
                         alt="${this.escapeHtml(member.name)}"
                         onerror="this.src='assets/images/placeholder-avatar.jpg'">
                </div>
                
                <div class="contact-info">
                    <h4>${this.escapeHtml(member.name)}</h4>
                    <p class="contact-position">${this.escapeHtml(member.position)}</p>
                    <a href="mailto:${member.email}" class="contact-email">
                        ${member.email}
                    </a>
                    
                    <div class="contact-specialties">
                        ${member.skills.slice(0, 2).map(skill => 
                            `<span class="specialty-tag">${this.escapeHtml(skill)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Maneja el envío del formulario de contacto
     */
    handleFormSubmission(formData) {
        // Simular envío de formulario
        return new Promise((resolve) => {
            // Simular delay de red
            setTimeout(() => {
                console.log('Formulario enviado:', formData);
                resolve(true);
            }, 2000);
        });
    }

    /**
     * Muestra mensaje de éxito
     */
    showSuccessMessage() {
        const successHtml = `
            <div class="success-overlay" id="success-overlay">
                <div class="success-content">
                    <div class="success-icon">✅</div>
                    <h2>¡Mensaje Enviado!</h2>
                    <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.</p>
                    <button class="btn-primary" id="close-success">Cerrar</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', successHtml);
        
        document.getElementById('close-success').addEventListener('click', () => {
            document.getElementById('success-overlay').remove();
        });
    }

    /**
     * Muestra modal para agendar llamada
     */
    showScheduleModal() {
        const scheduleHtml = `
            <div class="modal-overlay" id="schedule-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Agendar Videollamada</h2>
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <p>Para agendar una videollamada gratuita de 30 minutos, por favor contáctanos por email o teléfono y te enviaremos un enlace de calendario.</p>
                        
                        <div class="schedule-info">
                            <div class="schedule-item">
                                <strong>Email:</strong> <a href="mailto:info@devteam.com">info@devteam.com</a>
                            </div>
                            <div class="schedule-item">
                                <strong>Teléfono:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a>
                            </div>
                        </div>
                        
                        <div class="schedule-options">
                            <h3>Horarios Disponibles:</h3>
                            <ul>
                                <li>Lunes a Viernes: 9:00 AM - 5:00 PM</li>
                                <li>Zona horaria: EST (UTC-5)</li>
                                <li>Duración: 30 minutos</li>
                                <li>Plataforma: Google Meet o Zoom</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', scheduleHtml);
        
        const modal = document.getElementById('schedule-modal');
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
        // Configurar formulario de contacto
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const btnText = submitButton.querySelector('.btn-text');
                const btnLoading = submitButton.querySelector('.btn-loading');
                
                // Mostrar estado de carga
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
                submitButton.disabled = true;
                
                try {
                    // Recopilar datos del formulario
                    const formData = new FormData(contactForm);
                    const formObject = Object.fromEntries(formData.entries());
                    
                    // Simular envío
                    await this.handleFormSubmission(formObject);
                    
                    // Mostrar mensaje de éxito
                    this.showSuccessMessage();
                    
                    // Resetear formulario
                    contactForm.reset();
                    
                } catch (error) {
                    console.error('Error sending form:', error);
                    alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
                } finally {
                    // Restaurar botón
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitButton.disabled = false;
                }
            });
        }

        // Configurar botón de agendar llamada
        const scheduleBtn = document.getElementById('schedule-call');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                this.showScheduleModal();
            });
        }
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Contacto';
    }
}