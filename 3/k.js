function merge_in_place(arr, left, mid, right) {
    let i = left;
    let k = mid;
    const merged = [];

    while (i < mid && k < right) {
        if (arr[i] <= arr[k]) {
            merged.push(arr[i]);
            i++;
        } else {
            merged.push(arr[k]);
            k++;
        }
    }

    while (i < mid) {
        merged.push(arr[i]);
        i++;
    }

    while (k < right) {
        merged.push(arr[k]);
        k++;
    }

    for (let j = left; j < right; j++) {
        arr[j] = merged[j - left];
    }

    return arr;
}

function merge(arr, left, mid, right) {
    const arrCopy = arr.slice();
    merge_in_place(arrCopy, left, mid, right);
    return arrCopy;
}

function merge_sort(arr, left = 0, right) {
    if (right === undefined) {
        right = arr.length;
    }

    if ((right - left) < 2) {
        return;
    }

    if ((right - left) === 2) {
        if (arr[left] > arr[right - 1]) {
            [arr[left], arr[right-1]] = [arr[right-1], arr[left]];
        }

        return;
    }

    const mid = Math.floor((left + right) / 2);
    merge_sort(arr, left, mid);
    merge_sort(arr, mid, right);
    merge_in_place(arr, left, mid, right);
}
