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
