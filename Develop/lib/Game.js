//  the Game object will certainly need access to Player and Enemy for the game logic to work. We will also be collecting user input, so we'll need the Inquirer package as well.

const inquirer = require("inquirer");
const Enemy = require("../lib/Enemy");
const Player = require("../lib/Player");

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

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: "text",
            name: "name",
            message: "What is your name?"
        })

        // destructure name from the prompt object

        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
};

        // establish who will attack first based on agility stat

        Game.prototype.startNewBattle = function() {
            if (this.player.agility > this.currentEnemy.agility) {
              this.isPlayerTurn = true;
            } else {
              this.isPlayerTurn = false;
            }
            console.log('Your stats are as follows:');
            console.table(this.player.getStats());

            console.log(this.currentEnemy.getDescription());

            this.battle();
          };

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
        .prompt({
            type: "list",
            message: "What you like to do?",
            name: "action",
            choices: ["Attack", "Use Potion"]
        })
        .then(({action}) => {
            if (action === "Use Potion") {
                // check for an empty inventory before trying to display choices to the user. If the inventory is empty, immediately return to end the Player turn. 
                if (!this.player.getInventory()) {
                    console.log("You don't have any potions!");
                    return this.checkEndOfBattle();
                }

                inquirer
                    .prompt({
                        type: "list",
                        message: "Which potion would you like to use?",
                        name: "action",
                        // populate the choices array with strings that contain the Potion name and its index (e.g., '1: health'), then strip out the index after the user has chosen. 
                        // The map() method creates a new array based on the results of a callback function used in the original array.
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })

                    // use the String.prototype.split() method, though, to split on the ': ', giving us an array with the number and Potion name (e.g., ['2', 'agility']). 
                    //Subtracting 1 from the number will put us back at the original array index.
                        .then(({action}) => {
                            const potionDetails = action.split(": ");
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                            this.checkEndOfBattle();
                        });

            }
            
            else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
                this.checkEndOfBattle();
            }
        });
    } 
    else {
        const damage = this.currentEnemy.getAttackValue(); 
        this.player.reduceHealth(damage); // Subtract health from the Player based on Enemy attack value

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

// The inquirer prompts are asynchronous, so we must wait for their promises to be resolved and perform our "end turn" logic in their callbacks.
// After each promise we need to call the end turn logic.

Game.prototype.checkEndOfBattle = function() {

    // verify if both characters are alive and can continue fighting. If so, we should switch the turn order and run battle() again.

    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle(); 
    } 

    // Player is still alive but the Enemy has been defeated. If this is the case, the Player is awarded a Potion, and the roundNumber increases.
    // if there are no more enemies to fight, then the Player has won the overall game. Otherwise, a new battle should start.

    else if (this.player.isAlive() && !this.currentEnemy.isAlive()){
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);

        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }

        else{
            console.log(`You Win!`);
        }
    }
    
    else {
        console.log("You've been defeated!");
      }
};



module.exports = Game;