<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $fullName = $_POST['fullName'] ?? '';
    $email    = $_POST['email']    ?? '';
    $phone    = $_POST['phone']    ?? '';
    $company  = $_POST['company']  ?? '';
    $service  = $_POST['service']  ?? '';


    $to      = "work.pastushenko@gmail.com";

    $subject = "New request from $fullName";

    $message = "You have a new request:\n\n"
             . "Full Name: $fullName\n"
             . "Email: $email\n"
             . "Phone: $phone\n"
             . "Company: $company\n"
             . "Selected Service: $service\n";

    $headers = "From: no-reply@morcans.digital"; 
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        

        header("Location: index.php");
        exit;
    } else {
        print_r("Ошибка: письмо не отправлено.");
    }

} else {
    echo "Method not allowed.";
}
