-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema makerspace_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema makerspace_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `makerspace_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `makerspace_db` ;

-- -----------------------------------------------------
-- Table `makerspace_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerspace_db`.`user` (
  `user_id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(15) NOT NULL,
  `user_email` VARCHAR(40) NOT NULL,
  `user_pwd` VARCHAR(60) NOT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` INT(1) NOT NULL DEFAULT '1' COMMENT 'active-1,inactive-0',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `makerspace_db`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerspace_db`.`services` (
  `service_id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_type` INT(1) NOT NULL COMMENT '1 means equipment, 2 means workshop, 3 means studio',
  `description` VARCHAR(675) NULL DEFAULT NULL,
  `status` INT(1) NOT NULL DEFAULT '1' COMMENT '1 means available, 0 means unavailable as logical deleted',
  `picture` LONGBLOB NULL DEFAULT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_date` TIMESTAMP NULL DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop start date',
  `end_date` TIMESTAMP NULL DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop end date',
  `location` VARCHAR(100) NULL DEFAULT NULL COMMENT 'when service_type equals to 2, this attribute identify workshop location',
  `operator_id` BIGINT(8) NOT NULL,
  `service_name` VARCHAR(40) NOT NULL,
  `category` INT(1) NULL DEFAULT NULL COMMENT 'when service_type equals to 1, this attribute identify equipment category',
  `active` INT(1) NOT NULL DEFAULT '1' COMMENT '1 means available for student, 0 means unavailable.',
  PRIMARY KEY (`service_id`),
  INDEX `fk_user` (`operator_id` ASC) VISIBLE,
  CONSTRAINT `fk_user`
    FOREIGN KEY (`operator_id`)
    REFERENCES `makerspace_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `makerspace_db`.`record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `makerspace_db`.`record` (
  `record_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `reason` VARCHAR(125) NULL DEFAULT NULL,
  `status` INT(1) NOT NULL DEFAULT '1' COMMENT '1 means available, 0 means unavailable as logical deleted',
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_email` VARCHAR(45) NOT NULL COMMENT 'student email or staff email',
  `service_id` INT(11) NOT NULL,
  `user_id` VARCHAR(45) NOT NULL COMMENT 'student id or staff id',
  `start_date` TIMESTAMP NULL DEFAULT NULL COMMENT 'for equipment and studio',
  `end_date` TIMESTAMP NULL DEFAULT NULL COMMENT 'for equipment and studio',
  `state` INT(1) NOT NULL DEFAULT '1' COMMENT '1 means pending, 2 means in processing, 3 means complete, 4 means expired',
  PRIMARY KEY (`record_id`),
  INDEX `fk_service` (`service_id` ASC) VISIBLE,
  CONSTRAINT `fk_service`
    FOREIGN KEY (`service_id`)
    REFERENCES `makerspace_db`.`services` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
