-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2024 a las 07:17:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ux`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `nombre`) VALUES
(1, 'accion'),
(2, 'aventura'),
(3, 'estrategia'),
(4, 'deportes'),
(5, 'rpg'),
(6, 'simulacion'),
(7, '3D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `detalle_id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `juego_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`detalle_id`, `pedido_id`, `juego_id`, `cantidad`) VALUES
(1, 1, 6, 7),
(2, 1, 2, 4),
(3, 1, 11, 2),
(4, 2, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `estado_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`estado_id`, `nombre`) VALUES
(1, 'NUEVO'),
(3, 'USADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `juego_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `estado_id` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`juego_id`, `titulo`, `descripcion`, `precio`, `fecha_lanzamiento`, `categoria_id`, `stock`, `estado_id`, `fecha_creacion`) VALUES
(2, 'Juego2.png', 'asd', 12.00, '1212-12-12', 1, 12, 1, '2024-06-20 07:10:02'),
(3, 'Juego1.png', 'USADO', 12.00, '1221-12-12', 4, 12, 3, '2024-06-20 07:11:34'),
(4, 'Juego1.png', 'asd', 12.00, '1321-03-12', 1, 12, 3, '2024-06-20 07:30:11'),
(5, 'Juego1.png', 'asd', 12.00, '1321-03-12', 1, 12, 3, '2024-06-20 07:30:48'),
(6, 'Juego1.png', 'ASDASD', 12.00, '1212-12-12', 4, 122, 1, '2024-06-20 14:37:13'),
(7, 'asd', 'asd', 123.00, '1212-12-12', 1, 1, 1, '2024-06-22 01:01:44'),
(8, 'asd', 'asdas', 123.00, '3234-02-12', 2, 1, 1, '2024-06-22 01:09:01'),
(9, 'Captura de pantalla 2024-04-19 165922.png', 'asd', 123.00, '1212-12-12', 2, 21, 1, '2024-06-22 04:51:26'),
(10, 'Captura de pantalla 2024-04-19 165933.png', 'asd', 12.00, '1212-12-12', 1, 1, 1, '2024-06-22 04:52:31'),
(11, 'Captura de pantalla 2024-03-01 113047.png', 'asd', 12.00, '1212-12-12', 2, 1, 3, '2024-06-23 19:14:11'),
(14, 'the-last-of-us-part-ii.jpg', 'Secuela del aclamado juego de acción y supervivencia de Naughty Dog.', 210.00, '2020-06-18', 1, 5, 1, '2024-07-04 04:55:43'),
(15, 'the-last-of-us-part-ii.jpg', 'Secuela del aclamado juego de acción y supervivencia de Naughty Dog.', 190.00, '2020-06-18', 1, 3, 3, '2024-07-04 04:56:12'),
(18, '1625097376-cyberpunk-2077-ps5.jpg', 'RPG de mundo abierto de CD Projekt RED ambientado en una metrópolis futurista.', 70.00, '2020-12-10', 5, 10, 3, '2024-07-04 05:07:52'),
(19, '1625097376-cyberpunk-2077-ps5.jpg', 'RPG de mundo abierto de CD Projekt RED ambientado en una metrópolis futurista.', 100.00, '2020-12-10', 5, 5, 1, '2024-07-04 05:08:11'),
(20, '22774e7dbd2a3030e3e0c0b7381dee3e.jpg', 'Juego de acción y aventuras en un mundo abierto del Viejo Oeste, desarrollado por Rockstar Games. Disponible: PS5', 30.00, '2018-10-26', 1, 15, 1, '2024-07-04 05:11:10'),
(21, '22774e7dbd2a3030e3e0c0b7381dee3e.jpg', 'Juego de acción y aventuras en un mundo abierto del Viejo Oeste, desarrollado por Rockstar Games. Disponible: PS5', 20.00, '2018-10-26', 1, 7, 3, '2024-07-04 05:11:36'),
(22, '583f7f4ba7f952d0eb6cc16d1cd5681f.png', 'Juego de acción y aventuras ambientado en la era feudal japonesa, desarrollado por Sucker Punch Productions. ', 55.00, '2020-07-17', 1, 8, 1, '2024-07-04 05:23:06'),
(23, '583f7f4ba7f952d0eb6cc16d1cd5681f.png', 'Juego de acción y aventuras ambientado en la era feudal japonesa, desarrollado por Sucker Punch Productions. ', 32.00, '2020-07-17', 1, 4, 3, '2024-07-04 05:23:26'),
(24, 'God-of-War.png', 'Reinicio de la serie, esta vez ambientado en la mitología nórdica, desarrollado por Santa Monica Studio. Disponible: PS4', 95.00, '2018-04-20', 1, 10, 1, '2024-07-04 05:27:36'),
(25, 'God-of-War.png', 'Reinicio de la serie, esta vez ambientado en la mitología nórdica, desarrollado por Santa Monica Studio. Disponible: PS4', 75.00, '2018-04-20', 1, 6, 1, '2024-07-04 05:28:20'),
(26, 'Horizon-Zero-Down.png', 'Juego de rol de acción en un mundo postapocalíptico habitado por máquinas, desarrollado por Guerrilla Games. Disponible: PS4', 99.00, '2017-02-28', 2, 5, 1, '2024-07-04 05:35:00'),
(27, 'Horizon-Zero-Down.png', 'Juego de rol de acción en un mundo postapocalíptico habitado por máquinas, desarrollado por Guerrilla Games. Disponible: PS4', 80.00, '2017-02-28', 2, 7, 3, '2024-07-04 05:35:11'),
(28, 'Sekiro-Shadows-Die-Twice.jpg', 'Juego de acción y aventuras desarrollado por FromSoftware, ambientado en un Japón ficticio. Disponible: PS4', 149.00, '2019-03-22', 1, 5, 1, '2024-07-04 05:38:44'),
(29, 'Sekiro-Shadows-Die-Twice.jpg', 'Juego de acción y aventuras desarrollado por FromSoftware, ambientado en un Japón ficticio. Disponible: PS4', 120.00, '2019-03-22', 1, 3, 3, '2024-07-04 05:39:01'),
(33, 'The-Whitcher-III-Wild-Hunt.png', 'RPG de mundo abierto desarrollado por CD Projekt RED, basado en la serie de libros \"The Witcher\". Disponible: PS4', 95.00, '2015-05-19', 5, 5, 1, '2024-07-04 05:43:53'),
(34, 'The-Whitcher-III-Wild-Hunt.png', 'RPG de mundo abierto desarrollado por CD Projekt RED, basado en la serie de libros \"The Witcher\". Disponible: PS4', 79.00, '2015-05-19', 5, 10, 1, '2024-07-04 05:44:20'),
(35, 'Animal-Crossing-New-Horizons.png', 'Simulador de vida desarrollado por Nintendo, donde los jugadores pueden crear y gestionar una isla. Disponible: Nintendo Switch', 179.00, '2020-04-20', 6, 10, 1, '2024-07-04 05:46:46'),
(36, 'Animal-Crossing-New-Horizons.png', 'Simulador de vida desarrollado por Nintendo, donde los jugadores pueden crear y gestionar una isla. Disponible: Nintendo Switch', 160.00, '2020-04-20', 6, 8, 3, '2024-07-04 05:47:02'),
(37, 'Doom-Eternal.png', 'Secuela del reboot de Doom de 2016, un frenético shooter en primera persona desarrollado por id Software. Disponible: PS4', 135.00, '2020-04-20', 1, 6, 1, '2024-07-04 05:50:23'),
(38, 'Doom-Eternal.png', 'Secuela del reboot de Doom de 2016, un frenético shooter en primera persona desarrollado por id Software. Disponible: PS4', 119.00, '2020-04-20', 1, 5, 3, '2024-07-04 05:50:47'),
(39, 'Bloodborne.png', 'Juego de rol de acción desarrollado por FromSoftware, ambientado en una ciudad gótica plagada de monstruos. Disponible: PS4', 69.00, '2015-04-24', 1, 10, 3, '2024-07-04 05:55:32'),
(40, 'Bloodborne.png', 'Juego de rol de acción desarrollado por FromSoftware, ambientado en una ciudad gótica plagada de monstruos. Disponible: PS4', 80.00, '2015-04-24', 1, 8, 1, '2024-07-04 05:55:49'),
(41, 'Persona-5-Royal.png', 'Juego de rol japonés desarrollado por Atlus, que sigue a un grupo de estudiantes que luchan contra la corrupción. Disponible: PS5', 90.00, '2019-10-31', 5, 5, 1, '2024-07-04 06:02:34'),
(42, 'Persona-5-Royal.png', 'Juego de rol japonés desarrollado por Atlus, que sigue a un grupo de estudiantes que luchan contra la corrupción. Disponible: PS5', 79.00, '2019-10-31', 5, 10, 3, '2024-07-04 06:02:47'),
(43, 'Resident-Evil-Village.png', 'Octava entrega principal de la serie Resident Evil, un survival horror desarrollado por Capcom. Disponible: PS5', 129.00, '2021-05-07', 2, 5, 1, '2024-07-04 06:08:40'),
(44, 'Resident-Evil-Village.png', 'Octava entrega principal de la serie Resident Evil, un survival horror desarrollado por Capcom. Disponible: PS5', 109.00, '2021-05-07', 2, 8, 3, '2024-07-04 06:09:07'),
(45, 'Death-Stranding.png', 'Juego de acción y aventuras desarrollado por Kojima Productions, con un enfoque en la entrega y la conexión humana. Disponible: PS4', 189.00, '2019-11-08', 2, 8, 1, '2024-07-04 06:14:26'),
(46, 'Death-Stranding.png', 'Juego de acción y aventuras desarrollado por Kojima Productions, con un enfoque en la entrega y la conexión humana. Disponible: PS4', 169.00, '2019-11-08', 2, 5, 3, '2024-07-04 06:14:51'),
(47, 'Monster-Hunter-World-Iceborne.png', 'Juego de rol de acción donde los jugadores cazan monstruos gigantes en un mundo abierto, desarrollado por Capcom. Disponible: PS4', 129.00, '2018-01-26', 5, 9, 1, '2024-07-04 06:20:42'),
(48, 'Monster-Hunter-World-Iceborne.png', 'Juego de rol de acción donde los jugadores cazan monstruos gigantes en un mundo abierto, desarrollado por Capcom. Disponible: PS4', 99.00, '2018-01-26', 5, 5, 3, '2024-07-04 06:20:54'),
(49, 'FIFA-23.png', 'Simulador de fútbol desarrollado por EA Sports, con las últimas actualizaciones de equipos y jugadores. Disponible: PS5', 179.00, '2022-09-30', 4, 10, 1, '2024-07-04 06:25:40'),
(50, 'FIFA-23.png', 'Simulador de fútbol desarrollado por EA Sports, con las últimas actualizaciones de equipos y jugadores. Disponible: PS5', 159.00, '2022-09-30', 4, 5, 3, '2024-07-04 06:25:57'),
(51, 'Forza-Horizon-5.png', 'Juego de carreras en mundo abierto desarrollado por Playground Games. Disponible: Xbox Series X/S', 29.00, '2021-11-09', 6, 10, 1, '2024-07-04 06:29:44'),
(52, 'Forza-Horizon-5.png', 'Juego de carreras en mundo abierto desarrollado por Playground Games. Disponible: Xbox Series X/S', 20.00, '2021-11-09', 6, 10, 3, '2024-07-04 06:29:55'),
(53, 'Return-To-The-Monkey-Island.jpg', 'Continuación de la clásica serie de aventuras gráficas, desarrollado por Terrible Toybox. Disponible: Nintendo Switch', 60.00, '2022-09-19', 2, 10, 3, '2024-07-04 06:32:52'),
(54, 'Return-To-The-Monkey-Island.jpg', 'Continuación de la clásica serie de aventuras gráficas, desarrollado por Terrible Toybox. Disponible: Nintendo Switch', 65.00, '2022-09-19', 2, 4, 1, '2024-07-04 06:33:12'),
(55, 'Pokemon-Sword.png', 'Juego de rol desarrollado por Game Freak, ambientado en la nueva región de Galar. Disponible: Nintendo Switch', 179.00, '2019-11-15', 3, 5, 1, '2024-07-04 06:37:40'),
(56, 'Pokemon-Sword.png', 'Juego de rol desarrollado por Game Freak, ambientado en la nueva región de Galar. Disponible: Nintendo Switch', 150.00, '2019-11-15', 3, 7, 3, '2024-07-04 06:37:52'),
(57, 'Hogwarts-Legacy.png', 'RPG de acción ambientado en el universo de Harry Potter, desarrollado por Portkey Games. Disponible: PS5', 299.00, '2023-02-10', 5, 10, 1, '2024-07-04 06:41:59'),
(58, 'Hogwarts-Legacy.png', 'RPG de acción ambientado en el universo de Harry Potter, desarrollado por Portkey Games. Disponible: PS5', 269.00, '2023-02-10', 5, 8, 3, '2024-07-04 06:42:18'),
(59, 'The-Legend-Of-Zelda-Breathe-Of-The-Wild.png', 'Juego de acción y aventuras en un mundo abierto, desarrollado por Nintendo. Disponible: Nintendo Switch', 189.00, '2017-03-03', 2, 8, 1, '2024-07-04 06:46:22'),
(60, 'The-Legend-Of-Zelda-Breathe-Of-The-Wild.png', 'Juego de acción y aventuras en un mundo abierto, desarrollado por Nintendo. Disponible: Nintendo Switch', 169.00, '2017-03-03', 2, 8, 3, '2024-07-04 06:46:33'),
(61, 'The-Outer-Worlds.png', 'RPG de ciencia ficción desarrollado por Obsidian Entertainment. Disponible: PS4', 89.00, '2019-10-25', 5, 7, 1, '2024-07-04 06:50:04'),
(62, 'The-Outer-Worlds.png', 'RPG de ciencia ficción desarrollado por Obsidian Entertainment. Disponible: PS4', 75.00, '2019-10-25', 5, 3, 3, '2024-07-04 06:50:18'),
(63, 'Final-Fantasy-VII.png', 'Remake del clásico RPG de 1997, desarrollado por Square Enix. Disponible: PS5', 245.00, '2020-04-10', 5, 7, 1, '2024-07-04 06:54:28'),
(64, 'Final-Fantasy-VII.png', 'Remake del clásico RPG de 1997, desarrollado por Square Enix. Disponible: PS5', 225.00, '2020-04-10', 5, 4, 3, '2024-07-04 06:54:38'),
(65, 'Elden-Ring.png', 'Juego de rol de acción desarrollado por FromSoftware en colaboración con George R. R. Martin. Disponible: PS5', 170.00, '2022-02-25', 5, 10, 1, '2024-07-04 06:57:18'),
(66, 'Elden-Ring.png', 'Juego de rol de acción desarrollado por FromSoftware en colaboración con George R. R. Martin. Disponible: PS5', 159.00, '2022-02-25', 5, 15, 3, '2024-07-04 06:57:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `pedido_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`pedido_id`, `usuario_id`, `fecha`) VALUES
(1, 2, '2024-06-28 20:33:33'),
(2, 2, '2024-06-28 20:34:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre_usuario` varchar(25) NOT NULL,
  `contrasena` varchar(25) NOT NULL,
  `correo` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`, `contrasena`, `correo`, `apellido`, `fecha_creacion`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', 'admin', '2024-06-16 05:27:37'),
(2, 'Sebastián', 'Sebastian', '22sevago@gmail.com', 'Vásquez ', '2024-06-17 22:54:41'),
(3, '', 'Sebastián', 'Sebastián', '', '2024-06-19 01:48:16'),
(4, 'asdasd', 'Sebastián', 'Sebastián', 'asd', '2024-06-19 03:05:17'),
(5, '', 'Sebastián', 'Sebastián', '', '2024-06-19 03:54:15'),
(6, '', 'Sebastián', 'Sebastián', '', '2024-06-19 19:17:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`detalle_id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `juego_id` (`juego_id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`estado_id`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`juego_id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`pedido_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `detalle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `estado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `juego_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`pedido_id`),
  ADD CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`juego_id`);

--
-- Filtros para la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`),
  ADD CONSTRAINT `juegos_ibfk_2` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`estado_id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
