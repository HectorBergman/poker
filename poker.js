"use strict";
exports.__esModule = true;
exports.holdem = void 0;
var list_1 = require("../lib/list");
var helpers_1 = require("./helpers");
var readline_sync_1 = require("readline-sync");
var cardimages_1 = require("./cardimages");
function holdem(players) {
    /**
     * Generates a deck of 52 cards in random order
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
    dealcards(players);
    /*console.log(newdeck)
    console.log(allhands)
    console.log(allhands[0])
    console.log(createdeck());*/
    function roundstart() {
        selection(0);
        board[3] = (0, list_1.head)(newdeck); //turn
        console.log("The turn is a ".concat((0, helpers_1.describe)(board[3]), "."));
        newdeck = (0, list_1.tail)(newdeck);
        selection(0);
        board[4] = (0, list_1.head)(newdeck); //river
        console.log("".concat((0, helpers_1.describe)(board[4]), " on the river!"));
        newdeck = (0, list_1.tail)(newdeck);
        selection(0);
    }
    /*
    ** Code for player input after cards have been dealt, den är lite dålig
    ** så man måste nog ändra den lite
    */
    function selection(player) {
        var prompt = (0, readline_sync_1.question)('What do you want to do? ');
        if (prompt.toLowerCase() === "bet") {
            console.log("Bet");
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
            return; //end round if 1 player left
        }
        else {
            console.log('Not a proper input. Type "help" for help.');
        }
        selection(player);
    }
    roundstart();
}
exports.holdem = holdem;
holdem(2);
