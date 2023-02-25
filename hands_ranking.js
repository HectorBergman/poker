"use strict";
exports.__esModule = true;
exports.winners = exports.hand_rating = void 0;
var poker_hands_1 = require("./poker_hands");
/**
 * Checks how much the hand is worth.
 * @precondition The hand evaluated is a valid hand
 * @param hand Hand to be evaluated
 * @returns a number which represent how much each hand is worth
 */
function hand_rating(hand) {
    return (0, poker_hands_1.royal_flush)(hand).exists
        ? { exists: true, rang: 1 }
        : (0, poker_hands_1.straight_flush)(hand).exists
            ? { exists: true, rang: 2 }
            : (0, poker_hands_1.has_four_of_akind)(hand).exists
                ? { exists: true, rang: 3 }
                : (0, poker_hands_1.has_fullhouse)(hand).exists
                    ? { exists: true, rang: 4 }
                    : (0, poker_hands_1.flush)(hand).exists
                        ? { exists: true, rang: 5 }
                        : (0, poker_hands_1.straight)(hand).exists
                            ? { exists: true, rang: 6 }
                            : (0, poker_hands_1.has_three_of_akind)(hand).exists
                                ? { exists: true, rang: 7 }
                                : (0, poker_hands_1.has_two_pairs)(hand).exists
                                    ? { exists: true, rang: 8 }
                                    : (0, poker_hands_1.has_pair)(hand).exists
                                        ? { exists: true, rang: 9 }
                                        : { exists: true, rang: 10 };
}
exports.hand_rating = hand_rating;
function winner(hands) {
    function hands_to_rang(hands) {
        var temp_array = [];
        for (var i = 0; i < hands.length; i++) {
            temp_array[i] = hand_rating(hands[i]).rang;
        }
        return temp_array;
    }
    var arr = hands_to_rang(hands);
    for (var i = 0; i < arr.length - 1; i++) {
    }
    return '';
}
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
    if (player1.rang !== undefined && player2.rang !== undefined) {
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
                    return "It's a tie";
                }
            }
            return "It's a tie";
        }
    }
    return "Unvalid game";
}
exports.winners = winners;
var card1 = { suit: 0, value: 7 };
var card2 = { suit: 1, value: 8 };
var card3 = { suit: 0, value: 9 };
var card4 = { suit: 3, value: 10 };
var card5 = { suit: 2, value: 11 };
var card6 = { suit: 1, value: 13 };
var card7 = { suit: 2, value: 14 };
var hand1 = [card1, card2, card3, card4, card5, card6, card7];
console.log(hand_rating(hand1));
var card8 = { suit: 0, value: 2 };
var card9 = { suit: 1, value: 3 };
var card10 = { suit: 0, value: 4 };
var card11 = { suit: 3, value: 5 };
var card12 = { suit: 2, value: 6 };
var card13 = { suit: 1, value: 7 };
var card14 = { suit: 2, value: 9 };
var hand2 = [card8, card9, card10, card11, card12, card13, card14];
console.log(hand_rating(hand2));
console.log(winners(hand2, hand1));
