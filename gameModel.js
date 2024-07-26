// gameModel.js

export default class GameModel {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.board = this.createBoard();
    }

    createBoard() {
        return Array.from({ length: 12 }, (_, id) => ({ id, hasMole: false }));
    }

    resetGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.board = this.createBoard();
    }

    spawnMole() {
        const availableBlocks = this.board.filter(block => !block.hasMole);
        if (availableBlocks.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableBlocks.length);
            this.board[availableBlocks[randomIndex].id].hasMole = true;
        }
    }

    hitMole(id) {
        const block = this.board[id];
        if (block.hasMole) {
            block.hasMole = false;
            this.score++;
            return true;
        }
        return false;
    }

    removeAllMoles() {
        this.board.forEach(block => block.hasMole = false);
    }
}
