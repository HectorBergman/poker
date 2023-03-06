"use strict";
//Found using ChatGPT, but modified to work better
exports.__esModule = true;
exports.sorter = void 0;
/**
 * Sorts a hand in size order for values, lowest first
 * @param hand Hand in random order that needs to be sorted
 * @returns Same hand as before, but now sorted in size order from lowest to highest.
 */
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
