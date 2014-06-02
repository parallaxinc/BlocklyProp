<?php

//echo json_encode($user);

unset($user['password']);

$response = array(
    'success' => true,
    'user' => $user
    );

        
echo json_encode($response);