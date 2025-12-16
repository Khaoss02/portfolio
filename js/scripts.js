document.addEventListener('DOMContentLoaded', () => {

    // Función para igualar la altura de todas las tarjetas visibles
    function setEqualHeight(selector) {
        const projects = document.querySelectorAll(selector);

        if (projects.length === 0) return;
        
        // 1. Resetear la altura para calcular la altura real más grande
        projects.forEach(project => {
            project.style.height = 'auto';
        });

        // 2. Encontrar la altura máxima entre proyectos visibles
        let maxHeight = 0;
        projects.forEach(project => {
            if (!project.classList.contains('hidden-project') && project.offsetHeight > maxHeight) {
                maxHeight = project.offsetHeight;
            }
        });

        // 3. Aplicar la altura máxima a todas las tarjetas visibles
        projects.forEach(project => {
            if (!project.classList.contains('hidden-project')) {
                // Margen de seguridad para evitar desbordamiento
                project.style.height = `${maxHeight + 10}px`; 
            }
        });
    }

    const track = document.querySelector('.projects-track');
    const projects = Array.from(document.querySelectorAll('.project'));
    const prevBtn = document.querySelector('.carousel-btn.left');
    const nextBtn = document.querySelector('.carousel-btn.right');
    let currentIndex = 0;
    
    // Salir si faltan elementos clave del carrusel
    if (!track || projects.length === 0 || !prevBtn || !nextBtn) return;

    function getVisibleProjectsCount() {
        return projects.filter(p => !p.classList.contains('hidden-project')).length;
    }

    function getProjectsPerView() {
        const viewportWidth = document.querySelector('.projects-viewport').getBoundingClientRect().width;
        const firstVisibleProject = projects.find(p => !p.classList.contains('hidden-project'));
        if (!firstVisibleProject) return 1;
        
        // Ancho del proyecto + gap (32px = 2rem)
        const projectWidth = firstVisibleProject.getBoundingClientRect().width + 32;
        return Math.floor(viewportWidth / projectWidth);
    }

    function updateCarousel() {
        const firstVisibleProject = projects.find(p => !p.classList.contains('hidden-project'));
        
        if (!firstVisibleProject) {
            track.style.transform = 'translateX(0)';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        const projectWidth = firstVisibleProject.getBoundingClientRect().width + 32; 
        track.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
        
        const visibleCount = getVisibleProjectsCount();
        const projectsPerView = getProjectsPerView();
        
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= visibleCount - projectsPerView; 
    }


    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < getVisibleProjectsCount() - getProjectsPerView()) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Filtra proyectos por categoría (web, mobile, all) y es compatible con el carrusel.
    window.filterProjects = function(category) {
        
        projects.forEach(project => {
            const shouldShow = category === 'all' || project.getAttribute('data-category') === category;
            
            // Oculta/muestra usando la clase CSS para el carrusel
            project.classList.toggle('hidden-project', !shouldShow);
        });

        currentIndex = 0;
        
        // Retraso para que el CSS aplique los cambios antes de medir las alturas
        setTimeout(() => {
            setEqualHeight('.projects-track .project');
            updateCarousel();
        }, 50);

        // Actualizar botones de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        document.querySelector(`.filter-btn[onclick="filterProjects('${category}')"]`)
            .classList.add('active');
        document.querySelector(`.filter-btn[onclick="filterProjects('${category}')"]`)
            .setAttribute('aria-pressed', 'true');
    }

    // Lógica para abrir/cerrar el menú de navegación
    document.querySelector('.menu-toggle').addEventListener('click', function(event) {
        document.querySelector('.menu').classList.add('active');
        event.target.setAttribute('aria-expanded', 'true');
    });

    document.querySelector('.menu-close').addEventListener('click', function(event) {
        document.querySelector('.menu').classList.remove('active');
        document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    });

    // Cambia el idioma de los textos visibles en el HTML (¡ARREGLADO!)
    window.changeLanguage = function(lang) {
        document.documentElement.lang = lang;
        const glitch = document.querySelector('.glitch');
        const allEnglish = document.querySelectorAll('.en');
        const allSpanish = document.querySelectorAll('.es');
        
        const isSpanish = lang === 'es';
        
        // 1. Ocultar/Mostrar elementos en todo el documento (incluyendo el menú de navegación)
        allEnglish.forEach(el => {
            el.classList.toggle('hidden', isSpanish); 
        });
        
        allSpanish.forEach(el => {
            el.classList.toggle('hidden', !isSpanish);
        });

        // 2. Actualizar el título principal (Glitch)
        if (isSpanish) {
            glitch.setAttribute('data-text', "¡Hola! Soy Andrei.");
            glitch.textContent = "¡Hola! Soy Andrei.";
        } else {
            glitch.setAttribute('data-text', "Hello there! I'm Andrei.");
            glitch.textContent = "Hello there! I'm Andrei.";
        }
        
        // 3. Ajustar la altura de las tarjetas tras cambiar el idioma
        setTimeout(() => {
            setEqualHeight('.projects-track .project');
            updateCarousel(); 
        }, 50);
    }

    // Inicialización al cargar la página
    window.onload = function() {
        // Inicializar con el idioma del HTML (o 'en' por defecto)
        window.changeLanguage(document.documentElement.lang || 'en');
        
        // Ejecución inicial del carrusel para medir alturas y posición
        setEqualHeight('.projects-track .project');
        updateCarousel();
    };

    // Ajustar todo al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        setEqualHeight('.projects-track .project');
        updateCarousel();
    });
}); 