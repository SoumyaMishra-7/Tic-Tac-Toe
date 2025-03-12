const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('playAgain'); // Ensure ID matches your HTML button
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("winnerMessage").textContent = `${board[a]} Wins!`;
            document.getElementById("winnerMessage").classList.remove("hidden");
            document.getElementById("playAgain").classList.remove("hidden");
            document.getElementById("exit").classList.remove("hidden");
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("winnerMessage").textContent = "It's a Draw!";
        document.getElementById("winnerMessage").classList.remove("hidden");
        document.getElementById("playAgain").classList.remove("hidden");
        document.getElementById("exit").classList.remove("hidden");
        gameActive = false;
    }
};

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
   
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';

    
    cells.forEach(cell => cell.textContent = "");

    document.getElementById("winnerMessage").classList.add("hidden");
    document.getElementById("playAgain").classList.add("hidden");
    document.getElementById("exit").classList.add("hidden");

   
    startGame(gameMode);
}
