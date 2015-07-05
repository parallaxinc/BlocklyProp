<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppController', 'Controller');

/**
 * CakePHP ProjectController
 * @author Vale Tolpegin
 */
class FriendController extends AppController {
    
    public $uses = array( 'Friends' );
    
    public function beforeRender() {
        parent::beforeRender();
        //        $this->RequestHandler->setContent('json');
        $this->response->type('json');
        $this->layout = 'json/default';
    }
    
    public function myfriends() {
        $current_user = $this->Session->read('User.id');
        
        $friends = $this->Friends->getfriends( $current_user );
        
        $result = array(
            "data" => array()
        );
        
        $this->set('friends', $friends);
        $this->set('result', $result);
        $this->render('list');
    }
    
    public function foruser($id) {
        $perPage = $this->request->data('perPage') ? : 10;
        $page = $this->request->data('currentPage') ? : 1;
        $sort = $this->request->data('sort') ? : array(array("id", "asc"));
        $filter = $this->request->data('filter') ? : array("column_0" => "foo");
        $requester = $this->request->data('requester');
        $requestee = $this->request->data('requestee');
        $friends_since = $this->request->data('friends_since');
        //$type = $this->request->data('type');
        //$board = $this->request->data('board');
        
        $conditions = array();
        $conditions['Friend.id_user'] = 0;
        //if ($type != null) {
          //  $conditions['Project.type'] = $type;
        //}
        if ( $requester == $this->Session->read('User.id'))
        {
            $conditions['Friend.requestee'] = $requestee;
        } else if ( $requestee == $this->Session->read('User.id'))
        {
            $conditions['Friend.requester'] = $requester;
        }
        //if ($board != null) {
          //  $conditions['Project.board'] = $board;
        //}
        if ( $friends_since != null )
        {
            $conditions['Friend.friends_since'] = $friends_since;
        }
        if (count($sort[0]) == 2) {
            $order = array("Friend." . $sort[0][0] => $sort[0][1]);
        }
        $projects = $this->Friends->find('all', array(
            'conditions' => $conditions,
            'order' => $order,
            'limit' => $perPage, 'page' => $page
        ));
        $projectCount = $this->Friends->find('count', array(
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
        $this->set('friends', $projects);
        $this->set('result', $result);
        $this->render('list');
    }
    
    public function view($id = null) {
        if (!$id) {
            throw new NotFoundException(__('Invalid friend'));
        }
        $friend = $this->Friend->findById($id);
        if (!$friend) {
            throw new NotFoundException(__('Invalid friend'));
        }
        //        if (!$this->Session->check('User.id')) {
        //            unset($project['Project']['id']);
        //        } else if ($this->Session->read('User.id') != $project['Project']['id_user']) {
        //            unset($project['Project']['id']);
        //        }
        $this->set('friend', $friend);
    }
}