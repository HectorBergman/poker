//main file
import {holdem} from "./poker";
import {Pot, GameState, Hands} from "./poker_types";
import {make_pot, make_new_stack, show_game_state, add_pot, min_wager, call_bet, pot_value} from "./stack_bet"
import {winners}  from "./hands_ranking"

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
        if (result === "Player 1 wins") {
            console.log("Player 1 wins");
            add_pot(pot1, gs[0]);
            add_pot(pot2, gs[0]);
            if (pot_value(gs[1]) === 0) {
                console.log("Player 1 wins the game");
                poker_main();
            }
        }
        else if (result === "Player 2 wins") {
            console.log("Player 2 wins");
            add_pot(pot1, gs[1]);
            add_pot(pot2, gs[1]);
            if (pot_value(gs[1]) === 0) {
                console.log("Player 1 wins the game");
                poker_main();
            } 
        }
        else if (result === "It's a tie") {
            console.log("It's a tie");
            add_pot(pot1, gs[0]);
            add_pot(pot2, gs[1]);
        } 
    }
    round(gs);
}

function poker_main(): void {
    console.log("Poker");
    console.log("");
    const pn = 2;
    const gs: GameState = [];
    for (let i = 0; i < pn; i += 1) {
        gs[i] = make_new_stack();
    }
    round(gs);
}
round([make_new_stack(), make_new_stack()]);