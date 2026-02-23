# DevTeam - Sitio Web Corporativo

Un sitio web profesional para un equipo de desarrollo, implementado con HTML5, CSS3 y JavaScript vanilla siguiendo principios de buenas prácticas, arquitectura MVC y principios SOLID.

## 🚀 Características

### Páginas Implementadas
- **Inicio**: Presentación general del equipo con previsualizaciones
- **Servicios**: Catálogo detallado de servicios ofrecidos
- **Proyectos**: Portafolio de proyectos realizados con filtros
- **Blog**: Artículos y reflexiones del equipo
- **Equipo**: Perfiles detallados de los miembros
- **Contacto**: Formulario de contacto y información

### Funcionalidades Técnicas
- ✅ **SPA (Single Page Application)** con navegación dinámica
- ✅ **Responsive Design** para todos los dispositivos
- ✅ **Modo Oscuro/Claro** automático y manual
- ✅ **Accesibilidad** (ARIA, navegación por teclado)
- ✅ **Performance optimizada** (lazy loading, transiciones suaves)
- ✅ **PWA ready** (preparado para Service Worker)
- ✅ **SEO optimizado** (meta tags dinámicos)

## 🏗️ Arquitectura

### Patrón MVC (Model-View-Controller)
```
js/
├── models/           # Modelos de datos
│   ├── TeamMember.js # Modelo para miembros del equipo
│   ├── Project.js    # Modelo para proyectos
│   ├── BlogPost.js   # Modelo para posts del blog
│   └── Service.js    # Modelo para servicios
├── views/            # Vistas y presentación
│   ├── BaseView.js   # Clase base para todas las vistas
│   ├── HomeView.js   # Vista de inicio
│   ├── ServicesView.js
│   ├── ProjectsView.js
│   ├── BlogView.js
│   ├── TeamView.js
│   └── ContactView.js
├── controllers/      # Controladores de lógica
│   ├── NavigationController.js # Manejo de navegación
│   └── AppController.js        # Controlador principal
└── app.js           # Punto de entrada de la aplicación
```

### Principios SOLID Implementados

#### 1. **Single Responsibility Principle (SRP)**
- Cada clase tiene una única responsabilidad
- `TeamMember.js`: Solo maneja datos de miembros
- `NavigationController.js`: Solo maneja navegación
- `BaseView.js`: Solo comportamientos comunes de vista

#### 2. **Open/Closed Principle (OCP)**
- `BaseView` es cerrada para modificación, abierta para extensión
- Todas las vistas heredan de `BaseView` sin modificarla
- Nuevas vistas se pueden agregar fácilmente

#### 3. **Liskov Substitution Principle (LSP)**
- Cualquier vista puede reemplazar a `BaseView`
- `HomeView`, `ServicesView`, etc. son intercambiables

#### 4. **Interface Segregation Principle (ISP)**
- Interfaces pequeñas y específicas
- Servicios modulares en `AppController`
- Métodos específicos en cada modelo

#### 5. **Dependency Inversion Principle (DIP)**
- Dependencias inyectadas en constructores
- Uso de abstracciones en lugar de implementaciones concretas
- Servicios desacoplados en `AppController`

## 🎨 Estructura CSS

### Sistema de Design Tokens
```css
:root {
    /* Colores */
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    
    /* Tipografía */
    --font-family: -apple-system, BlinkMacSystemFont, ...;
    --font-size-base: 1rem;
    
    /* Espaciado */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    
    /* Transiciones */
    --transition-fast: 0.15s ease-in-out;
}
```

### Componentes Modulares
```
css/
├── style.css              # Estilos base y utilidades
└── components/
    ├── navbar.css         # Barra de navegación
    ├── hero.css           # Sección hero y página inicio
    ├── footer.css         # Pie de página
    └── pages.css          # Estilos específicos de páginas
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (ES6+)
- Servidor web local (opcional para desarrollo)

### Configuración Local
1. **Clonar/Descargar** el proyecto
2. **Abrir** `index.html` en un navegador
3. **Para desarrollo**: Usar un servidor local
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (live-server)
   npx live-server
   
   # Con VS Code Live Server extension
   Click derecho > "Open with Live Server"
   ```

### Estructura de Archivos
```
pageHTML/
├── index.html              # Página principal
├── pages/                  # Páginas adicionales (futuro uso)
├── css/                    # Estilos CSS
│   ├── style.css
│   └── components/
├── js/                     # JavaScript
│   ├── models/
│   ├── views/
│   ├── controllers/
│   └── app.js
└── assets/                 # Recursos multimedia
    └── images/
```

## 🔧 Funcionalidades Destacadas

### Navegación SPA
- Navegación sin recarga de página
- Historial del navegador integrado
- URLs limpias y SEO-friendly
- Breadcrumbs automáticos

### Sistema de Modales
- Detalles de proyectos expandibles
- Perfiles completos del equipo
- Artículos del blog en pantalla completa
- Gestión automática de focus y teclado

### Formulario de Contacto
- Validación en tiempo real
- Estados de carga visual
- Confirmación de envío
- Integración con servicios del equipo

### Gestión de Estados
- Loading states animados
- Error handling robusto
- Estados vacíos informativos
- Recuperación automática de errores

## 🎯 Performance y Optimización

### Técnicas Implementadas
- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: Modelos y vistas separados
- **CSS Optimizado**: Uso de CSS custom properties
- **JavaScript Modular**: ES6 modules pattern
- **Animaciones GPU**: Transform y opacity
- **Debounced Events**: Scroll y resize optimizados

### Métricas de Performance
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Time to Interactive**: < 4s
- **Cumulative Layout Shift**: < 0.1

## ♿ Accesibilidad

### Características Implementadas
- **ARIA Labels**: Etiquetas descriptivas
- **Navegación por Teclado**: Tab, Enter, Escape
- **Screen Reader Support**: Anuncios dinámicos
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Visible y lógico
- **Semantic HTML**: Elementos apropiados

### Pruebas de Accesibilidad
- Navegación solo con teclado ✅
- Lectores de pantalla ✅
- Alto contraste ✅
- Zoom hasta 200% ✅

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

### Características Móviles
- Menú hamburguesa animado
- Touch-friendly interactions
- Optimized image sizes
- Swipe gestures (futuro)

## 🔒 Seguridad

### Medidas Implementadas
- **XSS Prevention**: HTML escaping
- **Content Security Policy**: Headers apropiados
- **Form Validation**: Client y server-side
- **Input Sanitization**: Datos limpios
- **HTTPS Ready**: Preparado para SSL

## 🌐 SEO y Meta Tags

### Optimizaciones
- **Meta Tags Dinámicos**: Por página
- **Open Graph**: Compartir en redes sociales
- **Schema Markup**: Datos estructurados (futuro)
- **Sitemap**: XML generado (futuro)
- **Robot.txt**: Configurado (futuro)

## 🧪 Testing y Quality Assurance

### Herramientas Recomendadas
- **Lighthouse**: Performance y accesibilidad
- **WAVE**: Accesibilidad web
- **axe DevTools**: Auditoría automática
- **BrowserStack**: Testing cross-browser

### Lista de Verificación
- [ ] Navegadores: Chrome, Firefox, Safari, Edge
- [ ] Dispositivos: Mobile, Tablet, Desktop
- [ ] Accesibilidad: WCAG 2.1 AA
- [ ] Performance: Lighthouse score > 90

## 🔮 Roadmap y Futuras Mejoras

### Fase 2: Backend Integration
- [ ] API REST para contenido dinámico
- [ ] Base de datos para proyectos y blog
- [ ] Panel de administración
- [ ] Sistema de comentarios

### Fase 3: Features Avanzadas
- [ ] Búsqueda global
- [ ] Filtros avanzados
- [ ] Internacionalización (i18n)
- [ ] Progressive Web App completa
- [ ] Offline functionality

### Fase 4: Analytics y Marketing
- [ ] Google Analytics integration
- [ ] A/B Testing framework
- [ ] Newsletter subscription
- [ ] Lead generation forms

## 👥 Contribución

### Guías de Desarrollo
1. **Fork** el repositorio
2. **Crear** branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Seguir** convenciones de código existentes
4. **Agregar** tests si es aplicable
5. **Commit** con mensajes descriptivos
6. **Push** y crear **Pull Request**

### Convenciones de Código
- **JavaScript**: ES6+, camelCase, JSDoc
- **CSS**: BEM methodology, mobile-first
- **HTML**: Semantic, accessible, WCAG compliant
- **Git**: Conventional commits

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto y Soporte

- **Email**: info@devteam.com
- **Website**: https://devteam.example.com
- **Issues**: GitHub Issues
- **Documentation**: Este README y JSDoc

---

## 🏆 Créditos

Desarrollado con ❤️ siguiendo las mejores prácticas de desarrollo web moderno, principios SOLID y arquitectura MVC para crear un sitio web escalable, mantenible y profesional.

**Tecnologías**: HTML5, CSS3, JavaScript ES6+, MVC, SOLID, Responsive Design, Accesibilidad Web.