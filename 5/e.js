class CNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function solution (node, min = -Infinity, max = Infinity) {
    let left = true;
    let right = true;

    if (node.left) {
        if (
            node.left.value <= min
            || node.left.value >= node.value
        ) {
            return false;
        }

        left = solution(node.left, min, node.value);
    }

    if (node.right) {
        if (
            node.right.value >= max
            || node.right.value <= node.value
        ) {
            return false;
        }

        right = solution(node.right, node.value, max);
    }

    return left && right;
}
