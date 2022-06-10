//#region Imports & vars
require('dotenv').config(); // las variables del .env se agregan a process.env

// Importamos paquetes con require
const express = require('express');
const mongoose = require('mongoose');

const postRouter = require('./routers/post.router');

// Inicializamos constantes con la configuracion
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

//const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const URL = "mongodb+srv://Luisvera:PassUser23.@cluster0.hsqgk.mongodb.net/DevTo?retryWrites=true&w=majority"

console.log(URL);

const app = express();
//#endregion

app.use(express.json());
app.use('/', postRouter);

// Ejecutamos server y conectamos BD
mongoose
	.connect(URL)
	.then(() => {
		console.log('Estamos conectados a la Base de datos!');

		app.listen(PORT, () => {
			console.log('Server ejecutandose en el puerto:', PORT);
		});
	})
	.catch((error) => {
		console.error('Hubo un error:', error);
	});
