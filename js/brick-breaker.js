// Cached Element References
const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");


// Variables
let dx;
let xy;
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
    movement: 15
};


// Event Listeners
window.onload = function() {
    document.getElementById("brick-breaker-game").onclick = init;
    game();
}
document.addEventListener("keydown", movePaddle);


// Functions
function init() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 20;
    ball.right = true;
    ball.up = true;
    paddle.x = (canvas.width / 2) - 40;
    paddle.y = canvas.height - 10;
    dxFactor = 1;
    speed = 20;
    gameStarted = true;
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    checkCollision();
    changeXAndY();

    setTimeout(game, speed);
}

function checkCollision() {
    if (ball.x - 10 <= 0) {
        ball.right = true;
    }
    if (ball.x + 10 >= canvas.width) {
        ball.right = false;
    }
    if (ball.y - 10 <= 0) {
        ball.up = false;
    }
    if (ball.y - 10 >= canvas.height) {
        gameOver();
    }
    if (ball.y + 10 == paddle.y) {
        if (ball.x + 10 >= paddle.x && ball.x - 10 <= paddle.x + paddle.width) {
            ball.up = true;
            speed -= 0.5;
            dxFactor = 3;
            console.log(speed);
        }
        else if (ball.x + 10 >= paddle.x + 20 && ball.x - 10 <= paddle.x + paddle.width - 20) {
            ball.up = true;
            speed -= 0.5;
            dxFactor = 2.5;
            console.log(speed);
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
        paddle.movement = 15;
    }
}

function changeXAndY() {
    if (ball.right) {
        dx = 2 * dxFactor;
    }
    else {
        dx = -2 * dxFactor;
    }
    if (ball.up) {
        dy = -2;
    }
    else {
        dy = 2;
    }
    ball.x += dx;
    ball.y += dy;
}

function draw() {
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.stroke();
}

function movePaddle(event) {
    if (gameStarted) {
        if (event.keyCode == 37) {
            paddle.x -= paddle.movement;
        }
        else if (event.keyCode == 39) {
            paddle.x += paddle.movement;
        }
    }
}

function gameOver() {
    init();
}
