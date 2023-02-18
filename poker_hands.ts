import {Hand, Card, Pokerhand } from './poker_types'
//function highcard()

/**
 * Checks if a given hand has a pair or not
 * @param hand (Hand) a hand of cards, which already contain a pair
 * @param card_number (number) states how many cards the hand has
 * @returns a Pokerhand tagged with "pair", with a boolean and the value of the pair
 */
function has_pair(hand: Hand, card_number: number = 7): Pokerhand {
    if (hand[card_number - 2] === undefined) {
        return {exists: false, name: "pair"};
    } else {
    let card: Card = hand[card_number - 1]
    for (let i = 0; i < card_number - 1; i += 1) {
        if (card.value === hand[i].value) {
            return {exists: true, value: card.value, name: "pair"};
        } else {
            continue
        }
    }
    return has_pair(hand, card_number - 1);
}
}



/**
 * Helper function: checks if a hand has more than a pair of a given value
 * @param hand (Hand) a hand of cards, which already contain a pair
 * @param card_number (number) states how many cards the hand has
 * @param i (number) is for indexing
 * @param j (number) count number of cards which are the same
 * @returns number of cards with the same value
 */
function count_same_cards(hand: Hand, value: number, i: number = 0, j: number = 0): number {
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
function has_three_of_akind(hand: Hand, card_number: number = 7): Pokerhand {
    const pair = has_pair(hand, card_number);
    if (pair.exists && pair.value !== undefined) {
        const i = count_same_cards(hand, pair.value);
        return i >= 3 
            ? {exists: true, value: pair.value, name: "three of a kind"}
            : {exists: false, name: "three of a kind"}
    } else {
        return {exists:false, name:"three of a kind"}
    }
}

/**
 * Checks if a hand has a three of a kind
 * @param hand (Hand) a hand of cards
 * @param card_number (number) states how many cards the hand has
 * @returns a Pokerhand tagged with "four of a kind", with a boolean and the value of the four of a kind
 */
function has_four_of_akind(hand: Hand, card_number: number = 7): Pokerhand {
    const pair = has_pair(hand, card_number);
    if (pair.exists && pair.value !== undefined) {
        const i = count_same_cards(hand, pair.value);
        return i === 4 
            ? {exists: true, value: pair.value, name: "four of a kind"}
            : {exists: false, name: "four of a kind"}
    } else {
        return {exists:false, name:"four of a kind"}
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
function make_new_hand(hand: Hand, new_hand: Hand, value: number, i: number = 0, j: number = 0): Hand {
    if (hand[i] === undefined) {
        return new_hand;
    } else {
        if (hand[i].value == value) {
            return make_new_hand(hand, new_hand, value, i + 1, j);
        } else {
            new_hand[j] = hand[i];
            return make_new_hand(hand, new_hand, value, i + 1, j + 1)
        }
    }
}

/**
 * Checks if a hand has two pairs
 * @param hand (Hand) a hand of cards
 * @param card_number (number) states how many cards the hand has
 * @returns a Pokerhand tagged with "two pairs", with a boolean and values of the two pairs
 */
function has_two_pairs(hand: Hand, card_number: number = 7): Pokerhand{
    const pair = has_pair(hand, card_number);
    if (pair.exists && pair.value !== undefined) {
        const new_hand: Hand = make_new_hand(hand, [], pair.value);
        const second_pair =  has_pair(new_hand, new_hand.length);
        if (second_pair.exists) {
            return {exists: true, value: pair.value, value2: second_pair.value, name: "two pairs"}
        } else {
            return  {exists: false, name: "two pairs"}
        }
    } else {
        return {exists: false, name: "two pairs"}
    }
}

/**
* Checks if a hand has full house 
* @param hand (Hand) a hand of cards
* @param card_number (number) states how many cards the hand has
* @returns a Pokerhand tagged with "full house", with a boolean and values of the three of a kind and the pair
*/
function has_fullhouse(hand: Hand, card_number: number = 7): Pokerhand {
    const trio: Pokerhand = has_three_of_akind(hand);
    if (trio.exists && trio.value !== undefined) {
        const new_hand = make_new_hand(hand, [], trio.value);
        const add_pair = has_pair(new_hand, new_hand.length);
        return add_pair.exists
            ? {exists: true, value: trio.value, value2: add_pair.value, name: "full house"}
            : {exists: false, name: "full house"};
    } else {
        return {exists: false, name: "full house"};
    }
}


const hand1: Hand = [{suit: 3, value: 3}, {suit: 0, value: 2}, {suit: 1, value: 3}, 
    {suit: 1, value: 5}, {suit: 1, value: 2}, {suit: 3, value: 3}, {suit: 2, value: 3}];

console.log(has_pair(hand1));
console.log(has_three_of_akind(hand1));
console.log(has_four_of_akind(hand1));
console.log(has_two_pairs(hand1));
console.log(has_fullhouse(hand1));
