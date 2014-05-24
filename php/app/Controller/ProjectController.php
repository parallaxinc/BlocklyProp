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
class ProjectController extends AppController {

    public function beforeRender() {
        parent::beforeRender();
        $this->layout = 'json/default';
    }

    public function index($id) {

    }

    public function view($id = null) {
        if (!$id) {
            throw new NotFoundException(__('Invalid project'));
        }
        $project = $this->Project->findById($id);
        if (!$project) {
            throw new NotFoundException(__('Invalid project'));
        }
        $this->set('project', $project);
    }

    public function foruser($id) {
        echo $id;
    }

    public function create() {
        if ($this->request->is('post')) {
            $this->Project->create();
            if ($this->Project->save($this->request->data)) {
                echo 'added';
            } else {

            }
        }
    }

}
