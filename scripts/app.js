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
    setTime.style.border = "2px solid #333";
    remainingMin = parseInt(setTime.value) - 1;
    totalSecs = parseInt(setTime.value) * 60;
    setTime.disabled = true;
});

function timerComplete() {
    resetTime();
    popup.innerHTML = `<span>Timer Completed</span>`;
    popup.style.backgroundColor = "lightgreen";
    progress.style.background = `conic-gradient(salmon 0deg, #212121 0deg)`;
    displayPopup();
}

// update display time
function updateTime() {
    timer = setInterval(() => {
        deg += 360 / totalSecs;
        if (deg > 360) {
            timerComplete();
        } else {
            if (deg <= 360) {
                if (remainingSec > 0) {
                    remainingSec--;
                } else {
                    remainingMin--;
                    remainingSec = 59;
                }
                renderTime();
            }
        }
    }, 1000);
}

// formatting display time
function formatTime(time) {
    return time.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
    });
}

// render time in display
function renderTime() {
    progress.style.background = `conic-gradient(#747fff ${deg}deg, #212121 0deg)`;
    displayTime.innerHTML = `<span>${formatTime(remainingMin)}:${formatTime(
        remainingSec
    )}</span>`;
}

// alert popup
let popup = document.querySelector(".alert");

function displayPopup() {
    popup.style.opacity = 1;
    popup.style.transform = "translateX(0)";
    setTimeout(() => {
        popup.style.opacity = 0;
        popup.style.transform = "translateX(100%)";
    }, 2500);
}

startTimer.addEventListener("click", () => {
    if (!setTime.value) {
        setTime.style.border = "2px solid salmon";
        popup.innerHTML = `<span>Please enter minutes</span>`;
        popup.style.backgroundColor = "salmon";
        displayPopup();
    } else if (setTime.value < 0 || isNaN(setTime.value)) {
        setTime.style.border = "2px solid salmon";
        popup.innerHTML = `<span>Please set a valid time</span>`;
        popup.style.backgroundColor = "salmon";
        displayPopup();
    } else if (setTime.value > 60) {
        setTime.style.border = "2px solid salmon";
        popup.innerHTML = `<span>Set time less than or equal to 60</span>`;
        popup.style.backgroundColor = "salmon";
        displayPopup();
    } else {
        updateTime();
    }
});

// resetting the fields
function resetTime() {
    setTime.disabled = false;
    clearInterval(timer);
    remainingMin = 0;
    remainingSec = 60;
    deg = 0;
    progress.style.background = `conic-gradient(salmon 0deg, #212121 0deg)`;
    displayTime.innerHTML = `<span>00:00</span>`;
    setTime.value = "";
    setTime.style.border = "2px solid #333";
}

resetTimer.addEventListener("click", resetTime);
