/*
 *  Correct issue with project sharing id not incrementing
 */

ALTER TABLE blocklyprop.project_sharing MODIFY id BIGINT(20) NOT NULL AUTO_INCREMENT;


-- Record schema change
INSERT INTO blocklyprop.admin (
    db_version, 
    db_script,
    notes
    )
VALUES (
    5,
    '0005-fix_share-key_autoincrement.sql',
    'Correct issue with project sharing id not incrementing'
    );


