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

    public $uses = array('Project', 'Tag', 'ProjectTag');

    public function beforeRender() {
        parent::beforeRender();
//        $this->RequestHandler->setContent('json');
        $this->response->type('json');
        $this->layout = 'json/default';
    }

    public function index() {
//        $perPage = $this->request->data('perPage') ? : 10;
//        $page = $this->request->data('currentPage') ? : 1;
//        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
//        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
//        $type = $this->request->data('type');
//        $board = $this->request->data('board');
        $conditions = array();
        $conditions['Project.shared'] = 1;
//        if ($type != null) {
//            $conditions['Project.type'] = $type;
//        }
//        if ($board != null) {
//            $conditions['Project.board'] = $board;
//        }
//        if (count($sort[0]) == 2) {
//            $order = array("Project." . $sort[0][0] => $sort[0][1]);
//        }

        $projects = $this->Project->find('all', array(
            'conditions' => $conditions,
//            'order' => $order,
//            'limit' => $perPage, 'page' => $page
        ));
//        $projectCount = $this->Project->find('count', array(
//            'conditions' => $conditions
//        ));
        $result = array(
//            "totalRows" => $projectCount,
//            "perPage" => $perPage,
//            "sort" => $sort,
//            "currentPage" => $page,
//            "filter" => $filter,
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
//        $perPage = $this->request->data('perPage') ? : 10;
//        $page = $this->request->data('currentPage') ? : 1;
//        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
//        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
//        $type = $this->request->data('type');
//        $board = $this->request->data('board');
        $conditions = array();
        $conditions['Project.id_user'] = $this->Session->read('User.id');
//        if ($type != null) {
//            $conditions['Project.type'] = $type;
//        }
//        if ($board != null) {
//            $conditions['Project.board'] = $board;
//        }
//        if (count($sort[0]) == 2) {
//            $order = array("Project." . $sort[0][0] => $sort[0][1]);
//        }

        $projects = $this->Project->find('all', array(
            'conditions' => $conditions
//            'order' => $order,
//            'limit' => $perPage, 'page' => $page
        ));
//        $projectCount = $this->Project->find('count', array(
//            'conditions' => $conditions
//        ));
        $result = array(
//            "totalRows" => $projectCount,
//            "perPage" => $perPage,
//            "sort" => $sort,
//            "currentPage" => $page,
//            "filter" => $filter,
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
//        if (!$this->Session->check('User.id')) {
//            unset($project['Project']['id']);
//        } else if ($this->Session->read('User.id') != $project['Project']['id_user']) {
//            unset($project['Project']['id']);
//        }
        $this->set('project', $project);
    }

    public function save() {
        if (!$this->Session->check('User.id')) {
            $this->set('code', 2);
            $this->render('user_error');
            return;
        }
        if ($this->request->is('post')) {
            if (isset($this->request->data['id_user']) && $this->request->data['id_user'] != $this->Session->read('User.id')) {
                unset($this->request->data['id']);
            }
            if ($this->request->data('id')) {
                $project = $this->Project->findById($this->request->data['id']);
                if ($project['Project']['id_user'] != $this->Session->read('User.id')) {
                    $this->set('code', 2);
                    $this->set('message', 'Not your project');
                    $this->render('user_error');
                    return;
                }

                $project['Project']['name'] = $this->request->data['name'];
                $project['Project']['description'] = $this->request->data['description'];
                $project['Project']['code'] = $this->request->data['code'];

                $this->Project->id = $this->request->data('id');
                unset($this->request->data['modified']);

                if ($this->Project->save($project['Project'])) {
                    $id = $this->Project->id;
                } else {
                    
                }
            } else {
                //       $this->request->data('id_user') = $this->Session->read('User.id');
                $this->Project->create();
                //$this->Project['id_user'] = $this->Session->read('User.id');
                if ($this->Project->save($this->request->data)) {
                    $id = $this->Project->id;
                } else {
                    
                }
            }
            $project = $this->Project->findById($id);
            $project['Project']['id_user'] = $this->Session->read('User.id');
            $this->Project->save($project['Project']);
            if (!$project) {
                throw new NotFoundException(__('Invalid project'));
            }
            $this->set('project', $project);
            $this->render('view');
        }
    }

    public function saveBaseData() {
        if (!$this->Session->check('User.id')) {
            $this->set('code', 2);
            $this->render('user_error');
            return;
        }
        if ($this->request->is('post')) {
            $project = $this->Project->findById($this->request->data['id']);
            if (!$project) {
                throw new NotFoundException(__('Invalid project'));
            }

            if ($project['Project']['id_user'] != $this->Session->read('User.id')) {
                $this->set('code', 2);
                $this->set('message', 'Not your project');
                $this->render('user_error');
                return;
            }

            $project['Project']['name'] = $this->request->data['name'];
            $project['Project']['description'] = $this->request->data['description'];
            $project['Project']['private'] = $this->request->data['private'] == "true" ? 1 : 0;
            $project['Project']['shared'] = $this->request->data['shared'] = "true" ? 1 : 0;

            $this->ProjectTag->deleteAll(array('id_project' => $project['Project']['id']), false);

            if (isset($this->request->data['tags']) && $this->request->data['tags'] != null) {
                foreach ($this->request->data['tags'] as $tag) {

                    $tagObject = $this->Tag->find('first', array(
                        'conditions' => array('Tag.name' => $tag)
                    ));
                    if ($tagObject == null) {
                        $tagObject = array(
                            'Tag' => array(
                                'name' => $tag
                            )
                        );
                        $this->Tag->create($tagObject);
                        if ($this->Tag->save($tagObject)) {
                            $id = $this->Tag->id;
                        } else {
                            // error
                        }
                    } else {
                        $id = $tagObject['Tag']['id'];
                    }

                    $projectTagObject = array(
                        'ProjectTag' => array(
                            'id_project' => $project['Project']['id'],
                            'id_tag' => $id
                        )
                    );
                    $this->ProjectTag->create($projectTagObject);
                    if ($this->ProjectTag->save($projectTagObject)) {
                        //  $id = $this->Tag->id;
                    } else {
                        // error
                    }
                }
            }

            if ($this->Project->save($project['Project'])) {
                $this->render('confirm');
            }
        }
    }

    public function delete($id) {
        if (!$id) {
            throw new NotFoundException(__('Invalid project'));
        }
        $project = $this->Project->findById($id);
        if (!$project) {
            throw new NotFoundException(__('Invalid project'));
        }

        if (!$this->Session->check('User.id')) {
            $this->set('message', 'Not logged in');
            $this->render('error');
            return;
        }

        if ($this->Session->read('User.id') != $project['Project']['id_user']) {
            $this->set('message', 'Not your project');
            $this->render('error');
        } else {
            $this->Project->delete($id);
            $this->render('confirm');
        }
    }

}
