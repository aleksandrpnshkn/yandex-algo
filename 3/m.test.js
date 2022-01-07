const assert = require('assert');
const { it } = require('mocha');
const { getMedian, getRawMedian } = require('./m.js');

describe('getRawMedian', () => {
    it('простейший', () => {
        assert.deepEqual(getRawMedian([1, 2, 3], [1, 2, 3]), [2, 2]);
    });

    it('чет/чет', () => {
        assert.deepEqual(getRawMedian([0, 2], [2, 3]), [2, 2]);
        assert.deepEqual(getRawMedian([2, 3], [0, 2]), [2, 2]);
        assert.deepEqual(getRawMedian([0, 2, 3, 4], [4, 5, 6, 7]), [4, 4]);
        assert.deepEqual(getRawMedian([7, 9, 10, 11], [4, 5, 6, 7]), [7, 7]);
    });

    it('нечет/нечет', () => {
        assert.deepEqual(getRawMedian([0, 1, 2], [2, 3, 5]), [2, 2]);
    });

    it('чет/нечет', () => {
        assert.deepEqual(getRawMedian([0, 2], [2, 3, 5]), [2]);
        assert.strictEqual(getRawMedian([1, 5], [2, 3, 5]), false);
        assert.deepEqual(getRawMedian([2, 3, 5], [3, 5]), [3]);
    });

    it('яндексовые', () => {
        assert.deepEqual(getRawMedian([0, 0, 0, 1, 3, 3, 5, 10], [4, 4, 5, 7, 7, 7, 8, 9, 9, 10]), [5, 5], 'чет/чет 18 length');
        assert.deepEqual(getRawMedian([4, 4, 5, 7, 7, 7, 8, 9, 9, 10], [0, 0, 0, 1, 3, 3, 5, 10]), [5, 5]);
    })
});

describe('getMedian', () => {
    it('есть пересечения', () => {
        assert.strictEqual(getMedian([1, 2, 3], [2]), 2);
        assert.strictEqual(getMedian([1, 2, 3], [3]), 2.5);
        assert.strictEqual(getMedian([1, 2, 3], [3, 5, 6]), 3);
    });

    it('нет пересечений', () => {
        assert.strictEqual(getMedian([1, 2, 3], [4, 5, 6]), 3.5);
        assert.strictEqual(getMedian([4, 5, 6], [1, 2, 3]), 3.5);
        assert.strictEqual(getMedian([4, 5], [1, 2]), 3);
        assert.strictEqual(getMedian([4, 5], [1, 2, 3]), 3);
        assert.strictEqual(getMedian([4, 5, 6], [1, 2]), 4);
    })

    it('яндексовые', () => {
        assert.strictEqual(getMedian([1, 3], [2]), 2);
        assert.strictEqual(getMedian([1, 2], [3, 4]), 2.5);
        assert.strictEqual(getMedian([0, 0, 0, 1, 3, 3, 5, 10], [4, 4, 5, 7, 7, 7, 8, 9, 9, 10]), 5);
    })

    it('яндексовые', () => {
        assert.strictEqual(getMedian(
                [0,0,3,3,3,6,6,7,7,10,11,14,15,15,16,16,18,20,21,23,23,26,30,32,35,36,38,39,40,42,44,48,48,50,50,50,52,53,55,57,58,58,59,60,60,66,66,67,68,68,69,70,74,76,76,77,78,80,83,83,83,84,86,87,88,88,90,95,96,96,99,100],
                [ 7, 24, 33, 43, 54, 78, 80, 85 ]
            ),
            51
        );
    })
});
