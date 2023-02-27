//main file
import {holdem} from "./poker";
import {Pot, GameState, Hands} from "./poker_types";
import {make_pot, make_new_stack, show_game_state, add_pot} from "./stack_bet"
import {winners}  from "./hands_ranking"

function round(gs: GameState) {
    let pot1 = make_pot();
    let pot2 = make_pot();
    const hands: Hands | undefined = holdem(2, gs, pot1, pot2);
    if (hands == undefined) {
        add_pot(pot1, gs[1]);
        add_pot(pot2, gs[1])
    } else {
        if (winners(hands[0], hands[1]) === "Player 1 wins"){
            console.log("Player 1 wins");
        }
        else if (winners(hands[0], hands[1]) === "Player 2 wins"){
            console.log("Player 2 wins");
        }
        else{
            console.log("It's a tie");
        }
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
round([make_new_stack(), make_new_stack()]);