"use strict";
import Sprite from "./sprite.js"
import Zombie from "./zombie.js"

const BACKGROUND_SPRITE = new Sprite("board-bg.jpg");
const ZOMBIE_SPRITE = new Sprite("walkingdead.png", 10);
const FULL_HEART_SPRITE = new Sprite("full_heart.png", 1, 100, 100);
const EMPTY_HEART_SPRITE = new Sprite("empty_heart.png", 1, 100, 100);
const AIM_SPRITE = new Sprite("aim.png", 1, 200, 200);
const AUDIO = new Audio('sad-music.mp3');
const DEBUG_MODE = false;

function init() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");
    const finalScoreP = document.getElementById("final-score");
    const maxScoreP = document.getElementById("max-score");
    const gameOverH = document.getElementById("game-over-h");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    let gameWorking = false;
    let hearts = 0;
    let score = 0;
    let maxScore = localStorage.getItem("maxScore") || score;
    maxScoreP.innerText = `Max score: ${maxScore}`;
    const zombies = [];
    let oldTimeStamp = 1;
    let cursorX = -200;
    let cursorY = -200;
    let zombieSpawnInterval = 3000; 
    let difficultyIncreaseInterval = 10000;
    let lastDifficultyIncrease = Date.now();
    let zombieInterval = null;
    let difLevel = 1;

    startButton.addEventListener("click", startGame);

    function startGame() {
        gameWorking = true;
        hearts = 3;
        score = 0;
        zombies.length = 0;
        canvas.style.filter = "unset";
        startScreen.style.display = "none";
        canvas.addEventListener('click', onClick);
        canvas.addEventListener('mousemove', onMouseMoveOrEnter);
        canvas.addEventListener('mouseenter', onMouseMoveOrEnter);
        canvas.addEventListener('mouseleave', onMouseLeave);
        AUDIO.pause();
        AUDIO.currentTime = 0;
        zombieInterval = setInterval(spawnZombie, zombieSpawnInterval);
        window.requestAnimationFrame(update);
        if (DEBUG_MODE) console.log("Game started!");
    }

    function update(timeStamp) {
        const delta = timeStamp - oldTimeStamp;
        const fps = Math.round(1000 / delta);
        oldTimeStamp = timeStamp;
        drawBackground();
        drawZombies(delta);
        drawHearts();
        drawScore();
        drawCursor();
        drawDebugMode(fps);
        if (Date.now() - lastDifficultyIncrease > difficultyIncreaseInterval) {
            lastDifficultyIncrease = Date.now();
            increaseDifficulty();
        }
        if (gameWorking) {
            window.requestAnimationFrame(update);
        } else {
            endGame();
        }
    }

    function increaseDifficulty() {
        zombieSpawnInterval = Math.max(500, zombieSpawnInterval - (Math.random() * 100 + 100)); 
        difLevel = (Math.random() > 0.4) ? difLevel + 1 : difLevel;
        if (difLevel > 10) difLevel = 1;
        if (DEBUG_MODE) console.log("Difficulty increased to: zombie spawn interval = " +zombieSpawnInterval + ", difficulty level: " + difLevel+".");
        clearInterval(zombieInterval);
        zombieInterval = setInterval(spawnZombie, zombieSpawnInterval);
    }

    function endGame() {
        if (DEBUG_MODE) console.log("Game ended with score="+score+"!");
        canvas.style.filter = "blur(5px) brightness(0.5)";
        startScreen.style.display = "flex";
        gameOverH.style.visibility = "visible";
        finalScoreP.style.display  = "unset";
        if (score > maxScore) {
            maxScore = score;
            localStorage.setItem("maxScore", maxScore);
        }
        finalScoreP.innerText = `Score: ${score}`;
        maxScoreP.innerText = `Max score: ${maxScore}`;
        AUDIO.play();
        clearInterval(zombieInterval);
        canvas.removeEventListener('click', onClick);
        canvas.removeEventListener('mousemove', onMouseMoveOrEnter);
        canvas.removeEventListener('mouseenter', onMouseMoveOrEnter);
        canvas.removeEventListener('mouseleave', onMouseLeave);
    }

    function drawBackground() {
        BACKGROUND_SPRITE.draw(context, { x: 0, y: 0 });
    }

    function drawZombies(delta) {
        let toRemove = [];
        zombies.forEach((zombie, index) => {
            if (zombie.update(context, delta)) {
                toRemove.push(index);
                hearts = Math.max(hearts - 1, 0);
                if (hearts <= 0) gameWorking = false;
            }
        });
        toRemove.forEach(index => {
            zombies.splice(index, 1);
        });
    }

    function spawnZombie() {
        const scale = Math.random() * 0.7 + 0.5;
        const speed = Math.random() * difLevel / 3 + 0.5;
        const y = Math.random() * 40 - 20 + 700;
        const newZombie = new Zombie(ZOMBIE_SPRITE, { x: canvas.width, y: y }, speed, scale);
        if (DEBUG_MODE) console.log("New zombie spawned with: scale="+scale+", speed="+speed+", y="+y+".")
        let index = zombies.findIndex(zombie => zombie.scale > newZombie.scale);
        if (index === -1) {
            zombies.push(newZombie);
        } else {
            zombies.splice(index, 0, newZombie);
        }
    }

    function onMouseLeave() {
        cursorX = -200;
        cursorY = -200;
    }

    function onMouseMoveOrEnter(event) {
        const scaleX = canvas.width / canvas.clientWidth;
        const scaleY = canvas.height / canvas.clientHeight;
        cursorX = event.offsetX * scaleX;
        cursorY = event.offsetY * scaleY;
    }

    function onClick(event) {
        const scaleX = canvas.width / canvas.clientWidth;
        const scaleY = canvas.height / canvas.clientHeight;
        cursorX = event.offsetX * scaleX;
        cursorY = event.offsetY * scaleY;
        let found = false;

        for (let i = zombies.length - 1; i >= 0; i--) {
            const zombie = zombies[i];
            if (cursorX >= zombie.position.x && cursorX <= zombie.position.x + zombie.width &&
                cursorY >= zombie.position.y && cursorY <= zombie.position.y + zombie.height) {
                if (DEBUG_MODE) console.log("Zombie has been killed.") 
                zombies.splice(i, 1);
                score += 10;
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Zombie has not been found at the cursor position.")
            score -= 5;
        }
    }

    function drawCursor() {
        if (!gameWorking) return;
        AIM_SPRITE.draw(context, { x: cursorX - AIM_SPRITE.width / 2, y: cursorY - AIM_SPRITE.height / 2 });
    }

    function drawScore() {
        context.font = '100px Arial';
        context.fillStyle = 'white';
        const isNegative = score < 0;
        const absoluteScore = Math.abs(score);
        const paddedScore = String(absoluteScore).padStart(5, '0');
        const minusWidth = context.measureText('-').width;
        context.fillText(isNegative ? `-${paddedScore}` : paddedScore, 1350 - (isNegative ? minusWidth : 0), 135);
    }

    function drawHearts() {
        if (hearts >= 3) FULL_HEART_SPRITE.draw(context, { x: 270, y: 50 });
        else EMPTY_HEART_SPRITE.draw(context, { x: 270, y: 50 });
        if (hearts >= 2) FULL_HEART_SPRITE.draw(context, { x: 160, y: 50 });
        else EMPTY_HEART_SPRITE.draw(context, { x: 160, y: 50 });
        if (hearts >= 1) FULL_HEART_SPRITE.draw(context, { x: 50, y: 50 });
        else EMPTY_HEART_SPRITE.draw(context, { x: 50, y: 50 });
    }

    function drawDebugMode(fps) {
        if (!DEBUG_MODE) return;
        context.fillStyle = 'white';
        context.strokeStyle = "#FF0000";
        context.lineWidth = 2;
        context.fillRect(0, 0, 110, 45);
        context.strokeRect(0, 0, 110, 45);
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.fillText("FPS: " + fps, 10, 30);
    }
}

document.addEventListener("DOMContentLoaded", init);