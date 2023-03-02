import {Hand, Pokerhand, Hands, Card} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, royal_flush, straight_flush, flush, straight} from './poker_hands'
import { sorter } from './sorting';

/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand.
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */

export function hand_rating(hand: Hand): Pokerhand {
    const sorted = sorter(hand);
    return royal_flush(sorted).exists
           ? {exists: true, rang: 1}
           : straight_flush(sorted).exists
           ? {exists: true, value: straight_flush(sorted).value, rang: 2}
           :has_four_of_akind(sorted).exists
           ? {exists: true, rang: 3, best_hand: has_four_of_akind(sorted).best_hand}
           : has_fullhouse(sorted).exists
           ? {exists: true, value: has_fullhouse(sorted).value, value2: has_fullhouse(sorted).value2, rang: 4}
           : flush(sorted).exists
           ? {exists: true, rang: 5}
           : straight(sorted).exists
           ? {exists: true, value: straight(sorted).value, rang: 6}
           : has_three_of_akind(sorted).exists
           ? {exists: true, value: has_three_of_akind(sorted).value, rang: 7}
           : has_two_pairs(sorted).exists
           ? {exists: true, value: has_two_pairs(sorted).value, value2: has_two_pairs(sorted).value2, rang: 8}
           : has_pair(sorted).exists
           ? {exists: true, value: has_pair(sorted).value, rang: 9}
           : {exists: true, value: sorted[sorted.length - 1].value, rang: 10};
}

const hand1: Hand = [{suit: 0, value: 5}, {suit: 0, value: 3}, {suit: 1, value: 2}, 
    {suit: 2, value: 5}, {suit: 1, value: 5}, {suit: 3, value: 4}, {suit: 2, value: 5}];

console.log(hand_rating(hand1));

/*
const hand1 = [{suit: 3, value: 13}, {suit: 1, value: 3}, {suit: 2, value: 9}, {suit: 1, value: 10}, {suit: 3, value: 2}, {suit: 3, value: 7}, {suit: 0, value: 8}];
const hand2 = [{suit: 3, value: 13}, {suit: 1, value: 3}, {suit: 2, value: 9}, {suit: 1, value: 10}, {suit: 3, value: 2}, {suit: 2, value: 2}, {suit: 2, value: 3}];

console.log(hand_rating(hand1));
console.log(hand_rating(hand2));
*/
/*
const hand3 = [{suit: 2, value: 9}, {suit: 3, value: 8}, {suit: 3, value: 3}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 3, value: 12}, {suit: 3, value: 6}];
const hand4 = [{suit: 2, value: 9}, {suit: 3, value: 8}, {suit: 3, value: 3}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 2, value: 3}, {suit: 3, value: 13}];
console.log(hand_rating(hand3));
console.log(hand_rating(hand4));
const hand1 = [{suit: 3, value: 4}, {suit: 1, value: 9}, {suit: 1, value: 6}, {suit: 1, value: 5}, {suit: 1, value: 14}, {suit: 1, value: 10}, {suit: 3, value: 6}];
const hand2 = [{suit: 3, value: 4}, {suit: 1, value: 9}, {suit: 1, value: 6}, {suit: 1, value: 5}, {suit: 1, value: 14}, {suit: 0, value: 11}, {suit: 2, value: 8}];
console.log(hand_rating(hand1));
console.log(hand_rating(hand2));
*/

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

//console.log(winners(hand3, hand4));
const hand3 = [{suit: 3, value: 11}, {suit: 1, value: 6}, {suit: 1, value: 13}, {suit: 2, value: 2}, {suit: 1, value: 8}, {suit: 3, value: 6}, {suit: 0, value: 6}];
const hand4 = [{suit: 2, value: 8}, {suit: 0, value: 3},{suit: 1, value: 13}, {suit: 2, value: 2}, {suit: 1, value: 8}, {suit: 3, value: 6}, {suit: 0, value: 6}];
console.log(winners(hand3, hand4));