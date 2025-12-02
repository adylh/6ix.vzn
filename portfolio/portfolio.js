// Portfolio Page JavaScript (Static Card Filtering)

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update button active styles
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-accent');
                btn.classList.add('btn-outline-accent');
            });

            this.classList.remove('btn-outline-accent');
            this.classList.add('btn-accent');

            // Show / Hide Cards
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});