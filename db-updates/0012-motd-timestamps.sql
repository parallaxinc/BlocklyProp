/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Add message enable and disable timestamps. This superceeds the older
 * message dateTime enable and disable dates, which are removed in this update.
 *
 * Author:  Jim Ewald
 * Created: Jun 21, 2018
 */

USE blocklyprop;

ALTER TABLE blocklyprop.motd ADD message_enable_time timestamp NULL;
ALTER TABLE blocklyprop.motd ADD message_disable_time timestamp NULL;


INSERT INTO blocklyprop.admin (
    db_version, 
    db_script,
    notes
    )
VALUES (
    11,
    '0012-motd-timestampes.sql',
    'First step in replacing DataTime colums with Timestamp columns'
    );
