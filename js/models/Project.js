/**
 * Modelo para representar un proyecto del equipo
 * Principio Single Responsibility: Solo maneja datos y comportamiento de proyectos
 */
class Project {
    constructor(id, title, description, technologies, status, startDate, endDate, teamMembers, images = [], githubUrl = null, liveUrl = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.status = status; // 'completed', 'in-progress', 'planning'
        this.startDate = startDate;
        this.endDate = endDate;
        this.teamMembers = teamMembers;
        this.images = images;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
    }

    // Método para obtener información completa del proyecto
    getFullInfo() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            technologies: this.technologies,
            status: this.status,
            startDate: this.startDate,
            endDate: this.endDate,
            teamMembers: this.teamMembers,
            images: this.images,
            githubUrl: this.githubUrl,
            liveUrl: this.liveUrl
        };
    }

    // Método para obtener resumen del proyecto
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            description: this.description.substring(0, 150) + '...',
            technologies: this.technologies.slice(0, 3),
            status: this.status
        };
    }

    // Método para calcular duración del proyecto
    getDuration() {
        if (this.startDate && this.endDate) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays} días`;
        }
        return 'En progreso';
    }

    // Método para validar datos del proyecto
    validate() {
        return this.title && this.description && this.technologies.length > 0 && this.status;
    }

    // Método estático para crear proyectos de ejemplo
    static createSampleProjects() {
        return [
            new Project(
                1,
                "Sistema de Gestión Empresarial",
                "Desarrollo de un sistema completo de gestión empresarial con módulos de inventario, facturación, recursos humanos y reportes. Implementado con arquitectura microservicios para garantizar escalabilidad y mantenibilidad.",
                ["React", "Node.js", "MongoDB", "Docker", "AWS"],
                "completed",
                "2025-01-15",
                "2025-06-30",
                [1, 2, 3],
                ["assets/images/project1-1.jpg", "assets/images/project1-2.jpg"],
                "https://github.com/devteam/sistema-gestion",
                "https://sistema-gestion.devteam.com"
            ),
            new Project(
                2,
                "Aplicación Móvil de E-commerce",
                "Desarrollo de una aplicación móvil multiplataforma para comercio electrónico, incluyendo catálogo de productos, carrito de compras, sistema de pagos y notificaciones push. Integrada con API REST y base de datos en la nube.",
                ["React Native", "Firebase", "Stripe", "Redux", "TypeScript"],
                "completed",
                "2025-03-01",
                "2025-08-15",
                [1, 3, 4],
                ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
                "https://github.com/devteam/ecommerce-mobile",
                "https://play.google.com/store/apps/devteam-ecommerce"
            ),
            new Project(
                3,
                "Plataforma de Aprendizaje Online",
                "Creación de una plataforma educativa con cursos interactivos, sistema de videoconferencias, evaluaciones automáticas y seguimiento del progreso estudiantil. Incluye panel administrativo para instructores.",
                ["Vue.js", "Python", "Django", "PostgreSQL", "WebRTC"],
                "in-progress",
                "2025-09-01",
                null,
                [2, 3, 4],
                ["assets/images/project3-1.jpg"],
                "https://github.com/devteam/learning-platform",
                null
            ),
            new Project(
                4,
                "Dashboard de Analytics",
                "Desarrollo de un dashboard interactivo para visualización de datos y análisis de métricas empresariales. Incluye gráficos dinámicos, filtros avanzados y exportación de reportes.",
                ["Angular", "D3.js", "Python", "FastAPI", "ClickHouse"],
                "planning",
                "2026-01-15",
                null,
                [1, 2],
                [],
                null,
                null
            )
        ];
    }
}