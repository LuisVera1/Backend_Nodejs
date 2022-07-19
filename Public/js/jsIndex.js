let blog = 'blog.html';
const URL = 'http://localhost:8000';

//DB reading
function getData() {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				numCard = 0;
				const response = JSON.parse(xhr.response);
				for (let property in response) {
					createCard(response[property], response[property]._id);
				}
			}
		}
	};
	xhr.open('GET', URL); //xhr.open("GET",URL_FIREBASE);
	xhr.send();
}
getData();

//Date format to cards
function showDate(strDate) {
	let res;
	let dmy = strDate.split('-');

	let month = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Ago',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec',
	};

	let d = dmy[0];
	let m = month[dmy[1]];
	let y = dmy[2];

	if (y === '2022') {
		res = m + ' ' + d;
	} else {
		res = m + ' ' + d + " '" + y;
	}
	return res;
}

//function to Create card
let numCard = 0;
let main = document.querySelector('#mainContent');
function createCard(data, hash) {
	if (numCard == 0) {
		let imgTop = document.querySelector('#ImgTop');
		imgTop.src = data.imgPost;
		numCard++;
	}

	//Head
	let row = document.createElement('div');
	row.classList.add('row', 'fullCard'); //hash
	let card = document.createElement('div');
	card.classList.add('card');
	let CardHead = document.createElement('div');
	CardHead.classList.add('CardHead');
	let img = document.createElement('img');
	img.classList.add('ImgTmb');
	img.src = 'img/' + data.autorName + '.png';
	let cardTitleHead = document.createElement('div');
	cardTitleHead.classList.add('CardTitleHead');

	let Name = document.createElement('div');
	Name.classList.add('Name');
	Name.textContent = data.autorName;
	let date = document.createElement('div');
	date.classList.add('FS12', 'FGray');
	date.textContent = showDate(data.date);

	cardTitleHead.appendChild(Name);
	cardTitleHead.appendChild(date);
	CardHead.appendChild(img);
	CardHead.appendChild(cardTitleHead);
	card.appendChild(CardHead);

	//Body
	let CardBody = document.createElement('div');
	CardBody.classList.add('CardBody');
	let ArticleName = document.createElement('div');
	ArticleName.classList.add('ArticleName');
	let LinkArticle = document.createElement('a');
	LinkArticle.classList.add('LinkArticle');
	LinkArticle.textContent = data.title;
	LinkArticle.setAttribute('href', blog);
	LinkArticle.setAttribute('data-post', hash);
	let Hashtags = document.createElement('div');
	Hashtags.classList.add('Hashtags');

	ArticleName.appendChild(LinkArticle);
	CardBody.appendChild(ArticleName);
	CardBody.appendChild(Hashtags);

	data.hastags.forEach((item) => {
		let listHastags = document.createElement('a');
		listHastags.setAttribute('href', '#');
		listHastags.classList.add('LinksHashtags', 'FGray');
		listHastags.text = item;
		Hashtags.appendChild(listHastags);
	});
	card.appendChild(CardBody);

	//footer
	let CardFoot = document.createElement('div');
	CardFoot.classList.add('CardFoot');

	let heart = document.createElement('button');
	heart.setAttribute('type', 'button');
	heart.classList.add('btn', 'btn-sm', 'LinkReactions');
	let imgHeart = document.createElement('img');
	imgHeart.classList.add('Reactions');
	imgHeart.src = 'img/Heart.png';
	heart.appendChild(imgHeart);
	let txtH = document.createTextNode(data.reactions + ' reactions');
	heart.appendChild(txtH);

	let globe = document.createElement('button');
	globe.setAttribute('type', 'button');
	globe.classList.add('btn', 'btn-sm', 'LinkReactions');
	let imgGlobe = document.createElement('img');
	imgGlobe.classList.add('Reactions');
	imgGlobe.src = 'img/Gb.png';
	globe.appendChild(imgGlobe);
	let numComments = data.coments.length;
	let txtG = document.createTextNode(numComments + ' comments');
	globe.appendChild(txtG);

	let Spacer = document.createElement('div');
	Spacer.classList.add('Spacer');

	let readingTime = document.createElement('div');
	readingTime.classList.add('FS12', 'FGray', 'p-1');
	let minutes = Math.floor(Math.random() * (15 - 3)) + 3;
	readingTime.textContent = minutes + ' min read';

	let btnDelete = document.createElement('button');
	btnDelete.setAttribute('type', 'button');
	//btnDelete.setAttribute("data-hash", hash)
	btnDelete.classList.add('btn', 'btn-sm', 'Save');
	btnDelete.textContent = 'Save'; //se cambia el delete por no necesitar la funcion

	CardFoot.appendChild(heart);
	CardFoot.appendChild(globe);
	CardFoot.appendChild(Spacer);
	CardFoot.appendChild(readingTime);
	CardFoot.appendChild(btnDelete);
	card.appendChild(CardFoot);

	row.appendChild(card);
	main.appendChild(row);
}

main.addEventListener('click', (event) => {
	if (event.target.dataset.post) {
		sessionStorage.setItem('Hash', event.target.dataset.post);
	}
});
