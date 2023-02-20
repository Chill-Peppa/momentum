//search elements
const time = document.querySelector(".time");
const dateToday = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
//get time of day
const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours <= 12) {
    return "morning,";
  } else if (hours > 12 && hours <= 18) {
    return "afternoon,";
  } else if (hours > 18 && hours <= 22) {
    return "evening,";
  } else {
    return "night,";
  }
};

//greeting
const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
};

//data
function showDate() {
  const date = new Date();
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-EN", options);
  dateToday.textContent = `${currentDate}`;
}

//time
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = `${currentTime}`;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000); //рекурсивный сетТаймаут
}

showTime();

//local storage - хранилище браузера.

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
