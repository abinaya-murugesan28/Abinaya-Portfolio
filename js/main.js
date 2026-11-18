const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = isDark ? '☼' : '☾';
  localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
});
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☾' : '☼';
}

const showMore = document.querySelector('.show-more');
showMore.addEventListener('click', () => {
  document.querySelectorAll('.timeline-item.extra').forEach(item => item.classList.toggle('visible'));
  const expanded = document.querySelector('.timeline-item.extra').classList.contains('visible');
  showMore.textContent = expanded ? 'Show less' : 'Show more';
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxText = lightbox.querySelector('p');
document.querySelectorAll('.hobby-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.querySelector('img').src;
    lightboxImg.alt = card.querySelector('img').alt;
    lightboxText.textContent = card.dataset.caption;
    lightbox.classList.add('open');
  });
});
function closeLightbox() { lightbox.classList.remove('open'); }
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
