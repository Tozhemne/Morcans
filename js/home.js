import { renderServices } from '../components/ourServicesSection.js';
import { manageBodyScroll } from '../utils/body-scroll.js';
import {
  restrictToLettersAndSpaces,
  restrictToDigits,
  attachButtonListeners,
} from '../utils/form-validation.js';

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

// Function to handle scrolling to sections from URL hash
function handleHashNavigation() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        const headerHeight = 70; // Adjust based on your header height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 500); // Small delay to ensure DOM is fully loaded
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices(servicesData, 'our-services-container');
  initOurPartnersSlider();
  handleHashNavigation();

  const scrollDownIcon = document.querySelector('.scroll-down');
  const targetSection = document.querySelector('.our-partners');

  if (scrollDownIcon && targetSection) {
    const headerHeight = 20;
    const targetRect = targetSection.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetTop = targetRect.top + scrollTop - headerHeight;

    scrollDownIcon.addEventListener('click', () => {
      window.scrollTo({
        top: targetTop - 300,
        behavior: 'smooth',
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

  // parallax partners
  const partners = document.querySelector('.our-partners');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const speed = 0.5;
    const maxOverlap = 300;
  
    const marginTop = Math.max(-scrollPosition * speed, -maxOverlap);
    partners.style.marginTop = `${marginTop}px`;
  });

  // logos animation
  const items = document.querySelectorAll('.logo-block-row-item');

  const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        logoObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  items.forEach(item => {
    logoObserver.observe(item);
  });

  // advantages animation
  const advantageItems = document.querySelectorAll('.advantages-info-item');

  const OurAdvantagesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        OurAdvantagesObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  advantageItems.forEach(item => {
    OurAdvantagesObserver.observe(item);
  });

  // our partners content mobile only animation
  if (window.innerWidth < 767) {
    const ourPartnersContent = document.querySelector('.our-partners-content');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    observer.observe(ourPartnersContent);
  }

  // hero content animation
  const heroContent = document.querySelector('.hero-content');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  observer.observe(heroContent);

  if (heroCreateRequestBtn && heroMobileFormPopUp) {
    heroCreateRequestBtn.addEventListener('click', () => {
      heroMobileFormPopUp.classList.remove('hidden');
      heroFormContainer.style.display = 'block';
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

  if (heroFormContainer) {
    restrictToLettersAndSpaces(heroFormContainer.querySelector('.fullName-mobile'));
    restrictToDigits(heroFormContainer.querySelector('.phone-mobile'), 10);
  }

  if (heroContactFormButton && heroFormContainer) {
    attachButtonListeners(heroContactFormButton, heroFormContainer, heroMobileFormPopUp, true);
  }
});