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

    setTimeout(game, 1);
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
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1);
}
