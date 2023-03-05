"use strict";
exports.__esModule = true;
exports.straight = exports.flush = exports.straight_flush = exports.royal_flush = exports.best_straight_hand = exports.has_fullhouse = exports.has_two_pairs = exports.has_four_of_akind = exports.has_three_of_akind = exports.has_pair = void 0;
var helpers_1 = require("./helpers");
/**
 * Checks if a given hand has a pair or not
 * @preconditions The hand only contains valid cards.
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
                var valid = [{ suit: hand[i].suit, value: hand[i].value }, { suit: card.suit, value: card.value }];
                var best = best_pair_hand(hand, valid);
                return { exists: true, value: card.value, name: "pair", rang: 9, valid1: valid, best_hand: best };
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
 * Helper function: Function that finds the best possible hand if the hand includes one pair
 * @param hand hand that will be evaluated to find the best hand
 * @param i pair that is included in the best possible hand
 * @returns A hand where either the last element is the highest card in the hand or one of the elements in the pair.
 */
function best_pair_hand(hand, i) {
    var temp_arr = [];
    var new_hand = make_new_hand(hand, [], i[0].value);
    if (new_hand[new_hand.length - 1].value < i[0].value) {
        temp_arr[0] = new_hand[new_hand.length - 3];
        temp_arr[1] = new_hand[new_hand.length - 2];
        temp_arr[2] = new_hand[new_hand.length - 1];
        for (var j = 3; j < 5; j++) {
            temp_arr[j] = i[j - 3];
        }
    }
    else {
        temp_arr[0] = new_hand[new_hand.length - 3];
        temp_arr[1] = new_hand[new_hand.length - 2];
        temp_arr[4] = new_hand[new_hand.length - 1];
        for (var j = 2; j < 4; j++) {
            temp_arr[j] = i[j - 2];
        }
    }
    return temp_arr;
}
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
 * Helper function: Checks how many cards of a certain value that exists in a given hand
 * @param hand hand of cards to be examined
 * @param value Value to check if the cards have or not
 * @returns hand of cards that includes the same values
 */
function counter(hand, value) {
    var temp_arr = [];
    function count_same_cards_hand(hand, value, i, j) {
        if (hand[i] === undefined) {
            return temp_arr;
        }
        else {
            if (hand[i].value === value) {
                temp_arr[j] = { suit: hand[i].suit, value: hand[i].value };
                return count_same_cards_hand(hand, value, i + 1, j + 1);
            }
            else {
                return count_same_cards_hand(hand, value, i + 1, j);
            }
        }
    }
    return count_same_cards_hand(hand, value, 0, 0);
}
/**
 * Checks if a hand has a three of a kind
 * @preconditions The hand only contains valid cards.
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "three of a kind", with a boolean and the value of the three of a kind
 */
function has_three_of_akind(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        var new_hand = make_new_hand(hand, [], pair.value);
        var pair2 = has_pair(new_hand);
        var i = count_same_cards(hand, pair.value);
        var m = counter(hand, pair.value);
        if (pair2.exists && pair2.value !== undefined) {
            var j = count_same_cards(hand, pair2.value);
            var n = counter(hand, pair2.value);
            if (j >= 3) {
                var best = three_of_akind_best(hand, n);
                return { exists: true, value: pair2.value, name: "three of a kind", rang: 7, valid1: n, best_hand: best };
            }
            else if (i >= 3) {
                var best = three_of_akind_best(hand, m);
                return { exists: true, value: pair.value, name: "three of a kind", rang: 7, valid1: m, best_hand: best };
            }
            else {
                return { exists: false, name: "three of a kind", rang: 0 };
            }
        }
        else {
            if (i >= 3) {
                var best = three_of_akind_best(hand, m);
                return { exists: true, value: pair.value, name: "three of a kind", rang: 7, valid1: m, best_hand: best };
            }
            else {
                return { exists: false, name: "three of a kind", rang: 0 };
            }
        }
    }
    else {
        return { exists: false, name: "three of a kind", rang: 0 };
    }
}
exports.has_three_of_akind = has_three_of_akind;
/**
 * Helper function: Finds the best possible hand if it contains three of the same kind
 * @param hand Hand that is to be evaluated
 * @param i A hand that only contains the trio that also is included in the best possible hand
 * @returns A hand where the last element is either the highest card or part of the trio.
 */
function three_of_akind_best(hand, i) {
    var temp_arr = [];
    var new_hand = make_new_hand(hand, [], i[0].value);
    if (new_hand[new_hand.length - 1].value < i[0].value) {
        temp_arr[0] = new_hand[new_hand.length - 2];
        temp_arr[1] = new_hand[new_hand.length - 1];
        for (var j = 2; j < 5; j++) {
            temp_arr[j] = i[j - 2];
        }
    }
    else {
        temp_arr[0] = new_hand[new_hand.length - 2];
        temp_arr[4] = new_hand[new_hand.length - 1];
        for (var j = 1; j < 4; j++) {
            temp_arr[j] = i[j - 1];
        }
    }
    return temp_arr;
}
/**
 * Checks if a hand has a four of a kind
 * @preconditions The hand only contains valid cards.
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "four of a kind", with a boolean and the value of the four of a kind
 */
function has_four_of_akind(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        var i = count_same_cards(hand, pair.value);
        var j = counter(hand, pair.value);
        if (i === 4) {
            var best = best_four_hand(hand, j);
            return { exists: true, value: pair.value, name: "four of a kind", rang: 3, best_hand: best };
        }
        else {
            return has_four_of_akind(make_new_hand(hand, [], pair.value));
        }
    }
    else if (hand.length == 0) {
        return { exists: false, name: "four of a kind", rang: 0 };
    }
    else {
        return { exists: false, name: "four of a kind", rang: 0 };
    }
}
exports.has_four_of_akind = has_four_of_akind;
/**
 * Helper function: Finds the best possible hand if it contains a four of a kind
 * @param hand Hand to be evaluated
 * @param i Hand which only contains the four of a kind
 * @returns A hand whose last element is either the highest card, or part of the four.
 */
function best_four_hand(hand, i) {
    var temp_arr = [];
    var new_hand = make_new_hand(hand, [], i[0].value);
    if (i[0].value < new_hand[new_hand.length - 1].value) {
        for (var j = 0; j < 4; j++) {
            temp_arr[j] = i[j];
        }
        temp_arr[4] = new_hand[new_hand.length - 1];
        return temp_arr;
    }
    else {
        temp_arr[0] = new_hand[new_hand.length - 1];
        for (var j = 1; j < 5; j++) {
            temp_arr[j] = i[j - 1];
        }
        return temp_arr;
    }
}
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
 * @preconditions The hand only contains valid cards
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "two pairs", with a boolean and values of the two pairs
 */
function has_two_pairs(hand) {
    var pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined && pair.valid1 != undefined) {
        var new_hand = make_new_hand(hand, [], pair.value);
        var second_pair = has_pair(new_hand);
        if (second_pair.exists && second_pair.valid1 != undefined && second_pair.value != undefined) {
            var new_hand2 = make_new_hand(new_hand, [], second_pair.value);
            var third_pair = has_pair(new_hand2);
            if (third_pair.exists && third_pair.value !== undefined && third_pair.valid1 != undefined) {
                var best = two_hands_best(hand, third_pair.valid1, second_pair.valid1);
                return { exists: true, value: third_pair.value, value2: second_pair.value, name: "two pairs", rang: 8, best_hand: best };
            }
            else {
                var best = two_hands_best(hand, second_pair.valid1, pair.valid1);
                return { exists: true, value: second_pair.value, value2: pair.value, name: "two pairs", rang: 8, best_hand: best };
            }
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
 * Helper function: Gives the best hand that will contain two pairs.
 * @param hand Hand that is to be evaluated.
 * @param one Hand which only contains the highest of the two pairs
 * @param two Hand which only contains the lowest of the two pairs
 * @returns A hand whose last card is either the highest value, or the highest of the two pairs.
 */
function two_hands_best(hand, one, two) {
    var temp_arr = [];
    var new_hand1 = make_new_hand(hand, [], one[0].value);
    var new_hand2 = make_new_hand(new_hand1, [], two[0].value);
    if (new_hand2[new_hand2.length - 1].value > one[0].value) {
        temp_arr[4] = new_hand2[new_hand2.length - 1];
        for (var i = 0; i < 2; i++) {
            temp_arr[i] = two[i];
        }
        for (var j = 2; j < 4; j++) {
            temp_arr[j] = one[j - 2];
        }
    }
    else {
        temp_arr[0] = new_hand2[new_hand2.length - 1];
        for (var i = 1; i < 3; i++) {
            temp_arr[i] = two[i - 1];
        }
        for (var j = 3; j < 5; j++) {
            temp_arr[j] = one[j - 3];
        }
    }
    return temp_arr;
}
/**
* Checks if a hand has full house
* @preconditions The hand only contains valid cards
* @param hand (Hand) a hand of cards
* @returns a Pokerhand tagged with "full house", with a boolean and values of the three of a kind and the pair
*/
function has_fullhouse(hand) {
    var trio = has_three_of_akind(hand);
    if (trio.exists && trio.value !== undefined) {
        var new_hand = make_new_hand(hand, [], trio.value);
        var add_pair = has_pair(new_hand);
        if (add_pair.exists && trio.valid1 != undefined && add_pair.valid1 != undefined) {
            var best = best_hand_fullhouse(trio.valid1, add_pair.valid1);
            return { exists: true, value: trio.value, value2: add_pair.value, name: "full house", rang: 4, best_hand: best };
        }
        else {
            return { exists: false, name: "full house", rang: 0 };
        }
    }
    else {
        return { exists: false, name: "full house", rang: 0 };
    }
}
exports.has_fullhouse = has_fullhouse;
/**
 * Helper function: Collects the best possible hand that is played as a full house
 * @param trio Hand of the trio that is involved in the full house
 * @param duo Hand of the dup that is involved in the full house
 * @returns A hand whose last element is part of the trio hand.
 */
function best_hand_fullhouse(trio, duo) {
    var temp_arr = [];
    if (trio != undefined && duo != undefined) {
        for (var i = 2; i < 5; i++) {
            temp_arr[i] = trio[i - 2];
        }
        for (var i = 0; i < 2; i++) {
            temp_arr[i] = duo[i];
        }
    }
    return temp_arr;
}
/**
 * Helper function: Takes out the best hand avaliable out of all the cards
 * @precondition The hand contains no multiples
 * @param hand Hand to be evaluated
 * @returns A hand which contains the five most valuable cards out of all possible cards.
 */
function best_straight_hand(hand) {
    var temp_arr = [];
    function best_helper(han, count, index) {
        if (index < 0) {
            return temp_arr;
        }
        else {
            temp_arr[index] = han[count];
            return best_helper(han, count - 1, index - 1);
        }
    }
    return best_helper(hand, (hand.length - 1), 4);
}
exports.best_straight_hand = best_straight_hand;
/**
 * Checks if a given hand is a royal flush
 * @preconditions The hand only contains valid cards.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows if there is a royal flush or not.
 */
function royal_flush(hand) {
    var check = straight_flush(hand);
    if (check.exists === true && check.flush !== undefined) {
        var el = check.flush.length;
        if ((0, helpers_1.find_value)(check.flush[el - 1]) === 14) {
            var best = best_straight_hand(check.flush);
            return { exists: true, suit: check.suit, name: 'royal flush', rang: 1, best_hand: best };
        }
    }
    return { exists: false, name: 'royal flush', rang: 0 };
}
exports.royal_flush = royal_flush;
/**
 * Checks if a given hand is a straight flush.
 * @preconditions The hand only contains valid cards.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
function straight_flush(hand) {
    var fl = flush(hand);
    if (fl.exists === true && fl.flush !== undefined) {
        var check = straight(fl.flush);
        if (check.exists) {
            var best = best_straight_hand(fl.flush);
            return { exists: true, value: check.value, suit: fl.suit, flush: fl.flush, name: 'straight flush', rang: 2, best_hand: best };
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
                var best = best_straight_hand(clubs);
                return { exists: true, flush: clubs, suit: "clubs", name: 'flush', rang: 5, best_hand: best };
            }
            else if (diamonds.length >= 5) {
                var best = best_straight_hand(diamonds);
                return { exists: true, flush: diamonds, suit: "diamonds", name: 'flush', rang: 5, best_hand: best };
            }
            else if (spades.length >= 5) {
                var best = best_straight_hand(spades);
                return { exists: true, flush: spades, suit: "spades", name: 'flush', rang: 5, best_hand: best };
            }
            else if (hearts.length >= 5) {
                var best = best_straight_hand(hearts);
                return { exists: true, flush: hearts, suit: "hearts", name: 'flush', rang: 5, best_hand: best };
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
 * @preconditions The hand only contains valid cards.
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
        var best = best_straight_hand(help_arr);
        return { exists: true, value: highest.value, name: 'straight', rang: 6, best_hand: best };
    }
    return { exists: false, name: 'straight', rang: 0 };
}
exports.straight = straight;
