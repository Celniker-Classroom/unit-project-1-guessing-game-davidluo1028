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