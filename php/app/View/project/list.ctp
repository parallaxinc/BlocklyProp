[
<?php $first = true; ?>
<?php foreach ($projects as $project): ?>
    <?php
    if ($first) {
        $first = false;
    } else {
        echo ',';
    }
    ?>
    {
    "id": <?php echo h($project['Project']['id']); ?>,
    "name": "<?php echo h($project['Project']['name']); ?>",
    "type": "<?php echo h($project['Project']['type']); ?>",
    "board": "<?php echo h($project['Project']['board']); ?>",
    "description": "<?php echo h($project['Project']['description']); ?>"
    }
<?php endforeach; ?>
<?php unset($project); ?>
]