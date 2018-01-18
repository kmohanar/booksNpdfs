/*
SQLyog Community Edition- MySQL GUI v8.02 
MySQL - 5.7.17-log : Database - shareddb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`shareddb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `shareddb`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) NOT NULL DEFAULT '0',
  `accno` varchar(45) NOT NULL,
  `currency` varchar(45) NOT NULL DEFAULT 'USD',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `account` */

insert  into `account`(`id`,`accno`,`currency`) values (100,'17515','USD'),(101,'17531','USD'),(103,'77941','USD'),(104,'77968','USD'),(105,'CAD1091500010001','USD');

/*Table structure for table `bank` */

DROP TABLE IF EXISTS `bank`;

CREATE TABLE `bank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bankname` varchar(45) DEFAULT NULL,
  `ibanno` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `bankid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bankid_UNIQUE` (`bankid`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

/*Data for the table `bank` */

insert  into `bank`(`id`,`bankname`,`ibanno`,`address`,`bankid`) values (100,'ALPHABank','BE44739009830099','Schulstrasse 4 32547 Bad Oyenhausen BELGIUM','100433'),(101,'BETABank','DE89370400440532013000','Mickey Cornet 6 B-4800 VERVIERS GERMANY','100435');

/*Table structure for table `chargecodes` */

DROP TABLE IF EXISTS `chargecodes`;

CREATE TABLE `chargecodes` (
  `SLNO` int(11) NOT NULL,
  `CHARGECODE` varchar(45) DEFAULT NULL,
  `CURRENCY` varchar(45) DEFAULT NULL,
  `CALCULATIONTYPE` varchar(45) DEFAULT NULL,
  `AMOUNT` varchar(45) DEFAULT NULL,
  `CATEGORYACCOUNT` varchar(45) DEFAULT NULL,
  `TYPE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SLNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `chargecodes` */

insert  into `chargecodes`(`SLNO`,`CHARGECODE`,`CURRENCY`,`CALCULATIONTYPE`,`AMOUNT`,`CATEGORYACCOUNT`,`TYPE`) values (1,'LCADVISE','USD','FLAT','75','52316','LC'),(2,'LCADVISE','EUR','FLAT','70','52316','LC'),(3,'LCADVISE','SGD','FLAT','80','52316','LC'),(4,'LCADVISE','GBP','FLAT','65','52316','LC'),(5,'LCAMEND','USD','FLAT','80','52306','LC'),(6,'LCAMEND','EUR','FLAT','80','52306','LC'),(7,'LCAMEND','SGD','FLAT','80','52306','LC'),(8,'LCAMEND','GBP','FLAT','80','52306','LC'),(9,'LCCHASER','USD','FLAT','25','52340','LC'),(10,'LCCONFIRM','USD','BAND','250','52315','LC'),(11,'LCCOURIER','USD','FLAT','30','52350','LC'),(12,'LCDISCNT','USD','FLAT','60','52311','LC'),(13,'LCDISCREP','USD','FLAT','35','52310','LC'),(14,'LCINCOLL','USD','LEVEL','50','52320','LC'),(15,'LCINCOLL','EUR','LEVEL','50','52320','LC'),(16,'LCINCOLL','SGD','LEVEL','50','52320','LC'),(17,'LCINCOLL','GBP','LEVEL','50','52320','LC'),(18,'LCNEGO','USD','FLAT','45','52312','LC'),(19,'LCOPENAMRT','USD','LEVEL','200','52305','LC'),(20,'LCOUTCOLL','USD','LEVEL','100','52330','LC'),(21,'LCREIMB','USD','FLAT','50','52308','LC'),(22,'LCSLAMEND','USD','FLAT','80','52306','LC'),(23,'LCSLCONFIRM','USD','BAND','250','52315','LC'),(24,'LCSLCONFIRM','EUR','BAND','250','52315','LC'),(25,'LCSLCONFIRM','GBP','BAND','250','52315','LC'),(26,'LCSLCONFIRM','SGD','BAND','250','52315','LC'),(27,'LCSLNEGO','USD','FLAT','45','52312','LC'),(28,'LCSLNEGO','EUR','FLAT','45','52312','LC'),(29,'LCSLNEGO','GBP','FLAT','45','52312','LC'),(30,'LCSLNEGO','SGD','FLAT','50','52312','LC'),(31,'LCSLOPEN','USD','LEVEL','200','52305','LC'),(32,'LCSWIFT','USD','FLAT','40','52345','LC'),(33,'LCSWIFT','EUR','FLAT','35','52345','LC'),(34,'LCSWIFT','GBP','FLAT','50','52345','LC'),(35,'LCSWIFT','SGD','FLAT','50','52345','LC'),(36,'LCTRFR','USD','FLAT','100','52317','LC'),(37,'LCSLOPENCP','RECORD MISSING','RECORD MISSING','RECORD MISSING','RECORD MISSING','LC'),(38,'GTEEADVIS','USD','FLAT','50','52390','BG'),(39,'GTEEADVIS','EUR','FLAT','50','52390','BG'),(40,'GTEEADVIS','SGD','FLAT','70','52390','BG'),(41,'GTEEISSAMD','USD','LEVEL','100','52380','BG'),(42,'GTEEISSAMD','GBP','LEVEL','100','52380','BG'),(43,'GTEEISSAMD','EUR','LEVEL','100','52380','BG'),(44,'GTEEISSAMD','SGD','LEVEL','100','52380','BG'),(45,'GTEEISSUE','USD','LEVEL','100','52380','BG'),(46,'GTEEISSUE','GBP','LEVEL','100','52380','BG'),(47,'GTEEISSUE','EUR','LEVEL','100','52380','BG'),(48,'GTEEISSUE','SGD','LEVEL','100','52380','BG'),(49,'GTEEMAREG','USD','FLAT','30','52380','BG'),(50,'GTEEMAREG','GBP','FLAT','30','52380','BG'),(51,'GTEEMAREG','EUR','FLAT','30','52380','BG'),(52,'GTEEMAREG','SGD','FLAT','50','52380','BG'),(53,'GTEERECAMD','USD','FLAT','50','52380','BG'),(54,'GTEERECAMD','GBP','FLAT','50','52380','BG'),(55,'GTEERECAMD','EUR','FLAT','50','52380','BG'),(56,'GTEERECAMD','SGD','FLAT','70','52380','BG');

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `bank` varchar(45) DEFAULT NULL,
  `ibanno` varchar(45) DEFAULT NULL,
  `customeraddress` varchar(45) DEFAULT NULL,
  `bankaddress` varchar(45) DEFAULT NULL,
  `customerid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`name`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `ibanno_UNIQUE` (`ibanno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`email`,`password`,`bank`,`ibanno`,`customeraddress`,`bankaddress`,`customerid`) values (1,'GRUNDY','grundy@mail.com','grundy','ALPHABank','BE44739009830099','Rue du Cornet 6  B-4800 VERVIERS   BELGIUM','Havenlaan 2 -1080 Brussels','100266'),(2,'JOHN','john@mail.com','john','ALPHABank','BE44759807833089','Du Cornet 6  D-4800 PERVIERS   BELGIUM','Havenlaan 2 -1080 Brussels','100600'),(3,'HENDERSON','henderson@mail.com','henderson','BETABank','DE89370400440532013000','Schulstrasse 4 32547 Bad Oyenhausen GERMANY','Rathausstrae 1, 04416 Markkleeberg, Germany','100111'),(4,'LILLIANE','lilliane@mail.com','lilliane','BETABank','DE89370401450532013837','Schorbachstrasse 9,Postfach,Butzbach,GERMANY','Rathausstrae 1, 04416 Markkleeberg, Germany','100333');

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `T24LCOpenCall` enum('TRUE','FALSE') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `settings` */

insert  into `settings`(`T24LCOpenCall`) values ('FALSE');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
