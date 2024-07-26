export default class GameModel {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.board = this.createBoard();
    }

    createBoard() {
        return Array.from({ length: 12 }, (_, id) => ({ id, hasMole: false, hasSnake: false }));
    }

    resetGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.board = this.createBoard();
    }

    spawnMole() {
        const availableBlocks = this.board.filter(block => !block.hasMole && !block.hasSnake);
        if (availableBlocks.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableBlocks.length);
            const moleBlock = this.board[availableBlocks[randomIndex].id];
            moleBlock.hasMole = true;
            setTimeout(() => {
                moleBlock.hasMole = false;
            }, 2000);
        }
    }

    spawnSnake() {
        const randomIndex = Math.floor(Math.random() * this.board.length);
        this.board.forEach(block => block.hasSnake = false);
        this.board[randomIndex].hasSnake = true;
    }

    hitMole(id) {
        const block = this.board.find(block => block.id === id);
        if (block && block.hasMole) {
            block.hasMole = false;
            this.score++;
            return true;
        }
        return false;
    }

    hitSnake(id) {
        const block = this.board.find(block => block.id === id);
        if (block && block.hasSnake) {
            this.endGameWithSnakes();
            return true;
        }
        return false;
    }

    endGameWithSnakes() {
        this.board.forEach(block => block.hasSnake = true);
    }

    removeAllMolesAndSnakes() {
        this.board.forEach(block => {
            block.hasMole = false;
            block.hasSnake = false;
        });
    }
}








