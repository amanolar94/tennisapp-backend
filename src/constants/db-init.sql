DROP DATABASE IF EXISTS tennisapp;
CREATE DATABASE tennisapp;
ALTER DATABASE tennisapp DEFAULT CHARACTER SET UTF8 DEFAULT COLLATE UTF8_GENERAL_CI;
use tennisapp;

CREATE TABLE `user` ( 
    `email` varchar(40) NOT NULL, 
    `password` varchar(60) NOT NULL, 
    `name` varchar(40), 
    `createdAt` varchar(60), 
    `updatedAt` varchar(60),
    PRIMARY KEY (`email`)
    );

CREATE TABLE `player` ( 
    `userEmail` varchar(40) NOT NULL, 
    `profilePhoto` varchar(60), 
    `points` int(4), 
    `commendmentsCount` int(4),
    `penaltyExpiration` varchar(60),
    `penaltyReason` varchar(60),
    PRIMARY KEY (`userEmail`),
    FOREIGN KEY (`userEmail`) REFERENCES user(`email`)
    );

CREATE TABLE `resetPassword` ( 
    `userEmail` varchar(40) NOT NULL, 
    `token` varchar(200) NOT NULL, 
    PRIMARY KEY (`userEmail`,`token`),
    FOREIGN KEY (`userEmail`) REFERENCES user(`email`)
    );