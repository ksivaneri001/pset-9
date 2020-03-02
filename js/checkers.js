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

    for (let orange = 0; orange < 24; orange++) {
        if (board[orange] !== "") {
            let newOrangePiece = {
                index: orange,
                htmlImage: null,
                king: false
            };
            newOrangePiece.htmlImage = document.createElement("img");
            newOrangePiece.htmlImage.src = "images/orange.png";
            newOrangePiece.htmlImage.height = "60";
            newOrangePiece.htmlImage.width = "60";
            newOrangePiece.htmlImage.setAttribute("class", "orange");
            board[orange].append(newOrangePiece.htmlImage);

            oranges.push(newOrangePiece);
        }
    }
    for (let apple = 63; apple >= 40; apple--) {
        if (board[apple] !== "") {
            let newApplePiece = {
                index: apple,
                htmlImage: null,
                king: false
            };
            newApplePiece.htmlImage = document.createElement("img");
            newApplePiece.htmlImage.src = "images/apple.png";
            newApplePiece.htmlImage.height = "60";
            newApplePiece.htmlImage.width = "60";
            newApplePiece.htmlImage.setAttribute("class", "apple");
            board[apple].append(newApplePiece.htmlImage);

            apples.push(newApplePiece);
        }
    }
}

window.onload = function() {
    createBoard();

    document.getElementById("board").onclick = movePiece;
};

function movePiece() {
    for (let i = 0; i < darkSquares.length; i++) {
        darkSquares[i].onclick = function() {

        }
    }
}
