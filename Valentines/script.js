// Hero photo upload
const heroInput = document.getElementById('hero-input');
const heroPreview = document.getElementById('hero-preview');
const heroPlaceholder = document.querySelector('.hero-portrait .upload-placeholder');

heroInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  heroPreview.src = URL.createObjectURL(file);
  heroPreview.hidden = false;
  heroPlaceholder.style.display = 'none';
});

// Memory grid (6 cards)
const grid = document.getElementById('memories-grid');
const TOTAL = 6;

for (let i = 0; i < TOTAL; i++) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';
  col.innerHTML = `
    <label for="memory-${i}" class="memory-card d-block shadow-soft">
      <img id="memory-img-${i}" alt="Memory ${i + 1}" hidden />
      <div class="memory-placeholder" id="memory-ph-${i}">
        <i class="bi bi-image display-5 shimmer"></i>
        <span class="small fw-medium">Add a memory</span>
      </div>
      <input type="file" id="memory-${i}" accept="image/*" hidden />
    </label>
    <input type="text" placeholder="Write a caption..." class="memory-caption" />
  `;
  grid.appendChild(col);

  const input = col.querySelector(`#memory-${i}`);
  const img = col.querySelector(`#memory-img-${i}`);
  const ph = col.querySelector(`#memory-ph-${i}`);

  input.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    img.src = URL.createObjectURL(file);
    img.hidden = false;
    ph.style.display = 'none';
  });
}

// Smooth scroll for anchor link
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
