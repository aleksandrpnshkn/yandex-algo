// // Comment it before submitting
// class Node {
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }

function insert(root, key) {
    let node = root;

    while (true) {
        if (key < node.value) {
            if (node.left) {
                node = node.left;
                continue;
            }

            node.left = new Node(key);
            break;
        } else {
            if (node.right) {
                node = node.right;
                continue;
            }

            node.right = new Node(key);
            break;
        }
    }

    return root;
}

// function test() {
//     var node1 = new Node(7, null, null);
//     var node2 = new Node(8, node1, null);
//     var node3 = new Node(7, null, node2);
//     var newHead = insert(node3, 6);
//     console.assert(newHead === node3);
//     console.assert(newHead.left.value === 6);
// }

// test();
