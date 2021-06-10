const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const cors= require('cors');
const ports = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const errorController= require('./controllers/error');
app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use(errorController.get404);
app.listen(ports, () => console.log(`Listening on port ${ports}`));