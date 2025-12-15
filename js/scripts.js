function filterProjects(category) {
    var projects = document.getElementsByClassName('project');
    var filterBtns = document.getElementsByClassName('filter-btn');
    for (var i = 0; i < projects.length; i++) {
        projects[i].style.display = (category === 'all' || projects[i].getAttribute('data-category') === category) ? 'block' : 'none';
    }
    for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
        filterBtns[j].setAttribute('aria-pressed', 'false');
    }
    var activeBtn = document.getElementById('filter-' + category);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

document.querySelector('.menu-toggle').addEventListener('click', function(event) {
    document.querySelector('.menu').classList.add('active');
    event.target.setAttribute('aria-expanded', 'true');
});

document.querySelector('.menu-close').addEventListener('click', function(event) {
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
});

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    const glitch = document.querySelector('.glitch');
    const navLinks = document.querySelectorAll('.nav-link span');
    const allElements = document.querySelectorAll('.en, .es');

    if (lang === 'es') {
        // Hide English, show Spanish
        allElements.forEach(el => {
            if (el.classList.contains('en')) {
                el.classList.add('hidden');
            } else if (el.classList.contains('es')) {
                el.classList.remove('hidden');
            }
        });
        glitch.setAttribute('data-text', "¡Hola! Soy Andrei.");
        glitch.textContent = "¡Hola! Soy Andrei.";
        navLinks[0].textContent = "Habilidades";
        navLinks[1].textContent = "Proyectos";
        navLinks[2].textContent = "Educación";
        navLinks[3].textContent = "Certificaciones";
        navLinks[4].textContent = "Contacto";
    } else {
        // Hide Spanish, show English
        allElements.forEach(el => {
            if (el.classList.contains('es')) {
                el.classList.add('hidden');
            } else if (el.classList.contains('en')) {
                el.classList.remove('hidden');
            }
        });
        glitch.setAttribute('data-text', "Hello there! I'm Andrei.");
        glitch.textContent = "Hello there! I'm Andrei.";
        navLinks[0].textContent = "Skills";
        navLinks[1].textContent = "Projects";
        navLinks[2].textContent = "Education";
        navLinks[3].textContent = "Certifications";
        navLinks[4].textContent = "Contact";
    }
}

window.onload = function() {
    changeLanguage('en');
};

// CAROUSEL + FILTRO
const track = document.querySelector('.projects-track');
const projects = Array.from(document.querySelectorAll('.project'));
const prevBtn = document.querySelector('.carousel-btn.left');
const nextBtn = document.querySelector('.carousel-btn.right');
let currentIndex = 0;

function updateCarousel() {
    const projectWidth = projects[0].getBoundingClientRect().width + 32; // + gap
    track.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
    
    // Actualizar botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getVisibleProjectsCount() - getProjectsPerView();
}

function getVisibleProjectsCount() {
    return projects.filter(p => !p.classList.contains('hidden-project')).length;
}

function getProjectsPerView() {
    const viewportWidth = document.querySelector('.projects-viewport').getBoundingClientRect().width;
    const projectWidth = projects[0].getBoundingClientRect().width + 32;
    return Math.floor(viewportWidth / projectWidth);
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

// Filtro actualizado (compatible con carousel)
function filterProjects(category) {
    let visibleCount = 0;
    
    projects.forEach(project => {
        const shouldShow = category === 'all' || project.getAttribute('data-category') === category;
        project.classList.toggle('hidden-project', !shouldShow);
        if (shouldShow) visibleCount++;
    });

    // Resetear al inicio al filtrar
    currentIndex = 0;
    updateCarousel();

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

// Inicializar
window.addEventListener('load', () => {
    updateCarousel();
});
window.addEventListener('resize', updateCarousel);