//File for unit tests of the code
import {Hand, Card} from './poker_types';
import {has_four_of_akind, has_fullhouse, has_pair, has_three_of_akind, has_two_pairs, straight, flush, straight_flush, royal_flush} from './poker_hands';

import {Stack} from './poker_types';
import {make_pot, make_new_stack, add_pot, make_bet, call_bet, pot_value,
        auto_change, manual_change } from "./stack_bet";
import { winners } from './hands_ranking';
        
test('straight function is valid', () => {
    const card1: Card = {suit: 0, value: 7};
    const card2: Card = {suit: 1, value: 8};
    const card3: Card = {suit: 0, value: 9};
    const card4: Card = {suit: 3, value: 10};
    const card5: Card = {suit: 2, value: 11};
    const card6: Card = {suit: 1, value: 13};
    const card7: Card = {suit: 2, value: 14};
    
    const hand1 = [card1, card2, card3, card4, card5, card6, card7];

    expect(straight(hand1).exists).toBe(true);

    const card8: Card = {suit: 0, value: 3};
    const card9: Card = {suit: 1, value: 5};
    const card10: Card = {suit: 0, value: 6};
    const card11: Card = {suit: 3, value: 7};
    const card12: Card = {suit: 2, value: 9};
    const card13: Card = {suit: 1, value: 11};
    const card14: Card = {suit: 2, value: 12};
    
    const hand2 = [card8, card9, card10, card11, card12, card13, card14];

    expect(straight(hand2).exists).toBe(false);
});

test('flush function is valid', () => {
    const card1: Card = {suit: 0, value: 7};
    const card2: Card = {suit: 1, value: 8};
    const card3: Card = {suit: 1, value: 9};
    const card4: Card = {suit: 3, value: 10};
    const card5: Card = {suit: 1, value: 11};
    const card6: Card = {suit: 1, value: 13};
    const card7: Card = {suit: 1, value: 14};
    
    const hand1 = [card1, card2, card3, card4, card5, card6, card7];

    expect(flush(hand1).exists).toBe(true);

    const card8: Card = {suit: 0, value: 3};
    const card9: Card = {suit: 1, value: 5};
    const card10: Card = {suit: 0, value: 6};
    const card11: Card = {suit: 3, value: 7};
    const card12: Card = {suit: 2, value: 9};
    const card13: Card = {suit: 1, value: 11};
    const card14: Card = {suit: 2, value: 12};
    
    const hand2 = [card8, card9, card10, card11, card12, card13, card14];

    expect(flush(hand2).exists).toBe(false);
});

test('straight flush function is valid', () => {
    const card1: Card = {suit: 0, value: 7};
    const card2: Card = {suit: 0, value: 8};
    const card3: Card = {suit: 0, value: 9};
    const card4: Card = {suit: 0, value: 10};
    const card5: Card = {suit: 0, value: 11};
    const card6: Card = {suit: 1, value: 13};
    const card7: Card = {suit: 2, value: 14};
    
    const hand1 = [card1, card2, card3, card4, card5, card6, card7];

    expect(straight_flush(hand1).exists).toBe(true);

    const card8: Card = {suit: 0, value: 3};
    const card9: Card = {suit: 1, value: 5};
    const card10: Card = {suit: 0, value: 6};
    const card11: Card = {suit: 3, value: 7};
    const card12: Card = {suit: 2, value: 9};
    const card13: Card = {suit: 1, value: 11};
    const card14: Card = {suit: 2, value: 12};
    
    const hand2 = [card8, card9, card10, card11, card12, card13, card14];

    expect(straight_flush(hand2).exists).toBe(false);
});

test('royal flush function is valid', () => {
    const card1: Card = {suit: 0, value: 7};
    const card2: Card = {suit: 1, value: 8};
    const card3: Card = {suit: 3, value: 10};
    const card4: Card = {suit: 3, value: 11};
    const card5: Card = {suit: 3, value: 12};
    const card6: Card = {suit: 3, value: 13};
    const card7: Card = {suit: 3, value: 14};
    
    const hand1 = [card1, card2, card3, card4, card5, card6, card7];

    expect(royal_flush(hand1).exists).toBe(true);

    const card8: Card = {suit: 0, value: 3};
    const card9: Card = {suit: 1, value: 5};
    const card10: Card = {suit: 0, value: 6};
    const card11: Card = {suit: 3, value: 7};
    const card12: Card = {suit: 2, value: 9};
    const card13: Card = {suit: 1, value: 11};
    const card14: Card = {suit: 2, value: 12};
    
    const hand2 = [card8, card9, card10, card11, card12, card13, card14];

    expect(royal_flush(hand2).exists).toBe(false);
});

const hand1: Hand = [{suit: 3, value: 3}, {suit: 0, value: 2}, {suit: 1, value: 3}, 
    {suit: 1, value: 5}, {suit: 1, value: 2}, {suit: 3, value: 3}, {suit: 2, value: 3}];


test('Hand has pair', () => {
    expect(has_pair(hand1).exists).toBe(true);
});
test('Hand has pair returns correct value', () => {
    expect(has_pair(hand1).value).toBe(3);
});
test('Hand has three of a kind', () => {
    expect(has_three_of_akind(hand1).exists).toBe(true);
});
test('Hand has four of a kind', () => {
    expect(has_four_of_akind(hand1).exists).toBe(true);
});

test('Hand has two pairs', () => {
    expect(has_two_pairs(hand1).exists).toBe(true);
});
test('Hand has fullhouse', () => {
    expect(has_fullhouse(hand1).exists).toBe(true);
});


// Stack_bet tests



test('Stack_bet: make_bet and call_bet return pot with the same value', () => {
    const stack1: Stack = make_new_stack();
    const stack2: Stack = make_new_stack();
    const pot1 = make_pot();
    const pot2 = make_pot();
    make_bet(["white", 3], stack1, pot1);
    make_bet(["green", 1], stack1, pot1);
    call_bet(pot1, pot2, stack2);
    const value1 = pot_value(pot1);
    const value2 = pot_value(pot2);
    const b1 = value1 == value2;
    expect(b1).toBe(true);
});

test('Stack_bet: all in test', () => {
    const stack1: Stack = make_new_stack();
    const stack2: Stack = make_new_stack();
    const pot1 = make_pot();
    const pot2 = make_pot();
    stack2[0].number = 0;
    stack2[1].number = 0;
    stack2[3].number = 0; 
    make_bet(["green", 1], stack1, pot1);
    call_bet(pot1, pot2, stack2);
    const v1: number = pot_value(pot2);
    expect(v1).toBe(20);
});

test('Stack_bet: manual change of currency', () => {
    const stack1: Stack = make_new_stack();
    manual_change(stack1, "red", "blue", 2);
    const n1 = stack1[1].number;
    expect(n1).toBe(7);
});

test('Stack_bet: auto change of currency', () => {
    const stack1: Stack = make_new_stack();
    auto_change(stack1, 1, 20);
    const n2 = stack1[1].number;
    expect(n2).toBe(7);
});

test('Stack_bet: add pot test', () => {
    const stack1: Stack = make_new_stack();
    const stack2: Stack = make_new_stack();
    const pot1 = make_pot();
    const pot2 = make_pot();
    make_bet(["green", 1], stack1, pot1);
    call_bet(pot1, pot2, stack2);
    add_pot(pot1, stack1);
    add_pot(pot2, stack1);
    const v2: number = pot_value(stack1);
    expect(v2).toBe(64 + 25);
});

test('winners give correct winner', () => {
    const handa = [{suit: 3, value: 13}, {suit: 1, value: 3}, {suit: 2, value: 9}, {suit: 1, value: 10}, {suit: 3, value: 2}, {suit: 3, value: 7}, {suit: 0, value: 8}];
    const handb = [{suit: 3, value: 13}, {suit: 1, value: 3}, {suit: 2, value: 9}, {suit: 1, value: 10}, {suit: 3, value: 2}, {suit: 2, value: 2}, {suit: 2, value: 3}];
    expect(winners(handa, handb)).toBe("Player 2 wins");
});