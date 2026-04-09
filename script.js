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