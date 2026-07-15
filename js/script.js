// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Accordion-style dropdowns on mobile
document.querySelectorAll('.main-nav > ul > li').forEach((li) => {
  const link = li.querySelector('a');
  const dropdown = li.querySelector('.dropdown');
  if (!dropdown) return;
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      li.classList.toggle('open');
    }
  });
});

// ===== Hero slider =====
const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('heroDots');
let current = 0;
let heroInterval;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});

function goToSlide(index) {
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
}

function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

document.getElementById('heroNext').addEventListener('click', () => { nextSlide(); resetHeroInterval(); });
document.getElementById('heroPrev').addEventListener('click', () => { prevSlide(); resetHeroInterval(); });

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextSlide, 6000);
}
resetHeroInterval();

// ===== Generic carousels (awards / plants / management / vlogs) =====
document.querySelectorAll('.carousel-nav').forEach((btn) => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.target);
    const scrollAmount = track.querySelector('.carousel-item').offsetWidth + 24;
    track.scrollBy({
      left: btn.classList.contains('next') ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  });
});

// ===== Stats counter (animate on scroll into view) =====
const statEls = document.querySelectorAll('.stats h3');
let statsAnimated = false;

function animateStats() {
  statEls.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}
