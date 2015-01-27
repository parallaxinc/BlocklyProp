<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppModel', 'Model');

/**
 * CakePHP BPUser
 * @author Vale
 */
class Friends extends AppModel {
    
    public $useTable = 'friends';
    
    public function getfriends( $user )
    {
        $query_result = $this->find( 'all', array( 'conditions' => array( 'requester' => $user )));
        
        //$user = $query_result[$this->alias];
        if ( $query_result )
        {
            return $query_result;
        } else
        {
            $query_result = $this->find( 'all', array( 'conditions' => array( 'requestee' => $user )));
            
            if ( $query_result )
            {
                return $query_result;
            }
        }
        
        return null;
    }
}
