class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.scores = { X: 0, O: 0, draws: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Store DOM elements as properties for easy access
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('currentPlayer');
        this.gameStatusElement = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.resetScoreBtn = document.getElementById('resetScoreBtn');

        this.initializeGame();
    }

    initializeGame() {
        // Add event listeners once during initialization
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
        
        this.resetBtn.addEventListener('click', this.resetGame.bind(this));
        this.resetScoreBtn.addEventListener('click', this.resetScore.bind(this));
        
        this.updateDisplay();
        this.updateScoreDisplay();
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (this.gameBoard[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index, cell);
    }

    makeMove(index, cell) {
        this.gameBoard[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add('taken', this.currentPlayer.toLowerCase());

        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            this.updateDisplay();
        }
    }

    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.gameBoard[index] === this.currentPlayer;
            });
        });
    }

    checkDraw() {
        return this.gameBoard.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.highlightWinningCells();
        this.gameStatusElement.textContent = `🎉 Player ${this.currentPlayer} Wins!`;
        this.gameStatusElement.className = 'game-status winner';
        this.currentPlayerElement.textContent = 'Game Over';
        this.updateScoreDisplay();
    }

    handleDraw() {
        this.gameActive = false;
        this.scores.draws++;
        this.gameStatusElement.textContent = "🤝 It's a Draw!";
        this.gameStatusElement.className = 'game-status draw';
        this.currentPlayerElement.textContent = 'Game Over';
        this.updateScoreDisplay();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    highlightWinningCells() {
        const winningLine = this.winningConditions.find(condition => {
            return condition.every(index => this.gameBoard[index] === this.currentPlayer);
        });
        
        if (winningLine) {
            winningLine.forEach(index => {
                this.cells[index].classList.add('winning');
            });
        }
    }

    updateDisplay() {
        this.currentPlayerElement.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.gameStatusElement.textContent = '';
        this.gameStatusElement.className = 'game-status';
    }

    updateScoreDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        document.getElementById('scoreDraws').textContent = this.scores.draws;
    }

    resetGame() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell'; // Reset all classes
        });

        this.updateDisplay();
    }

    resetScore() {
        this.scores = { X: 0, O: 0, draws: 0 };
        this.updateScoreDisplay();
        this.resetGame();
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});