/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  developer
 * Created: Jun 25, 2018
 */

USE blocklyprop;

// Remove unneeded timestamp fields
ALTER TABLE blocklyprop.motd DROP enable_datetime;
ALTER TABLE blocklyprop.motd DROP disable_datetime;

// Remove Friends support tables



INSERT INTO blocklyprop.admin (
    db_version, 
    db_script,
    notes
    )
VALUES (
    13,
    '0013-clear-deprecated-objects.sql',
    'Remove deprecated tables and columns'
    );
