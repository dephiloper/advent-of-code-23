import fs from 'fs';
const filePath = './day_04/cards.txt';

class Card {
    winningNumbers: number[] = [];
    drawnNumbers: number[] = [];
    matchingNumbers: number[] = [];
    score: number = 0;
}

export function day04() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const lines = data.split('\n');
        const cards: Card[] = [];

        // format 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'

        for (const line of lines) {
            const card = new Card();

            // remove Card index
            const rawCards = line.split(': ')[1]
                // replace all multiple spaces with one space
                .replace(/\s\s+/g, ' ')
                // separate the two parts
                .split(' | ');

            card.winningNumbers = rawCards[0].split(' ').map((number) => Number(number));
            card.drawnNumbers = rawCards[1].split(' ').map((number) => Number(number));

            // find matching numbers
            for (const number of card.winningNumbers) {
                if (card.drawnNumbers.includes(number)) {
                    card.matchingNumbers.push(number);
                }
            }
            card.score = Math.pow(2, card.matchingNumbers.length - 1);
            card.score = card.score >= 1 ? card.score : 0;
            cards.push(card);
        }

        // console.log(cards);
        console.log('How many points are they worth in total?', cards.reduce((acc, card) => acc + card.score, 0));
    });

}