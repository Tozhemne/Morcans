<header>
  <div class="header-container">
    <a href="/">
      <img src="../img/morcans-logo.svg" alt="logo" class="logo-img" />
    </a>
    <nav>
      <ul>
        <li data-target="our-services-container">Services</li>
        <li data-target="our-advantages-container">Advantages</li>
        <li data-target="our-clients-container">Clients</li>
        <li data-target="footer">Contacts</li>
      </ul>
    </nav>
    <button class="create-request-btn">Send Request</button>
    <div id="hamburger-button" class="hamburger-menu">
      <div class="hamburger-menu-line"></div>
      <div class="hamburger-menu-line"></div>
      <div class="hamburger-menu-line"></div>
    </div>
  </div>
</header>

<div id="menu-pop-up" class="menu-pop-up hidden">
  <?php
    include_once 'components/requestForm.php';
    echo generate_request_form_html(false);
  ?>
</div>

<div class="mobile-menu-pop-up">
  <div class="mobile-menu-content">
    <div class="mobile-menu-header">
      <img
        src="../img/pop-up-back-arrow.svg"
        alt="Back arrow"
        class="pop-up-back-arrow"
      />
      <img
        src="../img/pop-up-close-icon.svg"
        alt="Close icon"
        class="pop-up-close-icon"
      />
    </div>
    <div class="mobile-menu-info">
      <span>Services</span>
      <span>Advantages</span>
      <span>Clients</span>
      <span>Contacts</span>
    </div>
    <?php
      include_once 'components/requestForm.php';
      echo generate_request_form_html(true);
    ?>
  </div>
  <button class="create-request-btn pop-up-mobile-btn">Send Request</button>
</div>
