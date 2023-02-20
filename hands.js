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
        if (flush(arr) === true) {
            if ((0, helpers_1.find_value)(arr[0]) === 10) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Checks if a given hand is a straight flush.
 * @preconditions There are no repeats of values, and the parameter array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
function straight_flush(hand) {
    var arr = helper_straight_array(hand);
    if (arr.length >= 5) {
        if (flush(arr) === true) {
            return true;
        }
    }
    return false;
}
/**
 * Checks if a given hand is a flush or not.
 * @precondition The hand only contains valid cards.
 * @param hand An array of the cards that are avaliable for your hand.
 * @returns Returns a boolean that's true if there is a flush and false if there's not.
 */
function flush(hand) {
    var clubs_count = 0;
    var diamonds_count = 0;
    var spades_count = 0;
    var hearts_count = 0;
    for (var i = 0; i < hand.length; i++) {
        if ((0, helpers_1.find_suit)(hand[i]) === 0) {
            clubs_count++;
        }
        else if ((0, helpers_1.find_suit)(hand[i]) === 1) {
            diamonds_count++;
        }
        else if ((0, helpers_1.find_suit)(hand[i]) === 2) {
            spades_count++;
        }
        else {
            hearts_count++;
        }
    }
    if (clubs_count >= 5 || diamonds_count >= 5 || spades_count >= 5 || hearts_count >= 5) {
        return true;
    }
    return false;
}
/**
 * Checks whether a given hand contains a straight of not.
 * @preconditions Array is sorted in increasing value order.
 * @param hand Array of cards that is to be evaluated
 * @returns Returns a boolean which shows true if it contains a straight and false if it doesn't.
 */
function straight(hand) {
    if (helper_straight_array(hand).length >= 5) {
        return true;
    }
    return false;
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
var card1 = { suit: 2, value: 5 };
var card2 = { suit: 3, value: 9 };
var card3 = { suit: 0, value: 9 };
var card4 = { suit: 0, value: 10 };
var card5 = { suit: 0, value: 11 };
var card6 = { suit: 0, value: 12 };
var card7 = { suit: 0, value: 13 };
var hand1 = [card1, card2, card3, card4, card5, card6, card7];
console.log(flush(hand1));
console.log(straight(hand1));
console.log(straight_flush(hand1));
console.log(royal_flush(hand1));
console.log(helper_straight_array(hand1));
