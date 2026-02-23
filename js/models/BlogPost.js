/**
 * Modelo para representar un post del blog
 * Principio Single Responsibility: Solo maneja datos y comportamiento de posts del blog
 */
class BlogPost {
    constructor(id, title, content, authorId, publishDate, tags = [], image = null, status = 'published') {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.publishDate = publishDate;
        this.tags = tags;
        this.image = image;
        this.status = status; // 'published', 'draft', 'archived'
    }

    // Método para obtener información completa del post
    getFullInfo() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            publishDate: this.publishDate,
            tags: this.tags,
            image: this.image,
            status: this.status
        };
    }

    // Método para obtener resumen del post
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            content: this.content.substring(0, 200) + '...',
            authorId: this.authorId,
            publishDate: this.publishDate,
            tags: this.tags.slice(0, 3),
            image: this.image
        };
    }

    // Método para obtener fecha formateada
    getFormattedDate() {
        const date = new Date(this.publishDate);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Método para obtener tiempo de lectura estimado
    getReadingTime() {
        const wordsPerMinute = 200;
        const words = this.content.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min de lectura`;
    }

    // Método para validar datos del post
    validate() {
        return this.title && this.content && this.authorId && this.publishDate;
    }

    // Método estático para crear posts de ejemplo
    static createSamplePosts() {
        return [
            new BlogPost(
                1,
                "Mejores Prácticas en Desarrollo Frontend",
                "En el desarrollo frontend moderno, es crucial seguir ciertas prácticas para crear aplicaciones mantenibles y escalables. Una de las principales recomendaciones es la implementación de componentes reutilizables. Esto no solo reduce la duplicación de código, sino que también facilita el mantenimiento a largo plazo. Otra práctica fundamental es la optimización del rendimiento. Esto incluye técnicas como la carga diferida (lazy loading) de componentes, la optimización de imágenes y la minimización de bundle. La accesibilidad también debe ser una prioridad desde el inicio del desarrollo. Implementar elementos semánticos, proporcionar texto alternativo para imágenes y asegurar una navegación por teclado adecuada son aspectos esenciales. Finalmente, la implementación de tests unitarios y de integración garantiza la calidad del código y reduce los errores en producción.",
                1,
                "2026-02-15",
                ["Frontend", "Buenas Prácticas", "Performance", "Accesibilidad"],
                "assets/images/blog-frontend.jpg"
            ),
            new BlogPost(
                2,
                "Arquitectura de Microservicios: Ventajas y Desafíos",
                "La arquitectura de microservicios ha revolucionado la forma en que desarrollamos aplicaciones empresariales. Esta aproximación consiste en descomponer una aplicación en servicios pequeños e independientes que se comunican a través de APIs bien definidas. Las principales ventajas incluyen la escalabilidad independiente de cada servicio, la flexibilidad tecnológica que permite usar diferentes lenguajes y frameworks, y la facilidad de despliegue y mantenimiento. Sin embargo, también presenta desafíos significativos. La complejidad de la gestión de múltiples servicios, la necesidad de implementar patrones como circuit breaker y service discovery, y la dificultad de mantener la consistencia de datos son aspectos que deben considerarse cuidadosamente. Para una implementación exitosa, es fundamental contar con un equipo DevOps sólido y herramientas de monitoreo y logging robustas.",
                2,
                "2026-02-10",
                ["Backend", "Microservicios", "Arquitectura", "DevOps"],
                "assets/images/blog-microservices.jpg"
            ),
            new BlogPost(
                3,
                "El Futuro del Desarrollo Web: Tendencias 2026",
                "El panorama del desarrollo web continúa evolucionando rápidamente. En 2026, vemos emerger varias tendencias importantes que están moldeando el futuro de nuestra industria. La inteligencia artificial se está integrando cada vez más en las herramientas de desarrollo, desde autocompletado inteligente hasta generación de código y detección de errores. Los Progressive Web Apps (PWAs) están ganando tracción como alternativa viable a las aplicaciones nativas, ofreciendo experiencias similares a las apps nativas pero con la flexibilidad de las tecnologías web. WebAssembly está abriendo nuevas posibilidades para ejecutar aplicaciones de alto rendimiento en el navegador, permitiendo portar código de lenguajes como C++ y Rust. La computación edge está cambiando cómo pensamos sobre la entrega de contenido y la latencia. Finalmente, la sostenibilidad en el desarrollo web está cobrando importancia, con un enfoque creciente en crear aplicaciones más eficientes energéticamente.",
                3,
                "2026-02-05",
                ["Tendencias", "IA", "PWA", "WebAssembly", "Sostenibilidad"],
                "assets/images/blog-trends.jpg"
            ),
            new BlogPost(
                4,
                "DevOps y CI/CD: Automatizando el Ciclo de Vida del Software",
                "DevOps representa un cambio cultural y técnico que busca unificar el desarrollo de software y las operaciones de TI. El objetivo principal es acortar el ciclo de vida del desarrollo de sistemas y proporcionar entrega continua con alta calidad de software. La implementación de pipelines de CI/CD (Integración Continua/Despliegue Continuo) es fundamental en esta filosofía. Estos pipelines automatizan el proceso desde el commit del código hasta el despliegue en producción, incluyendo compilación, testing, análisis de calidad y despliegue. Las herramientas como Jenkins, GitLab CI, GitHub Actions y AWS CodePipeline facilitan esta automatización. La containerización con Docker y la orquestación con Kubernetes han revolucionado cómo desplegamos y gestionamos aplicaciones. Además, el Infrastructure as Code (IaC) con herramientas como Terraform permite gestionar la infraestructura de manera declarativa y versionada. El monitoreo y logging continuo son esenciales para mantener la visibilidad y detectar problemas proactivamente.",
                4,
                "2026-02-01",
                ["DevOps", "CI/CD", "Docker", "Kubernetes", "Automatización"],
                "assets/images/blog-devops.jpg"
            )
        ];
    }
}