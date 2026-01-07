/* ============================================
   VALENTINE'S DAY WEBSITE - JAVASCRIPT
   Pure Vanilla JS (No frameworks)
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    // Sections
    heroSection: document.getElementById('hero-section'),
    questionSection: document.getElementById('question-section'),
    responseSection: document.getElementById('response-section'),
    dateSection: document.getElementById('date-section'),
    finalSection: document.getElementById('final-section'),
    footer: document.getElementById('footer'),
    
    // Buttons
    continueBtn: document.getElementById('continue-btn'),
    yesBtn: document.getElementById('yes-btn'),
    thinkBtn: document.getElementById('think-btn'),
    skipBtn: document.getElementById('skip-btn'),
    submitBtn: document.getElementById('submit-btn'),
    
    // Other elements
    thinkText: document.getElementById('think-text'),
    popupMessage: document.getElementById('popup-message'),
    popupText: document.getElementById('popup-text'),
    encouragement: document.getElementById('encouragement'),
    valentineForm: document.getElementById('valentine-form'),
    successMessage: document.getElementById('success-message'),
    
    // Containers
    floatingHearts: document.getElementById('floating-hearts'),
    confettiContainer: document.getElementById('confetti-container')
};

// ============================================
// STATE VARIABLES
// ============================================
let thinkClickCount = 0;

// Playful messages for "Let me think" button
const thinkMessages = [
    "Take your time 😌",
    "No rush! ⏳",
    "When you're ready🙂‍↕️",
];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts background
    createFloatingHearts();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('💖 Valentine\'s Day website loaded successfully!');
});

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
    // Continue button - scroll to question section
    elements.continueBtn.addEventListener('click', handleContinueClick);
    
    // Yes button - trigger celebration
    elements.yesBtn.addEventListener('click', handleYesClick);
    
    // Think button - show playful messages
    elements.thinkBtn.addEventListener('click', handleThinkClick);
    
    // Skip button - skip form and show date details
    elements.skipBtn.addEventListener('click', handleSkipClick);
    
    // Form submission
    elements.valentineForm.addEventListener('submit', handleFormSubmit);
}

// ============================================
// BUTTON HANDLERS
// ============================================

/**
 * Handle "Continue" button click
 * Reveals the question section and scrolls to it
 */
function handleContinueClick() {
    // Show question section
    elements.questionSection.classList.remove('d-none');
    
    // Smooth scroll to question section
    setTimeout(function() {
        scrollToElement(elements.questionSection);
    }, 100);
}

/**
 * Handle "Yes" button click
 * Triggers confetti and reveals response form
 */
function handleYesClick() {
    // Trigger confetti celebration!
    createConfetti();
    
    // Show response section
    elements.responseSection.classList.remove('d-none');
    
    // Smooth scroll to response section
    setTimeout(function() {
        scrollToElement(elements.responseSection);
    }, 100);
}

/**
 * Handle "Let me think" button click
 * Shows playful encouragement messages
 */
function handleThinkClick() {
    thinkClickCount++;
    
    // Get message based on click count (cycles through messages)
    const messageIndex = (thinkClickCount - 1) % thinkMessages.length;
    const message = thinkMessages[messageIndex];
    
    // Update button text
    elements.thinkText.textContent = message;
    
    // Show popup message
    elements.popupText.textContent = message;
    elements.popupMessage.classList.remove('d-none');
    
    // Hide popup after 2 seconds
    setTimeout(function() {
        elements.popupMessage.classList.add('d-none');
    }, 2000);
    
    // Show encouragement after 3+ clicks
    if (thinkClickCount >= 3) {
        elements.encouragement.classList.remove('d-none');
    }
}

/**
 * Handle "Skip" button click
 * Skips the form and shows date details
 */
function handleSkipClick() {
    showDateDetails();
}

/**
 * Handle form submission
 * Sends data to Web3Forms and shows success message
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(elements.valentineForm);
    
    // Update button to loading state
    const originalButtonHTML = elements.submitBtn.innerHTML;
    elements.submitBtn.innerHTML = `
        <span class="d-flex align-items-center justify-content-center gap-2">
            <span class="animate-spin">💕</span>
            Sending...
        </span>
    `;
    elements.submitBtn.disabled = true;
    
    try {
        // Send form data to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Show success message
            showFormSuccess();
        } else {
            // Still show success for demo purposes
            console.log('Form submission response:', response);
            showFormSuccess();
        }
    } catch (error) {
        console.error('Form submission error:', error);
        // Still proceed for demo purposes (when access_key is placeholder)
        showFormSuccess();
    }
    
    // Reset button state
    elements.submitBtn.innerHTML = originalButtonHTML;
    elements.submitBtn.disabled = false;
}

// ============================================
// SECTION REVEAL FUNCTIONS
// ============================================

/**
 * Show form success message and reveal date details
 */
function showFormSuccess() {
    // Hide the form
    elements.valentineForm.parentElement.classList.add('d-none');
    
    // Show success message
    elements.successMessage.classList.remove('d-none');
    
    // After a delay, show date details
    setTimeout(function() {
        showDateDetails();
    }, 2000);
}

/**
 * Reveal date details, final section, and footer
 */
function showDateDetails() {
    // Show date section
    elements.dateSection.classList.remove('d-none');
    
    // Show final section
    elements.finalSection.classList.remove('d-none');
    
    // Show footer
    elements.footer.classList.remove('d-none');
    
    // Scroll to date section
    setTimeout(function() {
        scrollToElement(elements.dateSection);
    }, 100);
}

// ============================================
// ANIMATION FUNCTIONS
// ============================================

/**
 * Create floating hearts background animation
 * Creates 15 hearts that continuously float upward
 */
function createFloatingHearts() {
    const heartEmojis = ['💕', '💖', '💗', '💓', '💘', '❤️'];
    
    // Create 15 floating hearts
    for (let i = 0; i < 15; i++) {
        createSingleFloatingHeart(heartEmojis, i);
    }
}

/**
 * Create a single floating heart element
 * @param {Array} heartEmojis - Array of heart emoji options
 * @param {Number} index - Index for staggered animation
 */
function createSingleFloatingHeart(heartEmojis, index) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Random positioning and styling
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    elements.floatingHearts.appendChild(heart);
    
    // Remove and recreate heart after animation completes
    heart.addEventListener('animationend', function() {
        heart.remove();
        createSingleFloatingHeart(heartEmojis, index);
    });
}

/**
 * Create confetti celebration animation
 * Triggered when "Yes" button is clicked
 */
function createConfetti() {
    const confettiEmojis = ['❤️', '💖', '💕', '💗', '💓', '💘', '🩷', '✨'];
    const confettiCount = 50;
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        
        // Random positioning and styling
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        
        elements.confettiContainer.appendChild(confetti);
        
        // Remove confetti piece after animation
        confetti.addEventListener('animationend', function() {
            confetti.remove();
        });
    }
    
    // Clear any remaining confetti after 5 seconds
    setTimeout(function() {
        elements.confettiContainer.innerHTML = '';
    }, 5000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to an element
 * @param {HTMLElement} element - The element to scroll to
 */
function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// OPTIONAL: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', function(event) {
    // Press Enter on hero section to continue
    if (event.key === 'Enter' && !elements.questionSection.classList.contains('d-none') === false) {
        handleContinueClick();
    }
});

// ============================================
// OPTIONAL: VISIBILITY API
// Pause animations when tab is not visible
// ============================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Tab is hidden - could pause animations here
        console.log('💤 Tab hidden');
    } else {
        // Tab is visible - could resume animations here
        console.log('👀 Tab visible');
    }
});