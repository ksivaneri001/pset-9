// Canvas
const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "orange";
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.textAlign = "center";
ctx.font = "40px Comic Sans MS";


// Variables
let dx;
let dxFactor;
let speed;
let gameStarted = false;

// Objects
let bottles = [];

let ball = {
    x: undefined,
    y: undefined,
    radius: 10,
    right: true,
    up: true
};

let paddle = {
    x: (canvas.width / 2) - 40,
    y: canvas.height - 10,
    width: 80,
    height: 5,
    movement: 1
};

let bottleImage = new Image();
bottleImage.src = "images/juice_bottle.png";

let orangeImage = new Image();
orangeImage.src = "images/orange2.png";

const victoryAudio = document.getElementById("victory-audio");
const gameOverAudio = document.getElementById("game-over-audio");
const glassBreakAudio = document.getElementById("glass-break-audio");


// Event Listeners
window.onload = function() {
    document.getElementById("brick-breaker-play").onclick = init;
    game();
}
document.addEventListener("keydown", getArrowKeys);
document.getElementById("brick-breaker-game").addEventListener("mousemove", getMouse);


// Functions
function init() {
    document.getElementById("brick-breaker-play").innerHTML = "Reset";
    victoryAudio.pause();
    victoryAudio.currentTime = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.right = true;
    ball.up = true;
    paddle.x = (canvas.width / 2) - 40;
    paddle.y = canvas.height - 10;
    dxFactor = 1;
    speed = 0;
    bottles = [];
    createBottles();
    gameStarted = true;
}

function game() {
    if (gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        checkCollision();
        changeDirection();
        if (bottles.length === 0) {
            win();
        }
    }

    setTimeout(game, 20 - speed);
}

function checkCollision() {
    if (ball.x - ball.radius <= 0) {
        ball.right = true;
    }
    if (ball.x + ball.radius >= canvas.width) {
        ball.right = false;
    }
    if (ball.y - ball.radius <= 0) {
        ball.up = false;
    }
    if (ball.y - ball.radius >= canvas.height) {
        gameOver();
    }

    for (let j = 0; j < bottles.length; j++) {
        if (ball.up && ball.y - ball.radius <= bottles[j].y + bottles[j].height && ball.y - ball.radius > bottles[j].y + bottles[j].height - 12 && ball.x >= bottles[j].x - ball.radius && ball.x < bottles[j].x + bottles[j].width + ball.radius) {
            ball.up = false;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            glassBreakAudio.pause();
            glassBreakAudio.currentTime = 0;
            glassBreakAudio.play();
            break;
        }
        else if (!ball.up && ball.y + ball.radius >= bottles[j].y && ball.y + ball.radius < bottles[j].y + 12 && ball.x >= bottles[j].x - ball.radius && ball.x < bottles[j].x + bottles[j].width + ball.radius) {
            ball.up = true;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            glassBreakAudio.pause();
            glassBreakAudio.currentTime = 0;
            glassBreakAudio.play();
            break;
        }
        else if (ball.right && ball.x + ball.radius >= bottles[j].x && ball.x + ball.radius < bottles[j].x + 12 && ball.y >= bottles[j].y - ball.radius && ball.y < bottles[j].y + bottles[j].height + ball.radius) {
            ball.right = false;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            glassBreakAudio.pause();
            glassBreakAudio.currentTime = 0;
            glassBreakAudio.play();
            break;
        }
        else if (!ball.right && ball.x - ball.radius <= bottles[j].x + bottles[j].width && ball.x - ball.radius > bottles[j].x + bottles[j].width - 12 && ball.y >= bottles[j].y - ball.radius && ball.y < bottles[j].y + bottles[j].height + ball.radius) {
            ball.right = true;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            glassBreakAudio.pause();
            glassBreakAudio.currentTime = 0;
            glassBreakAudio.play();
            break;
        }
    }

    if (ball.y + ball.radius >= paddle.y && ball.y <= paddle.y + paddle.height) {
        let a = 3;
        const DX_FACTOR_CHANGE = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (ball.x >= paddle.x - ball.radius + i - 2 && ball.x < paddle.x - ball.radius + i) {
                if (i < 50) {
                    ball.up = true;
                    ball.right = false;
                    ball.y = canvas.height - 20;
                    speed = (speed >= 14) ? speed = 14 : speed + 0.5;
                    dxFactor = Math.abs(a);
                }
                else if (i >= 50) {
                    ball.up = true;
                    ball.right = true;
                    ball.y = canvas.height - 20;
                    speed = (speed >= 14) ? speed = 14 : speed + 0.5;
                    dxFactor = Math.abs(a);
                }
                break;
            }
            else {
                a -= DX_FACTOR_CHANGE;
            }
        }
    }

    if (paddle.x + paddle.width > canvas.width) {
        paddle.movement = 0;
        paddle.x = canvas.width - paddle.width;
    }
    else if (paddle.x < 0) {
        paddle.movement = 0;
        paddle.x = 0;
    }
    else {
        paddle.movement = 1;
    }
}

function changeDirection() {
    if (ball.right) {
        dx = 3 * dxFactor;
    }
    else {
        dx = -3 * dxFactor;
    }
    if (ball.up) {
        dy = -3;
    }
    else {
        dy = 3;
    }
    ball.x += dx;
    ball.y += dy;
}

function draw() {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.drawImage(orangeImage, ball.x - ball.radius, ball.y - ball.radius);

    for (let i = 0; i < bottles.length; i++) {
        ctx.drawImage(bottleImage, bottles[i].x, bottles[i].y);
    }

    ctx.font = "24px Comic Sans MS";
    ctx.fillStyle = "lightgray";
    ctx.textAlign = "left";
    ctx.fillText("Bottles Left: " + bottles.length, 10, canvas.height - 20);

    ctx.textAlign = "right";
    ctx.fillText("Speed: " + (Math.floor(speed) + 1), canvas.width - 10, canvas.height - 20);
    ctx.font = "40px Comic Sans MS";

    ctx.fillStyle = "orange";
    ctx.textAlign = "center";
}

function getArrowKeys(event) {
    if (gameStarted) {
        if (event.keyCode == 37) {
            let timer = setInterval(() => paddle.x -= paddle.movement, 4);
            setTimeout(() => { clearInterval(timer); }, 100);
        }
        else if (event.keyCode == 39) {
            let timer2 = setInterval(() => paddle.x += paddle.movement, 4);
            setTimeout(() => { clearInterval(timer2); }, 100);
        }
    }
}

function getMouse(event2) {
    paddle.x = event2.offsetX - (paddle.width / 2);
}

function createBottles() {
    for (let y = 0; y <= 80; y += 40) {
        for (let x = 0; x < canvas.width; x += canvas.width / 10) {
            // let hasPowerUp = (Math.random() > 0.9) ? true : false;
            // let powerUp;
            // if (hasPowerUp) {
            //     let powerUpSelector = randomInteger(3);
            //     switch(powerUpSelector) {
            //         case 0:
            //             powerUp = "speed down";
            //             break;
            //         case 1:
            //             powerUp = "large paddle";
            //             break;
            //         case 2:
            //             powerUp = "uh";
            //             break;
            //     }
            // }
            let bottleTemplate = {
                x: x,
                y: y,
                width: canvas.width / 10,
                height: 40
            };
            bottles.push(bottleTemplate);
        }
    }
}

function gameOver() {
    gameOverAudio.play();
    gameStarted = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let gameOverStats = (bottles.length === 29) ? (30 - bottles.length) + " bottle broken out of 30" : (30 - bottles.length) + " bottles broken out of 30";
    ctx.strokeText("GAME OVER", canvas.width / 2, (canvas.height / 2) - 40);
    ctx.fillText("GAME OVER", canvas.width / 2, (canvas.height / 2) - 40);
    ctx.strokeText(gameOverStats, canvas.width / 2, (canvas.height / 2) + 40);
    ctx.fillText(gameOverStats, canvas.width / 2, (canvas.height / 2) + 40);
    document.getElementById("brick-breaker-play").innerHTML = "Play Again";
}

function win() {
    victoryAudio.play();
    gameStarted = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeText("CONGRATULATIONS!", canvas.width / 2, (canvas.height / 2) - 40);
    ctx.fillText("CONGRATULATIONS!", canvas.width / 2, (canvas.height / 2) - 40);
    ctx.strokeText("You are truly the master of juice!", canvas.width / 2, (canvas.height / 2) + 40);
    ctx.fillText("You are truly the master of juice!", canvas.width / 2, (canvas.height / 2) + 40);
    document.getElementById("brick-breaker-play").innerHTML = "Play Again";
}

function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
