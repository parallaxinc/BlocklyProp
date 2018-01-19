/*
 *  Correct issue with project shaing id not incrementing
 */

ALTER TABLE blocklyprop.project_sharing MODIFY id BIGINT(20) NOT NULL AUTO_INCREMENT;

