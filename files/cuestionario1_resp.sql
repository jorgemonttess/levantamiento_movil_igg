# Host: localhost  (Version 5.0.45-community-nt-log)
# Date: 2020-04-28 17:46:20
# Generator: MySQL-Front 6.0  (Build 1.37)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "cuestionario1_resp"
#

CREATE TABLE `cuestionario1_resp` (
  `id_reg` int(11) NOT NULL auto_increment,
  `fecha` date default NULL,
  `hora` time default NULL,
  `id_usuario` varchar(255) default NULL,
  `nom_usuario` varchar(255) default NULL,
  `id_cliente` varchar(50) default NULL,
  `nombre` varchar(255) default NULL,
  `territorio` varchar(255) default NULL,
  `celular` varchar(255) default NULL,
  `mail` varchar(255) default NULL,
  `comentarios` varchar(255) default NULL,
  `preg1` varchar(255) default NULL,
  `preg5` varchar(255) default NULL,
  `preg5_1_1` varchar(255) default NULL,
  `preg5_1_2` varchar(255) default NULL,
  `preg5_1_3` varchar(255) default NULL,
  `preg5_1_4` varchar(255) default NULL,
  `preg5_1_5` varchar(255) default NULL,
  `preg5_1_6` varchar(255) default NULL,
  `preg5_1_7` varchar(255) default NULL,
  `preg5_2` varchar(255) default NULL,
  `preg5_3` varchar(255) default NULL,
  `preg5_4` varchar(255) default NULL,
  `preg5_5` varchar(255) default NULL,
  `preg6` varchar(255) default NULL,
  `preg6_1` varchar(255) default NULL,
  `preg7` varchar(255) default NULL,
  `preg7_1` varchar(255) default NULL,
  `preg7_2` varchar(255) default NULL,
  `preg7_3` varchar(255) default NULL,
  `preg7_4` varchar(255) default NULL,
  `preg8` varchar(255) default NULL,
  `preg9` varchar(255) default NULL,
  `preg10` varchar(255) default NULL,
  `preg11` varchar(255) default NULL,
  `preg12` varchar(255) default NULL,
  `preg13` varchar(255) default NULL,
  `preg14` varchar(255) default NULL,
  PRIMARY KEY  (`id_reg`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "cuestionario1_resp"
#

INSERT INTO `cuestionario1_resp` VALUES (1,'2020-04-24','05:41:22','954179','Jorge Ernesto Montes Espinosa','1000062','CATALINA REYES CORRAL','TERRITORIO NORTE','6561205896','','121212',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2020-04-24','05:42:42','954179','Jorge Ernesto Montes Espinosa','10000603','CLAUDIA LUZ ROMO BARRIOS','TERRITORIAL TIERRA CALIENTE','9626062697','N/A','23232','Si',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2020-04-24','06:13:12','954179','Jorge Ernesto Montes Espinosa','1000062','CATALINA REYES CORRAL','TERRITORIO NORTE','6561205896','\t\t','eqwqw','Si',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2020-04-24','06:25:08','954179','Jorge Ernesto Montes Espinosa','10000179','CLAUDIA LUCIA SOTO MARTELL','TERRITORIAL BAJIO','6441651604','\t\t','asdasdas','Si','Emergencia Médica (no relacionada con COVID 19)','','','','','','','','','','','Si',NULL,'Si','asd','Si','','','','','asd','asd','asd','asd','asd',NULL),(5,'2020-04-24','06:26:37','954179','Jorge Ernesto Montes Espinosa','10000398','CLAUDIA LUISE VEGA X','TERRITORIO NORTE','6871429852','lamo_7@hotmail.com\t\t','QWQ','Si','Me enteré de una promoción','RADIO','PANTALLAS DE BANCO','TV','FLYERS EN SUCURSAL','POR UN SMS','NOTIFICACIÓN EN LA APP DE BAZ','ME COMENTO EL EJECUTIVO','','','','Si',NULL,'Si','AD','Si','','','','','ASD','NEZA','AS','AS','ASASASA',NULL),(6,'2020-04-24','06:43:19','954119','','1212300','ALEJANDRA GONZALEZ VEGA','TERRITORIO NORTE','6647449399','\t\t','','Si','Por la situación de Salud Actual (COVID 19','','','','','','','','','','','No',NULL,'No','asafa','SI pero además utilizó recursos para otra cosa','Emergencia Personal','','asdsadasdasdaddadsasa','asda','asdad','sasa','zssaaf','safsaf','',NULL),(7,'2020-04-24','06:43:25','954119','','1212300','ALEJANDRA GONZALEZ VEGA','TERRITORIO NORTE','6647449399','\t\t','','Si','Por la situación de Salud Actual (COVID 19','','','','','','','','','','','No',NULL,'No','asafa','SI pero además utilizó recursos para otra cosa','Emergencia Personal','','asdsadasdasdaddadsasa','asda','asdad','sasa','zssaaf','safsaf','',NULL),(8,'2020-04-28','11:30:42','','','','','','','','','','','','','','','','','','02-CORTADA','wqwrewqr','','',NULL,'','','','','','','','','','','','',NULL),(9,'2020-04-28','01:28:47','954179','Jorge Ernesto Montes Espinosa','','','','','','','No','','','','','','','','','02-CORTADA','QWEQWEQW','','',NULL,'','','','','','','','','','','','',''),(10,'2020-04-28','01:29:39','954179','Jorge Ernesto Montes Espinosa','10000179','CLAUDIA LUCIA SOTO MARTELL','TERRITORIAL BAJIO','6441651604','\t\t','','No','','','','','','','','','10-BUZON','TEST','','',NULL,'','','','','','','','','','','','',''),(11,'2020-04-28','01:35:44','954179','Jorge Ernesto Montes Espinosa','','','','','','','No','','','','','','','','','','','','',NULL,'','','','','','','','','','','','01-ENCUESTA EFECTIVA','asdsadsadasdasd'),(12,'2020-04-28','01:36:55','954179','Jorge Ernesto Montes Espinosa','10000179','CLAUDIA LUCIA SOTO MARTELL','TERRITORIAL BAJIO','6441651604','\t\t','','Si','Me enteré de una promoción','RADIO','','TV','','','','ME COMENTO EL EJECUTIVO','','','','Si',NULL,'Si','Si','Si','','','','','37','Neza','','No','01-ENCUESTA EFECTIVA','Nada'),(13,'2020-04-28','01:40:41','954179','Jorge Ernesto Montes Espinosa','1000062','CATALINA REYES CORRAL','TERRITORIO NORTE','6561205896','\t\t','','Si','Pagar una Deuda','','','','','','','','','','','Si',NULL,'No','NO','Si','','','','','37','Neza','','kk','02-CORTADA','asdasdasd'),(14,'2020-04-28','01:42:07','954179','Jorge Ernesto Montes Espinosa','10018950','CLAUDIA PATRICIA NICOLAS CORTES','TERRITORIAL METRO SUR','5582313891','\t\t','','No','','','','','','','','','','','','',NULL,'','','','','','','','','','','','04-VOLVER A LLAMAR','No tiene tiempo');
