"use strict";
//Found using ChatGPT
exports.__esModule = true;
exports.sorter = void 0;
function sorter(hand) {
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
    return sortRecordsByValue(hand, 'value');
}
exports.sorter = sorter;
var hand1 = [{ suit: 3, value: 13 }, { suit: 1, value: 3 }, { suit: 2, value: 9 }, { suit: 1, value: 10 }, { suit: 3, value: 2 }, { suit: 3, value: 7 }, { suit: 0, value: 8 }];
console.log(sorter(hand1));
