export default class GameView {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.timeLeftElement = document.getElementById('timeLeft');
        this.gameBoard = document.getElementById('gameBoard');
    }

    renderScore(score) {
        this.scoreElement.textContent = score;
    }

    renderTimeLeft(timeLeft) {
        this.timeLeftElement.textContent = timeLeft;
    }

    renderBoard(board) {
        this.gameBoard.innerHTML = '';
        board.forEach(block => {
            const blockElement = document.createElement('div');
            blockElement.classList.add('block');
            if (block.hasMole) {
                blockElement.classList.add('mole');
                blockElement.textContent = 'Mole';
            }
            blockElement.addEventListener('click', () => this.onBlockClick(block.id));
            this.gameBoard.appendChild(blockElement);
        });
    }

    onBlockClick(id) {
        // To be implemented by the controller
    }

    setOnBlockClick(callback) {
        this.onBlockClick = callback;
    }
}
