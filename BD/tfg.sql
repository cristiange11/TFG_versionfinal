-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2021 a las 00:32:01
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `numeroExpediente` varchar(100) NOT NULL,
  `dni` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_modulo`
--

CREATE TABLE `alumno_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `id` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `nota` double NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_educativo`
--

CREATE TABLE `centro_educativo` (
  `codigoCentro` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `CP` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centro_educativo`
--

INSERT INTO `centro_educativo` (`codigoCentro`, `correo`, `telefono`, `provincia`, `nombre`, `CP`, `direccion`) VALUES
(' ', ' ', '', '', '', '', ''),
('C12', 'mateoaleman2n@hotmail.com', '955622737', 'Sevilla', 'Mateo Aleman', '41920', 'c/ Asturias'),
('C123', 'mateoalema2n@hotmail.com', '955622736', 'Sevilla', 'Picasso', '41920', 'c/ Guadalajara n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `cifEmpresa` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`cifEmpresa`, `direccion`, `nombre`, `correo`, `telefono`, `url`) VALUES
('12345', 'a', 'a', 'a', '95123', 'a'),
('G11111113', 'Calle Asturias nº140', 'García Espino, Cristian', 'sadjhk@hotmail.com', '956891241', 'https://www.amazon.es/Monitores-reacondicionado/s?k=Monitores+reacondicionado'),
('K11111111', 'Calle Asturias nº140', 'García Espino, Cristian', 'wqweq@hotmail.com', '955899812', 'https://drive.google.com/drive/u/0/my-drive'),
('K12345678', 'JKSDAJK', 'SJKJSDK', 'sjajksd@hotmail.com', '955433451', 'https://stackoverflow.com/questions/37376152/session-storage-number-variable-stored-as-string');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_fpdual`
--

CREATE TABLE `empresa_fpdual` (
  `idFp` int(11) NOT NULL,
  `CifEmpresa` varchar(100) NOT NULL,
  `becas` tinyint(1) NOT NULL,
  `plazas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `resultado` varchar(100) DEFAULT NULL,
  `codigoModulo` int(11) NOT NULL,
  `dniAlumno` varchar(9) NOT NULL,
  `dniTutorEmpresa` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fp_duales`
--

CREATE TABLE `fp_duales` (
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `totalPlazas` int(11) NOT NULL,
  `anio` year(4) NOT NULL,
  `codigoCentro` varchar(100) NOT NULL,
  `plazasDisponibles` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fp_duales`
--

INSERT INTO `fp_duales` (`nombre`, `descripcion`, `totalPlazas`, `anio`, `codigoCentro`, `plazasDisponibles`, `id`) VALUES
('TRANSPORTE Y LOGUÍSTICA', 'Holaaa', 28, 2021, 'C12', 27, 1),
('prueba', 'prueba', 0, 2021, 'C12', 0, 16),
('prueba23', 'prueba2223', 2, 2021, 'C123', 1, 17),
('prueeeba', 'prueba', 21, 2021, 'C12', 20, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `codigoError` varchar(100) DEFAULT NULL,
  `mensaje` varchar(100) NOT NULL,
  `usuario` varchar(9) NOT NULL,
  `fechaHoraLog` datetime NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `codigoError`, `mensaje`, `usuario`, `fechaHoraLog`, `tipo`) VALUES
(128, NULL, 'Se ha añadido profesor con DNI 99999999A ', '12345678A', '2021-07-22 18:53:27', 'profesor'),
(129, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 11:22:47', 'user'),
(130, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 11:22:49', 'user'),
(131, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 11:23:09', 'user'),
(132, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:10:35', 'user'),
(133, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:10:43', 'user'),
(134, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:10:52', 'user'),
(135, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:11:09', 'user'),
(136, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:12:24', 'user'),
(137, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:12:30', 'user'),
(138, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:12:47', 'user'),
(139, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:12:51', 'user'),
(140, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:13:47', 'user'),
(141, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:13:55', 'user'),
(142, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:14:00', 'user'),
(143, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:14:11', 'user'),
(144, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:15:01', 'user'),
(145, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:15:17', 'user'),
(146, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 13:15:43', 'user'),
(147, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 14:43:56', 'user'),
(148, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 16:18:08', 'user'),
(149, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:24', 'profesor'),
(150, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:24', 'profesor'),
(151, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:26', 'profesor'),
(152, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:27', 'profesor'),
(153, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:27', 'profesor'),
(154, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:27', 'profesor'),
(155, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:27', 'profesor'),
(156, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:29:27', 'profesor'),
(157, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(158, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(159, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(160, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(161, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(162, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:31', 'profesor'),
(163, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:36', 'profesor'),
(164, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:30:37', 'profesor'),
(165, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:31:09', 'profesor'),
(166, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:31:09', 'profesor'),
(167, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:35:13', 'profesor'),
(168, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:14', 'profesor'),
(169, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:18', 'profesor'),
(170, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:20', 'profesor'),
(171, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:22', 'profesor'),
(172, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:35', 'profesor'),
(173, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:35', 'profesor'),
(174, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:35', 'profesor'),
(175, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:39:55', 'profesor'),
(176, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:40:24', 'profesor'),
(177, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:40:32', 'profesor'),
(178, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:40:44', 'profesor'),
(179, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:41:17', 'profesor'),
(180, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:42:32', 'profesor'),
(181, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:42:40', 'profesor'),
(182, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:43:06', 'profesor'),
(183, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:43:11', 'profesor'),
(184, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:43:46', 'profesor'),
(185, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:45:09', 'profesor'),
(186, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:45:10', 'profesor'),
(189, 'ERROR_DELETE_PROFESOR', 'No se ha actualizado profesor con DNI 99999999A ', '12345678A', '2021-07-23 16:53:10', 'profesor'),
(190, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:54:58', 'profesor'),
(191, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:55:21', 'profesor'),
(192, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:55:51', 'profesor'),
(193, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:57:55', 'profesor'),
(194, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:58:59', 'profesor'),
(195, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 16:59:59', 'profesor'),
(196, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 17:03:13', 'profesor'),
(197, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-23 17:03:54', 'user'),
(198, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 17:05:51', 'profesor'),
(199, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 17:05:51', 'profesor'),
(200, NULL, 'Se ha actualizado profesor con DNI \'99999999A\' ', '12345678A', '2021-07-23 17:07:37', 'profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_login`
--

CREATE TABLE `log_login` (
  `id` int(11) NOT NULL,
  `usuario` varchar(9) NOT NULL,
  `fechaHoraLog` datetime NOT NULL,
  `error` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `log_login`
--

INSERT INTO `log_login` (`id`, `usuario`, `fechaHoraLog`, `error`) VALUES
(33, '12345678A', '2021-07-20 08:51:17', 0),
(34, '12345678A', '2021-07-20 10:45:47', 0),
(35, '12345678A', '2021-07-20 14:23:21', 0),
(36, '12345678A', '2021-07-20 20:56:29', 0),
(37, '12345678A', '2021-07-21 08:44:26', 0),
(38, '12345678A', '2021-07-21 12:02:24', 0),
(39, '12345678A', '2021-07-21 13:00:38', 0),
(40, '12345678A', '2021-07-21 19:26:21', 0),
(41, '12345678A', '2021-07-21 21:16:10', 0),
(42, '12345678A', '2021-07-22 10:51:45', 0),
(43, '12345678A', '2021-07-22 18:31:57', 0),
(44, '12345678A', '2021-07-22 18:31:57', 0),
(45, '12345678A', '2021-07-23 10:23:31', 0),
(46, '12345678A', '2021-07-23 10:34:49', 0),
(47, '12345678A', '2021-07-23 10:36:56', 0),
(48, '12345678A', '2021-07-23 10:36:56', 0),
(49, '12345678A', '2021-07-23 10:37:28', 0),
(50, '12345678A', '2021-07-23 10:37:59', 1),
(51, '12345678A', '2021-07-23 10:38:07', 0),
(52, '12345678A', '2021-07-23 10:38:38', 0),
(53, '12345678A', '2021-07-23 10:41:07', 0),
(54, '12345678A', '2021-07-23 10:42:23', 0),
(55, '12345678A', '2021-07-23 10:42:23', 0),
(56, '12345678A', '2021-07-23 11:11:22', 1),
(57, '12345678A', '2021-07-23 11:11:33', 1),
(58, '12345678A', '2021-07-23 11:26:20', 1),
(59, '12345678A', '2021-07-23 11:35:42', 1),
(60, '12345678A', '2021-07-23 12:54:54', 0),
(61, '12345678A', '2021-07-23 12:56:02', 0),
(62, '12345678A', '2021-07-23 12:59:23', 0),
(63, '12345678A', '2021-07-23 13:01:53', 0),
(64, '12345678A', '2021-07-23 13:08:05', 0),
(65, '12345678A', '2021-07-23 13:11:00', 0),
(66, '12345678A', '2021-07-23 13:12:39', 0),
(67, '12345678A', '2021-07-23 13:13:38', 0),
(68, '12345678A', '2021-07-23 13:16:06', 0),
(69, '12345678A', '2021-07-23 13:16:44', 0),
(70, '12345678A', '2021-07-23 13:18:08', 0),
(71, '12345678A', '2021-07-23 13:18:59', 0),
(72, '12345678A', '2021-07-23 13:19:33', 0),
(73, '12345678A', '2021-07-23 13:20:16', 0),
(74, '12345678A', '2021-07-23 13:21:27', 0),
(75, '12345678A', '2021-07-23 13:22:35', 0),
(76, '12345678A', '2021-07-23 13:27:31', 0),
(77, '12345678A', '2021-07-23 13:27:31', 0),
(78, '12345678A', '2021-07-23 13:28:23', 0),
(79, '12345678A', '2021-07-23 13:28:45', 0),
(80, '12345678A', '2021-07-23 13:29:21', 0),
(81, '12345678A', '2021-07-23 13:30:44', 0),
(82, '12345678A', '2021-07-23 13:31:23', 0),
(83, '12345678A', '2021-07-23 13:31:55', 0),
(84, '12345678A', '2021-07-23 13:32:30', 0),
(85, '12345678A', '2021-07-23 13:33:26', 0),
(86, '12345678A', '2021-07-23 13:34:21', 0),
(87, '12345678A', '2021-07-23 14:38:23', 0),
(88, '12345678A', '2021-07-23 14:39:14', 0),
(89, '12345678A', '2021-07-23 14:40:48', 0),
(90, '12345678A', '2021-07-23 14:42:18', 0),
(91, '12345678A', '2021-07-23 14:43:40', 0),
(92, '12345678A', '2021-07-23 14:44:12', 0),
(93, '12345678A', '2021-07-23 14:45:10', 0),
(94, '12345678A', '2021-07-23 14:49:01', 0),
(95, '12345678A', '2021-07-23 14:51:13', 0),
(96, '12345678A', '2021-07-23 14:51:24', 0),
(97, '12345678A', '2021-07-23 14:52:08', 0),
(98, '12345678A', '2021-07-23 14:52:18', 0),
(99, '12345678A', '2021-07-23 14:55:37', 0),
(100, '12345678A', '2021-07-23 14:56:50', 0),
(101, '12345678A', '2021-07-23 14:57:27', 0),
(102, '12345678A', '2021-07-23 14:58:02', 0),
(103, '12345678A', '2021-07-23 14:58:40', 0),
(104, '12345678A', '2021-07-23 14:58:59', 0),
(105, '12345678A', '2021-07-23 14:59:51', 0),
(106, '12345678A', '2021-07-23 15:01:51', 0),
(107, '12345678A', '2021-07-23 15:02:51', 0),
(108, '12345678A', '2021-07-23 15:02:51', 0),
(109, '12345678A', '2021-07-23 15:11:56', 0),
(110, '12345678A', '2021-07-23 15:12:00', 0),
(111, '12345678A', '2021-07-23 15:13:39', 0),
(112, '12345678A', '2021-07-23 15:13:54', 0),
(113, '12345678A', '2021-07-23 15:14:03', 0),
(114, '12345678A', '2021-07-23 15:15:36', 0),
(115, '12345678A', '2021-07-23 15:16:23', 0),
(116, '12345678A', '2021-07-23 15:16:40', 0),
(117, '12345678A', '2021-07-23 15:16:46', 0),
(118, '12345678A', '2021-07-23 15:17:17', 0),
(119, '12345678A', '2021-07-23 15:17:30', 0),
(120, '12345678A', '2021-07-23 15:18:42', 0),
(121, '12345678A', '2021-07-23 15:18:42', 0),
(122, '12345678A', '2021-07-23 15:18:42', 0),
(123, '12345678A', '2021-07-23 15:18:53', 0),
(124, '12345678A', '2021-07-23 15:21:01', 0),
(125, '12345678A', '2021-07-23 16:09:52', 0),
(126, '12345678A', '2021-07-23 16:11:13', 0),
(127, '12345678A', '2021-07-23 16:12:05', 0),
(128, '12345678A', '2021-07-23 16:12:57', 0),
(129, '12345678A', '2021-07-23 16:17:51', 0),
(130, '12345678A', '2021-07-23 18:31:17', 1),
(131, '12345678A', '2021-07-23 18:31:23', 0),
(132, '12345678A', '2021-07-23 18:38:47', 0),
(133, '12345678A', '2021-07-23 18:39:23', 0),
(134, '12345678A', '2021-07-23 18:41:41', 0),
(135, '12345678A', '2021-07-23 18:41:41', 0),
(136, '12345678A', '2021-07-23 18:41:58', 0),
(137, '12345678A', '2021-07-23 18:44:02', 0),
(138, '12345678A', '2021-07-23 18:58:07', 0),
(139, '12345678A', '2021-07-23 18:58:50', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `curso` varchar(1) NOT NULL,
  `fpDual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`codigo`, `nombre`, `descripcion`, `curso`, `fpDual`) VALUES
(2, 'Prueba', 'Esto es una prueba2321213', '2', 16),
(9, 'prueba', 'prueba2222', '1', 16),
(10, 'prueba2', 'prueba2', '2', 16),
(11, 'prue', 'prue', '2', 16),
(12, 'ksadjksadj12', 'Holaaaa', '1', 16),
(13, 'pryeeee', 'prrrr', '2', 16),
(14, 'ooooo', 'ooooo', '1', 16),
(15, 'ooooo', 'ooooo', '1', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `dni` varchar(9) NOT NULL,
  `departamento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`dni`, `departamento`) VALUES
('99999999A', 'WQQERWASD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_modulo`
--

CREATE TABLE `profesor_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_aprendizaje`
--

CREATE TABLE `resultado_aprendizaje` (
  `id` int(11) NOT NULL,
  `codigoModulo` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `codigoRol` varchar(100) NOT NULL,
  `nombreRol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `codigoRol`, `nombreRol`) VALUES
(1, 'AD', 'Administrador'),
(2, 'AD_Centro', 'Administrador de Centro'),
(3, 'Tu', 'Tutor_empresa'),
(4, 'Pr', 'Profesor'),
(5, 'Al', 'Alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_empresa`
--

CREATE TABLE `tutor_empresa` (
  `dni` varchar(9) NOT NULL,
  `moduloEmpresa` varchar(100) NOT NULL,
  `cifEmpresa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_modulo`
--

CREATE TABLE `tutor_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `movil` varchar(11) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `cp` varchar(11) NOT NULL,
  `rol` int(11) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `fpDual` int(11) DEFAULT NULL,
  `codigoCentro` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `nombre`, `apellidos`, `correo`, `movil`, `direccion`, `password`, `genero`, `cp`, `rol`, `fechaNacimiento`, `fpDual`, `codigoCentro`) VALUES
('12345678A', 'Cristian', 'García Espino', 'cristiangarciaespino5@gmail.com', '650927663', 'Calle Asturias nº140', '$2a$12$.nirfch6VCEGrCabA.vML.Us9Z3chwfKeoyM2hpV4z2lj5LUvH4L.', 'masculino', '41920', 1, '1998-02-11', NULL, NULL),
('99999999A', 'Manuel', 'García Fernández', 'crispillo@hotmail.es', '699999999', 'pruebaaa', '$2a$12$k9Xwe/Igfu5wKT9LGxeVruQiXqM1lHemd1R6uLRkOuh.VihrkZbP6', 'masculino', '41920', 4, '1998-02-11', 1, 'C12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `numero_expediente` (`numeroExpediente`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `alumno_modulo`
--
ALTER TABLE `alumno_modulo`
  ADD PRIMARY KEY (`dni`,`codigoModulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigoModulo`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigoModulo`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `centro_educativo`
--
ALTER TABLE `centro_educativo`
  ADD PRIMARY KEY (`codigoCentro`),
  ADD UNIQUE KEY `correo` (`correo`,`telefono`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`cifEmpresa`),
  ADD UNIQUE KEY `correo` (`correo`,`telefono`);

--
-- Indices de la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD PRIMARY KEY (`idFp`,`CifEmpresa`),
  ADD KEY `nombre_fp` (`idFp`),
  ADD KEY `CIF_empresa` (`CifEmpresa`),
  ADD KEY `id_fp` (`idFp`);

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigoModulo`),
  ADD KEY `dni_alumno` (`dniAlumno`),
  ADD KEY `dni_tutor_empresa` (`dniTutorEmpresa`);

--
-- Indices de la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_centro` (`codigoCentro`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `log_login`
--
ALTER TABLE `log_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fpDual` (`fpDual`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `profesor_modulo`
--
ALTER TABLE `profesor_modulo`
  ADD PRIMARY KEY (`dni`,`codigoModulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigoModulo`);

--
-- Indices de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigoModulo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_rol` (`codigoRol`);

--
-- Indices de la tabla `tutor_empresa`
--
ALTER TABLE `tutor_empresa`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `cif_empresa` (`cifEmpresa`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `tutor_modulo`
--
ALTER TABLE `tutor_modulo`
  ADD PRIMARY KEY (`dni`,`codigoModulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigoModulo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `movil` (`movil`),
  ADD KEY `nombre_fp` (`fpDual`),
  ADD KEY `fp_dual` (`fpDual`),
  ADD KEY `rol` (`rol`),
  ADD KEY `codigoCentro` (`codigoCentro`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT de la tabla `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_modulo`
--
ALTER TABLE `alumno_modulo`
  ADD CONSTRAINT `alumno_modulo_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumno_modulo_ibfk_2` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD CONSTRAINT `empresa_fpdual_ibfk_3` FOREIGN KEY (`CifEmpresa`) REFERENCES `empresa` (`cifEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_fpdual_ibfk_4` FOREIGN KEY (`idFp`) REFERENCES `fp_duales` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`dniAlumno`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_3` FOREIGN KEY (`dniTutorEmpresa`) REFERENCES `tutor_empresa` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  ADD CONSTRAINT `fp_duales_ibfk_1` FOREIGN KEY (`codigoCentro`) REFERENCES `centro_educativo` (`codigoCentro`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_login`
--
ALTER TABLE `log_login`
  ADD CONSTRAINT `log_login_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD CONSTRAINT `modulo_ibfk_1` FOREIGN KEY (`fpDual`) REFERENCES `fp_duales` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_modulo`
--
ALTER TABLE `profesor_modulo`
  ADD CONSTRAINT `profesor_modulo_ibfk_1` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesor_modulo_ibfk_2` FOREIGN KEY (`dni`) REFERENCES `profesor` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD CONSTRAINT `resultado_aprendizaje_ibfk_1` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tutor_empresa`
--
ALTER TABLE `tutor_empresa`
  ADD CONSTRAINT `tutor_empresa_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tutor_empresa_ibfk_2` FOREIGN KEY (`cifEmpresa`) REFERENCES `empresa` (`cifEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tutor_modulo`
--
ALTER TABLE `tutor_modulo`
  ADD CONSTRAINT `tutor_modulo_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `tutor_empresa` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tutor_modulo_ibfk_2` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`rol`) REFERENCES `rol` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`fpDual`) REFERENCES `fp_duales` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_5` FOREIGN KEY (`codigoCentro`) REFERENCES `centro_educativo` (`codigoCentro`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
