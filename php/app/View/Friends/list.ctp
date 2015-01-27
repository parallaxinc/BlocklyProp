<?php

foreach ($friends as $friend) {
    
//    print_r($friend);

    $resultItem = array(
        "requester" => h($friend['']['']),
        "requestee" => h($friend['']['']),
        "id" => h($friend['']['']),
        "friend_request" => h($friend[''][''])
    );

    foreach ($friend['Tag'] as $tag) {
        $resultItem['tags'][] = array(
            "id" => h($tag['id']),
            "name" => h($tag['name'])
        );
    }

    $result['data'][] = $resultItem;
}
unset($friend);

echo json_encode($result);

