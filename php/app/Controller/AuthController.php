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
            $this->render('error');
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
                $this->render('form_error');
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
                $this->render('form_error');
            }
        }
//            $this->Session->setFlash(
//                __('The user could not be saved. Please, try again.')
//            );
    }
    
    public function user() {
        if ($this->Session->check('User')) {
            if (!$this->Session->read('User.id')) {
                $this->set('message', $this->Session->read('User'));
                $this->render('error'); 
                return;
            }
            $user = $this->User->findById($this->Session->read('User.id'));
           // echo $user;
            if (!$user) {
                throw new NotFoundException(__('Invalid user'));
            }
            $this->set('user', $user['User']);
            $this->render('user');
        } else {
            $this->render('error');       
        }
    }
    
    public function logout() {
        $this->Session->destroy();
    }
    
    public function change() {
        if (!$this->Session->check('User.id')) {
            $this->set('message', 'Not logged in');
            $this->render('error');
            return;
        }
        if ($this->request->is('post')) {
            $oldPassword = $this->request->data('oldPassword');
            
            $user = $this->User->get_user_by_id($this->Session->read('User.id'), $oldPassword);
            if ($user == null) {
                $this->User->invalidate('oldPassword', "Old password incorrect");
            }
            if (!$this->User->validates()) {
                $errors = $this->User->validationErrors;
                $this->set('errors', $errors);
                $this->render('form_error');
                return;
            }
            
            $password = $this->request->data('password');
            $passwordConfirm = $this->request->data('passwordConfirm');
            
            if ($password != $passwordConfirm) {
                $this->User->invalidate('passwordConfirm', "The passwords don't match.");
            }
            if (!$this->User->validates()) {
                $errors = $this->User->validationErrors;
                $this->set('errors', $errors);
                $this->render('form_error');
                return;
            }
            
            $email = $this->request->data('email');
            $screenname = $this->request->data('screenname');
            
            if ($user['email'] == $email) {
                unset($this->User->validate['email']['unique']); 
            }
            
            $user['password'] = $password;
            $user['email'] = $email;
            $user['screenname'] = $screenname;
            
            if ($this->User->save($user)) {
                $id = $this->User->id;
                $user = $this->User->findById($id);
                if (!$user) {
                    throw new NotFoundException(__('Invalid user'));
                }
                $this->Session->write('User', $user['User']);
                $this->set('user', $user['User']);
                $this->render('user');
            } else {
                $errors = $this->User->validationErrors;
                $this->set('errors', $errors);
                $this->render('form_error');
            }
        }
    }

}
