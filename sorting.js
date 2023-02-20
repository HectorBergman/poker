"use strict";
exports.__esModule = true;
function sortNumbersAscending(numbers) {
    return numbers.sort(function (a, b) { return a - b; });
}
var sorter = [5, 8, 2, 9, 11];
console.log(sorter);
sortNumbersAscending(sorter);
console.log(sorter);
function sortRecordsByValue(records, key) {
    return records.sort(function (a, b) {
        if (a[key] < b[key]) {
            return -1;
        }
        else if (a[key] > b[key]) {
            return 1;
        }
        else {
            return 0;
        }
    });
}
var card1 = { suit: 2, value: 5 };
var card2 = { suit: 3, value: 2 };
var card3 = { suit: 0, value: 9 };
var card4 = { suit: 0, value: 10 };
var card5 = { suit: 0, value: 8 };
var card6 = { suit: 0, value: 12 };
var card7 = { suit: 0, value: 13 };
var hand1 = [card1, card2, card3, card4, card5, card6, card7];
console.log(hand1);
var sorted_record = sortRecordsByValue(hand1, "value");
console.log(sorted_record);
