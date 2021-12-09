class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

function solution(head, value) {
    let node = head;
    let index = 0;

    while (node && node.value !== value) {
        node = node.next;
        index++;
    }

    return node ? index : -1;
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    console.log(solution(node0, 'node0'))
}

test()
