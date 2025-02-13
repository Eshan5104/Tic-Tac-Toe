const gameboard = document.getElementById('gameboard');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let player1Name = player1Input.value;
let player2Name = player2Input.value;

// Generate the game board dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameboard.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

player1Input.addEventListener('input', () => {
    player1Name = player1Input.value;
    if (currentPlayer === 'X') {
        message.textContent = `${player1Name}'s turn`;
    }
});

player2Input.addEventListener('input', () => {
    player2Name = player2Input.value;
    if (currentPlayer === 'O') {
        message.textContent = `${player2Name}'s turn`;
    }
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWin();
        if(!gameOver) switchPlayer(); // Only switch if the game isn't over
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            const winnerName = gameBoard[a] === 'X' ? player1Name : player2Name;
            message.textContent = `${winnerName} wins!`;
            return;
        }
    }

    if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a tie! Play again.";
        gameOver = true;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    message.textContent = `${currentPlayerName}'s turn`;
}

function resetGame() {
    player1Name = player1Input.value || "Player X";
    player2Name = player2Input.value || "Player O";
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    message.textContent = `${player1Name}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

message.textContent = `${player1Name}'s turn`;