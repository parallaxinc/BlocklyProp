-- MySQL dump 10.13  Distrib 5.6.31, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: blocklyprop
-- ------------------------------------------------------
-- Server version	5.6.31-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `db_version` int(11) NOT NULL,
  `db_script` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `last_change_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend_request_email`
--

DROP TABLE IF EXISTS `friend_request_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_sharing`
--

DROP TABLE IF EXISTS `project_sharing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_tag`
--

DROP TABLE IF EXISTS `project_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_tag` (
  `id_project` bigint(20) NOT NULL,
  `id_tag` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sec_role`
--

DROP TABLE IF EXISTS `sec_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sec_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sec_user_role`
--

DROP TABLE IF EXISTS `sec_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sec_user_role` (
  `id_user` bigint(20) NOT NULL,
  `id_role` bigint(20) NOT NULL,
  UNIQUE KEY `UNIQUE_user_role` (`id_user`,`id_role`),
  KEY `FK_USER_ROLE_ROLE_idx` (`id_role`),
  CONSTRAINT `FK_USER_ROLE_ROLE` FOREIGN KEY (`id_role`) REFERENCES `sec_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `idsession` varchar(255) NOT NULL,
  `startTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastAccessTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeout` bigint(20) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `attributes` mediumblob,
  PRIMARY KEY (`idsession`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idCloudSession` bigint(20) NOT NULL,
  `screenname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-10 18:31:37
