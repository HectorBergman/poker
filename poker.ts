import {head, tail, List, Pair, list, pair, set_tail, append} from '../lib/list'
import {random_list, describe} from './helpers'
import {Deck, Hand, Board, Pocketcards, Pokerhand, Card, Bet, Pot, Stack, Pile, GameState} from './poker_types'
import {question} from 'readline-sync'
import {cardimages, stepbystepdisplay, displaycards} from './cardimages'
import {make_bet, hold_bet, pot_value, make_pot} from './stack_bet';

export function holdem(players: number, gamestate?: GameState, pot1?: Pot, pot2?: Pot): Array<Hand> | undefined{ //kanske temporär lösning på hur många spelare som är med, kan väl ändras sen
    /**
     * Generates a deck of 52 cards in random order
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
    dealcards(players);
    /*console.log(newdeck)
    console.log(allhands)
    console.log(allhands[0])
    console.log(createdeck());*/
    function roundstart(){ //temporary, just imagining how a round could look like
        let selectionresult = selection(0);
        if(selectionresult === undefined){
            return undefined;
        }
        else{
            board[3] = head(newdeck!); //turn
            console.log(`The turn is a ${describe(board[3])}.`);
            newdeck = tail(newdeck!);
            selectionresult = selection(0);
            if(selectionresult === undefined){
                return undefined;
            }
            else{
                board[4] = head(newdeck!); //river
                console.log(`${describe(board[4])} on the river!`);
                newdeck = tail(newdeck!);
                selectionresult = selection(0);
                if(selectionresult=== undefined){
                    return undefined;
                }
                else{
                    return allhands;
                }
            }
        }
    }
    /*
    ** Code for player input after cards have been dealt, den är lite dålig
    ** så man måste nog ändra den lite
    */
    function selection(player: number){
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
        return selection(player);
    }
    let roundstartresult = roundstart();
    if (roundstartresult === undefined){
        return undefined
    }
    else if (roundstartresult === allhands){
        return allhands
    }  
}

holdem(2);


