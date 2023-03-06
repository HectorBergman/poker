"use strict";
exports.__esModule = true;
//main file
var poker_1 = require("./poker");
var stack_bet_1 = require("./stack_bet");
var hands_ranking_1 = require("./hands_ranking");
var readline_sync_1 = require("readline-sync");
var cardimages_1 = require("./cardimages");
var list_1 = require("../lib/list");
function round(gs) {
    var pot1 = (0, stack_bet_1.make_pot)();
    var pot2 = (0, stack_bet_1.make_pot)();
    (0, stack_bet_1.min_wager)(gs[0], pot1);
    (0, stack_bet_1.min_wager)(gs[1], pot2);
    (0, stack_bet_1.show_game_state)(gs, pot1);
    var hands = (0, poker_1.holdem)(2, gs, pot1, pot2);
    if (hands == undefined) {
        (0, stack_bet_1.add_pot)(pot1, gs[1]);
        (0, stack_bet_1.add_pot)(pot2, gs[1]);
    }
    else {
        var result = (0, hands_ranking_1.winners)(hands[0], hands[1]);
        console.log("You bet ".concat(pot1[0].number, " white chips, ").concat(pot1[1].number, " red chips, ").concat(pot1[2].number, " blue chips and ").concat(pot1[3].number, " green chips."));
        if ((0, list_1.head)(result) === "Player 1 wins") {
            console.log("Player wins the round");
            (0, stack_bet_1.add_pot)(pot1, gs[0]);
            (0, stack_bet_1.add_pot)(pot2, gs[0]);
            if ((0, stack_bet_1.pot_value)(gs[1]) === 0) {
                console.log("Player wins the game");
                poker_main();
            }
        }
        else if ((0, list_1.head)(result) === "Player 2 wins") {
            console.log("Computer wins the round");
            (0, stack_bet_1.add_pot)(pot1, gs[1]);
            (0, stack_bet_1.add_pot)(pot2, gs[1]);
            if ((0, stack_bet_1.pot_value)(gs[0]) === 0) {
                console.log("Computer wins the game");
                poker_main();
            }
        }
        else if ((0, list_1.head)(result) === "It's a tie") {
            console.log("It's a tie");
            (0, stack_bet_1.add_pot)(pot1, gs[0]);
            (0, stack_bet_1.add_pot)(pot2, gs[1]);
        }
    }
    round(gs);
}
function poker_main() {
    menu();
    console.log("Poker");
    console.log("");
    var pn = 2;
    var gs = [];
    for (var i = 0; i < pn; i += 1) {
        gs[i] = (0, stack_bet_1.make_new_stack)();
    }
    round(gs);
}
function menu() {
    console.log(cardimages_1.cardimages['Intro']);
    console.log(cardimages_1.cardimages['Introtext']);
    console.log();
    console.log('START');
    console.log('INSTRUCTIONS');
    function minimenu() {
        var prompt = (0, readline_sync_1.question)('What do you want to do? ');
        if (prompt.toLowerCase() === 'start') {
            return;
        }
        else if (prompt.toLowerCase() === 'instructions') {
            console.log("Type 'start' to start.");
            console.log("When in-game, type 'help' for further commands.");
            console.log("Game ends when either player has no remaining chips.");
        }
        else {
            console.log("Not a valid command. Type 'start' or 'instructions'.");
        }
        return minimenu();
    }
    return minimenu();
}
poker_main();
