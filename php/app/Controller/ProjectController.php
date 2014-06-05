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

    public function index() {
        $perPage = $this->request->data('perPage') ? : 10;
        $page = $this->request->data('currentPage') ? : 1;
        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
        $type = $this->request->data('type');
        $board = $this->request->data('board');
        $conditions = array();
        if ($type != null) {
            $conditions['Project.type'] = $type;
        }
        if ($board != null) {
            $conditions['Project.board'] = $board;
        }
        if (count($sort[0]) == 2) {
            $order = array("Project." . $sort[0][0] => $sort[0][1]);
        }

        $projects = $this->Project->find('all', array(
            'conditions' => $conditions,
            'order' => $order,
            'limit' => $perPage, 'page' => $page
        ));
        $projectCount = $this->Project->find('count', array(
            'conditions' => $conditions
        ));
        $result = array(
            "totalRows" => $projectCount,
            "perPage" => $perPage,
            "sort" => $sort,
            "currentPage" => $page,
            "filter" => $filter,
            "data" => array()
        );
        $this->set('projects', $projects);
        $this->set('result', $result);
        $this->render('list');
    }

    public function foruser($id) {
        $perPage = $this->request->data('perPage') ? : 10;
        $page = $this->request->data('currentPage') ? : 1;
        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
        $type = $this->request->data('type');
        $board = $this->request->data('board');
        $conditions = array();
        $conditions['Project.id_user'] = 0;
        if ($type != null) {
            $conditions['Project.type'] = $type;
        }
        if ($board != null) {
            $conditions['Project.board'] = $board;
        }
        if (count($sort[0]) == 2) {
            $order = array("Project." . $sort[0][0] => $sort[0][1]);
        }

        $projects = $this->Project->find('all', array(
            'conditions' => $conditions,
            'order' => $order,
            'limit' => $perPage, 'page' => $page
        ));
        $projectCount = $this->Project->find('count', array(
            'conditions' => $conditions
        ));
        $result = array(
            "totalRows" => $projectCount,
            "perPage" => $perPage,
            "sort" => $sort,
            "currentPage" => $page,
            "filter" => $filter,
            "data" => array()
        );
        $this->set('projects', $projects);
        $this->set('result', $result);
        $this->render('list');
    }
    
    public function mine() {
        $perPage = $this->request->data('perPage') ? : 10;
        $page = $this->request->data('currentPage') ? : 1;
        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
        $type = $this->request->data('type');
        $board = $this->request->data('board');
        $conditions = array();
        $conditions['Project.id_user'] = $this->Session->read('User.id');
        if ($type != null) {
            $conditions['Project.type'] = $type;
        }
        if ($board != null) {
            $conditions['Project.board'] = $board;
        }
        if (count($sort[0]) == 2) {
            $order = array("Project." . $sort[0][0] => $sort[0][1]);
        }

        $projects = $this->Project->find('all', array(
            'conditions' => $conditions,
            'order' => $order,
            'limit' => $perPage, 'page' => $page
        ));
        $projectCount = $this->Project->find('count', array(
            'conditions' => $conditions
        ));
        $result = array(
            "totalRows" => $projectCount,
            "perPage" => $perPage,
            "sort" => $sort,
            "currentPage" => $page,
            "filter" => $filter,
            "data" => array()
        );
        $this->set('projects', $projects);
        $this->set('result', $result);
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
        if (!$this->Session->check('User.id') || $this->Session->read('User.id') != $project['id_user']) {
            unset($project['id']);
        }
        $this->set('project', $project);
    }

    public function save() {
        if ($this->Session->read('User.id') == null) {
            $this->render('user_error');
            return;
        }
        if ($this->request->is('post')) {
            if ($this->request->data('id')) {
                $this->Project->id = $this->request->data('id');
                unset($this->request->data['modified']);
                if ($this->Project->save($this->request->data)) {
                    $id = $this->Project->id;
                } else {

                }
            } else {
                $this->Project->create();
                $this->Project['id_user'] = $this->Session->read('User.id');
                if ($this->Project->save($this->request->data)) {
                    $id = $this->Project->id;
                } else {

                }
            }
            $project = $this->Project->findById($id);
            if (!$project) {
                throw new NotFoundException(__('Invalid project'));
            }
            $this->set('project', $project);
            $this->render('view');
        }
    }

}
