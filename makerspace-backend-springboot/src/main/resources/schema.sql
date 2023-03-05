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
  `service_id` INT NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(100) NOT NULL,
  `service_type` INT(1) NOT NULL,
  `description` VARCHAR(40) NULL,
  `status` INT(1) NOT NULL DEFAULT 1,
  `picture` BLOB NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_date` TIMESTAMP NULL,
  `end_date` TIMESTAMP NULL,
  `location` VARCHAR(100) NULL,
  `operator_id` BIGINT(8) NOT NULL,
    PRIMARY KEY (`service_id`),
    FOREIGN KEY (`operator_id`)
    REFERENCES `makerSpace_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
