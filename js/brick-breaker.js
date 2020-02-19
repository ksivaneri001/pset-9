// Canvas
const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");


// Variables
let dx;
let xy;
let speed = 15;

// Objects
let ball = {
    x: undefined,
    y: undefined,
    radius: 10,
    right: true,
    up: true
};


// Functions
window.onload = function() {
    document.getElementById("brick-breaker-game").onclick = reset;
    game();
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 20;
    ball.right = true;
    ball.up = true;
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
}

function changeXAndY() {
    if (ball.right) {
        dx = 5;
    }
    else {
        dx = -5;
    }
    if (ball.up) {
        dy = -5;
    }
    else {
        dy = 5;
    }
    ball.x += dx;
    ball.y += dy;
}

function draw() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.stroke();
}

function gameOver() {

}
