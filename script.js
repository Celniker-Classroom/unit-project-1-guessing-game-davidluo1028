let playerName = prompt("Enter your name:");
if (!playerName || playerName.trim() === "") {
    playerName = "Player";
} else {
    playerName = playerName.trim();
    playerName = playerName.charAt(0).toUpperCase() +
                 playerName.slice(1).toLowerCase();
}

let answer = 0;
let range = 3;
let guessCount = 0;
let wins = 0;
let totalGuesses = 0;
let scores = [];
let startTime = 0;
let fastest = null;
let totalTime = 0;
let rounds = 0;
let stopwatchInterval = null;

function getSuffix(d) {
    if (d >= 11 && d <= 13) return "th";
    if (d % 10 === 1) return "st";
    if (d % 10 === 2) return "nd";
    if (d % 10 === 3) return "rd";
    return "th";
}

function time() {
    const now = new Date();
    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    let h = String(now.getHours()).padStart(2, "0");
    let m = String(now.getMinutes()).padStart(2, "0");
    let s = String(now.getSeconds()).padStart(2, "0");

    return `${months[now.getMonth()]} ${now.getDate()}${getSuffix(now.getDate())}, ${now.getFullYear()} ${h}:${m}:${s}`;
}

document.getElementById("date").textContent = time();
setInterval(() => {
    document.getElementById("date").textContent = time();
}, 1000);

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        const elapsed = (new Date().getTime() - startTime) / 1000;
        document.getElementById("stopwatch").textContent =
            `Round Time: ${elapsed.toFixed(1)} seconds`;
    }, 100);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function play() {
    range = parseInt(document.querySelector('input[name="level"]:checked').value);
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();
    startStopwatch();

    document.getElementById("msg").textContent =
        `${playerName}, guess a number between 1 and ${range}`;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    document.querySelectorAll('input[name="level"]').forEach(r => r.disabled = true);
    document.getElementById("guess").value = "";
}

function makeGuess() {
    let g = parseInt(document.getElementById("guess").value);
    if (isNaN(g) || g < 1 || g > range) return;

    guessCount++;
    let msg = "";

    if (g > answer) {
        msg = "high";
    } else if (g < answer) {
        msg = "low";
    } else {
        document.getElementById("msg").textContent = `${playerName} correct`;
        wins++;
        totalGuesses += guessCount;
        updateScore(guessCount);
        updateTimers(new Date().getTime());
        stopStopwatch();
        launchConfetti();
        resetRound();
        return;
    }

    let diff = Math.abs(g - answer);
    if (diff <= 2) msg += " hot";
    else if (diff <= 5) msg += " warm";
    else msg += " cold";

    document.getElementById("msg").textContent = `${playerName} ${msg}`;
    document.getElementById("guess").value = "";
}

function updateScore(score) {
    scores.push(score);
    rounds++;

    document.getElementById("wins").textContent = `Total wins: ${wins}`;

    if (wins > 0) {
        document.getElementById("avgScore").textContent =
            `Average Score: ${Math.round(totalGuesses / wins)}`;
    } else {
        document.getElementById("avgScore").textContent =
            `Average Score: --`;
    }

    scores.sort((a, b) => a - b);
    let items = document.getElementsByName("leaderboard");
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = scores[i] !== undefined ? scores[i] : "--";
    }
}

function giveUp() {
    document.getElementById("msg").textContent =
        `${playerName} gave up correct was ${answer}`;

    scores.push(range);
    rounds++;
    updateTimers(new Date().getTime());
    stopStopwatch();

    scores.sort((a, b) => a - b);
    let items = document.getElementsByName("leaderboard");
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = scores[i] !== undefined ? scores[i] : "--";
    }

    resetRound();
}

function updateTimers(end) {
    let elapsed = (end - startTime) / 1000;
    totalTime += elapsed;

    if (fastest === null || elapsed < fastest) fastest = elapsed;

    document.getElementById("fastest").textContent =
        `Fastest Game: ${fastest.toFixed(2)}`;
    document.getElementById("avgTime").textContent =
        `Average Time: ${(totalTime / rounds).toFixed(2)}`;
}

function resetRound() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.querySelectorAll('input[name="level"]').forEach(r => r.disabled = false);
}

function resetGame() {
    answer = 0;
    range = 3;
    guessCount = 0;
    wins = 0;
    totalGuesses = 0;
    scores = [];
    startTime = 0;
    fastest = null;
    totalTime = 0;
    rounds = 0;

    stopStopwatch();
    document.getElementById("stopwatch").textContent = "Round Time: 0.0 seconds";

    document.getElementById("msg").textContent = "Select a Level";
    document.getElementById("wins").textContent = "Total wins: 0";
    document.getElementById("avgScore").textContent = "Average Score: --";
    document.getElementById("fastest").textContent = "Fastest Game: --";
    document.getElementById("avgTime").textContent = "Average Time: --";

    let items = document.getElementsByName("leaderboard");
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = "--";
    }

    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.querySelectorAll('input[name="level"]').forEach(r => r.disabled = false);
    document.getElementById("e").checked = true;
}

document.getElementById("modeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});

function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
        });
    }

    let confettiInterval = setInterval(animate, 20);
    setTimeout(() => {
        clearInterval(confettiInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
document.getElementById("resetBtn").addEventListener("click", resetGame);