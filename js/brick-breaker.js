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
    speed = 0;
    gameStarted = true;
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    checkCollision();
    changeDirection();

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
    if (ball.y + ball.radius == paddle.y) {
        let a = 3;
        const DX_FACTOR_CHANGE = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (ball.x >= paddle.x - ball.radius + i - 2 && ball.x < paddle.x - ball.radius + i) {
                if (i < 50) {
                    ball.up = true;
                    ball.right = false;
                    speed++;
                    dxFactor = Math.abs(a);
                    console.log(dxFactor);
                }
                else if (i >= 50) {
                    ball.up = true;
                    ball.right = true;
                    speed++;
                    dxFactor = Math.abs(a);
                    console.log(dxFactor);
                }
                break;
            }
            else {
                a -= DX_FACTOR_CHANGE;
            }
        }
        // if (ball.x + ball.radius >= paddle.x && ball.x - ball.radius < paddle.x + 10) {
        //     ball.up = true;
        //     ball.right = false;
        //     speed -= 0.5;
        //     dxFactor = 2;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 10 && ball.x - ball.radius < paddle.x + 20) {
        //     ball.up = true;
        //     ball.right = false;
        //     speed -= 0.5;
        //     dxFactor = 1.5;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 20 && ball.x - ball.radius < paddle.x + 30) {
        //     ball.up = true;
        //     ball.right = false;
        //     speed -= 0.5;
        //     dxFactor = 1;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 30 && ball.x - ball.radius < paddle.x + 40) {
        //     ball.up = true;
        //     ball.right = false;
        //     speed -= 0.5;
        //     dxFactor = 0.5;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 40 && ball.x - ball.radius < paddle.x + 50) {
        //     ball.up = true;
        //     ball.right = true;
        //     speed -= 0.5;
        //     dxFactor = 0.5;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 50 && ball.x - ball.radius < paddle.x + 60) {
        //     ball.up = true;
        //     ball.right = true;
        //     speed -= 0.5;
        //     dxFactor = 1;
        // }
        // else if (ball.x + ball.radius >= paddle.x + 70 && ball.x - ball.radius <= paddle.x + paddle.width) {
        //     ball.up = true;
        //     ball.right = true;
        //     speed -= 0.5;
        //     dxFactor = 2;
        // }
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
