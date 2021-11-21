DROP DATABASE IF EXISTS tennisapp;
CREATE DATABASE tennisapp;
ALTER DATABASE tennisapp DEFAULT CHARACTER SET UTF8 DEFAULT COLLATE UTF8_GENERAL_CI;
use tennisapp;

CREATE TABLE `user` ( 
    `email` varchar(40) NOT NULL, 
    `createdAt` varchar(60), 
    `updatedAt` varchar(60),
    PRIMARY KEY (`email`)
    );

CREATE TABLE `player` ( 
    `userEmail` varchar(40) NOT NULL, 
    `points` int(4), 
    `commendmentsCount` int(4),
    `penaltyExpiration` varchar(60),
    `penaltyReason` varchar(60),
    PRIMARY KEY (`userEmail`),
    FOREIGN KEY (`userEmail`) REFERENCES user(`email`)
    );

