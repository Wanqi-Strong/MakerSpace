-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema makerSpace_db
-- -----------------------------------------------------
-- This is the db for MakerSpace tables.
CREATE SCHEMA IF NOT EXISTS `makerSpace_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `makerSpace_db` ;

-- -----------------------------------------------------
-- Table `makerSpace_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerSpace_db`.`user` (
  `user_id` bigint(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(15) COLLATE utf8_bin NOT NULL,
  `user_email` varchar(40) COLLATE utf8_bin NOT NULL,
  `user_pwd` varchar(40) COLLATE utf8_bin NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT 'active-1,inactive-0',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `makerSpace_db`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerSpace_db`.`service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type` int(1) NOT NULL COMMENT '1 means equipment, 2 means workshop, 3 means studio',
  `description` varchar(675) COLLATE utf8_bin DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1 means available, 0 means unavailable as logical deleted',
  `picture` longblob,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_date` timestamp NULL DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop start date',
  `end_date` timestamp NULL DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop end date',
  `location` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop location',
  `operator_id` bigint(8) NOT NULL,
  `service_name` varchar(40) COLLATE utf8_bin NOT NULL,
  `category` int(1) DEFAULT NULL COMMENT 'when service_type equals to 1, this attribute identify equipment category',
  `active` int(1) NOT NULL DEFAULT '1' COMMENT '1 means available for student, 0 means unavailable.',
  PRIMARY KEY (`service_id`),
  KEY `fk_user` (`operator_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`operator_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `makerSpace_db`.`record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerSpace_db`.`record` (
  `record_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `reason` varchar(125) COLLATE utf8_bin DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1 means available, 0 means unavailable as logical deleted',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `service_id` int(11) NOT NULL,
  `student_id` varchar(45) COLLATE utf8_bin NOT NULL COMMENT 'student id or staff id',
  `start_date` timestamp NULL DEFAULT NULL COMMENT 'for equipment and studio',
  `end_date` timestamp NULL DEFAULT NULL COMMENT 'for equipment and studio',
  `state` int(1) NOT NULL DEFAULT '1' COMMENT '1 means pending, 2 means in processing, 3 means complete, 4 means expired',
  `student_email` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_service` (`service_id`),
  CONSTRAINT `fk_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
