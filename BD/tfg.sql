-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-07-2021 a las 14:20:21
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
('C12', 'mateoaleman@hotmail.com', '955622739', 'Sevilla', 'Mateo Aleman', '41920', 'c/ Asturias'),
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
('1234', 'C/Asturias', 'hola', 'hola@hotmail.com', '955511212', 'wjqkwe'),
('12345', 'a', 'a', 'a', '95123', 'a'),
('G12345678', 'prueba', 'pruebaa', 'hola112@hotmail.com', '955511214', 'https://angular.io/tutorial/toh-pt6');

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
  `resultado` varchar(100) NOT NULL,
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
('TRANSPORTE Y LOGUÍSTICA', 'Holaaa', 24, 2021, 'C12', 2, 1),
('', '', 0, 0000, '', 0, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_calificacion`
--

CREATE TABLE `log_calificacion` (
  `idCalificacion` int(11) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_centroeducativo`
--

CREATE TABLE `log_centroeducativo` (
  `codigoCentro` varchar(100) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_empresa`
--

CREATE TABLE `log_empresa` (
  `cifEmpresa` varchar(100) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_encuesta`
--

CREATE TABLE `log_encuesta` (
  `idEncuesta` int(11) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_entidad`
--

CREATE TABLE `log_entidad` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `fechaHoraLog` datetime NOT NULL,
  `DML` varchar(100) NOT NULL,
  `error` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_fpduales`
--

CREATE TABLE `log_fpduales` (
  `idFp` int(11) NOT NULL,
  `codigo_centro` varchar(100) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, '12345677A', '0000-00-00 00:00:00', 0),
(2, '12345677A', '0000-00-00 00:00:00', 0),
(3, '12345678A', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_modulo`
--

CREATE TABLE `log_modulo` (
  `codigoModulo` int(11) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_resultadoaprendizaje`
--

CREATE TABLE `log_resultadoaprendizaje` (
  `idResultado` int(11) NOT NULL,
  `idLog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `dni` varchar(9) NOT NULL,
  `departamento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

--
-- Volcado de datos para la tabla `tutor_empresa`
--

INSERT INTO `tutor_empresa` (`dni`, `moduloEmpresa`, `cifEmpresa`) VALUES
('12345677A', 'COF231', 'G12345678');

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
('12345458A', 'Cristian', 'García', 'cristian@gmail.com', '666666667', 'c/AS', '$2a$12$COY8y2mYS7CkPRa3Ym5krOcjhn634fGVemR8SwohKEzxPnE0/eere', 'masculino', '41920', 1, '1998-01-11', NULL, NULL),
('12345677A', 'Cristian', 'García', 'cris@gmail.com', '666666661', 'c/Asturias n 140', '$2a$12$cQnjWo36.39tpldtd6capODAA49Ud4p2kKf3OoRXYF5MWq2sfjM12', 'masculino', '41920', 1, '1998-02-11', 1, ''),
('12345678A', 'Cristian', 'García', 'cristiangarciaespino15@gmail.com', '650927661', 'c/Asturias', '$2a$12$wlrMa4eNTQsqKnRsl7E.0e5VifA6HIawHVIH72Uwa20V1WW.fFIYW', 'masculino', '41920', 1, '0000-00-00', 1, '');

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
-- Indices de la tabla `log_calificacion`
--
ALTER TABLE `log_calificacion`
  ADD PRIMARY KEY (`idCalificacion`,`idLog`),
  ADD KEY `id_calificacion` (`idCalificacion`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `log_centroeducativo`
--
ALTER TABLE `log_centroeducativo`
  ADD PRIMARY KEY (`codigoCentro`,`idLog`),
  ADD KEY `codigo_centro` (`codigoCentro`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `log_empresa`
--
ALTER TABLE `log_empresa`
  ADD PRIMARY KEY (`cifEmpresa`,`idLog`),
  ADD KEY `cif_empresa` (`cifEmpresa`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `log_encuesta`
--
ALTER TABLE `log_encuesta`
  ADD PRIMARY KEY (`idEncuesta`,`idLog`),
  ADD KEY `id_encuesta` (`idEncuesta`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `log_entidad`
--
ALTER TABLE `log_entidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `log_fpduales`
--
ALTER TABLE `log_fpduales`
  ADD PRIMARY KEY (`idFp`,`codigo_centro`,`idLog`),
  ADD KEY `nombre_fp` (`idFp`),
  ADD KEY `codigo_centro` (`codigo_centro`),
  ADD KEY `id_log` (`idLog`),
  ADD KEY `id_fp` (`idFp`);

--
-- Indices de la tabla `log_login`
--
ALTER TABLE `log_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `log_modulo`
--
ALTER TABLE `log_modulo`
  ADD PRIMARY KEY (`codigoModulo`,`idLog`),
  ADD KEY `codigo_modulo` (`codigoModulo`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `log_resultadoaprendizaje`
--
ALTER TABLE `log_resultadoaprendizaje`
  ADD PRIMARY KEY (`idResultado`,`idLog`),
  ADD KEY `id_resultado` (`idResultado`),
  ADD KEY `id_log` (`idLog`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`codigo`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `log_entidad`
--
ALTER TABLE `log_entidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `log_calificacion`
--
ALTER TABLE `log_calificacion`
  ADD CONSTRAINT `log_calificacion_ibfk_1` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_calificacion_ibfk_2` FOREIGN KEY (`idCalificacion`) REFERENCES `calificacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_centroeducativo`
--
ALTER TABLE `log_centroeducativo`
  ADD CONSTRAINT `log_centroeducativo_ibfk_1` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_centroeducativo_ibfk_2` FOREIGN KEY (`codigoCentro`) REFERENCES `centro_educativo` (`codigoCentro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_empresa`
--
ALTER TABLE `log_empresa`
  ADD CONSTRAINT `log_empresa_ibfk_1` FOREIGN KEY (`cifEmpresa`) REFERENCES `empresa` (`cifEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_empresa_ibfk_2` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_encuesta`
--
ALTER TABLE `log_encuesta`
  ADD CONSTRAINT `log_encuesta_ibfk_1` FOREIGN KEY (`idEncuesta`) REFERENCES `encuesta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_encuesta_ibfk_2` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_entidad`
--
ALTER TABLE `log_entidad`
  ADD CONSTRAINT `log_entidad_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_fpduales`
--
ALTER TABLE `log_fpduales`
  ADD CONSTRAINT `log_fpduales_ibfk_3` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_fpduales_ibfk_4` FOREIGN KEY (`codigo_centro`) REFERENCES `fp_duales` (`codigoCentro`) ON UPDATE CASCADE,
  ADD CONSTRAINT `log_fpduales_ibfk_5` FOREIGN KEY (`idFp`) REFERENCES `fp_duales` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_login`
--
ALTER TABLE `log_login`
  ADD CONSTRAINT `log_login_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_modulo`
--
ALTER TABLE `log_modulo`
  ADD CONSTRAINT `log_modulo_ibfk_1` FOREIGN KEY (`codigoModulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_modulo_ibfk_2` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_resultadoaprendizaje`
--
ALTER TABLE `log_resultadoaprendizaje`
  ADD CONSTRAINT `log_resultadoaprendizaje_ibfk_1` FOREIGN KEY (`idLog`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_resultadoaprendizaje_ibfk_2` FOREIGN KEY (`idResultado`) REFERENCES `resultado_aprendizaje` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
