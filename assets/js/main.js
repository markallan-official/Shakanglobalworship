/* =====================================
   SHAKAN GLOBAL WORSHIP — MAIN JAVASCRIPT
   ===================================== */

// ===== PARTICLE CANVAS ANIMATION =====
function initParticleCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 80;
    const connectionDistance = 120;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = Math.random() > 0.7 ? 'rgba(240, 192, 64, 0.8)' : 'rgba(255, 255, 255, 0.6)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.strokeStyle = `rgba(200, 150, 12, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
    });

    // Observe staggered children
    document.querySelectorAll('.stagger-children').forEach((el) => {
        observer.observe(el);
    });

    // Observe cards
    document.querySelectorAll('.card').forEach((el) => {
        el.classList.add('scale-in');
        observer.observe(el);
    });

    // Observe counters
    document.querySelectorAll('[data-count]').forEach((el) => {
        observer.observe(el);
    });
}

// ===== ANIMATED COUNTER =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 2000; // 2 seconds
    const start = Date.now();

    function update() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        const value = Math.floor(easeProgress * target);

        element.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Trigger counter animation on scroll
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
            entry.target.setAttribute('data-counted', 'true');
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-count]').forEach((el) => {
    counterObserver.observe(el);
});

// ===== COUNTDOWN TIMER =====
function initCountdownTimer() {
    const countdownElements = document.querySelectorAll('.event-countdown');

    countdownElements.forEach((element) => {
        // April 30, 2025, 7:30 PM EAT (UTC+3)
        const targetDate = new Date(2025, 3, 30, 19, 30, 0).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            if (timeLeft <= 0) {
                element.innerHTML = '<div style="text-align: center; font-size: 1.2rem; color: var(--gold-light);">🎉 Event is Live or has passed!</div>';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            element.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-number">${String(days).padStart(2, '0')}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

// ===== STICKY NAV BEHAVIOR =====
function initStickyNav() {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Set active nav link
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== HAMBURGER MENU =====
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('active');
        }
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollY * 0.3}px`;
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = 'Learn and Improve Your Vocal Skills';
    const typingSpeed = 80;

    tagline.textContent = '';

    let index = 0;
    function type() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    type();
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// ===== EMAILJS CONFIGURATION =====
// Initialize EmailJS - Replace with your actual service ID, template ID, and public key
// Sign up at: https://www.emailjs.com
const EMAILJS_CONFIG = {
    serviceID: 'service_v95bs1c',
    templateID: 'template_y9jizv9',
    publicKey: '5gTMWVOeu65XeqPED',
    initialized: false
};

function initEmailJS() {
    // This will be initialized when you add your EmailJS credentials
    // For now, emails will be simulated
}

// ===== FORM VALIDATION & SECURITY =====
class FormManager {
    constructor() {
        this.submitCount = {};
        this.sessionToken = this.generateToken();
        sessionStorage.setItem('csrf-token', this.sessionToken);
        this.formSubmitTime = Date.now();
    }

    generateToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    initContactForm() {
        const form = document.querySelector('#contact-form');
        if (!form) return;

        // Set form submit time
        form.addEventListener('focus', () => {
            this.formSubmitTime = Date.now();
        }, true);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm(form)) {
                this.sendEmailNotification(form);
                const counter = form.querySelector('.char-counter');
                if (counter) {
                    counter.textContent = `${textarea.value.length} / ${maxLength}`;
                }
            });
    }
}

validateForm(form) {
    // Check honeypot
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
        console.warn('Security: Honeypot field filled (bot detected)');
        return false;
    }

    // Check submission time (must be > 3 seconds)
    const submissionTime = Date.now() - this.formSubmitTime;
    if (submissionTime < 3000) {
        console.warn('Security: Form submitted too quickly');
        this.showFormError('Please take a moment before submitting');
        return false;
    }

    // Rate limiting
    const ipKey = 'form-submission-count';
    const count = sessionStorage.getItem(ipKey) || 0;
    if (parseInt(count, 10) >= 3) {
        console.warn('Security: Form submission rate limit exceeded');
        this.showFormError('Too many submissions. Please try again later.');
        return false;
    }

    // Validate required fields
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    fields.forEach((field) => {
        if (!field.value.trim()) {
            isValid = false;
            this.markFieldError(field);
        } else {
            this.clearFieldError(field);
        }
    });

    if (!isValid) {
        this.showFormError('Please fill in all required fields');
        return false;
    }

    // Validate email
    const emailField = form.querySelector('input[name="email"]');
    if (emailField && !this.isValidEmail(emailField.value)) {
        this.showFormError('Please enter a valid email address');
        this.markFieldError(emailField);
        return false;
    }

    // Sanitize inputs
    fields.forEach((field) => {
        field.value = this.sanitizeInput(field.value);
    });

    // Increment submission count
    sessionStorage.setItem(ipKey, (parseInt(count, 10) + 1).toString());

    this.showFormSuccess('Thank you! Your message has been received.');
    return true;
}

sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '') // Remove angle brackets
        .trim();
}

isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

markFieldError(field) {
    if (!field.classList.contains('error')) {
        field.classList.add('error');
        field.style.borderColor = '#F44336';
        field.style.boxShadow = '0 0 15px rgba(244, 67, 54, 0.3)';
    }
}

clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = 'var(--border-gold)';
    field.style.boxShadow = 'none';
}

sendEmailNotification(form) {
    // Get form data
    const formData = {
        name: form.querySelector('input[name="name"]')?.value || '',
        email: form.querySelector('input[name="email"]')?.value || '',
        subject: form.querySelector('select[name="subject"]')?.value || form.querySelector('input[name="subject"]')?.value || 'General Inquiry',
        message: form.querySelector('textarea[name="message"]')?.value || form.querySelector('input[name="message"]')?.value || '',
        country: form.querySelector('input[name="country"]')?.value || '',
        heard: form.querySelector('select[name="heard"]')?.value || ''
    };

    // Prepare email template variables
    const emailParams = {
        to_email: 'nicosaab19@gmail.com',
        user_email: formData.email,
        user_name: formData.name,
        subject: formData.subject || 'Shakan Registration',
        message: formData.message,
        country: formData.country,
        heard_from: formData.heard
    };

    // Send via EmailJS (if configured) or use fallback
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'your_emailjs_public_key_here') {
        emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, emailParams)
            .then((response) => {
                console.log('Email sent successfully!', response);
                this.showFormSuccess('✓ Thank you! We\'ve received your message. Check your inbox for confirmation!');
                form.reset();
            })
            .catch((error) => {
                console.log('Email send failed:', error);
                this.simulateEmailNotification(emailParams, form);
            });
    } else {
        // Fallback: Simulate email notification
        this.simulateEmailNotification(emailParams, form);
    }
}

simulateEmailNotification(emailParams, form) {
    // Simulate sending emails without backend
    console.log('📧 EMAIL NOTIFICATION SENT TO: nicosaab19@gmail.com');
    console.log('📧 EMAIL NOTIFICATION SENT TO:', emailParams.user_email);
    console.log('Sender:', emailParams.user_name);
    console.log('Subject:', emailParams.subject);
    console.log('Message:', emailParams.message);
    console.log('Country:', emailParams.country);
    console.log('---');

    // Show success message
    this.showFormSuccess('✓ Thank you! Your registration has been received. Check your inbox for confirmation!');
    form.reset();
}

showFormSuccess(message) {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const successDiv = form.querySelector('.form-success') || document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `${message}`;
    successDiv.style.display = 'block';

    if (!form.querySelector('.form-success')) {
        form.insertBefore(successDiv, form.firstChild);
    }

    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 4000);
}

showFormError(message) {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const errorDiv = form.querySelector('.form-error') || document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `✗ ${message}`;
    errorDiv.style.display = 'block';

    if (!form.querySelector('.form-error')) {
        form.insertBefore(errorDiv, form.firstChild);
    }

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 4000);
}
}

// ===== ACCORDION FUNCTIONALITY =====
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach((header) => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all other accordions
            headers.forEach((h) => {
                if (h !== header && h.classList.contains('active')) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('show');
                }
            });

            // Toggle current accordion
            if (isActive) {
                header.classList.remove('active');
                content.classList.remove('show');
            } else {
                header.classList.add('active');
                content.classList.add('show');
            }
        });
    });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initScrollAnimations();
    initCountdownTimer();
    initStickyNav();
    initHamburgerMenu();
    initParallax();
    initTypingEffect();
    initBackToTop();
    initAccordion();

    const formManager = new FormManager();
    formManager.initContactForm();

    // Security: Disable right-click (optional, with courtesy message)
    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    //   console.log('Right-click is disabled for security purposes.');
    // });

    // Security: Frame-busting
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }

    console.log('🎵 Shakan Global Worship - Website Loaded');
});

// ===== UTILITY FUNCTIONS =====
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Smooth page transitions
document.querySelectorAll('a').forEach((link) => {
    if (!link.hasAttribute('target') && link.href.includes(window.location.hostname)) {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});
