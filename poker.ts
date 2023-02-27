import {head, tail, list, append} from '../lib/list'
import {random_list, describe} from './helpers'
import {Deck, Hand, Board, Pocketcards, Pokerhand, Card, Bet, Pot, Stack, Pile, GameState} from './poker_types'
import {question} from 'readline-sync'
import {displaycards} from './cardimages'
import {make_bet, call_bet, pot_value, make_pot, show_game_state} from './stack_bet';

/**
 * Generates a list of 52 unique cards with suit 0-3 and value 2-14 (11 = jack, 12 = queen, 13 = king, 14 = ace)
 * @returns A list of cards
 */
function createdeck(): Deck{
    let newdeck: Deck = list()
    for (let suit = 0; suit < 4; suit++) {
        //0 = clubs 1 = diamond 2 = spades 3 = hearts
        for (let value = 2; value < 15; value++) {
            //ace 14, king 13, queen 12, jack 11
            let newcard: Card = {suit, value};
            let temp = append(newdeck, list(newcard));
            newdeck = temp;
        }
    }
    return random_list(newdeck); //Makes a list random
}

/**
 * Initiates user input and either deals the next card or ends the round depending on user input
 * @param player The player making the choice, as of right now it does nothing || MAYBE DELETE?
 * @param board The current state of the board
 * @param deck The list of remaining cards in the deck
 * @param allhands Array of array of cards representing the player's hand and the computer's hand
 * @returns undefined if player folds, else it returns allhands
 */

function roundstart(player: number, board: Hand, deck: Deck, allhands: Array<Hand>, gamestate:GameState, pot1: Pot, pot2: Pot): Array<Hand> | undefined{ 
    let selectionresult = selection(0, allhands, board, gamestate, pot1, pot2);
    if(selectionresult === undefined){
        return undefined;
    }
    else{
        board[3] = head(deck!); //turn
        console.log(`The turn is a ${describe(board[3])}.`);
        deck = tail(deck!);
        selectionresult = selection(0, allhands, board, gamestate, pot1, pot2);
        if(selectionresult === undefined){
            return undefined;
        }
        else{
            board[4] = head(deck!); //river
            console.log(`${describe(board[4])} on the river!`);
            deck = tail(deck!);
            selectionresult = selection(0, allhands, board, gamestate, pot1, pot2);
            if(selectionresult=== undefined){
                return undefined;
            }
            else{
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

function selection(player: number, allhands: Array<Hand>, board: Hand, gamestate:GameState, pot1: Pot, pot2: Pot): number | undefined{
    var prompt = question('What do you want to do? ');
    if (prompt.toLowerCase() === "bet"){
        betting_selection(gamestate, pot1, pot2);
        return 1;
    }
    else if (prompt.toLowerCase() === "help"){
        console.log('Type "bet" to bet, "hand" to look at your cards, "board" to look at the board, and "fold" to fold.')
    }
    else if (prompt.toLowerCase() === "hand"){
        displaycards([describe(allhands[player][0]), describe(allhands[player][1])])
        console.log(`You have the ${describe(allhands[player][0])} and the ${describe(allhands[player][1])}`);
    }
    else if (prompt.toLowerCase() === "board" ){
        if (board[4] === undefined){
            if (board[3] === undefined){
                displaycards([describe(board[0]), describe(board[1]),describe(board[2])])
                console.log(`On the board there's the ${describe(board[0])}, the ${describe(board[1])} and the ${describe(board[2])}`)
            }
            else{
                displaycards([describe(board[0]), describe(board[1]),describe(board[2]),describe(board[3])])
                console.log(`On the board there's the ${describe(board[0])}, the ${describe(board[1])}, the ${describe(board[2])} and the ${describe(board[3])}`)
            }
        }   
        else{
            displaycards([describe(board[0]), describe(board[1]),describe(board[2]),describe(board[3]),describe(board[4])])
        console.log(`On the board there's the ${describe(board[0])}, the ${describe(board[1])}, the ${describe(board[2])}, the ${describe(board[3])} and the ${describe(board[4])}`)
        }
    }
    else if (prompt.toLowerCase() === "fold" ){
        console.log("You fold");
        return undefined; //end round if 1 player left
    }
    else{
        console.log('Not a proper input. Type "help" for help.')
    }
    return selection(player, allhands, board, gamestate, pot1, pot2);
}
function bet_number(color: string, number: number, gamestate: GameState, pot1: Pot, pot2: Pot){
    var prompt3 = question(`How much do you want to bet? You have ${gamestate[0][number].number} ${color} chips. `)
    if (Number.isNaN(Number(prompt3))){
        console.log("Not a number. Type a number.");
        return 1;
    }else{
        make_bet([color, Number(prompt3)], gamestate[0] ,pot1);
        return 0;
    }
    
}

function betting_selection(gamestate: GameState, pot1: Pot, pot2: Pot){
    var prompt2 = question('What do you want to bet? ')
    if (prompt2.toLowerCase() === "white"){
        bet_number("white", 0, gamestate, pot1, pot2);
    }
    else if (prompt2.toLowerCase() === "red"){
        bet_number("red", 1, gamestate, pot1, pot2);
    }
    else if (prompt2.toLowerCase() === "blue"){
        bet_number("blue", 2, gamestate, pot1, pot2);
    }
    else if (prompt2.toLowerCase() === "green"){
        bet_number("green", 3, gamestate, pot1, pot2);
    }
    else if (prompt2.toLowerCase() === "help"){
        console.log("Type the corresponding colour of your stack to select it.");
    }
    else{
        console.log('Not a proper input. Type "help" for help.');
    }
    return betmore();
    function betmore(){
        var prompt4 = question('Do you want to bet more? y/n ');
        if (prompt4.toLowerCase() === "y"){
            return betting_selection(gamestate, pot1, pot2);
        }
        else if (prompt4.toLowerCase() === "n"){
            return 1;
        }
        else{
            console.log("Invalid input. Please type y or n");
        }
        return betmore();
    }
}

export function holdem(players: number, gamestate: GameState, pot1: Pot, pot2: Pot): Array<Hand> | undefined{

    let newdeck: Deck = createdeck();
    let allhands: Array<Hand> = []; //Player one's hand is index 0, player two index 1, and so on.
    let board: Hand = []
    function dealcards(players: number): void{
        board = [head(newdeck!), head(tail(newdeck!)!), head(tail(tail(newdeck!)!)!)];
        //this will be the 5 cards in the center of the table. Currently it's only the flop
        newdeck = tail(tail(tail(newdeck!)!)!);
        /* Dealcardshelper gives a player the two cards on the top of the deck,
        dealing cards like this would get you shot in the wild west,
        but it works fine for a computer since it's completely random regardless*/
        function dealcardshelper(player: Hand): void { 
            player[0] = head(newdeck!);
            player[1] = head(tail(newdeck!)!);
            newdeck = tail(tail(newdeck!)!);
        }
        for (let deal = 0; deal < players; deal++){
            allhands[deal] = [];
            dealcardshelper(allhands[deal]);
        }
    }
    dealcards(2);
    let roundstartresult = roundstart(0, board, newdeck, allhands, gamestate, pot1, pot2);
    if (roundstartresult === undefined){
        return undefined
    }
    else if (roundstartresult === allhands){
        console.log(allhands);
        return allhands
    }  
}



