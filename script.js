const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const letterContent = document.getElementById('letterContent');
const readToggle = document.getElementById('readToggle');
readToggle.addEventListener('click', () => {
  const expanded = letterContent.classList.toggle('expanded');
  readToggle.textContent = expanded ? 'you reached the end ♡' : 'read the full letter ↓';
  if (expanded) letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');
surpriseBtn.addEventListener('click', () => {
  surpriseMessage.hidden = false;
  surpriseBtn.textContent = 'surprise unlocked ♡';
  surpriseBtn.disabled = true;
  surpriseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  for (let i = 0; i < 16; i++) {
    const star = document.createElement('span');
    star.textContent = ['✦', '♡', '✧'][i % 3];
    star.className = 'burst-star';
    star.style.left = `${8 + Math.random() * 84}%`;
    star.style.top = `${Math.random() * 100}%`;
    surpriseMessage.appendChild(star);
    setTimeout(() => star.remove(), 2200);
  }
});


// Countdown to October 30, 2026 (local time).
const countdownHours = document.getElementById('countHours');
const countdownMinutes = document.getElementById('countMinutes');
const countdownSeconds = document.getElementById('countSeconds');
const countdownText = document.getElementById('birthdayCountdownText');
function updateBirthdayCountdown() {
  const now = new Date();
  const birthday = new Date(2026, 9, 30, 0, 0, 0);
  const remaining = birthday.getTime() - now.getTime();
  if (remaining <= 0) {
    countdownHours.textContent = '00';
    countdownMinutes.textContent = '00';
    countdownSeconds.textContent = '00';
    countdownText.textContent = 'IT’S YOUR DAY!! happy birthday ♡';
    return;
  }
  const totalSeconds = Math.floor(remaining / 1000);
  countdownHours.textContent = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  countdownMinutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  countdownSeconds.textContent = String(totalSeconds % 60).padStart(2, '0');
  countdownText.textContent = 'one more sleep until your day ✨';
}
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

// Soft floating stars/hearts in the background.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const particleSymbols = ['✦', '♡', '✧', '·'];
  function makeAmbientParticle() {
    const particle = document.createElement('span');
    particle.className = 'ambient-particle';
    particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
    particle.style.setProperty('--left', `${Math.random() * 100}%`);
    particle.style.setProperty('--size', `${10 + Math.random() * 15}px`);
    particle.style.setProperty('--duration', `${6 + Math.random() * 6}s`);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 12500);
  }
  for (let i = 0; i < 12; i++) setTimeout(makeAmbientParticle, i * 280);
  setInterval(makeAmbientParticle, 850);
}

// Reveal sections gently as the visitor scrolls.
const revealItems = document.querySelectorAll('.section-heading, .calendar-layout, .quality-grid, .letter-side, .letter-paper, .wishes-section > .eyebrow, .wishes-section h2, .wishes-intro, .wish-list, .surprise-btn');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

// A little blue confetti burst when the surprise is opened.
function launchConfetti() {
  if (prefersReducedMotion) return;
  const colors = ['#4c9dff', '#8bd5ff', '#d7ecff', '#ffffff', '#2b6fc0'];
  for (let i = 0; i < 85; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    piece.style.setProperty('--fall', `${2.2 + Math.random() * 2.2}s`);
    piece.style.setProperty('--piece-color', colors[Math.floor(Math.random() * colors.length)]);
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}
const originalSurpriseClick = surpriseBtn.onclick;
surpriseBtn.addEventListener('click', launchConfetti);
