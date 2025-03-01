function initSliders() {
  const baseConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // if (window.innerWidth <= 1023) {
  //   $('.our-services-slider-mobile').slick({
  //     ...baseConfig,
  //     centerMode: true,
  //     centerPadding: '22px',
  //     dots: true,
  //   });
  // } else {
  $('.our-services-slider').slick({
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    dots: false,
  })
  // .on('init afterChange', (event, slick, currentSlide = 0) => {
  //   const totalSlides = slick.$slides.length;
  //   const nextImg = document.querySelector('.slick-next img');
  //   const prevImg = document.querySelector('.slick-prev img');
  //   const nextBtn = document.querySelector('.slick-next');
  //   const prevBtn = document.querySelector('.slick-prev');

  //   nextImg.src = currentSlide === totalSlides - 1 
  //     ? '../img/slider-forward-icon-disabled.svg' 
  //     : '../img/slider-forward-icon.svg';
  //   nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);

  //   prevImg.src = currentSlide === 0 
  //     ? '../img/slider-back-icon-disabled.svg' 
  //     : '../img/slider-back-icon.svg';
  //   prevBtn.classList.toggle('disabled', currentSlide === 0);
  // });
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  initSliders();

  const scrollDownIcon = document.querySelector('.scroll-down');
  const targetSection = document.querySelector('.our-partners');

  if (scrollDownIcon && targetSection) {
    scrollDownIcon.addEventListener('click', () => {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  } else {
    console.error('Scroll-down icon or target section not found.');
  }
  

});