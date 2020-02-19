const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");
let dx;
let xy;
let x;
let y;
let right = true;
let up = true;
let speed = 15;

window.onload = function() {
    document.getElementById("brick-breaker-game").onclick = reset;
    game();
}

function reset() {
    x = 375;
    y = 490;
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    changeXAndY();

    setTimeout(game, speed);
}

function init() {

}

function checkCollision() {

}

function changeXAndY() {
    if (right) {
        dx = 5;
    }
    else {
        dx = -5;
    }
    if (up) {
        dy = -5;
    }
    else {
        dy = 5;
    }
    x += dx;
    y += dy;
}

function draw() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
}
