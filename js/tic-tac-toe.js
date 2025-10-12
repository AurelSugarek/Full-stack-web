// JavaScript for 3x3 Tic Tac Toe
const board = document.getElementById('ticTacToeBoard');
const statusDisplay = document.getElementById('gameStatus');
const winCounterDisplay = document.getElementById('winCounter');
const playAgainButton = document.getElementById('playAgain');
let currentPlayer = 'X';
let gameActive = true;
const gameState = ['', '', '', '', '', '', '', '', ''];
let xWins = 0;
let oWins = 0;

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        updateWinCounter();
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (gameActive && currentPlayer === 'O') {
        handleComputerMove();
    }
}

function handleComputerMove() {
    const bestMove = getBestMove();
    const computerCell = board.children[bestMove];

    handleCellPlayed(computerCell, bestMove);
    handleResultValidation();
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(newGameState, depth, isMaximizing) {
    let scores = { X: -1, O: 1, tie: 0 };
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newGameState.length; i++) {
            if (newGameState[i] === '') {
                newGameState[i] = 'O';
                let score = minimax(newGameState, depth + 1, false);
                newGameState[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newGameState.length; i++) {
            if (newGameState[i] === '') {
                newGameState[i] = 'X';
                let score = minimax(newGameState, depth + 1, true);
                newGameState[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes('') ? null : 'tie';
}

function updateWinCounter() {
    if (currentPlayer === 'X') {
        xWins++;
    } else {
        oWins++;
    }
    winCounterDisplay.innerHTML = `X Wins: ${xWins} | O Wins: ${oWins}`;
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    statusDisplay.innerHTML = '';
    Array.from(board.children).forEach(cell => cell.innerHTML = '');
}

board.addEventListener('click', handleCellClick);
playAgainButton.addEventListener('click', handleRestartGame);

// JavaScript for 6x6 Tic Tac Toe
const board6x6 = document.getElementById('ticTacToeBoard6x6');
const statusDisplay6x6 = document.getElementById('gameStatus6x6');
const playAgainButton6x6 = document.getElementById('playAgain6x6');
let currentPlayer6x6 = 'X';
let gameActive6x6 = true;
const gameState6x6 = Array(36).fill('');

const winningConditions6x6 = [
    // Horizontal
    ...Array(6).fill().map((_, r) => Array(3).fill().map((_, c) => [r * 6 + c, r * 6 + c + 1, r * 6 + c + 2, r * 6 + c + 3])),
    // Vertical
    ...Array(6).fill().map((_, c) => Array(3).fill().map((_, r) => [r * 6 + c, (r + 1) * 6 + c, (r + 2) * 6 + c, (r + 3) * 6 + c])),
    // Diagonal (top-left to bottom-right)
    ...Array(3).fill().map((_, r) => Array(3).fill().map((_, c) => [r * 6 + c, (r + 1) * 6 + c + 1, (r + 2) * 6 + c + 2, (r + 3) * 6 + c + 3])),
    // Diagonal (top-right to bottom-left)
    ...Array(3).fill().map((_, r) => Array(3).fill().map((_, c) => [r * 6 + c + 3, (r + 1) * 6 + c + 2, (r + 2) * 6 + c + 1, (r + 3) * 6 + c])),
].flat();

function handleCellPlayed6x6(clickedCell, clickedCellIndex) {
    gameState6x6[clickedCellIndex] = currentPlayer6x6;
    clickedCell.innerHTML = currentPlayer6x6;
}

function handlePlayerChange6x6() {
    currentPlayer6x6 = currentPlayer6x6 === 'X' ? 'O' : 'X';
    statusDisplay6x6.innerHTML = `Current Turn: ${currentPlayer6x6}`;
}

function handleResultValidation6x6() {
    let roundWon = false;
    for (let i = 0; i < winningConditions6x6.length; i++) {
        const winCondition = winningConditions6x6[i];
        let a = gameState6x6[winCondition[0]];
        let b = gameState6x6[winCondition[1]];
        let c = gameState6x6[winCondition[2]];
        let d = gameState6x6[winCondition[3]];
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay6x6.innerHTML = `Player ${currentPlayer6x6} has won!`;
        gameActive6x6 = false;
        return;
    }

    let roundDraw = !gameState6x6.includes('');
    if (roundDraw) {
        statusDisplay6x6.innerHTML = 'Game ended in a draw!';
        gameActive6x6 = false;
        return;
    }

    handlePlayerChange6x6();
}

function handleCellClick6x6(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(board6x6.children).indexOf(clickedCell);

    if (gameState6x6[clickedCellIndex] !== '' || !gameActive6x6) {
        return;
    }

    handleCellPlayed6x6(clickedCell, clickedCellIndex);
    handleResultValidation6x6();

    if (gameActive6x6 && currentPlayer6x6 === 'O') {
        handleComputerMove6x6();
    }
}

function handleComputerMove6x6() {
    const bestMove = getBestMove6x6();
    const computerCell = board6x6.children[bestMove];

    handleCellPlayed6x6(computerCell, bestMove);
    handleResultValidation6x6();
}

function heuristicEvaluation6x6(state) {
    let score = 0;
    for (let condition of winningConditions6x6) {
        let oCount = 0;
        let xCount = 0;
        for (let index of condition) {
            if (state[index] === 'O') oCount++;
            if (state[index] === 'X') xCount++;
        }
        if (oCount > 0 && xCount === 0) {
            score += Math.pow(10, oCount); // Increase the weight for 'O'
        }
        if (xCount > 0 && oCount === 0) {
            score -= Math.pow(10, xCount + 1); // Increase the penalty for 'X'
        }
    }
    return score;
}

function getBestMove6x6() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < gameState6x6.length; i++) {
        if (gameState6x6[i] === '') {
            gameState6x6[i] = 'O';
            let score = heuristicEvaluation6x6(gameState6x6);
            gameState6x6[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function handleRestartGame6x6() {
    gameActive6x6 = true;
    currentPlayer6x6 = 'X';
    gameState6x6.fill('');
    statusDisplay6x6.innerHTML = 'Current Turn: X';
    Array.from(board6x6.children).forEach(cell => cell.innerHTML = '');
}
board6x6.addEventListener('click', handleCellClick6x6);
playAgainButton6x6.addEventListener('click', handleRestartGame6x6);
