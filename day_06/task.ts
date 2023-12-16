import fs from 'fs';

const filePath = './day_06/races.txt';

export function day06() {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    let time: number = -1;
    let distance: number = -1;

    lines.forEach((line, index) => {
        // remove all spaces and tabs
        line = line.replace(/\s\s+/g, '');

        line = line.split(':')[1];

        if (index === 0) {
            time = Number(line);
        } else {
            distance = Number(line);
        }
    });


    let betterTimesPerRace: number = 0;

    for (let j = 0; j <= time; j++) {
        const buttonHold = j; // aka boat speed mm/ms
        const timeLeft = time - j;
        const distanceTravelled = buttonHold * timeLeft; // in mm
        if (distanceTravelled > distance) {
            // console.log(`race: ${i + 1}, hold down: ${buttonHold}ms, time left: ${timeLeft}ms, distace: ${distanceTravelled}mm`);
            betterTimesPerRace++;
        }
    }

    console.log('How many ways can you beat the record in this one much longer race?', betterTimesPerRace);
}
