import fs from 'fs';

const filePath = './day_01/riddle01.txt';
const spelledOutNumbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];

function findNumbers(line: string): string[] {
    const numbers: string[] = [];

    for (let i = 0; i < line.length; i++) {

        // check if char is a number
        if (line[i].match(/[0-9]/)) {
            numbers.push(line[i]);
        }

        const subString = line.substring(i);

        // check if subString starts with a spelled out number
        const index = spelledOutNumbers.findIndex((spelledOutNumber) => {
            if (subString.startsWith(spelledOutNumber)) {
                return spelledOutNumbers.indexOf(spelledOutNumber);
            }
        });

        if (index !== -1) {
            numbers.push(index.toString());
        }
    }

    return numbers;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // go through all the lines
    const lines = data.split('\n');
    let sum = 0;
    for (const line of lines) {
        const numbers = findNumbers(line);
        sum += Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    }

    console.log(`The sum is ${sum}`);
});
