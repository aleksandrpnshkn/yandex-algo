// class CNode {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

function solution(node) {
    return isBalanced(node)[0];
}

function isBalanced(node, totalDepth = 0) {
    let leftIsBalanced = true;
    let rightIsBalanced = true;
    let leftDepth = totalDepth;
    let rightDepth = totalDepth;

    if (node.left) {
        [leftIsBalanced, leftDepth] = isBalanced(node.left, totalDepth + 1);
    }

    if (node.right) {
        [rightIsBalanced, rightDepth] = isBalanced(node.right, totalDepth + 1);
    }

    return [leftIsBalanced && rightIsBalanced && Math.abs(leftDepth - rightDepth) <= 1, Math.max(leftDepth, rightDepth)];
}

// function test() {
//     var node1 = new CNode(1);
//     var node2 = new CNode(-5);
//     var node3 = new CNode(3);
//     node3.left = node1;
//     node3.right = node2;
//     var node4 = new CNode(10);
//     var node5 = new CNode(2);
//     node5.left = node3;
//     node5.right = node4;
//     console.assert(solution(node5));
// }
// test();
