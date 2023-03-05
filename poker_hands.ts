import {find_suit, find_value} from './helpers'
import {Hand, Card, Pokerhand } from './poker_types';



/**
 * Checks if a given hand has a pair or not
 * @preconditions The hand only contains valid cards.
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "pair", with a boolean and the value of the pair
 */
export function has_pair(hand: Hand, j = 0): Pokerhand {
    if (hand[j] === undefined) {
        return {exists: false, name: "pair", rang: 0};
    } else {
        const card: Card = hand[j];
        for (let i = j + 1; hand[i] !== undefined; i += 1) {
            if (card.value === hand[i].value) {
                let valid: Hand = [{suit: hand[i].suit, value: hand[i].value}, {suit: card.suit, value: card.value}];
                let best = best_pair_hand(hand, valid);
                return {exists: true, value: card.value, name: "pair", rang: 9, valid1: valid, best_hand: best};
            } else {
                continue;
            }
        }
    return has_pair(hand, j+1);
    }
}

/**
 * Helper function: Function that finds the best possible hand if the hand includes one pair
 * @param hand hand that will be evaluated to find the best hand
 * @param i pair that is included in the best possible hand
 * @returns A hand where either the last element is the highest card in the hand or one of the elements in the pair.
 */

function best_pair_hand(hand: Hand, i: Hand): Hand {
    let temp_arr: Hand = []
    let new_hand = make_new_hand(hand, [], i[0].value);
    if (new_hand[new_hand.length - 1].value < i[0].value) {
        temp_arr[0] = new_hand[new_hand.length - 3];
        temp_arr[1] = new_hand[new_hand.length - 2];
        temp_arr[2] = new_hand[new_hand.length - 1];
        for (let j = 3; j < 5; j++) {
            temp_arr[j] = i[j - 3];
        }
    } else {
        temp_arr[0] = new_hand[new_hand.length - 3];
        temp_arr[1] = new_hand[new_hand.length - 2];
        temp_arr[4] = new_hand[new_hand.length - 1];
        for (let j = 2; j < 4; j++) {
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
function count_same_cards(hand: Hand, value: number, i = 0, j = 0): number {
    if (hand[i] === undefined) {
        return j;
    } else {
        if (hand[i].value === value) {
            return count_same_cards(hand, value, i + 1, j + 1);
        } else {
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

function counter(hand: Hand, value: number): Hand{
    let temp_arr: Hand = []
    function count_same_cards_hand(hand: Hand, value: number, i: number, j: number): Hand {
        if (hand[i] === undefined) {
            return temp_arr;
        } else {
            if (hand[i].value === value) {
                temp_arr[j] = {suit: hand[i].suit, value: hand[i].value}
                return count_same_cards_hand(hand, value, i + 1, j + 1)
            } else {
                return count_same_cards_hand(hand, value, i + 1, j)
            }
        }
    }
    return count_same_cards_hand(hand, value, 0, 0)
}

/**
 * Checks if a hand has a three of a kind
 * @preconditions The hand only contains valid cards.
 * @param hand (Hand) a hand of cards
 * @returns a Pokerhand tagged with "three of a kind", with a boolean and the value of the three of a kind
 */
export function has_three_of_akind(hand: Hand): Pokerhand {
    const pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        const new_hand = make_new_hand(hand, [], pair.value)
        const pair2 = has_pair(new_hand);
        const i = count_same_cards(hand, pair.value);
        const m = counter(hand, pair.value);
        if (pair2.exists && pair2.value !== undefined) {
            const j = count_same_cards(hand, pair2.value);
            const n = counter(hand, pair2.value);
            if (j >= 3) { 
                let best = three_of_akind_best(hand, n);
                return {exists: true, value: pair2.value, name: "three of a kind", rang: 7, valid1: n, best_hand: best}
            } else if (i >= 3) {
                let best = three_of_akind_best(hand, m)
                return {exists: true, value: pair.value, name: "three of a kind", rang: 7, valid1: m, best_hand: best}
            } else {
                return {exists:false, name:"three of a kind", rang: 0};
            }
        }
        else {
            if (i >= 3) {
                let best = three_of_akind_best(hand, m)
                return {exists: true, value: pair.value, name: "three of a kind", rang: 7, valid1: m, best_hand: best}
            } else {
                return {exists:false, name:"three of a kind", rang: 0};
            }
         }
    } else {
        return {exists:false, name:"three of a kind", rang: 0};
    } 
}

/**
 * Helper function: Finds the best possible hand if it contains three of the same kind
 * @param hand Hand that is to be evaluated
 * @param i A hand that only contains the trio that also is included in the best possible hand
 * @returns A hand where the last element is either the highest card or part of the trio.
 */
function three_of_akind_best(hand: Hand, i: Hand): Hand {
    let temp_arr: Hand = []
    let new_hand = make_new_hand(hand, [], i[0].value)
    if (new_hand[new_hand.length - 1].value < i[0].value) {
        temp_arr[0] = new_hand[new_hand.length - 2];
        temp_arr[1] = new_hand[new_hand.length - 1];
        for (let j = 2; j < 5; j++) {
            temp_arr[j] = i[j - 2];
        }
    } else {
        temp_arr[0] = new_hand[new_hand.length - 2];
        temp_arr[4] = new_hand[new_hand.length - 1];
        for (let j = 1; j < 4; j++) {
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
export function has_four_of_akind(hand: Hand): Pokerhand {
    const pair = has_pair(hand);
    if (pair.exists && pair.value !== undefined) {
        const i = count_same_cards(hand, pair.value);
        const j = counter(hand, pair.value);
        if (i === 4) {
            let best = best_four_hand(hand, j);
            return {exists: true, value: pair.value, name: "four of a kind", rang: 3, best_hand: best};
        } else {
            return has_four_of_akind(make_new_hand(hand, [], pair.value));
        }
    } else if (hand.length == 0) {
        return {exists:false, name:"four of a kind", rang: 0};
    } else {
        return {exists:false, name:"four of a kind", rang: 0};
    }
}

/**
 * Helper function: Finds the best possible hand if it contains a four of a kind
 * @param hand Hand to be evaluated
 * @param i Hand which only contains the four of a kind
 * @returns A hand whose last element is either the highest card, or part of the four.
 */
function best_four_hand(hand: Hand, i: Hand): Hand {
    let temp_arr: Hand = [];
    let new_hand = make_new_hand(hand, [], i[0].value);
    if (i[0].value < new_hand[new_hand.length - 1].value) {
        for (let j = 0; j < 4; j++) {
            temp_arr[j] = i[j];
        }
        temp_arr[4] = new_hand[new_hand.length - 1];
        return temp_arr;
    } else {
        temp_arr[0] = new_hand[new_hand.length - 1];
        for (let j = 1; j < 5; j++) {
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
function make_new_hand(hand: Hand, new_hand: Hand, value: number, i = 0, j = 0): Hand {
    if (hand[i] === undefined) {
        return new_hand;
    } else {
        if (hand[i].value == value) {
            return make_new_hand(hand, new_hand, value, i + 1, j);
        } else {
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
export function has_two_pairs(hand: Hand): Pokerhand {
    const pair: Pokerhand = has_pair(hand);
    if (pair.exists && pair.value !== undefined && pair.valid1 != undefined) {
        const new_hand: Hand = make_new_hand(hand, [], pair.value);
        const second_pair =  has_pair(new_hand);
        if (second_pair.exists && second_pair.valid1 != undefined && second_pair.value != undefined) {
            const new_hand2: Hand = make_new_hand(new_hand, [], second_pair.value);
            const third_pair: Pokerhand =  has_pair(new_hand2);
            if (third_pair.exists && third_pair.value !== undefined && third_pair.valid1 != undefined) {
                let best = two_hands_best(hand, third_pair.valid1, second_pair.valid1)
                return {exists: true, value: third_pair.value, value2: second_pair.value, name: "two pairs", rang: 8, best_hand: best};
            } else { 
                let best = two_hands_best(hand, second_pair.valid1, pair.valid1);
                return {exists: true, value: second_pair.value, value2: pair.value, name: "two pairs", rang: 8, best_hand: best};
            }
        } else {
            return  {exists: false, name: "two pairs", rang: 0};
        }
    } else {
        return {exists: false, name: "two pairs", rang: 0};
    }
}

/**
 * Helper function: Gives the best hand that will contain two pairs.
 * @param hand Hand that is to be evaluated.
 * @param one Hand which only contains the highest of the two pairs
 * @param two Hand which only contains the lowest of the two pairs
 * @returns A hand whose last card is either the highest value, or the highest of the two pairs.
 */
function two_hands_best(hand: Hand, one: Hand, two: Hand): Hand {
    let temp_arr: Hand = []
    let new_hand1: Hand = make_new_hand(hand, [], one[0].value);
    let new_hand2: Hand = make_new_hand(new_hand1, [], two[0].value);
    if (new_hand2[new_hand2.length - 1].value > one[0].value) {
        temp_arr[4] = new_hand2[new_hand2.length - 1];
        for (let i = 0; i < 2; i++) {
            temp_arr[i] = two[i];
        }
        for (let j = 2; j < 4; j++) {
            temp_arr[j] = one[j - 2];
        }
    } else {
        temp_arr[0] = new_hand2[new_hand2.length - 1];
        for (let i = 1; i < 3; i++) {
            temp_arr[i] = two[i - 1];
        }
        for (let j = 3; j < 5; j++) {
            temp_arr[j] = one[j - 3]
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
export function has_fullhouse(hand: Hand): Pokerhand {
    const trio: Pokerhand = has_three_of_akind(hand);
    if (trio.exists && trio.value !== undefined) {
        const new_hand: Hand = make_new_hand(hand, [], trio.value);
        const add_pair: Pokerhand = has_pair(new_hand);
        if (add_pair.exists && trio.valid1 != undefined && add_pair.valid1 != undefined) {
            let best = best_hand_fullhouse(trio.valid1, add_pair.valid1);
            return {exists: true, value: trio.value, value2: add_pair.value, name: "full house", rang: 4, best_hand: best}; 
        } else {
            return {exists: false, name: "full house", rang: 0};
        }
    } else {
        return {exists: false, name: "full house", rang: 0};
    }
}

/**
 * Helper function: Collects the best possible hand that is played as a full house
 * @param trio Hand of the trio that is involved in the full house
 * @param duo Hand of the dup that is involved in the full house
 * @returns A hand whose last element is part of the trio hand.
 */
function best_hand_fullhouse(trio: Hand, duo: Hand): Hand {
    let temp_arr: Hand = []
    if (trio != undefined && duo != undefined) {
        for (let i = 2; i < 5; i++) {
            temp_arr[i] = trio[i - 2];
        }
        for (let i = 0; i < 2; i++) {
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
export function best_straight_hand(hand: Hand): Hand {
    let temp_arr: Hand = []
    function best_helper(han: Hand, count: number, index: number): Hand {
        if (index < 0) {
            return temp_arr;
        } else {
            temp_arr[index] = han[count]
            return best_helper(han, count - 1, index - 1);
        }
    }
    return best_helper(hand, (hand.length - 1), 4);
}


/**
 * Checks if a given hand is a royal flush
 * @preconditions The hand only contains valid cards.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows if there is a royal flush or not.
 */
export function royal_flush(hand: Hand): Pokerhand {
    const check = straight_flush(hand);
    if (check.exists === true && check.flush !== undefined) {
        let el = check.flush.length;
        if (find_value(check.flush[el - 1]) === 14) {
            let best = best_straight_hand(check.flush)
            return {exists: true, suit: check.suit, name: 'royal flush', rang: 1, best_hand: best};
        }
    }
    return {exists: false, name: 'royal flush', rang: 0};
}


/**
 * Checks if a given hand is a straight flush.
 * @preconditions The hand only contains valid cards.
 * @param hand Array of cards to be evaluated
 * @returns A boolean that shows true if a straight flush exist and false if it doesn't
 */
export function straight_flush(hand: Hand): Pokerhand {
    const fl: Pokerhand = flush(hand);
    if (fl.exists === true && fl.flush !== undefined) {
        let check = straight(fl.flush);
        if (check.exists) {
            let best = best_straight_hand(fl.flush);
            return {exists: true, value: check.value, suit: fl.suit, flush: fl.flush, name: 'straight flush', rang: 2, best_hand: best};
        }
    }
    return {exists: false, name: 'straight flush', rang: 0};
}


/**
 * Checks if a given hand is a flush or not.
 * @precondition The hand only contains valid cards.
 * @param hand An array of the cards that are avaliable for your hand.
 * @returns Returns a boolean that's true if there is a flush and false if there's not.
 */
export function flush(hand: Hand): Pokerhand {
    let clubs: Hand = [];
    let diamonds: Hand =[];
    let spades: Hand = [];
    let hearts: Hand = [];
    function flush_helper(hand: Hand, i: number, c: number, d: number, s: number, h: number): Pokerhand {
        if (hand[i] !== undefined) {
            if (find_suit(hand[i]) == 0) {
                clubs[c] = hand[i];
                return flush_helper(hand, i + 1, c + 1, d, s, h);
            } else if (find_suit(hand[i]) == 1) {
                diamonds[d] = hand[i];
                return flush_helper(hand, i + 1, c, d + 1, s, h);
            } else if (find_suit(hand[i]) == 2) {
                spades[s] = hand[i];
                return flush_helper(hand, i + 1, c, d, s + 1, h);
            } else {
                hearts[h] = hand[i]
                return flush_helper(hand, i + 1, c, d, s, h + 1);
            }
        } else {
            if (clubs.length >= 5) {
                let best = best_straight_hand(clubs);
                return {exists: true, flush: clubs, suit: "clubs", name: 'flush', rang: 5, best_hand: best};
            } else if (diamonds.length >= 5) {
                let best = best_straight_hand(diamonds);
                return {exists: true, flush: diamonds, suit: "diamonds", name: 'flush', rang: 5, best_hand: best};
            } else if (spades.length >= 5) {
                let best = best_straight_hand(spades);
                return {exists: true, flush: spades, suit: "spades", name: 'flush', rang: 5, best_hand: best};
            } else if (hearts.length >= 5) {
                let best = best_straight_hand(hearts);
                return {exists: true, flush: hearts, suit: "hearts", name: 'flush', rang: 5, best_hand: best};
            } else {
                return {exists: false, name: 'flush', rang: 0};
            }
        }
    }
    return flush_helper(hand, 0, 0, 0, 0, 0);
}


/**
 * Checks whether a given hand contains a straight of not.
 * @preconditions The hand only contains valid cards.
 * @param hand Array of cards that is to be evaluated
 * @returns Returns a boolean which shows true if it contains a straight and false if it doesn't.
 */
export function straight(hand: Hand): Pokerhand {
    function straight_helper(arr: Hand): Hand {
        let conseq_array: Array<Card> = [];
        let adder = 0;
        for (let i = 0; i < (arr.length - 1); i++) {
            if (find_value(arr[i]) === (find_value(arr[i + 1]) - 1)) {
                conseq_array[adder] = arr[i];
                adder++;
                conseq_array[adder] = arr[i + 1];
            } else if (find_value(arr[i]) === find_value(arr[i + 1])) {
                continue;
            } else {
                if (conseq_array.length >= 5) {
                    return conseq_array;
                } else {
                    conseq_array = [];
                    adder = 0;
                }
            }
        }
        return conseq_array;
    }
    const help_arr = straight_helper(hand);
    if (help_arr.length >= 5) {
        const highest = help_arr[help_arr.length - 1]
        let best = best_straight_hand(help_arr)
        return {exists: true, value: highest.value, name: 'straight', rang: 6, best_hand: best};
    }
    return {exists: false, name: 'straight', rang: 0};
}

