function generateItemHtml(service) {
  const { title, text, img, extraImg, extraImgAlt } = service;
  let imagesHtml = `<img src="${img}" alt="${title}" class="slider-block-item-img">`;
  if (extraImg) {
    imagesHtml += `<img src="${extraImg}" alt="${extraImgAlt || 'icon'}" class="finger-icon">`;
  }
  const infoHtml = `
    <div class="slider-block-item-info">
      <span class="slider-item-info-title">${title}</span>
      <span class="slider-item-info-text">${text}</span>
    </div>
  `;
  return `<div class="our-services-slider-block-item">${imagesHtml}${infoHtml}</div>`;
}

function generateBlockHtml(group) {
  const itemsHtml = group.map(service => generateItemHtml(service)).join('');
  return `<div class="our-services-slider-block">${itemsHtml}</div>`;
}

function generateOurServicesSection(ourServicesData) {
  const isWide = window.innerWidth > 1023;
  const groupSize = isWide ? 2 : 1;
  const blocks = [];

  for (let i = 0; i < ourServicesData.length; i += groupSize) {
    const group = ourServicesData.slice(i, i + groupSize);
    blocks.push(generateBlockHtml(group));
  }

  const sliderHtml = `<div class="our-services-slider">${blocks.join('')}</div>`;
  const wrapperHtml = `<div class="our-services-slider-wrapper">${sliderHtml}</div>`;
  const titleHtml = `<div class="h3">OUR SERVICES</div>`;
  const contentHtml = `<div class="our-services-content">${titleHtml}${wrapperHtml}</div>`;
  return `<div class="our-services">${contentHtml}</div>`;
}

function initSliders() {
  const isMobile = window.innerWidth < 767;
  $('.our-services-slider').slick({
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    dots: isMobile,
    arrows: !isMobile,
  })
}

export function renderServices(servicesData, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const html = generateOurServicesSection(servicesData);
    container.innerHTML = html;
    initSliders();
  } else {
    console.log(`Container with id "${containerId}" not found.`);
  }
}