// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const ready = document.querySelector('input[name="ready"]:checked')?.value;
        const termsAccepted = document.getElementById('termsCheck').checked;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message || !ready || !termsAccepted) {
            showMessage('Please fill in all required fields.', 'danger');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'danger');
            return;
        }
        
        // Simulate form submission (in a real application, this would send data to a server)
        const formData = {
            name,
            email,
            service,
            ready,
            termsAccepted,
            message,
            timestamp: new Date().toISOString()
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showMessage('Thank you! We\'ll be in touch soon.', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showMessage('Oops! Something went wrong. Please try again.', 'danger');
        // });
    });
    
    function showMessage(text, type) {
        formMessage.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${text}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-dismiss success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const alert = formMessage.querySelector('.alert');
                if (alert) {
                    alert.classList.remove('show');
                    setTimeout(() => {
                        formMessage.innerHTML = '';
                    }, 150);
                }
            }, 5000);
        }
    }
});