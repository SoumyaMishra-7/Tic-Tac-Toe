const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('playAgain');
const exitButton = document.getElementById('exit');
const winnerMessage = document.getElementById("winnerMessage");

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameMode = "system"; // "friend" for 2-player mode

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function checkWinner(boardState) {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a]; // Return 'X' or 'O'
        }
    }
    return boardState.includes("") ? null : "tie"; // Return "tie" if board is full
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleMove(index));
});

function handleMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        let result = checkWinner(board);

        if (result) {
            endGame(result);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameMode === "system" && currentPlayer === "O") {
            setTimeout(bestMove, 500); // AI makes a move
        }
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O"; // Try move
            let score = minimax(board, 0, false);
            board[i] = ""; // Undo move

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== -1) {
        placeMove(move);
    }
}

function placeMove(index) {
    board[index] = "O";
    cells[index].textContent = "O";
    let result = checkWinner(board);

    if (result) {
        endGame(result);
        return;
    }

    currentPlayer = 'X';
}

function minimax(boardState, depth, isMaximizing) {
    let result = checkWinner(boardState);
    if (result === "O") return 10 - depth;  // AI wins
    if (result === "X") return depth - 10;  // Player wins
    if (result === "tie") return 0;  // Draw

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                boardState[i] = "O";
                let score = minimax(boardState, depth + 1, false);
                boardState[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                boardState[i] = "X";
                let score = minimax(boardState, depth + 1, true);
                boardState[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function endGame(result) {
    if (result === "tie") {
        winnerMessage.textContent = "It's a Draw!";
    } else {
        winnerMessage.textContent = `${result} Wins!`;
    }
    showEndScreen();
    gameActive = false;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';

    cells.forEach(cell => cell.textContent = "");
    hideEndScreen();

    if (gameMode === "system" && currentPlayer === "O") {
        setTimeout(bestMove, 500);
    }
}

function showEndScreen() {
    winnerMessage.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    exitButton.classList.remove("hidden");
}

function hideEndScreen() {
    winnerMessage.classList.add("hidden");
    restartButton.classList.add("hidden");
    exitButton.classList.add("hidden");
}

restartButton.addEventListener("click", restartGame);
