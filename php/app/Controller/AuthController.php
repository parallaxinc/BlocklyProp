<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppController', 'Controller');

/**
 * CakePHP AuthController
 * @author Michel
 */
class AuthController extends AppController {

    public $uses = array('User');

    public function beforeRender() {
        parent::beforeRender();
//        $this->RequestHandler->setContent('json');
        $this->response->type('json');
        $this->layout = 'json/default';
    }

    public function signin() {
        $email = $this->request->data('email');
        $password = $this->request->data('password');

        $user = $this->User->get_user($email, $password);
        if ($user) {
            $this->Session->write('User', $user);
            $this->set('user', $user);
            $this->render('user');
        } else {
            $this->render('login_error');
        }
    }

    public function register() {
        $password = $this->request->data('password');
        $passwordConfirm = $this->request->data('passwordConfirm');

        if ($this->request->is('post')) {

            $this->User->create();
            if ($password != $passwordConfirm) {
                $this->User->invalidate('passwordConfirm', "The passwords don't match.");
            }
            if (!$this->User->validates()) {
                $errors = $this->User->validationErrors;
                $this->set('errors', $errors);
                $this->render('register_error');
                return;
            }

            if ($this->User->save($this->request->data)) {
                $id = $this->User->id;
                $user = $this->User->findById($id);
                if (!$user) {
                    throw new NotFoundException(__('Invalid user'));
                }
                $this->Session->write('User', $user);
                $this->set('user', $user);
                $this->render('user');
            } else {
                $errors = $this->User->validationErrors;
                $this->set('errors', $errors);
                $this->render('register_error');
            }
        }
//            $this->Session->setFlash(
//                __('The user could not be saved. Please, try again.')
//            );
    }
    
    public function user() {
        if ($this->Session->check('User') && $this->Session->read('User.id') != null) {
            $user = $this->User->findById($this->Session->read('User.id'));
           // echo $user;
            if (!$user) {
                throw new NotFoundException(__('Invalid user'));
            }
            $this->set('user', $user);
            $this->render('user');
        } else {
            $this->render('login_error');       
        }
    }

}
