const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ports = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const centroRoutes = require('./routes/centro');
const fpRoutes = require('./routes/fp_dual');
const empresaRoutes = require('./routes/empresa');
const rolesRoutes = require('./routes/roles');
const tutorRoutes = require('./routes/tutorEmpresa');
const alumnoRoutes = require('./routes/alumno');
const profesorRoutes = require('./routes/profesor');
const logSesionRoutes= require('./routes/log_sesion');
const errorController = require('./controllers/error');

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/centro', centroRoutes);

app.use('/fpduales', fpRoutes);

app.use('/roles', rolesRoutes);

app.use('/empresa', empresaRoutes);

app.use('/tutor',tutorRoutes);

app.use('/alumno',alumnoRoutes);

app.use("/profesor", profesorRoutes);

app.use("/log/inicioSesion", logSesionRoutes);

app.listen(ports, () => console.log(`Listening on port ${ports}`));