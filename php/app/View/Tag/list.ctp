<?php

foreach ($tags as $id => $tag) {
//    $resultItem = array(
//        "id" => h($tag['Tag']['id']),
//        "name" => h($tag['Tag']['name'])
//    );
    $result[] = h($tag); //$resultItem;
}
unset($tag);

echo json_encode($result);

