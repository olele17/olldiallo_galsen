/**
 * GLOBAL.JS - Scripts Communs
 * Site: Mamadou Olele Diallo
 * Navigation SPA, Animations
 */

// ===== VARIABLES GLOBALES =====
const header = document.getElementById('header');
const mainNav = document.getElementById('mainNav');
const menuBurger = document.getElementById('menuBurger');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

// ===== NAVIGATION (liens vers pages HTML) =====
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si le lien pointe vers une page HTML, laisser le navigateur gérer (pas d'interception)
            const href = link.getAttribute('href');
            if (href && (href.endsWith('.html') || href.startsWith('http'))) {
                return;
            }
            e.preventDefault();

            const targetPage = link.getAttribute('data-page');
            if (!targetPage) return;

            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Masquer toutes les sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(targetPage);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuBurger.classList.remove('active');
            }
        });
    });
}

// ===== MENU BURGER (Mobile) =====
function initMenuBurger() {
    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBurger.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuBurger.contains(e.target)) {
                mainNav.classList.remove('active');
                menuBurger.classList.remove('active');
            }
        });
    }
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter classe scrolled après 50px
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec classe fade-in ou scale-in
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL POUR LES ANCRES =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ne pas intercepter les liens de navigation SPA
            if (this.hasAttribute('data-page')) {
                return;
            }
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== PRELOADER (Optionnel) =====
function removePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
}

// ===== DÉTECTION MOBILE =====
function isMobile() {
    return window.innerWidth <= 768;
}

// ===== GESTION RESPONSIVE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Fermer le menu mobile si on passe en desktop
        if (!isMobile() && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuBurger.classList.remove('active');
        }
    }, 250);
});

// ===== PERFORMANCE: DEBOUNCE FUNCTION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour navigateurs sans IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC pour fermer le menu mobile
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuBurger.classList.remove('active');
        }
    });
}

// ===== INITIALISATION AU CHARGEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Site Mamadou Olele Diallo - Initialized');
    
    initNavigation();
    initMenuBurger();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initLazyLoading();
    initKeyboardNavigation();
    removePreloader();
});

// ===== EXPORT POUR USAGE DANS D'AUTRES FICHIERS =====
window.siteUtils = {
    isMobile,
    debounce
};