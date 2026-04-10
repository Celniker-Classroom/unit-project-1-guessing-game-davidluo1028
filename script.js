// Player Name
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
let fastestTime = null;
let totalTime = 0;
let gamesPlayed = 0;

// Date 
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function time() {
    const now = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[now.getMonth()];
    const day = now.getDate();
    const suffix = getDaySuffix(day);
    const year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    return `${month} ${day}${suffix}, ${year} ${hours}:${minutes}:${seconds}`;
}

// Live Time Display
document.getElementById("date").textContent = time();
setInterval(() => {
    document.getElementById("date").textContent = time();
}, 1000);

// Functions 
function play() {
    const selectedLevel = document.querySelector('input[name="level"]:checked');
    range = parseInt(selectedLevel.value);

    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent =
        `${playerName}, I'm thinking of a number between 1 and ${range}. Make a guess!`;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    document.querySelectorAll('input[name="level"]').forEach(radio => {
        radio.disabled = true;
    });

    document.getElementById("guess").value = "";
}

// Guessing
function makeGuess() {
    const guessInput = document.getElementById("guess");
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > range) {
        document.getElementById("msg").textContent =
            `${playerName}, please enter a valid number between 1 and ${range}.`;
        return;
    }

    guessCount++;
    let message = "";

    if (guess > answer) {
        message = "Too high";
    } else if (guess < answer) {
        message = "Too low";
    } else {
        message = `Correct! Great job, ${playerName}!`;
        document.getElementById("msg").textContent = message;

        updateScore(guessCount);
        updateTimers(new Date().getTime());
        reset();
        return;
    }

    const diff = Math.abs(guess - answer);
    if (diff <= 2) {
        message += " - Hot!";
    } else if (diff <= 5) {
        message += " - Warm!";
    } else {
        message += " - Cold!";
    }

    document.getElementById("msg").textContent = `${playerName}, ${message}`;
    guessInput.value = "";
}

// Score
function updateScore(score) {
    scores.push(score);
    gamesPlayed++;

    if (score !== range) {
        wins++;
        totalGuesses += score;
    }

    document.getElementById("wins").textContent = `Total wins: ${wins}`;

    if (wins > 0) {
        const avgScore = (totalGuesses / wins).toFixed(2);
        document.getElementById("avgScore").textContent =
            `Average Score: ${avgScore}`;
    } else {
        document.getElementById("avgScore").textContent =
            "Average Score: --";
    }

    updateLeaderboard();
}

// Leaderboard
function updateLeaderboard() {
    scores.sort((a, b) => a - b);
    const leaderboardItems = document.getElementsByName("leaderboard");

    for (let i = 0; i < leaderboardItems.length; i++) {
        if (i < scores.length) {
            leaderboardItems[i].textContent = scores[i];
        } else {
            leaderboardItems[i].textContent = "--";
        }
    }
}

// Give Up
function giveUp() {
    document.getElementById("msg").textContent =
        `${playerName}, you gave up! The correct number was ${answer}.`;

    updateScore(range);
    updateTimers(new Date().getTime());
    reset();
}

// Timer 
function updateTimers(endMs) {
    const elapsedSeconds = (endMs - startTime) / 1000;
    totalTime += elapsedSeconds;

    if (fastestTime === null || elapsedSeconds < fastestTime) {
        fastestTime = elapsedSeconds;
    }

    const avgTime = totalTime / gamesPlayed;

    document.getElementById("fastest").textContent =
        `Fastest Game: ${fastestTime.toFixed(2)} seconds`;

    document.getElementById("avgTime").textContent =
        `Average Time: ${avgTime.toFixed(2)} seconds`;
}