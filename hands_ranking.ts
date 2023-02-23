import {Hand, Pokerhand} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, royal_flush, straight_flush, flush, straight} from './poker_hands'

/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */

function hand_rating(hand: Hand): Pokerhand {
    return royal_flush(hand).exists
           ? {exists: true, rang: 1}
           : straight_flush(hand).exists
           ? {exists: true, rang: 2}
           :has_four_of_akind(hand).exists
           ? {exists: true, rang: 3}
           : has_fullhouse(hand).exists
           ? {exists: true, rang: 4}
           : flush(hand).exists
           ? {exists: true, rang: 5}
           : straight(hand).exists
           ? {exists: true, rang: 6}
           : has_three_of_akind(hand).exists
           ? {exists: true, rang: 7}
           : has_two_pairs(hand).exists
           ? {exists: true, rang: 8}
           : has_pair(hand).exists
           ? {exists: true, rang: 9}
           : {exists: true, rang: 10};
}

/**
 * Tells who is the winner of the round
 * @precondition There is only two players
 * @param one The hand of the first player
 * @param two The hand of the second player
 * @returns String that tells who had won the round
 */
function winners(one: Hand, two: Hand): string {
    let player1 = hand_rating(one);
    let player2 = hand_rating(two);
    if (player1.rang !== undefined  && player2.rang !== undefined) {
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
                    return "It's a tie";
                }
            }
            return "It's a tie";
        }
    }
    return "Unvalid game";
}