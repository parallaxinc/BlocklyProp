/* Admin table stores system level administrative details
//
// Each row of the table will contain changes from the previous
// row. This will provide an audit trail for all admin settings.
//--------------------------------------------------------------
//
// Field descriptions:
//
//  id		Primary key
//  db_version	Sequence number for database schema changes
//  db_script	File name of the SQL script that implements
//              the change
//  notes	Narrative attached to the change [Optional]
//  last_change_date
//		System-supplied time stamp to record when the
//              change was recorded.
//--------------------------------------------------------------
*/
CREATE TABLE if not exists blocklyprop.admin (
  `id` bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `db_version` int NOT NULL,
  `db_script` varchar(255) NOT NULL,
  `notes` varchar(255),
  `last_change_date` DATETIME NOT NULL DEFAULT NOW()
) ENGINE=InnoDB
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;
