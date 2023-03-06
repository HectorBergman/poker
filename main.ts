//main file
import {holdem} from "./poker";
import {Pot, GameState, Hands} from "./poker_types";
import {make_pot, make_new_stack, show_game_state, add_pot, min_wager, call_bet, pot_value} from "./stack_bet"
import {winners}  from "./hands_ranking"
import {question} from 'readline-sync'
import {cardimages} from './cardimages'
import { head } from "../lib/list";


function round(gs: GameState) {
    let pot1 = make_pot();
    let pot2 = make_pot();
    min_wager(gs[0], pot1);
    min_wager(gs[1], pot2);
    show_game_state(gs, pot1);
    const hands: Hands | undefined = holdem(2, gs, pot1, pot2);
    if (hands == undefined) {
        add_pot(pot1, gs[1]);
        add_pot(pot2, gs[1]);
    } else {
        let result = winners(hands[0], hands[1])
        console.log(`You bet ${pot1[0].number} white chips, ${pot1[1].number} red chips, ${pot1[2].number} blue chips and ${pot1[3].number} green chips.`)
        if (head(result) === "Player 1 wins") {
            console.log("Player wins the round");
            add_pot(pot1, gs[0]);
            add_pot(pot2, gs[0]);
            if (pot_value(gs[1]) === 0) {
                console.log("Player wins the game");
                poker_main();
            }
        }
        else if (head(result) === "Player 2 wins") {
            console.log("Computer wins the round");
            add_pot(pot1, gs[1]);
            add_pot(pot2, gs[1]);
            if (pot_value(gs[0]) === 0) {
                console.log("Computer wins the game");
                poker_main();
            } 
        }
        else if (head(result) === "It's a tie") {
            console.log("It's a tie");
            add_pot(pot1, gs[0]);
            add_pot(pot2, gs[1]);
        } 
    }
    round(gs);
}

function poker_main(): void {
    menu();
    console.log("Poker");
    console.log("");
    const pn = 2;
    const gs: GameState = [];
    for (let i = 0; i < pn; i += 1) {
        gs[i] = make_new_stack();
    }
    round(gs);
}

function menu(): void{
    console.log(cardimages['Intro']);
    console.log(cardimages['Introtext']);
    console.log();
    console.log('START');
    console.log('INSTRUCTIONS');
    function minimenu(): void{
        var prompt = question('What do you want to do? ');
        if (prompt.toLowerCase() === 'start'){
            return;
        }
        else if (prompt.toLowerCase() === 'instructions'){
            console.log('instructions');
        }
        else{
            console.log("Not a valid command. Type 'start' or 'instructions'.")
        }
        return minimenu();
    }
    return minimenu();
}

poker_main();