//Found using ChatGPT

import { Hand, Card } from "./poker_types";

type MyRecord = {
    [key: string]: number | string;
  };


export function sorter(hand: Hand): any {
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
  return sortRecordsByValue(hand, 'value');
}
