/*
 *  Add a description field to the project that supports HTML
 */
ALTER TABLE blocklyprop.project
  ADD description_html LONGTEXT NULL AFTER description;