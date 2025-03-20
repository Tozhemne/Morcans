import { manageBodyScroll } from '../utils/body-scroll.js';
import {
  restrictToLettersAndSpaces,
  restrictToDigits,
  attachButtonListeners,
} from '../utils/form-validation.js';

function toggleHeaderClass() {
  const header = document.querySelector('header');

  if (window.scrollY > 10) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
}

window.addEventListener('scroll', toggleHeaderClass);

async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;

    // After loading components, set up navigation handlers
    if (targetId === 'header') {
      setupHeaderNavigation();
    }
  } catch (error) {
    console.log('Error loading component:', error);
  }
}

function setupHeaderNavigation() {
  // Logo click handler - navigate to home page
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Navigation items click handlers
  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');

      // If we're already on the home page
      if (window.location.pathname === '/') {
        scrollToSection(targetId);
      } else {
        // Navigate to home page with target section in URL hash
        window.location.href = `/#${targetId}`;
      }
    });
  });
}

function scrollToSection(targetId, scrollOffset = 0) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = 70;
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: targetPosition - scrollOffset,
      behavior: 'smooth',
    });
  }
}

function setupNavigation(navItems, isMobile) {
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const sectionMap = {
    Services: 'our-services-container',
    Advantages: 'our-advantages-container',
    Clients: 'our-clients-container',
    Contacts: 'footer',
  };

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = sectionMap[item.textContent.trim()];

      if (isMobile && mobileOverlay) {
        mobileOverlay.classList.add('hidden');
        manageBodyScroll(mobileOverlay, 'enable');
      }

      // If we're already on the home page
      if (window.location.pathname === '/' || window.location.pathname === '/index.php') {
        scrollToSection(targetId);
      } else {
        // Navigate to home page with target section in URL hash
        window.location.href = `/#${targetId}`;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const formContainer = document.querySelector('.pop-up-contact-form');
  const formContainerMobile = document.querySelector(
    '.pop-up-contact-form-mobile'
  );
  const contactFormButton = document.querySelector('.contact-form-button');
  const contactFormButtonMobile = document.querySelector(
    '.contact-form-button-mobile'
  );
  const menuPopUp = document.getElementById('menu-pop-up');
  const createRequestBtn = document.querySelector('.create-request-btn');
  const closeIcon = document.querySelector('.pop-up-close-icon');
  const isMobile = window.innerWidth <= 767;
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const mobileMenuHeader = document.querySelector('.mobile-menu-header');
  const mobileMenuContent = document.querySelector('.mobile-menu-content');
  const requestMenu = document.querySelector('.pop-up-mobile-btn');
  const hamburgerBtn = document.getElementById('hamburger-button');
  const backArrow = document.querySelector('.pop-up-back-arrow');
  const mobileCloseIcon = document.querySelectorAll('.pop-up-close-icon');

  const fullNameInput = document.querySelector('.fullName');
  const phoneInput = document.querySelector('.phone');
  const fullNameMobileInput = document.querySelector('.fullName-mobile');
  const phoneMobileInput = document.querySelector('.phone-mobile');

  if (fullNameInput) restrictToLettersAndSpaces(fullNameInput);
  if (phoneInput) restrictToDigits(phoneInput, 10);
  if (fullNameMobileInput) restrictToLettersAndSpaces(fullNameMobileInput);
  if (phoneMobileInput) restrictToDigits(phoneMobileInput, 10);

  if (contactFormButton && formContainer) {
    attachButtonListeners(contactFormButton, formContainer, menuPopUp, false);
  }

  if (contactFormButtonMobile && formContainerMobile) {
    attachButtonListeners(contactFormButtonMobile, formContainerMobile, mobileOverlay, true);
  }

  const footer = document.querySelector('.footer');

  function parallaxFooter() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    const distanceToBottom = documentHeight - (scrollPosition + windowHeight);

    if (distanceToBottom < windowHeight) {
      const speed = 0.5;
      const translateY = Math.min(distanceToBottom * speed, 300);
      footer.style.transform = `translateY(${translateY}px)`;
    } else {
      footer.style.transform = 'translateY(0)';
    }
  }

  window.addEventListener('scroll', parallaxFooter);

  if (closeIcon) {
    closeIcon.addEventListener('click', () => {
      menuPopUp.classList.add('hidden');
      manageBodyScroll(menuPopUp, 'enable');
    });
  }

  if (createRequestBtn) {
    createRequestBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = menuPopUp.classList.toggle('hidden');
      manageBodyScroll(menuPopUp, isHidden ? 'enable' : 'disable');
    });

    if (isMobile && requestMenu) {
      requestMenu.addEventListener('click', () => {
        $('.mobile-menu-info, .mobile-menu-header').fadeOut(300, () => {
          $('.mobile-form').fadeIn(300);
        });
        mobileOverlay.style.backgroundColor = '#FFFFFF';
        mobileOverlay.style.padding = '24px 16px 36px';
        mobileMenuHeader.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
        mobileMenuHeader.style.padding = '6px 12px';
        mobileMenuHeader.style.borderRadius = '12px';
        mobileMenuContent.style.gap = '16px';
        requestMenu.style.display = 'none';
      });
    } else {
      menuPopUp.addEventListener('click', (e) => {
        if (e.target === menuPopUp) {
          menuPopUp.classList.add('hidden');
          manageBodyScroll(menuPopUp, 'enable');
        }
      });
    }
  }

  const navItems = isMobile
    ? document.querySelectorAll('.mobile-menu-info span')
    : document.querySelectorAll('nav ul li');
  setupNavigation(navItems, isMobile);

  if (isMobile) {
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', () => {
        mobileOverlay.classList.remove('hidden');
        mobileOverlay.classList.add('open');
        manageBodyScroll(mobileOverlay, 'disable');
      });
    }

    if (backArrow) {
      backArrow.addEventListener('click', () => {
        if ($('.mobile-form').is(':visible')) {
          mobileOverlay.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
          mobileOverlay.style.padding = '24px 24px 36px';
          mobileMenuHeader.style.backgroundColor = 'unset';
          mobileMenuHeader.style.padding = 'unset';
          mobileMenuHeader.style.borderRadius = 'unset';
          mobileMenuContent.style.gap = '40px';
          requestMenu.style.display = 'flex';
          $('.mobile-form').fadeOut(300, () => {
            $('.mobile-menu-info').fadeIn(300);
          });
        } else {
          manageBodyScroll(mobileOverlay, 'enable');
        }
      });
    }

    if (mobileCloseIcon) {
      mobileCloseIcon.forEach((icon) => {
        icon.addEventListener('click', () => {
          if ($('.mobile-form').is(':visible')) {
            mobileOverlay.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
            mobileOverlay.style.padding = '24px 24px 36px';
            mobileMenuHeader.style.backgroundColor = 'unset';
            mobileMenuHeader.style.padding = 'unset';
            mobileMenuHeader.style.borderRadius = 'unset';
            mobileMenuContent.style.gap = '40px';
            requestMenu.style.display = 'flex';
            $('.mobile-form').fadeOut(300, () => {
              $('.mobile-menu-info, .mobile-menu-header').fadeIn(300);
            });
          } else {
            mobileOverlay.classList.add('hidden');
            manageBodyScroll(mobileOverlay, 'enable');
          }
        });
      });
    }
  }
});
