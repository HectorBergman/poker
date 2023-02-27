"use strict";
exports.__esModule = true;
//main file
var poker_1 = require("./poker");
var stack_bet_1 = require("./stack_bet");
var hands_ranking_1 = require("./hands_ranking");
function round(gs) {
    var pot1 = (0, stack_bet_1.make_pot)();
    var pot2 = (0, stack_bet_1.make_pot)();
    var hands = (0, poker_1.holdem)(2, gs, pot1, pot2);
    if (hands == undefined) {
        (0, stack_bet_1.add_pot)(pot1, gs[1]);
        (0, stack_bet_1.add_pot)(pot2, gs[1]);
    }
    else {
        if ((0, hands_ranking_1.winners)(hands[0], hands[1]) === "Player 1 wins") {
            console.log("Player 1 wins");
        }
        else if ((0, hands_ranking_1.winners)(hands[0], hands[1]) === "Player 2 wins") {
            console.log("Player 2 wins");
        }
        else {
            console.log("It's a tie");
        }
    }
}
function stack_main() {
    console.log("Poker");
    console.log("");
    var pn = 2;
    var gs = [];
    for (var i = 0; i < pn; i += 1) {
        gs[i] = (0, stack_bet_1.make_new_stack)();
    }
    (0, stack_bet_1.show_game_state)(gs);
}
round([(0, stack_bet_1.make_new_stack)(), (0, stack_bet_1.make_new_stack)()]);
