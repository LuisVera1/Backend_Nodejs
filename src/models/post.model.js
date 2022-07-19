const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	autorName: String,
	coments: [String],
	date: String,
	fullPost: String,
	hastags: [String],
	imgPost: String,
	reactions: Number,
	title: String,
});

const Article = mongoose.model('articles', articleSchema);

// Exportamos el modelo de Koder
module.exports = Article;