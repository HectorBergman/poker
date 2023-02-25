"use strict";
exports.__esModule = true;
exports.holdem = void 0;
var list_1 = require("../lib/list");
var helpers_1 = require("./helpers");
var readline_sync_1 = require("readline-sync");
var cardimages_1 = require("./cardimages");
/**
 * Generates a list of 52 unique cards with suit 0-3 and value 2-14 (11 = jack, 12 = queen, 13 = king, 14 = ace)
 * @returns A list of cards
 */
function createdeck() {
    var newdeck = (0, list_1.list)();
    for (var suit = 0; suit < 4; suit++) {
        //0 = clubs 1 = diamond 2 = spades 3 = hearts
        for (var value = 2; value < 15; value++) {
            //ace 14, king 13, queen 12, jack 11
            var newcard = { suit: suit, value: value };
            var temp = (0, list_1.append)(newdeck, (0, list_1.list)(newcard));
            newdeck = temp;
        }
    }
    return (0, helpers_1.random_list)(newdeck); //Makes a list random
}
/**
 * Initiates user input and either deals the next card or ends the round depending on user input
 * @param player The player making the choice, as of right now it does nothing || MAYBE DELETE?
 * @param board The current state of the board
 * @param deck The list of remaining cards in the deck
 * @param allhands Array of array of cards representing the player's hand and the computer's hand
 * @returns undefined if player folds, else it returns allhands
 */
function roundstart(player, board, deck, allhands) {
    var selectionresult = selection(0, allhands, board);
    if (selectionresult === undefined) {
        return undefined;
    }
    else {
        board[3] = (0, list_1.head)(deck); //turn
        console.log("The turn is a ".concat((0, helpers_1.describe)(board[3]), "."));
        deck = (0, list_1.tail)(deck);
        selectionresult = selection(0, allhands, board);
        if (selectionresult === undefined) {
            return undefined;
        }
        else {
            board[4] = (0, list_1.head)(deck); //river
            console.log("".concat((0, helpers_1.describe)(board[4]), " on the river!"));
            deck = (0, list_1.tail)(deck);
            selectionresult = selection(0, allhands, board);
            if (selectionresult === undefined) {
                return undefined;
            }
            else {
                return allhands;
            }
        }
    }
}
/**
 * Asks for user input and prints out a message or an image or goes into the next stage of the round depending on input.
 * @param player The player making the choice, as of right now it does nothing of importance || MAYBE DELETE?
 * @param allhands Array of array of cards representing the player's hand and the computer's hand
 * @param board The current state of the board
 * @returns number if player bets, undefined if folds
 * NOTE: Number is nothing of importance, just had to be anything except allhands or undefined.
 */
function selection(player, allhands, board) {
    var prompt = (0, readline_sync_1.question)('What do you want to do? ');
    if (prompt.toLowerCase() === "bet") {
        console.log("Bet");
        return 1;
    }
    else if (prompt.toLowerCase() === "help") {
        console.log('Type "bet" to bet, "hand" to look at your cards, "board" to look at the board, and "fold" to fold.');
    }
    else if (prompt.toLowerCase() === "hand") {
        (0, cardimages_1.displaycards)([(0, helpers_1.describe)(allhands[player][0]), (0, helpers_1.describe)(allhands[player][1])]);
        console.log("You have the ".concat((0, helpers_1.describe)(allhands[player][0]), " and the ").concat((0, helpers_1.describe)(allhands[player][1])));
    }
    else if (prompt.toLowerCase() === "board") {
        if (board[4] === undefined) {
            if (board[3] === undefined) {
                (0, cardimages_1.displaycards)([(0, helpers_1.describe)(board[0]), (0, helpers_1.describe)(board[1]), (0, helpers_1.describe)(board[2])]);
                console.log("On the board there's the ".concat((0, helpers_1.describe)(board[0]), ", the ").concat((0, helpers_1.describe)(board[1]), " and the ").concat((0, helpers_1.describe)(board[2])));
            }
            else {
                (0, cardimages_1.displaycards)([(0, helpers_1.describe)(board[0]), (0, helpers_1.describe)(board[1]), (0, helpers_1.describe)(board[2]), (0, helpers_1.describe)(board[3])]);
                console.log("On the board there's the ".concat((0, helpers_1.describe)(board[0]), ", the ").concat((0, helpers_1.describe)(board[1]), ", the ").concat((0, helpers_1.describe)(board[2]), " and the ").concat((0, helpers_1.describe)(board[3])));
            }
        }
        else {
            (0, cardimages_1.displaycards)([(0, helpers_1.describe)(board[0]), (0, helpers_1.describe)(board[1]), (0, helpers_1.describe)(board[2]), (0, helpers_1.describe)(board[3]), (0, helpers_1.describe)(board[4])]);
            console.log("On the board there's the ".concat((0, helpers_1.describe)(board[0]), ", the ").concat((0, helpers_1.describe)(board[1]), ", the ").concat((0, helpers_1.describe)(board[2]), ", the ").concat((0, helpers_1.describe)(board[3]), " and the ").concat((0, helpers_1.describe)(board[4])));
        }
    }
    else if (prompt.toLowerCase() === "fold") {
        console.log("You fold");
        return undefined; //end round if 1 player left
    }
    else {
        console.log('Not a proper input. Type "help" for help.');
    }
    return selection(player, allhands, board);
}
function holdem(players, gamestate, pot1, pot2) {
    var newdeck = createdeck();
    var allhands = []; //Player one's hand is index 0, player two index 1, and so on.
    var board = [];
    function dealcards(players) {
        board = [(0, list_1.head)(newdeck), (0, list_1.head)((0, list_1.tail)(newdeck)), (0, list_1.head)((0, list_1.tail)((0, list_1.tail)(newdeck)))];
        //this will be the 5 cards in the center of the table. Currently it's only the flop
        newdeck = (0, list_1.tail)((0, list_1.tail)((0, list_1.tail)(newdeck)));
        /* Dealcardshelper gives a player the two cards on the top of the deck,
        dealing cards like this would get you shot in the wild west,
        but it works fine for a computer since it's completely random regardless*/
        function dealcardshelper(player) {
            player[0] = (0, list_1.head)(newdeck);
            player[1] = (0, list_1.head)((0, list_1.tail)(newdeck));
            newdeck = (0, list_1.tail)((0, list_1.tail)(newdeck));
        }
        for (var deal = 0; deal < players; deal++) {
            allhands[deal] = [];
            dealcardshelper(allhands[deal]);
        }
    }
    dealcards(2);
    var roundstartresult = roundstart(0, board, newdeck, allhands);
    if (roundstartresult === undefined) {
        return undefined;
    }
    else if (roundstartresult === allhands) {
        console.log(allhands);
        return allhands;
    }
}
exports.holdem = holdem;
