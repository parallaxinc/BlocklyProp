/*
 *  Add a description field to the project that supports HTML
 */
ALTER TABLE blocklyprop.project
  ADD description_html LONGTEXT NULL AFTER description;

-- Record schema change
INSERT INTO blocklyprop.admin (
    db_version, 
    db_script,
    notes
    )
VALUES (
    3,
    '0003-rich-text-editor.sql',
    'Add HTML project description to project table'
    );
