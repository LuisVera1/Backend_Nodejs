
fetch('http://localhost:8080/post')
  .then(response => response.json())
  .then(data => console.log(data));

  const onPostRequest = (post) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('hola');
        }
      }
    });
  
    const URL_MONGO =
    'http://localhost:8080/post';
  
    xhr.open("POST", URL_MONGO);
    xhr.send(JSON.stringify(post));
  };



inputs = document.querySelectorAll(".form-control");
const button = document.querySelector("#publish-post");

let post = {};
const postList = [];

inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    if (event.target.name === "hastags") {
      post.hastags = [event.target.value];
    }
    if (event.target.name === "title") {
      post.title = event.target.value;
      post.reactions = 139;
      post.imgPost =
        "https://res.cloudinary.com/practicaldev/image/fetch/s--EVx0f1n5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jtobjdvwkwsy4htgaqp8.png";
    }

    if (event.target.name === "fullPost") {
      post.fullPost = event.target.value;
      post.date = "12-5-2022";
      post.autorName = "Ben Halpern";
      post.coments = "[]";
    }
    
  });
});

button.addEventListener("click", (event) => {
  postList.push(post);
  console.log('Un click')
  onPostRequest(post);
  //renderList(postList);
});

