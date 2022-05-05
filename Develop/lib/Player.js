const Potion = require('../lib/Potion');
const Character = require("../lib/Character");

// Player class inherates the Chatacter class (extends) 

class Player extends Character {
    constructor(name = ""){
        super(name);
    
    this.inventory = [new Potion("health"), new Potion()];
    }



    // inherit prototype methods from Character here:



    // returns an object with various player properties

    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns the inventory array or false if empty

    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    // adding a potion to the players inventory

    addPotion(potion) {
        this.inventory.push(potion); // .push() is an Array method that adds an item to the end of an array.
    };

    usePotion(index){
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

};



module.exports = Player;