<?php
$formClass = isset($formClass) ? htmlspecialchars($formClass) : 'pop-up-contact-form';
?>

<form action="components/send.php" method="post" class="<?= $formClass ?>">
  <div class="form-input-block">
    <label class="form-label">Your Full Name</label>
    <input
      type="text"
      class="form-input fullName"
      name="fullName"
      placeholder="Sara Biverman"
      required
    />
    <span class="error fullNameError"></span>
  </div>

  <div class="form-input-block">
    <label class="form-label">Email</label>
    <input
      type="email"
      id="email"
      class="form-input email"
      name="email"
      placeholder="example@mail.com"
      required
    />
    <span class="error emailError"></span>
  </div>

  <div class="form-input-block">
    <label class="form-label">Phone</label>
    <input
      type="tel"
      id="phone"
      class="form-input phone"
      name="phone"
      placeholder="Type your mobile number"
    />
    <span class="error phoneError"></span>
  </div>

  <div class="form-input-block">
    <label class="form-label">Your Company</label>
    <input
      type="text"
      id="company"
      class="form-input"
      name="company"
      placeholder="Type..."
    />
  </div>

  <div class="form-input-block">
    <label class="form-label">Select Required Services</label>
    <select class="form-input service" name="service" required>
      <option class="service-option" value="">Select Type</option>
      <option class="service-option" value="Marketing Research">
        Marketing Research
      </option>
      <option class="service-option" value="Strategic Solutions">
        Strategic Solutions
      </option>
      <option class="service-option" value="End-to-End Marketing">
        End-to-End Marketing
      </option>
      <option class="service-option" value="Global Market Expansion">
        Global Market Expansion
      </option>
    </select>
    <span class="error serviceError"></span>
  </div>

  <button type="submit" class="contact-form-button">Send Request</button>
</form>