DROP TABLE IF EXISTS `bms_comment`;

CREATE TABLE `bms_comment` ( 
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL ,
	`content` text NOT NULL ,
	`createDate` datetime NOT NULL ,
	`modifyDate` datetime NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;