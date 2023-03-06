-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema makerSpace_db
-- -----------------------------------------------------
-- This is the db for MakerSpace tables.

-- -----------------------------------------------------
-- Schema makerSpace_db
--
-- This is the db for MakerSpace tables.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `makerSpace_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `makerSpace_db` ;

-- -----------------------------------------------------
-- Table `makerSpace_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerSpace_db`.`user` (
  `user_id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(15) NOT NULL,
  `user_email` VARCHAR(15) NOT NULL,
  `user_pwd` VARCHAR(40) NOT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` INT(1) NOT NULL DEFAULT 1 COMMENT 'active-1,inactive-0',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `makerSpace_db`.`studio`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `makerSpace_db`.`service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type` int(1) NOT NULL COMMENT '1 means equipment, 2 means workshop, 3 means studio',
  `description` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1 means available, 0 means unavailable as logical deleted',
  `picture` blob,
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
    FOREIGN KEY (`operator_id`)
    REFERENCES `makerSpace_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
