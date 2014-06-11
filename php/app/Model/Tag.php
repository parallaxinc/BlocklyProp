<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppModel', 'Model');

/**
 * CakePHP Tag
 * @author Michel
 */
class Tag extends AppModel {

    public $useTable = 'tags';
    public $hasAndBelongsToMany = array(
        'Project' =>
        array(
            'className' => 'Project',
            'joinTable' => 'projects_tags',
            'foreignKey' => 'id_tag',
            'associationForeignKey' => 'id_project',
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
    
    public $validate = array(
        'name' => array(
            'unique' => array(
                'rule' => array('unique'),
                'message' => 'Tags need to be unique'
            )
        )
    );
    
    public function unique($check) {
        // $check will have value: array('email' => 'YOUR_EMAIL')
        $count = $this->find('count', array(
            'conditions' => $check
        ));
        return $count === 0;
    }

}
