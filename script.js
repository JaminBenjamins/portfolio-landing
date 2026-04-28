document.addEventListener('DOMContentLoaded', () => {
    // ---- Custom Cursor Glow Effect ----
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        // Easing factor
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        if (cursorGlow) {
            cursorGlow.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Make glow bigger when hovering over buttons or links
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorGlow) {
                cursorGlow.style.width = '600px';
                cursorGlow.style.height = '600px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(11, 15, 25, 0) 70%)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if(cursorGlow) {
                cursorGlow.style.width = '400px';
                cursorGlow.style.height = '400px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(11, 15, 25, 0) 70%)';
            }
        });
    });

    // ---- Scroll Animations (Intersection Observer) ----
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // ---- Sticky Header ----
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // keep it a bit solid, or remove to make transparent
            header.classList.remove('scrolled');
        }
    });
});
