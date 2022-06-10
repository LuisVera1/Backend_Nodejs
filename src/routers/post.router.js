const express = require('express');
const Post = require('../usecases/article.usecases');

const router = express.Router();

//#tomato                   GET all Posts                   //#
router.get('/', async (req, res) => {
	const posts = await Post.getArticles({});
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(posts);
	res.status(200);
});

//#tomato                   POST an Article                   //#
router.post('/', async (req, res) => {
	//TODO: Añadir funciones

	res.status(202);
});

//#tomato                   GET chosen Article                 //#
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id);
	const chosenPost = await Post.readArticle(id);
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(chosenPost);
	res.status(200);
});

module.exports = router;
