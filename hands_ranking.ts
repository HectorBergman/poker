import {royal_flush, straight_flush, flush, straight} from './hands';
import {Hand} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs} from './poker_hands'

/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */

function hand_rating(hand: Hand): number {
    return royal_flush(hand)
           ? 1
           : straight_flush(hand)
           ? 2
           :has_four_of_akind(hand)
           ? 3
           : has_fullhouse(hand)
           ? 4
           : flush(hand)
           ? 5
           : straight(hand)
           ? 6
           : has_three_of_akind(hand)
           ? 7
           : has_two_pairs(hand)
           ? 8
           : has_pair(hand)
           ? 9
           : 10;
}

/**
 * Tells who is the winner of the round
 * @param one The hand of the first player
 * @param two The hand of the second player
 * @returns String that tells who had won the round
 */
function winners(one: Hand, two: Hand): string {
    let player1 = hand_rating(one);
    let player2 = hand_rating(two);
    if (player1 < player2) {
        return "Player 1 wins"
    } else if (player1 > player2) {
        return "Player 2 wins"
    } else {
        return "It's a tie"
    }
}