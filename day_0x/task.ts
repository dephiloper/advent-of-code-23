import fs from 'fs';

const filePath = './day_0x/placeholder.txt';

export function day06() {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    console.log('lines', lines);
}
