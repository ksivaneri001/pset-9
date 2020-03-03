let board;
let oranges;
let apples;
let darkSquares = document.getElementsByClassName("dark-square");
let turn = "Orange";

function createBoard() {
    board = [];
    oranges = [];
    apples = [];

    for (let i = 0; i < 64; i++) {
        board.push(null);
    }

    let x = 0;
    let oddRow = true;

    for (let i = 0; i < 64; i++) {
        if (i !== 0 && i % 8 === 0) {
            oddRow = !oddRow;
            x = (!oddRow) ? x - 1 : x + 1;
        }
        if (oddRow) {
            if (i % 2 !== 0) {
                board[i] = "";
            }
            else if (i % 2 === 0) {
                board[i] = darkSquares[x];
                x++;
            }
        }
        else {
            if (i % 2 !== 0) {
                board[i] = darkSquares[x];
            }
            else if (i % 2 === 0) {
                board[i] = "";
                x++;
            }
        }
    }

    for (let o = 63; o >= 40; o--) {
        if (board[o] !== "") {
            let newOrangePiece = {
                index: o,
                htmlImage: null,
                king: false
            };
            newOrangePiece.htmlImage = document.createElement("img");
            newOrangePiece.htmlImage.src = "images/orange.png";
            newOrangePiece.htmlImage.height = "50";
            newOrangePiece.htmlImage.width = "50";
            newOrangePiece.htmlImage.setAttribute("class", "orange");
            board[o].append(newOrangePiece.htmlImage);

            oranges.push(newOrangePiece);
        }
    }
    for (let a = 0; a < 24; a++) {
        if (board[a] !== "") {
            let newApplePiece = {
                index: a,
                htmlImage: null,
                king: false
            };
            newApplePiece.htmlImage = document.createElement("img");
            newApplePiece.htmlImage.src = "images/apple.png";
            newApplePiece.htmlImage.height = "50";
            newApplePiece.htmlImage.width = "50";
            newApplePiece.htmlImage.setAttribute("class", "apple");
            board[a].append(newApplePiece.htmlImage);

            apples.push(newApplePiece);
        }
    }
}

window.onload = function() {
    createBoard();

    document.getElementById("board").onmouseover = selectPiece;
};

function selectPiece() {
    for (let i = 0; i < oranges.length; i++) {
        oranges[i].htmlImage.onclick = function() {
            if (turn === "Orange") {
                moveOrange(i);
            }
        }
    }
    for (let i = 0; i < apples.length; i++) {
        apples[i].htmlImage.onclick = function() {
            if (turn === "Apple") {
                moveApple(i);
            }
        }
    }
}

function moveOrange(index) {
    for (let i = 0; i < oranges.length; i++) {
        oranges[i].htmlImage.style.backgroundColor = "transparent";
    }
    for (let i = 0; i < darkSquares.length; i++) {
        darkSquares[i].style.backgroundImage = "url(images/wood-texture.jpg)";
    }
    oranges[index].htmlImage.style.backgroundColor = "green";

    if (oranges[index].king) {

    }
    else {
        console.log(oranges[index]);

        let canRight = true;
        let canLeft = true;
        let leftMultiple = 1;
        let rightMultiple = 1;
        for (let i = 0; i < oranges.length; i++) {
            if (oranges[i].index === oranges[index].index - 7) {
                canRight = false;
            }
            if (oranges[i].index === oranges[index].index - 9) {
                canLeft = false;
            }
        }
        for (let i = 0; i < apples.length; i++) {
            if (apples[i].index === oranges[index].index - 7) {
                for (let j = 0; j < apples.length; j++) {
                    if (apples[j].index === oranges[index].index - 14 || oranges[j].index === oranges[index].index - 14) {
                        canRight = false;
                    }
                    else {
                        rightMultiple = 2;
                    }
                }
            }
            if (apples[i].index === oranges[index].index - 9) {
                for (let j = 0; j < apples.length; j++) {
                    if (apples[j].index === oranges[index].index - 18 || oranges[j].index === oranges[index].index - 18) {
                        canLeft = false;
                    }
                    else {
                        leftMultiple = 2;
                    }
                }
            }
        }

        if (board[oranges[index].index - (7 * rightMultiple)] !== "" && canRight) {
            board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }
        if (board[oranges[index].index - (9 * leftMultiple)] !== "" && canLeft) {
            board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }

        for (let i = 0; i < board.length; i++) {
            board[i].onclick = undefined;
        }

        if (canRight) {
            board[oranges[index].index - (7 * rightMultiple)].onclick = function() {
                console.log("right");

                board[oranges[index].index - (7 * rightMultiple)].onclick = undefined;
                board[oranges[index].index - (9 * leftMultiple)].onclick = undefined;

                if (board[oranges[index].index - (7 * rightMultiple)] !== "") {
                    board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - (9 * leftMultiple)] !== "") {
                    board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - (7 * rightMultiple)].append(oranges[index].htmlImage);
                oranges[index].index -= (7 * rightMultiple);

                turn = (rightMultiple === 2) ? "Orange" : "Apple";
                document.getElementById("turn").innerHTML = turn;
            }
        }

        if (canLeft) {
            board[oranges[index].index - (9 * leftMultiple)].onclick = function() {
                console.log("left");

                board[oranges[index].index - (7 * rightMultiple)].onclick = undefined;
                board[oranges[index].index - (9 * leftMultiple)].onclick = undefined;

                if (board[oranges[index].index - (7 * rightMultiple)] !== "") {
                    board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - (9 * leftMultiple)] !== "") {
                    board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - (9 * leftMultiple)].append(oranges[index].htmlImage);
                oranges[index].index -= (9 * leftMultiple);

                turn = (leftMultiple === 2) ? "Orange" : "Apple";
                document.getElementById("turn").innerHTML = turn;
            }
        }
    }
}

function moveApple(index2) {
    for (let i = 0; i < apples.length; i++) {
        apples[i].htmlImage.style.backgroundColor = "transparent";
    }
    for (let i = 0; i < darkSquares.length; i++) {
        darkSquares[i].style.backgroundImage = "url(images/wood-texture.jpg)";
    }
    apples[index2].htmlImage.style.backgroundColor = "green";

    if (apples[index2].king) {

    }
    else {
        console.log(apples[index2]);

        let canRight = true;
        let canLeft = true;
        let leftMultiple = 1;
        let rightMultiple = 1;
        for (let i = 0; i < oranges.length; i++) {
            if (oranges[i].index === apples[index2].index + 7) {
                for (let j = 0; j < apples.length; j++) {
                    if (oranges[j].index === apples[index2].index + 14 || apples[j].index === apples[index2].index + 14) {
                        canRight = false;
                    }
                    else {
                        rightMultiple = 2;
                    }
                }
            }
            if (oranges[i].index === apples[index2].index + 9) {
                for (let j = 0; j < apples.length; j++) {
                    if (oranges[j].index === apples[index2].index + 18 || apples[j].index === apples[index2].index + 18) {
                        canLeft = false;
                    }
                    else {
                        leftMultiple = 2;
                    }
                }
            }
        }
        for (let i = 0; i < apples.length; i++) {
            if (apples[i].index === apples[index2].index + 7) {
                canRight = false;
            }
            if (apples[i].index === apples[index2].index + 9) {
                canLeft = false;
            }
        }

        if (board[apples[index2].index + (7 * rightMultiple)] !== "" && canRight) {
            board[apples[index2].index + (7 * rightMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }
        if (board[apples[index2].index + (9 * leftMultiple)] !== "" && canLeft) {
            board[apples[index2].index + (9 * leftMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }

        for (let i = 0; i < board.length; i++) {
            board[i].onclick = undefined;
        }

        if (canRight) {
            board[apples[index2].index + (7 * rightMultiple)].onclick = function() {
                console.log("right");

                board[apples[index2].index + (7 * rightMultiple)].onclick = undefined;
                board[apples[index2].index + (9 * leftMultiple)].onclick = undefined;

                if (board[apples[index2].index + (7 * rightMultiple)] !== "") {
                    board[apples[index2].index + (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[apples[index2].index + (9 * leftMultiple)] !== "") {
                    board[apples[index2].index + (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                apples[index2].htmlImage.style.backgroundColor = "transparent";

                board[apples[index2].index + (7 * rightMultiple)].append(apples[index2].htmlImage);
                apples[index2].index += (7 * rightMultiple);

                turn = (rightMultiple === 2) ? "Apple" : "Orange";
                document.getElementById("turn").innerHTML = turn;
            }
        }

        if (canLeft) {
            board[apples[index2].index + (9 * leftMultiple)].onclick = function() {
                console.log("left");

                board[apples[index2].index + (7 * rightMultiple)].onclick = undefined;
                board[apples[index2].index + (9 * leftMultiple)].onclick = undefined;

                if (board[apples[index2].index + (7 * rightMultiple)] !== "") {
                    board[apples[index2].index + (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[apples[index2].index + (9 * leftMultiple)] !== "") {
                    board[apples[index2].index + (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                apples[index2].htmlImage.style.backgroundColor = "transparent";

                board[apples[index2].index + (9 * leftMultiple)].append(apples[index2].htmlImage);
                apples[index2].index += (9 * leftMultiple);

                turn = (leftMultiple === 2) ? "Apple" : "Orange";
                document.getElementById("turn").innerHTML = turn;
            }
        }
    }
}
