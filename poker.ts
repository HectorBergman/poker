import {head, tail, List, Pair, list, pair, set_tail, append} from '../lib/list'
import {random_list} from './helpers'
import {Deck, Hand, Board, Pocketcards, Pokerhand, Card} from './poker_types'
import {question} from 'readline-sync'

function holdem(players: number){ //kanske temporär lösning på hur många spelare som är med, kan väl ändras sen
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
    let river: Hand = []
    function dealcards(players: number): void{
        river = [head(newdeck!), head(tail(newdeck!)!), head(tail(tail(newdeck!)!)!)];
        //river actually only refers to the fifth card dealt, the first 3 are called 'flop' and the 4th 'turn'.
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
        var bet = question('Prompt1 ');
        river[3] = head(newdeck!); //turn
        newdeck = tail(newdeck!);
        console.log(river);
        var bet2 = question('Prompt2 ');
        river[4] = head(newdeck!); //river
        newdeck = tail(newdeck!);
        console.log(river);
    }
}

holdem(2);


