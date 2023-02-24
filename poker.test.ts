//File for unit tests of the code
import {Hand, Card} from './poker_types';
import {straight, flush} from './poker_hands';

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