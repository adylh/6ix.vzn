/**
 * ============================================
 * 6ix vzn - Custom JavaScript
 * Vanilla JS only, no frameworks
 * ============================================
 */

// ============================================
// DOCUMENT READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

/**
 * Initialize navbar scroll behavior
 * Adds 'scrolled' class when page is scrolled
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Check scroll position on load
    handleNavbarScroll(navbar);
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        handleNavbarScroll(navbar);
    });
    
    // Close mobile menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Check if mobile menu is open
            if (navbarCollapse.classList.contains('show')) {
                // Get Bootstrap collapse instance and hide it
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

/**
 * Handle navbar appearance based on scroll position
 * @param {HTMLElement} navbar - The navbar element
 */
function handleNavbarScroll(navbar) {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    // Get all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Get the target section
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Initialize fade-in animations on scroll
 * Uses Intersection Observer API for performance
 */
function initScrollAnimations() {
    // Get all elements with fade-in-scroll class
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,           // Use viewport as root
            rootMargin: '0px',    // No margin
            threshold: 0.1        // Trigger when 10% visible
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Add visible class with a slight delay for staggered effect
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, 100);
                    
                    // Stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe each element
        fadeElements.forEach(function(element) {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers - just show all elements
        fadeElements.forEach(function(element) {
            element.classList.add('visible');
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        const enquiryTypeField = document.getElementById('enquiryType');
        
        // Reset validation states
        resetValidation([nameField, emailField, messageField, enquiryTypeField]);
        
        // Validate form
        let isValid = true;
        
        // Validate name
        if (!validateRequired(nameField)) {
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailField)) {
            isValid = false;
        }
        
        // Validate message
        if (!validateRequired(messageField)) {
            isValid = false;
        }
        
        // Validate enquiry type
        if (!validateRequired(enquiryTypeField)) {
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // In a real implementation, you would send data to a server here
            // For now, we'll just show the success message
            
            // Hide form
            form.style.display = 'none';
            
            // Show success message
            formSuccess.style.display = 'block';
            
            // Optional: Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Log form data (for demonstration)
            console.log('Form submitted:', {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                message: messageField.value.trim(),
                enquiryType: enquiryTypeField.value.trim()
            });
        }
    });
}

/**
 * Reset validation states for given fields
 * @param {Array} fields - Array of form field elements
 */
function resetValidation(fields) {
    fields.forEach(field => {
        if (field) { // Only proceed if the field exists
            field.classList.remove('is-valid');
            field.classList.remove('is-invalid');
        }
    });
}

/**
 * Validate required field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateRequired(field) {
    const value = field.value.trim();
    
    if (value === '') {
        field.classList.add('is-invalid');
        return false;
    }
    
    return true;
}

/**
 * Validate email field
 * @param {HTMLElement} field - The email field to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(field) {
    const value = field.value.trim();
    
    // Check if empty
    if (value === '') {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Check email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        field.classList.add('is-invalid');
        return false;
    }
    
    return true;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls to a fixed rate
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}
