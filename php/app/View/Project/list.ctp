<?php

foreach ($projects as $project) {

    $result['data'][] = array(
        "id" => h($project['Project']['id']),
        "name" => h($project['Project']['name']),
        "type" => h($project['Project']['type']),
        "board" => h($project['Project']['board']),
        "description" => h($project['Project']['description'])
    );
}
unset($project);

echo json_encode($result);

