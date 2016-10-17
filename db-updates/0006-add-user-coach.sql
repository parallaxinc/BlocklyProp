/*
 * Add coach email address field to support email cc option.
 */
ALTER TABLE user ADD COLUMN coach_email VARCHAR(250) AFTER screen_name;
