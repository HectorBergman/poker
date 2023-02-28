//Found using ChatGPT

import { Hand, Card } from "./poker_types";

export function sorter(hand: Hand): Hand {
  function sortRecordsByValue(records: Card[], key: string): Card[] {
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
  return sortRecordsByValue(hand, 'value');
}
