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