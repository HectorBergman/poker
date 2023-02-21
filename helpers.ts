import {List, head, tail, is_null, pair} from '../lib/list';
import {length} from '../lib/list_prelude';
import { Card } from './poker_types';

type Permutation = Array<number>;

export function  list_to_array<T>(list: List<T>): Array<T> {
    const arr: Array<T> = [];
    function transform(list: List<T>, count: number): void {
        if (list === null) {
        } else {
            arr[count] = head(list);
            transform(tail(list), count + 1);
        }
    }
    transform(list, 0);
    return arr;
}
export function array_to_list<T>(arr: Array<T>): List<T> {
    function transform(arr: Array<T>, i: number, max: number): List<T> {
        return  i === max
                ? null
                : pair(arr[i], transform(arr, i + 1, max))
    }
    return transform(arr, 0, arr.length);
}

export function random_permutation(length: number): Permutation {
    const perm: Permutation = [];
    for (let i = 0; i < length; i += 1) {
        perm[i] = i;
    }
    function random_helper(perm: Permutation, j: number): Permutation {  
        if (j <= 0 ) {
            return perm;
        } else {
            let rand: number = Math.floor(Math.random() * j);
            let pick: number = perm[rand];
            perm[rand] = perm[j];
            perm[j] = pick;
            return random_helper(perm, j - 1);
        }   
    }  
    return random_helper(perm, length-1);  
}


// helper function, makes list from an array
function make_list<T>(arr: Array<T>, i: number): List<T> {
    if (arr[i] === undefined) {
        return null;
    } else {
        return pair(arr[i], make_list(arr, i+1))
    }
}

export function random_list<T>(xs: List<T>): List<T> {
    function length<T>(xs: List<T>, i: number): number {
        if (is_null(xs)) {
            return i;
        } else {
        return length(tail(xs), i + 1);
        }
    }
    function random_array<T>(xs: List<T>, sigma: Array<number>, arr: Array<T>, i: number): Array<T> {
        if (is_null(xs)) {
            return arr;
        } else {
            arr[sigma[i]] = head(xs);
            return random_array(tail(xs), sigma, arr, i+1);
        }

    }
    const arr: Array<T> = [];
    const sigma: Array<number> = random_permutation(length(xs, 0));
    const randarr: Array<T> = random_array(xs, sigma, arr, 0);
    return make_list(randarr, 0);

}

export function find_suit(card: Card): number {
    return card.suit;
}

export function find_value(card: Card): number {
    return card.value;
}
    /**
    * Translates the card format to a more readable string.
    * @param card The card that is being translated
    * @returns A string that tells you which card it is.
    * @example describe({suit: 0, value: 12}) returns "Queen of Clubs".
    */
    function describe(card: Card): string {
        function describesuit(suit: number): string{
            return suit === 0
                ? "Clubs"
                : suit === 1
                    ? "Diamonds"
                    : suit === 2
                        ? "Spades"
                        : suit === 3
                            ? "Hearts"
                            : "error"
        }
        function describevalue(value: number): string{
            return value === 11
                ? "Jack"
                : value === 12
                    ? "Queen"
                    : value === 13
                        ? "King"
                        : value === 14
                            ? "Ace"
                            : value.toString();
        }
        return `${describevalue(card.value)} of ${describesuit(card.suit)}`
    }
    //Example: (only available inside of poker.ts)
    //console.log(`You have ${describe(allhands[0][0])} and ${describe(allhands[0][1])}`)
    