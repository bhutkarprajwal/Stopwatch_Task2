let displayTime = document.getElementById("time");
let displayTimeMilli = document.getElementById("milliseconds");
let [millisec, seconds, minutes, hours] = [0, 0, 0, 0];
let resetbtn = document.getElementById("reset");
let playbtn = document.getElementById("play-pause");
let lapbtn = document.getElementById("lap");
let downloadBtn = document.getElementById("download-laps");
let timer = null;
let running = false;
let lapcontainer = document.getElementById("lap-list");
let progressBar = document.getElementById("progress-bar");
let laps = [];

function stopwatch() {
    millisec++;
    if (millisec == 100) {
        millisec = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    display();
    updateProgressBar();
}

function display() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let mi = millisec < 10 ? "0" + millisec : millisec;

    displayTime.innerHTML = `${h}:${m}:${s}`;
    displayTimeMilli.innerHTML = mi;
}

function watchStartPause() {
    if (!running) {
        timer = setInterval(stopwatch, 10);
        playbtn.innerText = "Pause";
        running = true;
    } else {
        clearInterval(timer);
        playbtn.innerText = "Play";
        running = false;
    }
}

function watchReset() {
    clearInterval(timer);
    [millisec, seconds, minutes, hours] = [0, 0, 0, 0];
    display();
    updateProgressBar();
    playbtn.innerText = "Play";
    running = false;

    // Remove all laps
    lapcontainer.innerHTML = "";
    laps = [];
}

function watchLap() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let mi = millisec < 10 ? "0" + millisec : millisec;

    let lapTime = `${h}:${m}:${s}:${mi}`;
    laps.push(lapTime);

    let li = document.createElement("li");
    li.innerText = `Lap ${laps.length}: ${lapTime}`;
    lapcontainer.append(li);

    lapcontainer.scrollTop = lapcontainer.scrollHeight;
}

function updateProgressBar() {
    // Progress bar fills up every minute
    let percent = ((seconds * 100 + millisec) / 6000) * 100;
    progressBar.style.width = `${percent}%`;
}

function downloadLaps() {
    if (laps.length === 0) return;
    let content = laps.map((lap, i) => `Lap ${i + 1}: ${lap}`).join("\n");
    let blob = new Blob([content], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "laps.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
playbtn.addEventListener("click", watchStartPause);
resetbtn.addEventListener("click", watchReset);
lapbtn.addEventListener("click", watchLap);
downloadBtn.addEventListener("click", downloadLaps);

// Initial display
display();
updateProgressBar();



