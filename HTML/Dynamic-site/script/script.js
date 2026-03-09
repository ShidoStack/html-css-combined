    // ── THEME TOGGLE ──
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    toggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      toggle.textContent = isDark ? '☾' : '☀';
    });

    // ── STEP INTERACTION ──
    const steps = document.querySelectorAll('.step-item');
    const visualLabels = [
      'Workspace setup',
      'Integrations',
      'AI scheduling active',
      'Sprint delivery'
    ];

    steps.forEach(step => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        const idx = parseInt(step.dataset.step);
        document.querySelector('.vp-label').textContent = visualLabels[idx];
      });
    });

    // Auto-rotate steps
    let current = 0;
    setInterval(() => {
      current = (current + 1) % steps.length;
      steps.forEach(s => s.classList.remove('active'));
      steps[current].classList.add('active');
      document.querySelector('.vp-label').textContent = visualLabels[current];
    }, 3200);

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .step-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // ── SMOOTH NAV HIGHLIGHT ──
    const sections = document.querySelectorAll('section[id], div[id="logos"]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--text)';
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
