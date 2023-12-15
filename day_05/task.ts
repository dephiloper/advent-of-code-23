import fs from 'fs';

const filePath = './day_05/meals.txt';

/*
seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
*/

enum ProductionElement {
    Unknown = 'unknown',
    Seed = 'seed',
    Soil = 'soil',
    Fertilizer = 'fertilizer',
    Water = 'water',
    Light = 'light',
    Temperature = 'temperature',
    Humidity = 'humidity',
    Location = 'location'
}


class MealTranslationRange {
    destinationRangeStart: number = -1;
    sourceRangeStart: number = -1;
    rangeLength: number = -1;
}

class FoodProductionMap {
    from: ProductionElement = ProductionElement.Unknown;
    to: ProductionElement = ProductionElement.Unknown;;
    translationRanges: MealTranslationRange[] = [];
}

function readMealProductionFile(lines: string[]): FoodProductionMap[] {
    let mealMaps: FoodProductionMap[] = [];

    while (lines.length > 1) {
        const line = lines[0];
        const lastMealMap = mealMaps[mealMaps.length - 1];

        // check if lines[1] is empty or contains just spaces
        if (line === '' || line.match(/^ *$/)) {
            // skip empty line
        }
        // if a line ends with a colon, it's a meal name
        else if (line.endsWith(':')) {
            const mealMap = new FoodProductionMap();
            const mapName = line.split(' ')[0];
            mealMap.from = mapName.split('-')[0] as ProductionElement;
            mealMap.to = mapName.split('-')[2] as ProductionElement;

            mealMaps.push(mealMap);
        } else {
            // a line looks like this: 50 98 2 (destination range start, source range start, range length)
            const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ').map(Number);
            const translationRange = new MealTranslationRange();
            translationRange.destinationRangeStart = destinationRangeStart;
            translationRange.sourceRangeStart = sourceRangeStart;
            translationRange.rangeLength = rangeLength;
            lastMealMap.translationRanges.push(translationRange);
        }

        lines.shift();
    }

    return mealMaps;
}

function translateSeed(seed: number, mealMaps: FoodProductionMap[]): number {
    let startProductionElement = ProductionElement.Seed;
    let translationMap: FoodProductionMap | undefined = mealMaps.find((mealMap) => mealMap.from === startProductionElement)!;
    let goalProductionElement = translationMap.to;

    // console.log(startProductionElement, seed);
    while (goalProductionElement !== ProductionElement.Unknown) {

        // translate value from startProductionElement to goalProductionElement
        for (const translationRange of translationMap!.translationRanges) {
            if (seed >= translationRange.sourceRangeStart && seed < translationRange.sourceRangeStart + translationRange.rangeLength) {
                seed = seed - translationRange.sourceRangeStart + translationRange.destinationRangeStart;
                break;
            }
        }

        // console.log(goalProductionElement, seed);
        translationMap = mealMaps.find((mealMap) => mealMap.from === goalProductionElement);
        
        if (translationMap !== undefined) {
            startProductionElement = translationMap.from;
            goalProductionElement = translationMap.to;
        } else {
            goalProductionElement = ProductionElement.Unknown;
        }
    }

    return seed;
}

export function day05() {
    const filePath = './day_05/meals.txt';
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const seeds = lines[0].split(': ')[1].split(' ').map((seed) => Number(seed));

    // remove lines[0] from lines
    lines.shift();

    const mealMaps = readMealProductionFile(lines);

    // get all translated seeds
    const translatedSeeds = seeds.map((seed) => translateSeed(seed, mealMaps));
    translatedSeeds.sort((a, b) => a - b);
    console.log('What is the lowest location number that corresponds to any of the initial seed numbers?', translatedSeeds[0]);
}
