let board;
let oranges;
let apples;
let darkSquares = document.getElementsByClassName("dark-square");
let turn = "Orange";
let test = 1;

const kingAudio = document.getElementById("king-audio");

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

    for (let i = 0; i < 18; i++) {
        board.push("");
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
                    if (apples[j].index === oranges[index].index - 14) {
                        canRight = false;
                    }
                    else {
                        rightMultiple = 2;
                    }
                }
                for (let k = 0; k < oranges.length; k++) {
                    if (oranges[k].index === oranges[index].index - 14) {
                        canRight = false;
                        rightMultiple = 1;
                    }
                }
            }
            if (apples[i].index === oranges[index].index - 9) {
                for (let j = 0; j < apples.length; j++) {
                    if (apples[j].index === oranges[index].index - 18) {
                        canLeft = false;
                    }
                    else {
                        leftMultiple = 2;
                    }
                }
                for (let k = 0; k < oranges.length; k++) {
                    if (oranges[k].index === oranges[index].index - 18) {
                        canLeft = false;
                        leftMultiple = 1;
                    }
                }
            }
        }

        if (board[oranges[index].index - (7 * rightMultiple)] !== "" && canRight && oranges[index].index - (7 * rightMultiple) >= 0) {
            board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }
        if (board[oranges[index].index - (9 * leftMultiple)] !== "" && canLeft && oranges[index].index - (9 * leftMultiple) >= 0) {
            board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/red-wood-texture.jpg)";
        }

        for (let i = 0; i < board.length; i++) {
            board[i].onclick = undefined;
        }

        if (canRight && oranges[index].index - (7 * rightMultiple) >= 0) {
            board[oranges[index].index - (7 * rightMultiple)].onclick = function() {
                console.log("right");

                board[oranges[index].index - (7 * rightMultiple)].onclick = undefined;
                if (oranges[index].index - (9 * leftMultiple) >= 0) {
                    board[oranges[index].index - (9 * leftMultiple)].onclick = undefined;
                }

                if (board[oranges[index].index - (7 * rightMultiple)] !== "" && oranges[index].index - (7 * rightMultiple) >= 0) {
                    board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - (9 * leftMultiple)] !== "" && oranges[index].index - (9 * leftMultiple) >= 0) {
                    board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - (7 * rightMultiple)].append(oranges[index].htmlImage);

                if (rightMultiple === 2) {
                    for (let i = 0; i < apples.length; i++) {
                        if (apples[i].index === oranges[index].index - 7) {
                            apples[i].htmlImage.remove();
                            apples.splice(i, 1);
                        }
                    }
                }

                oranges[index].index -= (7 * rightMultiple);

                turn = (rightMultiple === 2) ? "Orange Again" : "Apple";
                document.getElementById("turn").innerHTML = turn;

                if (turn === "Orange Again") {
                    let doFunctionLeft = true;
                    let doFunctionRight = true;
                    doFunctionRight = (board[oranges[index].index - 7] === "" || board[oranges[index].index - 14] === "") ? false : doFunctionRight;
                    doFunctionLeft = (board[oranges[index].index - 9] === "" || board[oranges[index].index - 18] === "") ? false : doFunctionLeft;
                    for (let i = 0; i < oranges.length; i++) {
                        doFunctionRight = (oranges[i].index === oranges[index].index - 7) ? false : doFunctionRight;
                        doFunctionLeft = (oranges[i].index === oranges[index].index - 9) ? false : doFunctionLeft;
                    }
                    for (let i = 0; i < apples.length; i++) {
                        if (apples[i].index === oranges[index].index - 7) {
                            for (let j = 0; j < apples.length; j++) {
                                doFunctionRight = (apples[j].index === oranges[index].index - 14) ? false : doFunctionRight;
                            }
                            for (let k = 0; k < oranges.length; k++) {
                                doFunctionRight = (oranges[k].index === oranges[index].index - 14) ? false : doFunctionRight;
                            }
                        }
                        if (apples[i].index === oranges[index].index - 9) {
                            for (let j = 0; j < apples.length; j++) {
                                doFunctionLeft = (apples[j].index === oranges[index].index - 18) ? false : doFunctionLeft;
                            }
                            for (let k = 0; k < oranges.length; k++) {
                                doFunctionLeft = (oranges[k].index === oranges[index].index - 18) ? false : doFunctionLeft;
                            }
                        }
                    }
                    if (doFunctionRight || doFunctionLeft) {
                        moveOrange(index);
                    }
                    else {
                        turn = "Apple";
                        document.getElementById("turn").innerHTML = turn;
                    }
                }
            }
        }

        if (canLeft && oranges[index].index - (9 * leftMultiple) >= 0) {
            board[oranges[index].index - (9 * leftMultiple)].onclick = function() {
                console.log("left");

                if (oranges[index].index - (7 * rightMultiple) >= 0) {
                    board[oranges[index].index - (7 * rightMultiple)].onclick = undefined;
                }
                board[oranges[index].index - (9 * leftMultiple)].onclick = undefined;

                if (board[oranges[index].index - (7 * rightMultiple)] !== "" && oranges[index].index - (7 * rightMultiple) >= 0) {
                    board[oranges[index].index - (7 * rightMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                if (board[oranges[index].index - (9 * leftMultiple)] !== "" && oranges[index].index - (9 * leftMultiple) >= 0) {
                    board[oranges[index].index - (9 * leftMultiple)].style.backgroundImage = "url(images/wood-texture.jpg)";
                }
                oranges[index].htmlImage.style.backgroundColor = "transparent";

                board[oranges[index].index - (9 * leftMultiple)].append(oranges[index].htmlImage);

                if (leftMultiple === 2) {
                    for (let i = 0; i < apples.length; i++) {
                        if (apples[i].index === oranges[index].index - 9) {
                            apples[i].htmlImage.remove();
                            apples.splice(i, 1);
                        }
                    }
                }

                oranges[index].index -= (9 * leftMultiple);

                turn = (leftMultiple === 2) ? "Orange Again" : "Apple";
                document.getElementById("turn").innerHTML = turn;

                if (turn === "Orange Again") {
                    let doFunctionLeft = true;
                    let doFunctionRight = true;
                    doFunctionRight = (board[oranges[index].index - 7] === "" || board[oranges[index].index - 14] === "") ? false : doFunctionRight;
                    doFunctionLeft = (board[oranges[index].index - 9] === "" || board[oranges[index].index - 18] === "") ? false : doFunctionLeft;
                    for (let i = 0; i < oranges.length; i++) {
                        doFunctionRight = (oranges[i].index === oranges[index].index - 7) ? false : doFunctionRight;
                        doFunctionLeft = (oranges[i].index === oranges[index].index - 9) ? false : doFunctionLeft;
                    }
                    for (let i = 0; i < apples.length; i++) {
                        if (apples[i].index === oranges[index].index - 7) {
                            for (let j = 0; j < apples.length; j++) {
                                doFunctionRight = (apples[j].index === oranges[index].index - 14) ? false : doFunctionRight;
                            }
                            for (let k = 0; k < oranges.length; k++) {
                                doFunctionRight = (oranges[k].index === oranges[index].index - 14) ? false : doFunctionRight;
                            }
                        }
                        if (apples[i].index === oranges[index].index - 9) {
                            for (let j = 0; j < apples.length; j++) {
                                doFunctionLeft = (apples[j].index === oranges[index].index - 18) ? false : doFunctionLeft;
                            for (let k = 0; k < oranges.length; k++) {
                                doFunctionLeft = (oranges[k].index === oranges[index].index - 18) ? false : doFunctionLeft;
                            }
                        }
                    }
                    if (doFunctionRight || doFunctionLeft) {
                        moveOrange(index);
                    }
                    else {
                        turn = "Apple";
                        document.getElementById("turn").innerHTML = turn;
                    }
                }
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
                for (let j = 0; j < oranges.length; j++) {
                    if (oranges[j].index === apples[index2].index + 14) {
                        canRight = false;
                    }
                    else {
                        rightMultiple = 2;
                    }
                }
                for (let k = 0; k < apples.length; k++) {
                    if (apples[k].index === apples[index2].index + 14) {
                        canRight = false;
                        rightMultiple = 1;
                    }
                }
            }
            if (oranges[i].index === apples[index2].index + 9) {
                for (let j = 0; j < oranges.length; j++) {
                    if (oranges[j].index === apples[index2].index + 18) {
                        canLeft = false;
                    }
                    else {
                        leftMultiple = 2;
                    }
                }
                for (let k = 0; k < apples.length; k++) {
                    if (apples[k].index === apples[index2].index + 18) {
                        canLeft = false;
                        leftMultiple = 1;
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

                if (rightMultiple === 2) {
                    for (let i = 0; i < oranges.length; i++) {
                        if (oranges[i].index === apples[index2].index + 7) {
                            oranges[i].htmlImage.remove();
                            oranges.splice(i, 1);
                        }
                    }
                }

                apples[index2].index += (7 * rightMultiple);

                turn = (rightMultiple === 2) ? "Apple Again" : "Orange";
                document.getElementById("turn").innerHTML = turn;

                if (turn === "Apple Again") {
                    let doFunctionLeft = true;
                    let doFunctionRight = true;
                    doFunctionRight = (board[apples[index2].index + 7] === "" || board[apples[index2].index + 14] === "") ? false : doFunctionRight;
                    doFunctionLeft = (board[apples[index2].index + 9] === "" || board[apples[index2].index + 18] === "") ? false : doFunctionLeft;
                    for (let i = 0; i < apples.length; i++) {
                        doFunctionRight = (apples[i].index === apples[index2].index + 7) ? false : doFunctionRight;
                        doFunctionLeft = (apples[i].index === apples[index2].index + 9) ? false : doFunctionLeft;
                    }
                    for (let i = 0; i < oranges.length; i++) {
                        if (oranges[i].index === apples[index2].index + 7) {
                            for (let j = 0; j < oranges.length; j++) {
                                doFunctionRight = (oranges[j].index === apples[index2].index + 14) ? false : doFunctionRight;
                            }
                            for (let k = 0; k < apples.length; k++) {
                                doFunctionRight = (apples[k].index === apples[index2].index + 14) ? false : doFunctionRight;
                            }
                        }
                        if (oranges[i].index === apples[index2].index + 9) {
                            for (let j = 0; j < oranges.length; j++) {
                                doFunctionLeft = (oranges[j].index === apples[index2].index + 18) ? false : doFunctionLeft;
                            }
                            for (let k = 0; k < apples.length; k++) {
                                doFunctionLeft = (apples[k].index === apples[index2].index + 18) ? false : doFunctionLeft;
                            }
                        }
                    }
                    if (doFunctionRight || doFunctionLeft) {
                        moveApple(index2);
                    }
                    else {
                        turn = "Orange";
                        document.getElementById("turn").innerHTML = turn;
                    }
                }
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

                if (leftMultiple === 2) {
                    for (let i = 0; i < oranges.length; i++) {
                        if (oranges[i].index === apples[index2].index + 9) {
                            oranges[i].htmlImage.remove();
                            oranges.splice(i, 1);
                        }
                    }
                }

                apples[index2].index += (9 * leftMultiple);

                turn = (rightMultiple === 2) ? "Apple Again" : "Orange";
                document.getElementById("turn").innerHTML = turn;

                if (turn === "Apple Again") {
                    let doFunctionLeft = true;
                    let doFunctionRight = true;
                    doFunctionRight = (board[apples[index2].index + 7] === "" || board[apples[index2].index + 14] === "") ? false : doFunctionRight;
                    doFunctionLeft = (board[apples[index2].index + 9] === "" || board[apples[index2].index + 18] === "") ? false : doFunctionLeft;
                    for (let i = 0; i < apples.length; i++) {
                        doFunctionRight = (apples[i].index === apples[index2].index + 7) ? false : doFunctionRight;
                        doFunctionLeft = (apples[i].index === apples[index2].index + 9) ? false : doFunctionLeft;
                    }
                    for (let i = 0; i < oranges.length; i++) {
                        if (oranges[i].index === apples[index2].index + 7) {
                            for (let j = 0; j < oranges.length; j++) {
                                doFunctionRight = (oranges[j].index === apples[index2].index + 14) ? false : doFunctionRight;
                            }
                            for (let k = 0; k < apples.length; k++) {
                                doFunctionRight = (apples[k].index === apples[index2].index + 14) ? false : doFunctionRight;
                            }
                        }
                        if (oranges[i].index === apples[index2].index + 9) {
                            for (let j = 0; j < oranges.length; j++) {
                                doFunctionLeft = (oranges[j].index === apples[index2].index + 18) ? false : doFunctionLeft;
                            }
                            for (let k = 0; k < apples.length; k++) {
                                doFunctionLeft = (apples[k].index === apples[index2].index + 18) ? false : doFunctionLeft;
                            }
                        }
                    }
                    if (doFunctionRight || doFunctionLeft) {
                        moveApple(index2);
                    }
                    else {
                        turn = "Orange";
                        document.getElementById("turn").innerHTML = turn;
                    }
                }
            }
        }
    }
}
