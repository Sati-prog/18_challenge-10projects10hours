"use strict";

const daysEl = document.querySelector('#days'),
      hoursEl = document.querySelector('#hours'),
      minutesEl = document.querySelector('#minutes'),
      secondsEl = document.querySelector('#seconds');

const vacationTime = "1 Jan 2023";

function countdown() {

    const vacationTimeDate = new Date(vacationTime),
          currentDate = new Date();

    const totalSeconds = (vacationTimeDate - currentDate) / 1000,
          days = Math.floor(totalSeconds / 3600 / 24),
          hours = Math.floor(totalSeconds / 3600) % 24,
          minutes = Math.floor(totalSeconds / 60) % 60,
          seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

countdown();

function formatTime(time) {

    return time < 10 ? (`0${time}`) : time;
}

// initial call
setInterval(countdown, 1000);