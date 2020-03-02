let board;
let oranges;
let apples;
let darkSquares = document.getElementsByClassName("dark-square");

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
        let a = document.getElementsByClassName("orange");
        a[i].onclick = function() {
            console.log("1");
        };
    }
    for (let j = 0; j < apples.length; j++) {
        let b = document.getElementsByClassName("apple");
        b[j].onclick = function() {
            console.log("2");
        };
    }
}

function moveOrange(index) {

}

function moveApple (index) {

}
