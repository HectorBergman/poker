import {find_suit, find_value} from './helpers'
import {Hand, Card, Pokerhand } from './poker_types';
//function highcard()

/**
 * Checks if a given hand has a pair or not
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "pair", with a boolean and the value of the pair
 */
export function has_pair(hand: Hand, j = 0): Pokerhand {
    if (hand[j] === undefined) {
        return {exists: false, name: "pair"};
    } else {
    const card: Card = hand[j];
    for (let i = j + 1; hand[i] !== undefined; i += 1) {
        if (card.value === hand[i].value) {
            return {exists: true, value: card.value, name: "pair"};
        } else {
            continue;
        }
    }
    return has_pair(hand, j+1);
}
}





/**
 * Helper function: checks if a hand has more than a pair of a given value
 * @param hand (Hand) a hand of cards, which already contain a pair
 * @param i (number) is for indexing
 * @param j (number) count number of cards which are the same
 * @returns number of cards with the same value
 */
function count_same_cards(hand: Hand, value: number, i = 0, j = 0): number {
    if (hand[i] === undefined) {
        return j;
    } else {
        if (hand[i].value === value) {
            return count_same_cards(hand, value, i + 1, j + 1);
        } else {
            return count_same_cards(hand, value, i + 1, j);
        }
    }
}

/**
 * Checks if a hand has a three of a kind
 * @param hand (Hand) a hand of cards
 * @param card_number (number) states how many cards the hand has
 * @returns a Pokerhand tagged with "three of a kind", with a boolean and the value of the three of a kind
 */
export function has_three_of_akind(hand: Hand): Pokerhand {
    const pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        const i = count_same_cards(hand, pair.value);
        return i >= 3 
            ? {exists: true, value: pair.value, name: "three of a kind"}
            : {exists: false, name: "three of a kind"};
    } else {
        return {exists:false, name:"three of a kind"};
    }
}

/**
 * Checks if a hand has a three of a kind
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "four of a kind", with a boolean and the value of the four of a kind
 */
export function has_four_of_akind(hand: Hand): Pokerhand {
    const pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        const i = count_same_cards(hand, pair.value);
        return i === 4 
            ? {exists: true, value: pair.value, name: "four of a kind"}
            : {exists: false, name: "four of a kind"};
    } else {
        return {exists:false, name:"four of a kind"};
    }
}

/**
 * Makes a new hand by removing an already found pair
 * @param hand (Hand) a hand of cards, which contain a pair 
 * @param new_hand (Hand) a shorter hand without the pair
 * @param value (number) the value of the pair which is removed
 * @param i (number) for indexing the original hand
 * @param j (number) for indexing the new hand
 * @returns a new hand, which does not contain a specified pair
 */
function make_new_hand(hand: Hand, new_hand: Hand, value: number, i = 0, j = 0): Hand {
    if (hand[i] === undefined) {
        return new_hand;
    } else {
        if (hand[i].value == value) {
            return make_new_hand(hand, new_hand, value, i + 1, j);
        } else {
            new_hand[j] = hand[i];
            return make_new_hand(hand, new_hand, value, i + 1, j + 1);
        }
    }
}

/**
 * Checks if a hand has two pairs
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "two pairs", with a boolean and values of the two pairs
 */
export function has_two_pairs(hand: Hand): Pokerhand {
    const pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        const new_hand: Hand = make_new_hand(hand, [], pair.value);
        const second_pair =  has_pair(new_hand);
        if (second_pair.exists) {
            return {exists: true, value: pair.value, value2: second_pair.value, name: "two pairs"};
        } else {
            return  {exists: false, name: "two pairs"};
        }
    } else {
        return {exists: false, name: "two pairs"};
    }
}

/**
* Checks if a hand has full house 
* @param hand (Hand) a hand of cards
* @returns a Pokerhand tagged with "full house", with a boolean and values of the three of a kind and the pair
*/
export function has_fullhouse(hand: Hand): Pokerhand {
    const trio: Pokerhand = has_three_of_akind(hand);
    if (trio.exists && trio.value !== undefined) {
        const new_hand = make_new_hand(hand, [], trio.value);
        const add_pair = has_pair(new_hand);
        return add_pair.exists
            ? {exists: true, value: trio.value, value2: add_pair.value, name: "full house"}
            : {exists: false, name: "full house"};
    } else {
        return {exists: false, name: "full house"};
    }
}


/**
 * Checks if a given hand is a royal flush
 * @preconditions The array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows if there is a royal flush or not.
 */
export function royal_flush(hand: Hand): Pokerhand {
    const check = straight_flush(hand);
    if (check.exists === true && check.flush !== undefined) {
        let el = check.flush.length;
        if (find_value(check.flush[el - 1]) === 14) {
            return {exists: true, name: 'royal flush'};
        }
    }
    return {exists: false};
}


/**
 * Checks if a given hand is a straight flush.
 * @preconditions The parameter array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
export function straight_flush(hand: Hand): Pokerhand {
    const fl: Pokerhand = flush(hand);
    if (fl.exists === true && fl.flush !== undefined) {
        let check = straight(fl.flush);
        if (check.exists) {
            return {exists: true, flush: fl.flush, name: 'straight flush'};
        }
    }
    return {exists: false};
}


/**
 * Checks if a given hand is a flush or not.
 * @precondition The hand only contains valid cards.
 * @param hand An array of the cards that are avaliable for your hand.
 * @returns Returns a boolean that's true if there is a flush and false if there's not.
 */
export function flush(hand: Hand): Pokerhand {
    let clubs: Hand = [];
    let diamonds: Hand =[];
    let spades: Hand = [];
    let hearts: Hand = [];
    function flush_helper(hand: Hand, i: number, c: number, d: number, s: number, h: number): Pokerhand {
        if (hand[i] !== undefined) {
            if (find_suit(hand[i]) == 0) {
                clubs[c] = hand[i];
                return flush_helper(hand, i + 1, c + 1, d, s, h);
            } else if (find_suit(hand[i]) == 1) {
                diamonds[d] = hand[i];
                return flush_helper(hand, i + 1, c, d + 1, s, h);
            } else if (find_suit(hand[i]) == 2) {
                spades[s] = hand[i];
                return flush_helper(hand, i + 1, c, d, s + 1, h);
            } else {
                hearts[h] = hand[i]
                return flush_helper(hand, i + 1, c, d, s, h + 1);
            }
        } else {
            if (clubs.length >= 5) {
                return {exists: true, flush: clubs, suit: "clubs"};
            } else if (diamonds.length >= 5) {
                return {exists: true, flush: diamonds, suit: "diamonds"};
            } else if (spades.length >= 5) {
                return {exists: true, flush: spades, suit: "spades"};
            } else if (hearts.length >= 5) {
                return {exists: true, flush: hearts, suit: "hearts"};
            } else {
                return {exists: false};
            }
        }
    }
    return flush_helper(hand, 0, 0, 0, 0, 0);
}


/**
 * Checks whether a given hand contains a straight of not.
 * @preconditions Array is sorted in increasing value order.
 * @param hand Array of cards that is to be evaluated
 * @returns Returns a boolean which shows true if it contains a straight and false if it doesn't.
 */
export function straight(hand: Hand): Pokerhand {
    function straight_helper(arr: Array<Card>): Array<Card> {
        let conseq_array: Array<Card> = [];
        let adder = 0;
        for (let i = 0; i < (arr.length - 1); i++) {
            if (find_value(arr[i]) === (find_value(arr[i + 1]) - 1)) {
                conseq_array[adder] = arr[i];
                adder++;
                conseq_array[adder] = arr[i + 1];
            } else if (find_value(arr[i]) === find_value(arr[i + 1])) {
                continue;
            } else {
                if (conseq_array.length >= 5) {
                    return conseq_array;
                } else {
                    conseq_array = [];
                    adder = 0;
                }
            }
        }
        return conseq_array;
    }
    if (straight_helper(hand).length >= 5) {
        return {exists: true, name: 'straight'};
    }
    return {exists: false};
}


const hand1: Hand = [{suit: 3, value: 3}, {suit: 0, value: 2}, {suit: 1, value: 3}, 
    {suit: 1, value: 5}, {suit: 1, value: 2}, {suit: 3, value: 3}, {suit: 2, value: 3}];

console.log(has_pair(hand1));
console.log(has_three_of_akind(hand1));
console.log(has_four_of_akind(hand1));
console.log(has_two_pairs(hand1));
console.log(has_fullhouse(hand1));
