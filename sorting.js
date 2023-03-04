"use strict";
//Found using ChatGPT
exports.__esModule = true;
exports.sorter = void 0;
function sorter(hand) {
    function sortRecordsByValue(records) {
        return records.sort(function (a, b) {
            if (a.value < b.value) {
                return -1;
            }
            else if (a.value > b.value) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    return sortRecordsByValue(hand);
}
exports.sorter = sorter;
var hand3 = [{ suit: 2, value: 9 }, { suit: 3, value: 8 }, { suit: 3, value: 3 }, { suit: 0, value: 10 }, { suit: 0, value: 11 }, { suit: 3, value: 12 }, { suit: 3, value: 6 }];
console.log(sorter(hand3));
