"use strict";
exports.__esModule = true;
exports.displaycards = exports.stepbystepdisplay = exports.cardimages = void 0;
//Ascii art by ejm98
exports.cardimages = {
    'blank': '                                                                   ',
    'Ace of Diamonds': " _____ \n|A ^  |\n| / \\ |\n| \\ / |\n|  v  |\n|____V| ",
    'Ace of Hearts': " _____ \n|A_ _ |\n|( v )|\n| \\ / |\n|  v  |\n|____V|",
    'Ace of Clubs': " _____ \n|A _  |\n| ( ) |\n|(_'_)|\n|  |  |\n|____V|",
    'Ace of Spades': " _____ \n|A .  |\n| /.\\ |\n|(_._)|\n|  |  |\n|____V|",
    'King of Diamonds': " _____ \n|K  WW|\n| /\\{)|\n| \\/##|\n|  ###|\n|_###>|",
    'King of Hearts': " _____ \n|K  WW|\n|   {)|\n|(v)##|\n| v###|\n|_###>|",
    'King of Clubs': " _____ \n|K  WW|\n| o {)|\n|o o##|\n| |###|\n|_###>|",
    'King of Spades': " _____ \n|K  WW|\n| ^ {)|\n|(.)##|\n| |###|\n|_###>|",
    'Queen of Diamonds': " _____ \n|Q  ww|\n| /\\{(|\n| \\/##|\n|  ###|\n|_###O|",
    'Queen of Hearts': " _____ \n|Q  ww|\n|   {(|\n|(v)##|\n| v###|\n|_###O|",
    'Queen of Clubs': " _____ \n|Q  ww|\n| o {(|\n|o o##|\n| |###|\n|_###O|",
    'Queen of Spades': " _____ \n|Q  ww|\n| ^ {(|\n|(.)##|\n| |###|\n|_###O|",
    'Jack of Diamonds': " _____ \n|J  ww|\n| /\\{)|\n| \\/# |\n|   # |\n|__##[|",
    'Jack of Hearts': " _____ \n|J  ww|\n|   {)|\n|(v)# |\n| v # |\n|__##[|",
    'Jack of Clubs': " _____ \n|J  ww|\n| o {)|\n|o o# |\n| | # |\n|__##[|",
    'Jack of Spades': " _____ \n|J  ww|\n| ^ {)|\n|(.)# |\n| | # |\n|__##[|",
    '10 of Spades': " _____ \n|10 ^ |\n|^ ^ ^|\n|^ ^ ^|\n|^ ^ ^|\n|___0I|",
    '10 of Hearts': " _____ \n|10 v |\n|v v v|\n|v v v|\n|v v v|\n|___0I|",
    '10 of Clubs': " _____ \n|10 & |\n|& & &|\n|& & &|\n|& & &|\n|___0I|",
    '10 of Diamonds': " _____ \n|10 o |\n|o o o|\n|o o o|\n|o o o|\n|___0I|",
    '9 of Diamonds': " _____ \n|9    |\n|o o o|\n|o o o|\n|o o o|\n|____6|",
    '9 of Hearts': " _____ \n|9    |\n|v v v|\n|v v v|\n|v v v|\n|____6|",
    '9 of Clubs': " _____ \n|9    |\n|& & &|\n|& & &|\n|& & &|\n|____6|",
    '9 of Spades': " _____ \n|9    |\n|^ ^ ^|\n|^ ^ ^|\n|^ ^ ^|\n|____6|",
    '8 of Diamonds': " _____ \n|8    |\n|o o o|\n| o o |\n|o o o|\n|____8|",
    '8 of Hearts': " _____ \n|8    |\n|v v v|\n| v v |\n|v v v|\n|____8|",
    '8 of Clubs': " _____ \n|8    |\n|& & &|\n| & & |\n|& & &|\n|____8|",
    '8 of Spades': " _____ \n|8    |\n|^ ^ ^|\n| ^ ^ |\n|^ ^ ^|\n|____8|",
    '7 of Diamonds': " _____ \n|7    |\n| o o |\n|o o o|\n| o o |\n|____L|",
    '7 of Hearts': " _____ \n|7    |\n| v v |\n|v v v|\n| v v |\n|____L|",
    '7 of Clubs': " _____ \n|7    |\n| & & |\n|& & &|\n| & & |\n|____L|",
    '7 of Spades': " _____ \n|7    |\n| ^ ^ |\n|^ ^ ^|\n| ^ ^ |\n|____L|",
    '6 of Diamonds': " _____ \n|6    |\n| o o |\n| o o |\n| o o |\n|____9|",
    '6 of Hearts': " _____ \n|6    |\n| v v |\n| v v |\n| v v |\n|____9|",
    '6 of Clubs': " _____ \n|6    |\n| & & |\n| & & |\n| & & |\n|____9|",
    '6 of Spades': " _____ \n|6    |\n| ^ ^ |\n| ^ ^ |\n| ^ ^ |\n|____9|",
    '5 of Diamonds': " _____ \n|5    |\n| o o |\n|  o  |\n| o o |\n|____S|",
    '5 of Hearts': " _____ \n|5    |\n| v v |\n|  v  |\n| v v |\n|____S|",
    '5 of Clubs': " _____ \n|5    |\n| & & |\n|  &  |\n| & & |\n|____S|",
    '5 of Spades': " _____ \n|5    |\n| ^ ^ |\n|  ^  |\n| ^ ^ |\n|____S|",
    '4 of Diamonds': " _____ \n|4    |\n| o o |\n|     |\n| o o |\n|____h|",
    '4 of Hearts': " _____ \n|4    |\n| v v |\n|     |\n| v v |\n|____h|",
    '4 of Clubs': " _____ \n|4    |\n| & & |\n|     |\n| & & |\n|____h|",
    '4 of Spades': " _____ \n|4    |\n| ^ ^ |\n|     |\n| ^ ^ |\n|____h|",
    '3 of Diamonds': " _____ \n|3    |\n| o o |\n|     |\n|  o  |\n|____E|",
    '3 of Hearts': " _____ \n|3    |\n| v v |\n|     |\n|  v  |\n|____E|",
    '3 of Clubs': " _____ \n|3    |\n| & & |\n|     |\n|  &  |\n|____E|",
    '3 of Spades': " _____ \n|3    |\n| ^ ^ |\n|     |\n|  ^  |\n|____E|",
    '2 of Diamonds': " _____ \n|2    |\n|  o  |\n|     |\n|  o  |\n|____Z|",
    '2 of Hearts': " _____ \n|2    |\n|  v  |\n|     |\n|  v  |\n|____Z|",
    '2 of Clubs': " _____ \n|2    |\n|  &  |\n|     |\n|  &  |\n|____Z|",
    '2 of Spades': " _____ \n|2    |\n|  ^  |\n|     |\n|  ^  |\n|____Z|"
};
/*
** Takes an array of strings and prints an image of cards (given they're in the correct format)
** prints the first 8 elements in each string, then the next 8, and so on.
** This results in cards side-by-side in the console.
*/
function stepbystepdisplay(cards) {
    console.log(exports.cardimages[cards[0]].substring(0, 7), exports.cardimages[cards[1]].substring(0, 7), exports.cardimages[cards[2]].substring(0, 7), exports.cardimages[cards[3]].substring(0, 7), exports.cardimages[cards[4]].substring(0, 7));
    console.log(exports.cardimages[cards[0]].substring(8, 15), exports.cardimages[cards[1]].substring(8, 15), exports.cardimages[cards[2]].substring(8, 15), exports.cardimages[cards[3]].substring(8, 15), exports.cardimages[cards[4]].substring(8, 15));
    console.log(exports.cardimages[cards[0]].substring(16, 23), exports.cardimages[cards[1]].substring(16, 23), exports.cardimages[cards[2]].substring(16, 23), exports.cardimages[cards[3]].substring(16, 23), exports.cardimages[cards[4]].substring(16, 23));
    console.log(exports.cardimages[cards[0]].substring(24, 31), exports.cardimages[cards[1]].substring(24, 31), exports.cardimages[cards[2]].substring(24, 31), exports.cardimages[cards[3]].substring(24, 31), exports.cardimages[cards[4]].substring(24, 31));
    console.log(exports.cardimages[cards[0]].substring(32, 39), exports.cardimages[cards[1]].substring(32, 39), exports.cardimages[cards[2]].substring(32, 39), exports.cardimages[cards[3]].substring(32, 39), exports.cardimages[cards[4]].substring(32, 39));
    console.log(exports.cardimages[cards[0]].substring(40, 47), exports.cardimages[cards[1]].substring(40, 47), exports.cardimages[cards[2]].substring(40, 47), exports.cardimages[cards[3]].substring(40, 47), exports.cardimages[cards[4]].substring(40, 47));
}
exports.stepbystepdisplay = stepbystepdisplay;
/*
** Runs stepbystepdisplay but ensures that if a hand has less than 5 cards,
** the missing cards are replaced with a long line of blank space,
** ensuring no errors occur.
*/
function displaycards(cards) {
    var temp = cards;
    if (temp[2] === undefined) {
        temp[2] = 'blank';
        temp[3] = 'blank';
        temp[4] = 'blank';
    }
    else if (temp[3] === undefined) {
        temp[3] = 'blank';
        temp[4] = 'blank';
    }
    else if (temp[4] === undefined) {
        temp[4] = 'blank';
    }
    stepbystepdisplay(temp);
}
exports.displaycards = displaycards;
//stepbystepdisplay([cardimages['2 of Diamonds'], cardimages['3 of Hearts'], cardimages['4 of Clubs'],cardimages['5 of Spades'],cardimages['blank']]);
