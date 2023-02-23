//search elements
const time = document.querySelector(".time");
const dateToday = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector(".body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const quoteButton = document.querySelector(".change-quote");

city.value = "Moscow";
getWeather();

const date = new Date();

//get time of day
const getTimeOfDay = () => {
  const hours = date.getHours();
  if (hours >= 6 && hours <= 12) {
    return "morning";
  } else if (hours > 12 && hours <= 18) {
    return "afternoon";
  } else if (hours > 18 && hours <= 22) {
    return "evening";
  } else {
    return "night";
  }
};

/*---------- PICTURE BLOCK ----------*/
//get random number
const getRandomNum = () => {
  return Math.ceil(Math.random() * 20);
};

//set background pic
let randomNum = getRandomNum();

const setBg = () => {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, "0");
  console.log(bgNum);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};

setBg();

const getSlideNext = () => {
  if (randomNum < 20) {
    randomNum = randomNum + 1;
    setBg();
    console.log(`по порядку:${randomNum}`);
  } else if (randomNum === 20) {
    randomNum = 1;
    setBg();
  }
};

const getSlidePrev = () => {
  if (randomNum > 1) {
    randomNum = randomNum - 1;
    setBg();
  } else if (randomNum === 1) {
    randomNum = 20;
    setBg();
  }
};

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
/*---------- DATA, TIME, GREETING ----------*/
//greeting
const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
};

//data
const showDate = () => {
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
    year: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-Br", options);
  dateToday.textContent = `${currentDate}`;
};

//time
const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = `${currentTime}`;
  showGreeting();
  showDate();
  setTimeout(showTime, 1000); //рекурсивный сетТаймаут
};

showTime();

/* ---------- LOCAL STORAGE - хранилище браузера. ---------- */

//перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

//перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather();
  }
}
window.addEventListener("load", getLocalStorage);

/*---------- WEATHER ----------*/
//async перед функцией гарантирует, что эта функция в любом случае вернёт промис
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=aae587ac736256664c86de685126b6dc&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

city.addEventListener("keypress", setCity);

/*---------- QUOTES ----------*/
let array = [];
async function getQuotes() {
  const listSrc = "../data.json";
  const res = await fetch(listSrc);
  const data = await res.json();
  array = data;

  showQuotes();
}

getQuotes();

function showQuotes() {
  const quoteText = document.querySelector(".quote");
  const quoteAuthor = document.querySelector(".author");

  const randomPos = Math.ceil(Math.random() * array.length);
  console.log(randomPos);
  let quote = array[randomPos];

  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}

quoteButton.addEventListener("click", getQuotes);

/*---------- PLAYER ----------*/
