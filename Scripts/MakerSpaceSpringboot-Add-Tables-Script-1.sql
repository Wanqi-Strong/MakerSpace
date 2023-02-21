CREATE DATABASE  IF NOT EXISTS `makerspacedatabase`;
USE `makerspacedatabase`;

/* Record Entity
record_id
first_name
last_name
user_email
student_id
reason
create_date
update_date
status
*/

DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `record_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `student_id` BIGINT(20) NOT NULL,
  `reason` varchar(45) DEFAULT NULL,
  `create_date` datetime(6) NOT NULL,
  `update_date` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `record` VALUES 
(1, 'Test', 'User', 'testuser@email.com', '22222222', 'Need to finish my main project', NOW(), NOW(), 1),
(2, 'User', 'One', 'userone@email.com', '22200002', 'Need to finish my programme', NOW(), NOW(), 1),
(3, 'User', 'Two', 'usertwo@email.com', '22233333', 'Need to take pictures from a drone', NOW(), NOW(), 1);

/* Equipment Entity
equipment_id
title
description
copies
copies_available
category
img
status
*/

DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `equipment_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `copies` int(11) DEFAULT NULL,
  `copies_available` int(11) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `img` MEDIUMBLOB  DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`equipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `equipment` VALUES 
(1, '42-135cm Inca Tripod', 'Lightweight Inca tripod.', 5, 5, 'Audio & Video', NULL, 1),
(2, 'DJI Mini 2', 'DJI Mini 2', 3, 3, 'Drone', NULL, 1),
(3, 'Oculus Quest', 'All-in-one VR headset. No wires or PC required for use.', 2, 2, 'Virtual Reality', NULL, 1),
(4, 'ISKN Slate 2+ Drawing Tablet', 'Draw with your own pencils and pens thanks to the removable pencil ring', 4, 4, 'Digital Art', NULL, 1),
(5, 'Arduino Uno', 'The UNO is an entry-level board for anyone who is new to developing on the Arduino platform.', 3, 3, 'Computing', NULL, 1);


/* Checkout Entity
checkout_id
user_email
checkout_date
return_date
equipment_id
*/

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkout` (
  `checkout_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `checkout_date` varchar(45) DEFAULT NULL,
  `return_date` varchar(45) DEFAULT NULL,
  `equipment_id` BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (`checkout_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `checkout` VALUES 
 (1, 'testuser@email.com', '2023-02-20', '2022-02-21', 1),
 (2, 'testuser@email.com', '2022-05-22', '2022-06-26', 1),
 (3, 'userone@email.com', '2022-05-22', '2022-06-01', 2);