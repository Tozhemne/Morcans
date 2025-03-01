// Load and Paste HTML component and return a Promise
async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('header', '../components/header.html'),
    loadComponent('footer', '../components/footer.html')
  ]);

  const isMobile = window.innerWidth <= 767;
  const navItems = document.querySelectorAll('nav ul li');
  const sectionMap = {
    'Services': '.our-services',
    'Advantages': '.our-advantages',
    'Clients': '.our-partners',
    'Contacts': '.footer'
  };

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetClass = sectionMap[item.textContent];
      const target = document.querySelector(targetClass);

      if (target) {
        const headerHeight = 30;
        const targetRect = target.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const targetTop = targetRect.top + scrollTop - headerHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      } else {
        console.error(`Target section for ${item.textContent} not found.`);
      }
    });
  });
});
