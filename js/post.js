const onPostRequest = (post) => {
    const xhr = new XMLHttpRequest();
    //console.log(xhr);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onGuestRequest();
        }
      }
    });
  
    const URL_FIREBASE =
      "https://nestorfirebase-default-rtdb.firebaseio.com/PruebaPost.json";
  
    xhr.open("POST", URL_FIREBASE);
    xhr.send(JSON.stringify(post));
  };
  
  const onGuestRequest = () => {
      const xhr = new XMLHttpRequest();
      //console.log(xhr)
      xhr.addEventListener('readystatechange', () => {
          const postList = [];
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  const response = JSON.parse(xhr.response);
                  //console.log(response)
                  for(let property in response) {
                      //console.log(response[property]);
                      const singlePost = {
                          id: property,
                          ...response[property],
                      }
  
                      postList.push(singlePost);
                  }
  
                  console.log(postList, 'postList')
                  renderList(postList);
              }
          }
      });
  
      const URL_FIREBASE = 'https://nestorfirebase-default-rtdb.firebaseio.com/PruebaPost.json';
  
      xhr.open('GET', URL_FIREBASE );
      xhr.send();
  };
  
  
  
  const inputs = document.querySelectorAll(".form-control");
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
        post.imgPost = 'https://res.cloudinary.com/practicaldev/image/fetch/s--EVx0f1n5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jtobjdvwkwsy4htgaqp8.png'
      }
  
      if (event.target.name === "fullPost") {
        post.fullPost = event.target.value;
        post.date ="12-May-2022"
        post.autorName = "Ben Halpern"
        post.coments ='[]'
      }
  
  
    });
  });
  
  button.addEventListener("click", (event) => {
    postList.push(post);
   
    
    onPostRequest(post);
    //renderList(postList);
  });
  
  const postdev = document.querySelector(".post");
  
  const createPost = (post, index) => {
    const titlePost = document.createElement("h1");
    const parrafo = document.createElement("p");
    const tagsPost = document.createElement("span");
  
    postdev.appendChild(titlePost);
    postdev.appendChild(tagsPost);
    postdev.appendChild(parrafo);
  
  
    const textTitle = document.createTextNode(`${post.title}`);
    const textParrafo = document.createTextNode(`${post.fullPost} `);
    const textTags = document.createTextNode(`${post.hastags}`);
  
    titlePost.appendChild(textTitle);
    parrafo.appendChild(textParrafo);
    tagsPost.appendChild(textTags);
  
    const button = document.createElement("button");
    button.classList.add("btn-danger");
    button.classList.add("btn");
    button.textContent = "Editar";
    button.setAttribute("id", post.id);
    parrafo.appendChild(button);
    //     button.addEventListener('click', (event) => {
    //         const removeId = event.target.id;
    //         onDeleteRequest(removeId)
    //         // renderList()
    //     });
  };
  
  const renderList = (postListNew) => {
    while (postdev.children.length > 0) {
      postdev.firstChild.remove();
    }
    postListNew.forEach((post) => {
      createPost(post);
    });
  };
  //document.body.appendChild(postdev);
  //renderList(postList);