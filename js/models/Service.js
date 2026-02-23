/**
 * Modelo para representar un servicio ofrecido por el equipo
 * Principio Single Responsibility: Solo maneja datos y comportamiento de servicios
 */
class Service {
    constructor(id, title, description, icon, features = [], technologies = [], price = null, duration = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.features = features;
        this.technologies = technologies;
        this.price = price;
        this.duration = duration;
    }

    // Método para obtener información completa del servicio
    getFullInfo() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            icon: this.icon,
            features: this.features,
            technologies: this.technologies,
            price: this.price,
            duration: this.duration
        };
    }

    // Método para obtener resumen del servicio
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            description: this.description.substring(0, 100) + '...',
            icon: this.icon,
            features: this.features.slice(0, 3)
        };
    }

    // Método para obtener precio formateado
    getFormattedPrice() {
        if (this.price) {
            return `$${this.price.toLocaleString('es-ES')}`;
        }
        return 'Consultar precio';
    }

    // Método para validar datos del servicio
    validate() {
        return this.title && this.description && this.icon && this.features.length > 0;
    }

    // Método estático para crear servicios de ejemplo
    static createServices() {
        return [
            new Service(
                1,
                "Desarrollo Web Frontend",
                "Creamos interfaces de usuario modernas, responsivas y altamente interactivas utilizando las últimas tecnologías frontend. Nos especializamos en crear experiencias de usuario excepcionales que conviertan visitantes en clientes.",
                "🎨",
                [
                    "Diseño responsive para todos los dispositivos",
                    "Interfaces de usuario intuitivas y atractivas",
                    "Optimización de rendimiento y velocidad de carga",
                    "Integración con APIs y servicios backend",
                    "Testing automatizado de componentes",
                    "Accesibilidad web (WCAG 2.1)",
                    "SEO técnico optimizado"
                ],
                ["React", "Vue.js", "Angular", "TypeScript", "Sass/SCSS", "Webpack"],
                2500,
                "4-8 semanas"
            ),
            new Service(
                2,
                "Desarrollo Web Backend",
                "Desarrollamos APIs robustas, escalables y seguras que forman la columna vertebral de tus aplicaciones. Implementamos arquitecturas modernas con las mejores prácticas de seguridad y rendimiento.",
                "⚙️",
                [
                    "APIs RESTful y GraphQL",
                    "Arquitecturas escalables y mantenibles",
                    "Bases de datos relacionales y NoSQL",
                    "Autenticación y autorización segura",
                    "Integración con servicios de terceros",
                    "Documentación técnica completa",
                    "Monitoreo y logging avanzado"
                ],
                ["Node.js", "Python", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
                3000,
                "6-10 semanas"
            ),
            new Service(
                3,
                "Aplicaciones Móviles",
                "Desarrollamos aplicaciones móviles nativas y multiplataforma que ofrecen experiencias de usuario excepcionales en iOS y Android. Desde la concepción hasta la publicación en las tiendas de aplicaciones.",
                "📱",
                [
                    "Desarrollo nativo para iOS y Android",
                    "Aplicaciones multiplataforma con React Native",
                    "Diseño UX/UI optimizado para móviles",
                    "Integración con APIs y servicios cloud",
                    "Notificaciones push personalizadas",
                    "Publicación en App Store y Google Play",
                    "Mantenimiento y actualizaciones"
                ],
                ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS Mobile"],
                4000,
                "8-12 semanas"
            ),
            new Service(
                4,
                "DevOps y Cloud",
                "Implementamos soluciones de infraestructura cloud, automatización de despliegues y pipelines de CI/CD para optimizar el ciclo de vida de desarrollo y garantizar alta disponibilidad.",
                "☁️",
                [
                    "Configuración de infraestructura cloud",
                    "Pipelines de CI/CD automatizados",
                    "Containerización con Docker y Kubernetes",
                    "Monitoreo y alertas en tiempo real",
                    "Backup y recuperación de datos",
                    "Escalado automático de aplicaciones",
                    "Optimización de costos cloud"
                ],
                ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "Grafana"],
                3500,
                "3-6 semanas"
            ),
            new Service(
                5,
                "Consultoría Técnica",
                "Ofrecemos asesoramiento experto en arquitectura de software, selección de tecnologías, auditorías de código y estrategias de modernización de aplicaciones legacy.",
                "🧠",
                [
                    "Auditoría de arquitectura y código",
                    "Estrategias de migración y modernización",
                    "Selección de stack tecnológico",
                    "Revisión de mejores prácticas",
                    "Formación técnica del equipo",
                    "Documentación de procesos",
                    "Roadmap tecnológico personalizado"
                ],
                ["Análisis", "Documentación", "Capacitación", "Metodologías Ágiles"],
                1500,
                "2-4 semanas"
            ),
            new Service(
                6,
                "Mantenimiento y Soporte",
                "Proporcionamos servicios continuos de mantenimiento, actualizaciones de seguridad, optimización de rendimiento y soporte técnico para mantener tus aplicaciones funcionando perfectamente.",
                "🔧",
                [
                    "Mantenimiento preventivo y correctivo",
                    "Actualizaciones de seguridad",
                    "Optimización de rendimiento",
                    "Soporte técnico 24/7",
                    "Backup y recuperación",
                    "Monitoreo continuo",
                    "Reportes mensuales de estado"
                ],
                ["Todas las tecnologías", "Monitoreo", "Backup", "Seguridad"],
                800,
                "Mensual"
            )
        ];
    }
}