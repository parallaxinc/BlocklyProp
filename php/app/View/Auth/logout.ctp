<?php


$response = array('success' => true);

if (isset($message)) {
    $response['message'] = $message;
}
// $response['errors'] = $errors;
        
echo json_encode($response);