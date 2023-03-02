import {Hand, Pokerhand, Hands, Card} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, royal_flush, straight_flush, flush, straight, best_straight_hand} from './poker_hands'
import { sorter } from './sorting';

/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand.
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */

export function hand_rating(hand: Hand): Pokerhand {
    const sorted = sorter(hand);
    const rf = royal_flush(sorted);
    const sf = straight_flush(sorted);
    const four = has_four_of_akind(sorted);
    const full = has_fullhouse(sorted);
    const flu = flush(sorted);
    const strai = straight(sorted);
    const three = has_three_of_akind(sorted);
    const two = has_two_pairs(sorted);
    const pai = has_pair(sorted);
    const base = best_straight_hand(sorted);

    return rf.exists
           ? {exists: true, name: rf.name, rang: 1, best_hand: rf.best_hand}
           : sf.exists
           ? {exists: true, name: sf.name, value: sf.value, rang: 2, best_hand: sf.best_hand}
           :four.exists
           ? {exists: true, name: four.name, rang: 3, best_hand: four.best_hand}
           : full.exists
           ? {exists: true, name: full.name, value: full.value, value2: full.value2, rang: 4, best_hand: full.best_hand}
           : flu.exists
           ? {exists: true, name: flu.name, rang: 5, best_hand: flu.best_hand}
           : strai.exists
           ? {exists: true, name: strai.name, value: strai.value, rang: 6, best_hand: strai.best_hand}
           : three.exists
           ? {exists: true, name: three.name, value: three.value, rang: 7, best_hand: three.best_hand}
           : two.exists
           ? {exists: true, name: two.name, value: two.value, value2: two.value2, rang: 8, best_hand: two.best_hand}
           : pai.exists
           ? {exists: true, name: pai.name, value: pai.value, rang: 9, best_hand: pai.best_hand}
           : {exists: true, name: 'highcard', value: sorted[sorted.length - 1].value, rang: 10, best_hand: base};
}




//const hand1 = [{suit: 3, value: 13}, {suit: 1, value: 3}, {suit: 2, value: 9}, {suit: 1, value: 10}, {suit: 3, value: 2}, {suit: 3, value: 7}, {suit: 0, value: 8}];
//const hand2 = [{suit: 0, value: 9}, {suit: 1, value: 8}, {suit: 2, value: 9}, {suit: 1, value: 3}, {suit: 3, value: 9}, {suit: 2, value: 2}, {suit: 2, value: 3}];

//console.log(hand_rating(hand1));
//console.log(hand_rating(hand2));


const hand3 = [{suit: 2, value: 9}, {suit: 3, value: 8}, {suit: 3, value: 3}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 3, value: 12}, {suit: 3, value: 6}];
const hand4 = [{suit: 2, value: 9}, {suit: 3, value: 8}, {suit: 3, value: 3}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 2, value: 12}, {suit: 3, value: 13}];
//console.log(hand_rating(hand3));
//console.log(hand_rating(hand4));
const hand1 = [{suit: 3, value: 4}, {suit: 1, value: 9}, {suit: 1, value: 6}, {suit: 1, value: 5}, {suit: 1, value: 14}, {suit: 1, value: 10}, {suit: 3, value: 6}];
const hand2 = [{suit: 3, value: 4}, {suit: 1, value: 9}, {suit: 1, value: 6}, {suit: 1, value: 5}, {suit: 1, value: 13}, {suit: 1, value: 11}, {suit: 2, value: 8}];
//console.log(hand_rating(hand1));
//console.log(hand_rating(hand2));


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
                        if (player1.best_hand != undefined && player2.best_hand != undefined) {
                            if (player1.best_hand[4].value > player2.best_hand[4].value) {
                                return "Player 1 wins";
                            } else {
                                return "Player 2 wins";
                            }
                        }
                        return "It's a tie";
                    }
                }
                if (player1.best_hand != undefined && player2.best_hand != undefined) {
                    if (player1.best_hand[4].value > player2.best_hand[4].value) {
                        return "Player 1 wins";
                    } else {
                        return "Player 2 wins";
                    }
                }
                return "It's a tie";
            }
        }
        if (player1.best_hand != undefined && player2.best_hand != undefined) {
            if (player1.best_hand[4].value > player2.best_hand[4].value) {
                return "Player 1 wins";
            } else {
                return "Player 2 wins";
            }
        }
        return "It's a tie";
        }
    return "Unvalid game";
}

console.log(winners(hand1, hand2));