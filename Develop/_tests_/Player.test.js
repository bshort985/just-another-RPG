// new Player('Dave') created a new player object that had four properties. The object had a name property equal to 'Dave' and three additional Number properties.

const Player = require("../lib/Player");
const Potion = require('../lib/Potion');

jest.mock("../lib/Potion");

console.log(new Potion);

test("creates a player object", () => {
    const player = new Player("Dave");

    expect(player.name).toBe("Dave");
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
    
});

