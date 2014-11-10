DROP TABLE IF EXISTS `bms_{{alias}}`;

CREATE TABLE `bms_{{alias}}` ( 
  {{#sql}}
	`{{key}}` {{type}} {{validate}} {{ext}},
  {{/sql}}				  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;