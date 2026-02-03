/**
 * INDEX.JS - Page d'Accueil
 * Site: Mamadou Olele Diallo
 * Stats Counter & Results Slider
 */

// ===== STATS COUNTER ANIMATION =====
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animationDuration = 2000; // 2 secondes
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        // Observer pour démarrer l'animation au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observer la première carte de stats
        const firstStatCard = document.querySelector('.stat-card');
        if (firstStatCard) {
            observer.observe(firstStatCard);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-value'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const increment = target / (this.animationDuration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = this.formatNumber(Math.floor(current)) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = this.formatNumber(target) + suffix;
                }
            };
            
            updateCounter();
        });
    }
    
    formatNumber(num) {
        // Formate les nombres avec espaces pour les milliers
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

// ===== RESULTS SLIDER =====
class ResultsSlider {
    constructor(sliderId) {
        this.slider = document.getElementById(sliderId);
        if (!this.slider) return;
        
        this.cards = this.slider.querySelectorAll('.result-card');
        this.currentIndex = 0;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        
        this.init();
    }
    
    init() {
        // Touch/Mouse events pour le swipe
        this.slider.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.slider.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.slider.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.slider.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Touch events pour mobile
        this.slider.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.slider.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.slider.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Auto-scroll optionnel (désactivé par défaut)
        // this.startAutoScroll();
    }
    
    // ===== MOUSE EVENTS =====
    handleMouseDown(e) {
        this.isDown = true;
        this.slider.style.cursor = 'grabbing';
        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
    }
    
    handleMouseLeave() {
        this.isDown = false;
        this.slider.style.cursor = 'grab';
    }
    
    handleMouseUp() {
        this.isDown = false;
        this.slider.style.cursor = 'grab';
    }
    
    handleMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        
        const x = e.pageX - this.slider.offsetLeft;
        const walk = (x - this.startX) * 2; // Vitesse du scroll
        this.slider.scrollLeft = this.scrollLeft - walk;
    }
    
    // ===== TOUCH EVENTS =====
    handleTouchStart(e) {
        this.startX = e.touches[0].pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
    }
    
    handleTouchMove(e) {
        const x = e.touches[0].pageX - this.slider.offsetLeft;
        const walk = (x - this.startX) * 2;
        this.slider.scrollLeft = this.scrollLeft - walk;
    }
    
    handleTouchEnd() {
        // Snap to nearest card
        this.snapToCard();
    }
    
    // ===== SNAP TO CARD =====
    snapToCard() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 16; // Gap entre les cards (en px)
        const scrollPosition = this.slider.scrollLeft;
        const index = Math.round(scrollPosition / (cardWidth + gap));
        
        this.scrollToCard(index);
    }
    
    scrollToCard(index) {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 16;
        const scrollPosition = index * (cardWidth + gap);
        
        this.slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        this.currentIndex = index;
    }
    
    // ===== AUTO SCROLL (Optionnel) =====
    startAutoScroll(interval = 3000) {
        this.autoScrollInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.cards.length;
            this.scrollToCard(this.currentIndex);
        }, interval);
        
        // Arrêter l'auto-scroll au hover
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoScroll();
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.startAutoScroll(interval);
        });
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
}

// ===== HERO PARALLAX EFFECT (DÉSACTIVÉ POUR SCROLL FLUIDE) =====
function initHeroParallax() {
    // Désactivé pour garantir un scroll fluide
    // Le parallax peut causer des accrochages sur certains navigateurs
    return;
}

// ===== CTA BUTTONS ANIMATION =====
function initCTAAnimation() {
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== FEATURE CARDS STAGGER ANIMATION =====
function initFeatureCardsAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Délai entre chaque carte
            }
        });
    }, {
        threshold: 0.2
    });
    
    featureCards.forEach(card => observer.observe(card));
}

// ===== STATS CARDS STAGGER ANIMATION =====
function initStatsCardsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.3
    });
    
    statCards.forEach(card => observer.observe(card));
}

// ===== SOCIAL PLATFORMS HOVER EFFECT =====
function initSocialPlatformsHover() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    
    platformBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== IMAGE PLACEHOLDER ANIMATION =====
function animateImagePlaceholders() {
    const placeholders = document.querySelectorAll('.profile-image-placeholder, .result-image-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.style.animation = 'pulse 2s ease-in-out infinite';
    });
}

// ===== INITIALISATION =====
// ===== FAQ ACCORDÉON =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle l'item cliqué
            item.classList.toggle('active');
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('📊 Page Accueil - Scripts chargés');
    
    // Initialiser le counter de stats
    new StatsCounter();
    
    // Initialiser le slider
    new ResultsSlider('resultsSlider');
    
    // Initialiser les animations
    initHeroParallax();
    initCTAAnimation();
    initFeatureCardsAnimation();
    initStatsCardsAnimation();
    initSocialPlatformsHover();
    animateImagePlaceholders();
    
    // Initialiser l'accordéon FAQ
    initFAQ();
});

// ===== EXPORT POUR USAGE EXTERNE =====
window.homePageUtils = {
    StatsCounter,
    ResultsSlider
};