/*
 * Create a message of the day table
 */

CREATE TABLE IF NOT EXISTS blocklyprop.motd
(
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  message_text VARCHAR(2000) NOT NULL,
  message_html VARCHAR(2000),
  notes VARCHAR(4000),
  enabled BOOLEAN DEFAULT FALSE NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
  enable_datetime DATETIME,
  disable_datetime DATETIME,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT 'Customer-facing alerts'
  ENGINE=InnoDB
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;


-- Record schema change
INSERT INTO blocklyprop.admin (
    db_version, 
    db_script,
    notes
    )
VALUES (
    9,
    '0009-motd.sql',
    'Implement support for database-driven banner messages'
    );
