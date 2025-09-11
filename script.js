/**
 * Main JavaScript file for Dra. Yasmin Carvalho's Dental Clinic Landing Page
 * Implements advanced features with modern ES6 modules and best practices
 * 
 * Features:
 * - Carousel functionality for gallery and testimonials
 * - Intersection Observer for scroll animations
 * - Smooth scrolling navigation
 * - WhatsApp integration
 * - Responsive design enhancements
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components when DOM is ready
    initCarousels();
    initScrollAnimations();
    initSmoothScrolling();
    initWhatsAppButtons();
});

// ==============================
// CAROUSEL FUNCTIONALITY
// ==============================

/**
 * Initialize all carousels on the page
 */
function initCarousels() {
    initGalleryCarousel();
    initTestimonialsCarousel();
}

/**
 * Gallery Carousel Implementation
 */
function initGalleryCarousel() {
    const galleryCarousel = document.querySelector('.gallery__carousel');
    if (!galleryCarousel) return;
    
    const gallerySlides = galleryCarousel.querySelector('.gallery__slides');
    const galleryPrevBtn = galleryCarousel.querySelector('.gallery__nav--prev');
    const galleryNextBtn = galleryCarousel.querySelector('.gallery__nav--next');
    const galleryItems = galleryCarousel.querySelectorAll('.gallery__slide');
    
    let galleryCurrentIndex = 0;
    const galleryTotalSlides = galleryItems.length;
    
    // Update gallery slide position
    function updateGallerySlide() {
        const slideWidth = galleryCarousel.offsetWidth;
        gallerySlides.style.transform = `translateX(-${galleryCurrentIndex * slideWidth}px)`;
    }
    
    // Next slide
    function nextGallerySlide() {
        galleryCurrentIndex = (galleryCurrentIndex + 1) % galleryTotalSlides;
        updateGallerySlide();
    }
    
    // Previous slide
    function prevGallerySlide() {
        galleryCurrentIndex = (galleryCurrentIndex - 1 + galleryTotalSlides) % galleryTotalSlides;
        updateGallerySlide();
    }
    
    // Event listeners
    if (galleryNextBtn) galleryNextBtn.addEventListener('click', nextGallerySlide);
    if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', prevGallerySlide);
    
    // Auto-advance gallery every 5 seconds
    let galleryInterval = setInterval(nextGallerySlide, 5000);
    
    // Pause auto-advance on hover
    if (galleryCarousel) {
        galleryCarousel.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });
        
        galleryCarousel.addEventListener('mouseleave', () => {
            galleryInterval = setInterval(nextGallerySlide, 5000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', updateGallerySlide);
}

/**
 * Testimonials Carousel Implementation
 */
function initTestimonialsCarousel() {
    const testimonialsCarousel = document.querySelector('.testimonials__carousel');
    if (!testimonialsCarousel) return;
    
    const testimonialsSlides = testimonialsCarousel.querySelector('.testimonials__slides');
    const testimonialsPrevBtn = testimonialsCarousel.querySelector('.testimonials__nav--prev');
    const testimonialsNextBtn = testimonialsCarousel.querySelector('.testimonials__nav--next');
    const testimonialsIndicators = testimonialsCarousel.querySelectorAll('.testimonials__indicator');
    const testimonialItems = testimonialsCarousel.querySelectorAll('.testimonials__slide');
    
    let testimonialsCurrentIndex = 0;
    const testimonialsTotalSlides = testimonialItems.length;
    
    // Update testimonials slide position
    function updateTestimonialsSlide() {
        const slideWidth = testimonialsCarousel.offsetWidth;
        testimonialsSlides.style.transform = `translateX(-${testimonialsCurrentIndex * slideWidth}px)`;
        updateIndicators();
    }
    
    // Update indicator dots
    function updateIndicators() {
        testimonialsIndicators.forEach((indicator, index) => {
            if (index === testimonialsCurrentIndex) {
                indicator.classList.add('testimonials__indicator--active');
            } else {
                indicator.classList.remove('testimonials__indicator--active');
            }
        });
    }
    
    // Next slide
    function nextTestimonialsSlide() {
        testimonialsCurrentIndex = (testimonialsCurrentIndex + 1) % testimonialsTotalSlides;
        updateTestimonialsSlide();
    }
    
    // Previous slide
    function prevTestimonialsSlide() {
        testimonialsCurrentIndex = (testimonialsCurrentIndex - 1 + testimonialsTotalSlides) % testimonialsTotalSlides;
        updateTestimonialsSlide();
    }
    
    // Go to specific slide
    function goToTestimonialSlide(index) {
        testimonialsCurrentIndex = index;
        updateTestimonialsSlide();
    }
    
    // Event listeners
    if (testimonialsNextBtn) testimonialsNextBtn.addEventListener('click', nextTestimonialsSlide);
    if (testimonialsPrevBtn) testimonialsPrevBtn.addEventListener('click', prevTestimonialsSlide);
    
    // Indicator click events
    testimonialsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToTestimonialSlide(index);
        });
    });
    
    // Auto-advance testimonials every 6 seconds
    let testimonialsInterval = setInterval(nextTestimonialsSlide, 6000);
    
    // Pause auto-advance on hover
    if (testimonialsCarousel) {
        testimonialsCarousel.addEventListener('mouseenter', () => {
            clearInterval(testimonialsInterval);
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            testimonialsInterval = setInterval(nextTestimonialsSlide, 6000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', updateTestimonialsSlide);
}

// ==============================
// SCROLL ANIMATIONS
// ==============================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers - show all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('is-visible');
        });
        return;
    }
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing this element after it becomes visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
    });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// ==============================
// SMOOTH SCROLLING
// ==============================

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    // Check for CSS scroll-behavior support
    const hasScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Prevent default behavior
            e.preventDefault();
            
            // Scroll to target
            if (hasScrollBehavior) {
                // Use CSS scroll-behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Fallback for older browsers
                smoothScrollTo(targetElement.offsetTop, 800);
            }
            
            // Update URL without page reload
            if (history.pushState) {
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Smooth scroll to position (fallback for older browsers)
 * @param {number} targetY - Target Y position
 * @param {number} duration - Animation duration in ms
 */
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        
        // Ease-out function
        const ease = 1 - Math.pow(1 - percent, 3);
        window.scrollTo(0, startY + diff * ease);
        
        if (time < duration) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// ==============================
// WHATSAPP INTEGRATION
// ==============================

/**
 * Initialize WhatsApp buttons with dynamic messaging
 */
function initWhatsAppButtons() {
    // Get all WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default for customization
            e.preventDefault();
            
            // Get the base URL
            let baseUrl = this.getAttribute('href');
            
            // Add timestamp to ensure fresh message
            const timestamp = new Date().getTime();
            baseUrl += `&timestamp=${timestamp}`;
            
            // Open in new window/tab
            window.open(baseUrl, '_blank');
            
            // Track event (if analytics were implemented)
            // gtag('event', 'click', {
            //     'event_category': 'CTA',
            //     'event_label': 'WhatsApp Button'
            // });
        });
    });
}

// ==============================
// UTILITY FUNCTIONS
// ==============================

/**
 * Debounce function to limit rate of execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit rate of execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==============================
// WINDOW EVENTS
// ==============================

// Handle window resize with debounce
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that depend on window size
    initCarousels();
}, 250));

// Handle scroll events with throttle
window.addEventListener('scroll', throttle(() => {
    // Could add scroll-based animations or effects here
}, 16)); // ~60fps

// ==============================
// MODULE EXPORTS (for future modularity)
// ==============================

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCarousels,
        initScrollAnimations,
        initSmoothScrolling,
        initWhatsAppButtons,
        debounce,
        throttle
    };
}
