"use strict";
exports.__esModule = true;
exports.straight = exports.flush = exports.straight_flush = exports.royal_flush = exports.has_fullhouse = exports.has_two_pairs = exports.has_four_of_akind = exports.has_three_of_akind = exports.has_pair = void 0;
var helpers_1 = require("./helpers");
/*
function highcard(hand: Hand): number {
    const highest: Card = hand[hand.length - 1]
    return highest.value
}
*/
/**
 * Checks if a given hand has a pair or not
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "pair", with a boolean and the value of the pair
 */
function has_pair(hand, j) {
    if (j === void 0) { j = 0; }
    if (hand[j] === undefined) {
        return { exists: false, name: "pair", rang: 0 };
    }
    else {
        var card = hand[j];
        for (var i = j + 1; hand[i] !== undefined; i += 1) {
            if (card.value === hand[i].value) {
                return { exists: true, value: card.value, name: "pair", rang: 9 };
            }
            else {
                continue;
            }
        }
        return has_pair(hand, j + 1);
    }
}
exports.has_pair = has_pair;
/**
 * Helper function: checks if a hand has more than a pair of a given value
 * @param hand (Hand) a hand of cards, which already contain a pair
 * @param i (number) is for indexing
 * @param j (number) count number of cards which are the same
 * @returns number of cards with the same value
 */
function count_same_cards(hand, value, i, j) {
    if (i === void 0) { i = 0; }
    if (j === void 0) { j = 0; }
    if (hand[i] === undefined) {
        return j;
    }
    else {
        if (hand[i].value === value) {
            return count_same_cards(hand, value, i + 1, j + 1);
        }
        else {
            return count_same_cards(hand, value, i + 1, j);
        }
    }
}
/**
 * Checks if a hand has a three of a kind
 * @param hand (Hand) a hand of cards
 * @param card_number (number) states how many cards the hand has
 * @returns a Pokerhand tagged with "three of a kind", with a boolean and the value of the three of a kind
 */
function has_three_of_akind(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        var i = count_same_cards(hand, pair.value);
        return i >= 3
            ? { exists: true, value: pair.value, name: "three of a kind", rang: 7 }
            : { exists: false, name: "three of a kind", rang: 0 };
    }
    else {
        return { exists: false, name: "three of a kind", rang: 0 };
    }
}
exports.has_three_of_akind = has_three_of_akind;
/**
 * Checks if a hand has a four of a kind
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "four of a kind", with a boolean and the value of the four of a kind
 */
function has_four_of_akind(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        var i = count_same_cards(hand, pair.value);
        return i === 4
            ? { exists: true, value: pair.value, name: "four of a kind", rang: 3 }
            : { exists: false, name: "four of a kind", rang: 0 };
    }
    else {
        return { exists: false, name: "four of a kind", rang: 0 };
    }
}
exports.has_four_of_akind = has_four_of_akind;
/**
 * Makes a new hand by removing an already found pair
 * @param hand (Hand) a hand of cards, which contain a pair
 * @param new_hand (Hand) a shorter hand without the pair
 * @param value (number) the value of the pair which is removed
 * @param i (number) for indexing the original hand
 * @param j (number) for indexing the new hand
 * @returns a new hand, which does not contain a specified pair
 */
function make_new_hand(hand, new_hand, value, i, j) {
    if (i === void 0) { i = 0; }
    if (j === void 0) { j = 0; }
    if (hand[i] === undefined) {
        return new_hand;
    }
    else {
        if (hand[i].value == value) {
            return make_new_hand(hand, new_hand, value, i + 1, j);
        }
        else {
            new_hand[j] = hand[i];
            return make_new_hand(hand, new_hand, value, i + 1, j + 1);
        }
    }
}
/**
 * Checks if a hand has two pairs
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "two pairs", with a boolean and values of the two pairs
 */
function has_two_pairs(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        var new_hand = make_new_hand(hand, [], pair.value);
        var second_pair = has_pair(new_hand);
        if (second_pair.exists) {
            return { exists: true, value: pair.value, value2: second_pair.value, name: "two pairs", rang: 8 };
        }
        else {
            return { exists: false, name: "two pairs", rang: 0 };
        }
    }
    else {
        return { exists: false, name: "two pairs", rang: 0 };
    }
}
exports.has_two_pairs = has_two_pairs;
/**
* Checks if a hand has full house
* @param hand (Hand) a hand of cards
* @returns a Pokerhand tagged with "full house", with a boolean and values of the three of a kind and the pair
*/
function has_fullhouse(hand) {
    var trio = has_three_of_akind(hand);
    if (trio.exists && trio.value !== undefined) {
        var new_hand = make_new_hand(hand, [], trio.value);
        var add_pair = has_pair(new_hand);
        return add_pair.exists
            ? { exists: true, value: trio.value, value2: add_pair.value, name: "full house", rang: 4 }
            : { exists: false, name: "full house", rang: 0 };
    }
    else {
        return { exists: false, name: "full house", rang: 0 };
    }
}
exports.has_fullhouse = has_fullhouse;
/**
 * Checks if a given hand is a royal flush
 * @preconditions The array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows if there is a royal flush or not.
 */
function royal_flush(hand) {
    var check = straight_flush(hand);
    if (check.exists === true && check.flush !== undefined) {
        var el = check.flush.length;
        if ((0, helpers_1.find_value)(check.flush[el - 1]) === 14) {
            return { exists: true, suit: check.suit, name: 'royal flush', rang: 1 };
        }
    }
    return { exists: false, name: 'royal flush', rang: 0 };
}
exports.royal_flush = royal_flush;
/**
 * Checks if a given hand is a straight flush.
 * @preconditions The parameter array is sorted in increasing value.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
function straight_flush(hand) {
    var fl = flush(hand);
    if (fl.exists === true && fl.flush !== undefined) {
        var check = straight(fl.flush);
        if (check.exists) {
            return { exists: true, value: check.value, suit: fl.suit, flush: fl.flush, name: 'straight flush', rang: 2 };
        }
    }
    return { exists: false, name: 'straight flush', rang: 0 };
}
exports.straight_flush = straight_flush;
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
                spades[s] = hand[i];
                return flush_helper(hand, i + 1, c, d, s + 1, h);
            }
            else {
                hearts[h] = hand[i];
                return flush_helper(hand, i + 1, c, d, s, h + 1);
            }
        }
        else {
            if (clubs.length >= 5) {
                return { exists: true, flush: clubs, suit: "clubs", name: 'flush', rang: 5 };
            }
            else if (diamonds.length >= 5) {
                return { exists: true, flush: diamonds, suit: "diamonds", name: 'flush', rang: 5 };
            }
            else if (spades.length >= 5) {
                return { exists: true, flush: spades, suit: "spades", name: 'flush', rang: 5 };
            }
            else if (hearts.length >= 5) {
                return { exists: true, flush: hearts, suit: "hearts", name: 'flush', rang: 5 };
            }
            else {
                return { exists: false, name: 'flush', rang: 0 };
            }
        }
    }
    return flush_helper(hand, 0, 0, 0, 0, 0);
}
exports.flush = flush;
/**
 * Checks whether a given hand contains a straight of not.
 * @preconditions Array is sorted in increasing value order.
 * @param hand Array of cards that is to be evaluated
 * @returns Returns a boolean which shows true if it contains a straight and false if it doesn't.
 */
function straight(hand) {
    function straight_helper(arr) {
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
    var help_arr = straight_helper(hand);
    if (help_arr.length >= 5) {
        var highest = help_arr[help_arr.length - 1];
        return { exists: true, value: highest.value, name: 'straight', rang: 6 };
    }
    return { exists: false, name: 'straight', rang: 0 };
}
exports.straight = straight;
var hand1 = [{ suit: 3, value: 3 }, { suit: 0, value: 2 }, { suit: 1, value: 3 },
    { suit: 1, value: 5 }, { suit: 1, value: 2 }, { suit: 3, value: 3 }, { suit: 2, value: 3 }];
console.log(has_pair(hand1));
console.log(has_three_of_akind(hand1));
console.log(has_four_of_akind(hand1));
console.log(has_two_pairs(hand1));
console.log(has_fullhouse(hand1));
var card1 = { suit: 0, value: 9 };
var card2 = { suit: 1, value: 9 };
var card3 = { suit: 2, value: 10 };
var card4 = { suit: 2, value: 11 };
var card5 = { suit: 2, value: 12 };
var card6 = { suit: 2, value: 13 };
var card7 = { suit: 2, value: 14 };
var hand2 = [card1, card2, card3, card4, card5, card6, card7];
console.log(flush(hand2));
console.log(straight(hand2));
console.log(straight_flush(hand2));
console.log(royal_flush(hand2));
