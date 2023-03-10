import {Bet, Pot, Stack, Pile, GameState} from './poker_types';
//import * as PromptSync from "prompt-sync";
import {tail, head} from '../lib/list';


const white = 0;
const red = 1;
const blue = 2;
const green = 3;


//helper functions not exported
/**
 * Changes a color string into its index number
 * @param color string which gives the colorrs name
 * @returns index number of the color
 */
function to_color(color: string): number {
    return color === "white" 
        ? white
        : color === "red"
        ? red
        : color === "blue"
        ? blue
        : green;
}
/**
 * Changes a color index into its string name
 * @param col index number of a color
 * @returns string name of the color 
 */
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
        return [make_pile(white, 1, 5), 
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
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
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
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
 * @param pot an array which marks the places for chip piles according to color
 * @param stack an array of chip piles with color as index
 * @returns the original stack with the pot added
 */
export function add_pot(pot: Pot, stack: Stack): Stack {
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
 * @precondition stack has 4 elements, that is four different colored chip piles
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

/**
 * Decides if the player can call a bet or not
 * @precondition stack has 4 elements, that is four different colored chip piles
 * @param bet value of the other player's bet
 * @param stack2 The stack of the player which wants to call
 * @returns wether the player can hot true/false
 */
function can_call(bet_value: number, stack2: Stack): boolean {
    return bet_value < pot_value(stack2);
}

/**
 * Makes an all in
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
 * @param stack2 Array of chip piles of a given player
 * @param pot2 Array for player's chip wager
 */
export function all_in(stack2: Stack, pot2: Pot): void {
    for (let i = 0; i < 4; i += 1) {
        make_bet([to_string(i), stack2[i].number], stack2, pot2);
    }
}



/**
 * Changes from a higher value chip to a lower chip pile,
 * @precondition stack has 4 elements, that is four different colored chip piles
 * @param stack2 Array of chip piles of a given player
 * @param high the higher chip value which the player wants to change from
 * @param low the lower chip value which the player wants to change into
 */
export function change_currency(stack2: Stack, high: number, low = 0): void {
    const h = stack2[high].chip.value;
    const l = stack2[low].chip.value;
    if (high == 25 && low == 10 && stack2[high].number < 0) {
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + 2;
        stack2[1].number = stack2[1].number + 1;
    } else if (stack2[high].number > 0) {
        const change = h / l;
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + change;
    } else {
        console.log("Invalid change");
    }
}


/**
 * Alloes player to manually change a higher value chip pile into a pile with a lower value
 * @precondition stack has 4 elements, that is four different colored chip piles
 * @param stack  Array of chip piles of a given player
 * @param to the lower chip value which the player wants to change into
 * @param from the higher chip value which the player wants to change from
 * @param count How many chips the player wants to change
 */
export function manual_change(stack: Stack, to: string, from: string, count = 1): void {
    const to_col = to_color(to);
    const from_col = to_color(from); 
    for (let l = 0; l < count; l += 1)  {
        change_currency(stack, from_col, to_col);
    }
}



/**
 * changes higher value coins to arrange the wanted valaue made up of the chips of the given value 
 * @precondition stack has 4 elements, that is four different colored chip piles
 * @param stack Array of chip piles of a given player
 * @param color Gives the color of the chips the player wants
 * @param needed Amount which is needed in the given chip
 */
export function auto_change(stack: Stack, color: number, needed: number): void {
    function change_helper(): void {
        for (let h = color + 1; h <= green; h +=1 ) {
            if (stack[h].number > 0) {
                change_currency(stack, h, color);
                auto_change(stack, color, needed - stack[h].chip.value);
                break;
            }
        }
    }
    if (needed <= 0) {}
    else {
        change_helper();
    }
}

/**
 * Automated betting system for when a player choses to call a bet
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
 * @param pot1 the wagered chips of the betting player
 * @param pot2 new pot which contains the calling player's wager
 * @param stack2 the stack of the calling player
 */
export function call_bet(pot1: Pot, pot2: Pot, stack2: Stack): void {
    const bet_value = pot_value(pot1) - pot_value(pot2);
    function call(bet_value: number, stack2: Stack): void {
        function change_helper(change_to: number): void {
            for (let c = change_to + 1; c < 4; c += 1) {
                if (stack2[c].number > 0) {
                    change_currency(stack2, c, change_to);
                    break; 
                }
            }    
        }
        for (let i = 3; i >= 0; i -= 1) {
            for (let j = stack2[i].number; j >= 0 ; j -= 1) {
                const max = stack2[i].chip.value * j; 
                if (bet_value <= 0) {
                    break;
                } else if (bet_value < max) {
                    continue;     
                } else if (max == 0 && i != 0) {
                    break;
                } else if (bet_value >= max) {
                    make_bet([to_string(i), j], stack2, pot2);
                    bet_value = bet_value - max;
                    if (i == 0 && bet_value > 0) {
                        if (bet_value >= 10) {
                            change_helper(2);
                        } else if (bet_value >= 5) {
                            change_helper(1);
                        } else {
                            change_helper(0);
                        }
                        call(bet_value, stack2);
                    }
                    break;
                }  
            }
        }
    }
    return can_call(bet_value, stack2)
        ? call(bet_value, stack2)
        : all_in(stack2, pot2);
}

/**
 * Puts in minimal wager for a player at the start of a round, that is one white chip worth 1 dollar
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
 * @param stack Stack of the player, where one white chip is removed
 * @param pot Pot of the player, where one white chip is placed
 */
export function min_wager(stack: Stack, pot: Pot): void {
    if (stack[white].number === 0) {
        auto_change(stack, white, 1);
        make_bet(["white", 1], stack, pot);
    } else {
        make_bet(["white", 1], stack, pot);
    }
}

/**
 * Gives back the betting player as much as the calling player couldn't call: if pot1's value is larger that pot2,
 *           it is reduced by the difference, which is added to stack 1
 * @precondition pot and stack both have 4 elements, that is four different colored chip piles
 * @param stack the stack of the calling player
 * @param pot1 the wagered chips of the betting player
 * @param pot2 new pot which contains the calling player's wager
 */
export function reverse_bet(stack: Stack, pot1: Pot, pot2: Pot): void {
    let pot_dif = pot_value(pot1) - pot_value(pot2);
    function call(bet_value: number, pot1: Stack): void {
        function change_helper(change_to: number): void {
            for (let c = change_to + 1; c < 4; c += 1) {
                if (stack[c].number > 0) {
                    change_currency(stack, c, change_to);
                    break; 
                }
            }    
        }
        for (let i = 3; i >= 0; i -= 1) {
            for (let j = pot1[i].number; j >= 0 ; j -= 1) {
                const max = pot1[i].chip.value * j; 
                if (bet_value <= 0) {
                    break;
                } else if (bet_value < max) {
                    continue;     
                } else if (max == 0 && i != 0) {
                    break;
                } else if (bet_value >= max) {
                    make_bet([to_string(i), j], pot1, stack);
                    bet_value = bet_value - max;
                    if (i == 0 && bet_value > 0) {
                        if (bet_value >= 10) {
                            change_helper(2);
                        } else if (bet_value >= 5) {
                            change_helper(1);
                        } else {
                            change_helper(0);
                        }
                        call(bet_value, pot1);
                    }
                    break;
                }  
            }
        }
    } if (pot_dif > 0) {
        return call(pot_dif, pot1)
    } else {}
}



/**
 * Prints the players' chip stack
 * @precondition stack has 4 elements, that is four different colored chip piles
 * @param gs (Gamestate) an array of the players' stacks
 */ 
export function show_game_state(gs: GameState, pot: Pot): void {
    console.log("Color             player1's Stack                player2's Stack");
    console.log("");
    console.log("white                   " +  gs[0][0].number + "                               " + gs[1][0].number );
    console.log("red                     " +  gs[0][1].number + "                               " + gs[1][1].number );
    console.log("blue                    " +  gs[0][2].number + "                               " + gs[1][2].number );
    console.log("green                   " +  gs[0][3].number + "                               " + gs[1][3].number );
    console.log("");
    console.log("pot value = " + pot_value(pot) * 2);
}


//test

const stack1: Stack = make_new_stack();
const stack2: Stack = make_new_stack();
let pot1 = make_pot();
let pot2 = make_pot();


