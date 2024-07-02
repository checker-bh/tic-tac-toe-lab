/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie, firstMove;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    firstMove = true;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    squareEls.forEach((square, index) => {
        square.textContent = board[index];
    });
}

function updateMessage() {
    if (firstMove) {
        messageEl.textContent = 'Start playing';
    } else if (!winner && !tie) {
        messageEl.textContent = `Turn: ${turn}`;
    } else if (!winner && tie) {
        messageEl.textContent = 'It\'s a tie!';
    } else {
        messageEl.textContent = `${turn} wins!`;
    }
}

function handleClick(event) {
    const squareIndex = parseInt(event.target.id);
    
    if (board[squareIndex] !== '' || winner) return; // Square already filled or game over

    firstMove = false;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
    });
}

function checkForTie() {
    if (!winner && board.every(square => square !== '')) {
        tie = true;
    }
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

/*----------------------------- Initialize Game -----------------------------*/
init();
