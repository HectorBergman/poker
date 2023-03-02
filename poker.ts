import {head, tail, list, append} from '../lib/list'
import {random_list, describe} from './helpers'
import {Deck, Hand, Board, Pocketcards, Pokerhand, Card, Bet, Pot, Stack, Pile, GameState} from './poker_types'
import {question} from 'readline-sync'
import {displaycards} from './cardimages'
import {make_bet, call_bet, pot_value, make_pot, show_game_state, all_in, reverse_bet} from './stack_bet';


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
 * @param board The current state of the board
 * @param deck The list of remaining cards in the deck
 * @param allhands Array of array of cards representing the player's hand and the computer's hand
 * @returns undefined if player folds, else it returns allhands
 */

function roundstart(board: Hand, deck: Deck, allhands: Array<Hand>, gamestate:GameState, pot1: Pot, pot2: Pot): Array<Hand> | undefined{ 
    let selectionresult = selection(0, allhands, board, gamestate, pot1, pot2);
    if (selectionresult === undefined){
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

function selection(player: number, allhands: Array<Hand>, board: Hand, gamestate: GameState, pot1: Pot, pot2: Pot): number | undefined{
    var prompt = question('What do you want to do? ');
    if (prompt.toLowerCase() === "bet"){
        console.log("You have 4 stacks of chips. White, red, blue, green.");
        betting_selection(gamestate, pot1, pot2);
        call_bet(pot1, pot2, gamestate[1]);
        reverse_bet(gamestate[0], pot1, pot2);
        console.log(pot1);
        console.log(pot2);
        return 1;
    }
    else if (prompt.toLowerCase() === "help"){
        console.log("Type 'bet' to bet, 'hand' to look at your cards, 'board' to look at the board, 'fold' to fold and 'check' to check.")
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
        console.log("You fold.");
        return undefined; //end round if 1 player left
    }
    else if (prompt.toLowerCase() === "check"){
        console.log("You check.");
        return 1;
    }
    else{
        console.log("Not a proper input. Type 'help' for help.")
    }
    return selection(player, allhands, board, gamestate, pot1, pot2);
}

/**
 * Asks for user input to decide how many chips you will bet, then adds that amount of chips to pot1
 * @param color The color of the chips you're betting
 * @param number The number of the color, 0 = white, 1 = red, 2 = blue, 3 = green
 * @param gamestate an array of the players' stacks
 * @param pot1 Player 1's pot
 * @param pot2 Player 2's pot
 */

function bet_number(color: string, number: number, gamestate: GameState, pot1: Pot, pot2: Pot){
    if (gamestate[0][number].number === 0){
        console.log(`You have no ${color} chips. `)
    }
    else{
        var prompt3 = question(`How much do you want to bet? You have ${gamestate[0][number].number} ${color} chips. `)
        if (Number.isNaN(Number(prompt3))){
            console.log("Not a number. Type a number.");
            bet_number(color, number, gamestate, pot1, pot2)
        }
        else if(gamestate[0][number].number < Number(prompt3)){
            console.log("Not enough chips.");
            bet_number(color, number, gamestate, pot1, pot2)
        }else{
            make_bet([color, Number(prompt3)], gamestate[0] ,pot1);
        }
    }
}
/**
 * Asks for user input to decide which colour chips you will bet
 * @param gamestate an array of the players' stacks
 * @param pot1 Player 1's pot
 * @param pot2 Player 2's pot
 */
function betting_selection(gamestate: GameState, pot1: Pot, pot2: Pot){
    let test = 1;
    var prompt2 = question('What do you want to bet? ')
    if (prompt2.toLowerCase() === "white"){
        bet_number("white", 0, gamestate, pot1, pot2)
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
    else if (prompt2.toLowerCase() === "all in"){
        console.log("All in!")
        all_in(gamestate[0], pot1);
        console.log(pot1);
        return 5;
        
    }
    else if (prompt2.toLowerCase() === "help"){
        console.log("Type the corresponding colour of your stack to select it. 'all in' to bet all your chips.");
        console.log("('Cancel' to cancel betting)");
        test = 2;
    }
    else if (prompt2.toLowerCase() === "cancel"){
        return 1;
    }
    else{
        console.log('Not a proper input. Type "help" for help.');
        test = 2;
    }
    if (test === 1){
        return betmore()
    }else{
        betting_selection(gamestate, pot1, pot2)
    };
    
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
/**
 * Modifies a players hand to include the cards on board
 * @param hand The 2 cards a player has on their hand
 * @param board The cards on the board
 */
function addboard(hand: Hand, board: Board){
    for (let i = 2; i < 6; i++) {
        hand[i] = board[i-2];
      }
}

/**
 * Runs through a round of poker
 * @param players The amount of players playing
 * @param gamestate An array of both players' chips
 * @param pot1 Player 1's pot
 * @param pot2 Player 2's pot
 * @returns The cards on the board + each players hand or undefined if player1 folded.
 */
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
    console.log("Cards have been dealt. Type 'hand' to look at your cards, and 'board' to see the cards on the board.");
    console.log("('help' for a list of all commands)");
    let roundstartresult = roundstart(board, newdeck, allhands, gamestate, pot1, pot2);
    if (roundstartresult === undefined){
        return undefined
    }
    else if (roundstartresult === allhands){
        displaycards([describe(allhands[0][0]), describe(allhands[0][1])])
        console.log(`You had the ${describe(allhands[0][0])} and the ${describe(allhands[0][1])}`);
        displaycards([describe(allhands[1][0]), describe(allhands[1][1])])
        console.log(`Computer had the ${describe(allhands[1][0])} and the ${describe(allhands[1][1])}`);
        addboard(allhands[0], board);
        addboard(allhands[1], board);
        return allhands
    }  
}



