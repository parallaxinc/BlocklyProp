/*
 * Create a message of the day table
 */

CREATE TABLE IF NOT EXISTS blocklyprop.motd
(
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  message_text VARCHAR(250) NOT NULL,
  message_html VARCHAR(250),
  notes VARCHAR(250),
  enabled BOOLEAN DEFAULT FALSE  NOT NULL,
  enable_datetime DATETIME,
  disable_datetime DATETIME,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_change_date TIMESTAMP
) ENGINE=InnoDB
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;