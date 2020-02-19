const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");
let dx;
let xy;
let x = 375;
let y = 490;
let right = true;
let up = true;

window.onload = function() {
    game();
}

function game() {
    draw();
    changeXAndY();

    console.log("ksajfds");

    setTimeout(game, 100);
}

function init() {

}

function checkCollision() {

}

function changeXAndY() {
    if (right) {
        dx = 1;
    }
    else {
        dx = -1;
    }
    if (up) {
        dy = -1;
    }
    else {
        dy = 1;
    }
    x += dx;
    y += dy;
}

function draw() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
}
