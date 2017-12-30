
--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS blocklyprop.project (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_user` bigint(20) NOT NULL,
  `id_clouduser` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
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
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `project_tag`
--

CREATE TABLE IF NOT EXISTS blocklyprop.project_tag (
  `id_project` bigint(20) NOT NULL,
  `id_tag` bigint(20) NOT NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `sec_role`
--

CREATE TABLE IF NOT EXISTS blocklyprop.sec_role (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;

--
-- Table structure for table `sec_user_role`
--

CREATE TABLE IF NOT EXISTS blocklyprop.sec_user_role (
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

CREATE TABLE IF NOT EXISTS blocklyprop.session (
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

CREATE TABLE IF NOT EXISTS blocklyprop.tag (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8;


--
-- Table structure for table `user`
--
CREATE TABLE IF NOT EXISTS blocklyprop.user (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idCloudSession` bigint(20) NOT NULL,
  `screenname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  AUTO_INCREMENT=0
  DEFAULT CHARSET=utf8;
