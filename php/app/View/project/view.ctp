{
"id": <?php echo h($project['Project']['id']); ?>,
"name": "<?php echo h($project['Project']['name']); ?>",
"type": "<?php echo h($project['Project']['type']); ?>",
"board": "<?php echo h($project['Project']['board']); ?>",
"description": "<?php echo h($project['Project']['description']); ?>",
"code": "<?php echo $project['Project']['code']; ?>"
}