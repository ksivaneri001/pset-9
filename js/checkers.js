let board;
let oranges;
let apples;
let darkSquares = document.getElementsByClassName("dark-square");
let turn = "Orange";

function createBoard() {
    board = [];
    oranges = [];
    apples = [];

    for (let j = 0; j < 64; j++) {
        board.push(null);
    }

    let k = 0;
    let oddRow = true;

    for (let l = 0; l < 64; l++) {
        if (l !== 0 && l % 8 === 0) {
            oddRow = !oddRow;
            k = (!oddRow) ? k - 1 : k + 1;
        }
        if (oddRow) {
            if (l % 2 !== 0) {
                board[l] = "";
            }
            else if (l % 2 === 0) {
                board[l] = darkSquares[k];
                k++;
            }
        }
        else {
            if (l % 2 !== 0) {
                board[l] = darkSquares[k];
            }
            else if (l % 2 === 0) {
                board[l] = "";
                k++;
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
    for (let j = 0; j < apples.length; j++) {
        apples[j].htmlImage.onclick = function() {
            if (turn === "Apple") {
                moveApple(j);
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
        let spaceMultiple = 1;
        for (let k = 0; k < oranges.length; k++) {
            if (oranges[k].index === oranges[index].index - 7) {
                canRight = false;
            }
            if (oranges[k].index === oranges[index].index - 9) {
                canLeft = false;
            }
        }
        for (let l = 0; l < apples.length; l++) {
            if (apples[l].index === oranges[index].index - 7) {
                canRight = false;
            }
            if (apples[l].index === oranges[index].index - 9) {
                canLeft = false;
            }
        }

        if (board[oranges[index].index - 7] !== "" && canRight) {
            board[oranges[index].index - 7].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }
        if (board[oranges[index].index - 9] !== "" && canLeft) {
            board[oranges[index].index - 9].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }

        for (let j = 0; j < board.length; j++) {
            board[j].onclick = undefined;
        }

        if (canRight) {
            board[oranges[index].index - 7].onclick = function() {
                console.log("right");

                board[oranges[index].index - 7].onclick = undefined;
                board[oranges[index].index - 9].onclick = undefined;

                if (board[oranges[index].index - 7] !== "") {
                    board[oranges[index].index - 7].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - 9] !== "") {
                    board[oranges[index].index - 9].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - 7].append(oranges[index].htmlImage);
                oranges[index].index -= 7;

                turn = "Apple";
                document.getElementById("turn").innerHTML = turn;
            }
        }

        if (canLeft) {
            board[oranges[index].index - 9].onclick = function() {
                console.log("left");

                board[oranges[index].index - 7].onclick = undefined;
                board[oranges[index].index - 9].onclick = undefined;

                if (board[oranges[index].index - 7] !== "") {
                    board[oranges[index].index - 7].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - 9] !== "") {
                    board[oranges[index].index - 9].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - 9].append(oranges[index].htmlImage);
                oranges[index].index -= 9;

                turn = "Apple";
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
        for (let k = 0; k < oranges.length; k++) {
            if (oranges[k].index === apples[index2].index + 7) {
                canRight = false;
            }
            if (oranges[k].index === apples[index2].index + 9) {
                canLeft = false;
            }
        }
        for (let l = 0; l < apples.length; l++) {
            if (apples[l].index === apples[index2].index + 7) {
                canRight = false;
            }
            if (apples[l].index === apples[index2].index + 9) {
                canLeft = false;
            }
        }

        if (board[apples[index2].index + 7] !== "" && canRight) {
            board[apples[index2].index + 7].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }
        if (board[apples[index2].index + 9] !== "" && canLeft) {
            board[apples[index2].index + 9].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }

        for (let j = 0; j < board.length; j++) {
            board[j].onclick = undefined;
        }

        if (canRight) {
            board[apples[index2].index + 7].onclick = function() {
                console.log("right");

                board[apples[index2].index + 7].onclick = undefined;
                board[apples[index2].index + 9].onclick = undefined;

                if (board[apples[index2].index + 7] !== "") {
                    board[apples[index2].index + 7].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[apples[index2].index + 9] !== "") {
                    board[apples[index2].index + 9].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                apples[index2].htmlImage.style.backgroundColor = "transparent";

                board[apples[index2].index + 7].append(apples[index2].htmlImage);
                apples[index2].index += 7;

                turn = "Orange";
                document.getElementById("turn").innerHTML = turn;
            }
        }

        if (canLeft) {
            board[apples[index2].index + 9].onclick = function() {
                console.log("left");

                board[apples[index2].index + 7].onclick = undefined;
                board[apples[index2].index + 9].onclick = undefined;

                if (board[apples[index2].index + 7] !== "") {
                    board[apples[index2].index + 7].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[apples[index2].index + 9] !== "") {
                    board[apples[index2].index + 9].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                apples[index2].htmlImage.style.backgroundColor = "transparent";

                board[apples[index2].index + 9].append(apples[index2].htmlImage);
                apples[index2].index += 9;

                turn = "Orange";
                document.getElementById("turn").innerHTML = turn;
            }
        }
    }
}
