"use strict";
exports.__esModule = true;
var list_1 = require("../lib/list");
var helpers_1 = require("./helpers");
var readline_sync_1 = require("readline-sync");
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
        var bet = (0, readline_sync_1.question)('Prompt1 ');
        board[3] = (0, list_1.head)(newdeck); //turn
        console.log("The turn is a ".concat((0, helpers_1.describe)(board[3]), "."));
        newdeck = (0, list_1.tail)(newdeck);
        console.log(board);
        var bet2 = (0, readline_sync_1.question)('Prompt2 ');
        board[4] = (0, list_1.head)(newdeck); //river
        console.log("".concat((0, helpers_1.describe)(board[4]), " on the river!"));
        newdeck = (0, list_1.tail)(newdeck);
        console.log(board);
    }
    roundstart();
}
holdem(2);
