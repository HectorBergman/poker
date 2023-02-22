import { find_suit, find_value } from "./helpers";
import { Card, Hand, Pokerhand } from "./poker_types";

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
    function flush_helper(hand: Hand, i: number = 0, c: number = 0, d: number = 0, s: number = 0, h: number = 0): Pokerhand {
        if (hand[i] !== undefined) {
            if (find_suit(hand[i]) == 0) {
                clubs[c] = hand[i];
                return flush_helper(hand, i + 1, c + 1, d, s, h);
            } else if (find_suit(hand[i]) == 1) {
                diamonds[d] = hand[i];
                return flush_helper(hand, i + 1, c, d + 1, s, h);
            } else if (find_suit(hand[i]) == 2) {
                spades[h] = hand[i];
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
    return flush_helper(hand);
}




/**
 * Checks whether a given hand contains a straight of not.
 * @preconditions Array is sorted in increasing value order.
 * @param hand Array of cards that is to be evaluated
 * @returns Returns a boolean which shows true if it contains a straight and false if it doesn't.
 */
export function straight(hand: Hand): Pokerhand {
    if (helper_straight_array(hand).length >= 5) {
        return {exists: true, name: 'straight'};
    }
    return {exists: false};
}

function helper_straight_array(arr: Array<Card>): Array<Card> {
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



const card1: Card = {suit: 0, value: 9};
const card2: Card = {suit: 1, value: 9};
const card3: Card = {suit: 3, value: 10};
const card4: Card = {suit: 3, value: 11};
const card5: Card = {suit: 3, value: 12};
const card6: Card = {suit: 3, value: 13};
const card7: Card = {suit: 3, value: 14};

const hand1 = [card1, card2, card3, card4, card5, card6, card7];


console.log(flush(hand1));
console.log(straight(hand1));
console.log(straight_flush(hand1));
console.log(royal_flush(hand1));


//console.log(helper_straight_array(hand1));