// Function to manage body scrolling for overlays
export const manageBodyScroll = (overlay, action) => {
  if (action === 'disable') {
    const scrollPosition = window.scrollY || window.pageYOffset;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.add('body-no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
  } else if (action === 'enable') {
    overlay.classList.remove('open');
    overlay.removeAttribute('aria-hidden');
    document.body.classList.remove('body-no-scroll');
    const scrollPosition = Math.abs(parseInt(document.body.style.top || '0', 10));
    document.body.style.removeProperty('top');
    window.scrollTo(0, scrollPosition);
  }
};