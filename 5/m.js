function siftUp(heap, idx) {
    const parentIdx = Math.floor(idx / 2);

    if (parentIdx < 1) {
        return idx;
    }

    if (heap[parentIdx] >= heap[idx]) {
        return idx;
    }

    [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
    return siftUp(heap, parentIdx);
}

// function test() {
//     var sample = [-1, 12, 6, 8, 3, 15, 7];
//     console.assert(siftUp(sample, 5) == 1);
//     console.log(sample)
// }

// test()
