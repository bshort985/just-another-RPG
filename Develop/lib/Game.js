//  the Game object will certainly need access to Player and Enemy for the game logic to work. We will also be collecting user input, so we'll need the Inquirer package as well.

const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {

    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function() {

    this.enemies.push(new Enemy("goblin", "sword"));
    this.enemies.push(new Enemy("orc", "baseball bat"));
    this.enemies.push(new Enemy("skeleton", "axe"));

    this.curentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: "text",
            name: "name",
            message: "What is your name?"
        })

        // destructure name from the prompt object

        .then(({ name }) => {
            this.player = new Player(name);

            this.startBattle();
        });

};

module.exports = Game;