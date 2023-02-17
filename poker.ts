import {head, tail, List, Pair, list, pair, set_tail, append} from '../lib/list'
import {lg_permute_list} from './helpers'
function holdem(players: number){ //kanske temporär lösning på hur många spelare som är med, kan väl ändras sen
    type card = {suit: number, value: number};
    type deck = List<card>;
    function createdeck(): deck{
        //returns a deck of 52 cards in random order
        let newdeck: deck = list()
        for (let suit = 0; suit < 4; suit++) {
            //0 = clubs 1 = diamond 2 = spades 3 = hearts
            for (let value = 2; value < 15; value++) {
                //ace 14, king 13, queen 12, jack 11
                let newcard: card = {suit, value};
                let temp = append(newdeck, list(newcard));
                newdeck = temp;
            }
        }
        return lg_permute_list(newdeck); //Makes a list random
    }
    let newdeck: deck = createdeck();
    let allhands: Array<hand> = [];
    function dealcards(players: number): void{
        let river: hand = [head(newdeck!), head(tail(newdeck!)!), head(tail(tail(newdeck!)!)!)];
        newdeck = tail(tail(tail(newdeck!)!)!);
        /* Dealcardshelper gives a player the two cards on the top of the deck,
        dealing cards like this would get you shot in the wild west,
        but it works fine for a computer since it's completely random regardless*/
        function dealcardshelper(player: hand): void { 
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
    type hand = Array<card>;
    /*console.log(newdeck)
    console.log(allhands)
    console.log(allhands[0])
    console.log(createdeck());*/
}
holdem(2);