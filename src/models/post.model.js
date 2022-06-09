const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  autorName: String,
  comentarios: Array,
  date: Number,
  fullPost: Array,
  imgPost: String,
  reactions: Number,
  title: String,
});
const Article = mongoose.model("articles", articleSchema);

//Exportamos el modelo de koder
module.exports = Article;