import {Hand, Card, Pokerhand, Chip, Bet, Pot, Stack, Pile} from './poker_types'
import * as PromptSync from "prompt-sync";
import {tail, head} from '../lib/list';

function make_pile(col: number, val: number, num: number): Pile {
    return {color: col, chip: val, number: num};
}

const white = 0;
const red = 1;
const blue = 2;
const green = 3;


// https://www.thesprucecrafts.com/standard-poker-chip-denominations-412236  4:3:2:1 ratio
function make_new_stack(): Stack {
        return [make_pile(white, 1, 4), 
                make_pile(red, 5, 3),
                make_pile(blue, 10, 2),
                make_pile(green, 25, 1) 
            ];
}

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

function remove_from_stack(stack: Stack, bet_pile: Pile): Stack {
    const color = bet_pile.color;
    const number = bet_pile.number;
    stack[color].number = stack[color].number - number;
    return stack;
}

//function add_to_pot(pile: Pile, pot: Pot): Pot {}

const stack1: Stack = make_new_stack();
const bet = parse_bet(['white', 3]);
//const pile1: Pile = make_pile(3)
remove_from_stack(stack1, bet)
console.log(bet);
console.log(stack1);



