// ═══════════════════════════════════════════════════════════════════════════
// VOICES — Professional Corporate Website
// Enhanced animations and interactions
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    
    // ═══════════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 72; // Navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════
    // NAVBAR SCROLL EFFECT (FLOATING CAPSULE)
    // ═══════════════════════════════════════════════════════════════════════
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // MOBILE MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════════════

    const mobileBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // ACTIVE NAV LINK ON SCROLL
    // ═══════════════════════════════════════════════════════════════════════
    
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════
    // SCROLL REVEAL ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════
    
    // Create observer for adding 'active' class
    const createObserver = (threshold = 0.15, rootMargin = '0px 0px -50px 0px') => {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold, rootMargin });
    };
    
    // Observer for individual elements
    const elementObserver = createObserver(0.15);
    
    // Observe Info Cards
    document.querySelectorAll('.info-card').forEach(card => {
        elementObserver.observe(card);
    });
    
    // Observe Team Cards
    document.querySelectorAll('.team-card').forEach(card => {
        elementObserver.observe(card);
    });
    
    // Observe Essay Cards
    document.querySelectorAll('.essay-card').forEach(card => {
        elementObserver.observe(card);
    });
    
    // Observe Section Headers
    document.querySelectorAll('.section-header').forEach(header => {
        elementObserver.observe(header);
    });
    
    // Observe Featured Quote
    const featuredQuote = document.querySelector('.featured-quote');
    if (featuredQuote) {
        elementObserver.observe(featuredQuote);
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // LECTURER SECTION SLIDE ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════
    
    const lecturerVisual = document.querySelector('.lecturer-visual');
    const lecturerContent = document.querySelector('.lecturer-content');
    
    const lecturerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to trigger CSS animations
                if (lecturerVisual) lecturerVisual.classList.add('animate');
                if (lecturerContent) lecturerContent.classList.add('animate');
                lecturerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the lecturer section
    const lecturerSection = document.querySelector('.lecturer-section');
    if (lecturerSection) {
        // Set initial state
        if (lecturerVisual) {
            lecturerVisual.style.opacity = '0';
            lecturerVisual.style.transform = 'translateX(-50px)';
        }
        if (lecturerContent) {
            lecturerContent.style.opacity = '0';
            lecturerContent.style.transform = 'translateX(50px)';
        }
        lecturerObserver.observe(lecturerSection);
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MOBILE SCROLL INTERACTION FOR TEAM CARDS
    // ═══════════════════════════════════════════════════════════════════════

    // Only activate on smaller screens where hover isn't primary
    if (window.innerWidth <= 768) {
        const teamCards = document.querySelectorAll('.team-card');

        // Logic: Trigger when the element is in the "center" of the screen
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add hover class when in the sweet spot
                    entry.target.classList.add('mobile-hover');
                } else {
                    // Remove when leaving the sweet spot to allow the next one to light up
                    entry.target.classList.remove('mobile-hover');
                }
            });
        }, {
            // "Sweet Spot": The middle 50% of the screen height-wise
            // -25% from top and -25% from bottom creates a central activation zone
            rootMargin: '-25% 0px -25% 0px', 
            threshold: 0.2 // Trigger as soon as 20% of the card enters this central zone
        });

        teamCards.forEach(card => {
            teamObserver.observe(card);
        });
    }

});
