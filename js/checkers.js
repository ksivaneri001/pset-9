let board = [];
let darkSquares = document.getElementsByClassName("dark-square");

function createBoard() {
    board = [];

    for (let i = 0; i < 32; i++) {
        board.push("");
    }

    let j = 0;

    for (let k = 0; k < darkSquares.length; k++) {
        board.splice(j, 0, darkSquares[k]);
        j += 2;
    }
}

window.onload = function() {
    createBoard();
};
