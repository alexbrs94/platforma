// Așteptăm încărcarea completă a DOM-ului
document.addEventListener('DOMContentLoaded', function() {
    // Inițializare Modal Login
    initializeLoginModal();
    
    // Activare animații la scroll
    initializeScrollAnimations();
    
    // Inițializare scroll smooth pentru link-uri de navigare
    initializeSmoothScroll();
    
    // Marcare pagină curentă în meniu
    markCurrentPage();
});

// Funcție pentru inițializarea modalului de login
function initializeLoginModal() {
    const openLoginModal = document.getElementById('openLoginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginModal = document.getElementById('loginModal');
    
    // Verifică dacă elementele există pe pagină
    if (openLoginModal && closeLoginModal && loginModal) {
        // Deschidere modal
        openLoginModal.addEventListener('click', function() {
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Previne scroll-ul pe pagină când modalul e deschis
        });
        
        // Închidere modal cu butonul X
        closeLoginModal.addEventListener('click', function() {
            loginModal.classList.remove('show');
            document.body.style.overflow = ''; // Permite din nou scroll-ul
        });
        
        // Închidere modal când se face click în afara acestuia
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('show');
                document.body.style.overflow = ''; // Permite din nou scroll-ul
            }
        });
        
        // Procesare formular login (simulare)
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Aici ar urma logica de autentificare reală
                alert('Funcționalitate de autentificare în dezvoltare!');
            });
        }
    }
}

// Funcție pentru activarea animațiilor la scroll
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    // Funcție care verifică dacă un element este vizibil în viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Funcție care adaugă clasa 'visible' la elementele care sunt vizibile
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
                
                // Aplicăm animația doar dacă elementul nu are 'visible' deja
                // Acest lucru previne re-animarea elementelor la scroll în sus și în jos
                if (!element.style.animationPlayState) {
                    element.style.opacity = '0';
                    
                    // Folosim setTimeout pentru a aplica animația după ce opacity e 0
                    setTimeout(() => {
                        element.style.animationPlayState = 'running';
                        element.style.opacity = ''; // Resetăm opacity ca să lăsăm animația să facă asta
                    }, 10);
                }
            }
        });
    }
    
    // Verificăm animațiile la încărcarea paginii și la scroll
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
}

// Funcție pentru scroll lin la link-uri de ancoră
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Nu facem nimic pentru "#" simplu sau pentru link-uri care nu au o țintă validă
            if (targetId === '#' || !document.querySelector(targetId)) {
                return;
            }
            
            const targetPosition = document.querySelector(targetId).offsetTop;
            
            window.scrollTo({
                top: targetPosition - 80, // Offset pentru header fix
                behavior: 'smooth'
            });
        });
    });
}

// Funcție pentru marcarea paginii curente în meniu
function markCurrentPage() {
    // Obține calea paginii curente
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Găsește toate link-urile din navigare
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Verifică fiecare link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Verifică dacă link-ul corespunde paginii curente sau paginii home
        if (href === currentPage || 
            (currentPage === 'index.html' && (href === '#home' || href === '/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}