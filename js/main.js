import { manageBodyScroll } from '../utils/body-scroll.js';
import { validateName, validateEmail, validatePhone, validateServiceSelection } from '../utils/validation.js';

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
      // If already on home page, just prevent default
      if (window.location.pathname.includes('home.html')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // Otherwise, default behavior will navigate to home.html
    });
  }
  
  // Navigation items click handlers
  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      
      // If we're already on the home page
      if (window.location.pathname.includes('home.html')) {
        scrollToSection(targetId);
      } else {
        // Navigate to home page with target section in URL hash
        window.location.href = `home.html#${targetId}`;
      }
    });
  });
}

function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = 70; // Adjust based on your header height
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

function setupNavigation(navItems, isMobile) {
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const sectionMap = {
    'Services': 'our-services-container',
    'Advantages': 'our-advantages-container',
    'Clients': 'our-clients-container',
    'Contacts': 'footer'
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
      if (window.location.pathname.includes('home.html')) {
        scrollToSection(targetId);
      } else {
        // Navigate to home page with target section in URL hash
        window.location.href = `home.html#${targetId}`;
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

  // Check if there's a hash in the URL to scroll to a specific section
  if (window.location.hash && window.location.pathname.includes('home.html')) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(targetId);
    }, 500); // Small delay to ensure DOM is fully loaded
  }

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

  // Only add event listeners to form elements if they exist
  const fullNameInput = document.querySelector('.fullName');
  const phoneInput = document.querySelector('.phone');
  const fullNameMobileInput = document.querySelector('.fullName-mobile');
  const phoneMobileInput = document.querySelector('.phone-mobile');
  
  if (fullNameInput) restrictToLettersAndSpaces(fullNameInput);
  if (phoneInput) restrictToDigits(phoneInput, 10);
  if (fullNameMobileInput) restrictToLettersAndSpaces(fullNameMobileInput);
  if (phoneMobileInput) restrictToDigits(phoneMobileInput, 10);

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