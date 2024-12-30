let timerDisplay = document.querySelector('.timerDisplay');
let stopBtn = document.getElementById('stopBtn');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.createElement('button');
let lapContainer = document.querySelector('.laptime');

lapBtn.id = 'lapBtn';
lapBtn.textContent = 'Lap';
lapBtn.className = 'btn';
lapBtn.style.setProperty('--clr', 'orange');
document.querySelector('.buttons').appendChild(lapBtn);

let msec = 0;
let secs = 0;
let mins = 0;
let timerId = null;
let lapCounter = 1;

// Event Listener for Start Button
startBtn.addEventListener('click', function () {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);
});

// Event Listener for Stop Button
stopBtn.addEventListener('click', function () {
    clearInterval(timerId);
});

// Event Listener for Reset Button
resetBtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 0;
    lapContainer.innerHTML = ''; // Clear lap times
    lapCounter = 1; // Reset lap counter
});

// Event Listener for Lap Button
lapBtn.addEventListener('click', function () {
    if (timerId !== null) {
        const lapTime = `${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
        lapContainer.appendChild(lapElement);
        lapCounter++;
    }
});

// Timer Function
function startTimer() {
    msec++;
    if (msec === 100) {
        msec = 0;
        secs++;
        if (secs === 60) {
            secs = 0;
            mins++;
        }
    }

    timerDisplay.innerHTML = `${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`;
}

// Helper Function to Format Time
function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}
