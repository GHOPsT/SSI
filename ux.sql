-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ux
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.38-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'accion'),(2,'aventura'),(3,'estrategia'),(4,'deportes'),(5,'rpg'),(6,'simulacion'),(7,'shooter');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle`
--

DROP TABLE IF EXISTS `detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle` (
  `detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) DEFAULT NULL,
  `juego_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`detalle_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `juego_id` (`juego_id`),
  CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`pedido_id`),
  CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle`
--

LOCK TABLES `detalle` WRITE;
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` VALUES (1,1,1,3),(2,1,4,1),(3,1,7,2),(4,2,21,1),(5,2,5,1),(6,2,3,1),(7,2,1,1),(8,2,16,1),(9,3,5,1),(10,3,6,2),(11,4,19,1),(12,4,20,1),(13,4,1,1),(14,4,19,1),(15,4,20,1),(16,4,1,1),(17,4,8,1),(18,4,5,1),(19,4,6,3),(20,4,7,1),(21,5,1,1),(22,5,10,1),(23,5,16,1),(24,5,6,1);
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `estado_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  PRIMARY KEY (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'NUEVO'),(2,'USADO');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `juego_id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `estado_id` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`juego_id`),
  KEY `categoria_id` (`categoria_id`),
  KEY `estado_id` (`estado_id`),
  CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`),
  CONSTRAINT `juegos_ibfk_2` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'Elden-Ring.png','Juego de rol de acción desarrollado por FromSoftware en colaboración con George R. R. Martin. Disponible: PS5',120.00,'2022-05-02',2,10,1,'2024-07-04 20:13:30'),(3,'Final-Fantasy-VII.png','Remake del clásico RPG de 1997, desarrollado por Square Enix. Disponible: PS5',225.00,'2022-05-02',3,10,2,'2024-07-04 20:15:52'),(4,'The-Outer-Worlds.png','RPG de ciencia ficción desarrollado por Obsidian Entertainment. Disponible: PS4',75.00,'2022-05-02',5,10,1,'2024-07-04 20:16:53'),(5,'The-Outer-Worlds.png','RPG de ciencia ficción desarrollado por Obsidian Entertainment. Disponible: PS4',75.00,'2022-05-02',5,10,2,'2024-07-04 20:16:57'),(6,'The-Legend-Of-Zelda-Breathe-Of-The-Wild.png','Juego de acción y aventuras en un mundo abierto, desarrollado por Nintendo. Disponible: Nintendo Switch',169.00,'2022-05-02',3,10,2,'2024-07-04 20:17:54'),(7,'The-Legend-Of-Zelda-Breathe-Of-The-Wild.png','Juego de acción y aventuras en un mundo abierto, desarrollado por Nintendo. Disponible: Nintendo Switch',169.00,'2022-05-02',3,10,1,'2024-07-04 20:17:58'),(8,'Hogwarts-Legacy.png','RPG de acción ambientado en el universo de Harry Potter, desarrollado por Portkey Games. Disponible: PS5',269.00,'2022-02-05',5,15,1,'2024-07-04 20:19:09'),(9,'Hogwarts-Legacy.png','RPG de acción ambientado en el universo de Harry Potter, desarrollado por Portkey Games. Disponible: PS5',269.00,'2022-02-05',5,15,2,'2024-07-04 20:19:12'),(10,'Pokemon-Sword.png','Juego de rol desarrollado por Game Freak, ambientado en la nueva región de Galar. Disponible: Nintendo Switch',139.00,'2022-02-05',2,10,1,'2024-07-04 20:23:26'),(11,'Pokemon-Sword.png','Juego de rol desarrollado por Game Freak, ambientado en la nueva región de Galar. Disponible: Nintendo Switch',139.00,'2022-02-05',2,5,2,'2024-07-04 20:23:33'),(12,'Return-To-The-Monkey-Island.jpg','Continuación de la clásica serie de aventuras gráficas, desarrollado por Terrible Toybox. Disponible: Nintendo Switch',120.00,'2020-02-05',2,5,2,'2024-07-04 20:25:06'),(13,'Forza-Horizon-5.png','Juego de carreras en mundo abierto desarrollado por Playground Games. Disponible: Xbox Series X/S',100.00,'2020-02-05',2,5,1,'2024-07-04 20:26:01'),(14,'Forza-Horizon-5.png','Juego de carreras en mundo abierto desarrollado por Playground Games. Disponible: Xbox Series X/S',80.00,'2020-02-05',2,5,2,'2024-07-04 20:26:07'),(15,'FIFA-23.png','Simulador de fútbol desarrollado por EA Sports, con las últimas actualizaciones de equipos y jugadores. Disponible: PS5',70.00,'2020-02-05',4,5,2,'2024-07-04 20:27:50'),(16,'Monster-Hunter-World-Iceborne.png','Juego de rol de acción donde los jugadores cazan monstruos gigantes en un mundo abierto, desarrollado por Capcom. Disponible: PS4',99.99,'2020-02-05',2,13,1,'2024-07-04 20:28:54'),(18,'Death-Stranding.png','Juego de acción y aventuras desarrollado por Kojima Productions, con un enfoque en la entrega y la conexión humana. Disponible: PS4',89.99,'2020-02-05',1,13,2,'2024-07-04 20:29:35'),(19,'Death-Stranding.png','Juego de acción y aventuras desarrollado por Kojima Productions, con un enfoque en la entrega y la conexión humana. Disponible: PS4',120.00,'2020-02-05',1,13,1,'2024-07-04 20:29:49'),(20,'Resident-Evil-Village.png','Octava entrega principal de la serie Resident Evil, un survival horror desarrollado por Capcom. Disponible: PS5',150.00,'2020-02-05',1,18,1,'2024-07-04 20:30:23'),(21,'Resident-Evil-Village.png','Octava entrega principal de la serie Resident Evil, un survival horror desarrollado por Capcom. Disponible: PS5',119.99,'2020-02-05',1,13,2,'2024-07-04 20:30:31'),(22,'Persona-5-Royal.png','Juego de rol japonés desarrollado por Atlus, que sigue a un grupo de estudiantes que luchan contra la corrupción. Disponible: PS5',89.99,'2020-02-05',3,16,1,'2024-07-04 20:32:33'),(23,'Persona-5-Royal.png','Juego de rol japonés desarrollado por Atlus, que sigue a un grupo de estudiantes que luchan contra la corrupción. Disponible: PS5',59.00,'2020-02-05',3,13,2,'2024-07-04 20:32:46'),(24,'Bloodborne.png','Juego de rol de acción desarrollado por FromSoftware, ambientado en una ciudad gótica plagada de monstruos. Disponible: PS4',99.99,'2020-02-05',2,25,1,'2024-07-04 20:34:04'),(25,'Bloodborne.png','Juego de rol de acción desarrollado por FromSoftware, ambientado en una ciudad gótica plagada de monstruos. Disponible: PS4',59.99,'2020-02-05',2,13,2,'2024-07-04 20:34:13'),(26,'Doom-Eternal.png','Secuela del reboot de Doom de 2016, un frenético shooter en primera persona desarrollado por id Software. Disponible: PS4',120.99,'2020-02-05',7,99,1,'2024-07-04 20:36:00'),(27,'Doom-Eternal.png','Secuela del reboot de Doom de 2016, un frenético shooter en primera persona desarrollado por id Software. Disponible: PS4',99.99,'2020-02-05',7,99,2,'2024-07-04 20:36:08'),(40,'Pokemon-Sword.png','qweasd',123.00,'1212-12-12',2,1,1,'2024-07-04 20:54:03'),(41,'The-Outer-Worlds.png','qweasd',123.00,'1221-12-12',3,1,2,'2024-07-04 23:58:33');
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `pedido_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pedido_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,'2024-07-04 20:22:24'),(2,1,'2024-07-04 20:55:31'),(3,1,'2024-07-04 20:56:27'),(4,1,'2024-07-04 23:35:44'),(5,3,'2024-07-04 23:54:31');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(25) NOT NULL,
  `contrasena` varchar(25) NOT NULL,
  `correo` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin','admin','admin','2024-07-04 20:19:41'),(2,'admin2','admin2','admin2','admin2','2024-07-04 23:45:36'),(3,'admin3','admin3','admin3','admin3','2024-07-04 23:52:29'),(4,'','admin','admin','','2024-07-05 00:09:44');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-07 13:48:52
