-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2021 a las 09:50:25
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.3.28

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

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`numeroExpediente`, `dni`) VALUES
('111111', '22222222A'),
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
('22222222A', 24),
('22222222A', 26);

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
(2, '11111111A', 6, 'Has trabajado muy bien', 24),
(15, '22222222A', 6, '1234', 24),
(16, '11111111A', 7, 'EJJEJE', 25);

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
('41701365', '41701365.edu@juntadeandalucia.es', '955 967 951', 'Sevilla', 'Federico García Lorca', '41540', 'CALLE CASTELAR S/N'),
('PRUEBA', 'cristiangarciaespino5@gmail.com', '911019010', 'Sevillaa', 'PRUEBA', '41920', 'C/aSTURIAS');

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
  `url` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`cifEmpresa`, `direccion`, `nombre`, `correo`, `telefono`, `url`) VALUES
('B21321286', 'Calle Mayo, 2, Arahal', 'El Gitanilla', '41016437.edu@juntadeandalucia.es', '955967686', 'https://www.escuelainfantilgitanilla.es/Datos-del-centro/'),
('B41364613', 'Recreo de Montestruque, 26  Morón de la Frontera, Sevilla', 'Mitelec Instalaciones', 'instalaciones@mitelec.es', '955853905', 'https://mitelec.es/'),
('B41600560', 'CALLE CHAPISTAS, 6 - Y 8', 'DIFRISUR SL', 'jlmanaute@hotmail.com', '955841956', 'https://los-artesanos.com/'),
('B41912023', 'Pol.Industrial “El Corbones” C/ Constructores, 2 La Puebla de Cazalla', 'BALLESTAS CHIA', 'info@ballestaschia.com', '955291092', 'https://ballestaschia.es/'),
('B91295881', 'Calle María Auxiliadora, 54, Morón de la Frontera, Sevilla', 'RESIDENCIAL GERIATRICA MEDITERRANEO', 'recepcion@residenciamayores.com', '955 85 48 0', 'https://www.residenciamayores.com/'),
('G11111112', 'sdasad', 'sdaads12', 'sjksadjk@hotmail.com', '901010101', 'https://stackblitz.com/angular/mamdkqeealx?file=app%2Fmenu-icons-example.html'),
('G11111113', 'Calle Asturias nº140', 'García Espino, Cristian', 'sadjhk@hotmail.com', '956891241', 'https://www.amazon.es/Monitores-reacondicionado/s?k=Monitores+reacondicionado'),
('G11111114', 'sadsdasad', 'sadads', 'sadjkjksa@hotmail.com', '911090909', 'https://www.geeksforgeeks.org/how-to-validate-if-input-in-input-field-has-integer-number-only-using-'),
('K11111114', 'jsakjsakjdk', 'sjkajkawjwekj', 'crissad@hotmail.es', '911010106', 'https://www.w3schools.com/js/tryit.asp?filename=tryjs_global_parseint'),
('K12345678', 'Calle Asturias nº140', 'prueba', 'prueba@hotmail.es', '911019281', 'https://www.logicbig.com/tutorials/misc/primefaces/menu-bar.html'),
('K99999999', 'Calle Asturias nº140', 'EMPRESA', 'empresa@hotmail.es', '911010109', 'https://stackblitz.com/edit/angular-mat-select-multi-with-formcontrol?file=app%2Fselect-overview-exa'),
('P4101100H', 'Plaza Corredera, 1, Arahal', 'Ayuntamiento de el Arahal', 'info@arahal.es', '955841033', 'http://www.arahal.es/opencms/opencms/arahal'),
('Q11111111', 'prueba', 'prueba', 'empresa@hotmail.com', '911899812', 'https://www.geeksforgeeks.org/how-to-validate-if-input-in-input-field-has-integer-number-only-using-'),
('Q11111112', 'Calle Asturias nº140', 'García Espino, Cristiana', 'dsakjsdjk@hotmail.com', '911010101', 'https://www.geeksforgeeks.org/how-to-validate-if-input-in-input-field-has-integer-number-only-using-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_fpdual`
--

CREATE TABLE `empresa_fpdual` (
  `idFp` int(11) NOT NULL,
  `CifEmpresa` varchar(100) NOT NULL,
  `becas` tinyint(1) NOT NULL,
  `plazas` int(11) NOT NULL,
  `dineroBeca` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa_fpdual`
--

INSERT INTO `empresa_fpdual` (`idFp`, `CifEmpresa`, `becas`, `plazas`, `dineroBeca`) VALUES
(42, 'B41364613', 1, 4, '123'),
(42, 'B41600560', 1, 3, '111'),
(42, 'B41912023', 0, 3, '0'),
(43, 'B91295881', 1, 12, '0'),
(47, 'B21321286', 1, 5, '200'),
(47, 'P4101100H', 0, 5, '0');

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
  `dniTutorEmpresa` varchar(9) NOT NULL,
  `observaciones` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encuesta`
--

INSERT INTO `encuesta` (`id`, `descripcion`, `titulo`, `resultado`, `codigoModulo`, `dniAlumno`, `dniTutorEmpresa`, `observaciones`) VALUES
(15, 'prueba', 'Prubea', 5, 24, '11111111A', '11111111T', 'prueba'),
(16, 'prueba', 'Prueba', NULL, 24, '22222222A', '11111111T', NULL);

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
('Administración y Finanzas', 'Este profesional desempeña las tareas administrativas en la gestión y el asesoramiento en las áreas laboral, comercial, contable y fiscal de las empresas', 10, 2021, '41000557', 8, 42),
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
(929, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-30 20:38:31', 'login'),
(930, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-30 20:39:09', 'login'),
(931, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-30 21:57:44', 'login'),
(932, NULL, 'Se ha logado usuario ', '12345678A', '2021-07-31 09:00:10', 'login'),
(933, NULL, 'Se ha creado la encuesta con id undefined ', '12345678A', '2021-07-31 09:25:54', 'encuesta'),
(934, NULL, 'Se ha eliminado la encuesta aprendizaje 10', '12345678A', '2021-07-31 09:27:38', 'encuesta'),
(935, NULL, 'Se ha actualizado la encuesta con id 9 ', '12345678A', '2021-07-31 09:32:50', 'encuesta'),
(936, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-31 09:34:11', 'login'),
(937, NULL, 'Se ha logado usuario ', '11111111P', '2021-07-31 09:37:53', 'login'),
(938, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-31 09:48:29', 'login'),
(939, NULL, 'Se ha actualizado la encuesta con id 9 ', '11111111T', '2021-07-31 09:53:25', 'encuesta'),
(940, NULL, 'Se ha actualizado la encuesta con id 9 ', '11111111T', '2021-07-31 09:54:07', 'encuesta'),
(941, NULL, 'Se ha actualizado la encuesta con id 9 ', '11111111T', '2021-07-31 09:55:05', 'encuesta'),
(942, NULL, 'Se ha actualizado la encuesta con id 9 ', '11111111T', '2021-07-31 09:58:52', 'encuesta'),
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
(998, NULL, 'Se ha logado usuario ', '11111111T', '2021-07-31 19:19:44', 'login'),
(999, NULL, 'Se ha actualizado usuario con DNI 11111111T ', '11111111T', '2021-07-31 19:20:08', 'user'),
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
(1064, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-01 20:29:41', 'login'),
(1065, NULL, 'Se ha actualizado la encuesta con id 14 ', '11111111T', '2021-08-01 20:30:05', 'encuesta'),
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
(1089, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-03 18:50:01', 'login'),
(1090, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-03 18:53:59', 'login'),
(1091, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-04 11:35:53', 'login'),
(1092, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 11:39:15', 'login'),
(1093, NULL, 'Se ha logado usuario ', '11111111P', '2021-08-04 11:39:33', 'login'),
(1094, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-04 11:47:06', 'login'),
(1095, NULL, 'Se ha añadido tutor empresa con DNI 22222222T ', '12345678A', '2021-08-04 11:47:59', 'tutor de empresa'),
(1097, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-04 12:07:57', 'login'),
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
(1176, NULL, 'Se ha logado usuario ', '22222222A', '2021-08-05 19:19:55', 'login'),
(1177, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 19:24:09', 'login'),
(1178, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-05 19:24:26', 'calificacion'),
(1179, NULL, 'Se ha borrado calificacion con id 14 ', '12345678A', '2021-08-05 19:30:49', 'calificacion'),
(1180, NULL, 'Se ha añadido alumno con DNI 11111111A ', '12345678A', '2021-08-05 20:51:51', 'alumno'),
(1181, NULL, 'Se ha añadido calificación del alumno 22222222A ', '12345678A', '2021-08-05 21:14:58', 'calificacion'),
(1182, NULL, 'Se ha añadido calificación del alumno 11111111A ', '12345678A', '2021-08-05 21:24:55', 'calificacion'),
(1183, 'ERROR_LOGIN', 'Credenciales incorrectas ', '11111111A', '2021-08-05 21:25:32', 'login'),
(1184, NULL, 'Se ha logado usuario ', '11111111A', '2021-08-05 21:25:40', 'login'),
(1185, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-05 21:28:37', 'login'),
(1186, NULL, 'Se ha logado usuario ', '12345678A', '2021-08-05 21:32:26', 'login'),
(1187, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-05 21:55:17', 'login'),
(1188, NULL, 'Se ha actualizado la encuesta con id 15 ', '11111111T', '2021-08-05 21:55:33', 'encuesta'),
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
(1204, NULL, 'Se ha logado usuario ', '11111111T', '2021-08-06 12:05:00', 'login'),
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
(1264, NULL, 'Se ha eliminado  la empresa ', '12345678A', '2021-08-07 22:55:33', 'empresa');

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
('11111111P', 'Marketing');

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
('11111111P', 26);

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
(12, 24, 'Selecciona inversiones', 'Selecciona inversiones en activos financieros o económicos, analizando sus características y realizando los cálculos oportunos.'),
(13, 25, 'Registra contablemente las operaciones', 'Registra contablemente las operaciones derivadas del fin del ejercicio económico a partir de la información y documentación de un ciclo económico completo, aplicando los criterios del PGC y la legislación vigente'),
(14, 25, 'Confecciona las cuentas anuales y verifica los trámites', 'Confecciona las cuentas anuales y verifica los trámites para su depósito en el Registro Mercantil, aplicando la legislación mercantil vigente'),
(16, 25, 'Elabora informes de análisis sobre la situación económica-financiera', 'Elabora informes de análisis sobre la situación económica-financiera y patrimonial de una empresa, interpretando los estados contables'),
(17, 25, 'Caracteriza el proceso de auditoría', 'Caracteriza el proceso de auditoría en la empresa, describiendo su propósito dentro del marco normativo español.');

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
  `cifEmpresa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tutor_empresa`
--

INSERT INTO `tutor_empresa` (`dni`, `moduloEmpresa`, `cifEmpresa`) VALUES
('11111111T', 'Marketing', 'B41600560');

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
('11111111T', 25);

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
('11111111A', 'Alumno', 'Alumno2', 'alumno1@hotmail.com', '622222222', 'Calle Asturias nº140', '$2a$12$p4CtP7BY5wAez65DYP7rx.Ax34ddqh6a65rzskW7kPDBviNNajvay', 'masculino', '41920', 5, '1998-02-11', 42, '41000557'),
('11111111L', 'Admin', 'centro', 'admincentro@hotmail.es', '699011010', 'c/ Asturias', '$2a$12$yughG160rf.No46qW2qj1eLW5gCFyL.qWp7ZfC/7STBmxr.G1eLeq', 'masculino', '41920', 2, '1998-02-11', NULL, '41000557'),
('11111111P', 'profesor', 'profesor', 'profesor@hotmail.com', '611111111', 'Calle Asturias nº140', '$2a$12$IM/X/NpWTjZA.7yZvXbDfu97JNgWOALWUMupkZ/c3vp41ZR2/QtTq', 'masculino', '41920', 4, '1998-02-11', 42, '41000557'),
('11111111T', 'Tutor1', 'Alumno', 'tutor@hotmail.com', '633333333', 'Calle Asturias nº140', '$2a$12$LyctZRHS.ZX.g0GeP7doEub7GUa3gJ4K7Pu2WeJasrGcidX8eXuDq', 'femenino', '41920', 3, '1998-02-11', 42, '41000557'),
('12345678A', 'Cristian', 'García Espinos', 'cristiangarciaespino5@gmail.com', '650927664', 'Calle Asturias nº140', '$2a$12$2HVsV3dK9TsdbqQTvBFWreGMeK6zJmVseh0nCpeSU3oUcPGLNYHoy', 'masculino', '41920', 1, '1998-02-11', NULL, NULL),
('22222222A', 'Paula', 'García', 'cga@hotmail.es', '669899821', 'c/Asturias', '$2a$12$HYsfe9XBwUzX2YewxkJrVeYt70tmnOQ4bKGP9T1pK1ksXYaVnSR1y', 'femenino', '41920', 5, '1998-02-11', 42, '41000557');

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
  ADD KEY `dni_tutor_empresa` (`dniTutorEmpresa`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1265;

--
-- AUTO_INCREMENT de la tabla `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `encuesta_ibfk_3` FOREIGN KEY (`dniTutorEmpresa`) REFERENCES `tutor_empresa` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_4` FOREIGN KEY (`resultado`) REFERENCES `resultado_encuesta` (`id`) ON UPDATE CASCADE;

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
