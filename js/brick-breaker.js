// Cached Element References
const canvas = document.getElementById("brick-breaker-game");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "orange";
ctx.strokeStyle = "lightgray";
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
ctx.lineJoin = "round";


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
    movement: 20
};


// Event Listeners
window.onload = function() {
    document.getElementById("brick-breaker-play").onclick = init;
    game();
}
document.addEventListener("keydown", getArrowKeys);


// Functions
function init() {
    document.getElementById("brick-breaker-play").innerHTML = "Reset";
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
            break;
        }
        else if (!ball.up && ball.y + ball.radius >= bottles[j].y && ball.y + ball.radius < bottles[j].y + 12 && ball.x >= bottles[j].x - ball.radius && ball.x < bottles[j].x + bottles[j].width + ball.radius) {
            ball.up = true;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            break;
        }
        else if (ball.right && ball.x + ball.radius >= bottles[j].x && ball.x + ball.radius < bottles[j].x + 12 && ball.y >= bottles[j].y - ball.radius && ball.y < bottles[j].y + bottles[j].height + ball.radius) {
            ball.right = false;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
            break;
        }
        else if (!ball.right && ball.x - ball.radius <= bottles[j].x + bottles[j].width && ball.x - ball.radius > bottles[j].x + bottles[j].width - 12 && ball.y >= bottles[j].y - ball.radius && ball.y < bottles[j].y + bottles[j].height + ball.radius) {
            ball.right = true;
            ctx.clearRect(bottles[j].x, bottles[j].y, bottles[j].width, bottles[j].height);
            bottles.splice(j, 1);
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
                    speed = (speed >= 15) ? speed = 15 : speed + 0.5;
                    dxFactor = Math.abs(a);
                }
                else if (i >= 50) {
                    ball.up = true;
                    ball.right = true;
                    ball.y = canvas.height - 20;
                    speed = (speed >= 15) ? speed = 15 : speed + 0.5;
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
        paddle.movement = 20;
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

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < bottles.length; i++) {
        ctx.strokeRect(bottles[i].x, bottles[i].y, bottles[i].width, bottles[i].height);
    }
}

function getArrowKeys(event) {
    if (gameStarted) {
        if (event.keyCode == 37) {
            movePaddle(-1 * paddle.movement);
            // paddle.x -= paddle.movement;
        }
        else if (event.keyCode == 39) {
            movePaddle(paddle.movement);
            // paddle.x += paddle.movement;
        }
    }
}

function movePaddle(pixels) {
    paddle.x += pixels;
}

function createBottles() {
    for (let y = 0; y <= 80; y += 40) {
        for (let x = 0; x < canvas.width; x += canvas.width / 10) {
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
    gameStarted = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function win() {
    init();
}
