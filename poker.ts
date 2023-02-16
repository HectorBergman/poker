import {head, tail, List, Pair, list, pair, set_tail, append} from './list'
import {lg_permute_list} from './homework10'
function holdem(){
    type card = {suit: number, value: number};
    type deck = List<card>;
    function createdeck(): deck{
        //returns a deck of 56 cards in random order
        let newdeck: deck = list()
        for (let suit = 0; suit < 4; suit++) {
            //0 = clubs 1 = diamond 2 = spades 3 = hearts
            for (let value = 0; value < 14; value++) {
                //ace 0, king 13, queen 12, jack 11
                let newcard: card = {suit, value};
                let temp = append(newdeck, list(newcard));
                newdeck = temp;
            }
        }
        return lg_permute_list(newdeck); //lg_permute_list from hw10. Makes a list random
    }
    console.log(createdeck());
}
holdem();