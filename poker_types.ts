import {type List, type Pair} from '../lib/list';

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
    exists: boolean,
    value?: number,
    value2?: number, 
    flush?: Hand,
    rang?: number,
    name?: string,
    suit?: string,
};

export type Chip = {
    value: number
    color?: string };

export type Pile = {
    color: number
    number: number,
    chip: Chip
};

export type Bet = Pair<string, number>;

export type Pot = Array<Pile>;

export type Stack = Array<Pile>;

export type GameState = Array<Stack>;