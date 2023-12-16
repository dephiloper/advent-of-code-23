import fs from 'fs';

const filePath = './day_06/races.txt';

export function day06() {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    const times: number[] = [];
    const distances: number[] = [];

    lines.forEach((line, index) => {
        // replace multiple spaces and tabs with a single space
        line = line.replace(/\s\s+/g, ' ');

        line = line.split(': ')[1];

        if (index === 0) {
            times.push(...line.split(' ').map(Number));
        } else {
            distances.push(...line.split(' ').map(Number));
        }
    });

    let betterTimesPerRace: number[] = [];

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];
        betterTimesPerRace.push(0);
        for (let j = 0; j <= time; j++) {
            const buttonHold = j; // aka boat speed mm/ms
            const timeLeft = time - j;
            const distanceTravelled = buttonHold * timeLeft; // in mm
            if (distanceTravelled > distance) {
                // console.log(`race: ${i + 1}, hold down: ${buttonHold}ms, time left: ${timeLeft}ms, distace: ${distanceTravelled}mm`);
                betterTimesPerRace[i]++;
            }
        }
    }

    // multiply all the better times together
    let betterTimesMultiplied = 1;
    betterTimesPerRace.forEach((betterTime) => {
        betterTimesMultiplied *= betterTime;
    });

    console.log('What do you get if you multiply these numbers together?', betterTimesMultiplied);
}
