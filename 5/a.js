class CNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function solution (node) {
    let maxLeft = -1;
    let maxRight = -1;

    if (node.left) {
        maxLeft = solution(node.left);
    }

    if (node.right) {
        maxRight = solution(node.right);
    }

    return Math.max(maxLeft, maxRight, node.value);
}
