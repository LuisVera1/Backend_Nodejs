const Post = require("../models/post.model");

async function createPost(post) {
  const newPost = new Post(post);
  await Post.create(newPost);
  //mo hay return, deberia abir el post en la pagina de post
}

async function getArticles() {
  const allPosts = await Post.find()
  return allPosts
};

async function readArticle(id){
  const idObj ={
    _id: id,
  }
  const choice = await Post.findById(idObj)
  return choice;
}

module.exports = {createPost,getArticles,readArticle}
