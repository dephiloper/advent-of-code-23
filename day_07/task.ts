import fs from 'fs';

const filePath = './day_07/hands_bids.txt';

class Play {
    hand: CardType[] = [];
    bid: number = -1;
    handType?: HandType;
}

enum CardType {
    A = 'A',
    K = 'K',
    Q = 'Q',
    T = 'T',
    V9 = '9',
    V8 = '8',
    V7 = '7',
    V6 = '6',
    V5 = '5',
    V4 = '4',
    V3 = '3',
    V2 = '2',
    J = 'J'
}

enum HandType {
    HighCard = 0,
    OnePair = 1,
    TwoPairs = 2,
    ThreeOfAKind = 3,
    FullHouse = 4,
    FourOfAKind = 5,
    FiveOfAKind = 6,
}

function getHandType(hand: CardType[]): HandType {
    const sorted = getSortedOccurrences(hand);
    applyJokerRule(sorted);

    const iterator = sorted.values();
    const first = iterator.next().value;
    const second = iterator.next().value;

    // check for five of a kind
    if (first === 5) {
        return HandType.FiveOfAKind;
    }

    // check for four of a kind
    if (first === 4) {
        return HandType.FourOfAKind;
    }

    // check for full house
    if (first === 3 && second === 2) {
        return HandType.FullHouse;
    }

    // check for three of a kind
    if (first === 3) {
        return HandType.ThreeOfAKind;
    }

    // check for two pairs
    if (first === 2 && second === 2) {
        return HandType.TwoPairs;
    }

    // check for one pair
    if (first === 2) {
        return HandType.OnePair;
    }

    // high card
    return HandType.HighCard;
}

function getSortedOccurrences(hand: CardType[]): Map<CardType, number> {
    const cardOccurrences = new Map<CardType, number>();

    for (const card of hand) {
        if (cardOccurrences.has(card)) {
            cardOccurrences.set(card, cardOccurrences.get(card)! + 1);
            continue;
        }

        cardOccurrences.set(card, 1);
    }

    // sort the map based on occurrences
    const sorted = new Map([...cardOccurrences.entries()].sort((a, b) => b[1] - a[1]));

    return sorted;
}

function applyJokerRule(sorted: Map<CardType, number>) {
    if (!sorted.has(CardType.J)) return;

    const jokerCount = sorted.get(CardType.J)!;
    sorted.delete(CardType.J);

    if (jokerCount === 5) {
        sorted.set(CardType.A, 5);
        return;
    }

    // get key of first entry in sorted
    const firstKey = sorted.keys().next().value;
    sorted.set(firstKey, sorted.get(firstKey)! + jokerCount);
}

function sortByHands(a: Play, b: Play) {
    if (a.handType !== b.handType) {
        return b.handType! - a.handType!;
    }

    // if hand types are the same, sort based on first card
    for (let i = 0; i < a.hand.length; i++) {
        if (a.hand[i] !== b.hand[i]) {
            // get enum index of cards
            const aIndex = Object.values(CardType).indexOf(a.hand[i]);
            const bIndex = Object.values(CardType).indexOf(b.hand[i]);
            return aIndex - bIndex;
        }
    }

    return 0; // if all cards are the same, return 0
}

export function day07() {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    const plays: Play[] = lines.map(line => {
        const [handString, bidString] = line.split(' ');
        const hand = Array.from(handString) as CardType[];
        const bid = Number(bidString);
        const handType = getHandType(hand) as HandType;
        return { hand, bid, handType };
    });

    const sortedPlays = plays.sort(sortByHands);

    const totalWinnings = sortedPlays.reduce((acc, curr, index, array) => {
        const rank = array.length - index;
        const added = curr.bid * rank;
        return acc + added;
    }, 0);

    console.log(' What are the total winnings?', totalWinnings);
}

