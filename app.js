require('dotenv').config;
const express = require('express');
const allRoutes = require('./routes');
const wistonMiddleware = require('./winston');

const app = express();

app.use(express.json());
app.use(wistonMiddleware);

app.get('/', (req, res) => {
	res.send({
		message: 'Devcode App running!',
	});
});

app.use('/', allRoutes);

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

module.exports = app;
