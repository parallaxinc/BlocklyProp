/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Jim Ewald
 * Created: Aug 27, 2018
 * 
 * Add a field to the project table to store a JSON encoded group of project
 * settings.
 */

ALTER TABLE blocklyprop.project ADD settings TEXT NULL;

