
//const URL = 'https://kdm1-11734-default-rtdb.firebaseio.com/DevTo/';
let dataHash = sessionStorage.getItem('Hash');
const URL = "http://localhost:8000/" + dataHash
console.log(URL);












function getData() {
	const xhr = new XMLHttpRequest();
	//const URL_FIREBASE = URL + dataHash +'.json';
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
        const response = JSON.parse(xhr.response)
        // console.log("ok");
        // console.log(response);
        loadData(response);

        
			}
		};
	};
	xhr.open("GET",URL);
	xhr.send();	
}
getData();


function addReactions(num) {
  let min;
  num > 3 ? min = 1: min = 0;
  let max = Math.floor(num/3);

  let unicorn = Math.floor(Math.random() * (max - min)) + min;
  let save = Math.floor(Math.random() * (max - min)) + min;
  let heart = num - unicorn - save;

  //Labels update
  let heartE = document.querySelector("#reaction1");
  heartE.textContent = heart;
  let unicornE = document.querySelector("#reaction2");
  unicornE.textContent = unicorn;
  let saveE = document.querySelector("#reaction3");
  saveE.textContent = save;
}


function loadData(data){
  //Autor´s name
  let nameCard = document.querySelector("#autorCard")
  nameCard.textContent = data.autorName;
  let moreFrom = document.querySelector(".LinkBlue")
  moreFrom.textContent = data.autorName;
  let namePost = document.querySelector(".Name");
  namePost.textContent = data.autorName;

  //# of reactions
  addReactions(data.reactions);

  //Thumbnail image
  let imgTmb = document.querySelectorAll(".ImgTmb")
  imgTmb.forEach((item) =>{
    item.src = "img/" + data.autorName + ".png"
  });

  //Top imagen
  let imageArticle = document.querySelector("#imgTitleArticle")
  imageArticle.src = data.imgPost

  //title
  let title = document.querySelector("#articleTitle")
  title.textContent = data.title;

  //date
  let date = document.querySelector('#date');
  date.textContent = showDate(data.date)

  //hastags
  let hastagElement = document.querySelector(".Hashtags")
  data.hastags.forEach((item) => {
    let createHastag = document.createElement('a');
    createHastag.classList.add("LinksHashtags", "FGray");
    createHastag.setAttribute("href","#");
    createHastag.textContent = item;
    hastagElement.appendChild(createHastag);
  });

  //Text article
  let mainArticle = document.querySelector("#textArticle");
  mainArticle.textContent = data.fullPost;

//num comments
let discussion = document.querySelector('#numComments')
discussion.textContent = `Discussion (${data.coments.length})`




//comments
let comment = document.querySelector("#listComments")

data.coments.forEach(item =>{
  let square = document.createElement('div');
  let messaje = document.createElement('p');
  messaje.textContent = item;
  square.appendChild(messaje);
  square.classList.add("tableComment");
  comment.appendChild(square);
})




};



//Date format to cards
function showDate(strDate) {
	let res;
	let dmy = strDate.split("-");

	let month ={
		"1": "Jan",
		"2": "Feb",
		"3": "Mar",
		"4": "Apr",
		"5": "May",
		"6": "Jun",
		"7": "Jul",
		"8": "Ago",
		"9": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	}

	let d = dmy[0];
	let m = month[dmy[1]];
	let y = dmy[2];

	if(y === "2022"){
		res = "Posted on" + d + " " + m
	} else{
		res = "Posted on" + d + " " + m + " " + y
	}
return res
}