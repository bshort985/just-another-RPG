// Previous code using ES5 constructor 

// function Potion(name){
//     this.types = ["strength", "agility", "health"];
//     this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

//     if (name === "health") {
//         this.value = Math.floor(Math.random() * 10 + 30);
//     } else {
//         this.value = Math.floor(Math.random() * 5 + 7);
//     }
// };

// refactored code into ES6 class 

class Potion {
    constructor(name) {
        this.types = ["strength", "agility", "health"];
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === "health") {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
};


module.exports = Potion;