/*
SQLyog Community Edition- MySQL GUI v8.02 
MySQL - 5.7.17-log : Database - applicantbank
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`applicantbank` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `applicantbank`;

/*Table structure for table `bankguarantee` */

DROP TABLE IF EXISTS `bankguarantee`;

CREATE TABLE `bankguarantee` (
  `bgReqID` varchar(45) NOT NULL,
  `issuedOnBehalfOf` varchar(45) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `dealDate` varchar(45) DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `expiryDate` varchar(45) DEFAULT NULL,
  `maturityDate` varchar(45) DEFAULT NULL,
  `beneficiaryBank` varchar(45) DEFAULT NULL,
  `beneficiary` varchar(45) DEFAULT NULL,
  `termsAndConditions` varchar(45) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`bgReqID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bankguarantee` */

/*Table structure for table `bankguaranteeamend` */

DROP TABLE IF EXISTS `bankguaranteeamend`;

CREATE TABLE `bankguaranteeamend` (
  `bgAmendId` varchar(45) NOT NULL,
  `bgAmendReqId` varchar(45) NOT NULL,
  `numberOfAmendment` int(11) NOT NULL,
  `bgAmendPrincipalAmount` int(45) NOT NULL,
  `bgAmendExpiryDate` varchar(45) NOT NULL,
  `bgTermsAndConditions` varchar(45) NOT NULL,
  `issuedOnBehalfOf` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`bgAmendReqId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bankguaranteeamend` */

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

insert  into `employee`(`id`,`NAME`,`PASSWORD`,`EMAIL`) values (1,'jacobs','jacobs','jacobs@mail.com'),(2,'williem','williem','williem@mail.com');

/*Table structure for table `letterofcredit` */

DROP TABLE IF EXISTS `letterofcredit`;

CREATE TABLE `letterofcredit` (
  `lcRequestNumber` varchar(45) NOT NULL,
  `ImportSightPmtLCType` varchar(45) DEFAULT NULL,
  `Applicant` varchar(45) DEFAULT NULL,
  `ApplicantBank` varchar(45) DEFAULT NULL,
  `Beneficiary` varchar(45) DEFAULT NULL,
  `BeneficiaryBank` varchar(45) DEFAULT NULL,
  `LCCurrency` varchar(45) DEFAULT NULL,
  `LCAmount` varchar(45) DEFAULT NULL,
  `LCIssueDate` varchar(45) DEFAULT NULL,
  `LcShipmentDate` varchar(45) DEFAULT NULL,
  `LCExpiryDate` varchar(45) DEFAULT NULL,
  `LCExpiryPlace` varchar(45) DEFAULT NULL,
  `ChargesFrom` varchar(45) DEFAULT NULL,
  `FileReference` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `documents` longblob DEFAULT NULL,
  `documentType` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`lcRequestNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `letterofcredit` */

/*Table structure for table `letterofcreditamend` */

DROP TABLE IF EXISTS `letterofcreditamend`;

CREATE TABLE `letterofcreditamend` (
  `lcAmendId` varchar(45) NOT NULL,
  `lcAmendReqId` varchar(45) NOT NULL,
  `numberOfAmendment` varchar(45) NOT NULL,
  `lcAmendAmount` double NOT NULL,
  `lcAmendAdvisingBankRef` varchar(45) DEFAULT NULL,
  `amendModeOfShipment` varchar(45) NOT NULL,
  `lcAmendExpiryDate` varchar(45) NOT NULL,
  `lcAmendExpiryPlace` varchar(45) NOT NULL,
  `amendmentDetails` varchar(45) DEFAULT NULL,
  `applicantID` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`lcAmendReqId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `letterofcreditamend` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
