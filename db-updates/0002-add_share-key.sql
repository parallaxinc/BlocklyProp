/*
 * Create project sharing table
 */

CREATE TABLE IF NOT EXISTS blocklyprop.project_sharing (
  id BIGINT(20) PRIMARY KEY NOT NULL,
  id_project BIGINT(20) NOT NULL,
  sharekey VARCHAR(255) NOT NULL,
  expires BIT(1) DEFAULT b'0',
  exprire_date DATETIME,
  CONSTRAINT project_sharing_project_id_fk FOREIGN KEY (id_project) REFERENCES project (id),
  UNIQUE INDEX project_sharing_id_project_sharekey_uindex (id_project, sharekey),
  INDEX project_sharing_sharekey_index (sharekey)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;