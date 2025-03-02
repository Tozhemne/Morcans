import { manageBodyScroll } from '../utils/body-scroll.js';
import { validateName, validateEmail, validatePhone, validateServiceSelection } from '../utils/validation.js';

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
    item.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default behavior
      const targetClass = sectionMap[item.textContent.trim()];
      const target = document.querySelector(targetClass);
      console.log('target', target);
  
      if (target) {
        const headerHeight = 30;
        const targetRect = target.getBoundingClientRect();
        console.log('targetRect', targetRect);

        const scrollTop = window.scrollY || window.pageYOffset;
        const targetTop = targetRect.top + scrollTop - headerHeight;
        console.log('scrollTop', scrollTop);
        console.log('targetTop', targetTop);

        if (isMobile && mobileOverlay) {
          // Ensure overlay is hidden and scroll is enabled before scrolling
          mobileOverlay.classList.add('hidden');
          manageBodyScroll(mobileOverlay, 'enable');
        }

        // Perform the scroll
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        // Debug log to verify scroll position
        console.log(`Scrolling to ${item.textContent}: targetTop = ${targetTop}`);
      } else {
        console.log(`Target section for ${item.textContent} not found`);
      }
    }); // Ensure listener persists, but can be adjusted
  });
}

function validateForm(formContainer) {
  const isMobile = window.innerWidth <= 767;
  const name = formContainer.querySelector(isMobile ? '.fullName-mobile' : '.fullName')?.value || '';
  const email = formContainer.querySelector(isMobile ? '.email-mobile' : '.email')?.value || '';
  const phone = formContainer.querySelector(isMobile ? '.phone-mobile' : '.phone')?.value || '';
  const service = formContainer.querySelector(isMobile ? '.service-mobile' : '.service')?.value || '';

  formContainer.querySelectorAll('.error').forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });

  let isValid = true;

  if (!validateName(name)) {
    const errorElement = formContainer.querySelector('.fullNameError');
    errorElement.textContent = 'Please enter your full name.';
    errorElement.style.display = 'block';
    isValid = false;
  }
  if (!validateEmail(email)) {
    const errorElement = formContainer.querySelector('.emailError');
    errorElement.textContent = 'Please enter a valid email address.';
    errorElement.style.display = 'block';
    isValid = false;
  }
  if (!validatePhone(phone)) {
    const errorElement = formContainer.querySelector('.phoneError');
    errorElement.textContent = 'Please enter a valid phone number (at least 10 digits).';
    errorElement.style.display = 'block';
    isValid = false;
  }
  if (!validateServiceSelection(service)) {
    const errorElement = formContainer.querySelector('.serviceError');
    errorElement.textContent = 'Please select a required service.';
    errorElement.style.display = 'block';
    isValid = false;
  }

  return isValid;
}

const restrictToLettersAndSpaces = (input) => {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  });
};

const restrictToDigits = (input, maxLength) => {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
  });
};

const handleFormSubmission = (formContainer, overlayElement) => {
  if (validateForm(formContainer)) {
    overlayElement.classList.add('hidden');
    manageBodyScroll(overlayElement, 'enable');

    const mobileMenuHeader = document.querySelector('.mobile-menu-header');
    const mobileMenuContent = document.querySelector('.mobile-menu-content');
    const requestMenu = document.querySelector('.pop-up-mobile-btn');

    overlayElement.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
    overlayElement.style.padding = '24px 24px 36px';
    mobileMenuHeader.style.backgroundColor = 'unset';
    mobileMenuHeader.style.padding = 'unset';
    mobileMenuHeader.style.borderRadius = 'unset';
    mobileMenuContent.style.gap = '40px';
    requestMenu.style.display = 'flex';

    $('.mobile-form').fadeOut(300, () => {
      $('.mobile-menu-info').fadeIn(300);
    });
  }
};

const attachButtonListeners = (button, formContainer, overlayElement) => {
  button.addEventListener('click', () => handleFormSubmission(formContainer, overlayElement));
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFormSubmission(formContainer, overlayElement);
    }
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('header', '../components/header.html'),
    loadComponent('footer', '../components/footer.html')
  ]);

  // DOM element constants
  const formContainer = document.querySelector('.pop-up-contact-form');
  const formContainerMobile = document.querySelector('.pop-up-contact-form-mobile');
  const contactFormButton = document.querySelector('.contact-form-button');
  const contactFormButtonMobile = document.querySelector('.contact-form-button-mobile');
  const menuPopUp = document.getElementById('menu-pop-up');
  const createRequestBtn = document.querySelector('.create-request-btn');
  const closeIcon = document.querySelector('.desktop-pop-up-close-icon');
  const isMobile = window.innerWidth <= 767;
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const mobileMenuHeader = document.querySelector('.mobile-menu-header');
  const mobileMenuContent = document.querySelector('.mobile-menu-content');
  const requestMenu = document.querySelector('.pop-up-mobile-btn');
  const hamburgerBtn = document.getElementById('hamburger-button');
  const backArrow = document.querySelector('.pop-up-back-arrow');
  const mobileCloseIcon = document.querySelector('.pop-up-close-icon');



  restrictToLettersAndSpaces(document.querySelector('.fullName'));
  restrictToDigits(document.querySelector('.phone'), 10);
  restrictToLettersAndSpaces(document.querySelector('.fullName-mobile'));
  restrictToDigits(document.querySelector('.phone-mobile'), 10);

  attachButtonListeners(contactFormButton, formContainer, menuPopUp);
  attachButtonListeners(contactFormButtonMobile, formContainerMobile, mobileOverlay);

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
        $('.mobile-menu-info').fadeOut(300, () => {
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
      mobileCloseIcon.addEventListener('click', () => {
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
  }
});