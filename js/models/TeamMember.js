/**
 * Modelo para representar un miembro del equipo
 * Principio Single Responsibility: Solo maneja datos y comportamiento de miembros del equipo
 */
class TeamMember {
    constructor(id, name, position, email, bio, skills, image, socialLinks = {}) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.email = email;
        this.bio = bio;
        this.skills = skills;
        this.image = image;
        this.socialLinks = socialLinks;
    }

    // Método para obtener información completa del miembro
    getFullInfo() {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            email: this.email,
            bio: this.bio,
            skills: this.skills,
            image: this.image,
            socialLinks: this.socialLinks
        };
    }

    // Método para obtener el contacto
    getContactInfo() {
        return {
            name: this.name,
            email: this.email,
            socialLinks: this.socialLinks
        };
    }

    // Método para validar datos del miembro
    validate() {
        return this.name && this.position && this.email && this.bio;
    }

    // Método estático para crear múltiples miembros
    static createTeam() {
        return [
            new TeamMember(
                1,
                "Ana García",
                "Frontend Developer",
                "ana.garcia@devteam.com",
                "Desarrolladora frontend con 4 años de experiencia en React, Vue.js y Angular. Apasionada por crear interfaces de usuario intuitivas y accesibles.",
                ["JavaScript", "React", "Vue.js", "CSS3", "HTML5", "TypeScript"],
                "assets/images/team/ana.jpg",
                { github: "https://github.com/anagarcia", linkedin: "https://linkedin.com/in/anagarcia" }
            ),
            new TeamMember(
                2,
                "Carlos Rodríguez",
                "Backend Developer",
                "carlos.rodriguez@devteam.com",
                "Especialista en desarrollo backend con experiencia en Node.js, Python y bases de datos. Enfocado en arquitecturas escalables y seguras.",
                ["Node.js", "Python", "MongoDB", "PostgreSQL", "Docker", "AWS"],
                "assets/images/team/carlos.jpg",
                { github: "https://github.com/carlosrod", linkedin: "https://linkedin.com/in/carlosrod" }
            ),
            new TeamMember(
                3,
                "María López",
                "Full Stack Developer",
                "maria.lopez@devteam.com",
                "Desarrolladora full stack con amplia experiencia en tecnologías web modernas. Líder técnica del equipo con enfoque en mejores prácticas.",
                ["JavaScript", "Python", "React", "Django", "PostgreSQL", "Git"],
                "assets/images/team/maria.jpg",
                { github: "https://github.com/marialopez", linkedin: "https://linkedin.com/in/marialopez" }
            ),
            new TeamMember(
                4,
                "David Martínez",
                "DevOps Engineer",
                "david.martinez@devteam.com",
                "Ingeniero DevOps especializado en automatización, CI/CD y infraestructura cloud. Experto en contenedores y orquestación.",
                ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform", "Linux"],
                "assets/images/team/david.jpg",
                { github: "https://github.com/davidmartinez", linkedin: "https://linkedin.com/in/davidmartinez" }
            )
        ];
    }
}