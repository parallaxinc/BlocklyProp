<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppModel', 'Model');
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');

/**
 * CakePHP BPUser
 * @author Michel
 */
class User extends AppModel {

    public $useTable = 'users';
    public $validate = array(
        'email' => array(
            'email' => array(
                'rule' => array('email'),
                'message' => 'Your email is not valid'
            ),
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'Your email is required'
            ),
            'unique' => array(
                'rule' => array('unique'),
                'message' => 'Your email needs to be unique'
            )
        ),
        'password' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A password is required'
            ),
            'minLength' => array(
                'rule' => array('minLength', 8),
                'message' => 'The password needs to be at least 8 characters'
            )
        )
    );

    public function beforeSave($options = array()) {
        if (isset($this->data[$this->alias]['password'])) {
            $passwordHasher = new SimplePasswordHasher();
            $this->data[$this->alias]['password'] = $passwordHasher->hash(
                    $this->data[$this->alias]['password']
            );
        }
        return true;
    }

    public function unique($check) {
        // $check will have value: array('email' => 'YOUR_EMAIL')
        $emailCount = $this->find('count', array(
            'conditions' => $check
        ));
        return $emailCount === 0;
    }

    public function get_user($login, $password) {
        $query_result = $this->find('first', array('conditions' => array('email' => $login)));

        $user = $query_result[$this->alias];
        if ($user) {
            $passwordHasher = new SimplePasswordHasher();
            if ($passwordHasher->check($password, $user['password'])) {
                return $user;
            }
        }
        return null;
    }
    
    public function get_user_by_id($id, $password) {
        $query_result = $this->find('first', array('conditions' => array('id' => $id)));

        $user = $query_result[$this->alias];
        if ($user) {
            $passwordHasher = new SimplePasswordHasher();
            if ($passwordHasher->check($password, $user['password'])) {
                return $user;
            }
        }
        return null;
    }

}
