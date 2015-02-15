<?php

foreach ($friends as $friend) {

    $resultItem = array(
        "requester" => h($friend['Friend']['requester']),
        "requestee" => h($friend['Friend']['requestee']),
        "id" => h($friend['Friend']['id']),
        "friend_request" => h($friend['Friend']['friend_request']),
        "friends_since" => h($friend['Friends']['friends_since'])
    );

    $result[] = h($friend);
}
unset($friend);

echo json_encode($result);

