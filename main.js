"use strict";
exports.__esModule = true;
//main file
var poker_1 = require("./poker");
var stack_bet_1 = require("./stack_bet");
var hands_ranking_1 = require("./hands_ranking");
function round(gs) {
    (0, stack_bet_1.show_game_state)(gs);
    var pot1 = (0, stack_bet_1.make_pot)();
    var pot2 = (0, stack_bet_1.make_pot)();
    (0, stack_bet_1.min_wager)(gs[0], pot1);
    (0, stack_bet_1.min_wager)(gs[1], pot2);
    var hands = (0, poker_1.holdem)(2, gs, pot1, pot2);
    if (hands == undefined) {
        (0, stack_bet_1.add_pot)(pot1, gs[1]);
        (0, stack_bet_1.add_pot)(pot2, gs[1]);
    }
    else {
        if ((0, hands_ranking_1.winners)(hands[0], hands[1]) === "Player 1 wins") {
            console.log("Player 1 wins");
            (0, stack_bet_1.add_pot)(pot1, gs[0]);
            (0, stack_bet_1.add_pot)(pot2, gs[0]);
            if ((0, stack_bet_1.pot_value)(gs[1]) === 0) {
                console.log("Player 1 wins the game");
                poker_main();
            }
        }
        else if ((0, hands_ranking_1.winners)(hands[0], hands[1]) === "Player 2 wins") {
            console.log("Player 2 wins");
            (0, stack_bet_1.add_pot)(pot1, gs[1]);
            (0, stack_bet_1.add_pot)(pot2, gs[1]);
            if ((0, stack_bet_1.pot_value)(gs[1]) === 0) {
                console.log("Player 1 wins the game");
                poker_main();
            }
        }
        else if ((0, hands_ranking_1.winners)(hands[0], hands[1]) === "It's a tie") {
            console.log("It's a tie");
            (0, stack_bet_1.add_pot)(pot1, gs[0]);
            (0, stack_bet_1.add_pot)(pot2, gs[1]);
        }
    }
}
function poker_main() {
    console.log("Poker");
    console.log("");
    var pn = 2;
    var gs = [];
    for (var i = 0; i < pn; i += 1) {
        gs[i] = (0, stack_bet_1.make_new_stack)();
    }
    round(gs);
}
round([(0, stack_bet_1.make_new_stack)(), (0, stack_bet_1.make_new_stack)()]);
