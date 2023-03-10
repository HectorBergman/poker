import {Hand, Pokerhand, Hands, Card} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, royal_flush, straight_flush, flush, straight, best_straight_hand} from './poker_hands'
import { sorter } from './sorting';
import { pair, Pair } from '../lib/list';

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
export function winners(one: Hand, two: Hand): Pair<string, Hand> {
    let player1 = hand_rating(one);
    let player2 = hand_rating(two);
    if (player1.best_hand != undefined && player2.best_hand != undefined){
        if (player1.rang < player2.rang) {
            return pair("Player 1 wins", player1.best_hand);
        } else if (player1.rang > player2.rang) {
            return pair("Player 2 wins", player2.best_hand);
        } else {
            if (player1.value !== undefined && player2.value !== undefined) {
                if (player1.value > player2.value) {
                    return pair("Player 1 wins", player1.best_hand);
                } else if (player1.value < player2.value) {
                    return pair("Player 2 wins", player2.best_hand);
                } else {
                    if (player1.value2 !== undefined && player2.value2 !== undefined) {
                        if (player1.value2 > player2.value2) {
                            return pair("Player 1 wins", player1.best_hand);
                        } else if (player1.value2 < player2.value2) {
                            return pair("Player 2 wins", player2.best_hand);
                        } else {
                            if (player1.best_hand != undefined && player2.best_hand != undefined) {
                                if (player1.best_hand[4].value > player2.best_hand[4].value) {
                                    return pair("Player 1 wins", player1.best_hand);
                                } else if (player1.best_hand[4].value < player2.best_hand[4].value) {
                                    return pair("Player 2 wins", player2.best_hand);
                                } else {
                                    let hand: Hand = []
                                    return pair("It's a tie", hand);
                                }
                            }
                            let hand: Hand = [];
                            return pair("It's a tie", hand);
                        }
                    }
                    if (player1.best_hand != undefined && player2.best_hand != undefined) {
                        if (player1.best_hand[4].value > player2.best_hand[4].value) {
                            return pair("Player 1 wins", player1.best_hand);
                        } else if (player1.best_hand[4].value < player2.best_hand[4].value) {
                            return pair("Player 2 wins", player2.best_hand);
                        } else {
                            let hand: Hand = []
                            return pair("It's a tie", hand)
                        }
                    }
                    let hand: Hand = [];
                    return pair("It's a tie", hand);
                }
            }
            if (player1.best_hand != undefined && player2.best_hand != undefined) {
                if (player1.best_hand[4].value > player2.best_hand[4].value) {
                    return pair("Player 1 wins", player1.best_hand);
                } else if (player1.best_hand[4].value < player2.best_hand[4].value) {
                    return pair("Player 2 wins", player2.best_hand);
                } else {
                    let hand: Hand = []
                    return pair("It's a tie", hand);
                }
            }
            let hand: Hand = []
            return pair("It's a tie", hand);
            }
        }
    let hand: Hand = []
    return pair("Unvalid game", hand);
}



