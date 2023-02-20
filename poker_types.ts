import {type List, type Pair} from '../lib/list'

export type Permutation = Array<number>;

export type Card = {
    suit: number,
    value: number, 
    name?: string
};

export type Deck = List<Card>;

export type Board = Array<Card>;

export type Hand = Array<Card>;

export type Pocketcards = Array<Card>;

export type Pokerhand = {
    exists: Boolean,
    value?: number,
    value2?: number, 
    flush?: Hand,
    rang?: number,
    name?: string,
    suit?: string,
}