<?php

foreach ($projects as $project) {
    
//    print_r($project);

    $resultItem = array(
        "id" => h($project['Project']['id']),
        "by" => h($project['User']['screenname']),
        "id-by" => h($project['User']['id']),
        "name" => h($project['Project']['name']),
        "type" => h($project['Project']['type']),
        "board" => h($project['Project']['board']),
        "description" => h($project['Project']['description'])
    );

    foreach ($project['Tag'] as $tag) {
        $resultItem['tags'][] = array(
            "id" => h($tag['id']),
            "name" => h($tag['name'])
        );
    }

    $result['data'][] = $resultItem;
}
unset($project);

echo json_encode($result);

