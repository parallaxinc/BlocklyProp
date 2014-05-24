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
//        $this->RequestHandler->setContent('json');
        $this->response->type('json');
        $this->layout = 'json/default';
    }

    public function index($page = 0) {
        $type = $this->request->data('type');
        $board = $this->request->data('board');
        $conditions = array();
        if ($type != null) {
            $conditions['Project.type'] = $type;
        }
        if ($board != null) {
            $conditions['Project.board'] = $board;
        }
        $projects = $this->Project->find('all', array(
            'conditions' => $conditions,
            'limit' => 20, 'page' => $page
        ));
        $this->set('projects', $projects);
        $this->render('list');
    }

    public function foruser($id) {
        if (!$id) {
            throw new NotFoundException(__('Invalid user'));
        }
        $type = $this->request->data('type');
        $board = $this->request->data('board');
        $conditions = array('Project.id_user' => $id);
        if ($type != null) {
            $conditions['Project.type'] = $type;
        }
        if ($board != null) {
            $conditions['Project.board'] = $board;
        }
        $projects = $this->Project->find('all', array(
            'conditions' => $conditions
        ));
        $this->set('projects', $projects);
        $this->render('list');
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
