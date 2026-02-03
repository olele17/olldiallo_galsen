// ===================================
// FORMATIONS.JS - Page Formations
// Gestion de l'accordéon FAQ
// ===================================

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

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
});
