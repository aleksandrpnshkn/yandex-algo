
// // Comment it before submitting
// class Node {
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }

function printRange(node, left, right) {
    const results = [];

    walk(node, left, right);
    process.stdout.write(results.join(' ') + '\n');

    function walk(node, left, right) {
        if (node.left && node.value >= left) {
            walk(node.left, left, right);
        }

        if (node.value >= left && node.value <= right) {
            results.push(node.value);
        }

        if (node.right && node.value <= right) {
            walk(node.right, left, right);
        }
    }
}

// function test() {
//     var node1 = new Node(2, null, null);
//     var node2 = new Node(1, null, node1);
//     var node3 = new Node(8, null, null);
//     var node4 = new Node(8, null, node3);
//     var node5 = new Node(9, node4, null);
//     var node6 = new Node(10, node5, null);
//     var node7 = new Node(5, node2, node6);
//     printRange(node7, 2, 8);
//     // expected output: 2 5 8 8
// }

// test();
