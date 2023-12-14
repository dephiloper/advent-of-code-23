import fs from 'fs';

class Game {
    sets: GameSet[] = [];
    maxGreen: number = 0;
    maxBlue: number = 0;
    maxRed: number = 0;
}

class GameSet {
    green: number = 0;
    blue: number = 0;
    red: number = 0;
    valid: boolean = true;
}

enum MaxValues {
    GREEN = 13,
    BLUE = 14,
    RED = 12
}

const filePath = './day_02/games.txt';


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // go through all the lines
    const lines = data.split('\n');
    const games: Game[] = [];
    for (const line of lines) {
        const game = new Game();
        const content = line.split(': ')[1];
        const rawSets = content.split('; ');
        for (const rawSet of rawSets) {
            const set = new GameSet();
            const elements = rawSet.split(', ');
            for (const element of elements) {
                if (element.includes('green')) {
                    set.green = parseInt(element.split(' ')[0]);
                    game.maxGreen = set.green > game.maxGreen ? set.green : game.maxGreen;
                    set.valid = set.green > MaxValues.GREEN ? false : set.valid;
                }
                if (element.includes('blue')) {
                    set.blue = parseInt(element.split(' ')[0]);
                    game.maxBlue = set.blue > game.maxBlue ? set.blue : game.maxBlue;
                    set.valid = set.blue > MaxValues.BLUE ? false : set.valid;

                }
                if (element.includes('red')) {
                    set.red = parseInt(element.split(' ')[0]);
                    game.maxRed = set.red > game.maxRed ? set.red : game.maxRed;
                    set.valid = set.red > MaxValues.RED ? false : set.valid;
                }
            }

            game.sets.push(set);
        }

        games.push(game);
    }

    let validSetSum = 0;
    let powerOfSetSum = 0;

    games.forEach((game, idx) => {
        if (game.sets.every(set => set.valid)) {
            validSetSum += idx + 1;
        }

        powerOfSetSum += game.maxBlue * game.maxGreen * game.maxRed;
    });

    console.log('What is the sum of the IDs of those games?', validSetSum);
    console.log('What is the sum of the power of these sets?', powerOfSetSum);
});