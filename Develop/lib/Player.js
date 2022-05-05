const Potion = require('../lib/Potion');



function Player(name = "") {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion("health"), new Potion()];

};

    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // returns an object with various player properties

    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns the inventory array or false if empty

    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    // checking if player is alive.

    Player.prototype.isAlive = function() {
        if (this.health === 0){
            return false;
        }
        return true;
    };

    // function to take the health of the player when attacked

    Player.prototype.reduceHealth = function(health) {
        this.health -= health;
        if (this.health < 0) {
            this.health = 0;
        }
    };

    // calculating the players attack based off strength

    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // adding a potion to the players inventory

    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion); // .push() is an Array method that adds an item to the end of an array.
    };

    Player.prototype.usePotion = function(index){
        const potion = this.getInventory().splice(index, 1)[0]; // The .splice() method removes items from an array and returns the removed item(s) as a new array. used potion is being taken out of the inventory array and placed in a 'used items' array to be used as the variables for the potion effects.

        // Potion effects on the user 

        switch (potion.name) {
            case "agility": 
                this.agility += potion.value;
                break;

            case "health": 
                this.health += potion.value;
                break;

            case "strength": 
                this.strength += potion.value;
                break;
        }
    };





module.exports = Player;