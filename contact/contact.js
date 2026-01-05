// Contact Form JavaScript - Safe Web3Forms submission

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (!contactForm || !formMessage) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values safely
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const enquiryType = document.getElementById('enquiryType')?.value;
        const ready = document.querySelector('input[name="ready"]:checked')?.value;
        const termsAccepted = document.getElementById('termsCheck')?.checked;
        const message = document.getElementById('message')?.value.trim();

        // Validate required fields
        if (!name || !email || !message || !ready || !termsAccepted || !enquiryType) {
            showMessage('Please fill in all required fields.', 'danger');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'danger');
            return;
        }

        // Prepare form data for Web3Forms
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // Hide the form and show success message
            contactForm.style.display = 'none';
            showMessage(`Thank you, ${name}! We'll get back to you within 24 hours.`, 'success');
            console.log('Form submitted successfully:', data);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showMessage('Oops! Something went wrong. Please try again.', 'danger');
        });
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
                    setTimeout(() => { formMessage.innerHTML = ''; }, 150);
                }
            }, 5000);
        }
    }
}); 