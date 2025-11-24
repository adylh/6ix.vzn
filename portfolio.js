// Portfolio Page JavaScript

const portfolioItems = [
    {
        title: "Modern Brand Identity",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
        description: "Complete brand identity package including logo, color palette, and brand guidelines for a tech startup.",
        tags: ["Branding", "Logo Design"]
    },
    {
        title: "YouTube Thumbnail Series",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
        description: "Eye-catching thumbnail designs optimized for maximum click-through rates on YouTube platform.",
        tags: ["Thumbnails", "Social Media"]
    },
    {
        title: "Album Cover Design",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80",
        description: "Artistic album cover design for an independent artist's debut release.",
        tags: ["Album Art", "Music"]
    },
    {
        title: "Product Promo Video",
        category: "Video Editing",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
        description: "Dynamic product showcase with smooth transitions and engaging visuals for e-commerce platform.",
        tags: ["Short-Form", "Marketing"]
    },
    {
        title: "Podcast Intro Animation",
        category: "Video Editing",
        imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
        description: "Custom animated intro sequence for a business podcast series.",
        tags: ["Animation", "Podcast"]
    },
    {
        title: "Corporate Event Highlights",
        category: "Video Editing",
        imageUrl: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
        description: "Professional event coverage edited into engaging highlight reel for corporate conference.",
        tags: ["Long-Form", "Corporate"]
    },
    {
        title: "Social Media Campaign",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
        description: "Cohesive visual campaign across multiple social media platforms for product launch.",
        tags: ["Social Media", "Campaign"]
    },
    {
        title: "Short-Form Ad Series",
        category: "Video Editing",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
        description: "Series of 15-second social media ads optimized for Instagram and TikTok.",
        tags: ["Short-Form", "Advertising"]
    },
    {
        title: "Brand Guidelines Book",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80",
        description: "Comprehensive brand guidelines document for a national restaurant chain.",
        tags: ["Branding", "Corporate"]
    }
];

let currentFilter = 'all';

// Render portfolio items
function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    const filteredItems = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);
    
    grid.innerHTML = filteredItems.map((item, index) => `
        <div class="col-md-6 col-lg-4">
            <div class="card portfolio-card h-100" style="cursor: pointer;" data-index="${portfolioItems.indexOf(item)}">
                <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <span class="badge bg-accent mb-2">${item.category}</span>
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                    <div class="d-flex gap-2 flex-wrap">
                        ${item.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event to open modal
    grid.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = this.dataset.index;
            openModal(portfolioItems[index]);
        });
    });
}

// Open modal with item details
function openModal(item) {
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalImage').src = item.imageUrl;
    document.getElementById('modalImage').alt = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalTags').innerHTML = item.tags.map(tag => 
        `<span class="badge bg-accent me-2">${tag}</span>`
    ).join('');
    
    const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
    modal.show();
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            currentFilter = filter;
            
            // Update button states
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-accent');
                btn.classList.add('btn-outline-accent');
            });
            this.classList.remove('btn-outline-accent');
            this.classList.add('btn-accent');
            
            // Render filtered items
            renderPortfolio(filter);
        });
    });
    
    // Initial render
    renderPortfolio();
});