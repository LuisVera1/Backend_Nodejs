
const URL = 'https://kdm1-11734-default-rtdb.firebaseio.com/DevTo/';
let dataHash = sessionStorage.getItem('Hash');
//console.log(data);












function getData() {
	const xhr = new XMLHttpRequest();
	const URL_FIREBASE = URL + dataHash +'.json';
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
	xhr.open("GET",URL_FIREBASE);
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






};



//Date format to cards
function showDate(strDate) {
	let res;
	let dmy = strDate.split("-");

	let month ={
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "Jun",
		"07": "Jul",
		"08": "Ago",
		"09": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	}

	let d = dmy[0];
	let m = month[dmy[1]];
	let y = dmy[2];

	if(y === "22"){
		res = "Posted on" + d + " " + m
	} else{
		res = "Posted on" + d + " " + m + " " + y
	}
return res
}