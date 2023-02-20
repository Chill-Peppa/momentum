/* ---------- TASK 1 ----------*/
//search elements
const time = document.querySelector(".time");
const dateToday = document.querySelector(".date");

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
  setTimeout(showTime, 1000); //рекурсивный сетТаймаут
  showDate();
}

showTime();
