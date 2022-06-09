const express = require("express");


const Article = require("../models/post.model");

const router = express.Router();

router.use(express.json());

//** Funcion POST para crear*/
router.post("/", async (req, res) => {
  const article = req.body;
  console.log(article);

  const articles = await Article.find({});

  articles.push(article);

  await Article.create(articles);

  res.status(201);
  res.json(articles);
});

module.exports = router;

