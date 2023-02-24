import {head, tail, list, append} from '../lib/list'
import {random_list, describe} from './helpers'
import {Deck, Hand, Board, Pocketcards, Pokerhand, Card, Bet, Pot, Stack, Pile, GameState} from './poker_types'
import {question} from 'readline-sync'
import {displaycards} from './cardimages'
import {make_bet, hold_bet, pot_value, make_pot} from './stack_bet';

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


function roundstart(player: number, board: Hand, deck: Deck, allhands: Array<Hand>){ //temporary, just imagining how a round could look like
    let selectionresult = selection(0, allhands, board);
    if(selectionresult === undefined){
        return undefined;
    }
    else{
        board[3] = head(deck!); //turn
        console.log(`The turn is a ${describe(board[3])}.`);
        deck = tail(deck!);
        selectionresult = selection(0, allhands, board);
        if(selectionresult === undefined){
            return undefined;
        }
        else{
            board[4] = head(deck!); //river
            console.log(`${describe(board[4])} on the river!`);
            deck = tail(deck!);
            selectionresult = selection(0, allhands, board);
            if(selectionresult=== undefined){
                return undefined;
            }
            else{
                return allhands;
            }
        }
    }
}
function selection(player: number, allhands: Array<Hand>, board: Hand){
    var prompt = question('What do you want to do? ');
    if (prompt.toLowerCase() === "bet"){
        console.log("Bet");
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
    return selection(player, allhands, board);
}


export function holdem(players: number, gamestate?: GameState, pot1?: Pot, pot2?: Pot): Array<Hand> | undefined{

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
    console.log(allhands);
    let roundstartresult = roundstart(0, board, newdeck, allhands);
    if (roundstartresult === undefined){
        return undefined
    }
    else if (roundstartresult === allhands){
        return allhands
    }  
}

holdem(2);


