import { renderServices } from '../components/ourServicesSection.js';
import { manageBodyScroll } from '../utils/body-scroll.js';
import { validateName, validateEmail, validatePhone, validateServiceSelection } from '../utils/validation.js';

const servicesData = [
  {
    title: "Marketing Research and Analytics",
    text: "The secret to marketing success lies in the ability to adapt to constantly changing market trends and needs. Morcans Digital conducts in-depth research and data analysis, enabling businesses to understand their audience, measure marketing campaign effectiveness, and adjust strategy according to changing conditions.",
    img: "../img/marketing-research.png"
  },
  {
    title: "Bespoke Strategic Solutions",
    text: "A competent marketing strategy is the foundation of successful business, and this is where Morcans Digital demonstrates its expertise. Our strategies are not just a set of activities, but carefully crafted plans based on in-depth market analysis, competitive environment, and consumer preferences.",
    img: "../img/bespoke-strategic-solutions.png"
  },
  {
    title: "End-to-End Marketing",
    text: "In today's world, where online presence plays a key role, effective digital marketing becomes an integral part of any brand's strategy. Morcans Digital offers a full range of services in this field: from search engine optimization to social media management, content creation, and advertising campaign management.",
    img: "../img/end-to-end-marketing.png",
    extraImg: "../img/end-to-end-marketing-finger-icon.svg",
    extraImgAlt: "finger-icon"
  },
  {
    title: "Global Market Expansion",
    text: "One of the key aspects of modern business development is its globalization. Morcans Digital offers comprehensive solutions for successful brand promotion abroad, taking into account cultural, linguistic, and market specifics of different countries. The result is successful business development in the international arena.",
    img: "../img/global-market-expansion.png"
  }
];

function initOurPartnersSlider() {
  if(window.innerWidth < 767) {
    $('.our-partners-logo-slider').slick({
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      dots: true,
      arrows: false,
    })
  }
}

function validateForm(formContainer) {
  const name = formContainer.querySelector('.fullName-mobile')?.value || '';
  const email = formContainer.querySelector('.email-mobile')?.value || '';
  const phone = formContainer.querySelector('.phone-mobile')?.value || '';
  const service = formContainer.querySelector('.service-mobile')?.value || '';

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
    // Reset styles or additional logic if needed
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

document.addEventListener('DOMContentLoaded', () => {
  renderServices(servicesData, 'our-services-container');
  initOurPartnersSlider();

  const scrollDownIcon = document.querySelector('.scroll-down');
  const targetSection = document.querySelector('.our-partners');

  if (scrollDownIcon && targetSection) {
    const headerHeight = 30;
    const targetRect = targetSection.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetTop = targetRect.top + scrollTop - headerHeight;

    scrollDownIcon.addEventListener('click', () => {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  } else {
    console.log('Scroll-down icon or target section not found.');
  }

  const heroCreateRequestBtn = document.querySelector('.hero-create-request-btn');
  const heroMobileFormPopUp = document.querySelector('.hero-mobile-form-pop-up');
  const heroCloseIcon = heroMobileFormPopUp?.querySelector('.pop-up-close-icon');
  const heroBackArrow = heroMobileFormPopUp?.querySelector('.pop-up-back-arrow');
  const heroFormContainer = heroMobileFormPopUp?.querySelector('.mobile-form');
  const heroContactFormButton = heroFormContainer?.querySelector('.contact-form-button-mobile');

  if (heroCreateRequestBtn && heroMobileFormPopUp) {
    heroCreateRequestBtn.addEventListener('click', () => {
      heroMobileFormPopUp.classList.remove('hidden');
      heroFormContainer.style.display = 'block'; // Show form immediately
      manageBodyScroll(heroMobileFormPopUp, 'disable');
    });
  }

  if (heroCloseIcon) {
    heroCloseIcon.addEventListener('click', () => {
      heroMobileFormPopUp.classList.add('hidden');
      manageBodyScroll(heroMobileFormPopUp, 'enable');
    });
  }

  if (heroBackArrow) {
    heroBackArrow.addEventListener('click', () => {
      heroMobileFormPopUp.classList.add('hidden');
      manageBodyScroll(heroMobileFormPopUp, 'enable');
    });
  }

  if (heroContactFormButton && heroFormContainer) {
    attachButtonListeners(heroContactFormButton, heroFormContainer, heroMobileFormPopUp);
  }

  if (heroFormContainer) {
    restrictToLettersAndSpaces(heroFormContainer.querySelector('.fullName-mobile'));
    restrictToDigits(heroFormContainer.querySelector('.phone-mobile'), 10);
  }
});