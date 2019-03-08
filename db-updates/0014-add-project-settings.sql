/**
 * Author:  Jim Ewald
 * Created: Aug 27, 2018
 * 
 * Add a field to the project table to store a JSON encoded group of project
 * settings.
 *
 * Add a field to the user profile to store JSON encoded settings related to
 * specific user.
 */

ALTER TABLE blocklyprop.project ADD settings TEXT NULL;
ALTER TABLE cloudsession.user ADD settings TEXT NULL;


