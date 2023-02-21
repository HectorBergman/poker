import {Bet, Pot, Stack, Pile} from './poker_types';
//import * as PromptSync from "prompt-sync";
import {tail, head} from '../lib/list';

/**
 * Makes a pile of chips of a given color
 * @param col (number) color of the chips in the pile, used later for indexing the stack and pot arrays
 * @param val (number) a chips value in dollar
 * @param num (number) number of chips in the pile
 * @returns a pile of chips with the same color and value
 */
function make_pile(col: number, val: number, num: number): Pile {
    return {color: col, chip: val, number: num};
}

const white = 0;
const red = 1;
const blue = 2;
const green = 3;


/**
 * Makes a new chip stack with four piles
 * @returns a new stack with white, red, blue and green chips in a 4:3:2:1 ratio
 */
// https://www.thesprucecrafts.com/standard-poker-chip-denominations-412236  4:3:2:1 ratio
function make_new_stack(): Stack {
        return [make_pile(white, 1, 4), 
                make_pile(red, 5, 3),
                make_pile(blue, 10, 2),
                make_pile(green, 25, 1) 
            ];
}

/**
 * Parses a bet made by the user
 * @param bet (array) an array of a string which gives the color and a number which give the number of chips
 * @returns a parsed bet, which is a pile of the given chip
 */
function parse_bet(bet: Bet): Pile {
    const color = head(bet);
    const num = tail(bet);
    return color === 'white'
        ? make_pile(white, 1, num)
        : color === 'red'
        ? make_pile(red, 5, num)
        : color === 'blue'
        ? make_pile(blue, 10, num)
        : make_pile(green, 25, num);
}

/**
 * Removes a parsed bet from a stack
 * @param stack (array) an array of different colored piles 
 * @param bet_pile (typerecord) a typerecord which contains the color (for indexing), the value 
 *                  and the number of chips for a given bet
 * @returns The initial stack but with the bet pile removed
 */
function remove_from_stack(stack: Stack, bet_pile: Pile): Stack {
    const color = bet_pile.color;
    const number = bet_pile.number;
    stack[color].number = stack[color].number - number;
    return stack;
}

/**
 * Makes a new empty pot
 * @returns 
 */
function make_pot(): Pot {
    return [ make_pile(white, 1, 0),
             make_pile(red, 5, 0),
             make_pile(blue, 10, 0),
             make_pile(green, 25, 0), ];
}

/**
 * Adds a given bet pile to pot
 * @param pot (array) an array which marks the places for chip piles according to color
 * @param bet_pile (type record) a parsed bet to be added to the pot
 * @returns a pot with the given bet added
 */
function add_bet(pot: Pot, bet_pile: Pile): Pot {
    const color = bet_pile.color;
    pot[color].number = bet_pile.number + pot[color].number; 
    return pot;
} 

/**
 * Counts what a given pot is worth
 * @param pot (Array) a Pot with Piles of chips with different values and sizes
 * @returns the value of the pot in dollar
 */
function pot_value(pot: Pot): number {
    let value = 0;
    for (let i = 0; i <= 3; i += 1) {
        value = value + pot[i].chip * pot[i].number;
    }
    return value;
}

//function fair_pot


const stack1: Stack = make_new_stack();
const bet = parse_bet(['white', 3]);
const pot = make_pot();
//const pile1: Pile = make_pile(3)
remove_from_stack(stack1, bet);
console.log(bet);
console.log(stack1);

const pot2 = add_bet(pot, bet);
console.log(pot2);
console.log(pot_value(pot2));



