//main file
import {holdem} from "./poker";
import {Pot, GameState} from "./poker_types";
import {make_pot, make_new_stack, show_game_state, add_pot} from "./stack_bet"
import {} from "./poker_hands"

function round(gs: GameState) {
    let pot1 = make_pot();
    let pot2 = make_pot();
    const hands: Array<Hand> | undefined = holdem(2, pot1, pot2, gs);
    if (hands == undefined) {
        add_pot(pot1, gs[1]);
        add_pot(pot2, gs[1])

    } else {

    }


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