<?php


$response = array('success' => false);

if (isset($message)) {
    $response['message'] = $message;
}
if (isset($code)) {
    $response['code'] = $code;
}
// $response['errors'] = $errors;
        
echo json_encode($response);