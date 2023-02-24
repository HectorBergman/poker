//main file
import {holdem} from "./poker";
import {Pot, GameState} from "./poker_types";
import {make_pot, make_new_stack, show_game_state} from "./stack_bet"

function round() {
    let pot1 = make_pot();
    let pot2 = make_pot();
    return holdem(2);
}

function stack_main(): void {
    console.log("Poker");
    console.log("");
    const pn = 2;
    const gs: GameState = [];
    for (let i = 0; i < pn; i += 1) {
        gs[i] = make_new_stack();
    }
    show_game_state(gs);
}