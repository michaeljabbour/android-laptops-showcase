// Android Laptops Showcase - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroDevice = document.querySelector('.hero-device');
    const floatingElements = document.querySelectorAll('.float-element');

    if (hero && heroDevice) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < hero.offsetHeight) {
                heroDevice.style.transform = `translateY(${rate}px)`;
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.1;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll(
        '.device-card, .feature-card, .spec-category, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Device card hover effects
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        const cardImage = card.querySelector('.device-img');
        
        card.addEventListener('mouseenter', () => {
            if (cardImage) {
                cardImage.style.transform = 'scale(1.05) rotate(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (cardImage) {
                cardImage.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Dynamic specs counter animation
    const specValues = document.querySelectorAll('.spec-value');
    const numberRegex = /(\d+)/g;

    const animateNumbers = (element) => {
        const text = element.textContent;
        const numbers = text.match(numberRegex);
        
        if (numbers) {
            numbers.forEach(num => {
                const finalValue = parseInt(num);
                if (finalValue > 1 && finalValue < 1000) {
                    let currentValue = 0;
                    const increment = finalValue / 30;
                    
                    const updateNumber = () => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                        }
                        
                        element.textContent = text.replace(num, Math.floor(currentValue).toString());
                        
                        if (currentValue < finalValue) {
                            requestAnimationFrame(updateNumber);
                        }
                    };
                    
                    updateNumber();
                }
            });
        }
    };

    // Observe spec sections for number animations
    const specObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const specValues = entry.target.querySelectorAll('.spec-value');
                specValues.forEach(animateNumbers);
                specObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.spec-category').forEach(section => {
        specObserver.observe(section);
    });

    // Cursor trail effect
    const createCursorTrail = () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    };

    // Initialize cursor trail
    createCursorTrail();

    // Button interaction effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Dynamic background particles
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    };

    // Initialize particles
    createParticles();

    // Auto-scroll detection for navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const highlightNav = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    
    const optimizedScrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.removeEventListener('scroll', highlightNav);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Easter egg: Konami code
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            document.body.classList.add('matrix-mode');
            setTimeout(() => {
                document.body.classList.remove('matrix-mode');
            }, 5000);
        }
    });

    console.log('🤖 AndroidBook Showcase loaded successfully!');
    console.log('💡 Tip: Try the Konami code for a surprise...');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }, 0);
    });
}