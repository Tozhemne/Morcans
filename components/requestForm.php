<?php
if (!function_exists('generate_request_form_html')) {
  function generate_request_form_html($is_mobile) {
    $wrapper_class = $is_mobile ? 'mobile-form' : 'menu-pop-up-content';
    $wrapper_style = $is_mobile ? 'display: none;' : '';
    $form_class = $is_mobile ? 'pop-up-contact-form-mobile' : 'pop-up-contact-form';
    $input_suffix = $is_mobile ? '-mobile' : '';
    $button_class = 'contact-form-button';

    $html = <<<HTML
      <div class="$wrapper_class" style="$wrapper_style">
        <div class="menu-pop-up-close-block">
          <span>Create Request</span>
          <img src="../img/desktop-pop-up-close-icon.svg" alt="desktop-pop-up-close-icon" class="pop-up-close-icon" />
        </div>
        <div class="pop-up-info-block">
          <img src="../img/pop-up-info-block-letter.svg" alt="pop-up-info-block-letter" />
          <div>
            <span class="pop-up-info-block-title">Would you like to become our client?</span>
            <span class="pop-up-info-block-text">
              Leave a request and our team of marketing experts will contact you
              to discuss strategies to promote your business.
            </span>
          </div>
        </div>
        <form action="components/send.php" method="post" class="$form_class">
          <div class="form-input-block">
            <label class="form-label">Your Full Name</label>
            <input type="text" class="form-input fullName$input_suffix" name="fullName" placeholder="Sara Biverman" required />
            <span class="error fullNameError"></span>
          </div>
          <div class="form-input-block">
            <label class="form-label">Email</label>
            <input type="email" class="form-input email$input_suffix" name="email" placeholder="example@mail.com" required />
            <span class="error emailError"></span>
          </div>
          <div class="form-input-block">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input phone$input_suffix" name="phone" placeholder="Type your mobile number" />
            <span class="error phoneError"></span>
          </div>
          <div class="form-input-block">
            <label class="form-label">Your Company</label>
            <input type="text" class="form-input" name="company" placeholder="Type..." />
          </div>
          <div class="form-input-block">
            <label class="form-label">Select Required Services</label>
            <select class="form-input service$input_suffix" name="service" required>
              <option value="">Select Type</option>
              <option value="Marketing Research">Marketing Research</option>
              <option value="Strategic Solutions">Strategic Solutions</option>
              <option value="End-to-End Marketing">End-to-End Marketing</option>
              <option value="Global Market Expansion">Global Market Expansion</option>
            </select>
            <span class="error serviceError"></span>
          </div>
          <button type="submit" class="$button_class">Send Request</button>
        </form>
      </div>
    HTML;

    return $html;
  }
}
?>
