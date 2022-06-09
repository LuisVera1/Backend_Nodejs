const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  autorName: String,
  comentarios: [
    {
      un_comentario: String,
      otro_comentario: String,
      uno_mas_comentario: String,
    }],
  date: Number,
  fullPost: [
    { 
    hastag1: String,
    hastag2: String,
    hastag3: String,
    hastag4: String,
    }],
  imgPost: String,
  reactions: Number,
  title: String,
});
const Article = mongoose.model("articles", articleSchema);

//Exportamos el modelo de koder
module.exports = Article;