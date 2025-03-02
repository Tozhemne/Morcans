export function validateName(name) {
  const trimmedName = name.trim();
  if (trimmedName === '') return false;
  
  return /^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(trimmedName);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '');
  return /^\d{10}$/.test(digitsOnly);
}

export function validateServiceSelection(service) {
  return service !== 'Select Type' && service.trim() !== '';
}