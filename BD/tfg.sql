-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-06-2021 a las 16:10:11
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
  `numero_expediente` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_modulo`
--

CREATE TABLE `alumno_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigo_modulo` int(11) NOT NULL
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
  `codigo_modulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_educativo`
--

CREATE TABLE `centro_educativo` (
  `codigo_centro` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `CP` int(11) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centro_educativo`
--

INSERT INTO `centro_educativo` (`codigo_centro`, `correo`, `telefono`, `provincia`, `nombre`, `CP`, `direccion`) VALUES
('C12', 'prueba@gmail.com', 955622723, 'Sevilla', 'Mateo Alemán', 41920, 'Calle Juan Ramón Jiménez, s/n, 41920 San Juan de Aznalfarache, Sevilla'),
('C1234', '', 123, 'Sevilla', '', 12, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `CIF` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`CIF`, `direccion`, `nombre`, `tipo`, `correo`, `telefono`, `url`) VALUES
('1234', '2123', '21', '213', '213', 123, '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_fpdual`
--

CREATE TABLE `empresa_fpdual` (
  `nombre_fp` varchar(100) NOT NULL,
  `CIF_empresa` varchar(100) NOT NULL,
  `becas` tinyint(1) NOT NULL,
  `plazas` int(11) NOT NULL,
  `codigo_centro` varchar(100) NOT NULL
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
  `codigo_modulo` int(11) NOT NULL,
  `dni_alumno` varchar(9) NOT NULL,
  `dni_tutor_empresa` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fp_duales`
--

CREATE TABLE `fp_duales` (
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `total_plazas` int(11) NOT NULL,
  `anio` date NOT NULL,
  `codigo_centro` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_calificacion`
--

CREATE TABLE `log_calificacion` (
  `id_calificacion` int(11) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_centroeducativo`
--

CREATE TABLE `log_centroeducativo` (
  `codigo_centro` varchar(100) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_empresa`
--

CREATE TABLE `log_empresa` (
  `cif_empresa` varchar(100) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_encuesta`
--

CREATE TABLE `log_encuesta` (
  `id_encuesta` int(11) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_entidad`
--

CREATE TABLE `log_entidad` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `fecha_horaLog` datetime NOT NULL,
  `DML` varchar(100) NOT NULL,
  `error` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_fpduales`
--

CREATE TABLE `log_fpduales` (
  `nombre_fp` varchar(100) NOT NULL,
  `codigo_centro` varchar(100) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_login`
--

CREATE TABLE `log_login` (
  `id` int(11) NOT NULL,
  `usuario` varchar(9) NOT NULL,
  `fecha_horaLog` datetime NOT NULL,
  `error` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_modulo`
--

CREATE TABLE `log_modulo` (
  `codigo_modulo` int(11) NOT NULL,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_resultadoaprendizaje`
--

CREATE TABLE `log_resultadoaprendizaje` (
  `id_resultado` int(11) NOT NULL,
  `id_log` int(11) NOT NULL
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
  `codigo_modulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_aprendizaje`
--

CREATE TABLE `resultado_aprendizaje` (
  `id` int(11) NOT NULL,
  `codigo_modulo` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_empresa`
--

CREATE TABLE `tutor_empresa` (
  `dni` varchar(9) NOT NULL,
  `modulo_empresa` varchar(100) NOT NULL,
  `cif_empresa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_modulo`
--

CREATE TABLE `tutor_modulo` (
  `dni` varchar(9) NOT NULL,
  `codigo_modulo` int(11) NOT NULL
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
  `movil` int(11) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `cp` int(11) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `codigo_centro` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `nombre`, `apellidos`, `correo`, `movil`, `direccion`, `password`, `genero`, `cp`, `rol`, `fecha_nacimiento`, `nombre_usuario`, `codigo_centro`) VALUES
('53350616T', 'Cristian', 'García Espino', 'cristiangarciaespino5@gmail.com', 650927664, 'c/Asturias nº140', 'hola12', 'Masculino', 41920, 'ADMIN', '1998-02-11', 'cgaresp', 'C1234'),
('a', '', '', '', 1, '', '', '', 12, '', '0000-00-00', '', 'C12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `numero_expediente` (`numero_expediente`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `alumno_modulo`
--
ALTER TABLE `alumno_modulo`
  ADD PRIMARY KEY (`dni`,`codigo_modulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigo_modulo`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigo_modulo`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `centro_educativo`
--
ALTER TABLE `centro_educativo`
  ADD PRIMARY KEY (`codigo_centro`),
  ADD UNIQUE KEY `correo` (`correo`,`telefono`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`CIF`),
  ADD UNIQUE KEY `correo` (`correo`,`telefono`);

--
-- Indices de la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD PRIMARY KEY (`nombre_fp`,`CIF_empresa`,`codigo_centro`),
  ADD KEY `nombre_fp` (`nombre_fp`),
  ADD KEY `CIF_empresa` (`CIF_empresa`),
  ADD KEY `codigo_centro` (`codigo_centro`);

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigo_modulo`),
  ADD KEY `dni_alumno` (`dni_alumno`),
  ADD KEY `dni_tutor_empresa` (`dni_tutor_empresa`);

--
-- Indices de la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  ADD PRIMARY KEY (`nombre`,`codigo_centro`),
  ADD KEY `codigo_centro` (`codigo_centro`);

--
-- Indices de la tabla `log_calificacion`
--
ALTER TABLE `log_calificacion`
  ADD PRIMARY KEY (`id_calificacion`,`id_log`),
  ADD KEY `id_calificacion` (`id_calificacion`),
  ADD KEY `id_log` (`id_log`);

--
-- Indices de la tabla `log_centroeducativo`
--
ALTER TABLE `log_centroeducativo`
  ADD PRIMARY KEY (`codigo_centro`,`id_log`),
  ADD KEY `codigo_centro` (`codigo_centro`),
  ADD KEY `id_log` (`id_log`);

--
-- Indices de la tabla `log_empresa`
--
ALTER TABLE `log_empresa`
  ADD PRIMARY KEY (`cif_empresa`,`id_log`),
  ADD KEY `cif_empresa` (`cif_empresa`),
  ADD KEY `id_log` (`id_log`);

--
-- Indices de la tabla `log_encuesta`
--
ALTER TABLE `log_encuesta`
  ADD PRIMARY KEY (`id_encuesta`,`id_log`),
  ADD KEY `id_encuesta` (`id_encuesta`),
  ADD KEY `id_log` (`id_log`);

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
  ADD PRIMARY KEY (`nombre_fp`,`codigo_centro`,`id_log`),
  ADD KEY `nombre_fp` (`nombre_fp`),
  ADD KEY `codigo_centro` (`codigo_centro`),
  ADD KEY `id_log` (`id_log`);

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
  ADD PRIMARY KEY (`codigo_modulo`,`id_log`),
  ADD KEY `codigo_modulo` (`codigo_modulo`),
  ADD KEY `id_log` (`id_log`);

--
-- Indices de la tabla `log_resultadoaprendizaje`
--
ALTER TABLE `log_resultadoaprendizaje`
  ADD PRIMARY KEY (`id_resultado`,`id_log`),
  ADD KEY `id_resultado` (`id_resultado`),
  ADD KEY `id_log` (`id_log`);

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
  ADD PRIMARY KEY (`dni`,`codigo_modulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigo_modulo`);

--
-- Indices de la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_modulo` (`codigo_modulo`);

--
-- Indices de la tabla `tutor_empresa`
--
ALTER TABLE `tutor_empresa`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `cif_empresa` (`cif_empresa`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `tutor_modulo`
--
ALTER TABLE `tutor_modulo`
  ADD PRIMARY KEY (`dni`,`codigo_modulo`),
  ADD KEY `dni` (`dni`),
  ADD KEY `codigo_modulo` (`codigo_modulo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `correo` (`correo`,`movil`,`nombre_usuario`),
  ADD KEY `codigo_centro` (`codigo_centro`);

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
-- AUTO_INCREMENT de la tabla `log_entidad`
--
ALTER TABLE `log_entidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `alumno_modulo_ibfk_2` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empresa_fpdual`
--
ALTER TABLE `empresa_fpdual`
  ADD CONSTRAINT `empresa_fpdual_ibfk_1` FOREIGN KEY (`codigo_centro`) REFERENCES `fp_duales` (`codigo_centro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_fpdual_ibfk_2` FOREIGN KEY (`nombre_fp`) REFERENCES `fp_duales` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empresa_fpdual_ibfk_3` FOREIGN KEY (`CIF_empresa`) REFERENCES `empresa` (`CIF`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`dni_alumno`) REFERENCES `alumno` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encuesta_ibfk_3` FOREIGN KEY (`dni_tutor_empresa`) REFERENCES `tutor_empresa` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fp_duales`
--
ALTER TABLE `fp_duales`
  ADD CONSTRAINT `fp_duales_ibfk_1` FOREIGN KEY (`codigo_centro`) REFERENCES `centro_educativo` (`codigo_centro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_calificacion`
--
ALTER TABLE `log_calificacion`
  ADD CONSTRAINT `log_calificacion_ibfk_1` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_calificacion_ibfk_2` FOREIGN KEY (`id_calificacion`) REFERENCES `calificacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_centroeducativo`
--
ALTER TABLE `log_centroeducativo`
  ADD CONSTRAINT `log_centroeducativo_ibfk_1` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_centroeducativo_ibfk_2` FOREIGN KEY (`codigo_centro`) REFERENCES `centro_educativo` (`codigo_centro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_empresa`
--
ALTER TABLE `log_empresa`
  ADD CONSTRAINT `log_empresa_ibfk_1` FOREIGN KEY (`cif_empresa`) REFERENCES `empresa` (`CIF`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_empresa_ibfk_2` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_encuesta`
--
ALTER TABLE `log_encuesta`
  ADD CONSTRAINT `log_encuesta_ibfk_1` FOREIGN KEY (`id_encuesta`) REFERENCES `encuesta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_encuesta_ibfk_2` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_entidad`
--
ALTER TABLE `log_entidad`
  ADD CONSTRAINT `log_entidad_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_fpduales`
--
ALTER TABLE `log_fpduales`
  ADD CONSTRAINT `log_fpduales_ibfk_1` FOREIGN KEY (`nombre_fp`) REFERENCES `fp_duales` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_fpduales_ibfk_2` FOREIGN KEY (`codigo_centro`) REFERENCES `fp_duales` (`codigo_centro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_fpduales_ibfk_3` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_login`
--
ALTER TABLE `log_login`
  ADD CONSTRAINT `log_login_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_modulo`
--
ALTER TABLE `log_modulo`
  ADD CONSTRAINT `log_modulo_ibfk_1` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_modulo_ibfk_2` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log_resultadoaprendizaje`
--
ALTER TABLE `log_resultadoaprendizaje`
  ADD CONSTRAINT `log_resultadoaprendizaje_ibfk_1` FOREIGN KEY (`id_log`) REFERENCES `log_entidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_resultadoaprendizaje_ibfk_2` FOREIGN KEY (`id_resultado`) REFERENCES `resultado_aprendizaje` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_modulo`
--
ALTER TABLE `profesor_modulo`
  ADD CONSTRAINT `profesor_modulo_ibfk_1` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesor_modulo_ibfk_2` FOREIGN KEY (`dni`) REFERENCES `profesor` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD CONSTRAINT `resultado_aprendizaje_ibfk_1` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tutor_empresa`
--
ALTER TABLE `tutor_empresa`
  ADD CONSTRAINT `tutor_empresa_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tutor_empresa_ibfk_2` FOREIGN KEY (`cif_empresa`) REFERENCES `empresa` (`CIF`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tutor_modulo`
--
ALTER TABLE `tutor_modulo`
  ADD CONSTRAINT `tutor_modulo_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `tutor_empresa` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tutor_modulo_ibfk_2` FOREIGN KEY (`codigo_modulo`) REFERENCES `modulo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`codigo_centro`) REFERENCES `centro_educativo` (`codigo_centro`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
