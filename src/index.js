
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const routerKoders = require("./routers/post.router");

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST =process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const server = express();

server.use(express.json());

server.use('/koders', routerKoders);


mongoose
  .connect(URL)
  .then(() => {
    console.log("connect to database");

    server.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });