import {Bet, Pot, Stack, Pile, GameState} from './poker_types';
//import * as PromptSync from "prompt-sync";
import {tail, head} from '../lib/list';


const white = 0;
const red = 1;
const blue = 2;
const green = 3;


//helper functions not exported

function to_color(color: string): number {
    return color === "white" 
        ? white
        : color === "red"
        ? red
        : color === "blue"
        ? blue
        : green;
}

function to_string(col: number): string {
    return col === white
        ? "white"
        : col === red
        ? "red"
        : col === blue
        ? "blue"
        : "green";

}
/**
 * Makes a pile of chips of a given color
 * @param col (number) color of the chips in the pile, used later for indexing the stack and pot arrays
 * @param val (number) a chips value in dollar
 * @param num (number) number of chips in the pile
 * @returns a pile of chips with the same color and value
 */
function make_pile(col: number, val: number, num: number): Pile {
    return {color: col, chip: {value: val}, number: num};
}

/**
 * Makes a new chip stack with four piles
 * @returns a new stack with white, red, blue and green chips in a 4:3:2:1 ratio
 */
export function make_new_stack(): Stack {
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
 * Removes a bet from a stack
 * @param stack (array) an array of different colored piles 
 * @param bet (array) an array of a string which gives the color and a number which give the number of chips
 * @returns The initial stack but with the bet pile removed
 */
function remove_from_stack(stack: Stack, bet: Bet): Stack {
    const bet_pile: Pile = parse_bet(bet);
    const color = bet_pile.color;
    const number = bet_pile.number;
    stack[color].number = stack[color].number - number;
    return stack;
}

/**
 * Makes a new empty pot
 * @returns 
 */
export function make_pot(): Pot {
    return [ make_pile(white, 1, 0),
             make_pile(red, 5, 0),
             make_pile(blue, 10, 0),
             make_pile(green, 25, 0) ];
}

/**
 * Adds a given bet pile to pot
 * @param pot an array which marks the places for chip piles according to color
 * @param bet an array of a string which gives the color and a number which give the number of chips
 * @returns a  with the given bet added
 */
function place_bet(pot: Pot, bet: Bet): Pot {
    const bet_pile: Pile = parse_bet(bet);
    const color = bet_pile.color;
    pot[color].number = bet_pile.number + pot[color].number; 
    return pot;
} 

/**
 * Adds pot to the rounds' winners' stack
 * @param pot an array which marks the places for chip piles according to color
 * @param stack an array of chip piles with color as index
 * @returns the original stack with the pot added
 */
function add_pot(pot: Pot, stack: Stack): Stack {
    for (let i = 0; i < 4; i += 1) {
        stack[i].number = stack[i].number + pot[i].number;
    } 
    return stack;
}


// ____________________________________________________________________________________
/**
 * Counts what a given pot is worth
 * @param pot (Array) a Pot with Piles of chips with different values and sizes
 * @returns the value of the pot in dollar
 */
export function pot_value(pot: Pot): number {
    let value = 0;
    for (let i = 0; i <= 3; i += 1) {
        value = value + pot[i].chip.value * pot[i].number;
    }
    return value;
}

/**
 * Checks if a bet made by a player is valid
 * @param bet an array of a string wich specifies the color of the bet's chips, and their number
 * @param stack the stack of the player who made the bet
 * @returns If the bet is valid True/false
 */
export function is_valid_bet(bet: Bet, stack: Stack): boolean {
    const bet_pile: Pile = parse_bet(bet);
    return stack[bet_pile.color].number >= bet_pile.number;
}

/**
 * Puts together helper functions to make a bet
 * @param bet an array of a string wich specifies the color of the bet's chips, and their number
 * @param stack a players array of chip piles 
 * @param pot an array of the chip piles which are wagered
 */
export function make_bet(bet: Bet, stack: Stack, pot: Pot): void {
    if (is_valid_bet(bet, stack)) {
        remove_from_stack(stack, bet);
        place_bet(pot, bet);
    } else {
        console.log("invalid bet");
    }
}


function can_hold(pot1: Pot, stack2: Stack): boolean {
    return pot_value(pot1) <= pot_value(stack2);
}


function change_currency(stack2: Stack, high: number, low = 0): void {
    const h = stack2[high].chip.value;
    const l = stack2[low].chip.value;
    if (high == 25 && low == 10 && stack2[high].number < 0) {
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + 2;
        stack2[1].number = stack2[1].number + 2;
    } else if (stack2[high].number > 0) {
        const change = h / l;
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + change;
    } else {
        console.log("Invalid change");
    }
}



function manual_change(stack: Stack, to: string, from: string, count = 1): void {
    const to_col = to_color(to);
    const from_col = to_color(from); 
    for (let l = 0; l < count; l += 1)  {
        change_currency(stack, from_col, to_col);
    }
}

function auto_change(stack: Stack, color: number, needed: number): void {
    if (needed <= 0) {}
    else {
        if (color === white) {
            if (needed > 10 && stack[green].number > 0) {
                change_currency(stack, green, white);
                auto_change(stack, color, needed - 25);
            } else if (needed > 5 && stack[blue].number > 0) {
                change_currency(stack, blue, white);
                auto_change(stack, color, needed - 10);
            } else if (needed >= 1 && stack[red].number > 0) {
                change_currency(stack, red, white);
                auto_change(stack, color, needed - 5);
            }
        } else if (color === red) {
            if (needed > 10 && stack[green].number > 0) {
                change_currency(stack, green, red);
                auto_change(stack, color, needed - 25);
            } else if (needed >= 5 && stack[blue].number > 0) {
                change_currency(stack, blue, red);
                auto_change(stack, color, needed - 10);
            }
        } else if (color === blue) {
            if (needed > 10 && stack[green].number > 0) {
                change_currency(stack, green, blue);
                auto_change(stack, color, needed - 25); 
            }  
        } else {}
    }
}

/**
 * Automated betting system for when a player choses to hold a bet
 * @param pot1 the wagered chips of the betting player
 * @param pot2 new pot which contains the holding player's wager
 * @param stack2 the stack of the holding player
 */
export function hold_bet(pot1: Pot, pot2: Pot, stack2: Stack): void {
    const bet_value = pot_value(pot1) - pot_value(pot2);
    function hold(bet_value: number, stack2: Stack): void {
        for (let i = 3; i >= 0; i -= 1) {
            for (let j = stack2[i].number; j >= 0 ; j -= 1) {
                const max = stack2[i].chip.value * j; 
                if (bet_value < max) {
                    continue;
                } else if (bet_value >= max) {
                    make_bet([to_string(i), j], stack2, pot2);
                    bet_value = bet_value - max; 
                } else if (bet_value == 0) {
                    break;
                } else if (j === 0 && bet_value <= stack2[i].chip.value) {
                    auto_change(stack2, i, bet_value);
                    hold(bet_value, stack2);
                }
            }
        }
    }
    return hold(bet_value, stack2);
}




/**
 * Prints the players chip stack
 * @param gs (Gamestate) an array of the players' stacks
 */ 
export function show_game_state(gs: GameState): void {
    console.log("Color             player1's Stack                player2's Stack");
    console.log("");
    console.log("white                   " +  gs[0][0].number + "                               " + gs[1][0].number );
    console.log("red                     " +  gs[0][1].number + "                               " + gs[1][1].number );
    console.log("blue                    " +  gs[0][2].number + "                               " + gs[1][2].number );
    console.log("green                   " +  gs[0][3].number + "                               " + gs[1][3].number );
    
}

// Test
function main(): void {
    console.log("Poker");
    console.log("");
    const pn = 2;
    const gs: GameState = [];
    for (let i = 0; i < pn; i += 1) {
        gs[i] = make_new_stack();
    }
    show_game_state(gs);
}

/* 
function play(gs: GameState): void {
    show_game_state(gs);
    gs = player_bet(gs);
    if (is_winning(gs)) {
        console.log("Player wins!");
        main();
    } else {
        gs = computer_bet(gs);
        if (is_winning(gs)) {
            console.log("Computer won!");
            main();
        } else {
            play(gs);
        }
    }
}
*/

//main();

const stack1: Stack = make_new_stack();
const stack2: Stack = make_new_stack();
const pot1 = make_pot();
const pot2 = make_pot();


manual_change(stack1, "red", "blue", 2);

show_game_state([stack1, stack2]);


make_bet(["white", 10], stack1, pot1);
make_bet(["red", 1], stack1, pot1);
make_bet(["green", 1], stack1, pot1);

hold_bet(pot1, pot2, stack2);

//show_game_state([stack1, stack2]);

//change_currency(stack2, 2, 0);
//show_game_state([stack1, stack2]);


console.log("pot2 value    " + pot_value(pot1));
console.log("pot1 value    " + pot_value(pot2));


