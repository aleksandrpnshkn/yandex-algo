function siftDown(heap, idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = heap[leftIdx];
    const right = heap[rightIdx];

    if (left === undefined && right === undefined) {
        return idx;
    }

    if (
        (left === undefined || left <= heap[idx])
        && (right === undefined || right <= heap[idx])
    ) {
        return idx;
    }

    if (right === undefined || left >= right) {
        [heap[idx], heap[leftIdx]] = [heap[leftIdx], heap[idx]];
        idx = leftIdx;
    } else {
        [heap[rightIdx], heap[idx]] = [heap[idx], heap[rightIdx]];
        idx = rightIdx;
    }

    return siftDown(heap, idx);
}

// function test() {
//     var sample = [-1, 12, 1, 8, 3, 4, 7];
//     // console.log(siftDown(sample, 2))
//     console.assert(siftDown(sample, 2) == 5);
//     // console.log(sample)
// }

// test()
