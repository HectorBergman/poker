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
        return (0, helpers_1.lg_permute_list)(newdeck); //Makes a list random
    }
    var newdeck = createdeck();
    var allhands = []; //Player one's hand is index 0, player two index 1, and so on.
    var river = [];
    function dealcards(players) {
        river = [(0, list_1.head)(newdeck), (0, list_1.head)((0, list_1.tail)(newdeck)), (0, list_1.head)((0, list_1.tail)((0, list_1.tail)(newdeck)))];
        //river actually only refers to the fifth card dealt, the first 3 are called 'flop' and the 4th 'turn'.
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
        river[3] = (0, list_1.head)(newdeck);
        newdeck = (0, list_1.tail)(newdeck);
        console.log(river);
        var bet2 = (0, readline_sync_1.question)('Prompt2 ');
        river[4] = (0, list_1.head)(newdeck);
        newdeck = (0, list_1.tail)(newdeck);
        console.log(river);
    }
    function describe(card) {
        function describesuit(suit) {
            return suit === 0
                ? "Clubs"
                : suit === 1
                    ? "Diamonds"
                    : suit === 2
                        ? "Spades"
                        : suit === 3
                            ? "Hearts"
                            : "error";
        }
        function describevalue(value) {
            return value === 11
                ? "Jack"
                : value === 12
                    ? "Queen"
                    : value === 13
                        ? "King"
                        : value === 14
                            ? "Ace"
                            : value.toString();
        }
        return "".concat(describevalue(card.value), " of ").concat(describesuit(card.suit));
        //0 = clubs 1 = diamond 2 = spades 3 = hearts
        //ace 14, king 13, queen 12, jack 11s
    }
    console.log("You have ".concat(describe(allhands[0][0]), " and ").concat(describe(allhands[0][1])));
}
holdem(2);
