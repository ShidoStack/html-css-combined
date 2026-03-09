// Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('button,a,.flower-card,.plant-card,.occ-card,.bouquet-sm,.bouquet-featured').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// Header scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Filter tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.flower-card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      if (show) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

// Heart buttons
document.querySelectorAll('.fc-heart, .pc-heart').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const loved = btn.classList.toggle('loved');
    btn.textContent = loved ? '❤️' : '🤍';
  });
});

// Add to cart
let cartCount = 0;
const toast = document.getElementById('toast');
document.querySelectorAll('.add-to-cart, .pc-add').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    document.querySelector('.btn-cart').textContent = `🛍 Cart (${cartCount})`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// Newsletter
document.querySelector('.nl-form button').addEventListener('click', function() {
  const inp = document.querySelector('.nl-form input');
  if (inp.value) {
    this.textContent = '✓ You\'re in! 🌸';
    this.style.background = 'var(--green)';
    this.style.color = 'white';
    inp.value = '';
  }
});
