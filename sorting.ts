//Found using ChatGPT

import { Hand, Card } from "./poker_types";

type MyRecord = {
    [key: string]: number | string;
  };

function sortRecordsByValue(records: MyRecord[], key: string): MyRecord[] {
    return records.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

const card1: Card = {suit: 2, value: 5};
const card2: Card = {suit: 3, value: 2};
const card3: Card = {suit: 0, value: 9};
const card4: Card = {suit: 0, value: 10};
const card5: Card = {suit: 0, value: 8};
const card6: Card = {suit: 0, value: 12};
const card7: Card = {suit: 0, value: 13};

const hand1 = [card1, card2, card3, card4, card5, card6, card7];

console.log(hand1);
const sorted_record = sortRecordsByValue(hand1, "value");
console.log(sorted_record);