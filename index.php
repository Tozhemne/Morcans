<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morcans Digital</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Ilisarniq:wght@200..900&family=Montserrat:wght@100..900&display=swap" rel="stylesheet"> 

    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/home.css">
  </head>

  <body>

    <?php include 'components/header.php'; ?>

    <main style="width: 100%;">
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            MORCANS DIGITAL IS A BESPOKE MARKETING AGENCY THAT SETS HIGH STANDARDS IN THE INDUSTRY.
          </h1>
          <p class="hero-subtitle">
            The company implements an innovative approach based on 15 years of experience in its projects.
            When partnering with <span>MORCANS DIGITAL</span>, you can expect an exceptional level of professionalism.
            We apply creativity and pursuit of excellence in every project.
          </p>
          <div class="hero-create-request">
            <button class="hero-create-request-btn">
              Send Request
            </button>
          </div>
        </div>
        <img
          src="img/scroll-down-icon.svg"
          alt="scroll-down"
          class="scroll-down"
        >
      </div>

      <div class="hero-mobile-form-pop-up hidden">
        <div class="hero-mobile-menu-content">
          <div class="mobile-form" style="display: none;">
            <div class="menu-pop-up-close-block">
              <span>Create Request</span>
              <img
                src="../img/desktop-pop-up-close-icon.svg"
                alt="desktop-pop-up-close-icon"
                class="pop-up-close-icon"
              />
            </div>
            <div class="pop-up-info-block">
              <img src="img/pop-up-info-block-letter.svg" alt="pop-up-info-block-letter">
              <div>
                <span class="pop-up-info-block-title">Would you like to become our client?</span>
                <span class="pop-up-info-block-text">
                  Leave a request and our team of marketing experts will contact you
                  to discuss strategies to promote your business.
                </span>
              </div>
            </div>
            <?php
              $formClass = 'pop-up-contact-form pop-up-contact-form-mobile';
              include 'components/form.php';
            ?>
          </div>
        </div>
      </div>
  
      <div id="our-clients-container" class="our-partners">
        <div class="our-partners-content">
          <div class="h3">OUR CLIENTS</div>
          <div class="our-partners-logo-block">
            <div class="logo-block-row">
              <div class="logo-block-row-item">
                <img src="img/sumatosoft.svg" alt="sumatosoft" class="sumatosoft-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/momondo.svg" alt="momondo" class="momondo-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/beehiiv.svg" alt="beehiiv" class="beehiiv-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/doer.svg" alt="doer" class="doer-img">
              </div>
            </div>
            <div class="logo-block-row">
              <div class="logo-block-row-item">
                <img src="img/soax.svg" alt="soax" class="soax-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/rakuten.svg" alt="rakuten" class="rakuten-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/mpax.svg" alt="mpax" class="mpax-img">
              </div>
              <div class="logo-block-row-item">
                <img src="img/nextBit.svg" alt="nextbit" class="nextbit-img">
              </div>
            </div>
          </div>
          <div class="our-partners-logo-slider-wrapper">
            <div class="our-partners-logo-slider">
              <div class="logo-block-row">
                <div class="logo-block-row-item">
                  <img src="img/sumatosoft.svg" alt="sumatosoft" class="sumatosoft-img">
                </div>
                <div class="logo-block-row-item">
                  <img src="img/momondo.svg" alt="momondo" class="momondo-img">
                </div>
              </div>
              <div class="logo-block-row">
                <div class="logo-block-row-item">
                  <img src="img/beehiiv.svg" alt="beehiiv" class="beehiiv-img">
                </div>
                <div class="logo-block-row-item">
                  <img src="img/doer.svg" alt="doer" class="doer-img">
                </div>
              </div>
              <div class="logo-block-row">
                <div class="logo-block-row-item">
                  <img src="img/soax.svg" alt="soax" class="soax-img">
                </div>
                <div class="logo-block-row-item">
                  <img src="img/rakuten.svg" alt="rakuten" class="rakuten-img">
                </div>
              </div>
              <div class="logo-block-row">
                <div class="logo-block-row-item">
                  <img src="img/mpax.svg" alt="mpax" class="mpax-img">
                </div>
                <div class="logo-block-row-item">
                  <img src="img/nextBit.svg" alt="nextbit" class="nextbit-img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="morcans-rules">
        <img src="img/our-services.png" alt="morcans-rules" class="morcans-rules-img">
        <div class="morcans-rules-content">
          <div class="morcans-rules-advantages">
            <div class="advantages-info">
              <span class="advantages-info-title">OUR ADVANTAGES</span>
              <div class="morcans-info">
                <p>Morcans Digital is your gateway to competitive excellence</p>
                <span>
                  In today's world, where market competition is becoming increasingly fierce, companies need to effectively
                  promote their products and services to maintain their leading positions.
                </span>
              </div>
              <div class="rules-info">
                <span class="rules-info-title">OUR RULES:</span>
                <div class="rules">
                  <div class="rule-block">
                    <span>DIFFICULT</span>
                  </div>
                  <div class="rule-block">
                    <span>EXPENSIVE</span>
                  </div>
                  <div class="rule-block">
                    <span>OUTSTANDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="soax-info">
            <div class="soax-ceo-quote">
              <img src="img/soax.svg" alt="soax-logo" class="soax-logo-img">
              <span class="ceo-quote-text">
                "A company's greatest asset is its people. At Morcans, we work with the finest professionals in their field
                - individuals who represent the highest standard of expertise we've encountered."
              </span>
              <div class="ceo-block">
                <img src="img/stepan.png" alt="stepan">
                <div class="ceo-info">
                  <span class="ceo-name">Stepan Solovev</span>
                  <span class="ceo-position">CEO & CO-FOUNDER SOAX</span>
                </div>
              </div>
            </div>
            <img src="img/stepan-signature.png" alt="stepan-signature" class="stepan-signature-img">
          </div>
        </div>
      </div>

      <div id="our-services-container"></div>

      <div id="our-advantages-container" class="our-advantages">
        <div class="our-advantages-content">
          <div class="h3">OUR ADVANTAGES</div>
          <div class="our-advantages-info">
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-individual.svg" alt="advantages-individual">
                <span>Individual Approach</span>
              </div>
              <span class="advantages-info-item-text">
                The main advantage of Morcans Digital lies in our ability to create unique solutions for each client.
                We don't use a template approach but create strategies tailored to specific business needs and goals.
              </span>
            </div>
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-end-to-end.svg" alt="advantages-end-to-end">
                <span>End-to-End Solution</span>
              </div>
              <span class="advantages-info-item-text">
                Morcans Digital guarantees a full spectrum of marketing services, allowing clients to receive all necessary solutions
                under one roof, without the need to engage multiple providers.
              </span>
            </div>
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-expertise.svg" alt="advantages-expertise">
                <span>Expertise and Experience</span>
              </div>
              <span class="advantages-info-item-text">
                The Morcans Digital team impresses with its deep expertise and rich 15 years of experience in marketing.
                This ensures clients' confidence that their projects are in the reliable hands of professionals.
              </span>
            </div>
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-innovative.svg" alt="advantages-innovative">
                <span>Innovative Solutions</span>
              </div>
              <span class="advantages-info-item-text">
                Our strategies are based on cutting-edge technologies that we apply in our
                personal projects every day - this allows us to stay one step ahead of competitors.
              </span>
            </div>
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-transparency.svg" alt="advantages-transparency">
                <span>Transparency and Openness</span>
              </div>
              <span class="advantages-info-item-text">
                Morcans Digital stands out with its transparent and open approach to work.
                We work with a very limited number of clients, which allows us to know everyone by name
              </span>
            </div>
            <div class="advantages-info-item">
              <div class="advantages-info-item-title">
                <img src="img/advantages-int-presence.svg" alt="advantages-int-presence">
                <span>International Presence</span>
              </div>
              <span class="advantages-info-item-text">
                One of the important advantages of Morcans Digital is the capability, experience.
                This gives clients the opportunity to expand their business across borders and reach new markets
              </span>
            </div>
          </div>
        </div>
      </div>

      <?php include 'components/footer.php'; ?>

    </main>


    <script type="module" src="js/main.js"></script>
    <script type="module" src="js/home.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
  </body>
</html>