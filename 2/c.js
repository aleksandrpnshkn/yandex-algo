class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}

function solution(head, idx) {
    deleteNode(idx, head);
}

function deleteNode(index, head) { 
    let target;

    if (index === 0) {      
        target = head;
        head = target.next;
    } else {    
        let prev = searchNode(index - 1, head);
        target = prev.next;
        prev.next = target.next;
    } 

    target.next = null;
    return head;
}

function searchNode(index, head) {
    for (let i = 0; i < index; i++) {
        head = head.next;
    }

    return head;
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 1);
    // result is node0 -> node2 -> node3
}

test()