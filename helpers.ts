import {List, head, tail} from '../lib/list';
import {length} from '../lib/list_prelude';

export function  list_to_array<T>(list: List<T>): Array<T> {
    const arr: Array<T> = [];
    function transform(list: List<T>, count: number): void {
        if (list === null) {
        } else {
            arr[count] = head(list);
            transform(tail(list), count + 1);
        }
    }
    transform(list, 0);
    return arr;
}
export function array_to_list<T>(arr: Array<T>): List<T> {
    function transform(arr: Array<T>, i: number, max: number): List<T> {
        return  i === max
                ? null
                : pair(arr[i], transform(arr, i + 1, max))
    }
    return transform(arr, 0, arr.length);
}