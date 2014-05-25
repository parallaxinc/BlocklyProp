<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppController', 'Controller');

/**
 * CakePHP ProjectController
 * @author Michel
 */
class TagController extends AppController {

    public function beforeRender() {
        parent::beforeRender();
//        $this->RequestHandler->setContent('json');
        $this->response->type('json');
        $this->layout = 'json/default';
    }

    public function index() {
        $query = $this->request->data('query');
        if ($query == null) {
            $tags = $this->Tag->find('list', array(
                'fields' => array('Tag.name'),
                'order' => array('Tag.name')
            ));
        } else {
            $tags = $this->Tag->find('list', array(
                'fields' => array('Tag.name'),
                'conditions' => array('Tag.name LIKE' => "%$query%"),
                'order' => array('Tag.name')
            ));
        }

        $this->set('tags', $tags);
        $this->render('list');
    }

}
