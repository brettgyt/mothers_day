const setupCarousel = (track, prev, next, counter) => {
  if (!track || !prev || !next) return;

  const cards = track.querySelectorAll('article');
  const total = cards.length;
  const pad = (n) => String(n).padStart(2, '0');

  const stepSize = () => {
    const card = track.querySelector('article');
    if (!card) return track.clientWidth;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const getIndex = () => {
    const step = stepSize();
    if (step <= 0) return 0;
    return Math.max(0, Math.min(total - 1, Math.round(track.scrollLeft / step)));
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
    if (counter && total) {
      counter.textContent = `${pad(getIndex() + 1)} / ${pad(total)}`;
    }
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -stepSize(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: stepSize(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
};

document.querySelectorAll('.carousel-track').forEach((track) => {
  if (!track.id) return;
  const prev = document.querySelector(`[data-carousel-prev="${track.id}"]`);
  const next = document.querySelector(`[data-carousel-next="${track.id}"]`);
  const counter = document.querySelector(`[data-carousel-counter="${track.id}"]`);
  setupCarousel(track, prev, next, counter);
});
