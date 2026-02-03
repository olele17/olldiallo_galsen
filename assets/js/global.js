// ===================================
// GLOBAL.JS - Scripts communs
// Menu Burger, Header, Animations, Smooth scroll, Lazy loading
// ===================================

(function() {
    'use strict';

    var header = document.getElementById('header');

    // ===== MENU BURGER =====
    function initMenuBurger() {
        var burger = document.getElementById('menuBurger');
        var nav = document.getElementById('mainNav');

        if (!burger || !nav) {
            console.error('Menu burger ou nav introuvable');
            return;
        }

        // Toggle menu
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var isActive = burger.classList.contains('active');

            if (isActive) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            } else {
                burger.classList.add('active');
                nav.classList.add('active');
                document.body.classList.add('menu-open');
                burger.setAttribute('aria-expanded', 'true');
            }
        });

        // Fermer menu sur clic lien
        var links = nav.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        }

        // Fermer menu sur clic extérieur
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });

        // Fermer menu sur ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });

        // Fermer menu au resize > 768px
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== PAGE ACTIVE =====
    function initActivePage() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var links = document.querySelectorAll('nav a');

        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                links[i].classList.add('active');
            } else {
                links[i].classList.remove('active');
            }
        }
    }

    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScroll() {
        if (!header) return;
        var lastScroll = 0;

        window.addEventListener('scroll', function() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });
    }

    // ===== SCROLL ANIMATIONS (fade-in, scale-in) =====
    function initScrollAnimations() {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('visible');
                }
            }
        }, observerOptions);

        var animatedElements = document.querySelectorAll('.fade-in, .scale-in');
        for (var j = 0; j < animatedElements.length; j++) {
            observer.observe(animatedElements[j]);
        }
    }

    // ===== SMOOTH SCROLL POUR LES ANCRES =====
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (this.hasAttribute('data-page')) return;
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    var target = document.querySelector(href);
                    if (target && header) {
                        var headerHeight = header.offsetHeight;
                        var targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    }

    // ===== LAZY LOADING IMAGES =====
    function initLazyLoading() {
        var images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        var img = entries[i].target;
                        if (img.dataset && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                }
            }, {});

            for (var j = 0; j < images.length; j++) {
                imageObserver.observe(images[j]);
            }
        } else {
            for (var k = 0; k < images.length; k++) {
                if (images[k].dataset && images[k].dataset.src) {
                    images[k].src = images[k].dataset.src;
                }
            }
        }
    }

    // ===== PRELOADER =====
    function removePreloader() {
        var preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.remove();
                }, 500);
            }, 500);
        }
    }

    // ===== UTILITAIRES =====
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function debounce(func, wait) {
        var timeout;
        return function() {
            var later = function() {
                timeout = null;
                func.apply(null, arguments);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== INITIALISATION =====
    function init() {
        initMenuBurger();
        initActivePage();
        initHeaderScroll();
        initScrollAnimations();
        initSmoothScroll();
        initLazyLoading();
        removePreloader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export pour usage dans d'autres fichiers
    window.siteUtils = {
        isMobile: isMobile,
        debounce: debounce
    };

})();
