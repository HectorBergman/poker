//main file
import {holdem} from "./poker";
import {Pot} from "./poker_types";
import {make_pot} from "./stack_bet"

function round() {
    let pot1 = make_pot();
    let pot2 = make_pot();
    return holdem(2);
}