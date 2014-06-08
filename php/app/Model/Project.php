<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppModel', 'Model');

/**
 * CakePHP Project
 * @author Michel
 */
class Project extends AppModel {
    
    public $belongsTo = array(
        'User' => array(
            'className' => 'User',
            'foreignKey' => 'id_user'
        )
    );

    public $hasAndBelongsToMany = array(
        'Tag' =>
        array(
            'className' => 'Tag',
            'joinTable' => 'projects_tags',
            'foreignKey' => 'id_project',
            'associationForeignKey' => 'id_tag',
            'unique' => true,
            'conditions' => '',
            'fields' => '',
            'order' => '',
            'limit' => '',
            'offset' => '',
            'finderQuery' => '',
            'with' => 'ProjectTag'
        )
    );

}
