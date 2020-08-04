# Host: localhost  (Version 5.0.45-community-nt-log)
# Date: 2020-04-28 17:46:38
# Generator: MySQL-Front 6.0  (Build 1.37)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "callcenter_usuarios"
#

CREATE TABLE `callcenter_usuarios` (
  `id_reg` int(11) NOT NULL auto_increment,
  `id_usuario` varchar(255) default NULL,
  `nombre` varchar(255) default NULL,
  `ap_paterno` varchar(255) default NULL,
  `ap_materno` varchar(255) default NULL,
  `nom_completo` varchar(255) default NULL,
  `pass` varchar(255) default NULL,
  `area` varchar(255) default 'callcenter',
  `foto` varchar(255) default 'images/user.png',
  PRIMARY KEY  (`id_reg`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

#
# Data for table "callcenter_usuarios"
#

INSERT INTO `callcenter_usuarios` VALUES (1,'954179','Jorge Ernesto','Montes','Espinosa','Jorge Ernesto Montes Espinosa','1406','callcenter','images/user.png'),(2,'operador1','Luis Daniel','Renteria','Garcia','Luis Daniel Renteria Garcia','12345','callcenter','images/user.png'),(3,'operador2','Mayra','Castelan','Escobar','Mayra Castelan Escobar','12345','callcenter','images/user.png'),(4,'operador3','Vanesa Berenice','Estrada','Garcia','Vanesa Berenice Estrada Garcia','12345','callcenter','images/user.png'),(5,'operador4','Calidad1','Calidad1',NULL,'Calidad1','12345','callcenter','images/user.png'),(6,'operador5','Calidad2','Calidad2',NULL,'Calidad2','12345','callcenter','images/user.png'),(7,'operador6','Calidad3','Calidad3',NULL,'Calidad3','12345','callcenter','images/user.png'),(8,'operador7','Dnahe','Cruz','Torres','Dnahe Cruz Torres','12345','callcenter','images/user.png'),(9,'operador8','Mitzi',NULL,NULL,'Mitzi','12345','callcenter','images/user.png'),(10,'operador9','Mario','Soria','Flores','Mario Soria Flores','12345','callcenter','images/user.png'),(11,'operador10','Oscar Alan','Angeles','Rodriguez','Oscar Alan Angeles Rodriguez','12345','callcenter','images/user.png'),(12,'954124','Daniel','Altamirano','Oropeza','Daniel Altamirano Oropeza','1954','callcenter','images/user.png'),(13,'954197','Oscar Julian','Massé','Cortés','Oscar Julian Massé Cortés','Osmc0482','callcenter','images/user.png'),(14,'operador11','Bruno Fermin','Abad','Flores','Bruno Fermin Abad Flores','12345','callcenter','images/user.png'),(15,'operador12','Operador12',NULL,NULL,NULL,'12345','callcenter','images/user.png'),(16,'operador13','Operador13',NULL,NULL,NULL,'12345','callcenter','images/user.png'),(17,'operador14','Operador14',NULL,NULL,NULL,'12345','callcenter','images/user.png'),(18,'operador15','Operador15',NULL,NULL,NULL,'12345','callcenter','images/user.png'),(19,'operador16','Operador16',NULL,NULL,NULL,'12345','callcenter','images/user.png'),(20,'954119','Hugo Cesar','Moguel','Avila',NULL,'12345','callcenter','images/user.png');
