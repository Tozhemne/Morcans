<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $fullName = $_POST['fullName'] ?? '';
    $email    = $_POST['email']    ?? '';
    $phone    = $_POST['phone']    ?? '';
    $company  = $_POST['company']  ?? '';
    $service  = $_POST['service']  ?? '';


    $to      = "hello@morcans.digital\r\n";

    $subject = "New request https://morcans.digital from $fullName";

    $message = "You have a new request:\n\n"
             . "Full Name: $fullName\n"
             . "Email: $email\n"
             . "Phone: $phone\n"
             . "Company: $company\n"
             . "Selected Service: $service\n";

    $headers  = "From: xvz48v0xqcxy@morcans.digital	\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        
        print_r("Письмо отправленно");
        header("Location: /");
        exit;
    } else {
        print_r("Ошибка: письмо не отправлено.");
    }

} else {
    echo "Method not allowed.";
}
