const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 1;

// Format Time
function formatTime(time) {

    const hrs = Math.floor(time / 3600000);
    const mins = Math.floor((time % 3600000) / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    const millis = time % 1000;

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(millis).padStart(3, "0");
}

// Start Stopwatch
function startStopwatch() {

    if (running) return;

    running = true;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {

        elapsedTime = Date.now() - startTime;

        formatTime(elapsedTime);

    }, 10);

}

// Pause Stopwatch
function pauseStopwatch() {

    if (!running) return;

    clearInterval(timerInterval);

    running = false;

}

// Reset Stopwatch
function resetStopwatch() {

    clearInterval(timerInterval);

    running = false;

    elapsedTime = 0;

    lapCount = 1;

    formatTime(0);

    lapList.innerHTML = "";

}

// Record Lap
function recordLap() {

    if (elapsedTime === 0) return;

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>
            ${hours.textContent}:${minutes.textContent}:${seconds.textContent}.${milliseconds.textContent}
        </span>
    `;

    lapList.prepend(lap);

    lapCount++;

}

// Button Events
startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

resetBtn.addEventListener("click", resetStopwatch);

lapBtn.addEventListener("click", recordLap);

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {

    switch (e.key.toLowerCase()) {

        case "s":
            startStopwatch();
            break;

        case "p":
            pauseStopwatch();
            break;

        case "r":
            resetStopwatch();
            break;

        case "l":
            recordLap();
            break;

    }

});

// Initial Display
formatTime(0);