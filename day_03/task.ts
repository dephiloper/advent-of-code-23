import fs from 'fs';
const filePath = './day_03/engine.txt';

class Part {
    value: number = 0;
    indices: number[] = [];
}

class Symbol {
    value: string = '';
    index: number = -1;
}

// 0 1 2
// 3 X 5
// 6 7 8

// w = 3, h = 3
// X = 4

function findNeighborSymbols(dimensions: { w: number, h: number }, part: Part, symbols: Symbol[]) {
    const neighborSymbols = new Set<Symbol>();

    for (const index of part.indices) {
        const partLine = Math.floor(index / dimensions.w);

        const neighbors = [
            index - 1, // left
            index + 1, // right
            index - dimensions.w, // top
            index + dimensions.w, // bottom
            index - dimensions.w - 1, // top-left
            index - dimensions.w + 1, // top-right
            index + dimensions.w - 1, // bottom-left
            index + dimensions.w + 1, // bottom-right
        ];


        // check if neighbor is a symbol
        for (const neighbor of neighbors) {
            // check if neighbor is out of bounds
            if (neighbor < 0 || neighbor >= dimensions.w * dimensions.h) {
                continue;
            }

            // check if neighbor is two lines apart
            const neighborLine = Math.floor(neighbor / dimensions.w);
            if (Math.abs(partLine - neighborLine) > 1) {
                continue;
            }

            const neighborSymbol = symbols.find(s => s.index === neighbor);
            if (neighborSymbol) {
                neighborSymbols.add(neighborSymbol);
            }
        }
    }

    return neighborSymbols;
}

export function day03() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // go through all the lines
        const lines = data.split('\n');
        const height = lines.length;
        const width = lines[0].length;
        const flattened = lines.join('');
        const parts: Part[] = [];
        const symbols: Symbol[] = [];

        let part: Part | null = null;
        flattened.split('').forEach((char, index) => {
            // if char is not a number and not a dot
            if (!char.match(/[0-9.]/)) {
                symbols.push({ value: char, index });
            }

            // if char is a number
            if (char.match(/[0-9]/)) {
                if (part === null) {
                    part = new Part();
                    part.value = Number(char);
                }
                else {
                    part.value = part.value * 10 + Number(char);
                }
                part.indices.push(index);
            } else if (part !== null) {
                parts.push(part);
                part = null;
            }
        });

        let enginePartSum = 0;

        parts.forEach(part => {
            const neighborSymbols = findNeighborSymbols({ w: width, h: height }, part, symbols);
            enginePartSum += neighborSymbols.size > 0 ? part.value : 0;
        });

        console.log('What is the sum of all of the part numbers in the engine schematic?', enginePartSum);
    });
}