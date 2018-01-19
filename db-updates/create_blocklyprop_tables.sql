/*
 * Create the blocklyprop tables
 */


--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `db_version` int(11) NOT NULL,
  `db_script` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `last_change_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idRequestUser` bigint(20) NOT NULL,
  `idRequestedUser` bigint(20) NOT NULL,
  `requested` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted` datetime NOT NULL,
  `request_sent_count` int(11) NOT NULL DEFAULT '0',
  `request_last_sent` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `friend_idRequestUser_idRequestedUser_uindex` (`idRequestUser`,`idRequestedUser`),
  KEY `friend_requested_user_id_fk` (`idRequestedUser`),
  CONSTRAINT `friend_request_user_id_fk` FOREIGN KEY (`idRequestUser`) REFERENCES `user` (`id`),
  CONSTRAINT `friend_requested_user_id_fk` FOREIGN KEY (`idRequestedUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
CREATE TABLE `friend_request` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idRequestUser` bigint(20) NOT NULL,
  `idRequestedUser` bigint(20) NOT NULL,
  `requested` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `request_sent_count` int(11) NOT NULL DEFAULT '0',
  `request_last_sent` datetime DEFAULT CURRENT_TIMESTAMP,
  `refused` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `friend_request_idRequestUser_idRequestedUser_uindex` (`idRequestUser`,`idRequestedUser`),
  KEY `friend_request_requested_user_id_fk` (`idRequestedUser`),
  CONSTRAINT `friend_request_request_user_id_fk` FOREIGN KEY (`idRequestUser`) REFERENCES `user` (`id`),
  CONSTRAINT `friend_request_requested_user_id_fk` FOREIGN KEY (`idRequestedUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `friend_request_email`
--

DROP TABLE IF EXISTS `friend_request_email`;
CREATE TABLE `friend_request_email` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idRequestUser` bigint(20) NOT NULL,
  `email` bigint(20) NOT NULL,
  `accept_Key` varchar(255) NOT NULL,
  `requested` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `request_sent_count` int(11) NOT NULL DEFAULT '0',
  `request_last_sent` datetime DEFAULT CURRENT_TIMESTAMP,
  `refused` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `accept_Key` (`accept_Key`),
  UNIQUE KEY `friend_request_email_idRequestUser_idRequestedUser_uindex` (`idRequestUser`,`email`),
  CONSTRAINT `friend_request_email_request_user_id_fk` FOREIGN KEY (`idRequestUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_user` bigint(20) NOT NULL,
  `id_clouduser` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `description_html` longtext,
  `code` longtext,
  `type` varchar(45) NOT NULL,
  `board` varchar(45) NOT NULL,
  `private` tinyint(1) DEFAULT '0',
  `shared` tinyint(1) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `based_on` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `project_sharing`
--

DROP TABLE IF EXISTS `project_sharing`;
CREATE TABLE `project_sharing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_project` bigint(20) NOT NULL,
  `sharekey` varchar(255) NOT NULL,
  `expires` bit(1) DEFAULT b'0',
  `exprire_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_sharing_id_project_sharekey_uindex` (`id_project`,`sharekey`),
  KEY `project_sharing_sharekey_index` (`sharekey`),
  CONSTRAINT `project_sharing_project_id_fk` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `project_tag`
--

DROP TABLE IF EXISTS `project_tag`;
CREATE TABLE `project_tag` (
  `id_project` bigint(20) NOT NULL,
  `id_tag` bigint(20) NOT NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `sec_role`
--

DROP TABLE IF EXISTS `sec_role`;
CREATE TABLE `sec_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB
  AUTO_INCREMENT=2
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `sec_user_role`
--

DROP TABLE IF EXISTS `sec_user_role`;
CREATE TABLE `sec_user_role` (
  `id_user` bigint(20) NOT NULL,
  `id_role` bigint(20) NOT NULL,
  UNIQUE KEY `UNIQUE_user_role` (`id_user`,`id_role`),
  KEY `FK_USER_ROLE_ROLE_idx` (`id_role`),
  CONSTRAINT `FK_USER_ROLE_ROLE` FOREIGN KEY (`id_role`) REFERENCES `sec_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `idsession` varchar(255) NOT NULL,
  `startTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastAccessTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeout` bigint(20) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `attributes` mediumblob,
  PRIMARY KEY (`idsession`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idCloudSession` bigint(20) NOT NULL,
  `screenname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;
