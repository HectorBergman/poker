"use strict";
exports.__esModule = true;
exports.lg_permute_list = exports.random_permutation = exports.array_to_list = exports.list_to_array = void 0;
var list_1 = require("../lib/list");
function list_to_array(list) {
    var arr = [];
    function transform(list, count) {
        if (list === null) {
        }
        else {
            arr[count] = (0, list_1.head)(list);
            transform((0, list_1.tail)(list), count + 1);
        }
    }
    transform(list, 0);
    return arr;
}
exports.list_to_array = list_to_array;
function array_to_list(arr) {
    function transform(arr, i, max) {
        return i === max
            ? null
            : (0, list_1.pair)(arr[i], transform(arr, i + 1, max));
    }
    return transform(arr, 0, arr.length);
}
exports.array_to_list = array_to_list;
function random_permutation(length) {
    var perm = [];
    for (var i = 0; i < length; i += 1) {
        perm[i] = i;
    }
    function random_helper(perm, j) {
        if (j <= 0) {
            return perm;
        }
        else {
            var rand = Math.floor(Math.random() * j);
            var pick = perm[rand];
            perm[rand] = perm[j];
            perm[j] = pick;
            return random_helper(perm, j - 1);
        }
    }
    return random_helper(perm, length - 1);
}
exports.random_permutation = random_permutation;
// helper function, makes list from an array
function make_list(arr, i) {
    if (arr[i] === undefined) {
        return null;
    }
    else {
        return (0, list_1.pair)(arr[i], make_list(arr, i + 1));
    }
}
function lg_permute_list(xs) {
    function length(xs, i) {
        if ((0, list_1.is_null)(xs)) {
            return i;
        }
        else {
            return length((0, list_1.tail)(xs), i + 1);
        }
    }
    function random_array(xs, sigma, arr, i) {
        if ((0, list_1.is_null)(xs)) {
            return arr;
        }
        else {
            arr[sigma[i]] = (0, list_1.head)(xs);
            return random_array((0, list_1.tail)(xs), sigma, arr, i + 1);
        }
    }
    var arr = [];
    var sigma = random_permutation(length(xs, 0));
    var randarr = random_array(xs, sigma, arr, 0);
    return make_list(randarr, 0);
}
exports.lg_permute_list = lg_permute_list;