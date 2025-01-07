// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize skill bars
function initializeSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--width', `${level}%`);
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('skill-category')) {
                setTimeout(() => {
                    initializeSkillBars();
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .education-card, .achievement-card, .skill-category, .cert-card').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Add active class to nav items on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            scrollTimeout = null;
        }, 100);
    }
});

// Initialize skill bars on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeSkillBars, 500);
});

// Toggle mobile navigation menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});
