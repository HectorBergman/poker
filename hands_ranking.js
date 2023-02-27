"use strict";
exports.__esModule = true;
exports.winners = exports.hand_rating = void 0;
var poker_hands_1 = require("./poker_hands");
/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand, hand is sorted in value order.
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */
function hand_rating(hand) {
    return (0, poker_hands_1.royal_flush)(hand).exists
        ? { exists: true, rang: 1 }
        : (0, poker_hands_1.straight_flush)(hand).exists
            ? { exists: true, value: (0, poker_hands_1.straight_flush)(hand).value, rang: 2 }
            : (0, poker_hands_1.has_four_of_akind)(hand).exists
                ? { exists: true, rang: 3 }
                : (0, poker_hands_1.has_fullhouse)(hand).exists
                    ? { exists: true, value: (0, poker_hands_1.has_fullhouse)(hand).value, value2: (0, poker_hands_1.has_fullhouse)(hand).value2, rang: 4 }
                    : (0, poker_hands_1.flush)(hand).exists
                        ? { exists: true, rang: 5 }
                        : (0, poker_hands_1.straight)(hand).exists
                            ? { exists: true, value: (0, poker_hands_1.straight)(hand).value, rang: 6 }
                            : (0, poker_hands_1.has_three_of_akind)(hand).exists
                                ? { exists: true, value: (0, poker_hands_1.has_three_of_akind)(hand).value, rang: 7 }
                                : (0, poker_hands_1.has_two_pairs)(hand).exists
                                    ? { exists: true, value: (0, poker_hands_1.has_two_pairs)(hand).value, value2: (0, poker_hands_1.has_two_pairs)(hand).value2, rang: 8 }
                                    : (0, poker_hands_1.has_pair)(hand).exists
                                        ? { exists: true, value: (0, poker_hands_1.has_pair)(hand).value, rang: 9 }
                                        : { exists: true, value: hand[hand.length - 1].value, rang: 10 };
}
exports.hand_rating = hand_rating;
var hand1 = [{ suit: 3, value: 13 }, { suit: 1, value: 3 }, { suit: 2, value: 9 }, { suit: 1, value: 10 }, { suit: 3, value: 2 }, { suit: 3, value: 7 }, { suit: 0, value: 8 }];
var hand2 = [{ suit: 3, value: 13 }, { suit: 1, value: 3 }, { suit: 2, value: 9 }, { suit: 1, value: 10 }, { suit: 3, value: 2 }, { suit: 2, value: 2 }, { suit: 2, value: 3 }];
console.log(hand_rating(hand1));
console.log(hand_rating(hand2));
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
function winners(one, two) {
    var player1 = hand_rating(one);
    var player2 = hand_rating(two);
    if (player1.rang < player2.rang) {
        return "Player 1 wins";
    }
    else if (player1.rang > player2.rang) {
        return "Player 2 wins";
    }
    else {
        if (player1.value !== undefined && player2.value !== undefined) {
            if (player1.value > player2.value) {
                return "Player 1 wins";
            }
            else if (player1.value < player2.value) {
                return "Player 2 wins";
            }
            else {
                if (player1.value2 !== undefined && player2.value2 !== undefined) {
                    if (player1.value2 > player2.value2) {
                        return "Player 1 wins";
                    }
                    else if (player1.value2 < player2.value2) {
                        return "Player 2 wins";
                    }
                    else {
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
exports.winners = winners;
console.log(winners(hand1, hand2));
