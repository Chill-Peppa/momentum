//search elements
const time = document.querySelector(".time");
const dateToday = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector(".body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

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

slideNext.addEventListener("click", getSlideNext);

const getSlidePrev = () => {
  if (randomNum > 1) {
    randomNum = randomNum - 1;
    setBg();
  } else if (randomNum === 1) {
    randomNum = 20;
    setBg();
  }
};

slidePrev.addEventListener("click", getSlidePrev);

//greeting
const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
};

//data
const showDate = () => {
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-EN", options);
  dateToday.textContent = `${currentDate}`;
};

//time
const showTime = () => {
  const currentTime = date.toLocaleTimeString();
  time.textContent = `${currentTime}`;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000); //рекурсивный сетТаймаут
};

showTime();

/* ---------- local storage - хранилище браузера. ---------- */

//перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

//перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);
