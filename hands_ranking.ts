import {Hand, Pokerhand, Hands, Card} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, royal_flush, straight_flush, flush, straight} from './poker_hands'

/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand, hand is sorted in value order.
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */

export function hand_rating(hand: Hand): Pokerhand {
    return royal_flush(hand).exists
           ? {exists: true, rang: 1}
           : straight_flush(hand).exists
           ? {exists: true, value: straight_flush(hand).value, rang: 2}
           :has_four_of_akind(hand).exists
           ? {exists: true, rang: 3}
           : has_fullhouse(hand).exists
           ? {exists: true, value: has_fullhouse(hand).value, value2: has_fullhouse(hand).value2, rang: 4}
           : flush(hand).exists
           ? {exists: true, rang: 5}
           : straight(hand).exists
           ? {exists: true, value: straight(hand).value, rang: 6}
           : has_three_of_akind(hand).exists
           ? {exists: true, value: has_three_of_akind(hand).value, rang: 7}
           : has_two_pairs(hand).exists
           ? {exists: true, value: has_two_pairs(hand).value, value2: has_two_pairs(hand).value2, rang: 8}
           : has_pair(hand).exists
           ? {exists: true, value: has_pair(hand).value, rang: 9}
           : {exists: true, value: hand[hand.length - 1].value, rang: 10};
}

/*
New implementation in order, should work if more than two players are playing.

function winner(hands: Hands): string {
    function hands_to_rang(hands: Hands): Array<number> {
        let temp_array: Array<number> = [];
        for (let i = 0; i < hands.length; i++) {
            temp_array[i] = hand_rating(hands[i]).rang;
        }
        return temp_array
    }
    let arr = hands_to_rang(hands);
    for (let i = 0; i < arr.length - 1; i++) {

    }
    return '';
}
*/

/**
 * Tells who is the winner of the round
 * @precondition There is only two players
 * @param one The hand of the first player
 * @param two The hand of the second player
 * @returns String that tells who had won the round
 */
export function winners(one: Hand, two: Hand): string {
    let player1 = hand_rating(one);
    let player2 = hand_rating(two);
    if (player1.rang < player2.rang) {
        return "Player 1 wins";
    } else if (player1.rang > player2.rang) {
        return "Player 2 wins";
    } else {
        if (player1.value !== undefined && player2.value !== undefined) {
            if (player1.value > player2.value) {
                return "Player 1 wins";
            } else if (player1.value < player2.value) {
                return "Player 2 wins";
            } else {
                if (player1.value2 !== undefined && player2.value2 !== undefined) {
                    if (player1.value2 > player2.value2) {
                        return "Player 1 wins";
                    } else if (player1.value2 < player2.value2) {
                        return "Player 2 wins";
                    } else {
                        return "It's a tie";
                    }
                }
                return "It's a tie";
            }
        }
        return "It's a tie";
        }
    return "Unvalid game";
}


const card1: Card = {suit: 0, value: 7};
const card2: Card = {suit: 1, value: 8};
const card3: Card = {suit: 0, value: 9};
const card4: Card = {suit: 3, value: 10};
const card5: Card = {suit: 2, value: 11};
const card6: Card = {suit: 1, value: 13};
const card7: Card = {suit: 2, value: 14};

const hand1 = [card1, card2, card3, card4, card5, card6, card7];

console.log(hand_rating(hand1));

const card8: Card = {suit: 0, value: 2};
const card9: Card = {suit: 1, value: 3};
const card10: Card = {suit: 0, value: 4};
const card11: Card = {suit: 3, value: 5};
const card12: Card = {suit: 2, value: 6};
const card13: Card = {suit: 1, value: 7};
const card14: Card = {suit: 2, value: 9};

const hand2 = [card8, card9, card10, card11, card12, card13, card14];

console.log(hand_rating(hand2));

console.log(winners(hand2, hand1));