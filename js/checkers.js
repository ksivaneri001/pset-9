let board;
let darkSquares = document.getElementsByClassName("dark-square");

function createBoard() {
    board = [];

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
}

window.onload = function() {
    createBoard();
};
