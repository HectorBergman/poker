"use strict";
exports.__esModule = true;
exports.show_game_state = exports.hold_bet = exports.make_bet = exports.is_valid_bet = exports.pot_value = exports.make_pot = exports.make_new_stack = void 0;
//import * as PromptSync from "prompt-sync";
var list_1 = require("../lib/list");
var white = 0;
var red = 1;
var blue = 2;
var green = 3;
//helper functions not exported
/*
function to_color(color: string): number {
    return color === "white"
        ? white
        : color === "red"
        ? red
        : color === "blue"
        ? blue
        : green;
}*/
function to_string(col) {
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
function make_pile(col, val, num) {
    return { color: col, chip: { value: val }, number: num };
}
/**
 * Makes a new chip stack with four piles
 * @returns a new stack with white, red, blue and green chips in a 4:3:2:1 ratio
 */
function make_new_stack() {
    return [make_pile(white, 1, 4),
        make_pile(red, 5, 3),
        make_pile(blue, 10, 2),
        make_pile(green, 25, 1)
    ];
}
exports.make_new_stack = make_new_stack;
/**
 * Parses a bet made by the user
 * @param bet (array) an array of a string which gives the color and a number which give the number of chips
 * @returns a parsed bet, which is a pile of the given chip
 */
function parse_bet(bet) {
    var color = (0, list_1.head)(bet);
    var num = (0, list_1.tail)(bet);
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
function remove_from_stack(stack, bet) {
    var bet_pile = parse_bet(bet);
    var color = bet_pile.color;
    var number = bet_pile.number;
    stack[color].number = stack[color].number - number;
    return stack;
}
/**
 * Makes a new empty pot
 * @returns
 */
function make_pot() {
    return [make_pile(white, 1, 0),
        make_pile(red, 5, 0),
        make_pile(blue, 10, 0),
        make_pile(green, 25, 0)];
}
exports.make_pot = make_pot;
/**
 * Adds a given bet pile to pot
 * @param pot an array which marks the places for chip piles according to color
 * @param bet an array of a string which gives the color and a number which give the number of chips
 * @returns a  with the given bet added
 */
function place_bet(pot, bet) {
    var bet_pile = parse_bet(bet);
    var color = bet_pile.color;
    pot[color].number = bet_pile.number + pot[color].number;
    return pot;
}
/**
 * Adds pot to the rounds' winners' stack
 * @param pot an array which marks the places for chip piles according to color
 * @param stack an array of chip piles with color as index
 * @returns the original stack with the pot added
 */
function add_pot(pot, stack) {
    for (var i = 0; i < 4; i += 1) {
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
function pot_value(pot) {
    var value = 0;
    for (var i = 0; i <= 3; i += 1) {
        value = value + pot[i].chip.value * pot[i].number;
    }
    return value;
}
exports.pot_value = pot_value;
/**
 * Checks if a bet made by a player is valid
 * @param bet an array of a string wich specifies the color of the bet's chips, and their number
 * @param stack the stack of the player who made the bet
 * @returns If the bet is valid True/false
 */
function is_valid_bet(bet, stack) {
    var bet_pile = parse_bet(bet);
    return stack[bet_pile.color].number >= bet_pile.number;
}
exports.is_valid_bet = is_valid_bet;
/**
 * Puts together helper functions to make a bet
 * @param bet an array of a string wich specifies the color of the bet's chips, and their number
 * @param stack a players array of chip piles
 * @param pot an array of the chip piles which are wagered
 */
function make_bet(bet, stack, pot) {
    if (is_valid_bet(bet, stack)) {
        remove_from_stack(stack, bet);
        place_bet(pot, bet);
    }
    else { }
}
exports.make_bet = make_bet;
function can_hold(pot1, stack2) {
    return pot_value(pot1) <= pot_value(stack2);
}
function change_currency(stack2, high, low) {
    if (low === void 0) { low = 0; }
    var h = stack2[high].chip.value;
    var l = stack2[low].chip.value;
    if (high == 25 && low == 10) {
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + 2;
        stack2[1].number = stack2[1].number + 2;
    }
    else {
        var change = h / l;
        stack2[high].number = stack2[high].number - 1;
        stack2[low].number = stack2[low].number + change;
    }
}
/**
 * Automated betting system for when a player choses to hold a bet
 * @param pot1 the wagered chips of the betting player
 * @param pot2 new pot which contains the holding player's wager
 * @param stack2 the stack of the holding player
 */
function hold_bet(pot1, pot2, stack2) {
    var bet_value = pot_value(pot1) - pot_value(pot2);
    for (var i = 3; i >= 0; i -= 1) {
        for (var j = stack2[i].number; j > 0; j -= 1) {
            var max = stack2[i].chip.value * j;
            if (bet_value < max) {
                continue;
            }
            else if (bet_value >= max) {
                make_bet([to_string(i), j], stack2, pot2);
                bet_value = bet_value - max;
            }
            else if (bet_value == 0) {
                break;
            }
        }
    }
}
exports.hold_bet = hold_bet;
/**
 * Prints the players chip stack
 * @param gs (Gamestate) an array of the players' stacks
 */
function show_game_state(gs) {
    console.log("Color             player1's Stack                player2's Stack");
    console.log("");
    console.log("white                   " + gs[0][0].number + "                               " + gs[1][0].number);
    console.log("red                     " + gs[0][1].number + "                               " + gs[1][1].number);
    console.log("blue                    " + gs[0][2].number + "                               " + gs[1][2].number);
    console.log("green                   " + gs[0][3].number + "                               " + gs[1][3].number);
}
exports.show_game_state = show_game_state;
// Test
function main() {
    console.log("Poker");
    console.log("");
    var pn = 2;
    var gs = [];
    for (var i = 0; i < pn; i += 1) {
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
var stack1 = make_new_stack();
var stack2 = make_new_stack();
var pot1 = make_pot();
var pot2 = make_pot();
make_bet(["white", 3], stack1, pot1);
make_bet(["red", 2], stack1, pot1);
make_bet(["green", 1], stack1, pot1);
hold_bet(pot1, pot2, stack2);
change_currency(stack2, 2, 0);
show_game_state([stack1, stack2]);
console.log("pot2 value    " + pot_value(pot1));
console.log("pot1 value    " + pot_value(pot2));
change_currency(stack2, 2, 0);
