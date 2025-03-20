import {
  validateName,
  validateEmail,
  validatePhone,
  validateServiceSelection,
} from './validation.js';

export function validateForm(formContainer, isMobile) {
  const inputSuffix = isMobile ? '-mobile' : '';
  const name = formContainer.querySelector(`.fullName${inputSuffix}`)?.value || '';
  const email = formContainer.querySelector(`.email${inputSuffix}`)?.value || '';
  const phone = formContainer.querySelector(`.phone${inputSuffix}`)?.value || '';
  const service = formContainer.querySelector(`.service${inputSuffix}`)?.value || '';

  formContainer.querySelectorAll('.error').forEach((error) => {
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

export function restrictToLettersAndSpaces(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  });
}

export function restrictToDigits(input, maxLength) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
  });
}

export function handleFormSubmission(formContainer, overlayElement, isMobile) {
  if (validateForm(formContainer, isMobile)) {
    formContainer.submit(); // Submit to send.php
    overlayElement.classList.add('hidden');
    manageBodyScroll(overlayElement, 'enable');
    if (isMobile) {
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
  }
}

export function attachButtonListeners(button, formContainer, overlayElement, isMobile) {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default submit
    handleFormSubmission(formContainer, overlayElement, isMobile);
  });
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFormSubmission(formContainer, overlayElement, isMobile);
    }
  });
}
