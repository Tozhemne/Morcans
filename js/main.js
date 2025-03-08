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
      e.preventDefault();
      const targetClass = sectionMap[item.textContent.trim()];
      const target = document.querySelector(targetClass);

      if (target) {
        const headerHeight = 30;

        if (isMobile && mobileOverlay) {
          mobileOverlay.classList.add('hidden');
          manageBodyScroll(mobileOverlay, 'enable');
          const targetTop = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        } else {
          const targetTop = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      } else {
        console.log(`Target section for ${item.textContent} not found`);
      }
    });
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

    overlayElement.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
    overlayElement.style.padding = '24px 24px 36px';

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
  const contactFormButton = document.querySelector('.contact-form-button');
  const menuPopUp = document.getElementById('menu-pop-up');
  const createRequestBtn = document.querySelector('.create-request-btn');
  const closeIcon = document.querySelector('.desktop-pop-up-close-icon');
  const isMobile = window.innerWidth <= 767;
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const hamburgerBtn = document.getElementById('hamburger-button');
  const backArrow = document.querySelector('.pop-up-back-arrow');
  const mobileCloseIcon = document.querySelector('.pop-up-close-icon');

  restrictToLettersAndSpaces(document.querySelector('.fullName'));
  restrictToDigits(document.querySelector('.phone'), 10);
  restrictToLettersAndSpaces(document.querySelector('.fullName-mobile'));
  restrictToDigits(document.querySelector('.phone-mobile'), 10);

  attachButtonListeners(contactFormButton, formContainer, menuPopUp);
  
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

    if (!isMobile) {
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
        mobileOverlay.classList.add('hidden');
        manageBodyScroll(mobileOverlay, 'enable');
      });
    }
  }
});