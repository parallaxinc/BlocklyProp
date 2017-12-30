/*
 *  Add a description field to the project that supports HTML
 */
ALTER TABLE project
  ADD description_html LONGTEXT NULL AFTER description;