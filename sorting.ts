//Found using ChatGPT, but modified to work better

import { Hand, Card } from "./poker_types";

export function sorter(hand: Hand): Hand {
  function sortRecordsByValue(records: Card[]): Card[] {
    return records.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return sortRecordsByValue(hand);
}

const hand3 = [{suit: 2, value: 9}, {suit: 3, value: 8}, {suit: 3, value: 3}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 3, value: 12}, {suit: 3, value: 6}];

console.log(sorter(hand3));