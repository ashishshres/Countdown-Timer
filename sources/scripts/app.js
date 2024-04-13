// buttons
let startTimer = document.querySelector(".start");
let resetTimer = document.querySelector(".reset");

// inputs
let setTime = document.querySelector("#time");

// display
let displayTime = document.querySelector(".overlay");
let progress = document.querySelector(".container");

// time
let totalSecs;
let remainingMin = 0;
let remainingSec = 60;
let deg = 0;
let timer;

setTime.addEventListener("input", () => {
    remainingMin = parseInt(setTime.value) - 1;
    totalSecs = parseInt(setTime.value) * 60;
});

// update display time
function updateTime() {
    timer = setInterval(() => {
        if (remainingSec > 0) {
            remainingSec--;
        } else {
            remainingMin--;
            remainingSec = 59;
        }
        renderTime();
    }, 1000);
}

// render time in display
function renderTime() {
    displayTime.innerHTML = `<span>${remainingMin}:${remainingSec}</span>`;
}

startTimer.addEventListener("click", updateTime);

// resetting the fields
function resetTime() {
    clearInterval(timer);
    remainingMin = 0;
    remainingSec = 60;
    deg = 0;
    displayTime.innerHTML = `<span>00:00</span>`;
    setTime.value = "";
}

resetTimer.addEventListener("click", resetTime);
