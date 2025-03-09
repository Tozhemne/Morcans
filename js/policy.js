document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar-container');
  const content = document.querySelector('.content-container');
  const container = document.querySelector('.container');
  
  // Content switching functionality
  const contentContainers = document.querySelectorAll('.content-container');
  const sidebarItems = document.querySelectorAll('.sidebar-container-item');
  
  // Hide all content containers initially
  contentContainers.forEach(container => {
    container.style.display = 'none';
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s ease-in-out';
  });
  
  // Function to show content based on ID
  function showContent(targetId) {
    // Get the content element
    const targetContent = document.getElementById(targetId);
    if (!targetContent) return;
    
    // Get the sidebar item
    const targetSidebarItem = document.getElementById(targetId + '-link');
    if (!targetSidebarItem) return;
    
    // Remove active class from all sidebar items
    sidebarItems.forEach(i => i.classList.remove('active'));
    
    // Add active class to target sidebar item
    targetSidebarItem.classList.add('active');
    
    // Hide all content containers with fade out
    contentContainers.forEach(container => {
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
      }, 300);
    });
    
    // Show the target content container with fade in
    setTimeout(() => {
      targetContent.style.display = 'flex';
      setTimeout(() => {
        targetContent.style.opacity = '1';
      }, 50);
    }, 300);
  }
  
  // Check for hash in URL on page load
  function handleHash() {
    if (window.location.hash) {
      // Get the target ID from the hash (remove the '#' and '-link' if present)
      let targetId = window.location.hash.substring(1).replace('-link', '');
      
      // Show the corresponding content
      showContent(targetId);
      
      // Scroll to the top of the content after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: container.offsetTop - 100,
          behavior: 'smooth'
        });
      }, 400);
    } else {
      // Default to Terms & Conditions if no hash
      showContent('tos');
    }
  }
  
  // Handle initial hash on page load
  handleHash();
  
  // Listen for hash changes (when user navigates with browser back/forward buttons)
  window.addEventListener('hashchange', handleHash);
  
  // Add click event listeners to sidebar items
  sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get the target content ID from the sidebar item ID
      const targetId = this.id.replace('-link', '');
      
      // Update the URL hash without triggering a page reload
      history.pushState(null, null, '#' + this.id);
      
      // Show the corresponding content
      showContent(targetId);
    });
  });
  
  // Sticky sidebar functionality
  if (!sidebar || !content || !container) return;
  
  let sidebarHeight = sidebar.offsetHeight;
  let contentHeight = content.offsetHeight;
  let containerTop = container.offsetTop;
  let stopPosition = containerTop + contentHeight - sidebarHeight;
  
  function handleScroll() {
    // Skip sticky behavior if window width is 767px or less
    if (window.innerWidth <= 767) {
      sidebar.style.position = 'relative';
      sidebar.style.top = '0';
      return;
    }
    
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    sidebarHeight = sidebar.offsetHeight;
    contentHeight = content.offsetHeight;
    containerTop = container.getBoundingClientRect().top + scrollY;
    stopPosition = containerTop + contentHeight - sidebarHeight;
    
    if (sidebarHeight < contentHeight) {
      if (scrollY >= containerTop) {
        if (scrollY >= stopPosition) {
          sidebar.style.position = 'relative';
          sidebar.style.top = `${contentHeight - sidebarHeight}px`;
        } else {
          sidebar.style.position = 'sticky';
          sidebar.style.top = '150px';
        }
      } else {
        sidebar.style.position = 'relative';
        sidebar.style.top = '0';
      }
    }
  }
  
  handleScroll();
  
  window.addEventListener('scroll', handleScroll);
  
  window.addEventListener('resize', function() {
    handleScroll();
  });
});
