-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2021 a las 11:17:38
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

CREATE DATABASE `tfg`;

USE `tfg`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `numeroExpediente` varchar(100) NOT NULL,
  `dni` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`numeroExpediente`, `dni`) VALUES
('123123213', '12345678N'),
('COF231', '11111112A'),
('PRUEBA', '11111111A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_modulo`
--

CREATE TABLE `alumno_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno_modulo`
--

INSERT INTO `alumno_modulo` (`dni`, `codigoModulo`) VALUES
('11111111A', 25),
('11111111A', 26),
('11111112A', 24),
('11111112A', 26),
('12345678N', 24),
('12345678N', 26);

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

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`id`, `dni`, `nota`, `descripcion`, `codigoModulo`) VALUES
(16, '11111111A', 7, 'EJJEJE', 25),
(22, '11111111A', 5.7, '213213', 26),
(23, '11111112A', 5.8, '213213', 26);

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
('41000557', 'direccion@iesalandalus.com', '955 96 79 43', 'Sevilla', 'Al-Ándalus', '41600', 'Calle Dalia S/N'),
('41004113', 'info@iesvirgendelosreyes.es', '954 55 40 44', 'Sevilla', 'Virgen de los Reyes', '41014', 'Ctra. de Isla Menor, s/n'),
('41006481', 'sevilla@sopenasevilla.org', '954 42 31 55', 'Sevilla', 'Sopeña', '41003', 'Calle Juan de Vera, 2'),
('41701365', '41701365.edu@juntadeandalucia.es', '955 967 951', 'Sevilla', 'Federico García Lorca', '41540', 'CALLE CASTELAR S/N');

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
  `url` varchar(1000) NOT NULL,
  `codigoCentro` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`cifEmpresa`, `direccion`, `nombre`, `correo`, `telefono`, `url`, `codigoCentro`, `id`) VALUES
('B41600560', 'CALLE CHAPISTAS, 6 - Y 8', 'DIFRISUR SL', 'jlmanaute@hotmail.com', '955841956', 'https://los-artesanos.com/', '41000557', 74),
('B41364613', 'Recreo de Montestruque, 26  Morón de la Frontera, Sevilla', 'Mitelec Instalaciones', 'instalaciones@mitelec.es', '955853905', 'https://mitelec.es/', '41000557', 75),
('B41912023', 'Pol.Industrial “El Corbones” C/ Constructores, 2 La Puebla de Cazalla', 'BALLESTAS CHIA', 'info@ballestaschia.com', '955291092', 'https://ballestaschia.es/', '41000557', 76),
('B91295881', 'Calle María Auxiliadora, 54, Morón de la Frontera, Sevilla', 'RESIDENCIAL GERIATRICA MEDITERRANEO', 'recepcion@residenciamayores.com', '955854800', 'https://www.residenciamayores.com/', '41000557', 77),
('B21321286', 'Calle Mayo, 2, Arahal', 'El Gitanilla', '41016437.edu@juntadeandalucia.es', '955967686', 'https://www.escuelainfantilgitanilla.es/Datos-del-centro/', '41000557', 78),
('P4101100H', 'Plaza Corredera, 1, Arahal', 'Ayuntamiento de el Arahal', 'info@arahal.es', '955841033', 'http://www.arahal.es/opencms/opencms/arahal', '41000557', 79),
('B91995738', 'Avd del Jardinillo, 8 (41927) Mairena Del Aljarafe, Sevilla', 'Calaem Aljarafe Sl', 'infoleon13@ceichicle.es', '954359696', 'https://ceichicle.es/', '41006481', 80),
('B91253781', 'C. Conductor Venancio Martínez, 41701 Dos Hermanas, Sevilla', 'Centro Infantil la Cigueña S.L', 'info@escuelalaciguena.com', '955667168', 'http://escuelalaciguena.com/', '41006481', 81),
('P4101100H', 'Plaza Corredera, 1, Arahal', 'Ayuntamiento de el Arahal', 'info@arahal.es', '955841033', 'http://www.arahal.es/opencms/opencms/arahal', '41000557', 82);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_fpdual`
--

CREATE TABLE `empresa_fpdual` (
  `idFp` int(11) NOT NULL,
  `idEmpresa` int(100) NOT NULL,
  `becas` tinyint(1) NOT NULL,
  `plazas` int(11) NOT NULL,
  `dineroBeca` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa_fpdual`
--

INSERT INTO `empresa_fpdual` (`idFp`, `idEmpresa`, `becas`, `plazas`, `dineroBeca`) VALUES
(42, 74, 1, 3, '300'),
(42, 75, 0, 2, '0'),
(42, 76, 1, 4, '150'),
(42, 77, 0, 12, '0'),
(42, 82, 0, 1, '0'),
(47, 78, 1, 6, '300'),
(47, 79, 0, 4, '0'),
(48, 80, 0, 10, '0'),
(48, 81, 0, 10, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `resultado` int(11) DEFAULT NULL,
  `codigoModulo` int(11) NOT NULL,
  `dniAlumno` varchar(9) NOT NULL,
  `dniTutoroAdmin` varchar(9) NOT NULL,
  `observaciones` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuesta`
--

INSERT INTO `encuesta` (`id`, `descripcion`, `titulo`, `resultado`, `codigoModulo`, `dniAlumno`, `dniTutoroAdmin`, `observaciones`) VALUES
(17, 'Trabajo desempeñado x el alumno en la semana 1', 'semana1', 1, 24, '11111111A', '11111111T', 'El alumno no ha trabajado absolutamente nada.'),
(18, 'prueba', 'prueba', 5, 24, '11111112A', '33333333T', '12321213123'),
(29, 'prueba', 'prueba', 1, 24, '11111111A', '12345678A', '213213213');

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
('Administración y Finanzas', 'Este profesional desempeña las tareas administrativas en la gestión y el asesoramiento en las áreas laboral, comercial, contable y fiscal de las empresas', 10, 2021, '41000557', 7, 42),
('Atención a Personas en Situación de Dependecia', 'Este profesional ejerce su actividad en el sector de servicios a las personas: asistenciales, psicosociales y de apoyo a la gestión doméstica', 12, 2021, '41000557', 12, 43),
('Automatización y Robótica Industrial', 'Este profesional ejerce su actividad en empresas  relacionadas con los sistemas automáticos industriales', 21, 2021, '41004113', 21, 45),
('Automoción', 'Este profesional desarrolla su actividad en el sector de construcción y mantenimiento de vehículos', 12, 2021, '41004113', 12, 46),
('Educación Infantil', 'Este profesional desarrolla su actividad en el sector de la educación formal y no formal y en el sector de los servicios sociales de atención a la infancia.', 10, 2021, '41000557', 10, 47),
('Educación Infantil', 'Este profesional desarrolla su actividad en el sector de la educación formal y no formal y en el sector de los servicios sociales de atención a la infancia.', 20, 2021, '41006481', 20, 48),
('Estética y Belleza', 'Este profesional ejerce su actividad en empresas que tienen relación directa con la imagen personal, particularmente en establecimientos del sector servicios de estética', 23, 2021, '41006481', 23, 50),
('Fabricación y Montaje', 'Este profesional ejerce su actividad por cuenta ajena en empresas que tienen relación directa con la imagen personal', 10, 2021, '41701365', 10, 51),
('Farmacia y Parafarmacia', 'Este profesional desarrolla su actividad en establecimientos de venta de productos farmacéuticos, parafarmacéuticos', 18, 2021, '41006481', 18, 52),
('Servicios Administrativos', 'Este profesional ejerce su actividad por cuenta ajena en centros, oficinas, despachos y departamentos administrativos o comerciales', 7, 2021, '41006481', 7, 53);

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
(790, NULL, 'Se ha añadido centro con codigo 41701365 ', '12345678A', '2021-07-28 22:20:14', 'centro educativo'),
(791, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:21:59', 'FP'),
(792, NULL, 'Se ha actualiza el FP 39', '12345678A', '2021-07-28 22:22:15', 'FP'),
(793, NULL, 'Se ha actualiza el FP 39', '12345678A', '2021-07-28 22:22:43', 'FP'),
(794, NULL, 'Se ha actualizado todo lo asociado al centro 41701365', '12345678A', '2021-07-28 22:22:59', 'centro educativo'),
(795, NULL, 'Se ha añadido centro con codigo 41000272 ', '12345678A', '2021-07-28 22:25:57', 'centro educativo'),
(796, NULL, 'Se ha actualizado todo lo asociado al centro 41701365', '12345678A', '2021-07-28 22:26:24', 'centro educativo'),
(797, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:28:21', 'FP'),
(798, NULL, 'Se ha actualiza el FP 40', '12345678A', '2021-07-28 22:28:57', 'FP'),
(799, NULL, 'Se ha actualiza el FP 40', '12345678A', '2021-07-28 22:29:17', 'FP'),
(800, NULL, 'Se ha actualiza el FP 40', '12345678A', '2021-07-28 22:29:44', 'FP'),
(801, NULL, 'Se ha actualiza el FP 40', '12345678A', '2021-07-28 22:29:57', 'FP'),
(802, NULL, 'Se ha añadido centro con codigo 41000557 ', '12345678A', '2021-07-28 22:33:27', 'centro educativo'),
(803, NULL, 'Se ha actualizado todo lo asociado al centro 41701365', '12345678A', '2021-07-28 22:33:48', 'centro educativo'),
(804, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:41:23', 'FP'),
(805, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:43:42', 'FP'),
(806, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:44:51', 'FP'),
(807, NULL, 'Se ha añadido centro con codigo 41006481 ', '12345678A', '2021-07-28 22:48:01', 'centro educativo'),
(808, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:48:52', 'FP'),
(809, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-07-28 22:49:08', 'centro educativo'),
(810, NULL, 'Se ha actualizado todo lo asociado al centro 41000272', '12345678A', '2021-07-28 22:49:13', 'centro educativo'),
(811, NULL, 'Se ha actualizado todo lo asociado al centro 41000272', '12345678A', '2021-07-28 22:49:13', 'centro educativo'),
(812, NULL, 'Se ha añadido centro con codigo 41004113 ', '12345678A', '2021-07-28 22:51:00', 'centro educativo'),
(813, NULL, 'Se ha actualiza el FP 40', '12345678A', '2021-07-28 22:52:54', 'FP'),
(814, NULL, 'Se ha actualiza el FP 39', '12345678A', '2021-07-28 22:53:21', 'FP'),
(815, NULL, 'Se ha actualiza el FP 39', '12345678A', '2021-07-28 22:53:34', 'FP'),
(816, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:55:11', 'FP'),
(817, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-28 22:56:45', 'FP'),
(818, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 08:54:30', 'login'),
(819, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 08:56:45', 'FP'),
(820, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 08:57:53', 'FP'),
(821, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 09:00:45', 'FP'),
(822, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 09:02:50', 'FP'),
(823, NULL, 'Se ha actualiza el FP 41', '12345678A', '2021-07-29 09:03:22', 'FP'),
(824, NULL, 'Se ha actualiza el FP 41', '12345678A', '2021-07-29 09:03:31', 'FP'),
(825, NULL, 'Se ha borrado el FP 41', '12345678A', '2021-07-29 09:13:10', 'FP'),
(826, NULL, 'Se ha borrado el FP 40', '12345678A', '2021-07-29 09:13:55', 'FP'),
(827, NULL, 'Se ha borrado el FP 39', '12345678A', '2021-07-29 09:13:57', 'FP'),
(828, NULL, 'Se ha borrado el FP 49', '12345678A', '2021-07-29 09:14:17', 'FP'),
(829, NULL, 'Se ha borrado el FP 44', '12345678A', '2021-07-29 09:15:15', 'FP'),
(830, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 09:16:53', 'FP'),
(831, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 09:18:26', 'FP'),
(832, NULL, 'Se ha actualiza el FP 50', '12345678A', '2021-07-29 09:31:06', 'FP'),
(833, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 09:44:55', 'FP'),
(834, NULL, 'Se ha eliminado el centro', '12345678A', '2021-07-29 09:45:42', 'centro educativo'),
(835, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-07-29 10:30:30', 'empresa'),
(836, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-07-29 10:32:10', 'empresa'),
(837, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-07-29 10:33:30', 'empresa'),
(838, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-07-29 10:40:07', 'empresa'),
(839, NULL, 'Se ha añadido empresa con CIF B41912023 ', '12345678A', '2021-07-29 10:49:07', 'empresa'),
(840, NULL, 'Se ha actualiza el FP 42', '12345678A', '2021-07-29 10:49:29', 'FP'),
(841, NULL, 'Se ha añadido empresa con CIF B41364613 ', '12345678A', '2021-07-29 10:52:36', 'empresa'),
(842, NULL, 'Se ha actualiza el FP 43', '12345678A', '2021-07-29 10:53:56', 'FP'),
(843, NULL, 'Se ha añadido empresa con CIF B91295881 ', '12345678A', '2021-07-29 10:56:29', 'empresa'),
(844, NULL, 'Se ha añadido empresa con CIF B21321286 ', '12345678A', '2021-07-29 11:04:20', 'empresa'),
(845, NULL, 'Se ha actualizado empresa con CIF B91295881 ', '12345678A', '2021-07-29 11:05:22', 'empresa'),
(846, NULL, 'Se ha añadido empresa con CIF P4101100H ', '12345678A', '2021-07-29 11:22:47', 'empresa'),
(847, NULL, 'Se ha actualizado empresa con CIF B41912023 ', '12345678A', '2021-07-29 11:49:37', 'empresa'),
(848, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41912023', '12345678A', '2021-07-29 11:58:55', 'empresa'),
(849, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41912023', '12345678A', '2021-07-29 12:00:12', 'empresa'),
(850, NULL, 'Se ha actualizado empresa con CIF B41912023 ', '12345678A', '2021-07-29 12:00:39', 'empresa'),
(851, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 12:02:07', 'empresa'),
(852, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 12:02:30', 'empresa'),
(853, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 12:02:59', 'empresa'),
(854, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 12:03:45', 'empresa'),
(855, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 12:03:53', 'empresa'),
(863, NULL, 'Se ha añadido usuario con DNI 11111111L ', '12345678A', '2021-07-29 12:14:19', 'user'),
(864, NULL, 'Se ha añadido profesor con DNI 11111111P ', '12345678A', '2021-07-29 12:15:03', 'profesor'),
(866, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-29 12:15:45', 'login'),
(867, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-29 12:16:04', 'login'),
(868, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 12:57:26', 'resultado aprendizaje'),
(869, NULL, 'Se ha actualizado el resultado de aprendizaje con id 9 ', '11111111P', '2021-07-29 12:57:52', 'modulo'),
(870, NULL, 'Se ha actualizado el resultado de aprendizaje con id 9 ', '11111111P', '2021-07-29 12:57:57', 'modulo'),
(871, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 12:58:39', 'resultado aprendizaje'),
(872, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 12:58:59', 'resultado aprendizaje'),
(873, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 12:59:29', 'resultado aprendizaje'),
(874, NULL, 'Se ha actualizado el resultado de aprendizaje con id 12 ', '11111111P', '2021-07-29 12:59:35', 'modulo'),
(875, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 13:08:11', 'resultado aprendizaje'),
(876, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 13:08:37', 'resultado aprendizaje'),
(877, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 13:08:37', 'resultado aprendizaje'),
(878, NULL, 'Se ha eliminado el resultado aprendizaje 15', '11111111P', '2021-07-29 13:08:41', 'resultado aprendizaje'),
(879, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 13:09:21', 'resultado aprendizaje'),
(880, NULL, 'Se ha creado el resultado aprendizaje con id undefined ', '11111111P', '2021-07-29 13:09:42', 'resultado aprendizaje'),
(881, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 13:14:04', 'login'),
(882, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-07-29 13:15:11', 'alumno'),
(883, NULL, 'Se ha añadido tutor empresa con DNI 11111111T ', '12345678A', '2021-07-29 13:16:32', 'tutor de empresa'),
(884, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-29 15:03:59', 'login'),
(885, NULL, 'Se ha actualizado usuario con DNI 11111111P ', '11111111P', '2021-07-29 16:45:08', 'user'),
(886, NULL, 'Se ha actualizado usuario con DNI 11111111P ', '11111111P', '2021-07-29 17:56:09', 'user'),
(887, NULL, 'Se ha actualizado usuario con DNI 11111111P ', '11111111P', '2021-07-29 17:59:20', 'user'),
(888, NULL, 'Se ha actualizado usuario con DNI 11111111P ', '11111111P', '2021-07-29 18:00:34', 'user'),
(889, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 18:00:43', 'login'),
(890, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-07-29 18:00:58', 'alumno'),
(891, NULL, 'Se ha actualizado usuario con DNI 11111111L ', '12345678A', '2021-07-29 18:01:54', 'user'),
(892, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-29 18:02:06', 'user'),
(893, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-29 18:02:26', 'login'),
(894, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 19:18:12', 'login'),
(895, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 19:19:06', 'login'),
(896, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 19:19:34', 'login'),
(897, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-29 19:19:44', 'login'),
(898, NULL, 'Se ha actualizado usuario con DNI 11111111P ', '11111111P', '2021-07-29 19:21:45', 'user'),
(899, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-07-29 21:49:10', 'login'),
(900, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-29 21:49:16', 'login'),
(901, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-07-29 21:49:23', 'centro educativo'),
(902, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-07-29 21:49:28', 'centro educativo'),
(903, NULL, 'Se ha añadido centro con codigo ssadsads ', '12345678A', '2021-07-29 21:49:44', 'centro educativo'),
(904, NULL, 'Se ha eliminado el centro con codigoCentro ssadsads', '12345678A', '2021-07-29 21:49:48', 'centro educativo'),
(905, NULL, 'Se ha añadido FP ', '12345678A', '2021-07-29 21:50:00', 'FP'),
(906, NULL, 'Se ha borrado el FP 54', '12345678A', '2021-07-29 21:50:03', 'FP'),
(907, NULL, 'Se ha actualiza el FP 47', '12345678A', '2021-07-29 21:50:07', 'FP'),
(908, NULL, 'Se ha actualiza el FP 47', '12345678A', '2021-07-29 21:50:12', 'FP'),
(909, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-07-29 21:50:22', 'user'),
(910, NULL, 'Se ha actualizado usuario con DNI 11111111L ', '12345678A', '2021-07-29 21:50:42', 'user'),
(911, NULL, 'Se ha actualizado usuario con DNI 11111111L ', '12345678A', '2021-07-29 21:50:56', 'user'),
(912, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-29 21:51:05', 'empresa'),
(913, NULL, 'Se ha añadido empresa con CIF G11111119 ', '12345678A', '2021-07-29 21:51:51', 'empresa'),
(914, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-07-29 21:52:00', 'empresa'),
(915, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 00:00:36', 'login'),
(916, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 10:41:00', 'login'),
(917, 'ERROR_DELETE_CALIFICACION', 'No se ha borrado la calificación', '11111111P', '2021-07-30 11:51:28', 'calificacion'),
(918, 'ERROR_DELETE_CALIFICACION', 'No se ha borrado la calificación', '11111111P', '2021-07-30 11:52:17', 'calificacion'),
(919, NULL, 'Se ha borrado calificacion con id 1 ', '11111111P', '2021-07-30 11:53:45', 'calificacion'),
(920, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-30 16:41:23', 'login'),
(921, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 18:53:42', 'login'),
(922, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-30 18:55:37', 'login'),
(923, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 19:13:28', 'login'),
(924, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-30 19:14:12', 'login'),
(925, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 19:18:49', 'login'),
(926, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-30 19:40:24', 'login'),
(927, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-30 19:43:07', 'login'),
(928, NULL, 'Se ha añadido calificación del alumno 11111111A ', '11111111P', '2021-07-30 19:51:46', 'calificacion'),
(932, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 09:00:10', 'login'),
(933, NULL, 'Se ha creado la encuesta con id undefined ', '12345678A', '2021-07-31 09:25:54', 'encuesta'),
(934, NULL, 'Se ha eliminado la encuesta aprendizaje 10', '12345678A', '2021-07-31 09:27:38', 'encuesta'),
(935, NULL, 'Se ha actualizado la encuesta con id 9 ', '12345678A', '2021-07-31 09:32:50', 'encuesta'),
(937, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 09:37:53', 'login'),
(943, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 10:11:06', 'login'),
(944, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 10:11:46', 'login'),
(945, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 10:50:37', 'login'),
(946, NULL, 'Se ha añadido alumno con DNI 22222222A ', '12345678A', '2021-07-31 10:51:34', 'alumno'),
(947, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111P', '2021-07-31 11:02:34', 'login'),
(948, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 11:02:41', 'login'),
(949, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-07-31 11:04:41', 'login'),
(950, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 11:04:47', 'login'),
(951, NULL, 'Se ha actualizado el modulo con id undefined ', '12345678A', '2021-07-31 12:53:39', 'modulo'),
(952, NULL, 'Se ha actualizado el modulo con id undefined ', '12345678A', '2021-07-31 12:53:47', 'modulo'),
(953, NULL, 'Se ha añadido alumno con DNI 22222222A ', '12345678A', '2021-07-31 13:00:49', 'alumno'),
(954, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-31 15:30:52', 'empresa'),
(955, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-31 15:31:06', 'empresa'),
(956, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-31 15:32:10', 'empresa'),
(957, NULL, 'Se ha actualizado empresa con CIF B41364613 ', '12345678A', '2021-07-31 15:32:23', 'empresa'),
(958, NULL, 'Se ha actualizado empresa con CIF P4101100H ', '12345678A', '2021-07-31 15:33:02', 'empresa'),
(959, NULL, 'Se ha actualizado empresa con CIF B41912023 ', '12345678A', '2021-07-31 15:34:33', 'empresa'),
(960, NULL, 'Se ha actualizado empresa con CIF B41912023 ', '12345678A', '2021-07-31 15:34:44', 'empresa'),
(961, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 15:43:51', 'login'),
(962, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 15:44:09', 'login'),
(963, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 16:41:05', 'login'),
(964, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 16:41:22', 'login'),
(965, NULL, 'Se ha actualizado la encuesta con id 9 ', '12345678A', '2021-07-31 16:42:35', 'encuesta'),
(966, NULL, 'Se ha creado la encuesta con id undefined ', '12345678A', '2021-07-31 17:10:33', 'encuesta'),
(967, NULL, 'Se ha eliminado la encuesta aprendizaje 12', '12345678A', '2021-07-31 17:10:45', 'encuesta'),
(968, NULL, 'Se ha actualizado la encuesta con id 9 ', '12345678A', '2021-07-31 17:14:52', 'encuesta'),
(969, NULL, 'Se ha actualizado la encuesta con id 9 ', '12345678A', '2021-07-31 17:23:18', 'encuesta'),
(970, NULL, 'Se ha creado la encuesta con id undefined ', '12345678A', '2021-07-31 17:23:28', 'encuesta'),
(971, NULL, 'Se ha eliminado la encuesta aprendizaje 13', '12345678A', '2021-07-31 17:23:32', 'encuesta'),
(972, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111P', '2021-07-31 17:37:21', 'login'),
(973, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 17:37:28', 'login'),
(974, NULL, 'Se ha añadido calificación del alumno 22222222A ', '11111111P', '2021-07-31 17:42:02', 'calificacion'),
(975, NULL, 'Se ha borrado calificacion con id 3 ', '11111111P', '2021-07-31 17:42:13', 'calificacion'),
(976, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 17:47:17', 'login'),
(977, NULL, 'Se ha añadido centro con codigo 1923928921 ', '12345678A', '2021-07-31 17:59:31', 'centro educativo'),
(978, NULL, 'Se ha actualizado todo lo asociado al centro 1923928921', '12345678A', '2021-07-31 17:59:39', 'centro educativo'),
(979, NULL, 'Se ha eliminado el centro con codigoCentro 1923928921', '12345678A', '2021-07-31 17:59:43', 'centro educativo'),
(980, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-07-31 19:02:28', 'alumno'),
(981, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:22', 'login'),
(982, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:25', 'login'),
(983, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:28', 'login'),
(984, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:28', 'login'),
(985, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:29', 'login'),
(986, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:29', 'login'),
(987, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:29', 'login'),
(988, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:05:36', 'login'),
(989, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:06:20', 'login'),
(990, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 19:15:07', 'login'),
(991, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:20', 'login'),
(992, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:23', 'login'),
(993, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:23', 'login'),
(994, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:23', 'login'),
(995, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:24', 'login'),
(996, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:25', 'login'),
(997, NULL, 'Se ha logado usuario ', '11111111A', '2021-07-31 19:15:49', 'login'),
(1000, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 19:20:27', 'login'),
(1001, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 19:45:29', 'login'),
(1002, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 10:59:12', 'login'),
(1003, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 11:45:18', 'login'),
(1004, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-01 11:45:34', 'login'),
(1005, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 11:46:32', 'login'),
(1006, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 11:46:43', 'login'),
(1007, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-01 11:46:54', 'user'),
(1008, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 15:51:30', 'login'),
(1009, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 16:44:04', 'login'),
(1010, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 16:54:19', 'login'),
(1031, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:17:34', 'user'),
(1032, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:17:49', 'user'),
(1033, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-01 17:18:17', 'login'),
(1034, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:18:27', 'user'),
(1035, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:18:43', 'user'),
(1036, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:20:11', 'user'),
(1037, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:21:07', 'user'),
(1038, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:29:41', 'user'),
(1039, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:36:20', 'user'),
(1040, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:37:36', 'user'),
(1041, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:38:25', 'user'),
(1042, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:39:42', 'user'),
(1043, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 17:43:41', 'user'),
(1044, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:08:27', 'user'),
(1045, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:09:50', 'user'),
(1046, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:10:21', 'user'),
(1047, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:11:35', 'user'),
(1048, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:13:38', 'user'),
(1049, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:14:16', 'user'),
(1050, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:17:16', 'user'),
(1051, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:18:17', 'user'),
(1052, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 18:19:22', 'user'),
(1053, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 18:20:15', 'login'),
(1054, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 18:30:29', 'login'),
(1055, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 18:32:03', 'login'),
(1056, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 18:34:22', 'login'),
(1057, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 20:24:08', 'login'),
(1058, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-01 20:24:45', 'centro educativo'),
(1059, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-01 20:24:51', 'centro educativo'),
(1060, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-01 20:26:40', 'login'),
(1061, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-01 20:28:01', 'login'),
(1062, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-01 20:28:44', 'login'),
(1063, NULL, 'Se ha creado la encuesta con título Valen ', '11111111P', '2021-08-01 20:29:22', 'encuesta'),
(1066, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-01 20:31:24', 'user'),
(1067, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-01 23:12:52', 'login'),
(1068, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-02 09:49:05', 'login'),
(1069, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-02 09:49:59', 'login'),
(1070, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-02 10:25:17', 'login'),
(1071, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-02 10:28:05', 'calificacion'),
(1072, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-02 11:33:37', 'user'),
(1073, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-02 11:33:52', 'user'),
(1074, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-02 11:34:00', 'login'),
(1075, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-02 11:34:02', 'login'),
(1076, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-02 11:34:15', 'user'),
(1077, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-03 09:23:48', 'login'),
(1078, NULL, 'Se ha creado la encuesta con título Prubea ', '12345678A', '2021-08-03 09:34:28', 'encuesta'),
(1079, NULL, 'Se ha creado la encuesta con título Prueba ', '12345678A', '2021-08-03 09:34:56', 'encuesta'),
(1080, NULL, 'Se ha actualizado profesor con DNI 11111111P ', '12345678A', '2021-08-03 09:50:18', 'profesor'),
(1081, NULL, 'Se ha actualizado tutor empresa con DNI 11111111T ', '12345678A', '2021-08-03 09:50:53', 'tutor de empresa'),
(1082, NULL, 'Se ha actualizado usuario con DNI 11111111L ', '12345678A', '2021-08-03 09:52:43', 'user'),
(1083, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-03 09:53:12', 'user'),
(1084, NULL, 'Se ha actualizado tutor empresa con DNI 11111111T ', '12345678A', '2021-08-03 09:53:43', 'tutor de empresa'),
(1085, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-03 10:13:43', 'login'),
(1086, NULL, 'Se ha actualizado la encuesta con id 15 ', '12345678A', '2021-08-03 10:32:17', 'encuesta'),
(1087, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-03 18:03:03', 'login'),
(1088, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-03 18:48:56', 'login'),
(1091, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-04 11:35:53', 'login'),
(1092, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 11:39:15', 'login'),
(1093, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-04 11:39:33', 'login'),
(1094, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 11:47:06', 'login'),
(1095, NULL, 'Se ha añadido tutor empresa con DNI 22222222T ', '12345678A', '2021-08-04 11:47:59', 'tutor de empresa'),
(1099, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 12:25:18', 'login'),
(1100, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 13:15:09', 'login'),
(1101, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-04 13:15:14', 'centro educativo'),
(1102, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-04 13:15:19', 'centro educativo'),
(1103, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-04 13:15:29', 'user'),
(1104, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 15:53:57', 'login'),
(1105, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:05:49', 'calificacion'),
(1106, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:05:51', 'calificacion'),
(1107, NULL, 'Se ha borrado calificacion con id 5 ', '12345678A', '2021-08-04 16:06:43', 'calificacion'),
(1108, NULL, 'Se ha borrado calificacion con id 6 ', '12345678A', '2021-08-04 16:06:48', 'calificacion'),
(1109, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:06:54', 'calificacion'),
(1110, NULL, 'Se ha borrado calificacion con id 7 ', '12345678A', '2021-08-04 16:09:57', 'calificacion'),
(1111, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:10:03', 'calificacion'),
(1112, NULL, 'Se ha borrado calificacion con id 8 ', '12345678A', '2021-08-04 16:11:07', 'calificacion'),
(1113, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:12:54', 'calificacion'),
(1114, NULL, 'Se ha borrado calificacion con id 9 ', '12345678A', '2021-08-04 16:16:21', 'calificacion'),
(1115, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:16:35', 'calificacion'),
(1116, NULL, 'Se ha borrado calificacion con id 10 ', '12345678A', '2021-08-04 16:19:43', 'calificacion'),
(1117, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:19:50', 'calificacion'),
(1118, NULL, 'Se ha borrado calificacion con id 11 ', '12345678A', '2021-08-04 16:20:08', 'calificacion'),
(1119, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-04 16:53:58', 'calificacion'),
(1120, NULL, 'Se ha borrado calificacion con id 12 ', '12345678A', '2021-08-04 16:54:12', 'calificacion'),
(1121, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 10:26:26', 'login'),
(1122, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:30:11', 'login'),
(1123, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:32:27', 'login'),
(1124, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:32:56', 'login'),
(1125, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:33:24', 'login'),
(1126, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:34:17', 'login'),
(1127, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 11:34:59', 'login'),
(1128, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-05 11:35:34', 'calificacion'),
(1129, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:28:33', 'calificacion'),
(1130, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 13:28:36', 'modulo'),
(1131, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:30:16', 'calificacion'),
(1132, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 13:30:19', 'modulo'),
(1133, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:30:45', 'calificacion'),
(1134, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 13:30:48', 'modulo'),
(1135, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:34:04', 'calificacion'),
(1136, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 13:34:05', 'modulo'),
(1137, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:38', 'calificacion'),
(1138, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1139, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1140, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1141, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1142, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1143, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1144, NULL, 'Se ha actualizado la calificación al alumno con DNI 22222222A ', '12345678A', '2021-08-05 13:44:45', 'calificacion'),
(1145, NULL, 'Se ha borrado calificacion con id 13 ', '12345678A', '2021-08-05 13:45:31', 'calificacion'),
(1146, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 13:45:35', 'modulo'),
(1147, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:32:00', 'calificacion'),
(1148, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:32:07', 'modulo'),
(1149, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:33:47', 'calificacion'),
(1150, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:33:50', 'modulo'),
(1151, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:34:38', 'calificacion'),
(1152, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:34:40', 'modulo'),
(1153, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:35:05', 'calificacion'),
(1154, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:35:28', 'calificacion'),
(1155, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:39:15', 'calificacion'),
(1156, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:45:30', 'calificacion'),
(1157, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:45:33', 'modulo'),
(1158, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:46:24', 'calificacion'),
(1159, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:47:56', 'calificacion'),
(1160, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:48:48', 'calificacion'),
(1161, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:49:31', 'calificacion'),
(1162, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:49:33', 'modulo'),
(1163, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:54:06', 'calificacion'),
(1164, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:54:09', 'modulo'),
(1165, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:54:42', 'calificacion'),
(1166, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:54:44', 'modulo'),
(1167, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:55:44', 'calificacion'),
(1168, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:55:46', 'modulo'),
(1169, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:56:39', 'calificacion'),
(1170, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:56:40', 'modulo'),
(1171, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:57:07', 'calificacion'),
(1172, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:57:09', 'modulo'),
(1173, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A ', '12345678A', '2021-08-05 14:58:30', 'calificacion'),
(1174, 'ERROR_UPDATE_MODULO', 'No se ha subido pdf al modulo con id undefined', '12345678A', '2021-08-05 14:58:32', 'modulo'),
(1175, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-05 16:12:55', 'login'),
(1177, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 19:24:09', 'login'),
(1178, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-05 19:24:26', 'calificacion'),
(1179, NULL, 'Se ha borrado calificacion con id 14 ', '12345678A', '2021-08-05 19:30:49', 'calificacion'),
(1180, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-08-05 20:51:51', 'alumno'),
(1181, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-05 21:14:58', 'calificacion'),
(1182, NULL, 'Se ha añadido calificación del alumno 11111111A ', '12345678A', '2021-08-05 21:24:55', 'calificacion'),
(1183, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111A', '2021-08-05 21:25:32', 'login'),
(1184, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-05 21:25:40', 'login'),
(1186, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 21:32:26', 'login'),
(1189, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 11:18:10', 'login'),
(1190, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 22222222T', '12345678A', '2021-08-06 11:18:40', 'user'),
(1191, NULL, 'Se ha borrado usuario con DNI 22222222T ', '12345678A', '2021-08-06 11:18:41', 'user'),
(1192, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111L', '12345678A', '2021-08-06 11:19:06', 'user'),
(1193, NULL, 'Se ha borrado usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:19:07', 'user'),
(1194, NULL, 'Se ha añadido usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:20:41', 'user'),
(1195, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111L', '12345678A', '2021-08-06 11:20:52', 'user'),
(1196, NULL, 'Se ha borrado usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:20:53', 'user'),
(1197, NULL, 'Se ha añadido usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:22:05', 'user'),
(1198, NULL, 'Se ha borrado usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:22:12', 'user'),
(1199, NULL, 'Se ha añadido usuario con DNI 11111111L ', '12345678A', '2021-08-06 11:23:13', 'user'),
(1200, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111L', '12345678A', '2021-08-06 11:23:19', 'user'),
(1201, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111L', '12345678A', '2021-08-06 11:23:20', 'user'),
(1202, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 11:55:31', 'login'),
(1203, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-08-06 12:03:56', 'alumno'),
(1205, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-06 12:19:09', 'login'),
(1206, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 12:19:15', 'login'),
(1207, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 12:55:08', 'login'),
(1208, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 16:18:24', 'login'),
(1209, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-06 16:54:21', 'login'),
(1210, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-06 17:04:27', 'login'),
(1211, NULL, 'Se ha logado usuario ', '11111111L', '2021-08-06 17:47:12', 'login'),
(1212, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-06 18:15:11', 'login'),
(1213, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-06 18:40:32', 'login'),
(1214, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-07 10:56:12', 'login'),
(1215, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-07 13:16:53', 'login'),
(1216, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-07 13:17:26', 'login'),
(1217, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 13:19:11', 'login'),
(1218, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-07 16:21:43', 'user'),
(1219, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 16:44:33', 'login'),
(1220, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-07 16:47:08', 'user'),
(1248, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 17:36:47', 'login'),
(1249, NULL, 'Se ha añadido centro con codigo PRUEBA ', '12345678A', '2021-08-07 17:36:57', 'centro educativo'),
(1250, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-07 17:38:45', 'user'),
(1251, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 17:38:51', 'login'),
(1252, NULL, 'Se ha añadido centro con codigo PRUEBAa ', '12345678A', '2021-08-07 17:39:09', 'centro educativo'),
(1253, NULL, 'Se ha eliminado el centro con codigoCentro PRUEBAa', '12345678A', '2021-08-07 17:39:23', 'centro educativo'),
(1254, NULL, 'Se ha logado usuario ', '11111111L', '2021-08-07 18:35:32', 'login'),
(1255, NULL, 'Se ha creado el modulo con nombre ssadsads ', '11111111L', '2021-08-07 18:59:51', 'modulo'),
(1256, NULL, 'Se ha eliminado el módulo 27', '11111111L', '2021-08-07 18:59:55', 'modulo'),
(1257, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 19:12:48', 'login'),
(1258, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 19:42:39', 'login'),
(1259, NULL, 'Se ha actualizado tutor empresa con DNI 11111111T ', '12345678A', '2021-08-07 19:43:01', 'tutor de empresa'),
(1260, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 22:47:55', 'login'),
(1261, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-07 22:48:10', 'login'),
(1262, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-07 22:52:56', 'login'),
(1263, NULL, 'Se ha añadido empresa con CIF J11111111 ', '12345678A', '2021-08-07 22:55:24', 'empresa'),
(1264, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-07 22:55:33', 'empresa'),
(1265, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-08 16:15:07', 'login'),
(1266, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-08 16:39:53', 'login'),
(1268, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-08 16:51:07', 'login'),
(1269, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-08 16:52:07', 'login'),
(1270, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111L', '2021-08-08 16:54:34', 'login'),
(1271, NULL, 'Se ha logado usuario ', '11111111L', '2021-08-08 16:54:38', 'login'),
(1272, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-08 17:01:24', 'login'),
(1273, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-08 17:18:03', 'login'),
(1274, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-08 17:51:16', 'login'),
(1275, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-08 19:56:02', 'login'),
(1276, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-08 20:09:38', 'login'),
(1277, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-09 12:23:30', 'login'),
(1278, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-09 16:42:49', 'login'),
(1279, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-09 17:09:16', 'user'),
(1280, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-09 17:10:05', 'login'),
(1281, NULL, 'Se ha borrado calificacion con id 15 ', '12345678A', '2021-08-09 17:15:36', 'calificacion'),
(1282, NULL, 'Se ha logado usuario ', '11111111L', '2021-08-09 17:17:44', 'login'),
(1283, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-09 17:18:22', 'login'),
(1284, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-09 17:20:48', 'login'),
(1286, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-09 17:24:42', 'login'),
(1287, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-09 17:26:44', 'login'),
(1288, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-10 09:00:37', 'login'),
(1289, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-10 14:33:33', 'login'),
(1290, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF K00000000', '12345678A', '2021-08-10 16:01:48', 'empresa'),
(1291, NULL, 'Se ha añadido empresa con CIF K00000000 ', '12345678A', '2021-08-10 16:02:47', 'empresa'),
(1292, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-10 16:03:05', 'empresa'),
(1293, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B21321286', '12345678A', '2021-08-10 16:43:44', 'empresa'),
(1294, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:44:51', 'empresa'),
(1295, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:48:27', 'empresa'),
(1296, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:51:28', 'empresa'),
(1297, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:52:17', 'empresa'),
(1298, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:53:24', 'empresa'),
(1299, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:54:41', 'empresa'),
(1300, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:55:17', 'empresa'),
(1301, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:55:17', 'empresa'),
(1302, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:55:32', 'empresa'),
(1303, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:55:49', 'empresa'),
(1304, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:57:47', 'empresa'),
(1305, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:57:58', 'empresa'),
(1306, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:58:08', 'empresa'),
(1307, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:58:20', 'empresa'),
(1308, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:58:20', 'empresa'),
(1309, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 16:59:31', 'empresa'),
(1310, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:00:54', 'empresa'),
(1311, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:00:54', 'empresa'),
(1312, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:01:59', 'empresa'),
(1313, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:02:01', 'empresa'),
(1314, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:02:21', 'empresa'),
(1315, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:02:44', 'empresa'),
(1316, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:02:54', 'empresa'),
(1317, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:00', 'empresa'),
(1318, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:15', 'empresa'),
(1319, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:17', 'empresa'),
(1320, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:18', 'empresa'),
(1321, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:19', 'empresa'),
(1322, 'ERROR_INSERT_EMPRESA', 'No se ha añadido empresa con CIF B41600560', '12345678A', '2021-08-10 17:03:19', 'empresa'),
(1323, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:10:09', 'empresa'),
(1324, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-10 17:13:17', 'empresa'),
(1325, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-10 17:13:24', 'empresa'),
(1326, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-10 17:16:55', 'empresa'),
(1327, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-10 17:18:17', 'empresa'),
(1328, 'ERROR_UPDATE_EMPRESA', 'No se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-10 17:18:36', 'empresa'),
(1329, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:20:45', 'empresa'),
(1330, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:20:51', 'empresa'),
(1331, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:20:51', 'empresa'),
(1332, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:21:30', 'empresa'),
(1333, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:21:47', 'empresa'),
(1334, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:21:54', 'empresa'),
(1335, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-10 17:22:29', 'empresa'),
(1336, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:42:55', 'empresa'),
(1337, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:43:37', 'empresa'),
(1338, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:44:51', 'empresa'),
(1339, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:45:30', 'empresa'),
(1340, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:48:41', 'empresa'),
(1341, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:49:02', 'empresa'),
(1342, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:49:33', 'empresa'),
(1343, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:50:14', 'empresa'),
(1344, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:53:17', 'empresa'),
(1345, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:55:13', 'empresa'),
(1346, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:55:33', 'empresa'),
(1347, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:57:33', 'empresa'),
(1348, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:57:51', 'empresa'),
(1349, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:58:38', 'empresa'),
(1350, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 17:58:55', 'empresa'),
(1351, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-10 18:01:14', 'empresa'),
(1352, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 18:01:20', 'empresa'),
(1353, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 18:01:41', 'empresa'),
(1354, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:05:46', 'empresa'),
(1355, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-10 18:05:52', 'empresa');
INSERT INTO `logs` (`id`, `codigoError`, `mensaje`, `usuario`, `fechaHoraLog`, `tipo`) VALUES
(1356, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-10 18:06:30', 'empresa'),
(1357, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:07:18', 'empresa'),
(1358, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:07:56', 'empresa'),
(1359, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-10 18:08:03', 'empresa'),
(1360, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:08:17', 'FP'),
(1361, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-10 18:08:25', 'empresa'),
(1362, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:08:44', 'empresa'),
(1363, 'ERROR_DELETE_CENTRO', 'No se ha podido eliminar el centro ', '12345678A', '2021-08-10 18:08:53', 'centro educativo'),
(1364, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:08:58', 'FP'),
(1365, 'ERROR_DELETE_FP', 'No Se ha borrado el FP 55', '12345678A', '2021-08-10 18:08:59', 'FP'),
(1366, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:09:04', 'FP'),
(1367, 'ERROR_DELETE_FP', 'No Se ha borrado el FP 55', '12345678A', '2021-08-10 18:09:04', 'FP'),
(1368, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:12:33', 'FP'),
(1369, 'ERROR_DELETE_FP', 'No Se ha borrado el FP 55', '12345678A', '2021-08-10 18:12:33', 'FP'),
(1370, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:12:48', 'FP'),
(1371, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:13:15', 'FP'),
(1372, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:13:40', 'FP'),
(1373, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:15:12', 'FP'),
(1374, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:16:47', 'FP'),
(1375, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:20:06', 'FP'),
(1376, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:21:17', 'FP'),
(1377, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:22:22', 'FP'),
(1378, 'ERROR_DELETE_FP', 'No se ha borrado el FP 55 ', '12345678A', '2021-08-10 18:22:51', 'FP'),
(1379, NULL, 'Se ha borrado el FP 55 y todo lo asociado', '12345678A', '2021-08-10 18:22:52', 'FP'),
(1380, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:23:08', 'FP'),
(1381, 'ERROR_DELETE_CENTRO', 'No se ha podido eliminar el centro ', '12345678A', '2021-08-10 18:23:30', 'centro educativo'),
(1382, NULL, 'Se ha borrado el FP 56', '12345678A', '2021-08-10 18:24:19', 'FP'),
(1383, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:25:03', 'FP'),
(1384, NULL, 'Se ha borrado el FP 57', '12345678A', '2021-08-10 18:25:06', 'FP'),
(1385, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:26:23', 'FP'),
(1386, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:26:46', 'empresa'),
(1387, 'ERROR_DELETE_FP', 'No se ha borrado el FP 58 ', '12345678A', '2021-08-10 18:26:52', 'FP'),
(1388, 'ERROR_DELETE_FP', 'No se ha borrado el FP 58 ', '12345678A', '2021-08-10 18:38:07', 'FP'),
(1389, 'ERROR_DELETE_FP', 'No se ha borrado el FP 58 ', '12345678A', '2021-08-10 18:38:54', 'FP'),
(1390, NULL, 'Se ha borrado el FP 58 y todo lo asociado', '12345678A', '2021-08-10 18:38:55', 'FP'),
(1391, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:39:08', 'FP'),
(1392, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-10 18:39:08', 'FP'),
(1393, NULL, 'Se ha borrado el FP 60', '12345678A', '2021-08-10 18:39:13', 'FP'),
(1394, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-10 18:39:34', 'empresa'),
(1395, 'ERROR_DELETE_CENTRO', 'No se ha podido eliminar el centro ', '12345678A', '2021-08-10 18:39:43', 'centro educativo'),
(1396, 'ERROR_DELETE_CENTRO', 'No se ha podido eliminar el centro ', '12345678A', '2021-08-10 18:42:03', 'centro educativo'),
(1397, NULL, 'Se ha eliminado todo lo asociado al centro ', '12345678A', '2021-08-10 18:43:14', 'centro educativo'),
(1398, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-10 21:25:00', 'login'),
(1399, 'ERROR_INSERT_TUTOR', 'No se ha añadido tutor empresa con DNI 12345555A ', '12345678A', '2021-08-10 21:38:13', 'tutor de empresa'),
(1400, 'ERROR_INSERT_TUTOR', 'No se ha añadido tutor empresa con DNI 12345555A ', '12345678A', '2021-08-10 21:38:13', 'tutor de empresa'),
(1401, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 09:04:26', 'login'),
(1402, 'ERROR_INSERT_TUTOR', 'No se ha añadido tutor empresa con DNI 11122222F ', '12345678A', '2021-08-11 09:05:03', 'tutor de empresa'),
(1403, NULL, 'Se ha añadido tutor empresa con DNI 11122222F ', '12345678A', '2021-08-11 09:05:37', 'tutor de empresa'),
(1404, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:08:53', 'user'),
(1405, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:08:54', 'user'),
(1406, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:12:49', 'user'),
(1407, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:12:50', 'user'),
(1408, NULL, 'Se ha añadido tutor empresa con DNI 88888889T ', '12345678A', '2021-08-11 09:22:24', 'tutor de empresa'),
(1409, NULL, 'Se ha actualizado tutor empresa con DNI 11122222F ', '12345678A', '2021-08-11 09:23:46', 'tutor de empresa'),
(1410, NULL, 'Se ha actualizado tutor empresa con DNI 11122222F ', '12345678A', '2021-08-11 09:24:05', 'tutor de empresa'),
(1411, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:24:19', 'user'),
(1412, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:24:20', 'user'),
(1413, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11122222F', '12345678A', '2021-08-11 09:26:34', 'user'),
(1414, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11122222F', '12345678A', '2021-08-11 09:26:34', 'user'),
(1415, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11122222F', '12345678A', '2021-08-11 09:27:25', 'user'),
(1416, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11122222F', '12345678A', '2021-08-11 09:27:26', 'user'),
(1417, NULL, 'Se ha borrado usuario con DNI 11122222F ', '12345678A', '2021-08-11 09:28:41', 'user'),
(1418, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 22222222A', '12345678A', '2021-08-11 09:28:49', 'user'),
(1419, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 22222222A', '12345678A', '2021-08-11 09:28:51', 'user'),
(1420, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 22222222A', '12345678A', '2021-08-11 09:29:47', 'user'),
(1421, NULL, 'Se ha borrado usuario con DNI 22222222A ', '12345678A', '2021-08-11 09:29:48', 'user'),
(1422, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-11 09:30:56', 'user'),
(1423, NULL, 'Se ha borrado usuario con DNI 11111111T ', '12345678A', '2021-08-11 09:30:57', 'user'),
(1424, NULL, 'Se ha actualizado tutor empresa con DNI 88888889T ', '12345678A', '2021-08-11 09:32:03', 'tutor de empresa'),
(1425, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:32:32', 'empresa'),
(1426, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-11 09:32:32', 'empresa'),
(1427, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:33:54', 'empresa'),
(1428, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-11 09:34:49', 'empresa'),
(1429, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:35:19', 'empresa'),
(1430, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:36:54', 'empresa'),
(1431, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:36:59', 'empresa'),
(1432, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:37:02', 'empresa'),
(1433, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:38:16', 'empresa'),
(1434, NULL, 'Se ha actualizado empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:38:31', 'empresa'),
(1435, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:38:37', 'empresa'),
(1436, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:39:42', 'empresa'),
(1437, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:39:46', 'empresa'),
(1438, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:40:53', 'empresa'),
(1439, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:41:08', 'empresa'),
(1440, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:42:33', 'empresa'),
(1441, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:43:08', 'empresa'),
(1442, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-11 09:44:31', 'empresa'),
(1443, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:55:55', 'empresa'),
(1444, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-11 09:56:21', 'empresa'),
(1445, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-11 09:56:24', 'empresa'),
(1446, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-11 09:56:26', 'empresa'),
(1447, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:56:33', 'empresa'),
(1448, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 09:56:56', 'empresa'),
(1449, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-11 09:57:04', 'empresa'),
(1450, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-11 09:57:46', 'user'),
(1451, NULL, 'Se ha actualizado usuario con DNI 12345678A ', '12345678A', '2021-08-11 09:57:50', 'user'),
(1452, NULL, 'Se ha añadido empresa con CIF B41600560 ', '12345678A', '2021-08-11 10:05:07', 'empresa'),
(1453, NULL, 'Se ha añadido alumno con DNI 11111112A ', '12345678A', '2021-08-11 10:07:31', 'alumno'),
(1454, NULL, 'Se ha añadido tutor empresa con DNI 22222222T ', '12345678A', '2021-08-11 10:13:40', 'tutor de empresa'),
(1455, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-11 10:13:51', 'login'),
(1456, NULL, 'Se ha logado usuario ', '11111111L', '2021-08-11 10:14:12', 'login'),
(1457, NULL, 'Se ha actualizado tutor empresa con DNI 22222222T ', '11111111L', '2021-08-11 10:14:58', 'tutor de empresa'),
(1458, NULL, 'Se ha añadido tutor empresa con DNI 33333333T ', '11111111L', '2021-08-11 10:17:03', 'tutor de empresa'),
(1459, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-11 10:17:14', 'login'),
(1460, NULL, 'Se ha añadido calificación del alumno 11111112A ', '11111111P', '2021-08-11 10:17:25', 'calificacion'),
(1461, NULL, 'Se ha actualizado el resultado de aprendizaje con id 12 ', '11111111P', '2021-08-11 10:17:37', 'modulo'),
(1462, NULL, 'Se ha eliminado el resultado aprendizaje 12', '11111111P', '2021-08-11 10:17:45', 'resultado aprendizaje'),
(1463, NULL, 'Se ha creado el resultado aprendizaje  ', '11111111P', '2021-08-11 10:17:51', 'resultado aprendizaje'),
(1464, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-11 10:18:55', 'login'),
(1465, NULL, 'Se ha creado la encuesta con título semana1 ', '11111111T', '2021-08-11 10:20:06', 'encuesta'),
(1466, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:20:21', 'encuesta'),
(1467, NULL, 'Se ha creado la encuesta con título prueba ', '11111111T', '2021-08-11 10:32:45', 'encuesta'),
(1468, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título prueba', '11111111T', '2021-08-11 10:37:10', 'encuesta'),
(1469, NULL, 'Se ha creado la encuesta con título prueba ', '11111111T', '2021-08-11 10:37:21', 'encuesta'),
(1470, NULL, 'Se ha creado la encuesta con título prueba ', '11111111T', '2021-08-11 10:39:13', 'encuesta'),
(1471, NULL, 'Se ha creado la encuesta con título 21213213 ', '11111111T', '2021-08-11 10:39:20', 'encuesta'),
(1472, NULL, 'Se ha eliminado la encuesta aprendizaje 21', '11111111T', '2021-08-11 10:39:51', 'encuesta'),
(1473, NULL, 'Se ha eliminado la encuesta aprendizaje 20', '11111111T', '2021-08-11 10:39:53', 'encuesta'),
(1474, NULL, 'Se ha eliminado la encuesta aprendizaje 19', '11111111T', '2021-08-11 10:39:56', 'encuesta'),
(1475, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:40:17', 'encuesta'),
(1476, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:40:35', 'encuesta'),
(1477, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111T', '2021-08-11 10:51:03', 'login'),
(1478, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-11 10:51:09', 'login'),
(1479, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:53:21', 'encuesta'),
(1480, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:53:25', 'encuesta'),
(1481, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:53:28', 'encuesta'),
(1482, NULL, 'Se ha actualizado la encuesta con id 17 ', '11111111T', '2021-08-11 10:53:32', 'encuesta'),
(1483, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 11:30:20', 'login'),
(1484, NULL, 'Se ha añadido tutor empresa con DNI 88888884M ', '12345678A', '2021-08-11 11:31:48', 'tutor de empresa'),
(1485, 'ERROR_INSERT_TUTOR', 'No se ha añadido tutor empresa con DNI 88888884M ', '12345678A', '2021-08-11 11:31:48', 'tutor de empresa'),
(1486, NULL, 'Se ha añadido tutor empresa con DNI 88888884M ', '12345678A', '2021-08-11 11:32:07', 'tutor de empresa'),
(1487, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 12:11:57', 'login'),
(1488, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-11 15:12:44', 'login'),
(1489, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 16:35:11', 'login'),
(1490, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 18:31:17', 'login'),
(1491, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-11 20:46:33', 'user'),
(1492, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 20:50:29', 'login'),
(1493, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-11 22:40:29', 'login'),
(1494, NULL, 'Se ha actualizado tutor empresa con DNI 33333333T ', '12345678A', '2021-08-11 22:41:00', 'tutor de empresa'),
(1495, NULL, 'Se ha actualizado tutor empresa con DNI 33333333T ', '12345678A', '2021-08-11 22:41:00', 'tutor de empresa'),
(1496, NULL, 'El usuario con DNI 12345678A ha actualizado su contraseña ', '12345678A', '2021-08-12 15:25:03', 'user'),
(1497, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-12 15:30:46', 'login'),
(1498, 'ERROR_INSERT_USER', 'No se ha añadido el user con DNI 88777777T', '12345678A', '2021-08-12 15:33:11', 'user'),
(1499, NULL, 'Se ha añadido usuario con DNI \'88777777T\' ', '12345678A', '2021-08-12 15:34:19', 'user'),
(1500, NULL, 'Se ha añadido tutor empresa con DNI \'88777777P\' ', '12345678A', '2021-08-12 15:51:16', 'tutor de empresa'),
(1501, NULL, 'Se ha actualizado empresa con CIF \'B41600560\' ', '12345678A', '2021-08-12 18:31:31', 'empresa'),
(1502, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 20:45:20', 'empresa'),
(1503, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 20:48:16', 'empresa'),
(1504, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 20:50:48', 'empresa'),
(1505, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 20:54:38', 'empresa'),
(1506, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 20:55:18', 'empresa'),
(1507, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 21:05:01', 'empresa'),
(1508, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 21:06:54', 'empresa'),
(1509, NULL, 'Se ha actualizado empresa con CIF \'B41600560\' ', '12345678A', '2021-08-12 21:15:55', 'empresa'),
(1510, NULL, 'Se ha añadido empresa con CIF NULL ', '12345678A', '2021-08-12 21:26:17', 'empresa'),
(1511, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-12 21:55:59', 'login'),
(1512, NULL, 'Se ha añadido alumno con DNI \'11111111A\' ', '12345678A', '2021-08-12 23:17:03', 'alumno'),
(1513, 'ERROR_INSERT_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-12 23:18:10', 'alumno'),
(1514, 'ERROR_INSERT_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-12 23:18:13', 'alumno'),
(1515, 'ERROR_INSERT_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-12 23:19:39', 'alumno'),
(1516, 'ERROR_INSERT_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-12 23:20:13', 'alumno'),
(1517, NULL, 'Se ha actualizado alumno con DNI \'11111111A\' ', '12345678A', '2021-08-12 23:21:50', 'alumno'),
(1518, NULL, '11111111', '12345678A', '2021-08-13 00:21:04', 'alumno'),
(1519, NULL, '11111111', '12345678A', '2021-08-13 00:21:04', 'alumno'),
(1520, NULL, '11111111', '12345678A', '2021-08-13 00:21:37', 'alumno'),
(1521, 'ERROR_UPDATE_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-13 00:22:21', 'alumno'),
(1522, 'ERROR_UPDATE_ALUMNO', 'No se ha actualizado el alumno con DNI \'11111111A\'', '12345678A', '2021-08-13 00:22:59', 'alumno'),
(1523, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-16 14:37:08', 'login'),
(1524, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-16 18:05:06', 'login'),
(1525, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 16:55:13', 'login'),
(1526, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 16:59:34', 'login'),
(1527, 'ERROR_LOGIN', 'Credenciales incorrectas ', '12345678A', '2021-08-17 17:03:09', 'login'),
(1528, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 17:03:16', 'login'),
(1529, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 17:09:51', 'login'),
(1530, 'ERROR_DELETE_CENTRO', 'No se ha borrado el centro con codigo centro \'41000557\'', '12345678A', '2021-08-17 18:52:19', 'centro educativo'),
(1531, 'ERROR_DELETE_CENTRO', 'No se ha borrado el centro con codigo centro \'41000557\'', '12345678A', '2021-08-17 18:53:04', 'centro educativo'),
(1532, 'ERROR_DELETE_CENTRO', 'No se ha borrado el centro con codigo centro \'41000557\'', '12345678A', '2021-08-17 18:56:28', 'centro educativo'),
(1533, NULL, 'Se ha actualizado usuario con DNI  \'12345678A\'', '12345678A', '2021-08-17 19:22:46', 'user'),
(1534, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 21:01:28', 'login'),
(1535, NULL, 'Se ha actualizado profesor con DNI \'11111111P\' ', '12345678A', '2021-08-17 21:32:24', 'profesor'),
(1536, NULL, 'Se ha actualizado tutor empresa con DNI \'11111111T\' ', '12345678A', '2021-08-17 21:35:32', 'tutor de empresa'),
(1537, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI \'11111111T\'', '12345678A', '2021-08-17 21:39:14', 'user'),
(1538, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI \'11111111T\'', '12345678A', '2021-08-17 21:40:49', 'user'),
(1539, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 22:10:02', 'login'),
(1540, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 22:11:46', 'login'),
(1541, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-17 22:23:47', 'login'),
(1542, NULL, 'Se ha añadido usuario con DNI \'12345677L\' ', '12345678A', '2021-08-18 00:09:06', 'user'),
(1543, 'ERROR_DELETE_FP', 'No se ha borrado el FP \'42\' ', '12345678A', '2021-08-18 00:31:55', 'FP'),
(1544, 'ERROR_DELETE_FP', 'No se ha borrado el FP \'42\' ', '12345678A', '2021-08-18 00:32:23', 'FP'),
(1545, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-18 10:50:35', 'login'),
(1546, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-18 10:53:45', 'login'),
(1547, 'ERROR_DELETE_MODULO', 'No se ha podido eliminar el módulo ', '12345678A', '2021-08-18 11:02:48', 'modulo'),
(1548, 'ERROR_DELETE_MODULO', 'No se ha podido eliminar el módulo ', '12345678A', '2021-08-18 11:03:15', 'modulo'),
(1549, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-18 11:25:20', 'login'),
(1550, NULL, 'Se ha actualizado la encuesta con id 17 ', '12345678A', '2021-08-18 11:30:41', 'encuesta'),
(1551, NULL, 'Se ha actualizado la encuesta con id 17 ', '12345678A', '2021-08-18 11:31:34', 'encuesta'),
(1552, NULL, 'Se ha actualizado la encuesta con id 17 ', '12345678A', '2021-08-18 11:32:34', 'encuesta'),
(1553, NULL, 'Se ha actualizado la calificación al alumno con DNI \'11111112A\' ', '12345678A', '2021-08-18 11:37:13', 'calificacion'),
(1554, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-18 12:48:26', 'login'),
(1555, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-19 09:23:33', 'login'),
(1556, NULL, 'Se ha actualizado usuario con DNI  12345678A', '12345678A', '2021-08-19 09:30:10', 'user'),
(1557, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-19 11:05:00', 'login'),
(1558, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-19 16:14:21', 'login'),
(1559, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 10:44:06', 'login'),
(1560, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-20 10:44:17', 'centro educativo'),
(1561, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-20 10:44:23', 'centro educativo'),
(1562, NULL, 'Se ha actualizado alumno con DNI 11111111A', '12345678A', '2021-08-20 10:44:51', 'alumno'),
(1563, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 10:49:47', 'login'),
(1564, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 15:47:41', 'login'),
(1565, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 15:55:29', 'login'),
(1566, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 15:57:22', 'login'),
(1567, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-20 15:57:47', 'login'),
(1568, 'ERROR_DELETE_CENTRO', 'No se ha borrado el centro con codigo centro 41000557', '12345678A', '2021-08-20 16:10:21', 'centro educativo'),
(1569, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-22 12:20:16', 'login'),
(1570, 'ERROR_DELETE_USER', 'No se ha borrado el usuario con DNI 11111111T', '12345678A', '2021-08-22 12:44:07', 'user'),
(1571, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título semana2', '12345678A', '2021-08-22 13:55:32', 'encuesta'),
(1572, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título semana2', '12345678A', '2021-08-22 13:55:32', 'encuesta'),
(1573, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-22 14:53:32', 'login'),
(1574, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-22 15:32:01', 'login'),
(1575, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-22 15:51:31', 'login'),
(1576, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-22 22:33:19', 'login'),
(1577, NULL, 'Se ha actualizado alumno con DNI 11111111A', '12345678A', '2021-08-22 22:33:31', 'alumno'),
(1578, NULL, 'Se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-22 22:33:53', 'empresa'),
(1579, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-22 23:20:15', 'centro educativo'),
(1580, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-22 23:21:26', 'centro educativo'),
(1581, NULL, 'Se ha actualizado alumno con DNI 11111111A', '12345678A', '2021-08-22 23:25:50', 'alumno'),
(1582, NULL, 'Se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-22 23:27:05', 'empresa'),
(1583, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111112A', '12345678A', '2021-08-22 23:30:08', 'calificacion'),
(1584, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 08:00:48', 'login'),
(1585, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-23 08:01:31', 'FP'),
(1586, NULL, 'Se ha actualizado el FP SAJDKjksdajkjkd', '12345678A', '2021-08-23 08:05:50', 'FP'),
(1587, NULL, 'Se ha actualizado el FP SAJDKjksdajkjkd', '12345678A', '2021-08-23 08:05:54', 'FP'),
(1588, NULL, 'Se ha actualizado el FP SAJDKjksdajkjkd del centro 41000557', '12345678A', '2021-08-23 08:08:22', 'FP'),
(1589, NULL, 'Se ha actualizado el FP SAJDKjksdajkjkd del centro 41000557', '12345678A', '2021-08-23 08:08:29', 'FP'),
(1590, NULL, 'Se ha actualizado el FP SAJDKjksdajkjkd del centro 41000557', '12345678A', '2021-08-23 08:09:58', 'FP'),
(1591, NULL, 'Se ha borrado el FP 61', '12345678A', '2021-08-23 08:12:08', 'FP'),
(1592, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-23 08:12:39', 'centro educativo'),
(1593, NULL, 'Se ha actualizado empresa con CIF B41600560', '12345678A', '2021-08-23 08:12:49', 'empresa'),
(1594, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro 41000557', '12345678A', '2021-08-23 08:15:00', 'empresa'),
(1595, NULL, 'Se ha actualizado empresa con CIF J11111111', '12345678A', '2021-08-23 08:15:07', 'empresa'),
(1596, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-23 08:15:18', 'empresa'),
(1597, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro 41000557', '12345678A', '2021-08-23 08:20:40', 'empresa'),
(1598, NULL, 'Se ha actualizado empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 08:33:31', 'empresa'),
(1599, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 08:33:39', 'login'),
(1600, NULL, 'Se ha eliminado todo lo asociado a la empresa 84', '12345678A', '2021-08-23 08:34:45', 'empresa'),
(1601, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP 42', '12345678A', '2021-08-23 08:38:05', 'modulo'),
(1602, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP 42', '12345678A', '2021-08-23 08:38:45', 'modulo'),
(1603, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP 42', '12345678A', '2021-08-23 08:39:11', 'modulo'),
(1604, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP 42', '12345678A', '2021-08-23 08:40:39', 'modulo'),
(1605, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP 42', '12345678A', '2021-08-23 08:40:58', 'modulo'),
(1606, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP Administración y Finanzas', '12345678A', '2021-08-23 08:41:43', 'modulo'),
(1607, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP Administración y Finanzas', '12345678A', '2021-08-23 08:42:10', 'modulo'),
(1608, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP Administración y Finanzas', '12345678A', '2021-08-23 08:43:01', 'modulo'),
(1609, 'ERROR_UPDATE_MODULO', 'No se ha actualizado el modulo  Gestión financiera del FP Administración y Finanzas', '12345678A', '2021-08-23 08:43:50', 'modulo'),
(1610, NULL, 'Se ha actualizado el modulo Gestión financiera del FP Administración y Finanzas', '12345678A', '2021-08-23 08:44:13', 'modulo'),
(1611, NULL, 'Se ha creado el modulo con nombre  prueba del FP Administración y Finanzas', '12345678A', '2021-08-23 08:46:33', 'modulo'),
(1612, NULL, 'Se ha creado el modulo con nombre  prueba del FP Administración y Finanzas', '12345678A', '2021-08-23 08:46:33', 'modulo'),
(1613, NULL, 'Se ha creado el modulo con nombre  prueba del FP Administración y Finanzas', '12345678A', '2021-08-23 08:46:42', 'modulo'),
(1614, NULL, 'Se ha eliminado el módulo 29', '12345678A', '2021-08-23 08:46:48', 'modulo'),
(1615, NULL, 'Se ha eliminado el módulo 30', '12345678A', '2021-08-23 08:46:50', 'modulo'),
(1616, NULL, 'Se ha eliminado el módulo 28', '12345678A', '2021-08-23 08:46:52', 'modulo'),
(1617, NULL, 'Se ha creado el modulo con nombre  prueba del FP Administración y Finanzas', '12345678A', '2021-08-23 08:46:57', 'modulo'),
(1618, NULL, 'Se ha eliminado el módulo 31', '12345678A', '2021-08-23 08:47:00', 'modulo'),
(1619, NULL, 'Se ha actualizado el resultado de aprendizaje Necesidades financieras y ayudas económicas', '12345678A', '2021-08-23 08:51:10', 'modulo'),
(1620, NULL, 'Se ha actualizado el resultado de aprendizaje Selecciona inversiones del módulo Gestión financiera', '12345678A', '2021-08-23 08:52:47', 'modulo'),
(1621, NULL, 'Se ha actualizado el resultado de aprendizaje Selecciona inversiones del módulo Gestión financiera', '12345678A', '2021-08-23 08:52:50', 'modulo'),
(1622, NULL, 'Se ha actualizado el resultado de aprendizaje Necesidades financieras y ayudas económicas del módulo', '12345678A', '2021-08-23 08:54:50', 'modulo'),
(1623, NULL, 'Se ha creado el resultado aprendizaje sas2w2 del módulo Gestión financiera', '12345678A', '2021-08-23 08:54:55', 'resultado aprendizaje'),
(1624, NULL, 'Se ha actualizado el resultado de aprendizaje sas2w2 del módulo Gestión financiera', '12345678A', '2021-08-23 08:55:00', 'modulo'),
(1625, NULL, 'Se ha eliminado el resultado aprendizaje 19', '12345678A', '2021-08-23 08:55:02', 'resultado aprendizaje'),
(1626, NULL, 'Se ha actualizado usuario con DNI  11111111L', '12345678A', '2021-08-23 08:56:56', 'user'),
(1627, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 10:20:05', 'login'),
(1628, NULL, 'Se ha actualizado usuario con DNI  12345678A', '12345678A', '2021-08-23 10:20:17', 'user'),
(1629, NULL, 'Se ha actualizado usuario con DNI  12345678A', '12345678A', '2021-08-23 10:20:17', 'user'),
(1630, NULL, 'Se ha actualizado usuario con DNI  12345678A', '12345678A', '2021-08-23 10:20:20', 'user'),
(1631, NULL, 'Se ha actualizado la encuesta  semana1 del módulo Gestión financiera', '12345678A', '2021-08-23 10:24:49', 'encuesta'),
(1632, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título prrrr del módulo Gestión financiera', '12345678A', '2021-08-23 10:29:35', 'encuesta'),
(1633, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título prrr del módulo Gestión financiera', '12345678A', '2021-08-23 10:30:42', 'encuesta'),
(1634, 'ERROR_INSERT_ENCUESTA', 'No se ha añadido la encuesta con título prueba del módulo Gestión financiera', '12345678A', '2021-08-23 10:53:55', 'encuesta'),
(1635, NULL, 'Se ha creado la encuesta con título prueba del módulo Gestión financiera', '12345678A', '2021-08-23 10:55:09', 'encuesta'),
(1636, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-23 11:00:20', 'login'),
(1637, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 11:00:32', 'login'),
(1638, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-23 11:01:08', 'login'),
(1639, NULL, 'Se ha creado la encuesta con título aswqeweqwqe del módulo Gestión financiera', '11111111T', '2021-08-23 11:01:15', 'encuesta'),
(1640, NULL, 'Se ha actualizado la encuesta  aswqeweqwqe del módulo Gestión financiera', '11111111T', '2021-08-23 11:01:21', 'encuesta'),
(1641, NULL, 'Se ha eliminado la encuesta  aswqeweqwqe del módulo Gestión financiera', '11111111T', '2021-08-23 11:06:30', 'encuesta'),
(1642, NULL, 'Se ha creado la encuesta con título sadsdsad del módulo Gestión financiera', '11111111T', '2021-08-23 11:09:27', 'encuesta'),
(1643, NULL, 'Se ha eliminado la encuesta  sadsdsad del módulo Gestión financiera', '11111111T', '2021-08-23 11:12:11', 'encuesta'),
(1644, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 11:12:20', 'login'),
(1645, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111112A', '12345678A', '2021-08-23 11:15:16', 'calificacion'),
(1646, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 11:15:38', 'login'),
(1647, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111112A', '12345678A', '2021-08-23 11:16:02', 'calificacion'),
(1648, NULL, 'Se ha añadido calificación del alumno 11111111A', '12345678A', '2021-08-23 11:16:56', 'calificacion'),
(1649, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A', '12345678A', '2021-08-23 11:16:58', 'calificacion'),
(1650, NULL, 'Se ha actualizado la calificación al alumno con DNI 11111111A', '12345678A', '2021-08-23 11:17:02', 'calificacion'),
(1651, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:29:29', 'calificacion'),
(1652, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:41:58', 'calificacion'),
(1653, NULL, 'Se ha añadido calificación del alumno 11111111A', '12345678A', '2021-08-23 11:49:49', 'calificacion'),
(1654, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:50:49', 'calificacion'),
(1655, NULL, 'Se ha borrado calificacion del módulo 18', '12345678A', '2021-08-23 11:56:17', 'calificacion'),
(1656, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:56:31', 'calificacion'),
(1657, NULL, 'Se ha borrado calificacion del módulo 24', '12345678A', '2021-08-23 11:57:19', 'calificacion'),
(1658, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:57:48', 'calificacion'),
(1659, NULL, 'Se ha borrado calificacion del módulo 25', '12345678A', '2021-08-23 11:57:50', 'calificacion'),
(1660, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:58:10', 'calificacion'),
(1661, NULL, 'Se ha borrado calificacion del módulo 26', '12345678A', '2021-08-23 11:58:12', 'calificacion'),
(1662, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 11:59:12', 'calificacion'),
(1663, NULL, 'Se ha borrado calificacion del módulo Gestión financiera al alumno ', '12345678A', '2021-08-23 11:59:16', 'calificacion'),
(1664, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 12:01:30', 'calificacion'),
(1665, NULL, 'Se ha borrado calificacion del módulo Gestión financiera al alumno ', '12345678A', '2021-08-23 12:01:33', 'calificacion'),
(1666, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 12:02:09', 'calificacion'),
(1667, NULL, 'Se ha borrado calificacion del módulo Gestión financiera al alumno ', '12345678A', '2021-08-23 12:02:11', 'calificacion'),
(1668, NULL, 'Se ha añadido calificación del alumno 11111112A', '12345678A', '2021-08-23 12:03:41', 'calificacion'),
(1669, NULL, 'Se ha borrado calificacion del módulo Gestión financiera al alumno 11111112A', '12345678A', '2021-08-23 12:03:44', 'calificacion'),
(1670, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-23 12:24:29', 'FP'),
(1671, NULL, 'Se ha añadido FP ', '12345678A', '2021-08-23 12:24:29', 'FP'),
(1672, NULL, 'Se ha creado el modulo con nombre  213213213 del FP sdasadds', '12345678A', '2021-08-23 12:24:38', 'modulo'),
(1673, NULL, 'Se ha creado el resultado aprendizaje 213213 del módulo 213213213', '12345678A', '2021-08-23 12:28:34', 'resultado aprendizaje'),
(1674, NULL, 'Se ha borrado el FP 63', '12345678A', '2021-08-23 12:28:49', 'FP'),
(1675, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 12:36:02', 'empresa'),
(1676, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 12:36:34', 'empresa'),
(1677, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 12:37:31', 'empresa'),
(1678, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa 86', '12345678A', '2021-08-23 12:37:36', 'empresa'),
(1679, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa 85', '12345678A', '2021-08-23 12:37:50', 'empresa'),
(1680, NULL, 'Se ha eliminado todo lo asociado a la empresa 87', '12345678A', '2021-08-23 12:38:08', 'empresa'),
(1681, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa 86', '12345678A', '2021-08-23 12:39:05', 'empresa'),
(1682, NULL, 'Se ha eliminado todo lo asociado a la empresa 85', '12345678A', '2021-08-23 12:53:50', 'empresa'),
(1683, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa 86', '12345678A', '2021-08-23 12:54:52', 'empresa'),
(1684, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-23 12:57:52', 'empresa'),
(1685, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 12:58:35', 'empresa'),
(1686, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-23 12:59:31', 'empresa'),
(1687, 'ERROR_DELETE_FP', 'No se ha borrado el FP 62', '12345678A', '2021-08-23 13:03:05', 'FP'),
(1688, NULL, 'Se ha borrado el FP 62', '12345678A', '2021-08-23 13:03:06', 'FP'),
(1689, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-23 13:05:35', 'empresa'),
(1690, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-23 13:06:00', 'empresa'),
(1691, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 13:09:58', 'empresa'),
(1692, NULL, 'Se ha eliminado  la empresa 89', '12345678A', '2021-08-23 13:11:48', 'empresa'),
(1693, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 13:14:49', 'empresa'),
(1694, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-23 13:15:52', 'empresa'),
(1695, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-23 13:19:00', 'empresa'),
(1696, 'ERROR_DELETE_EMPRESA', 'No se ha podido eliminar la empresa ', '12345678A', '2021-08-23 14:07:27', 'empresa'),
(1697, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-23 14:09:50', 'empresa'),
(1698, NULL, 'Se ha añadido empresa con CIF J11111111 con relación al centro Al-Ándalus', '12345678A', '2021-08-23 14:10:35', 'empresa'),
(1699, NULL, 'Se ha eliminado todo lo asociado a la empresa ', '12345678A', '2021-08-23 14:11:03', 'empresa'),
(1700, NULL, 'Se ha añadido usuario con DNI 12345678C', '12345678A', '2021-08-23 14:33:48', 'user'),
(1701, NULL, 'Se ha añadido usuario con DNI 12345678D', '12345678A', '2021-08-23 14:33:57', 'user'),
(1702, NULL, 'Se ha añadido tutor empresa con DNI 12345678Z', '12345678A', '2021-08-23 14:34:14', 'tutor de empresa'),
(1703, NULL, 'Se ha añadido profesor con DNI 12345678M', '12345678A', '2021-08-23 14:34:34', 'profesor'),
(1704, NULL, 'Se ha añadido alumno con DNI 12345678N', '12345678A', '2021-08-23 14:34:45', 'alumno'),
(1705, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-23 16:48:30', 'login'),
(1706, NULL, 'Se ha actualizado todo lo asociado al centro 41000557', '12345678A', '2021-08-23 17:07:45', 'centro educativo'),
(1707, NULL, 'Se ha actualizado el FP Administración y Finanzas del centro 41000557', '12345678A', '2021-08-23 17:10:53', 'FP'),
(1708, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-24 11:17:51', 'login'),
(1709, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-24 11:18:05', 'login');

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
(139, '12345678A', '2021-07-23 18:58:50', 0),
(140, '12345678A', '2021-07-24 16:31:50', 0),
(141, '12345678A', '2021-07-24 17:18:21', 0),
(142, '12345678A', '2021-07-24 17:27:52', 0),
(143, '12345678A', '2021-07-24 17:27:52', 0),
(144, '12345678A', '2021-07-24 17:31:06', 0),
(145, '12345678A', '2021-07-24 17:32:53', 1),
(146, '12345678A', '2021-07-24 17:32:58', 0),
(147, '12345678A', '2021-07-24 17:34:24', 0),
(148, '12345678A', '2021-07-24 20:46:35', 0),
(149, '12345678A', '2021-07-25 09:42:21', 0),
(150, '12345678A', '2021-07-25 14:40:52', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `curso` varchar(1) NOT NULL,
  `fpDual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`codigo`, `nombre`, `descripcion`, `curso`, `fpDual`) VALUES
(24, 'Gestión financiera', 'Con este módulo aprenderás a determinar las necesidades financieras de una empresa, gestionar la información y contratación de recursos humanos', '1', 42),
(25, 'Contabilidad y fiscalidad', 'Un módulo que te aportará las capacidades necesarias para realizar la gestión contable y fiscal', '2', 42),
(26, 'Comunicación y atención al cliente', 'Utilizar una buena comunicación interna y externa es clave para el buen funcionamiento de una empresa', '1', 42);

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
('11111111P', 'Ciencias'),
('12345678M', 'admin2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_modulo`
--

CREATE TABLE `profesor_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor_modulo`
--

INSERT INTO `profesor_modulo` (`dni`, `codigoModulo`) VALUES
('11111111P', 24),
('11111111P', 25),
('11111111P', 26),
('12345678M', 24),
('12345678M', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_aprendizaje`
--

CREATE TABLE `resultado_aprendizaje` (
  `id` int(11) NOT NULL,
  `codigoModulo` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `resultado_aprendizaje`
--

INSERT INTO `resultado_aprendizaje` (`id`, `codigoModulo`, `titulo`, `descripcion`) VALUES
(9, 24, 'Necesidades financieras y ayudas económicas', 'Determina las necesidades financieras y las ayudas económicas óptimas para la empresa, identificando las alternativas posibles.'),
(10, 24, 'Clasificación de productos y servicios', 'Clasifica los productos y servicios financieros, analizando sus características y formas de contratación.'),
(11, 24, 'Evalúa productos y servicios financieros', 'Evalúa productos y servicios financieros del mercado, realizando los cálculos y elaborando los informes oportunos.'),
(13, 25, 'Registra contablemente las operaciones', 'Registra contablemente las operaciones derivadas del fin del ejercicio económico a partir de la información y documentación de un ciclo económico completo, aplicando los criterios del PGC y la legislación vigente'),
(14, 25, 'Confecciona las cuentas anuales y verifica los trámites', 'Confecciona las cuentas anuales y verifica los trámites para su depósito en el Registro Mercantil, aplicando la legislación mercantil vigente'),
(16, 25, 'Elabora informes de análisis sobre la situación económica-financiera', 'Elabora informes de análisis sobre la situación económica-financiera y patrimonial de una empresa, interpretando los estados contables'),
(17, 25, 'Caracteriza el proceso de auditoría', 'Caracteriza el proceso de auditoría en la empresa, describiendo su propósito dentro del marco normativo español.'),
(18, 24, 'Selecciona inversiones', 'Selecciona inversiones en activos financieros o económicos, analizando sus características y realizando los cálculos oportunos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_encuesta`
--

CREATE TABLE `resultado_encuesta` (
  `id` int(11) NOT NULL,
  `codigoResultado` varchar(10) NOT NULL,
  `resultado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `resultado_encuesta`
--

INSERT INTO `resultado_encuesta` (`id`, `codigoResultado`, `resultado`) VALUES
(1, 'Def', 'Deficiente'),
(2, 'Ac', 'Aceptable'),
(3, 'Re', 'Regular'),
(4, 'Bi', 'Bien'),
(5, 'Op', 'Óptimo');

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
  `idEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tutor_empresa`
--

INSERT INTO `tutor_empresa` (`dni`, `moduloEmpresa`, `idEmpresa`) VALUES
('11111111T', 'mobile', 74),
('12345678Z', '213213213', 74),
('33333333T', '12345678A', 74),
('88777777P', '123213213', 74),
('88888884M', '123123213', 74);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_modulo`
--

CREATE TABLE `tutor_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigoModulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tutor_modulo`
--

INSERT INTO `tutor_modulo` (`dni`, `codigoModulo`) VALUES
('11111111T', 24),
('11111111T', 25),
('12345678Z', 25),
('33333333T', 24),
('33333333T', 25),
('88777777P', 24),
('88777777P', 25),
('88888884M', 25);

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
('11111111A', 'Valentina', 'Alumno2', 'alumno1@hotmail.com', '622222222', 'Calle Asturias nº140', '$2a$12$x2LGUl9izi7PFruh8gv1VekBoT/sRTs7vQn0vbOuFfyJjF3lqMD12', 'femenino', '41920', 5, '1998-02-11', 42, '41000557'),
('11111111L', 'Admin', 'centro', 'admincentro@hotmail.es', '699011010', 'c/ Asturias', '$2a$12$CLBvm37ZPtyK5wtvG1cz9e2kZxbfmVKXGUCrtNcX01y6TDwJNKPiq', 'masculino', '41920', 2, '1998-02-11', NULL, '41000557'),
('11111111P', 'profesor', 'profesor', 'profesor@hotmail.com', '611111111', 'Calle Asturias nº140', '$2a$12$So5n.BPOBtUbHJycEvP7XOIqRNTEsajjJuHECGP1rBu8txLrG9H7K', 'masculino', '41920', 4, '1998-02-11', 42, '41000557'),
('11111111T', 'Pepe', 'pepe', 'pepe@hotmail.es', '677885544', 'sajjds', '$2a$12$VB7AEp.6aqRvkM0xKk6w1OM0ZDWbli/QvkJbYqqYIDhKul6I6JRjG', 'masculino', '41920', 3, '1998-02-11', 42, '41000557'),
('11111112A', 'Paula', 'Garcia', 'paula@hotmail.es', '611777777', 'Espartinas', '$2a$12$jQapX0MaQourjupFDrv0hOjTDUfMRrNniUBCTEOAX5KWYPdNiVMOy', 'femenino', '41920', 5, '1998-02-11', 42, '41000557'),
('12345677L', 'admin', 'admin', 'aksjkwq@hotmail.com', '677118811', 'kjwqk', '$2a$12$wllTKf9aPLcMhWks7cQAQ.oX1Csu6krMo7kqaedp4BlRo/bjGdDk.', 'masculino', '41920', 1, '1998-02-11', NULL, NULL),
('12345678A', 'Cristian', 'García Espinos', 'cristiangarciaespino5@gmail.com', '650927664', 'Calle Asturias nº140', '$2a$12$oBAdbAmPdI9p2zUfW0M/5enqQjT7/9RF.xuf/37OIUAMLSOyjUC1q', 'masculino', '41920', 1, '1998-02-11', NULL, NULL),
('12345678C', 'prueba', 'prueba', 'sadjj@hotmail.com', '611999911', 'c/Asturias', '$2a$12$7DpD9SAgnnuKRQ40.UMWWuCoSfGxgsCH4AkKdl9t7ISDrwBcvFKUW', 'masculino', '41920', 1, '1998-02-11', NULL, NULL),
('12345678D', 'prueba', 'prueba', 'sadjj1@hotmail.com', '611999912', 'c/Asturias', '$2a$12$0VE/3Lp3sidh0sozGqcoyOybC.zeTfWZBvDw1ja5tdK1CR3tO.ABK', 'masculino', '41920', 2, '1998-02-11', NULL, '41000557'),
('12345678M', 'prueba', 'prueba', 'sadjj114@hotmail.com', '611999914', 'c/Asturias', '$2a$12$8qLA4Zrv8t8RJ2RJqW3a5uD/vQmnre6tXCEwuUm/6nH/lA7EmM0LO', 'masculino', '41920', 4, '1998-02-11', 42, '41000557'),
('12345678N', 'prueba', 'prueba', 'sadjj1145@hotmail.com', '611999915', 'c/Asturias', '$2a$12$0DQ6BOWt3DL.drg7XC66BOWwEHvT5pxG3gbx0gcBDccbqtVRA3UZu', 'masculino', '41920', 5, '1998-02-11', 42, '41000557'),
('12345678Z', 'prueba', 'prueba', 'sadjj14@hotmail.com', '611999913', 'c/Asturias', '$2a$12$OUsg2f49AAiv9qhaz0J7ieDRtolHYNUva2VUmo8xvmPKMtbj1can6', 'masculino', '41920', 3, '1998-02-11', 42, '41000557'),
('33333333T', 'Darius', 'Noxus', 'crispillo@hotmail.es', '699889101', 'jwjwqej', '$2a$12$pbzduacY8uwwjTFj8TpdFe/b0B/xXQJfv0KYw0L8FUKFcJmU9kd3q', 'masculino', '41920', 3, '1998-02-11', 42, '41000557'),
('88777777P', 'prueba', 'prueba', 'wqjwe1j@hotmail.es', '611774412', 'prueba', '$2a$12$bxflPzXG0E.FQhFj0SLvvOWB0k07BlvxKXFSkXJ6NZwEnV5BKCCXK', 'masculino', '41967', 3, '1998-02-11', 42, '41000557'),
('88777777T', 'prueba', 'prueba', 'wqjwej@hotmail.es', '611774411', 'prueba', '$2a$12$gsV5gYCfa2wd5giB1l5rIeJDGLUce9xmTV0gZMbTYKr8Kit7Upvra', 'masculino', '41967', 1, '1998-02-11', NULL, NULL),
('88888884M', 'prueba', 'prueba', 'wqejwjqek@hotmail.es', '677110099', 'prueba', '$2a$12$nkqNknlNK8WoHaOUzDB5NOQng5uDJcDRl29X6RM3SKV/iazbMPUM2', 'masculino', '41920', 3, '1998-02-11', 42, '41000557');

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
  ADD KEY `dni` (`dni`),
  ADD KEY `codigoModulo` (`codigoModulo`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigoCentro` (`codigoCentro`);

--
-- Indices de la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD PRIMARY KEY (`idFp`,`idEmpresa`),
  ADD KEY `nombre_fp` (`idFp`),
  ADD KEY `CIF_empresa` (`idEmpresa`),
  ADD KEY `id_fp` (`idFp`);

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigoModulo`),
  ADD KEY `dni_alumno` (`dniAlumno`),
  ADD KEY `dni_tutor_empresa` (`dniTutoroAdmin`),
  ADD KEY `resultado` (`resultado`);

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
-- Indices de la tabla `resultado_encuesta`
--
ALTER TABLE `resultado_encuesta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigoResultado` (`codigoResultado`);

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
  ADD KEY `dni` (`dni`),
  ADD KEY `idEmpresa` (`idEmpresa`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1710;

--
-- AUTO_INCREMENT de la tabla `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `resultado_encuesta`
--
ALTER TABLE `resultado_encuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE,
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`codigoCentro`) REFERENCES `centro_educativo` (`codigoCentro`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD CONSTRAINT `empresa_fpdual_ibfk_4` FOREIGN KEY (`idFp`) REFERENCES `fp_duales` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_fpdual_ibfk_5` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`dniAlumno`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_4` FOREIGN KEY (`resultado`) REFERENCES `resultado_encuesta` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_5` FOREIGN KEY (`dniTutoroAdmin`) REFERENCES `usuario` (`dni`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `tutor_empresa_ibfk_2` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`id`) ON UPDATE CASCADE;

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
