// ! Anuj API Key
const API_KEY1 = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// ! Jarvish API Key
const API_KEY2 = "bc20b28d1df6424c8057e7cc3e28d2db";
const url = "https://newsapi.org/v2/everything?q=";

// ! Const / Variables Declarations
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const exitIcon = document.querySelector(".exit-icon");
const searchIconOne = document.querySelector("#search-icon-one");
const searchIconTwo = document.querySelector("#search-icon-two");
const searchIconThree = document.querySelector("#search-icon-three");
const closeSearchBar = document.querySelector(".search-close");
const searchBar = document.querySelector(".search-bar");
const inputTextOne = document.querySelector("#input-text-one");
const inputTextTwo = document.querySelector("#input-text-two");
const navLogo = document.querySelector(".nav-logo");
const alertBox = document.querySelector(".alert-window");
const errorMessage = document.querySelector("#error-message");
// ! Fetch API Key

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
	try {
		const response = await fetch(`${url}${query}&apiKey=${API_KEY1}`);
		const data = await response.json();
		bindData(data.articles);
	} catch (error) {
		try {
			const response = await fetch(`${url}${query}&apiKey=${API_KEY2}`);
			const data = await response.json();
			bindData(data.articles);
		} catch (error) {
			errorMessage.innerHTML = `${error}`;
			console.log(error);
			alertBox.classList.toggle("active");
		}
	}
}

function bindData(articles) {
	const cardsContainer = document.querySelector("#cards-container");
	const newsCardsTemplate = document.querySelector("#news-card-template");

	if (articles) {
		cardsContainer.innerHTML = "";
	}

	articles.forEach((article) => {
		if (!article.urlToImage) return;
		const cardClone = newsCardsTemplate.content.cloneNode(true);
		fillDataInCard(cardClone, article);
		cardsContainer.appendChild(cardClone);
	});
}

function fillDataInCard(cardClone, article) {
	const newsImage = cardClone.querySelector("#news-image");
	const newsTitle = cardClone.querySelector("#news-title");
	const newsSource = cardClone.querySelector("#news-source");
	const newsDate = cardClone.querySelector("#news-date");
	const newsDesc = cardClone.querySelector("#news-desc");

	const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
		timeZone: "Asia/Jakarta",
	});
	newsImage.src = article.urlToImage;
	newsTitle.innerHTML = article.title;
	newsSource.innerHTML = article.source.name;
	newsDate.innerHTML = date;
	newsDesc.innerHTML = article.description;

	cardClone.firstElementChild.addEventListener("click", () => {
		window.open(article.url, "_blank");
	});
}

searchIconOne.addEventListener("click", () => {
	const query = inputTextOne.value;
	fetchNews(query);
	console.log(query);
	inputTextOne.value = "";
	curSelectedNav?.classList.remove("active");
});
searchIconThree.addEventListener("click", () => {
	const query = inputTextTwo.value;
	fetchNews(query);
	console.log(query);
	inputTextTwo.value = "";
});

// ! Selected Nav
let curSelectedNav = null;
function onNavItemClick(id) {
	fetchNews(id);
	const navItem = document.getElementById(id);
	curSelectedNav?.classList.remove("active");
	curSelectedNav = navItem;
	curSelectedNav.classList.add("active");
}

function onMenuItemClick(id) {
	fetchNews(id);
	menu.classList.toggle("active");
	curSelectedNav?.classList.remove("active");
}

function onFooterItemClick(query) {
	fetchNews(query);
	curSelectedNav?.classList.remove("active");
}

// ! Events Declarations
// ? Nav Logo
navLogo.addEventListener("click", () => fetchNews("india"));
// ? Menu Button
menuBtn.addEventListener("click", () => {
	menu.classList.toggle("active");
});
// ? Menu Exit Button
exitIcon.addEventListener("click", () => {
	menu.classList.toggle("active");
});
// ? Search Icon
searchIconTwo.addEventListener("click", () => {
	searchBar.classList.toggle("active");
	searchIconTwo.classList.toggle("active");
	closeSearchBar.classList.toggle("active");
});
// ? Close Search Bar
searchIconThree.addEventListener("click", () => {
	searchBar.classList.toggle("active");
	searchIconTwo.classList.toggle("active");
	closeSearchBar.classList.toggle("active");
});
closeSearchBar.addEventListener("click", () => {
	searchIconTwo.classList.toggle("active");
	searchBar.classList.toggle("active");
	closeSearchBar.classList.toggle("active");
});

// ? Function Alert
function alertClose() {
	alertBox.classList.toggle("active");
	fetchNews("India");
}
