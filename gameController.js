import GameModel from './gameModel.js';
import GameView from './gameView.js';

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.setOnBlockClick(this.handleBlockClick.bind(this));
        document.getElementById('startGame').addEventListener('click', this.startGame.bind(this));
    }

    startGame() {
        this.model.resetGame();
        this.view.renderScore(this.model.score);
        this.view.renderTimeLeft(this.model.timeLeft);
        this.updateBoard();

        this.gameInterval = setInterval(() => {
            if (this.countMolesOnBoard() < 3) {
                this.model.spawnMole();
                this.updateBoard();
            }
        }, 1000);

        this.timerInterval = setInterval(() => {
            this.model.timeLeft--;
            this.view.renderTimeLeft(this.model.timeLeft);
            if (this.model.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    handleBlockClick(id) {
        if (this.model.hitMole(id)) {
            this.view.renderScore(this.model.score);
            this.updateBoard();
        }
    }

    updateBoard() {
        this.view.renderBoard(this.model.board);
    }

    countMolesOnBoard() {
        return this.model.board.filter(block => block.hasMole).length;
    }

    endGame() {
        clearInterval(this.gameInterval);
        clearInterval(this.timerInterval);
        alert('Time is Over!');
        this.model.removeAllMoles();
        this.updateBoard();
    }
}

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);









