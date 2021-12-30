DROP DATABASE IF EXISTS tennisapp;
CREATE DATABASE tennisapp;
ALTER DATABASE tennisapp DEFAULT CHARACTER SET UTF8 DEFAULT COLLATE UTF8_GENERAL_CI;
use tennisapp;

CREATE TABLE `user` ( 
    `email` varchar(40)  PRIMARY KEY NOT NULL, 
    `createdAt` varchar(60), 
    `updatedAt` varchar(60)
    );

CREATE TABLE `player` ( 
    `userEmail` varchar(40) PRIMARY KEY NOT NULL, 
    `points` int(4), 
    `commendmentsCount` int(4),
    `penaltyExpiration` varchar(60),
    `penaltyReason` varchar(60),
    FOREIGN KEY (`userEmail`) REFERENCES user(`email`)
    );

CREATE TABLE `secretary` ( 
    `secretaryEmail` varchar(40) PRIMARY KEY NOT NULL, 
    `clubId`  MEDIUMINT NOT NULL, 
    FOREIGN KEY (`clubId`) REFERENCES club(`id`),
    FOREIGN KEY (`secretary Email`) REFERENCES user(`email`)
    );

CREATE TABLE `club` ( 
    `id` MEDIUMINT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    `name` varchar(40) NOT NULL, 
    `long` varchar(40) NOT NULL,
    `lat` varchar(40) NOT NULL
    );

CREATE TABLE `court` ( 
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    `type` ENUM('hard','clay','grass','carpet') NOT NULL,
    `courtName`  varchar(10),
    `clubId`  MEDIUMINT NOT NULL,
    FOREIGN KEY (`clubId`) REFERENCES club(`id`));