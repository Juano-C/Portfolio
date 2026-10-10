(() => {
  const lightbox = document.getElementById('imageLightbox');
  if (!lightbox) return;
  const image = lightbox.querySelector('.lightbox-image');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let previousFocus = null;

  function openLightbox(trigger) {
    previousFocus = trigger;
    image.src = trigger.dataset.image;
    image.alt = trigger.dataset.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    image.src = '';
    if (previousFocus) previousFocus.focus();
  }
  document.querySelectorAll('.screenshot-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }
  });
})();
