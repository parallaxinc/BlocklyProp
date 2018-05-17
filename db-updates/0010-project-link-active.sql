/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  J. Ewald
 * Created: Mar 20, 2018
 *
 * Add an active field to the project link table. This will allow a user to
 * enable/disable their shared project without destroying the shared project
 * key.
 */

ALTER TABLE project_sharing ADD active BIT DEFAULT 0 NULL AFTER sharekey;

/* 
 * All of the current rows in the project_sharing table are active. Set the
 * active flag for all records to match that state.
 */
UPDATE blocklyprop.project_sharing
    SET active = true;
