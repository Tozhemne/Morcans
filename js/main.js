import { manageBodyScroll } from '../utils/body-scroll.js';

async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.log('Error loading component:', error);
  }
}

function setupNavigation(navItems, isMobile) {
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const sectionMap = {
    'Services': '.our-services',
    'Advantages': '.our-advantages',
    'Clients': '.our-partners',
    'Contacts': '.footer'
  };

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetClass = sectionMap[item.textContent];
      const target = document.querySelector(targetClass);

      if (target) {
        const headerHeight = 30;
        const targetRect = target.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const targetTop = targetRect.top + scrollTop - headerHeight;
        if (isMobile) manageBodyScroll(mobileOverlay, 'enable');
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      } else {
        console.log(`Target section for ${item.textContent} not found.`);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('header', '../components/header.html'),
    loadComponent('footer', '../components/footer.html')
  ]);

  let navItems;
  let isMobile = window.innerWidth <= 767;
  if (isMobile) {
    navItems = document.querySelectorAll('.mobile-menu-content span');
  } else navItems = document.querySelectorAll('nav ul li');

  setupNavigation(navItems, isMobile);

  if (isMobile) {
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
    const backArrow = document.querySelector('.pop-up-back-arrow');
    const closeIcon = document.querySelector('.pop-up-close-icon');

    hamburgerBtn.addEventListener('click', () => {
      manageBodyScroll(mobileOverlay, 'disable');
    });

    backArrow.addEventListener('click', () => {
      manageBodyScroll(mobileOverlay, 'enable');
    });

    closeIcon.addEventListener('click', () => {
      manageBodyScroll(mobileOverlay, 'enable');
    });
  }
});