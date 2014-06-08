<?php


$response = array('success' => false);
if (isset($message)) {
    $response['message'] = $message;
}
// $response['errors'] = $errors;
        
echo json_encode($response);