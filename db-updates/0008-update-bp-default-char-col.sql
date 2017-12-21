/*
Script:  0004-update-cs-default-char-col.sql

This script corrects an issue in the cloud session database
where the default character set and collation were set to
'latin1' and 'latin1_swedish_ci'. These settings should be
'utf8' and 'utf8_general_ci'.

This script updates the character set and collation settings
on the cloudsession database, all cloudsession tables and
affected columns within each of these tables.
 */

# Select the target database
USE blocklyprop;

# Set the database defaults
# This also sets the collation for individual table columns
ALTER DATABASE blocklyprop CHARACTER SET utf8 COLLATE utf8_general_ci;

/*
* admin
+ friend
+ friend_request
* friend_request_email
* project
 * project_sharing
+ project_tag
* sec_role
+ sec_user_role
* session
* tag
* user
*/

/*
 * Update the admin table
 */
SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.admin DEFAULT CHARACTER SET utf8;

# Column settings
ALTER TABLE blocklyprop.admin MODIFY db_script VARCHAR(255) CHARACTER SET utf8;
ALTER TABLE blocklyprop.admin MODIFY notes VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the friend_request_email table
 */
SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.friend_request_email DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.friend_request_email MODIFY accept_Key  VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the project table
 */
SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.project DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.project MODIFY name VARCHAR(255) CHARACTER SET utf8;
ALTER TABLE blocklyprop.project MODIFY description LONGTEXT CHARACTER SET utf8;
ALTER TABLE blocklyprop.project MODIFY description_html LONGTEXT CHARACTER SET utf8;
ALTER TABLE blocklyprop.project MODIFY code LONGTEXT CHARACTER SET utf8;
ALTER TABLE blocklyprop.project MODIFY type VARCHAR(45) CHARACTER SET utf8;
ALTER TABLE blocklyprop.project MODIFY board VARCHAR(45) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the project_sharing table
 */

SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.project_sharing DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.project_sharing MODIFY sharekey VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the sec_role table
 */

SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.sec_role DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.sec_role MODIFY name VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the session table
 */

SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.session DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.session MODIFY idsession VARCHAR(255) CHARACTER SET utf8;
ALTER TABLE blocklyprop.session MODIFY host VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


/*
 * Update the tag table
 */

SET foreign_key_checks = 0;

# Update the table default settings
ALTER TABLE blocklyprop.tag DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.tag MODIFY name VARCHAR(255) CHARACTER SET utf8;

SET foreign_key_checks = 1;


# Update the user table
SET foreign_key_checks = 0;

ALTER TABLE blocklyprop.user DEFAULT CHARACTER SET utf8;

# Reset fields
ALTER TABLE blocklyprop.user MODIFY screenname VARCHAR(250) CHARACTER SET utf8;

SET foreign_key_checks = 1;

