const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ports = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const centroRoutes = require('./routes/centro');
const fpRoutes = require('./routes/fp_dual');
const rolesRoutes = require('./routes/roles');
const errorController = require('./controllers/error');
app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/centro', centroRoutes);

app.use('/fpduales', fpRoutes);

app.use('/roles', rolesRoutes);
//app.use(errorController.get404);
//app.use(errorController.get500);
//app.use(errorController.get401);
//app.use(errorController.get409);

app.listen(ports, () => console.log(`Listening on port ${ports}`));