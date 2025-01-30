const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Set initial message
messageDisplay.textContent = `Player ${currentPlayer}'s Turn`;
messageDisplay.className = 'message player-turn'; // Set class for player's turn

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return; // Cell already filled or game is over
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Add class to change color
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class

    checkResult();
}

// Check for a win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `Player ${currentPlayer} wins!`;
        messageDisplay.className = 'message winner'; // Set class for winner
        gameActive = false;
        updateScore();
        return;
    }

    // Check for draw
    if (!gameState.includes('')) {
        messageDisplay.textContent = "It's a draw!";
        messageDisplay.className = 'message draw'; // Set class for draw
        gameActive = false;
        return;
    }

    // Change turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    messageDisplay.className = 'message player-turn'; // Set class for player's turn
}

// Update score
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        document.getElementById('scoreO').textContent = `Player O: ${scoreO}`;
    }
}

// Reset game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = `Player ${currentPlayer}'s Turn`; // Reset message
    messageDisplay.className = 'message player-turn'; // Reset class

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove color classes
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);