/**
 * Vista para la página del blog
 * Hereda de BaseView implementando Liskov Substitution Principle
 */
class BlogView extends BaseView {
    constructor() {
        super('main-content');
        this.posts = [];
        this.authors = [];
    }

    /**
     * Renderiza la página del blog
     */
    renderBlog() {
        this.showLoading();
        
        try {
            this.posts = BlogPost.createSamplePosts();
            this.authors = TeamMember.createTeam();
            
            const blogHtml = `
                <section class="page-header">
                    <div class="container">
                        <h1>Blog DevTeam</h1>
                        <p>Ideas, reflexiones y conocimientos de nuestro equipo de desarrollo</p>
                    </div>
                </section>

                <section class="blog-content">
                    <div class="container">
                        <div class="blog-intro">
                            <h2>Últimas Publicaciones</h2>
                            <p>Nuestro equipo comparte regularmente ideas sobre desarrollo, tecnología y mejores prácticas. Mantente al día con las últimas tendencias y aprendizajes.</p>
                        </div>

                        <div class="blog-grid">
                            ${this.renderBlogPosts()}
                        </div>
                    </div>
                </section>
            `;

            this.render(blogHtml);
        } catch (error) {
            console.error('Error loading blog:', error);
            this.showError('Error al cargar el blog');
        }
    }

    /**
     * Renderiza los posts del blog
     */
    renderBlogPosts() {
        return this.posts.map(post => {
            const author = this.authors.find(a => a.id === post.authorId);
            
            return `
                <article class="blog-post-card" data-post-id="${post.id}">
                    <div class="post-image">
                        <img src="${post.image || 'assets/images/placeholder-blog.jpg'}" 
                             alt="${this.escapeHtml(post.title)}"
                             onerror="this.src='assets/images/placeholder-blog.jpg'">
                    </div>
                    
                    <div class="post-content">
                        <div class="post-meta">
                            <div class="post-author">
                                <img src="${author?.image || 'assets/images/placeholder-avatar.jpg'}" 
                                     alt="${this.escapeHtml(author?.name || 'Autor')}"
                                     onerror="this.src='assets/images/placeholder-avatar.jpg'">
                                <span>${this.escapeHtml(author?.name || 'Autor Desconocido')}</span>
                            </div>
                            <div class="post-date">${post.getFormattedDate()}</div>
                            <div class="post-reading-time">${post.getReadingTime()}</div>
                        </div>
                        
                        <h2 class="post-title">${this.escapeHtml(post.title)}</h2>
                        
                        <p class="post-excerpt">${this.truncateText(post.content, 200)}</p>
                        
                        <div class="post-tags">
                            ${post.tags.map(tag => 
                                `<span class="post-tag">${this.escapeHtml(tag)}</span>`
                            ).join('')}
                        </div>
                        
                        <div class="post-actions">
                            <button class="btn-read-more" data-post-id="${post.id}">
                                Leer Más
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    /**
     * Muestra el post completo en modal
     */
    showFullPost(postId) {
        const post = this.posts.find(p => p.id == postId);
        if (!post) return;

        const author = this.authors.find(a => a.id === post.authorId);

        const modalHtml = `
            <div class="modal-overlay" id="post-modal">
                <div class="modal-content blog-modal">
                    <div class="modal-header">
                        <button class="modal-close" data-action="close-modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <article class="full-post">
                            <header class="post-header">
                                <h1>${this.escapeHtml(post.title)}</h1>
                                
                                <div class="post-meta-detailed">
                                    <div class="author-info">
                                        <img src="${author?.image || 'assets/images/placeholder-avatar.jpg'}" 
                                             alt="${this.escapeHtml(author?.name || 'Autor')}"
                                             onerror="this.src='assets/images/placeholder-avatar.jpg'">
                                        <div class="author-details">
                                            <strong>${this.escapeHtml(author?.name || 'Autor Desconocido')}</strong>
                                            <span>${this.escapeHtml(author?.position || 'Desarrollador')}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="post-info">
                                        <div class="post-date">${post.getFormattedDate()}</div>
                                        <div class="post-reading-time">${post.getReadingTime()}</div>
                                    </div>
                                </div>
                                
                                <div class="post-tags">
                                    ${post.tags.map(tag => 
                                        `<span class="post-tag">${this.escapeHtml(tag)}</span>`
                                    ).join('')}
                                </div>
                            </header>
                            
                            <div class="post-image-full">
                                <img src="${post.image || 'assets/images/placeholder-blog.jpg'}" 
                                     alt="${this.escapeHtml(post.title)}"
                                     onerror="this.src='assets/images/placeholder-blog.jpg'">
                            </div>
                            
                            <div class="post-content-full">
                                ${this.formatPostContent(post.content)}
                            </div>
                            
                            <footer class="post-footer">
                                <div class="author-bio">
                                    <h3>Sobre el Autor</h3>
                                    <div class="author-bio-content">
                                        <img src="${author?.image || 'assets/images/placeholder-avatar.jpg'}" 
                                             alt="${this.escapeHtml(author?.name || 'Autor')}"
                                             onerror="this.src='assets/images/placeholder-avatar.jpg'">
                                        <div>
                                            <strong>${this.escapeHtml(author?.name || 'Autor Desconocido')}</strong>
                                            <p>${this.escapeHtml(author?.bio || 'Información del autor no disponible.')}</p>
                                            <div class="author-contact">
                                                <a href="mailto:${author?.email || '#'}">${author?.email || 'Email no disponible'}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </article>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Agregar event listeners para cerrar modal
        const modal = document.getElementById('post-modal');
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
     * Formatea el contenido del post dividiéndolo en párrafos
     */
    formatPostContent(content) {
        // Dividir el contenido en párrafos basándose en puntos seguidos de espacios
        const paragraphs = content.split('. ').map((sentence, index, array) => {
            // Reagregar el punto excepto para la última oración
            const text = index < array.length - 1 ? sentence + '.' : sentence;
            return text.trim();
        }).filter(p => p.length > 0);

        // Agrupar oraciones en párrafos de aproximadamente 3-4 oraciones
        const groupedParagraphs = [];
        for (let i = 0; i < paragraphs.length; i += 3) {
            const paragraph = paragraphs.slice(i, i + 3).join(' ');
            if (paragraph.trim()) {
                groupedParagraphs.push(paragraph);
            }
        }

        return groupedParagraphs.map(paragraph => 
            `<p>${this.escapeHtml(paragraph)}</p>`
        ).join('');
    }

    /**
     * Hook después de renderizar
     */
    afterRender() {
        // Configurar botones "Leer Más"
        this.addEventListeners('.btn-read-more', 'click', (e) => {
            const postId = e.target.getAttribute('data-post-id');
            if (postId) {
                this.showFullPost(postId);
            }
        });

        // Configurar click en cards para abrir post
        this.addEventListeners('.blog-post-card', 'click', (e) => {
            // Prevenir click si se hace en el botón
            if (e.target.classList.contains('btn-read-more')) return;
            
            const postId = e.currentTarget.getAttribute('data-post-id');
            if (postId) {
                this.showFullPost(postId);
            }
        });
    }

    /**
     * Hook cuando se muestra la vista
     */
    onShow() {
        document.title = 'DevTeam - Blog';
    }
}