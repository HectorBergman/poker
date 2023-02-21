"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
/**
 * Checks if a given hand is a royal flush
 * @preconditions There is only one of each value, the array is sorted in increasing value, and if the lowest card in straight is 10.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows if there is a royal flush or not.
 */
function royal_flush(hand) {
    var arr = helper_straight_array(hand);
    if (arr.length >= 5) {
        if (flush(arr).exists === true) {
            if ((0, helpers_1.find_value)(arr[0]) === 10) {
                return { exists: true };
            }
        }
    }
    return { exists: false };
}
/**
 * Checks if a given hand is a straight flush.
 * @preconditions There are no repeats of values, and the parameter array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
function straight_flush(hand) {
    var fl = flush(hand);
    if (fl.exists === true && fl.flush !== undefined) {
        var check = straight(fl.flush);
        if (check.exists) {
            return { exists: true };
        }
    }
    return { exists: false };
}
/**
 * Checks if a given hand is a flush or not.
 * @precondition The hand only contains valid cards.
 * @param hand An array of the cards that are avaliable for your hand.
 * @returns Returns a boolean that's true if there is a flush and false if there's not.
 */
function flush(hand) {
    var clubs = [];
    var diamonds = [];
    var spades = [];
    var hearts = [];
    function flush_helper(hand, i, c, d, s, h) {
        if (i === void 0) { i = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 0; }
        if (s === void 0) { s = 0; }
        if (h === void 0) { h = 0; }
        if (hand[i] !== undefined) {
            if ((0, helpers_1.find_suit)(hand[i]) == 0) {
                clubs[c] = hand[i];
                return flush_helper(hand, i + 1, c + 1, d, s, h);
            }
            else if ((0, helpers_1.find_suit)(hand[i]) == 1) {
                diamonds[d] = hand[i];
                return flush_helper(hand, i + 1, c, d + 1, s, h);
            }
            else if ((0, helpers_1.find_suit)(hand[i]) == 2) {
                spades[h] = hand[i];
                return flush_helper(hand, i + 1, c, d, s + 1, h);
            }
            else {
                hearts[h] = hand[i];
                return flush_helper(hand, i + 1, c, d, s, h + 1);
            }
        }
        else {
            if (clubs.length >= 5) {
                return { exists: true, flush: clubs, suit: "clubs" };
            }
            else if (diamonds.length >= 5) {
                return { exists: true, flush: diamonds, suit: "diamonds" };
            }
            else if (spades.length >= 5) {
                return { exists: true, flush: spades, suit: "spades" };
            }
            else if (hearts.length >= 5) {
                return { exists: true, flush: hearts, suit: "hearts" };
            }
            else {
                return { exists: false };
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
function straight(hand) {
    if (helper_straight_array(hand).length >= 5) {
        return { exists: true };
    }
    return { exists: false };
}
function helper_straight_array(arr) {
    var conseq_array = [];
    var adder = 0;
    for (var i = 0; i < (arr.length - 1); i++) {
        if ((0, helpers_1.find_value)(arr[i]) === ((0, helpers_1.find_value)(arr[i + 1]) - 1)) {
            conseq_array[adder] = arr[i];
            adder++;
            conseq_array[adder] = arr[i + 1];
        }
        else if ((0, helpers_1.find_value)(arr[i]) === (0, helpers_1.find_value)(arr[i + 1])) {
            continue;
        }
        else {
            if (conseq_array.length >= 5) {
                return conseq_array;
            }
            else {
                conseq_array = [];
                adder = 0;
            }
        }
    }
    return conseq_array;
}
var card1 = { suit: 2, value: 9 };
var card2 = { suit: 0, value: 9 };
var card3 = { suit: 3, value: 8 };
var card4 = { suit: 0, value: 10 };
var card5 = { suit: 0, value: 11 };
var card6 = { suit: 0, value: 12 };
var card7 = { suit: 0, value: 13 };
var hand1 = [card1, card2, card3, card4, card5, card6, card7];
console.log(straight_flush(hand1));
//console.log(straight(hand1));
//console.log(straight_flush(hand1));
//console.log(royal_flush(hand1));
//console.log(helper_straight_array(hand1));
